export declare class AppService {
    private readonly langChain;
    constructor();
    translate(text: string, from: string, to: string): Promise<string>;
}
