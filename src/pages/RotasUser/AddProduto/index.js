import React, {useState, useEffect} from "react"
import api from "../../../services/api"
import "./style.css"
import {useHistory} from "react-router-dom"

const AddProduto = () => {
    const [formData, setFormData] = useState([])
    const [selected, setSelected] = useState([])
    const [categorias, setCategorias] = useState([])
    const history = useHistory()

    useEffect(() => {
        api.get("categorias")
        .then(response => {
            setCategorias(response.data)
        })
    }, [])

    function handleChange(event){
        const { name, value } = event.target

        setFormData({...formData, [name]: value})
    }

    function handleSelect(event){
        const valor = event.target.value
        setSelected(valor)
    }   

    function submitForm(event){
    event.preventDefault()

    const id = localStorage.getItem("LojaVirtualId")

    formData.user_id = id
    formData.categorias = [selected]
    formData.modelo = "aaa"


    api.post("products", formData)
    .then(response => {
        console.log(response.data)
        if(response.data.sucess){
            alert(response.data.sucess)
            history.push("/user/produtos")
        }
        else {
            alert("Erro ao cadastrar, tente novamente")
        }
    }).catch(err => console.log(err))
   
    }
    
return (
    <>
    <main id="AddProduto">
        <form>
            <div className="campo">
                <label htmlFor="nome">Titulo:</label><br/>
                
                <input type="text" onChange={handleChange} name="nome" id="nome" required/>
            </div>

            <div className="campo">
                <label htmlFor="descricao">Descrição:</label><br/>
                
                <textarea name="descricao" id="descricao" onChange={handleChange} required></textarea>
            </div>

            <div className="campoGrupo">

            <div className="unidade">
                <label htmlFor="unidades">Unidades:</label><br/>
                
                <input type="text" name="unidades" onChange={handleChange} id="unidades" required/>
            </div>

            <div className="tag">
                <label htmlFor="tags">Tags:  (opcional)</label><br/>
                
                <input type="text"onChange={handleChange} placeholder="Ex: Carros Esportivos, Brasileiro, 2020" name="tags" id="tags"/>
            </div>

            </div>

            <div className="campoGrupo">

            <div className="categoria">
                <label htmlFor="categorias">Categoria:</label>

                <select onChange={handleSelect} value={selected} id="categorias" name="categorias">
                {categorias.map(categoria => (
                    <option key={categoria.nome} value={categoria.id}>{categoria.nome}</option>
                ))}
                
                 </select> 
            </div>

            <div className="preco">
                <label htmlFor="preco">Preço:</label><br/>
                
                <input type="text" onChange={handleChange} name="preco" id="preco"/>
            </div>

            </div>

            <div className="campo">
                <label htmlFor="cores">Cores:</label><br/>
                
                <input type="text" placeholder="Ex: Vermelho, Azul, Verde" name="cores" onChange={handleChange} id="cores"/>
            </div>

            <button onClick={submitForm}>Publicar</button>

        </form>
    </main>
    </>
)

}

export default AddProduto