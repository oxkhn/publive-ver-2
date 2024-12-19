// src/events/dto/create-event.dto.ts

import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateEventDto {
  @IsEnum(['page_view', 'interaction', 'login', 'logout'], {
    message:
      'Event phải là một trong các giá trị: page_view, interaction, login, logout',
  })
  event: string;

  @IsOptional()
  @IsString({ message: 'Page phải là một chuỗi' })
  page?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Timestamp phải là một chuỗi ngày hợp lệ' })
  timestamp?: string;
}
