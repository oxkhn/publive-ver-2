import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import * as path from 'path';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Campaign, CampaignWithId } from 'src/(share)/schemas/campaign.schema';
import { Email } from 'src/(share)/schemas/email.schema';
import { MailLog } from 'src/(share)/schemas/mailLog.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(
    private readonly mailerService: MailerService,
    @InjectModel(MailLog.name) private mailLogModel: Model<MailLog>,
    @InjectQueue('emailQueue') private emailQueue: Queue,
  ) {}

  // Hàm để đọc template và thay thế URL banner và content
  createEmailContent = async (bannerUrl, content) => {
    const templatePath = path.join(
      process.cwd(),
      'src',
      'email',
      'templates',
      `1.html`,
    );
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');

    // Thay thế placeholder trong HTML với banner URL và content từ database
    htmlContent = htmlContent.replace('{{bannerUrl}}', bannerUrl);
    htmlContent = htmlContent.replace('{{content}}', content);

    return htmlContent;
  };

  async sendMail(user: {
    email: string;
    name: string;
    template?: string;
    bannerUrl: string;
    content: string;
  }) {
    try {
      const filePath = path.join(
        process.cwd(),
        'src',
        'services',
        'templates',
        user.template || `example-template.html`,
      );

      // Read the HTML file content
      let htmlContent = fs.readFileSync(filePath, 'utf8');

      // Replace placeholders in the HTML content
      htmlContent = htmlContent.replace('{{name}}', user.name);

      const emailContent = this.createEmailContent(
        user.bannerUrl,
        user.content,
      );

      // Send the email
      await this.mailerService.sendMail({
        to: user.email, // recipient
        subject: 'Welcome to Our Service', // subject
        html: htmlContent, // HTML content
      });
    } catch (error) {
      this.logger.error(`Failed to send email to ${user.email}`, error.stack);
    }
  }

  async addEmailJobs(emailList: Email[], campaign: Campaign) {
    try {
      for (const emailData of emailList) {
        this.emailQueue.add('sendEmail', {
          email: emailData.email,
          campaign,
        });
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createMailLog(email: string, campaign: any, status: boolean) {
    try {
      const newMailLog = new this.mailLogModel({
        email,
        campaignId: campaign._id,
        status,
        from: campaign.configEmail.user,
        to: email,
        template: campaign.template,
        sentAt: new Date(),
      });

      await newMailLog.save();
    } catch (error) {
      this.logger.error(`Failed to log email to ${email}`, error.stack);
    }
  }
}
