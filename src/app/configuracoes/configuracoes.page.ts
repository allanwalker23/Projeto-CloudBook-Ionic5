import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/services/storage.service';
import { AlunoDto } from '../models/dto/aluno.dto';
import { AlunoService } from 'src/services/aluno.service';
import { AuthService } from '../auth/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Storage } from '@ionic/storage';
import { error } from 'protractor';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
})
export class ConfiguracoesPage implements OnInit {
  
  aluno:AlunoDto;
  nomeRepositorio:string;
  id:string;
  email=this.storageservice.getLocalUser().email;
  foto_perfil:any;
  liberado:boolean=false;
  constructor(public file:File,private screenOrientation: ScreenOrientation,private webview:WebView,public storageservice:StorageService,public storage2:Storage,public loading:LoadingController,public alert:AlertController,public global:GlobalService,private router:Router,public storage:StorageService,public alunoservice:AlunoService, public auth: AuthService) { 
  this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.nomeRepositorio= this.global.nomeRepositorio;
  }

  ngOnInit() {

    this.storage2.get('foto_perfil').then((photos) => {
      
      if(photos[0].email!=this.email){
        
        
      }else{
       // alert(photos[0].data)
        if(photos[0].data!="undefined"){
          this.foto_perfil= this.webview.convertFileSrc(photos[0].data);
        //  alert(this.foto_perfil)
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
      this.id = this.aluno.id;

    },
    error =>{
      if(error.status == 403){
        this.router.navigateByUrl('/login');
      }
    });
  }
 
  }
  trocar(){
    //false
    this.storage2.get('modo_escuro').then((resposta) => {
      
      if(resposta==false){
        this.showDarkSide();
        document.body.classList.add("dark");
        this.storage2.set('modo_escuro',true);
        this.global.logo="assets/imgs/icone_imagem_alt.png";
        this.global.logo_quadro="assets/adc-quadro.png";
        this.global.foto_default="assets/perfil2.png";
      }else{
        this.showLightSide();
        document.body.classList.remove("dark");
        this.storage2.set('modo_escuro',false);
        this.global.logo="assets/imgs/icone_imagem_azul.png";
        this.global.checado="";
        this.global.logo_quadro="assets/adc-quadro2.png";
        this.global.foto_default="assets/perfil.png";
    }
    error=>{
      alert("Erro")
   
    }
    
  });

  }

  creditos(){
    this.router.navigateByUrl('/creditos');
  }

 
  perfil(){
    this.router.navigateByUrl('/perfil');
  }
  sair(){
    this.auth.logout();
    this.router.navigateByUrl('/login')
  }
  tutorial(){
    this.router.navigateByUrl('/tutorial')
  }

  tutorial2(){
    this.router.navigateByUrl('/exportar')
  }

  async confirmacao() {
    const alert = await this.alert.create({
      header: 'Deletar conta',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder:'Digite "DELETAR" para continuar'
       
  },
       
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: ($event) => {
          if($event.name1=="DELETAR"){
            this.deletar_pasta();
          }else{
            
            this.showErrorVerification();
          }
          }
        }
      ]
    });

    await alert.present();
  }

  async showErrorVerification() {
    let alert = await this.alert.create({
      header: 'Erro',
      message: 'Digite novamente',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

 
  deletar_pasta(){
    this.file.removeDir(this.file.externalRootDirectory+"/CloudBook",this.email).then(data =>{

      this.alunoservice.delete(parseInt(this.id)).subscribe(Response=>{
        this.presentLoading();
        
        this.router.navigateByUrl('login');
      },
      error=>{
  
      })
    }).catch(error =>{
    this.showDeleteError();

    });
  
  }

  async showDeleteError() {
    let alert = await this.alert.create({
      header: 'Erro ao deletar disciplina',
      message: 'Por favor, delete todos os repositórios desta conta.',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

  

  async presentLoading() {
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Removendo...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    
  }

  async showDarkSide() {
    let alert = await this.alert.create({
      header: 'The DarkSide',
      message: 'Bem vindo(a) ao lado negro da Força.',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

  async showLightSide() {
    let alert = await this.alert.create({
      header: 'Olá Jedi',
      message: 'Bem vindo(a) ao lado luminoso da Força',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

}
