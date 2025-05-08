import { useContext, useEffect } from "react";
import { FriendContext } from "../context/FriendContext"
import axios from "axios";

export const useFriendlist = ()=>{

    // i will not create this if i will only use it for one's
    // const {value,setValue} = useFriendContext();

    //instend i will use this

    const  {value,setValues} = useContext(FriendContext);

    useEffect(()=>{

        const fetchData = async()=>{
            const token = localStorage.getItem("token");
            const res = await axios.post("http://ec2-184-72-139-174.compute-1.amazonaws.com:3000/friendlist",{
                token:token
            })
            const ans = res.data;
            setValues(ans.user.friends);
        };
        if(!value ){   
            console.log("fateching it agine") 
            fetchData();
        }
    },[])

    return {value,setValues};

}