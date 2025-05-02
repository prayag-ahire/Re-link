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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const ws_1 = require("./util/ws");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = 8080;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});
(0, ws_1.socket)(io);
const prismaClient = new client_1.PrismaClient();
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield prismaClient.user.findFirst({
            where: {
                name: username
            }
        });
        if (!user) {
            return res.status(400).json({ "message": "Invalid credintials ! user not exist" });
        }
        const match = yield bcryptjs_1.default.compare(password, user.password);
        if (!match) {
            res.status(400).json({ "message": "Invalid credintials !" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user.id }, "chat-app");
        res.json({ token: token });
    }
    catch (error) {
        res.status(500).json({ "message": "user not exist please signup first :)" });
    }
}));
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hash = yield bcryptjs_1.default.hash(password, salt);
    try {
        const user = yield prismaClient.user.findFirst({
            where: {
                name: username
            }
        });
        if (user) {
            return res.status(400).json({ "message": "user exitst please choose diffrent username" });
        }
        else {
            const user = yield prismaClient.user.create({
                data: {
                    name: username,
                    password: hash
                },
                select: {
                    id: true
                }
            });
            const token = jsonwebtoken_1.default.sign({ id: user.id }, "chat-app");
            res.json({ token: token });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('server error');
    }
}));
app.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body;
    console.log(token);
    const tk = token.token + "";
    const id = jsonwebtoken_1.default.verify(tk, "chat-app");
    const uid = id.id;
    try {
        const user = yield prismaClient.user.findFirst({
            where: {
                id: uid
            },
            select: {
                id: true,
                name: true
            }
        });
        console.log(user);
        res.json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('server error');
    }
}));
app.post("/userupdate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, username } = req.body;
    console.log(token);
    const tk = token + "";
    const id = jsonwebtoken_1.default.verify(tk, "chat-app");
    const uid = id.id;
    try {
        const user = yield prismaClient.user.update({
            where: {
                id: uid
            },
            data: {
                name: username
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('server error');
    }
}));
app.post("/friendlist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body;
    console.log(token);
    const tk = token.token + "";
    const id = jsonwebtoken_1.default.verify(tk, "chat-app");
    const uid = id.id;
    try {
        const user = yield prismaClient.user.findFirst({
            where: {
                id: uid
            }, select: {
                friends: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        res.json({ user });
        console.log(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('server error');
    }
}));
app.post("/addfriend", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, fid } = req.body;
    console.log(token);
    const tk = token + "";
    const id = jsonwebtoken_1.default.verify(tk, "chat-app");
    const uid = id.id;
    try {
        const user1 = yield prismaClient.user.update({
            where: {
                id: uid
            },
            data: {
                friends: {
                    connect: { id: Number(fid) }
                }
            }
        });
        const user2 = yield prismaClient.user.update({
            where: {
                id: Number(fid)
            },
            data: {
                friends: {
                    connect: { id: uid }
                }
            }, select: {
                name: true
            }
        });
        res.json({ user2 });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('server error');
    }
}));
server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
