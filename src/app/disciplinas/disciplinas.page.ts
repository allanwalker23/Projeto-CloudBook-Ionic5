import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { DisciplinaDTO } from '../models/dto/disciplina.dto';
import { DisciplinaService } from 'src/services/disciplina.service';
import { error } from 'protractor';
import { DisciplinaDtoUpdate } from '../models/updatee/disciplina.dto.update';
import { File } from '@ionic-native/file/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { StorageService } from 'src/services/storage.service';
@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.page.html',
  styleUrls: ['./disciplinas.page.scss'],
})
export class DisciplinasPage implements OnInit {
  email=this.storageservice.getLocalUser().email;
  disciplinas : DisciplinaDTO[];
  conteudo_update:DisciplinaDtoUpdate ={
    nome:""
  }
  aparecer:boolean;
  

  constructor(public loading:LoadingController,public storageservice:StorageService,public file:File,private screenOrientation: ScreenOrientation,public global:GlobalService,private router:Router,public actionSheetController: ActionSheetController,public disciplinaservice:DisciplinaService,public alertcontroller:AlertController,public toastController: ToastController) { 
    this.aparecer=true;
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  ngOnInit() {
    this.disciplinaservice.findByRepositorio(this.global.idRepositorio)
    .subscribe(Response => {
      
      this.disciplinas=Response['content'];
      if(this.isEmpty(this.disciplinas)){
        this.aparecer=true;
      }else{
        this.aparecer=false;
      }
    }),
    error=>{
      this.aparecer=true;
    }
  }

  
  config(){
    this.router.navigateByUrl('/configuracoes');
  }

  adc(){
    
    if(this.global.idRepositorio=="undefined" || this.global.idRepositorio==undefined){
      this.showRepositorioError();
    }else{
      this.router.navigateByUrl('/form-disciplina');
    }
    
  }


  atualizar_pagina(event){

  
    this.disciplinaservice.findByRepositorio(this.global.idRepositorio)
    .subscribe(Response => {
      
      this.disciplinas=Response['content'];
      event.target.complete();
      if(this.isEmpty(this.disciplinas)){
        this.aparecer=true;
      }else{
        this.aparecer=false;
      }
    },
    error =>{
      console.log("Error");
      this.aparecer=true;
      event.target.complete();
    })
  }

  public isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


  clique(page:{id:string,nome:string}){
    this.global.nomeDisciplina=page.nome;
    this.global.idDisciplina=page.id;
    this.router.navigateByUrl('/conteudo-pasta');
  }

  async acao(page:{id:string,nome:string}) {
    console.log(page.id)
    const actionSheet = await this.actionSheetController.create({
      header: page.nome,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Renomear',
        role: 'color',
        icon: 'pencil-outline',
        handler: () => {
          this.presentAlertRadio(page.id,page.nome);
        }
      }, {
        text: 'Remover',
        icon: 'trash-outline',
        role: 'color',
        handler: () => {
          this.deleta_arquivo_disciplina(page.nome,page.id);
          
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
  
  async presentAlertRadio(id:string,nome:string) {
    const alert = await this.alertcontroller.create({
      cssClass: 'my-custom-class',
      header: "Renomear",
      inputs: [
        {
          name: 'nome_disciplina',
          type: 'text',
          placeholder: 'Digite o nome da disciplina'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            this.conteudo_update={
              nome:alertData.nome_disciplina
            }
            this.disciplinaservice.update(id,this.conteudo_update)
            .subscribe(response =>{
              this.renomear_arquivo_disciplina(nome,alertData.nome_disciplina);
            this.presentToast(alertData.nome_disciplina);
            this.ngOnInit();
          
           },
             error=>{
                 this.showUpdateError();
            });
          }
        }
      ]
    });

    await alert.present();
}

async showUpdateError() {
  let alert = await this.alertcontroller.create({
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

async showRepositorioError() {
  let alert = await this.alertcontroller.create({
    header: 'Erro',
    message: 'Selecione um repositório primeiro',
    buttons: [
      {
        text: 'Ok'
      }
    ]
  });
  alert.present();
}

async presentToast(nome:string) {
  const toast = await this.toastController.create({
    message: nome+' renomeada com sucesso',
    position:"bottom",
    duration: 2000
  });
  toast.present();
}

async deleteToast(nome:string) {
  const toast = await this.toastController.create({
    message: nome+' excluída com sucesso',
    position:"bottom",
    duration: 2000
  });
  toast.present();
}

renomear_arquivo_disciplina(nome_velho,nome_novo){
  this.file.moveDir(this.file.externalRootDirectory+"CloudBook/"+this.email+"/"+this.global.nomeRepositorio,nome_velho,this.file.externalRootDirectory+"/CloudBook/"+this.email+"/"+this.global.nomeRepositorio,nome_novo).then(res=>{
    alert("Renomeado")
  }).catch(err =>{
    alert("Erro na remoção:"+ this.file.externalRootDirectory+"/CloudBook/"+this.email+"/"+this.global.nomeRepositorio+","+nome_velho);
  })
}

deleta_arquivo_disciplina(nome,id){
  this.file.removeDir(this.file.externalRootDirectory+"CloudBook/"+this.email+"/"+this.global.nomeRepositorio,nome).then(res =>{
    alert("Removeu diretorio")
    this.disciplinaservice.delete(parseInt(id))
          .subscribe(Response =>{
            
           this.deleteToast(nome);
            this.ngOnInit();
          });
  }).catch(error=>{
    this.showDeleteError();
  })
}

async showDeleteError() {
  let alert = await this.alertcontroller.create({
    header: 'Erro ao deletar disciplina',
    message: 'Por favor, delete todas imagens dentro deste repositório',
    buttons: [
      {
        text: 'Ok'
      }
    ]
  });
  alert.present();
}
}


