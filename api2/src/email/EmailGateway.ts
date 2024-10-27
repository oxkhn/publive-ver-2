import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnQueueActive, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Processor('emailQueue')
export class EmailGateway {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('EmailGateway');

  afterInit(server: Server) {
    this.logger.log('WebSocket server initialized');
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(`Job started for email: ${job.data.email}`);
    this.server.emit('emailProgress', { email: job.data.email });
  }
}
