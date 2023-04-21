import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello(): Promise<string> {
    const translated = await this.appService.translate(
      '中国有多少个省？'
    );
    return `Translated: ${translated}`;
  }
}
