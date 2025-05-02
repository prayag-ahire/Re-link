import { useContext, useState} from "react"
import { UserLogo } from "./UserLogo"
import { User2Context } from "./user2Context";

export const ChatBord = ()=>{

    const {uprofile} = useContext(User2Context);
    const [text,setText] = useState();



    const inputField = document.getElementById("im");
    inputField?.addEventListener("keydown",(e)=>{
        if(e.key === "Enter"){
            e.preventDefault();
            alert("you press enter")
        }
    }) 

    if(!uprofile){
        return <div className="flex justify-center items-center h-full bg-gray-500 text-white  text-3xl">please select friend</div>
    }
    console.log(uprofile);
    return(<div className="h-screen">
        <div className="flex h-4/40 items-center py-3 space-x-4 bg-gray-800">
            <div className="pl-2"><UserLogo classname="w-14 h-14"/></div>
            <div className="text-white font-bold text-2xl">{uprofile?.name}</div>
        </div>
        <div className="h-34/40"></div>
        <div className="h-2/40 flex bg-gray-600">
            <div className="w-1/10"></div>
            <div className=" w-8/10"><input id="im" placeholder="Type here . . ." className="bg-gray-400 w-full text-2xl h-full text-white"/></div>
            <div className="w-1/10"></div>
        </div>
    </div>)
}