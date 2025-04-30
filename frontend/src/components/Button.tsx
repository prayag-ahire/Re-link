import React, { MouseEventHandler } from "react"

export const Button = ({children,onclick,classname}:{classname?:string,onclick:MouseEventHandler<HTMLButtonElement>,children:React.ReactNode})=>{
    return(<div>
        <button onClick={onclick} className={` font-bold text-3xl bg-blue-500 ${classname}`}>{children}</button>
    </div>)
}