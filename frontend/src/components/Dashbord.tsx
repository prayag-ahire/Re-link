import axios from "axios";
import { Button } from "./Button";
import { Input } from "./Input";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import { ChatBord } from "./chatbord";

export const Dashbord = ()=>{
    const [isopen,setIsOpen] = useState<boolean>(false);
    const [value,setValue] = useState<string | null>(null);

    const handler = async()=>{
        if(value){
            const res = await axios.post("http://localhost:8080/addfriend",{
                fid:value
            })
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
                    <Input type="text" placeholder="Enter Id" onchange={(x)=>{setValue(x.target.value)}}/>
                    <div className="flex justify-around">
                        <Button onclick={()=>{setIsOpen(false)}}>cancel</Button>
                        <Button onclick={handler}>add</Button>
                    </div>
                  </div>
                  </>)}
        <div className="w-4/5 bg-gray-700">
        <ChatBord/>
        </div>
    </div>)
}