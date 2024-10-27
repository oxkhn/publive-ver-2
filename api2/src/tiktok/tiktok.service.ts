import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import puppeteer from 'puppeteer';
import { catchError, map, Observable } from 'rxjs';
import { VideoTiktok } from 'src/(share)/schemas/tiktok.schema';
import { GetVideoDto } from './dto/GetTiktok.dto';

@Injectable()
export class TiktokService {
  private readonly logger = new Logger();
  private readonly apiUrl = 'https://www.tiktok.com/api/search/general/full/';

  constructor(
    @InjectModel(VideoTiktok.name)
    private readonly videoTiktokModel: Model<VideoTiktok>,
    private readonly httpService: HttpService,
  ) {}

  async fetchTikTokSearch({ keyword, pages = 10 }) {
    try {
      this.logger.log('Start');
      const { cookieString } = await this.getTtwidCookie();

      let searchResults = await this.fetchTikTokSearch1({
        keyword,
        cookieString,
      });

      this.logger.debug(searchResults);

      let allResults = [];

      if (searchResults && searchResults.length > 0) {
        let searchId = searchResults[0].common.doc_id_str;
        allResults.push(...searchResults);

        for (let i = 1; i < pages; i++) {
          this.logger.log('Get page: ', i);
          let offset = (i + 1) * 12;
          let moreResults = await this.fetchTikTokSearch2({
            keyword,
            offset,
            searchId,

            cookieString,
          });
          if (moreResults) {
            allResults.push(...moreResults);
          }
        }
        this.logger.log('Length response: ', allResults.length);

        for (const [i, _] of allResults.entries()) {
          if (!_?.item?.desc) continue;
          this.logger.log('Save: ', _.item.desc);
          if (!this.isVietnamese(_.item.desc)) {
            continue;
          }

          const videoExits = await this.videoTiktokModel.findOne({
            id: _.item.id,
          });

          try {
            if (videoExits) {
              await this.videoTiktokModel.findOneAndUpdate(
                {
                  id: _.item.id,
                },
                { $set: _.item }, // Update with the new data
                { new: true, upsert: true },
              );
            } else {
              const video = new this.videoTiktokModel(_.item);

              await video.save();
            }
          } catch (error) {}
        }

        this.logger.log('Done');

        return { cookies: cookieString, items: allResults };
      } else {
        return { cookies: cookieString, items: [] };
      }
    } catch (error) {
      this.logger.error(error);
      return { cookies: null, items: [] };
    }
  }

  // Internal function to fetch the first set of results
  async fetchTikTokSearch1({ keyword, cookieString }) {
    const urlString = `https://www.tiktok.com/api/search/general/full/?from_page=search&keyword=${keyword}&`;

    try {
      const res = await axios.get(urlString, {
        headers: { Cookie: cookieString },
      });
      return res.data.data;
    } catch (err) {
      console.error(err);
    }
  }

  isVietnamese(text) {
    // Mẫu regex kiểm tra các ký tự tiếng Việt
    const vietnamesePattern =
      /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/;

    // Nếu không chứa các ký tự tiếng Việt, bỏ qua
    return vietnamesePattern.test(text);
  }

  // Internal function to fetch subsequent sets of results
  async fetchTikTokSearch2({ keyword, offset, searchId, cookieString }) {
    const urlString = `https://www.tiktok.com/api/search/general/full/?from_page=search&keyword=${keyword}&offset=${offset}&search_id=${searchId}&`;

    try {
      const res = await axios.get(urlString, {
        headers: { Cookie: cookieString },
      });
      return res.data.data;
    } catch (err) {
      console.error(err);
    }
  }
  // Utility function for adding a delay
  delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  // Function to get the 'ttwid' cookie from TikTok
  async getTtwidCookie(path?: string) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Navigate to TikTok homepage to set cookies
    await page.goto(path || 'https://www.tiktok.com', {
      waitUntil: 'networkidle2',
    });

    // Add a delay to allow the page to fully load and cookies to be set
    await this.delay(5000);

    // Get the cookies, including 'ttwid'
    const cookies = await page.cookies();
    const ttwidCookie = cookies.find((cookie) => cookie.name === 'ttwid');
    const cookieString = cookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ');

    await browser.close();

    if (ttwidCookie) {
      return { ttwid: ttwidCookie.value, cookieString };
    } else {
      throw new Error('ttwid cookie not found');
    }
  }

  async getTiktokProfile() {
    try {
      const { cookieString } = await this.getTtwidCookie(
        'https://www.tiktok.com/@hoaminzy_hoadambut',
      );

      this.logger.log(cookieString);

      const result = await this.fetchTiktokProfile({ cookieString });

      this.logger.log(JSON.stringify(result));
    } catch (error) {}
  }

  async fetchTiktokProfile({ cookieString }) {
    try {
      const urlString = `https://www.tiktok.com/api/post/item_list/?from_page=user&`;

      try {
        const res = await axios.get(urlString, {
          headers: { Cookie: cookieString },
        });
        return res.data.data;
      } catch (err) {
        console.error(err);
      }
    } catch (error) {}
  }

  async getAllVideo(getVideoDto: GetVideoDto) {
    const { limit, page, name, createAt } = getVideoDto;
    try {
      const query: any = {};

      if (name && name.trim() !== '') {
        query.desc = { $regex: name, $options: 'i' };
      }

      if (createAt) {
        query.createTime = { $gte: createAt };
      }

      const totalDocuments = await this.videoTiktokModel.countDocuments(query);
      const totalPage = Math.ceil(totalDocuments / limit);
      const nextPage = page + 1 > totalPage ? null : page + 1;

      const videos = await this.videoTiktokModel
        .find(query)
        .sort({ 'stats.diggCount': -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      return { videos, totalPage, nextPage };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
