import React, { createContext, useState } from "react"

interface userType {
    id:number
    name:string
}

interface listContext {
    value: userType[] | null;
    setValue : (value:userType[])=> void
}

// creating context here
export const FriendContext = createContext<listContext>({value:null,setValue:()=>{}});




// creating context provider
export const FriendProvider = ({children}:{children:React.ReactNode})=>{

    const [value,setValue] = useState<userType[] | null>(null);

    return(
        <FriendContext.Provider value={{value,setValue}}>
            {children}
        </FriendContext.Provider>
    )
}


// so this is custome hooks i write it here don't know why 
// export const useFriendContext = () => useContext(FriendContext);
