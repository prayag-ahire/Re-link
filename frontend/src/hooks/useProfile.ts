import axios from "axios";
import { useContext, useEffect } from "react"
import { ProfileContext } from "../context/ProfileContext";

export const useProfile = () => {
    const {value,setValue} = useContext(ProfileContext) 

    useEffect(()=>{
        if(value) return
        const fetch = async()=>{
            const token = localStorage.getItem("token");
            
            const res = await axios.post("http://ec2-184-72-139-174.compute-1.amazonaws.com:3000/user",{
                token:token
            });
            const ans = res.data;
            console.log("this is ",ans);
            setValue(ans.user);
        }
        
            fetch();
    },[value])

    return {value,setValue};
} 