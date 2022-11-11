const express = require('express')
const app = express()
const mySQL = require('mysql')
const cors = require("cors");

const db = mySQL.createPool({
    host: 'localhost',
    user: 'root' ,
    password: 'It@l0_43690',
    database: 'cadastro'
})

app.use(express.json());
app.use(cors())

app.post('/cadastro' , (req , res) => {
    const email = req.body.email
    const password = req.body.password

    db.query("SELECT * FROM users WHERE email = ?" , [email] , (err , result) => {
        if(err){
            res.send(err) 
        }
        if(result.length == 0){
            db.query("INSERT INTO users(email , password) VALUE (? , ?)" , [email , password] , (err , result) => {
                if(err){
                    res.send(err) 
                }
                res.send({msg: "Cadastrado com sucesso"})
            })
        }else{
            res.send({msg: "Usuário já cadastrado"})
        }
    })
}) 

app.post('/login' , (req , res) => {
    const email = req.body.email
    const password = req.body.password
    
    db.query("SELECT * FROM users WHERE email = ? AND password = ?" , [email , password] , (err , result) => {
        if(err){
            res.send("deu erro") 
        }
        if(result.length > 0){
            db.query("SELECT * FROM persons" , (err , result) => {
                if(err){
                    res.send("deu erro") 
                }
                if(result.length > 0){
                    res.send(result)
                }
            })
        }else{
            res.send({msg: `Usuário não encontrado`})
        }
    })
})

app.listen(3001 , () => {
    console.log(`Server running in port 3001`)
})