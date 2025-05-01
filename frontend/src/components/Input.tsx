import React, { ChangeEventHandler, ReactNode } from "react"

export const    Input = ({onchange,placeholder,type,value}:{value?:string,type:React.HTMLInputTypeAttribute,onchange:ChangeEventHandler<HTMLInputElement>,placeholder?:string})=>{
    return(<div>
        <input type={type} value={value} className="text-2xl w-full bg-gray-900 placeholder:text-gray-400  p-2 text-white border-white" onChange={onchange} placeholder={placeholder}/>
    </div>)
}