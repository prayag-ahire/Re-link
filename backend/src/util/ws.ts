import { Server } from "socket.io";

export const socket = (io:Server)=>{
    io.on("connection",(socket)=>{
        console.log("socked id :",socket.id);

        socket.on("user",(arg)=>{
            console.log(arg);
        })
    })
}