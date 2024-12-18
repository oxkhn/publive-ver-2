declare const module: any;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { TiktokService } from './module/tiktok/tiktok.service';

export const hashtags = [
  '#chamsocda',
  '#suaruamat',
  '#daugoi',
  '#reviewlamdep',
  '#skincarekhoahoc',
  '#làmđẹp',
  '#lamdep',
  '#hoptaccungUnilever',
  '#giamrungtoc',
  '#haircare',
  '#skincare',
  '#chamsoctoc',
  '#reviewdaugoi',
  '#goclamdep',
  '#tocgayrung',
  '#eyecream',
  '#tocrung',
  '#daugoi',
  '#trithammat',
  '#unilever',
  '#phuchoihuton',
  '#beautyofdamage',
  '#trigau',
  '#daugoisachgau',
  '#skincareproducts',
  '#suaduongthe',
  '#lamsachda',
  '#nangtoneda',
  '#chonglaohoa',
  '#sunprotect',
  '#taytebaochet',
  '#chamsoccothe',
  '#taytebaochet',
  '#chamsoccothe',
  '#duongda',
  '#duongnach',
  '#banchaidien',
  '#chamsocrangmiengtainha',
  '#chuyengiasongam',
  '#10xrạngrỡ',
  '#kemdanhrang',
  '#trangbattong',
  '#unileverchamsoccanhan',
  '#suatamserum',
  '#luuhuongthoithuong',
  '#suatamnuochoa',
  '#trieugiacquanbunghuong',
  '#nuocruatay',
  '#sạchmụnsángmịn',
  '#bodyscrub',
  '#suatamnuochoa',
  '#unileverchamsoccanhan',
  '#suatamtrangda',
  '#beauty',
  '#nuocgiat',
  '#OMOMatic',
  '#Chuyengiacuatruoc',
  '#sachthomsieucap',
  '#omo',
  '#viengiatomomatic3trong1tienloi',
  '#nengonsieusucmanhgiatgiu',
  '#trong1buocthay',
  '#NuocGiatComfort',
  '#GiatDuongDaNang',
  '#ChoNangDaZiNang',
  '#nuocgiatdolot',
  '#NướcgiặtđồlótchuyêndụngOMO',
  '#OMO',
  '#nuocgiatdolotOMO',
  '#giatdonhochilachuyennho',
  '#Comfort',
  '#NuocGiatComfortThienNhien',
  '#Comfort',
  '#ComfortTheHeMoi',
  '#NuocXaVaiComfort',
  '#giaythom',
  '#giaythomquanao',
  '#Comfort',
  '#GiấySấyThơmComfort',
  '#GiấyThơmComfort',
  '#NVSSiêuChanhSả',
  '#VimTrắngSáng',
  '#ToiletSángSạchThơm',
  '#vim',
  '#VIMTreoBonCau',
  '#vientreoboncau',
  '#vientreovim',
  '#Sunlightlausan',
  '#sunlightvn',
  '#SunlightRhamnoClean',
  '#SunlightAnToan',
  '#Sachkinkitdonhua',
  '#SunlightVienRuaChen',
  '#QuadWash',
  '#Truesteam',
  '#100ngaythaydoingoaihinh',
  '#dailyroutine',
  '#goclamdep',
  '#duongcanhsangmin',
  '#thoiquentot',
  '#buythisnotthat',
  '#DepNhatDaMinh',
  '#NuôiDuỡngNétĐẹp',
  '#DaMềmMịnHơnTứcThì',
  '#CangBongMinMang',
  '#DonNhaThayTet',
  '#Tresemme',
  '#Sunsilk',
  '#Dovehair',
  '#Clear',
  '#Clearmen',
  '#TREsemmeVN',
  '#sunsilkbuoi',
  '#sunsilk',
  '#daugoisunsilk',
  '#xitbuoisunsilk',
  '#sunsilknatural',
  '#sunsilkvietnam',
  '#ahcvn',
  '#sunsilknganrungtoc',
  '#ahcvietnam',
  '#ahclieutrinhthammyhanquoc',
  '#clear',
  '#9loaithaoduoccotruyen',
  '#clearvietnam',
  '#daugoiclear',
  '#dovevn',
  '#dovehair',
  '#dovekemu',
  '#ClearMenvietnam',
  '#simple',
  '#vaseline',
  '#vsl',
  "#pond's",
  '#srmsimple',
  '#spf50',
  '#glutahya',
  '#vaselineduongthe',
  '#bodytoneup',
  '#waterboost',
  '#refreshing',
  '#Lifebuoy',
  '#banchaidienps',
  '#PS100Pro',
  '#Closeup',
  '#closeupwhitenow',
  '#lifebuoyvietnam',
  '#axe',
  '#axefinefragrance',
  '#lux',
  '#suatamLuxthiendieu',
  '#LifebuoyMatchaKhổQua',
  '#Lifebuoy',
  '#Suatamdetox',
  '#lifebuoyvietnam',
  '#SuatamLifebuoyDetox',
  '#SữatắmLifebuoyVitamin',
  '#dovescrub',
  '#taydachetdove',
  '#taytebaochetdove',
  '#smoothie',
  '#suatamserum',
  '#DocNhatSerum',
  '#SerumProCeramide',
  '#suatamdove',
  '#ĐẹpĐẳngDove',
  '#suatamserum',
  '#DocNhatSerum',
  '#SerumProCeramide',
  '#suatamdove',
  '#ĐẹpĐẳngDove',
  '#suatamluxbotanicals',
  '#suatamlux',
  '#Luxhuonghoathiendieu',
  '#Omo',
  '#nuocgiatomo',
  '#nuocgiatdolot',
  '#Comfort',
  '#LuuHuongThienNhien',
  '#ComfortDiuNhe',
  '#Emmemlanhtinh',
  '#Gapdoithommem',
  '#Omtrondiuem',
  '#giaythom',
  '#giaythomquanao',
  '#HuongBungToa',
  '#Vimhuongbungtoa',
  '#DuongNgoLenMen',
  '#sunlightchanh100',
  '#MayRuaChenLG',
  '#MayRuaBatLG',
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose'],
  });

  // Enable CORS
  app.enableCors({
    origin: '*', // or specify allowed origins such as ['http://example.com']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Apply the global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(7654);

  const tiktokService = await app.resolve(TiktokService);
  // tiktokService.runFetchDataTiktokVideo({ keyword: '#dove', pages: 5 });

  // Sau khi server đã sẵn sàng, bắt đầu loop
  // for (const hashtag of hashtags) {
  //   console.log(`Crawling data for: ${hashtag}`);
  //   await tiktokService.runFetchDataTiktokVideo({ keyword: hashtag, pages: 5 });
  // }

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
