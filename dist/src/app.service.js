"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("langchain/llms/openai");
const chains_1 = require("langchain/chains");
const memory_1 = require("langchain/memory");
const dotenv = require("dotenv");
dotenv.config();
let AppService = class AppService {
    constructor() {
        const llm = new openai_1.OpenAI({
            modelName: 'gpt-3.5-turbo',
            openAIApiKey: process.env.OPENAI_API_KEY,
            temperature: 0.9
        }, {
            baseOptions: {
                proxy: { prototal: 'http', host: '192.168.3.176', port: '7890' },
            }
        });
        const memory = new memory_1.BufferMemory();
        this.langChain = new chains_1.ConversationChain({ llm, memory });
    }
    async translate(input) {
        console.log('q:', input);
        const res = await this.langChain.call({ input });
        console.log(res);
        return res;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map