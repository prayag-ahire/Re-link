import axios from "axios";
import { useEffect, useState } from "react"
import { UserLogo } from "./userLogo";

export const FriendList = ()=>{
    
    const [value,setValue] = useState<{name:string}[]>([]);

    useEffect(()=>{
        const fetch = async()=>{
            const token = localStorage.getItem("token");
            const res = await axios.post("http://localhost:8080/friendlist",{
                token:token
            });
            const ans = res.data;
            setValue(ans.user.friends);
            console.log("friends:",ans.user.friends);
        }
        fetch();
    },[]);
    return(<div>
        {value.map((x)=>(
            <div>
            <div className="flex space-x-5 items-center ">
                <div><UserLogo classname="w-14 h-14"/></div>
                <div className="w-full space-y-1">
                    <div className="flex justify-between text-white items-center">
                        <div className="text-2xl">{x.name}</div>
                        <div className="pr-2">now</div>
                    </div>
                    <div className="text-gray-400">last message</div>
                </div>
            </div>
            <div className="h-0.5 my-2 bg-amber-50 w-full"></div>
        </div>
        ))}
    </div>)
}