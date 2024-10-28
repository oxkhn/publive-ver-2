import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common';
import {
  CampaignEmail,
  CampaignEmailWithId,
} from 'src/common/models/campaignEmail.model';
import { EmailService } from './email.service';

@Processor('emailQueue')
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);
  constructor(
    private readonly mailerService: MailerService,
    private readonly emailService: EmailService,
  ) {}

  @Process('sendEmailJob')
  async handleSendEmail(
    job: Job<{ email: string; campaign: CampaignEmailWithId }>,
  ) {
    const { email, campaign } = job.data;

    this.logger.log(`Sending email to ${email}`);

    try {
      // Hàm để đọc template và thay thế URL banner và content
      const createEmailContent = async (templateName: string) => {
        const templatePath = path.join(
          __dirname,
          '..',
          'src',
          'common',
          'template',
          templateName,
        );

        if (!fs.existsSync(templatePath)) {
          this.logger.error(`Template file does not exist: ${templatePath}`);
          throw new Error(`Template file not found: ${templatePath}`);
        }

        let htmlContent = fs.readFileSync(templatePath, 'utf-8');
        return htmlContent;
      };

      const transport = {
        host: campaign.host,
        port: campaign.port,
        secure: campaign.secure,
        auth: {
          user: campaign.username,
          pass: campaign.password,
        },
      };

      // Read the HTML file content
      this.mailerService.addTransporter('custom', transport);

      const htmlContent = await createEmailContent(campaign.templatePath);

      await this.mailerService
        .sendMail({
          transporterName: 'custom',
          to: email,
          subject: campaign.subject,
          html: htmlContent,
        })
        .then(() => {
          this.logger.log(`Send mail ${email} success.`);
          this.emailService.logEmail(
            email,
            campaign.subject,
            'sent',
            campaign._id,
          );
        })
        .catch((error) => {
          this.logger.error(`Failed to send email to ${email}`, error.stack);
          this.emailService.logEmail(
            email,
            campaign.subject,
            'failed',
            campaign._id,
            error.message,
          );
        });
    } catch (error) {
      this.logger.error(`Failed to send email to ${email}`, error.stack);
      this.emailService.logEmail(
        email,
        campaign.subject,
        'failed',
        campaign._id,
        error.message,
      );
    }
  }
}
