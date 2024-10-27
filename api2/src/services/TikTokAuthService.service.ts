import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as crypto from 'crypto';

@Injectable()
export class TikTokAuthService {
  generateCsrfToken(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  getTikTokAuthUrl(csrfState: string): string {
    const clientKey = process.env.CLIENT_KEY;
    const redirectUri = process.env.SERVER_ENDPOINT_REDIRECT;

    let url = 'https://www.tiktok.com/v2/auth/authorize/';
    url += `?client_key=${clientKey}`;
    url += '&scope=user.info.basic';
    url += '&response_type=code';
    url += `&redirect_uri=${encodeURIComponent(redirectUri)}`;
    url += `&state=${csrfState}`;

    return url;
  }

  setCsrfCookie(res: Response, csrfState: string): void {
    res.cookie('csrfState', csrfState, { maxAge: 60000 });
  }
}
