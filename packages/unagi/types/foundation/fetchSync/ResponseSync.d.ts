declare type ResponseSyncInit = [string, ResponseInit];
export declare class ResponseSync extends Response {
    #private;
    get bodyUsed(): boolean;
    constructor(init: ResponseSyncInit);
    text(): string;
    json(): any;
    /**
     * @deprecated Access response properties at the top level instead.
     */
    get response(): this;
    static toSerializable(response: Response): Promise<ResponseSyncInit>;
}
export {};
//# sourceMappingURL=ResponseSync.d.ts.map