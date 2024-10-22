import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common';
import { CampaignEmail } from 'src/common/models/campaignEmail.model';

@Processor('emailQueue')
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);
  constructor(private readonly mailerService: MailerService) {}

  @Process('sendEmailJob')
  async handleSendEmail(job: Job<{ email: string; campaign: CampaignEmail }>) {
    const { email, campaign } = job.data;

    this.logger.log(`Sending email to ${email}`);

    try {
      // const filePath = path.join(
      //   process.cwd(),
      //   'src',
      //   'common',
      //   'templates',
      //   campaign.templatePath,
      // );

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
          // this.mailService.createMailLog(email, campaign, true);
          this.logger.log(`Send mail ${email} success.`);
        })
        .catch((error) => {
          this.logger.error(`Failed to send email to ${email}`, error.stack);

          // this.mailService.createMailLog(email, campaign, false);
        });
    } catch (error) {
      this.logger.error(`Failed to send email to ${email}`, error.stack);
    }
  }
}
