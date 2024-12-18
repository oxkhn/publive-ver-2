export class GetVideoDto {
  page: number;
  limit: number;
  hashtags?: string;
  title?: string;
  createAt?: Date;
}
