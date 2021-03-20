const conexao = require('../infra/conexao')
const moment = require('moment')

class Atendimentos {
    add(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.length > 4

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: "Data deve ser maior ou igual a data atual"
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: "Cliente deve ter pélo menos cinco caracteres"
            }

        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const errosExiste = erros.length

        if (errosExiste) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const query = 'INSERT INTO atendimento SET ?'
            conexao.query(query, atendimentoDatado, (erro) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(atendimento)
                }
            })
        }
    }

    lsta(res) {
        const query = 'SELECT * FROM atendimentos'

        conexao.query(query, (erro,  resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }

    lstaPorId (id, res) {
        const query = "SELECT * FROM atendimentos WHERE id = " + id

        conexao.query(query, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                const atentimento = resultado[0]
                res.status(200).json(atentimento)
            }
        })

    }

    altera(id, data, res) {

        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const query = "UPDATE SET ? WHERE id = ?"

        conexao.query(query, [valores, id], (erro) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const query =   "DELETE FROM atendimentos WHERE id=?"
        conexao.query(query, id, (erro) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimentos();
