// import { io, Socket } from "socket.io-client";
// import { useProfile } from "./useProfile";
//  const { value } = useProfile(); 
 
// let socket: Socket | null = null;

// export const connectSocket = () =>{

//     if(!socket){
//         socket = io("http://localhost:8080")
//     }

//     socket.on("connect", () => {
//         console.log("Socket connected:", socket?.id);
//         if (value?.id) {
//             socket?.emit("user", value.id); 
//         }

//     return socket;
// })
// }


// export const getSocket = ()=>{
//     if(!socket){
//         throw new Error("Socket not connected. call connectSocket first")
//     }
//     return socket
// }