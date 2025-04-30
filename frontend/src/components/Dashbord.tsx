import { Sidebar } from "./Sidebar";

export const Dashbord = ()=>{

    return(<div className="flex w-full h-screen">
        <div className="w-1/5 bg-slate-800  justify-center ">
           <Sidebar/>
        </div>
        <div className="w-4/5 bg-gray-700">
            
        </div>
    </div>)
}