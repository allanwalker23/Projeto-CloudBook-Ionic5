import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { ConteudoInsert } from 'src/app/models/insert/conteudo.insert';

@Injectable()
export class ConteudoService{
    url:string = "https://cloudbookapp.herokuapp.com";
constructor(public http:HttpClient){

}

findConteudos(id:string){
    return this.http.get(this.url+"/conteudos/findConteudos/?id="+id)
}
findAllConteudos(){
    return this.http.get(this.url+"/conteudos/page")
}

insert(obj : ConteudoInsert) {
    return this.http.post(
       this.url+"/conteudos", 
        obj,
        { 
            observe: 'response', 
            responseType: 'text'
        }
    ); 
}

delete(id:number){
    return this.http.delete(this.url+"/conteudos/"+id)
}

findById(id){
    return this.http.get(this.url+"/conteudos/"+id)
}



}