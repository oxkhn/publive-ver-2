import { HttpStatus } from '@nestjs/common';

export class ResponseSuccess<T> {
  data: T | T[];
  message: string;
  statusCode: HttpStatus;

  constructor(
    data: T | T[],
    message?: string,
    statusCode: HttpStatus = HttpStatus.OK,
  ) {
    this.data = data;
    this.message = message || 'Success';
    this.statusCode = statusCode;
  }
}

export class PaginatedResponseSuccess<T> extends ResponseSuccess<T> {
  totalPages: number;
  nextPage: number;

  constructor(
    data: T | T[],
    statusCode: HttpStatus,
    message: string,
    totalPages: number,
    nextPage: number,
  ) {
    super(data, message, statusCode);
    this.totalPages = totalPages;
    this.nextPage = nextPage;
  }
}

export class ResponseError {
  statusCode: HttpStatus;
  message: string | HttpStatus;

  constructor(message: string | HttpStatus, statusCode: HttpStatus) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
