import { createContext, ReactNode, useState } from "react";

interface User{
    id:number,
    name:string
}

interface user2{
    uprofile:User | null,
    setValue:(value:User)=> void
}

export const User2Context = createContext<user2>({uprofile:null,setValue:()=>{}});

export const User2Provider = ({children}:{children:ReactNode})=>{
    const [uprofile,setValue] = useState<User|null>(null);

    return(
        <User2Context.Provider value={{uprofile,setValue}}>
            {children}
        </User2Context.Provider>
    )
}