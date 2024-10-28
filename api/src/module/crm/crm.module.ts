import { Module } from '@nestjs/common';
import { CrmController } from './crm.controller';
import { CrmService } from './crm.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CRMData, CRMDataSchema } from 'src/common/models/crmData.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CRMData.name, schema: CRMDataSchema }]),
  ],
  controllers: [CrmController],
  providers: [CrmService],
})
export class CrmModule {}
