import { useState } from "react"
import { Button } from "./Button"
import { Input } from "./Input"
import axios from "axios";

export const Signup = ()=>{
    const [name,setName] = useState("");
    const [pass,setPass] = useState("");

    const handler = async()=>{
        const res = await axios.post("http://ec2-184-72-139-174.compute-1.amazonaws.com:3000/signup",{
            username:name,
            password:pass
        })
        alert("signup succsesful")
        const token = res.data
        localStorage.setItem("token",token.token);
    }
    return(<div className='w-screen h-screen flex justify-center items-center bg-slate-800'>
        <div className='space-y-4 p-5 rounded-2xl flex flex-col items-center bg-black'>
          <div><Input type='text' placeholder='username' onchange={(x)=>setName(x.target.value)}/></div>
          <div><Input type='password' placeholder='password' onchange={(x)=>setPass(x.target.value)}/></div>
          <div className='w-full'><Button onclick={handler}>Login</Button></div>
        </div>
      </div>)
}