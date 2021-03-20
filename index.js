const customExpress = require('./config/customExpress')
const conexao = require('./infra/conexao')
const Tabelas = require('./infra/tabelas')


conexao.connect(error => {
    if (error) {
        console.log(error)
    } else {
        console.log('conectado com sucesso')

        Tabelas.init(conexao)
        const app = customExpress();

        app.listen(8088, () => {
            console.log('Servidor rodando na porta 8088')
        })
    }
})


