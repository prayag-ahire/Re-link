import { createContext, ReactNode, useState } from "react";

interface user{
    id:number,
    name:string
}

export interface procontext{
    value:user | null,
    setValue:(value:user)=>void
}
export const ProfileContext = createContext<procontext>({value:null,setValue:()=>{}});

export const ProfileProvider = ({children}:{children:ReactNode})=>{
    const [value,setValue] = useState<user | null>(null);

    return(
        <ProfileContext.Provider value={{value,setValue}}>
            {children}
        </ProfileContext.Provider>
    )
}