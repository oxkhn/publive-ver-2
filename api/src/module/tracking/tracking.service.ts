import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from 'src/common/dto/CreateEvent.dto';
import { Event } from 'src/common/models/event.model';
import { User } from 'src/common/models/user.model';

@Injectable()
export class TrackingService {
  constructor(
    @InjectModel(User.name) private readonly usertModel: Model<User>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  async postEvent(event: CreateEventDto, email: string) {
    try {
      const newEvent = new this.eventModel(event);

      if (email) {
        const user = await this.usertModel.findOne({ email: email });
        if (user) {
          user.lastActive = new Date(Date.now());
          await user.save();
        }

        newEvent.userId = user._id;
      }

      await newEvent.save();
      return newEvent;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getAllEventPage() {
    try {
      const results = await this.eventModel.aggregate([
        {
          $match: { event: 'page_view' }, // Filter events where event = 'page_view'
        },
        {
          $group: {
            _id: '$page', // Group by the 'page' field
            count: { $sum: 1 }, // Count the number of occurrences
          },
        },
        {
          $sort: { count: -1 }, // (Optional) Sort by count descending
        },
      ]);

      return results;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private extractProductId(page: string): string | null {
    const match = page.match(/^\/product\/(\w+)/);
    return match ? match[1] : null;
  }

  async getProductPageViewCounts(): Promise<any[]> {
    try {
      const results = await this.eventModel.aggregate([
        // Stage 1: Lọc các sự kiện 'page_view' liên quan đến sản phẩm
        {
          $match: {
            event: 'page_view',
            page: { $regex: '^/product/' },
          },
        },
        // Stage 2: Trích xuất SKU từ URL bằng $regexFind
        {
          $addFields: {
            skuExtracted: {
              $regexFind: {
                input: '$page',
                regex: /^\/product\/([A-Za-z0-9\-]+)/, // Điều chỉnh regex tùy theo định dạng SKU
              },
            },
          },
        },
        // Stage 3: Chiếu SKU vào một trường mới
        {
          $project: {
            sku: { $ifNull: ['$skuExtracted.captures.0', null] },
          },
        },
        // Stage 4: Loại bỏ các sự kiện không có SKU
        {
          $match: { sku: { $ne: null } },
        },
        // Stage 5: Nối với bộ sưu tập Product thông qua SKU
        {
          $lookup: {
            from: 'products', // Tên của bộ sưu tập Product
            localField: 'sku', // SKU trích xuất từ Event
            foreignField: 'sku', // SKU trong Product
            as: 'productDetails',
          },
        },
        // Stage 6: Làm phẳng productDetails để mỗi dòng chỉ chứa một product
        {
          $unwind: {
            path: '$productDetails',
            preserveNullAndEmptyArrays: true, // Để các event không có sản phẩm vẫn hiển thị
          },
        },
        // Stage 7: Nhóm theo sản phẩm và đếm số lần xuất hiện
        {
          $group: {
            _id: '$productDetails._id', // Nhóm theo ID của sản phẩm
            product: { $first: '$productDetails' }, // Lấy thông tin chi tiết sản phẩm
            count: { $sum: 1 }, // Đếm số lần xuất hiện
          },
        },
        // Stage 8: Sắp xếp theo số lần xuất hiện (tùy chọn)
        {
          $sort: { count: -1 },
        },
        // Stage 9: Trình bày kết quả mong muốn
        {
          $project: {
            _id: 0, // Ẩn _id, chỉ hiển thị thông tin chi tiết
            product: 1, // Chi tiết sản phẩm
            count: 1, // Số lần xuất hiện của sản phẩm
          },
        },
      ]);

      return results;
    } catch (error) {
      // Handle errors appropriately
      throw new Error(`Aggregation failed: ${error.message}`);
    }
  }
}
