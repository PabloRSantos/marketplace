import React, { createContext, useState, useEffect, useContext} from "react"
import api from "../services/api"


const AuthContext = createContext({})

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(false)

    useEffect(() => {

           const storagedUser = localStorage.getItem("LojaVirtualId")
           const storagedToken = localStorage.getItem("LojaVirtualToken")


           if(storagedUser && storagedToken) {
               setUser(true)
              api.defaults.headers["Authorization"] = `Bearer ${storagedToken}`
           }

    }, [])

    async function SignUp(form){

        try { 
       const {data} = await api.post("/cadastro", form)


       if(data.error) {
            return data.error

            api.defaults.headers["Authorization"] = `Bearer ${data.token}`

            setUser(true)

            localStorage.setItem("LojaVirtualToken", data.token)
            localStorage.setItem("LojaVirtualId", data.id)

       }
    } catch (e){
        console.log(e)
    }

           



    }

    async function SignIn(form){

        try {
        const {data} = await api.post("/login", form)
                
        if(data.error) {
            return data.error
        }

        setUser(true)

        api.defaults.headers["Authorization"] = `Bearer ${data.token}`

        localStorage.setItem("LojaVirtualToken", data.token)
        localStorage.setItem("LojaVirtualId", data.id)
        
    } catch (e){
        console.log(e)
    }

       
     
    }

    function SignOut(){
        localStorage.removeItem("LojaVirtualToken")
        localStorage.removeItem("LojaVirtualId")
            setUser(false)
    }

   
    return (
        <AuthContext.Provider value={{signed: !!user, SignIn, SignUp, SignOut, user}}> 
            {children}
        </AuthContext.Provider>
    )
  
}

export function useAuth() {
    const context = useContext(AuthContext)

    return context
}