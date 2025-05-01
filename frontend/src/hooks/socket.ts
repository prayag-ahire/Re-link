import { Socket } from "socket.io-client";
import { useProfile } from "./useProfile";

export const socketW = (socket:Socket)=>{
    const {value} = useProfile();
    socket.on("connect",()=>{
        console.log("client side :",socket.id);
    })

    socket.emit("user",value?.id);
}