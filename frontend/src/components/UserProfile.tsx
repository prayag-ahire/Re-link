import {useState } from "react"
import { Input } from "./Input"
import { UserLogo } from "./UserLogo"
import { Button } from "./Button";
import axios from "axios";
import { useProfile } from "../hooks/useProfile";


export const UserProfile = ()=>{
    const [name,setName] = useState("");
    const {value} = useProfile();
    

    const handler = async()=>{
        

        const token = localStorage.getItem("token");

        const res = await axios.post("http://localhost:8080/userupdate",{
            token:token,
            username:name            
        })

        const ans = res.data;
        
        alert("update :"+ans);

    }

    if(!value){
        return <div className="bg-gray-800 w-full h-screen flex justify-center items-center">loading...</div>
    }
    return(<div className="bg-gray-800 w-full h-screen flex justify-center items-center ">
        <div className=" border-2 w-180 h-auto ">
            <div className="flex items-center">
                <div className=" hover:cursor-pointer p-5"><UserLogo classname="w-50 h-50"/></div>
                <div className="space-y-3 rounded">
                        <Input placeholder={value.name} type="text"  onchange={(x)=>{setName(x.target.value)}}/>
                        {/* <Input type="text" placeholder={"ahire"} onchange={(x)=>{}}/> */}
                </div>
            </div>
            <div className="w-full flex justify-end p-2">
                <Button classname="rounded p-2" onclick={handler}>update</Button>
            </div>
        </div>
    </div>)
}