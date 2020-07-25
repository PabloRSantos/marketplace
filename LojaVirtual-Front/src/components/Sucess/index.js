import React, {useState, useEffect} from "react"
import "./style.css"
import {FiCheckCircle, FiX} from "react-icons/fi"


const Alert = (props) => {
    const [classSucess2, setClass] = useState("")


    useEffect(() =>{
        setClass(props.classSucess)
        setTimeout(function(){
            setClass("hiddenSucess")
        }, 5000)
    }, [props.classSucess])

    return (
        <>
            {props.type.includes("sucess")? (

             <div className={`${classSucess2} sucess`}>
                    <FiCheckCircle className="icon"/>
                     <p>{props.message}</p>
             </div>

            ) : (

                <div className={`${classSucess2} failed`}>
                    <FiX className="icon"/>
                    <p>{props.message}</p>
                </div>

            )}
        </>
    )
}
export default Alert
