import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlunoDto } from 'src/app/models/dto/aluno.dto';
import { StorageService } from './storage.service';
import { AlunoDtoUpdate } from 'src/app/models/updatee/aluno.dto.update';

@Injectable()
export class AlunoService{
 url:string = "https://cloudbookapp.herokuapp.com";
constructor(public http:HttpClient,public storage:StorageService){

}
findByEmail(email:string):Observable<AlunoDto>{
 
    let token = this.storage.getLocalUser().token;
    let authHeader= new HttpHeaders({'Authorization':'Bearer '+token})  
return this.http.get<AlunoDto>(
    this.url+"/alunos/email?value="+email,
    {'headers':authHeader}
    )
}

insert(obj : AlunoDto) {
    return this.http.post(
       this.url+"/alunos", 
        obj,
        { 
            observe: 'response', 
            responseType: 'text'
        }
    ); 
}

update(id,obj : AlunoDtoUpdate) {
    return this.http.put(
      this.url+"/alunos/"+id, 
        obj,
        { 
            observe: 'response', 
            responseType: 'text'
        }
    ); 
}

delete(id:number){
    return this.http.delete(this.url+"/alunos/"+id)
}

}