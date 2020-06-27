import React, {useState, useEffect} from "react"
import "./style.css"
import {FiCheckCircle} from "react-icons/fi"


const Alert = (props) => {
    const [classSucess2, setClass] = useState("")


    useEffect(() =>{
        setClass(props.classSucess)
        setTimeout(function(){
            setClass("hiddenSucess")
        }, 3000)
    }, [props.classSucess])

    return (
        
            <div className={`${classSucess2} sucess`}>
                <FiCheckCircle className="icon"/>
                <p>{props.message}</p>
            </div>
    )
}
export default Alert
