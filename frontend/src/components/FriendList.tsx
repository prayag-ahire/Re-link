
import { UserLogo } from "./UserLogo";
import { useFriendlist } from "../hooks/useFriendlist";
import { useContext } from "react";
import { User2Context } from "./user2Context";

export const FriendList = ()=>{
    
    const {value} = useFriendlist();
    const {setValue} = useContext(User2Context);

    if(!value){
        return <div>Loading...</div>
    }
    return(<div>
        {value.map((x)=>(
            <div onClick={()=>{setValue(x)}}>
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