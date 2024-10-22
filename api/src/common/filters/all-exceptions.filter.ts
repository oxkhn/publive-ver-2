// all-exceptions.filter.ts

import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);
  
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx      = host.switchToHttp();
      const request  = ctx.getRequest<Request>();
      const response = ctx.getResponse<Response>();
  
      let status: number;
      let message: any;
  
      if (exception instanceof HttpException) {
        status  = exception.getStatus();
        message = exception.getResponse();
      } else {
        status  = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Internal server error';
      }
  
      // Log the error details
      this.logger.error(
        `Status: ${status} Error: ${JSON.stringify(message)} Path: ${request.url}`,
      );
  
      // Respond to the client
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: message,
      });
    }
  }
  