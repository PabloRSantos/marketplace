import React from "react"
import "./style.css"
//import api from "../../services/api"

const Comentarios = (props) => {

    return (
        <section id="contentComentarios">
            
            <div id="comentarios">
                <h2>Ultimos Comentários</h2>
                <div className="comentario">
                    <div className="imgUser">
                        <img src="http://localhost:3333/uploads/a1b7978f2792-_O85_Y3E%20(2).jpg" alt="Foto de perfil"/>
                    </div>
                    <div className="comentarioUser">
                        <h3>Pablo</h3>
                         <p>Produto excelente!</p>
                    </div>
                </div>

                <div className="comentario">
                    <div className="imgUser">
                        <img src="http://localhost:3333/uploads/a1b7978f2792-_O85_Y3E%20(2).jpg" alt="Foto de perfil"/>
                    </div>
                    <div className="comentarioUser">
                        <h3>Pablo</h3>
                         <p>Produto excelente!</p>
                    </div>
                </div>

                <div id="newComentario">
            <div className="imgUser">
                    <img src="http://localhost:3333/uploads/a1b7978f2792-_O85_Y3E%20(2).jpg" alt="Foto de perfil"/>
                </div>
            <form>
                <input type="text" placeholder="Faça um comentário"/>
                <button>Comentar</button>
            </form>
            </div>

            </div>
        </section>
    )

}

export default Comentarios
