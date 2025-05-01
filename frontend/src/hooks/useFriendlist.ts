import { useContext, useEffect } from "react";
import { FriendContext } from "../components/FriendContext"
import axios from "axios";

export const useFriendlist = ()=>{

    // i will not create this if i will only use it for one's
    // const {value,setValue} = useFriendContext();

    //instend i will use this
    const  {value,setValue} = useContext(FriendContext);

    useEffect(()=>{

        const fetchData = async()=>{
            const token = localStorage.getItem("token");
            const res = await axios.post("http://localhost:8080/friendlist",{
                token:token
            })
            const ans = res.data;
            setValue(ans.user.friends);
        };
        if(!value ){   
            console.log("fateching it agine") 
            fetchData();
        }
    },[])

    return {value,setValue};

}