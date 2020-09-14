import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepositorioDTO } from 'src/app/models/dto/repositorio.dto';
import { RepositorioInsert } from 'src/app/models/insert/repositorio.insert';
import { RepositorioDtoUpdate } from 'src/app/models/updatee/repositorio.dto.update';


@Injectable()
export class RepositorioService{
    url:string = "https://cloudbookapp.herokuapp.com";
constructor(public http:HttpClient){

}

findByAluno(aluno_id:string){
    return this.http.get(this.url+"/repositorios/findRepositorios/?id="+aluno_id)
}

insert(obj : RepositorioInsert) {
    return this.http.post(
       this.url+"/repositorios", 
        obj,
        { 
            observe: 'response', 
            responseType: 'text'
        }
    ); 
}

findById(id){
    return this.http.get(this.url+"/repositorios/"+id)
}

update(id,obj : RepositorioDtoUpdate) {
    return this.http.put(
       this.url+"/repositorios/"+id, 
        obj,
        { 
            observe: 'response', 
            responseType: 'text'
        }
    ); 
}





delete(id:number){
    return this.http.delete(this.url+"/repositorios/"+id)
}

}