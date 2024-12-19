import { Module } from '@nestjs/common';
import { FormRegisterService } from './form-register.service';
import { FormRegisterController } from './form-register.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FormRegisterAffiliate,
  FormRegisterAffiliateSchema,
} from 'src/common/models/formRegister.model';
import { ProductModule } from '../product/product.module';
import { User, UserSchema } from 'src/common/models/user.model';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forFeature([
      { name: FormRegisterAffiliate.name, schema: FormRegisterAffiliateSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [FormRegisterService],
  controllers: [FormRegisterController],
})
export class FormRegisterModule {}
