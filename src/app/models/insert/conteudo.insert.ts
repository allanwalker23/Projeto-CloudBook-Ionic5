export interface ConteudoInsert{
   
    assunto:string;
    data_criacao:Date;
    texto:string;
    tipo:string;
    disciplina:{
        id:string;
       
    };

}