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
        // 1. Lọc event
        {
          $match: { event: 'page_view', page: { $regex: '^/product/' } },
        },
        // 2. Trích xuất SKU
        {
          $addFields: {
            sku: {
              $let: {
                vars: {
                  captureResult: {
                    $regexFind: {
                      input: '$page',
                      regex: /\/product\/([A-Za-z0-9\-]+)/,
                    },
                  },
                },
                in: { $arrayElemAt: ['$$captureResult.captures', 0] },
              },
            },
          },
        },
        // 3. Chuyển SKU thành string
        {
          $project: {
            sku: { $toString: { $ifNull: ['$sku', null] } },
          },
        },
        // 4. Nối với Product
        {
          $lookup: {
            from: 'products',
            let: { localSku: '$sku' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: [{ $toString: '$sku' }, '$$localSku'] },
                },
              },
            ],
            as: 'productDetails',
          },
        },
        // 5. Làm phẳng mảng productDetails
        {
          $unwind: {
            path: '$productDetails',
            preserveNullAndEmptyArrays: false,
          },
        },
        // 6. Nhóm lại và đếm số lần xuất hiện
        {
          $group: {
            _id: '$productDetails._id',
            product: { $first: '$productDetails' },
            count: { $sum: 1 },
          },
        },
        // 7. Trình bày kết quả
        {
          $project: {
            _id: 0,
            product: 1,
            count: 1,
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
