import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { AlertController, ActionSheetController, LoadingController, Platform } from '@ionic/angular';
import { RepositorioDTO } from '../models/dto/repositorio.dto';
import { AuthService } from '../auth/auth.service';
import { RepositorioService } from 'src/services/repositorio.service';
import { AlunoDto } from '../models/dto/aluno.dto';
import { AlunoService } from 'src/services/aluno.service';
import { StorageService } from 'src/services/storage.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { DisciplinaService } from 'src/services/disciplina.service';
import { DisciplinaDTO } from '../models/dto/disciplina.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  disciplinas:DisciplinaDTO[];
  liberado:boolean=false;
  aluno:AlunoDto;
  nome;
  
  email=this.storageservice.getLocalUser().email;

  foto_perfil="";
  
   constructor(public disciplinaservice:DisciplinaService,public platform:Platform,public file:File,public loading:LoadingController,public actionSheetController: ActionSheetController,public webview:WebView,public storage2:Storage,private screenOrientation: ScreenOrientation,private router:Router,public storage: Storage,public storageservice:StorageService,public global:GlobalService,public alertController: AlertController,public auth:AuthService,public repo:RepositorioService,public alunoservice:AlunoService) { 
     this.criar_diretorio1();
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.verificao_modo();
    let localuser = this.storageservice.getLocalUser();
    if(localuser && localuser.email){
      this.alunoservice.findByEmail(localuser.email)
      .subscribe(response =>{
        this.aluno = response;
        let primeiro_nome =this.aluno.nome.split(" ")[0]
        this.nome=primeiro_nome;
       },
       error =>{
         
       });
     }
    
   
   }
   
   public logo:string;
   ngOnInit() {
     
   this.storage.set('logo','assets/imgs/icone_imagem_alt.png');
   
   this.storage2.get('foto_perfil').then((photos) => {
       
     if(photos[0].email!=this.email){
      this.storage2.set('foto_perfil', null);
       
     }else{
       
       if(photos[0].data!="undefined"){
         this.foto_perfil= this.webview.convertFileSrc(photos[0].data);
         
         this.liberado=true;
         
       }

      
     }
     
   },
   error=>{
     alert("Erro")
   }
   
   );
 
   let localuser = this.storageservice.getLocalUser();
     if(localuser && localuser.email){
       this.alunoservice.findByEmail(localuser.email)
       .subscribe(response =>{
         this.aluno = response;
 
 
       },
       error =>{
         
       });
     }
     
   
   }
 
  
   atualizar_pagina(event){
    event.target.complete();
    this.storage.set('logo','assets/imgs/icone_imagem_alt.png');
   
    this.storage2.get('foto_perfil').then((photos) => {
        
      if(photos[0].email!=this.email){
        
        
      }else{
        
        if(photos[0].data!="undefined"){
          this.foto_perfil= this.webview.convertFileSrc(photos[0].data);
          
          this.liberado=true;
          
        }
        
      }
      
    },
    error=>{
      alert("Erro")
    }
    
    );
  
    let localuser = this.storageservice.getLocalUser();
    if(localuser && localuser.email){
      this.alunoservice.findByEmail(localuser.email)
      .subscribe(response =>{
        this.aluno = response;
        let primeiro_nome =this.aluno.nome.split(" ")[0]
        this.nome=primeiro_nome;
       },
       error =>{
         
       });
     }
    
      
   }
   
  
   perfil(){
    this.router.navigateByUrl('/perfil');
   }

   config(){
     this.router.navigateByUrl('/configuracoes');
   }
   adc_foto(){
     this.verificar('/imagem')
   
   }

   async verificar(nome) {

    if(this.global.idRepositorio==undefined || this.global.idRepositorio=="undefined"){
      this.showErrorRepo();
    }else{
    this.disciplinaservice.findByRepositorio(this.global.idRepositorio)
    .subscribe(Response => {
      
      this.disciplinas=Response['content'];
      if(this.isEmpty(this.disciplinas)){
      this.showErrorDisci();
      }else{
        this.router.navigateByUrl(nome);
     }
     })
    }
  }
  async showErrorRepo() {
    let alert = await this.alertController.create({
      header: 'Erro',
      message: 'Selecione um repositório para continuar',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }


  async showErrorDisci() {
    let alert = await this.alertController.create({
      header: 'Erro',
      message: 'Não há disciplinas, crie uma disciplina para continuar',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }


  public isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

   adc_anotacao(){
    this.verificar("/anotacao")
   }

   creditos(){
    this.router.navigateByUrl('/creditos');
   }
 
   async presentLoading() {
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Saindo...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    
  }
   sair(){
this.presentLoading();
    this.auth.logout();
    this.router.navigateByUrl('/login')
   }
   public verificao_modo(){

      this.storage2.get('modo_escuro').then((resposta) => {
      
        if(resposta==false){
          
          
        }else{
          document.body.classList.add("dark");
        
          this.global.logo="assets/imgs/icone_imagem_alt.png";
          this.global.logo_quadro="assets/adc-quadro.png";
          this.global.foto_default="assets/perfil2.png";
      }
      error=>{
        alert("else")
        this.storage2.set('modo_escuro',false);
      }
      
    });
    
   }

   criar_diretorio1(){
    this.platform.ready().then(() =>{
      if(this.platform.is('android')) {
        this.file.checkDir(this.file.externalRootDirectory, "CloudBook").then(response => {
      this.criar_diretorio2();
    //  alert("Pasta criada");
        }).catch(err => {
          console.log('Directory doesn\'t exist'+JSON.stringify(err));
          this.file.createDir(this.file.externalRootDirectory, "CloudBook", false).then(response => {
            
           this.criar_diretorio2();
        //   alert("Pasta criada");
          }).catch(err => {
          alert('Pasta não criada'+JSON.stringify(err));
          }); 
        });
      }
    });
    
  }

 criar_diretorio2(){
  
  
  this.platform.ready().then(() =>{ 
    if(this.platform.is('android')) {
      this.file.checkDir(this.file.externalRootDirectory+"CloudBook"+"/", this.email).then(response => {
      
    //  alert("Pasta criada");
      }).catch(err => {
        console.log('Directory doesn\'t exist'+JSON.stringify(err));
        this.file.createDir(this.file.externalRootDirectory+"CloudBook"+"/", this.email, false).then(response => {
        //  alert("Pasta criada");
          
        
        }).catch(err => {
        alert('Pasta não criada'+JSON.stringify(err));
        }); 
      });
    }
  });
  
}

   
}
