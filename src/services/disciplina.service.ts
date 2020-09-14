import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { DisciplinaInsert } from 'src/app/models/insert/disciplina.insert';
import { DisciplinaDTO } from 'src/app/models/dto/disciplina.dto';
import { DisciplinaDtoUpdate } from 'src/app/models/updatee/disciplina.dto.update';

@Injectable()
export class DisciplinaService{
    url:string = "https://cloudbookapp.herokuapp.com";
constructor(public http:HttpClient){

}

findByRepositorio(id:string){
    return this.http.get(this.url+"/disciplinas/findDisciplinas/?id="+id)
}

insert(obj : DisciplinaInsert) {
    return this.http.post(
       this.url+"/disciplinas", 
        obj,
        { 
            observe: 'response', 
            responseType: 'text'
        }
    ); 
}

delete(id:number){
    return this.http.delete(this.url+"/disciplinas/"+id)
}

update(id,obj : DisciplinaDtoUpdate) {
    return this.http.put(
      this.url+"/disciplinas/"+id, 
        obj,
        { 
            observe: 'response', 
            responseType: 'text'
        }
    ); 
}


}