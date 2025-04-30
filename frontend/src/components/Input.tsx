import React, { ChangeEventHandler } from "react"

export const Input = ({onchange,placeholder,type}:{type:React.HTMLInputTypeAttribute,onchange:ChangeEventHandler<HTMLInputElement>,placeholder:string})=>{
    return(<div>
        <input type={type} className="text-2xl w-full border-2 placeholder:text-gray-400 p-2 text-white border-white" onChange={onchange} placeholder={placeholder}/>
    </div>)
}