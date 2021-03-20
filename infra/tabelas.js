class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarAtendimentos();
    }
    criarAtendimentos() {
        const  query = 'CREATE TABLE IF NOT EXISTS Atendimento (' +
            'id int NOT NULL AUTO_INCREMENT, ' +
            'cliente VARCHAR(50) NOT NULL, ' +
            'pet VARCHAR(20), ' +
            'servico VARCHAR(20), ' +
            'data datetime NOT NULL,' +
            'dateCriacao datetime NOT NULL,' +
            'status VARCHAR(20) NOT NULL, ' +
            'observacoes TEXT,' +
            'PRIMARY KEY(id))';
        this.conexao.query(query, error => {
            if (error) {
                console.log(error)
            } else {
                console.log('Tabela atendimentos criada com sucesso')
            }
        });
    }
}

module.exports = new Tabelas
