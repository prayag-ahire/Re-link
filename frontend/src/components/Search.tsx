import { Input } from "./Input"

export const Search = ({onchange}:{onchange:React.ChangeEventHandler<HTMLInputElement>})=>{
    return(<div className="rounded-2xl">
        <Input placeholder="Search" type="text" onchange={onchange}/>
    </div>)
}