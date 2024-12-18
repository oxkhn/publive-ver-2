import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import puppeteer from 'puppeteer';
import { GetVideoDto } from './dto/GetTiktok.dto';
import { TiktokVideo } from 'src/common/models/tiktokVideo.model';

@Injectable()
export class TiktokService {
  private readonly logger = new Logger();
  private readonly apiUrl = 'https://www.tiktok.com/api/search/general/full';

  constructor(
    @InjectModel(TiktokVideo.name)
    private readonly tiktokVideoModel: Model<TiktokVideo>,
  ) {}

  async runFetchDataTiktokVideo({ keyword, pages = 10 }) {
    try {
      this.logger.log(
        `Starting data fetch for keyword: ${keyword}, pages: ${pages}`,
      );

      const { cookieString } = await this.getTtwidCookie();
      this.logger.log(`Acquired cookieString: ${cookieString}`);

      const initialPath = `${this.apiUrl}/?from_page=search&keyword=${encodeURIComponent(keyword)}&`;
      this.logger.log(`Fetching initial search results from: ${initialPath}`);

      let initialResults = await this.fetchTikTokSearch(
        initialPath,
        cookieString,
      );
      if (!initialResults || initialResults.length === 0) {
        this.logger.log('No search results found.');
        return { cookies: cookieString, items: [] };
      }

      let allItems = [...initialResults];
      let searchId = initialResults[0]?.common?.doc_id_str;

      this.logger.log(
        `Initial results count: ${initialResults.length}, searchId: ${searchId}`,
      );

      // Fetch additional pages
      for (let i = 1; i < pages; i++) {
        const offset = (i + 1) * 12;
        const pagedPath = `${this.apiUrl}/?from_page=search&keyword=${encodeURIComponent(keyword)}&offset=${offset}&search_id=${searchId}&`;
        this.logger.log(`Fetching page ${i + 1} results from: ${pagedPath}`);

        let moreResults = await this.fetchTikTokSearch(pagedPath, cookieString);
        if (moreResults && moreResults.length > 0) {
          allItems.push(...moreResults);
          this.logger.log(
            `Page ${i + 1} fetched. Current total count: ${allItems.length}`,
          );
        } else {
          this.logger.log(`No more results found at page ${i + 1}.`);
        }
      }

      this.logger.log(`Total results fetched: ${allItems.length}`);

      // Save items to database
      for (const currentItem of allItems) {
        if (!currentItem?.item?.desc) {
          continue;
        }

        const description = currentItem.item.desc;
        if (!this.isVietnamese(description)) {
          continue;
        }

        try {
          const videoId = currentItem.item.id;
          this.logger.log(
            `Processing video with ID: ${videoId}, description: "${description}"`,
          );

          const existingVideo = await this.tiktokVideoModel.findOne({
            videoId: videoId,
          });

          if (existingVideo) {
            this.logger.log(`Updating existing video with ID: ${videoId}`);
            await this.tiktokVideoModel.findOneAndUpdate(
              { videoId: videoId },
              { $set: this.formatTiktokVideoData(currentItem) },
              { new: true, upsert: true },
            );
          } else {
            this.logger.log(`Inserting new video with ID: ${videoId}`);
            const newVideo = new this.tiktokVideoModel(
              this.formatTiktokVideoData(currentItem),
            );
            await newVideo.save();
          }
        } catch (dbError) {
          this.logger.error(
            `Database error for item ID: ${currentItem?.item?.id || 'unknown'}`,
            dbError,
          );
        }
      }

      this.logger.log('Data processing completed successfully.');
      return { cookies: cookieString, items: allItems };
    } catch (error) {
      this.logger.error('An error occurred during data fetch process:', error);
      return { cookies: null, items: [] };
    }
  }

  // Internal function to fetch the first set of results
  async fetchTikTokSearch(path, cookieString) {
    try {
      const res = await axios.get(path, {
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

  formatTiktokVideoData(data) {
    if (!data || !data.item) return null;

    const { item } = data;
    const { author, video, stats, authorStats, music } = item;

    return {
      videoId: item.id || '',
      title: item.desc || '',
      createTime: item.createTime || 0,
      duration: video?.duration || 0,
      ratio: video?.ratio || '',
      image: video?.cover || '',
      authorId: author?.id || '',
      uniqueId: author?.uniqueId || '',
      nickname: author?.nickname || '',
      avatarThumb: author?.avatarThumb || '',
      signature: author?.signature || '',
      musicId: music?.id || '',
      diggCount: stats?.diggCount || 0,
      shareCount: stats?.shareCount || 0,
      commentCount: stats?.commentCount || 0,
      playCount: stats?.playCount || 0,
      collectCount: stats?.collectCount || 0,
      followingCount: authorStats?.followingCount || 0,
      followerCount: authorStats?.followerCount || 0,
      heartCount: authorStats?.heartCount || 0,
      videoCount: authorStats?.videoCount || 0,
    };
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
    const { limit, page, hashtags, createAt, title } = getVideoDto;
    try {
      const query: any = {};

      if (Array.isArray(hashtags) && hashtags.length > 0) {
        const regexPattern = hashtags.map((tag) => `(${tag})`).join('|');
        query.title = { $regex: regexPattern, $options: 'i' };
      } else if (typeof hashtags === 'string' && hashtags.trim() !== '') {
        query.title = { $regex: hashtags, $options: 'i' };
      }

      if (title && title != '') {
        query.title = { $regex: title, $options: 'i' };
      }

      if (createAt) {
        query.createTime = { $gte: createAt };
      }

      const totalDocuments = await this.tiktokVideoModel.countDocuments(query);
      const totalPage = Math.ceil(totalDocuments / limit);
      const nextPage = page + 1 > totalPage ? null : page + 1;

      const videos = await this.tiktokVideoModel
        .find(query)
        .sort({ diggCount: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      return { videos, totalPage, nextPage };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
