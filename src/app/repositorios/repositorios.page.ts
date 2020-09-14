import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { RepositorioDTO } from '../models/dto/repositorio.dto';
import { AuthService } from '../auth/auth.service';
import { RepositorioService } from 'src/services/repositorio.service';
import { AlunoDto } from '../models/dto/aluno.dto';
import { AlunoService } from 'src/services/aluno.service';
import { StorageService } from 'src/services/storage.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
@Component({
  selector: 'app-repositorios',
  templateUrl: './repositorios.page.html',
  styleUrls: ['./repositorios.page.scss'],
})
export class RepositoriosPage implements OnInit {
 items:RepositorioDTO[];
 aluno:AlunoDto;
 icone_pasta="folder-open-sharp";
 estado_botao="outline";
 texto_botao="Selecionar"
 aparecer:boolean;
 email="allanhipolito@gmail.com";
 liberado:boolean=false;
 foto_perfil="";
 
  constructor(public actionSheetController: ActionSheetController,public webview:WebView,public storage2:Storage,private router:Router,private screenOrientation: ScreenOrientation,public storage: Storage,public storageservice:StorageService,public global:GlobalService,public alertController: AlertController,public auth:AuthService,public repo:RepositorioService,public alunoservice:AlunoService) { 
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
   this.aparecer=true;
  
  }
  theme:string="light";
  public logo:string;
  ngOnInit() {
    
  this.storage.set('logo','assets/imgs/icone_imagem_alt.png');
  
  
  let localuser = this.storageservice.getLocalUser();
    if(localuser && localuser.email){
      this.alunoservice.findByEmail(localuser.email)
      .subscribe(response =>{
        this.aluno = response;
        this.repo.findByAluno(this.aluno.id)
      .subscribe(Response => {
        
        
       this.items=Response['content'];
       if(this.isEmpty(this.items)){
        this.aparecer=true;
      }else{
        this.aparecer=false;
      }
      },
  error => {
    this.aparecer=true;
  });


      },
      error =>{
        this.aparecer=true;
      });
    }
    
  
  }

  atualizar_pagina(event){
    event.target.complete();
     this.storage2.get('foto_perfil').then((photos) => {
      
      if(photos[0].email!=this.email){
        
        
      }else{
      //  alert(photos[0].data)
        if(photos[0].data!="undefined"){
          this.foto_perfil= this.webview.convertFileSrc(photos[0].data);
       //   alert(this.foto_perfil)
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
      this.repo.findByAluno(this.aluno.id)
    .subscribe(Response => {
     this.items=Response['content'];
     if(this.isEmpty(this.items)){
      this.aparecer=true;
    }else{
      this.aparecer=false;
    }
     event.target.complete();
    },
error => {
  this.aparecer=true;
  event.target.complete();
});


    },
    error =>{
      
    });
  }
  
  }
  
  trocar(){
    if(this.theme=="light"){
      document.body.classList.add("dark");
      
      this.theme="dark";
      this.storage.set('logo', 'assets/imgs/icone_imagem_alt.png');

    }
    else{
      document.body.classList.remove("dark");
      this.theme="light";
      this.storage.set('logo', 'assets/imgs/icone_imagem_alt.png');
    }
  }

  config(){
    this.router.navigateByUrl('/configuracoes');
  }

  adc(){
    this.router.navigateByUrl('/form-repositorio');
  }

  async alertar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'KOe',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

 
  

  selecionar(page:{id:string,nome:string},event){
  
      this.storage.set('idRepositorio',page.id);
      this.global.idRepositorio=page.id;
       this.global.nomeRepositorio=page.nome;
      event.toElement.innerHTML="Selecionado"
      event.target.fill="sharp"
    
  
  
  }



  update_repositorios(page:{id:string,nome:string}){
    this.global.id_repositorio_update=page.id;
    this.global.nomeRepositorio=page.nome;
    console.log(page.id);
    this.router.navigateByUrl('/update-repositorio')
  }

  public isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create({
  
    buttons: [{
      text: 'Boa noite Allan   !Vamos aprender hoje?',
      role: 'destructive',

      icon: this.foto_perfil,
      
      handler: () => {
        console.log('Delete clicked');
      }
    }, {
      text: 'Share',
      icon: 'share',
      handler: () => {
        console.log('Share clicked');
      }
    }, {
      text: 'Play (open modal)',
      icon: 'caret-forward-circle',
      handler: () => {
        console.log('Play clicked');
      }
    }, {
      text: 'Favorite',
      icon: 'heart',
      handler: () => {
        console.log('Favorite clicked');
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();
}

}
