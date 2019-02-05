export class Pessoa {
    codigo: number;
}

export class Categoria {
    codigo: number;
}

export class LancamentoModel {
    
    codigo: string;
    tipo = 'RECEITA';//string passando por defaut RECEITA
    descricao: string;
    dataVencimento: Date;
    dataPagamento: Date;
    valor: number;
    observacao: string;
    pessoa = new Pessoa();
    categoria = new Categoria();

}