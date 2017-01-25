"use strict";
const events_1 = require("events");
var PacketType;
(function (PacketType) {
    PacketType[PacketType["Error"] = 1] = "Error";
    PacketType[PacketType["Success"] = 2] = "Success";
})(PacketType || (PacketType = {}));
class WaitForIt {
    constructor() {
        this.emitter = new events_1.EventEmitter();
    }
    error(id, err) {
        this.emit(id, PacketType.Error, err);
    }
    push(id, payload) {
        this.emit(id, PacketType.Success, payload);
    }
    wait(id, timeout = 0) {
        return new Promise((res, rej) => {
            let handler = this.handler(res, rej);
            this.emitter.once(id, handler);
            if (timeout !== 0) {
                this.emitter.removeListener(id, handler);
                let error = new Error("Wait timed out");
                rej(error);
            }
        });
    }
    emit(id, type, payload) {
        this.emitter.emit(id, { type, payload });
    }
    handler(res, rej) {
        return (packet) => {
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
        };
    }
}
exports.WaitForIt = WaitForIt;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WaitForIt;
//# sourceMappingURL=index.js.map