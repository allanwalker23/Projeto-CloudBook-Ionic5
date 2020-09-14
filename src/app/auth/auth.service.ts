import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { User } from  './user';
import { AuthResponse } from './auth-response';
import { LocalUser } from '../models/dto/local_user';
import { StorageService } from 'src/services/storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";



@Injectable({
  providedIn: 'root'
})

export class AuthService {
    url="https://cloudbookapp.herokuapp.com";
   helper = new JwtHelperService();

  AUTH_SERVER_ADDRESS:  string  =  this.url;
  authSubject  =  new  BehaviorSubject(false);
  constructor(private  httpClient:  HttpClient,public  storage:  StorageService) { }

  public logar(request:User):Observable<any>{
    return this.httpClient.post(this.url+"/login",request,
    {
      observe: 'response',
      responseType: 'text' });
  }

  public refresh_token(){
    return this.httpClient.post(this.url+"/auth/refresh_token",
    {},
    {
      observe: 'response',
      responseType: 'text' });
  }

  successfulLogin(authorizationValue: string){
    let tok = authorizationValue.substring(7);
    let user : LocalUser ={
      token:tok,
      email: this.helper.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);

  }

  logout(){
    this.storage.setLocalUser(null);
  }
}


