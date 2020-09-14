import { Component, OnInit } from '@angular/core';
import { ConteudoService } from 'src/services/conteudo.service';
import { AlertController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DisciplinaService } from 'src/services/disciplina.service';
import { ConteudoInsert } from '../models/insert/conteudo.insert';
import { DisciplinaDTO } from '../models/dto/disciplina.dto';
import { GlobalService } from '../global.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-anotacao',
  templateUrl: './anotacao.page.html',
  styleUrls: ['./anotacao.page.scss'],
})
export class AnotacaoPage implements OnInit {
  disciplinas:DisciplinaDTO;
  id_disciplina_selecionado:string;
  
  assunto:string;
  texto:string;
  
  
  conteudo:ConteudoInsert ={
    assunto:"",
    data_criacao:null,
    texto:"",
    tipo:"0",
    disciplina:{
      id:"1"
    }
  }
  constructor(public loading:LoadingController,private screenOrientation: ScreenOrientation,public actionSheetController: ActionSheetController,public disciplinaservice:DisciplinaService,public global:GlobalService,public conteudoservice:ConteudoService,public alertController: AlertController,private router:Router) { 
    //BLOQUEANOD ORIENTAÇÃO
this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  ngOnInit() {
    this.disciplinaservice.findByRepositorio(this.global.idRepositorio)
    .subscribe(Response =>{
    this.disciplinas =Response['content'];

    
    });
  }

  async presentLoading() {
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Adicionando conteúdo...',
      duration: 3000
    });
    await loading.present();
  
    const { role, data } = await loading.onDidDismiss();
    
  }

  selecionar(event){
   
    this.id_disciplina_selecionado=event.detail.value;
     
   }

   
  adicionar(){
    this.conteudo ={
      assunto:this.assunto,
      data_criacao:null,
      texto:this.texto,
      tipo:"0",
      disciplina:{
      id:this.id_disciplina_selecionado
      }
    };
    console.log(this.conteudo);
    this.conteudoservice.insert(this.conteudo)
    .subscribe(Response=>{
      this.presentLoading();
      this.router.navigateByUrl('tabs');
    },
    error =>{
      this.showInsertError();
    })
  }

  async showInsertError() {
    let alert = await this.alertController.create({
      header: 'Erro',
      message: 'Preencha todos os campos corretamente',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

}
