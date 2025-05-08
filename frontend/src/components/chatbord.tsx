import { useContext, useEffect, useState} from "react"
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
    const [render,setRender] = useState<boolean>(false);

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
            setRender(!render);
            socket.emit("chat",`${value.id}-${uprofile?.id}`,value.id,uprofile?.id,text);
            
            
        }

    }

    useEffect(()=>{
        if(!socket) return;

        const handler = (arg:string,msg:string,sid1:number,sid2:number)=>{
            
            
            console.log("message aagya",arg,msg,sid2,sid1);
            const data = {
                msg:msg,
                sid:sid1,
                rid:sid2
            }
            console.log(v1.get(sid1))
            setRender(!render);
            v1.get(sid1)?.push(data);
        }

        socket?.on("message",handler);
        
        return ()=>{
            socket.off("message",handler);
        }
        
    },[socket,v1,render])

   
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
                {x.rid === uprofile.id ? 
                
                <div className="flex justify-end">
                    
                    <div className="p-4 bg-slate-600 max-w-[80%] mt-4  rounded-br-2xl rounded-l-2xl ">
                        <p className="text-white text-xl font-bold">{x.msg}</p>
                    </div>
                    <div className="pl-2"><UserLogo classname="w-14 h-14"/></div>
                </div>:

                <div className="flex">
                    <div className="pl-2"><UserLogo classname="w-14 h-14"/></div>
                    <div className="p-4 bg-gray-500 max-w-[80%] mt-4 ml-2 rounded-bl-2xl rounded-r-2xl ">
                        <p className="text-white text-xl font-bold">{x.msg}</p>
                    </div>
                </div>
                }
            </div>))}
        </div>
        <div className="h-2/40 flex bg-gray-600">
            <div className="w-1/10"></div>
            <div className="flex w-8/10"><input type="text" id="intext" onChange={(x)=>{setText(x.target.value)}} placeholder="Type here . . ." className="bg-gray-400 w-full text-2xl h-full text-white"/><button onClick={handler} className="bg-white w-15">Send</button></div>
            <div className="w-1/10"></div>
        </div>
    </div>)
}