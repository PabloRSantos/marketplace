import React from "react"
import "./style.css"

const Alert = (props) => {

    

    return (
        <div className={props.classSucess} id="sucessBg">
            <div id="sucess">
                <div></div>
                <h2>{props.message}</h2>
                    <button onClick={props.confirm}>Ok</button>
            </div>
        </div>
    )
}
export default Alert
