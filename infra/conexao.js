const mysql = require('mysql')

const conexao = mysql.createConnection({
    host:"",
    post:3307,
    user: 'root',
    password: 'admin',
    database: 'agenda-petshop'
})

module.exports = conexao
