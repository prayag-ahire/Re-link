
import { UserLogo } from "../components/UserLogo";
import { useContext, useEffect } from "react";
import { User2Context } from "./user2Context";
import { FriendContext } from "./FriendContext";
import axios from "axios";

export const FriendList = ()=>{
    
    const {setValue} = useContext(User2Context);
    
    const  {value} = useContext(FriendContext);

    useEffect(()=>{

        const fetchData = async()=>{
            const token = localStorage.getItem("token");
            const res = await axios.post("http://ec2-184-72-139-174.compute-1.amazonaws.com:3000/friendlist",{
                token:token
            })
            const ans = res.data;
            setValue(ans.user.friends);
        };
        if(!value ){   
            console.log("fateching it agine") 
            fetchData();
        }
    },[])

    if(!value){
        return <div>Loading...</div>
    }
    return(<div>
        {value.map((x)=>(
            <div key={x.id} onClick={()=>{setValue(x)}}>
            <div className="flex pl-1 space-x-5 items-center ">
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