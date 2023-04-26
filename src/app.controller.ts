import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('api/chat')
  async create(@Body() data: any): Promise<any> {
    const res = await this.appService.getOpenAIAnswer(
      data.data
    );
    return res;
  }
  @Get()
  async getAsk(): Promise<string> {
    const res = await this.appService.getOpenAIAnswer(
      '下午犯困怎么办？'
    );
    return res;
  }
}                                                                                                                                                                                                                                                                                                
