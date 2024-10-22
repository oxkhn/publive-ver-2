import { HttpService } from '@nestjs/axios';
import { HttpServer, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ScrapeService {
  constructor(private readonly httpService: HttpService) {}
}
