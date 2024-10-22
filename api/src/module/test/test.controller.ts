import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get()
  async hello() {
    throw new HttpException('Forbidden access', HttpStatus.FORBIDDEN);
  }
}
