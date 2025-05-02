import { Socket } from "socket.io-client";
import { useProfile } from "./useProfile";

export const socketW = (socket:Socket)=>{
    const {value} = useProfile();
    if(value){
        socket.on("connect",()=>{
            console.log("client side :",socket.id);
        })
    
        socket.emit("user",value.id);
    
        socket.emit("createRoom",`${value.id}-3`,value.id,2);

        socket.emit("chat",`${value.id}-3`,value.id,2,"hello")

        socket.on("message",(arg)=>{
            console.log("got the message",arg);
        })
    }
    
}