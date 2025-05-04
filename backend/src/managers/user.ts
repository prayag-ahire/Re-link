import { Socket } from "socket.io";
import { Room } from "./room";

export class User {

    socket : Socket
    private rooms: Map<string,Room>

    constructor(socket:Socket){
        this.socket = socket
        this.rooms = new Map();
    }

    createRoom(id:string,uid1:number,uid2:number){
       const room = new Room(uid1,uid2);
       this.rooms.set(id,room);
       
    }

    getRoom(id:string){
        return this.rooms.get(id);
    }


}