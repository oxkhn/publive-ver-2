import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import { Campaign, CampaignWithId } from 'src/(share)/schemas/campaign.schema';
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common';
import { MailService } from './MailService';

@Processor('emailQueue')
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);
  constructor(
    private readonly mailerService: MailerService,
    private readonly mailService: MailService,
  ) {}

  @Process('sendEmail')
  async handleSendEmail(job: Job<{ email: string; campaign: CampaignWithId }>) {
    const { email, campaign } = job.data;

    this.logger.log(`Sending email to ${email}`);

    try {
      const filePath = path.join(
        process.cwd(),
        'src',
        'email',
        'templates',
        `1.html`,
      );

      // Hàm để đọc template và thay thế URL banner và content
      const createEmailContent = async (bannerUrl, content) => {
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

      // const transport = {
      //   host: campaign.configEmail.host,
      //   port: campaign.configEmail.port,
      //   secure: false,
      //   auth: {
      //     user: campaign.configEmail.user,
      //     pass: campaign.configEmail.pass,
      //   },
      // };

      // Read the HTML file content
      let htmlContent = fs.readFileSync(filePath, 'utf8');
      // this.mailerService.addTransporter('custom', transport);

      htmlContent = await createEmailContent(
        campaign.banner,
        campaign.description,
      );

      await this.mailerService
        .sendMail({
          to: email,
          subject: campaign.name,
          html: htmlContent,
        })
        .then(() => {
          // this.mailService.createMailLog(email, campaign, true);
        })
        .catch((error) => {
          // this.mailService.createMailLog(email, campaign, false);
        });
    } catch (error) {
      this.logger.error(`Failed to send email to ${email}`, error.stack);
    }
  }
}
