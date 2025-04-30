"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userManager = void 0;
class userManager {
    constructor() {
    }
    addUser() {
    }
    removeUser() {
    }
    addFriend(userId) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    removeFriend(userId) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getFriends(userId) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.userManager = userManager;
