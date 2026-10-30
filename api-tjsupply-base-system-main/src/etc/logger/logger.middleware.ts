import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger()

  use(req: any, res: any, next: () => void) {
    this.logger.log(`${req.method} ${req.originalUrl}`, req.ip)
    next();
  }
}
