"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("readline/promises"));
class TerminalInterface {
    static instance;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new TerminalInterface();
        }
        return this.instance;
    }
    async read() {
        const rl = promises_1.default.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const answer = await rl.question(">: ");
        rl.close();
        return answer.split(' ');
    }
    async write(message) {
        message.split('\n').forEach(line => console.log(line));
    }
}
exports.default = TerminalInterface;
