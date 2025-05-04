import { useContext, useState} from "react"
import { UserLogo } from "./UserLogo"
import { User2Context } from "../context/user2Context";
import { useProfile } from "../hooks/useProfile";
import { useSocket } from "../context/socketContext";

type msg = {
    msg:string,
    sid:number,
    rid:number
}

export const ChatBord = ({v1}:{v1:Map<number,msg[]>})=>{

    const {uprofile} = useContext(User2Context);
    const [text,setText] = useState("");
    const {value} = useProfile();
    const {socket} = useSocket();
   

    const handler = ()=>{

        if(value && socket && uprofile){

            socket.emit("createRoom",`${value.id}-${uprofile?.id}`,value.id,uprofile?.id);
            const data = {
                msg:text,
                sid:value.id,
                rid:uprofile.id
            }
            
            v1.get(uprofile.id)?.push(data);
            console.log(v1.get(uprofile.id));
            socket.emit("chat",`${value.id}-${uprofile?.id}`,value.id,uprofile?.id,text);
            
            
        }

    }

    socket?.on("message",(arg,msg,sid1,sid2)=>{
        console.log("message aagya",msg);
        const data = {
            msg:msg,
            sid:sid1,
            rid:sid2
        }
        v1.get(sid2)?.push(data);
    })

    if(!uprofile){
        return <div className="flex justify-center items-center h-full bg-gray-500 text-white  text-3xl">please select friend</div>
    }

    return(<div className="h-screen">
        <div className="flex h-4/40 items-center py-3 space-x-4 bg-gray-800">
            <div className="pl-2"><UserLogo classname="w-14 h-14"/></div>
            <div className="text-white font-bold text-2xl">{uprofile?.name}</div>
        </div>
        <div className="h-34/40">
        {v1.get(uprofile.id)?.map((x)=>(<div>
                <div className="text-white text-2xl">{x.msg}</div>
            </div>))}
        </div>
        <div className="h-2/40 flex bg-gray-600">
            <div className="w-1/10"></div>
            <div className="flex w-8/10"><input onChange={(x)=>{setText(x.target.value)}} placeholder="Type here . . ." className="bg-gray-400 w-full text-2xl h-full text-white"/><button onClick={handler} className="bg-white w-15">Send</button></div>
            <div className="w-1/10"></div>
        </div>
    </div>)
}