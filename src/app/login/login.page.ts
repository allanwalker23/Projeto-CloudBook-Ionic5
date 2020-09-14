import { Component, OnInit, Injectable, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { AuthResponse } from '../auth/auth-response';
import { User } from '../auth/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../models/dto/auth';
import { GlobalService } from '../global.service';
import { DirInterceptor } from 'src/interceptors/dir-interceptor';
import { AlertController, LoadingController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  studentsData: any;
  theme:string="light";
  res:AuthResponse;
  creds:Auth ={
    email:"",
    senha:""
  };
  
  
  
  constructor(public alert:AlertController, private screenOrientation: ScreenOrientation,public loadingController: LoadingController,public router:Router, public global:GlobalService, public auth:AuthService,private  httpClient:  HttpClient,public dir:DirInterceptor) {
    //BLOQUEANOD ORIENTAÇÃO
    
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  ngOnInit() {

    this.presentLoading();
    this.auth.refresh_token().subscribe(response =>{
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.router.navigate(['tabs']);
    },
    error =>{})
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Aguarde...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    
  }
  
  async showSenha() {
    let alert = await this.alert.create({
      header: 'Vixi',
      message: 'Entre em contato com o administrador',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }
 
 cadastro(){
  window.open('https://facundoallan.github.io/Projeto-Cloudbook-HTML5/cadastro.html', '_system', 'location=yes'); 
  return false;
 }

 trocar(){
  if(this.theme=="light"){
    document.body.classList.add("dark");
    this.theme="dark";
    this.global.logo="assets/imgs/icone_imagem_alt.png";
   
    
  }
  else{
    document.body.classList.remove("dark");
    this.theme="light";
    this.global.logo="assets/imgs/icone_imagem_azul.png";
    this.global.checado="";
   
  
  }
}

 app(){
  this.router.navigate(['tabs']);
 }

 teste(){
  this.router.navigate(['perfil-tamu']);
 }
 login(){
  this.presentLoading();
  this.auth.logar(this.creds).subscribe(response =>{
    
     this.auth.successfulLogin(response.headers.get('Authorization'));
     this.router.navigate(['tabs']);
     this.dir.verificar(this.creds.email);
  },
  error =>{})
   
  //this.dir.verificar(this.creds.email);

  

  
 }
 
 
}
