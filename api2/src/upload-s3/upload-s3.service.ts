import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadS3Service {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });
  constructor(private readonly configService: ConfigService) {}

  async uploadFile(filename: string, file: Buffer) {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'flex-marketplace',
          Key: 'publive/' + filename,
          Body: file,
        }),
      );

      const urlImage = await this.getUrlFile('publive/' + filename);
      return urlImage;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  convertPath(path: string): string {
    const parsedUrl = new URL(path);

    const protocol = parsedUrl.protocol;
    const hostname = parsedUrl.hostname;
    const pathname = parsedUrl.pathname;

    return protocol + '//' + hostname + pathname;
  }

  async getUrlFile(fileName: string) {
    const command = new GetObjectCommand({
      Bucket: 'flex-marketplace',
      Key: fileName,
    });

    const url = await getSignedUrl(this.s3Client, command, {
      expiresIn: 36000,
    });

    return this.convertPath(url);
  }

  // async downloadImage(url: string, filename: string): Promise<any> {
  //   try {
  //     if (url != null) {
  //       const rs = (
  //         await axios({
  //           url: url,
  //           responseType: 'arraybuffer',
  //         })
  //       ).data as Buffer;

  //       const image = await Jimp.read(rs);
  //       image.resize(272, 272);
  //       const resizedImage = await image.getBufferAsync(Jimp.MIME_JPEG);

  //       // Upload the image to S3
  //       await this.s3Client.send(
  //         new PutObjectCommand({
  //           Bucket: 'flex-marketplace',
  //           Key: 'ipfs/' + filename,
  //           Body: resizedImage,
  //         }),
  //       );

  //       const urlImage = await this.getUrlFile('ipfs/' + filename);

  //       return this.convertPath(urlImage);
  //     }

  //     return url;
  //   } catch (error) {
  //     console.error(`Failed to download image: ${error.message}`);
  //     throw new Error(`Failed to download image: ${error.message}`);
  //   }
  // }

  // async downloadImageGIF(url: string, filename: string): Promise<any> {
  //   try {
  //     if (url != null) {
  //       const rs = (
  //         await axios({
  //           url: url,
  //           responseType: 'arraybuffer',
  //         })
  //       ).data as Buffer;

  //       // Upload the image to S3
  //       await this.s3Client.send(
  //         new PutObjectCommand({
  //           Bucket: 'flex-marketplace',
  //           Key: 'ipfs/' + filename,
  //           Body: rs,
  //         }),
  //       );

  //       const urlImage = await this.getUrlFile('ipfs/' + filename);

  //       return this.convertPath(urlImage);
  //     }

  //     return url;
  //   } catch (error) {
  //     console.error(`Failed to download image: ${error.message}`);
  //     throw new Error(`Failed to download image: ${error.message}`);
  //   }
  // }
}
