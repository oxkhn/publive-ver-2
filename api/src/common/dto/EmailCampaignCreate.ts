import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsString } from 'class-validator';

export class EmailCampaignCreate {
  @IsString()
  name: string;

  @IsString()
  status: string;

  @IsString()
  publisher: string;

  @IsDate()
  @Type(() => Date)
  pushlishTime: Date;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  templatePath: string;

  @IsString()
  _id: string;
}
