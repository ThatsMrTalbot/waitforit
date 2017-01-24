import {EventEmitter} from 'events';

enum PacketType {
    Error = 1,
    Success,
}

interface Packet<T> {
    type : PacketType
    payload : T
}

export class WaitForIt {
    private emitter = new EventEmitter();

    error<T>(id : string, err : T) {
        this.emit(id, PacketType.Error, err)
    }

    push<T>(id : string, payload : T) {
        this.emit(id, PacketType.Success, payload)
    }

    wait<T>(id : string, timeout = 0) : Promise<T> {
        return new Promise<T>((res, rej) => {
            let handler = this.handler(res, rej)
            this.emitter.once(id, handler)

            if (timeout !== 0) {
                this.emitter.removeListener(id, handler);
                let error = new Error("Wait timed out");
                rej(error);
            }
        })
    }

    private emit<T>(id : string, type : PacketType, payload : T) {
        this.emitter.emit(id, {type, payload})
    }

    private handler<T>(res : any, rej : any) {
        return (packet : Packet<T>) => {
            switch (packet.type) {
                case PacketType.Success:
                    res(packet.payload);
                    break;
                case PacketType.Error:
                    rej(packet.payload);
                    break;
                default:
                    let error = new Error("Invalid packet type");
                    rej(error);
                    break;
            }
        }
    }
}

export default WaitForIt