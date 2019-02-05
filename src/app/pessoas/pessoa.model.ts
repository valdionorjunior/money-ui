export class Endereco {

    logradouro: string;
    numero: number;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    
}

export class PessoaModel {
    
    codigo: string;
    nome: string;
    ativo = true;
    endereco = new Endereco();

}