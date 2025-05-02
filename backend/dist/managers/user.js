"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const room_1 = require("./room");
class User {
    constructor(socket) {
        this.socket = socket;
        this.rooms = new Map();
    }
    createRoom(id, uid1, uid2) {
        const room = new room_1.Room(uid1, uid2);
        this.rooms.set(id, room);
        console.log("room created");
        console.log("total room ", this.rooms);
    }
    getRoom(id) {
        return this.rooms.get(id);
    }
}
exports.User = User;
