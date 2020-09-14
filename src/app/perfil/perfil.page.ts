import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/services/aluno.service';
import { StorageService } from 'src/services/storage.service';
import { AlunoDto } from '../models/dto/aluno.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, Platform, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { PhotoService } from '../services/photo.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { error } from 'protractor';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { GlobalService } from '../global.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  formulario: FormGroup;
  email=this.storageservice.getLocalUser().email;
  nome_app="CloudBook";
  clickedImage: string;
  foto_perfil:any;
  genero;
  nome;
  liberado:boolean=false;

  
  

  isSubmitted = false;
  aluno:AlunoDto;
  constructor(public storageservice: StorageService,public global:GlobalService,public actionSheetController: ActionSheetController,public router:Router,private webview:WebView,public storage:StorageService,public storage2:Storage,public alunoservice:AlunoService,public formBuilder: FormBuilder,public alert:AlertController,public platform:Platform,public file:File,public photoService: PhotoService) {
this.showWarning();
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(80)]],
      email: ['',[Validators.required,  Validators.email, Validators.minLength(2),Validators.maxLength(80)]],
      telefone: ['',[Validators.required, Validators.minLength(1),Validators.maxLength(11)]],
      genero: ['',[Validators.required, Validators.minLength(1),Validators.maxLength(1)]],
      colegio: ['',[Validators.required, Validators.minLength(2),Validators.maxLength(80)]],
        
    });
      
   
   }

   atualizar_pagina(event){
    event.target.complete();
    this.storage2.get('foto_perfil').then((photos) => {
      
      if(photos[0].email!=this.email){
        
        
      }else{
        
        if(photos[0].data!="undefined"){
          this.foto_perfil= this.webview.convertFileSrc(photos[0].data);
          
          this.liberado=true;
        }
        

        
      }
      event.target.complete();
    },
    error=>{
      alert("Erro")
      event.target.complete();
    }
    
    ); 
   }
  
  ngOnInit() {
    this.storage2.get('foto_perfil').then((photos) => {
      
      if(photos[0].email!=this.email){
        
        
      }else{
        
        if(photos[0].data!="undefined"|| photos[0].data!=null){
          this.foto_perfil= this.webview.convertFileSrc(photos[0].data);
          
          this.liberado=true;
        }
        
       
        
        
      }
      
    },
    error=>{
      alert("Erro")
    }
    
    );


    let localuser = this.storage.getLocalUser();
    if(localuser && localuser.email){
      this.alunoservice.findByEmail(localuser.email)
      .subscribe(response =>{
        this.aluno = response;
        this.nome= this.aluno.nome;
        this.genero=this.aluno.genero;
      },
      error =>{});
    }
   
  }

  update(){
    let localuser = this.storage.getLocalUser();
    if(localuser && localuser.email){
      this.alunoservice.findByEmail(localuser.email)
      .subscribe(response =>{
        this.aluno = response;
        this.nome= this.aluno.nome;
      },
      error =>{});
    }

    this.alunoservice.update(this.aluno.id,this.formulario.value)
      .subscribe(response =>{
          
          this.router.navigateByUrl('configuracoes');
          
      },
      error=>{
      this.showUpdateError();
      });
    
  }

  async showUpdateError() {
    let alert = await this.alert.create({
      header: 'Erro',
      message: 'Erro na atualização de dados',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

  

 

foto(){
  
  this.photoService.captureImage();
  
//  console.log(this.photoService.photo[0].data)
}

remover_foto(){
  this.storage2.set('foto_perfil', null);
}

async acao() {
  // console.log(page.id)
   const actionSheet = await this.actionSheetController.create({
    
     cssClass: 'my-custom-class',
     buttons: [{
       text: 'Adicionar da galeria',
       role: 'color',
       icon: 'image-sharp',
       handler: () => {
       this.foto();
       }
     }, {
       text: 'Remover foto',
       icon: 'trash',
       role: 'color',
       handler: () => {
         this.remover_foto();
       }
     },
      {
       text: 'Cancelar',
       icon: 'close',
       role: 'cancel',
       handler: () => {
         console.log('Cancel clicked');
       }
     }]
   });
   await actionSheet.present();
 }

 async showWarning() {

  let alert = await this.alert.create({
    header: 'Aviso',
    message: "Deslize para cima para carregar a imagem",
    buttons: [
      {
        text: 'Ok'
      }
    ]
  });
  alert.present();
}


}

