"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
class Room {
    constructor(uid1, uid2) {
        this.uid1 = uid1;
        this.uid2 = uid2;
        this.chat = [];
    }
    Chat(msg, s2) {
        s2.send("message", msg);
    }
}
exports.Room = Room;
_a = Room;
Room.getinstance = (uid1, uid2) => {
    if (!_a.instance) {
        _a.instance = new _a(uid1, uid2);
    }
};
