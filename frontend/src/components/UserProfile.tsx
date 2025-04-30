import { useEffect, useState } from "react"
import { Input } from "./Input"
import { UserLogo } from "./userLogo"
import { Button } from "./Button";
import axios from "axios";

export const UserProfile = ()=>{
    const [name,setName] = useState("");
    const [userData,setUserData] = useState<any>({});

    useEffect(()=>{
        const fetch = async()=>{
            const token = localStorage.getItem("token");
            
            const res = await axios.post("http://localhost:8080/user",{
                token:token
            });
            const ans = res.data;
            console.log("this is ",ans);
            setUserData(ans);
        }
        fetch();
    },[])

    const handler = async()=>{
        const token = localStorage.getItem("token");

        const res = await axios.post("http://localhost:8080/userupdate",{
            token:token,
            username:name            
        })

        const ans = res.data;
        alert(ans);

    }
    return(<div className="bg-gray-800 w-full h-screen flex justify-center items-center ">
        <div className=" border-2 w-180 h-auto ">
            <div className="flex items-center">
                <div className=" hover:cursor-pointer p-5"><UserLogo classname="w-50 h-50"/></div>
                <div className="space-y-3">
                        <Input type="text" placeholder={userData.user?.name} onchange={(x)=>{setName(x.target.value)}}/>
                        {/* <Input type="text" placeholder={"ahire"} onchange={(x)=>{}}/> */}
                </div>
            </div>
            <div className="w-full flex justify-end p-2">
                <Button classname="rounded p-2" onclick={handler}>update</Button>
            </div>
        </div>
    </div>)
}