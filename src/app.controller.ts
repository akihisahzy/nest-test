import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('api/chat')
  async getAsk(): Promise<string> {
    const translated = await this.appService.getOpenAIAnswer(
      '中国有多少人口？'
    );
    return `回答: ${translated}`;
  }
}
