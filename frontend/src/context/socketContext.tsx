import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useProfile } from "../hooks/useProfile";


 interface socketType {
    socket:Socket | null
}
export const SocketContext = createContext<socketType>({socket:null});

export const SocketProvider = ({children}:{children:ReactNode})=>{

    const [socket,setSocket] = useState<Socket | null>(null);
    const {value} = useProfile();

    useEffect(()=>{
        if(!value || socket) return

        const s = io("http://localhost:8080");
        s.on("connect",()=>{
            if(value?.id){
                console.log("connected and emit user");
                s.emit("user",value.id);
            }
        })

        setSocket(s);
        return ()=>{
            s.disconnect();
            setSocket(null);
        }
    },[value?.id])

    return <SocketContext.Provider value={{socket}}>
        {children}
    </SocketContext.Provider>
}

export const useSocket = ()=>useContext(SocketContext)