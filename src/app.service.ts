import { Injectable } from '@nestjs/common';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { LLMChain, ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { ChatOpenAI } from "langchain/chat_models/openai";
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class AppService {
  private readonly langChain: any;

  constructor() {
    const template = "What is a good name for a company that makes {product}?";
    const prompt = new PromptTemplate({
      template: template,
      inputVariables: ["product"],
    });
    const llm = new OpenAI({
      modelName: 'gpt-3.5-turbo',
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.9
    }, {
      baseOptions: {
        proxy: { prototal: 'http', host: '192.168.3.77', port: '7890' },
        // proxy: { prototal: 'http', host: '127.0.0.1', port: '1087' },
        adapter: null
      }
    })
    const memory = new BufferMemory();
    this.langChain = new ConversationChain({ llm, memory });
  }

  async translate(text: string, from: string, to: string): Promise<string> {
    const resA = await this.langChain.call({ input: "colorful socks" });
    // const chat = new ChatOpenAI({ temperature: 0 });
    // const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    //   SystemMessagePromptTemplate.fromTemplate(
    //     "You are a helpful assistant that translates {input_language} to {output_language}."
    //   ),
    //   HumanMessagePromptTemplate.fromTemplate("{text}"),
    // ]);
    // const chainB = new LLMChain({
    //   prompt: chatPrompt,
    //   llm: chat,
    // });
    // const resB = await chainB.call({
    //   input_language: from,
    //   output_language: to,
    //   text,
    // });
    // const { translated } = resB
    // const translated = await this.langChain.translate(text, from, to);
    return resA;
  }
}
