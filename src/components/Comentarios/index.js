import React, {useEffect, useState} from "react"
import "./style.css"
import api from "../../services/api"

const Comentarios = (props) => {
    const [comentarios, setComentarios] = useState([])
    const [userAtual, setUserAtual] = useState("")
    const token = localStorage.getItem("LojaVirtual")
    const [formData, setFormData] = useState()
    

useEffect(() => {
    api.get(`comentario?id=${props.id}`)
    .then(response => {
        setComentarios(response.data)
    })

}, [comentarios[0], props.id])


useEffect(() => {
    if(!id){
        return setUserAtual("default.png")
    }
    api.get(`user/profile`, {headers: {Authorization: token}})
    .then(response => {
        const { foto } = response.data.user[0]
        setUserAtual(foto)
    })
}, [])

function changeComentario(event){
    const {name, value} = event.target

    setFormData({[name]: value})
}

function submitComentario(event){
    event.preventDefault()
    
    if(!token) {
        return alert("Você precisa estar logado")
    }

    formData.product_id = props.id

    api.post("comentario", formData, {headers: {Authorization: token}})
    .then(() => {
        setComentarios([false])
    })
}

    return (
        <section id="contentComentarios">
               <h2>Ultimos Comentários</h2>
            <div id="comentarios">
             
                {comentarios.map(comentario => (
                      <div className="comentario">
                      <div className="imgUser">
                          <img src={`http://localhost:3333/uploads/user/${comentario.foto}`} alt="Foto de perfil"/>
                      </div>
                      <div className="comentarioUser">
                            <h3>{comentario.nome}</h3>
                           <p>{comentario.conteudo}</p>
                      </div>
                  </div>
                ))}
               </div>


                <div id="newComentario">
            <div className="imgUser">
                    <img src={`http://localhost:3333/uploads/user/${userAtual}`} alt="Foto de perfil"/>
                </div>
            <form>
                <input type="text" onChange={changeComentario} name="conteudo" id="conteudo" placeholder="Faça um comentário"/>
                <button onClick={submitComentario}>Comentar</button>
            </form>
            </div>

        </section>
    )

}

export default Comentarios
