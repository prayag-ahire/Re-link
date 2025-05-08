import axios from "axios";
import { Button } from "./Button";
import { Input } from "./Input";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import { ChatBord } from "./chatbord";
import { useFriendlist } from "../hooks/useFriendlist";

export const Dashbord = ()=>{
    type msg = {
        msg:string,
        sid:number,
        rid:number
    }
    const [isopen,setIsOpen] = useState<boolean>(false);
    const [values,setValues] = useState<string | null>(null);
    const {value} = useFriendlist();
    const message = new Map<number,msg[]>();
    value?.map((x)=>message.set(x.id,[]));
    console.log(message)
   
    const handler = async()=>{
        if(values){
            console.log(values)
            const token = localStorage.getItem("token");
            await axios.post("http://ec2-184-72-139-174.compute-1.amazonaws.com:3000/addfriend",{
                token:token,
                fid:values
            })

            alert("added succseful");
            setIsOpen(false);
        }
    }
    return(<div className="flex w-full h-screen">
        <div className="w-1/5 bg-slate-800  justify-center pt-3">
           <Sidebar onclick={()=>{setIsOpen(true)}}/>
        </div>
         {isopen && (
            <>
            <div className="fixed inset-0 z-40  bg-opacity-30 backdrop-blur-xs" />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  bg-gray-900 p-6 rounded-lg shadow-xl space-y-5 z-50 w-80 h-48 " >
                    <Input type="text" placeholder="Enter Id" onchange={(x)=>{setValues(x.target.value)}}/>
                    <div className="flex justify-around">
                        <Button classname="rounded-xl p-2" onclick={()=>{setIsOpen(false)}}>cancel</Button>
                        <Button classname="rounded-xl p-2" onclick={handler}>add</Button>
                    </div>
                  </div>
                  </>)}
        <div className="w-4/5 bg-gray-700">
        <ChatBord v1={message}/>
        </div>
    </div>)
}