import { UserLogo } from "./userLogo"

export const ChatBord = ()=>{
    return(<div className="h-screen">
        <div className="flex h-2/20 items-center py-3 space-x-4 bg-gray-800">
            <div className="pl-2"><UserLogo classname="w-14 h-14"/></div>
            <div className="text-white font-bold text-2xl">prayag</div>
        </div>
        <div className="h-17/20"></div>
        <div className="h-1/20">
            <div></div>
            <div></div>
        </div>
    </div>)
}