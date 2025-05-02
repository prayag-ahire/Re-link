"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userManager = void 0;
const user_1 = require("./user");
class userManager {
    constructor() {
        this.users = new Map();
    }
    // this is singletone class so only one instance 
    static getInstance() {
        if (!this.instance) {
            this.instance = new userManager();
        }
        return this.instance;
    }
    // create new user and store it in map
    createUser(id, socket) {
        const user = new user_1.User(socket);
        this.users.set(id, user);
        console.log(this.users);
    }
    // give the user 
    getUser(id) {
        return this.users.get(id);
    }
    createRoom(Roomid, id1, id2) {
        const user = this.getUser(id1);
        user === null || user === void 0 ? void 0 : user.createRoom(Roomid, id1, id2);
    }
    chat(Roomid, uid1, uid2, msg) {
        var _a;
        const user = this.getUser(uid1);
        const room = user === null || user === void 0 ? void 0 : user.getRoom(Roomid);
        const s2 = (_a = this.getUser(uid2)) === null || _a === void 0 ? void 0 : _a.socket;
        if (s2) {
            room === null || room === void 0 ? void 0 : room.Chat(msg, s2);
        }
    }
}
exports.userManager = userManager;
