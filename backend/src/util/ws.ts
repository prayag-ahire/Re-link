import { Server } from "socket.io";
import { userManager } from "../managers/userManager";

declare module "socket.io" {
    interface Socket{
        userId:number
    }
}

export const socket = (io:Server)=>{

    const userManger = userManager.getInstance();

    io.on("connection",(socket)=>{
        console.log("socked id :",socket.id);

        socket.on("user",(uid1)=>{
       
            userManger.createUser(uid1,socket);
            socket.userId = uid1;
        })

        socket.on("disconnect",()=>{
            userManger.removeUser(socket.userId);
            console.log(`${socket.userId}`)
        })
        
        socket.on("createRoom",(Roomid,uid1,uid2)=>{
           
            userManger.createRoom(Roomid,uid1,uid2)
        })

        socket.on("chat",(Roomid,uid1,uid2,msg)=>{
            console.log("got message")
            userManger.chat(Roomid,uid1,uid2,msg);  
        })
    })
}