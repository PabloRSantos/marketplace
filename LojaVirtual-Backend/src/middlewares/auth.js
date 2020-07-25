const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    const auth = process.env.JWT_AUTH

    console.log(auth)
    
    if(!authHeader)
        return res.json({message: "Token não informado"})

    const parts = authHeader.split(" ")

    if(!parts.length === 2)
        return res.json({message: "Erro no token"})
     
     const [ scheme, token ] = parts
     
     if(!/^Bearer$/i.test(scheme))
        return res.json({message: "Erro no token"})


        jwt.verify(token, auth, (err, decoded) => {
            if(err) return res.json({message: "Token inválido"})
        
            req.userId = decoded.id //decoded é o id do user
        
            return next()
        })
      

}