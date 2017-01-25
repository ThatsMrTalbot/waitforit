export declare class WaitForIt {
    private emitter;
    error<T>(id: string, err: T): void;
    push<T>(id: string, payload: T): void;
    wait<T>(id: string, timeout?: number): Promise<T>;
    private emit<T>(id, type, payload);
    private handler<T>(res, rej);
}
export default WaitForIt;
