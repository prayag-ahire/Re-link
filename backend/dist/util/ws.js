"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
const socket = (io) => {
    io.on("connection", (socket) => {
        console.log("socked id :", socket.id);
    });
};
exports.socket = socket;
