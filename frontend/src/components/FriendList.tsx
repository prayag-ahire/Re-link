import axios from "axios";
import { useEffect, useState } from "react"

export const FriendList = ()=>{
    
    const [value,setValue] = useState([]);

    useEffect(()=>{
        const fetch = async()=>{
            const res = await axios.get("http://localhost:3000/friendlist");
            const ans = res.data;
            setValue(ans);
        }
        fetch();
    },[]);
    return(<div>
    </div>)
}