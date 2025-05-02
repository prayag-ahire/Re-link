"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomManager = void 0;
class RoomManager {
    constructor() {
        this.rooms = new Map();
    }
    newRoom(roomName, room) {
        this.rooms.set(roomName, room);
    }
}
exports.RoomManager = RoomManager;
