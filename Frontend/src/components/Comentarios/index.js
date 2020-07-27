import React, {useEffect, useState} from "react"
import "./style.css"
import api from "../../services/api"
import Sucess from "../Sucess"

const Comentarios = (props) => {
    const [comentarios, setComentarios] = useState([])
    const [userAtual, setUserAtual] = useState("")
    const token = localStorage.getItem("LojaVirtualToken")
    const [formData, setFormData] = useState()
    const [classSucess, setClassSucess] = useState("hiddenSucess")
    const [message, setMessage] = useState(" ")
    const [typeSucess, setTypeSucess] = useState("")
    

useEffect(() => {
    api.get(`comentario?id=${props.id}`)
    .then(response => {
        setComentarios(response.data)
    })

}, [comentarios[0], props.id])


useEffect(() => {
    if(!token){
        return setUserAtual("default.png")
    }
    api.get(`user/profile`)
    .then(response => {
        const { foto } = response.data.user
        setUserAtual(foto)
    })
}, [])

function changeComentario(event){
    const {name, value} = event.target

    setFormData({[name]: value})
}

function submitComentario(event){
    event.preventDefault()
    
    if(!token || !formData) {
        setMessage("Você precisa estar logado")
        setTypeSucess("failed")
        setClassSucess("showSucess")
        return
    }

    formData.product_id = props.id

    api.post("comentario", formData)
    .then(() => {
        setClassSucess("showSucess")
        setMessage("Comentado com sucesso!")
        setTypeSucess("sucess")

        setComentarios([false])
    })
}

    return (
        <>
            
         <Sucess
         message={message}
         classSucess={classSucess}
         type={typeSucess}
        />

        <section id="contentComentarios">
               <h2>Ultimos Comentários</h2>
            <div id="comentarios">
                {comentarios.length == 0 ? (
                    <h3>Nenhum comentário</h3>
                ): (
                comentarios.map(comentario => (
                      <div className="comentario">
                      <div className="imgUser">
                          <img src={`https://lojavirtual-backend.herokuapp.com/uploads/user/${comentario.foto}`} alt="Foto de perfil"/>
                      </div>
                      <div className="comentarioUser">
                            <h3>{comentario.user}</h3>
                           <p>{comentario.conteudo}</p>
                      </div>
                  </div>
                ))

                )}
               </div>


                <div id="newComentario">
            <div className="imgUser">
                    <img src={`https://lojavirtual-backend.herokuapp.com/uploads/user/${userAtual}`} alt="Foto de perfil"/>
                </div>
            <form>
                <input type="text" onChange={changeComentario} name="conteudo" id="conteudo" placeholder="Faça um comentário"/>
                <button onClick={submitComentario}>Comentar</button>
            </form>
            </div>

        </section>
        </>
    )

}

export default Comentarios
