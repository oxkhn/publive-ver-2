import { Module } from '@nestjs/common';
import { FormRegisterService } from './form-register.service';
import { FormRegisterController } from './form-register.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FormRegisterAffiliate,
  FormRegisterAffiliateSchema,
} from 'src/common/models/formRegister.model';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forFeature([
      { name: FormRegisterAffiliate.name, schema: FormRegisterAffiliateSchema },
    ]),
  ],
  providers: [FormRegisterService],
  controllers: [FormRegisterController],
})
export class FormRegisterModule {}
