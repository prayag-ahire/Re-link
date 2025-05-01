import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { ProfileContext } from "../components/ProfileContext";

export const useProfile = () => {
    const {value,setValue} = useContext(ProfileContext) 

    useEffect(()=>{
        const fetch = async()=>{
            const token = localStorage.getItem("token");
            
            const res = await axios.post("http://localhost:8080/user",{
                token:token
            });
            const ans = res.data;
            console.log("this is ",ans);
            setValue(ans.user);
        }
        if(!value){
            fetch();
        }
    },[])

    return {value,setValue};
} 