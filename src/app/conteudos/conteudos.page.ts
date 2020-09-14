import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { DisciplinaService } from 'src/services/disciplina.service';
import { DisciplinaDTO } from '../models/dto/disciplina.dto';
import { ConteudoDTO } from '../models/dto/conteudo.dto';
import { ConteudoService } from 'src/services/conteudo.service';
import { SettingComponent } from '../setting/setting.component'
import { PopoverController, AlertController } from '@ionic/angular';
import { isEmpty } from 'rxjs/operators';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-conteudos',
  templateUrl: './conteudos.page.html',
  styleUrls: ['./conteudos.page.scss'],
})
export class ConteudosPage implements OnInit {
disciplinas:DisciplinaDTO[];
conteudos:ConteudoDTO=null;
numero_materias:number;
aparecer:boolean=true;
  constructor(public file:File,private screenOrientation: ScreenOrientation,public alert:AlertController,public global:GlobalService,private router:Router,public disciplinaservice:DisciplinaService,public conteudoservice:ConteudoService,public popoverController: PopoverController) { 
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  ngOnInit() {


     this.conteudoservice.findAllConteudos()
    .subscribe(Response =>{
     this.conteudos=Response['content'];
   
    if(this.isEmpty(this.conteudos)){
      this.aparecer=true;
    }
     
    }),
    error=>{
      this.aparecer=true;
    };


    
     
  
  }

  async verificar() {

    if(this.global.idRepositorio==undefined || this.global.idRepositorio=="undefined"){
      this.showErrorRepo();
    }else{
    this.disciplinaservice.findByRepositorio(this.global.idRepositorio)
    .subscribe(Response => {
      
      this.disciplinas=Response['content'];
      if(this.isEmpty(this.disciplinas)){
      this.showErrorDisci();
      }else{
       this.popover();
     }
     })
    }
  }
  
  config(){
    this.router.navigateByUrl('/configuracoes');
  }

  async showErrorRepo() {
    let alert = await this.alert.create({
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
    let alert = await this.alert.create({
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


  atualizar_pagina(event){
    event.target.complete();
    this.conteudoservice.findAllConteudos()
    .subscribe(Response =>{
     this.conteudos=Response['content'];
     event.target.complete();
    }),
    error=>{
      event.target.complete();
      this.aparecer=true;
    };

    
      console.log(this.conteudos)
  }



   // this.numero_materias=this.disciplinas.length;
    
    public isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

  adc(){
    this.router.navigateByUrl('/form-conteudos');
  }

  foto(){
    this.router.navigateByUrl('/imagem');
  }

  async popover(){
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

  async ok(){
    
      let alert = await this.alert.create({
        header: 'Pasta importada',
        message: 'A pasta foi importada com sucesso, o proxímo passo é entrar na conta de seu amigo',
        buttons: [
          {
            text: 'Ok'
          }
        ]
      });
      alert.present();
    
  }

  importar(){
    this.file.copyDir(this.file.externalRootDirectory+"Xender/folder","CloudBook",this.file.externalRootDirectory,"CloudBook").then(res=>{
        this.ok();
    }).catch(err =>{
      this.showErrorVerification();
    })
  }

  async showErrorVerification() {
    let alert = await this.alert.create({
      header: 'Erro',
      message: 'Tente mover a pasta "CloudBook" presente em ArmzLocal/Xender/Folder para ArmzLocal sobrescrevendo-a.',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

  
  
}
