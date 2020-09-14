import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { ConteudoService } from 'src/services/conteudo.service';
import { ConteudoDTO } from '../models/dto/conteudo.dto';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { File } from '@ionic-native/file/ngx';
import { StorageService } from 'src/services/storage.service';
import { DisciplinaService } from 'src/services/disciplina.service';
import { DisciplinaDTO } from '../models/dto/disciplina.dto';

@Component({
  selector: 'app-conteudo-pasta',
  templateUrl: './conteudo-pasta.page.html',
  styleUrls: ['./conteudo-pasta.page.scss'],
})
export class ConteudoPastaPage implements OnInit {
  conteudos:ConteudoDTO[];
  disciplinas:DisciplinaDTO[];
  nomeDisciplina:string;
  aparecer:boolean;
  liberado:boolean=false;
  constructor(public alert:AlertController,public disciplina:DisciplinaService,public storageservice:StorageService,private router:Router,private fileOpener: FileOpener,public actionSheetController: ActionSheetController,private screenOrientation: ScreenOrientation,public global:GlobalService,public conteudoservice:ConteudoService,public web:WebView,public file:File) { 
    this.aparecer=false;
    this.nomeDisciplina= this.global.nomeDisciplina;
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  

  ngOnInit() {

    this.conteudoservice.findConteudos(this.global.idDisciplina)
    .subscribe(Response =>{
    this.conteudos=Response['content'];
    if(this.isEmpty(this.conteudos)){
      this.aparecer=true;
    }else{
      this.aparecer=false;
    }

      this.conteudos.forEach(conteudo => {
        if(conteudo.tipo=="IMAGEM"){
        //  alert("ENTREI")
        
          conteudo.texto=this.web.convertFileSrc(conteudo.texto);
          
        }
      });
    }),
    error =>{
      this.aparecer=true;
    };
    
  }


  public remover_arquivo(assunto){
   // email|n_repositorio|n_disciplina|nConteudo
    let nome_app="CloudBook"
    let email=this.storageservice.getLocalUser().email;
    let nome_repo=this.global.nomeRepositorio;
    let nome_di=this.global.nomeDisciplina;
    

  let dir= this.file.externalRootDirectory+nome_app+"/"+email+"/"+nome_repo+"/"+nome_di+"/"
    
  this.file.removeFile(dir,assunto+".png").then(data =>{

  })
  .catch(err =>{

  })
  }

  async acao(page:{id:string,assunto:string,texto:string,}) {
    
    const actionSheet = await this.actionSheetController.create({
      header: page.assunto,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Remover',
        role: 'color',
        icon: 'trash-outline',
        handler: () => {
          
          this.conteudoservice.delete(parseInt(page.id))
          .subscribe(Response =>{
            this.remover_arquivo(page.assunto)
          this.ngOnInit();
          });
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

  async verificar(){
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Tipo de Conteúdo',
      inputs: [
        {
          name: 'anotation',
          type: 'radio',
          label: 'Anotação',
          value: 'value1',
          checked: true
        },
        {
          name: 'image',
          type: 'radio',
          label: 'Imagem',
          value: 'value2'
        }
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
          handler: ($event) => {
            if($event=="value1"){
              this.router.navigateByUrl('anotacao');

            }else{
              this.router.navigateByUrl('imagem');
            }
          }
        }
      ]
    });

    await alert.present();
  
  }
  

  atualizar_pagina(event){  
    this.conteudoservice.findConteudos(this.global.idDisciplina)
    .subscribe(Response => {
      
      this.conteudos=Response['content'];
       
      this.conteudos.forEach(conteudo => {
        if(conteudo.tipo=="IMAGEM"){
        //  alert("ENTREI")
       
          conteudo.texto=this.web.convertFileSrc(conteudo.texto);
        }
      });

      event.target.complete();
     
    },
    error =>{
      console.log("Error");
      
      event.target.complete();
    })
  }
  clique(page:{id:string,tipo:string,texto:string,assunto:string}){
    let dir_arq= page.texto.substr(28);
    dir_arq='file:///'+dir_arq;
    
    if(page.tipo!="ANOTACAO"){
      
    this.fileOpener.showOpenWithDialog(dir_arq, 'image/png')
    .then(() => console.log('File is opened'))
    .catch(e => alert(''+dir_arq));
    }else{
      
      this.global.nome_anotacao=page.assunto;
      this.global.texto_anotacao=page.texto;
      this.router.navigateByUrl('vis-anotacao');
    }
  }

 
  atualizar(){  
    this.conteudoservice.findConteudos(this.global.idDisciplina)
    .subscribe(Response => {
      
      this.conteudos=Response['content'];
      if(this.isEmpty(this.conteudos)){
        this.aparecer=true;
      }else{
        this.aparecer=false;
      }
     
    },
    error =>{
      this.aparecer=true;
    });
  }

  public isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

async showErrorVerification() {
  let alert = await this.alert.create({
    header: 'Atenção',
    message: 'Não foi possível carregar a imagem, por favor verifique se seu dispositvo esta sincronizado com esta conte.',
    buttons: [
      {
        text: 'Ok'
      }
    ]
  });
  alert.present();
}

}
