import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  @Cron(CronExpression.EVERY_30_MINUTES)
  handleCron() {
    this.logger.log('Task running every 30 minutes');
  }
}
