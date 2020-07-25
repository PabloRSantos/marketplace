import React from "react"
import "./style.css"

const Alert = (props) => {

    

    return (
        <div className={props.classAlert} id="alertBg">
            <div id="alert">
                <div></div>
                <h2>{props.message}</h2>
                <div id="buttons">
                    <button onClick={props.confirm}>Confirmar</button>
                    <button onClick={props.cancel}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
export default Alert
