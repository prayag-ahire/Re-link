
import { UserLogo } from "./UserLogo";
import { useFriendlist } from "../hooks/useFriendlist";

export const FriendList = ()=>{
    
    const {value} = useFriendlist();

    if(!value){
        return <div>Loading...</div>
    }
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