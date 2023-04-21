import { Injectable } from '@nestjs/common';
import { OpenAI } from "langchain/llms/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class AppService {
  private readonly langChain: any;

  constructor() {
    const llm = new OpenAI({
      modelName: 'gpt-3.5-turbo',
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.9
    }, {
      baseOptions: {
        // proxy: { prototal: 'http', host: '192.168.3.77', port: '7890' },
        // proxy: { prototal: 'http', host: '192.168.3.176', port: '7890' },
        // proxy: { prototal: 'http', host: '127.0.0.1', port: '7890' },
        proxy: {
          prototal: 'http',
          host: '192.168.3.38',
          port: '7890'
        },
        adapter: null
      }
    })
    const memory = new BufferMemory();
    this.langChain = new ConversationChain({ llm, memory });
  }

  async translate(input: string): Promise<string> {
    console.log('q:', input)
    const res = await this.langChain.call({ input });
    console.log(res)
    return res;
  }
}
