"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
const userManager_1 = require("../managers/userManager");
const socket = (io) => {
    const userManger = userManager_1.userManager.getInstance();
    io.on("connection", (socket) => {
        console.log("socked id :", socket.id);
        socket.on("user", (uid1) => {
            console.log(uid1);
            userManger.createUser(uid1, socket);
        });
        socket.on("createRoom", (Roomid, uid1, uid2) => {
            userManger.createRoom(Roomid, uid1, uid2);
        });
        socket.on("chat", (Roomid, uid1, uid2, msg) => {
            userManger.chat(Roomid, uid1, uid2, msg);
        });
    });
};
exports.socket = socket;
