import api from "./services/api"

export const autenticacao = () => {
    const token = localStorage.getItem("LojaVirtual")
    api.get("autenticacao", {headers:{autorizacao: token}})
    .then(response => response.data.message ? false : true)
    .catch(() => false)

}