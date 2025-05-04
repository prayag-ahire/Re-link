import { Socket } from "socket.io";

interface Chat{
    sender:number,
    msg:string,
    reciever:number
}

export class Room{

    private static instance : Room;
    private uid1: number;
    private uid2: number;
    private chat: Chat[];

    constructor(uid1:number,uid2:number){
        this.uid1 = uid1;
        this.uid2 = uid2;
        this.chat = [];
    }

    static getinstance  = (uid1:number,uid2:number)=>{
        if(!this.instance){
            this.instance = new Room(uid1,uid2);
        }
    }

    Chat(msg:string,s2:Socket,uid1:number,uid2:number){
        console.log(msg,uid1,uid2);
        s2.send("message",msg,uid1,uid2);
    }


}