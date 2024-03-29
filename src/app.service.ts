import { Injectable } from '@nestjs/common';
import { OpenAI } from "langchain/llms/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class AppService {
  private llm: any;
  private langChain: any;

  constructor() {
    this.llm = new OpenAI({
      // modelName: process.env.MODEL_NAME,
      // openAIApiKey: process.env.OPENAI_API_KEY,
      // temperature: 0.9
    }, {
      basePath: 'http://172.16.0.142:3001/v1',
      // baseOptions: {
      //   proxy: { prototal: 'http', host: '192.168.3.177', port: '7890' },
      //   adapter: null
      // }
    })
    const memory = new BufferMemory();
    this.langChain = new ConversationChain({ llm: this.llm, memory });
  }

  async getOpenAIAnswer(input: string): Promise<string> {
    console.log('q:', input)
    const res = await this.langChain.call({ input });
    console.log('a:', res.response)
    return res.response;
  }
}
