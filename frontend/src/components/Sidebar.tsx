import { useNavigate } from "react-router-dom";
import { FriendList } from "./FriendList";
import { Search } from "./Search"
import { UserLogo } from "./UserLogo";
export const Sidebar = ({onclick}:{onclick:React.MouseEventHandler<HTMLDivElement>})=>{

    const navigate = useNavigate();

    const handler = (x:string)=>{
        console.log(x);
    }

   
    return(<div className="space-y-2">
            <div className="flex justify-between items-center">
                <div className="text-3xl pl-2 font-bold text-white" onClick={onclick}>Re:link</div>
                <div className="pr-3 hover:cursor-pointer" onClick={()=>{navigate("/user")}}><UserLogo classname="w-14 h-14"/></div>
            </div>
            <div className="w-full"><Search onchange={(x)=>{handler(x.target.value)}}/></div>
            <FriendList/>
           
    </div>)
}