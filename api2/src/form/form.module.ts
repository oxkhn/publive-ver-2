import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import {
  FormRegisterAffiliate,
  FormRegisterAffiliateSchema,
} from 'src/(share)/schemas/form.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: FormRegisterAffiliate.name, schema: FormRegisterAffiliateSchema },
    ]),
  ],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
