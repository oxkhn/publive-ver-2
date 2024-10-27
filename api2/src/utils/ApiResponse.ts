import { HttpStatus } from '@nestjs/common';

/**
 * Lớp cơ sở cho phản hồi API thành công
 */
export class ApiResponse<T> {
  data: T | T[];
  message: string;
  statusCode: HttpStatus;

  constructor(
    data: T | T[],
    message: string = 'Success',
    statusCode: HttpStatus = HttpStatus.OK,
  ) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }
}

/**
 * Lớp phản hồi API thành công với phân trang
 */
export class PaginatedApiResponse<T> extends ApiResponse<T> {
  totalPages: number;
  currentPage: number;
  perPage: number;
  totalItems: number;
  nextPage: number | null;

  constructor(
    data: T | T[],
    totalItems: number,
    currentPage: number,
    perPage: number,
    message: string = 'Success',
    statusCode: HttpStatus = HttpStatus.OK,
  ) {
    super(data, message, statusCode);
    this.totalItems = totalItems;
    this.currentPage = currentPage;
    this.perPage = perPage;
    this.totalPages = Math.ceil(totalItems / perPage);
    this.nextPage = currentPage + 1 > this.totalPages ? null : currentPage + 1;
  }
}

/**
 * Lớp phản hồi API khi có lỗi xảy ra
 */
export class ApiError {
  message: string;
  statusCode: HttpStatus;

  constructor(message: string, statusCode: HttpStatus) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
