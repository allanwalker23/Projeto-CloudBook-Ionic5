import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, Platform, LoadingController, ToastController } from '@ionic/angular';
import { ConteudoService } from 'src/services/conteudo.service';
import { DisciplinaService } from 'src/services/disciplina.service';
import { DisciplinaDTO } from '../models/dto/disciplina.dto';
import { GlobalService } from '../global.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ConteudoInsert } from '../models/insert/conteudo.insert';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { stringify } from 'querystring';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { PhotoService } from '../services/photo.service';
import { PhotoquadroService } from '../services/photoquadro.service';
import { Storage } from '@ionic/storage';
import { StorageService } from 'src/services/storage.service';
import { PhotoquadrocameraService } from '../services/photoquadro-camera.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-imagem',
  templateUrl: './imagem.page.html',
  styleUrls: ['./imagem.page.scss'],
})
export class ImagemPage implements OnInit {
disciplinas:DisciplinaDTO;
id_disciplina_selecionado:string;

email=this.storageservice.getLocalUser().email;
nome_app="CloudBook"
nome_repo = this.global.nomeRepositorio;
nome_di:string;
nome_co:string;
liberado:boolean=false;
quadro: string;
foto:any;
logo:string;
options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}

conteudo:ConteudoInsert ={
  assunto:"",
  data_criacao:null,
  texto:"",
  tipo:"1",
  disciplina:{
    id:"1"
  }
}

  constructor(public storageservice:StorageService,public toast:ToastController,public loading:LoadingController,public photo2:PhotoquadrocameraService,public storage:Storage,private screenOrientation: ScreenOrientation,public photo:PhotoquadroService,public web:WebView ,public actionSheetController: ActionSheetController,public disciplinaservice:DisciplinaService,public global:GlobalService,public conteudoservice:ConteudoService,public alertController: AlertController,private router:Router,private camera:Camera,public platform:Platform,public file:File) { 
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.showWarning();
    this.logo =global.logo_quadro;
  }
  
  ngOnInit() {
   // this.criar_diretorio1();

    this.disciplinaservice.findByRepositorio(this.global.idRepositorio)
    .subscribe(Response =>{
    this.disciplinas =Response['content'];

    
    });
  }

  
  selecionar(event){
   let exe = event.detail.value;
this.id_disciplina_selecionado=exe.substr(exe.indexOf(",")+1);
   this.nome_di=exe.substr(0,exe.indexOf(","));
   
  
  }
 
 
  async showWarning() {

    let alert = await this.alertController.create({
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

  async showErrorGoogleFotos() {

    let alert = await this.alertController.create({
      header: 'Erro',
      message: "Tente usar a galeria nativa do disposito, exceto pelo Google Fotos",
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

  async captureImage() {
    this.camera.getPicture(this.options).then((imageData) => {
    
      this.quadro =  imageData;
       //alert(this.quadro)
     }, (err) => {
      
     });
     
    
  //this.showInsertPhoto(this.quadro);
  }

  criar_diretorio1(){
    this.platform.ready().then(() =>{
      if(this.platform.is('android')) {
        this.file.checkDir(this.file.externalRootDirectory, this.nome_app).then(response => {
      this.criar_diretorio2();
    //  alert("Pasta criada");
        }).catch(err => {
          console.log('Directory doesn\'t exist'+JSON.stringify(err));
          this.file.createDir(this.file.externalRootDirectory, this.nome_app, false).then(response => {
            
           this.criar_diretorio2();
        //   alert("Pasta criada");
          }).catch(err => {
        //  alert('Pasta não criada'+JSON.stringify(err));
          }); 
        });
      }
    });
    
  }

 criar_diretorio2(){
  
  
  this.platform.ready().then(() =>{ 
    if(this.platform.is('android')) {
      this.file.checkDir(this.file.externalRootDirectory+this.nome_app+"/", this.email).then(response => {
      this.criar_diretorio3();
    //  alert("Pasta criada");
      }).catch(err => {
        console.log('Directory doesn\'t exist'+JSON.stringify(err));
        this.file.createDir(this.file.externalRootDirectory+this.nome_app+"/", this.email, false).then(response => {
        //  alert("Pasta criada");
          this.criar_diretorio3();
        
        }).catch(err => {
       // alert('Pasta não criada'+JSON.stringify(err));
        }); 
      });
    }
  });
  
}


criar_diretorio3(){
  this.platform.ready().then(() =>{
    if(this.platform.is('android')) {
      this.file.checkDir(this.file.externalRootDirectory+this.nome_app+"/"+this.email+"/",this.nome_repo).then(response => {

        this.criar_diretorio4();
    }).catch(err => {
        console.log('Directory doesn\'t exist'+JSON.stringify(err));
        this.file.createDir(this.file.externalRootDirectory+this.nome_app+"/"+this.email+"/",this.nome_repo, false).then(response => {
        this.criar_diretorio4();

        
       
        }).catch(err => {
     //   alert('Pasta não criada:');
        }); 
      });
    }
  });
}


criar_diretorio4(){
  this.platform.ready().then(() =>{
    if(this.platform.is('android')) {
      this.file.checkDir(this.file.externalRootDirectory+this.nome_app+"/"+this.email+"/"+this.nome_repo,this.nome_di).then(response => {


    }).catch(err => {
        console.log('Directory doesn\'t exist'+JSON.stringify(err));
        this.file.createDir(this.file.externalRootDirectory+this.nome_app+"/"+this.email+"/"+this.nome_repo,this.nome_di, false).then(response => {
        

        
       
        }).catch(err => {
      //  alert('Pasta não criada:');
        }); 
      });
    }
  });
}
async presentToast() {
  let diretorio= this.nome_app+"/"+this.email+"/"+this.nome_repo+"/"+this.nome_di+"/";
  const toast = await this.toast.create({
    message: 'Conteúdo adicionado em '+diretorio,
    position:"bottom",
    duration: 2000
  });
  toast.present();
}
adicionar(){
  this.criar_diretorio1();
  
  this.presentLoading();
  let nome_foto_cache= this.quadro.substr(63);
  
  nome_foto_cache= nome_foto_cache.substr(0,nome_foto_cache.indexOf("?"));
   
   
  
    this.file.moveFile(this.file.externalRootDirectory+"Android/data/io.ionic.starter/cache/",nome_foto_cache,this.file.externalRootDirectory+this.nome_app+"/"+this.email+"/"+this.nome_repo+"/",this.nome_di+"/"+this.nome_co+".png")
    .then(data=>{
      this.adiciona2();    
    // this.presentToast();
   // this.mostrar_aviso_sucesso();
   
      
    // this.navCtrl.setRoot(AboutPage);
      
    })
    .catch(err=>{
    this.showErrorGoogleFotos();
   //  this.mostrar_aviso_erro();
    })
    //annoying quirk with plugin means 'result' wont return false, instead i have to use catch to know the file doesn't exis 

}

adiciona2(){ 
  
  
  this.conteudo ={
    assunto:this.nome_co,
    data_criacao:null,
    texto:this.file.externalRootDirectory+this.nome_app+"/"+this.email+"/"+this.nome_repo+"/"+this.nome_di+"/"+this.nome_co+".png",
    tipo:"1",
    disciplina:{
    id:this.id_disciplina_selecionado
    }
  };
  
  this.conteudoservice.insert(this.conteudo)
  .subscribe(Response=>{
    
    this.router.navigateByUrl('tabs');
    
  },
  error =>{
    //this.showInsertError();
  })
}

atualizar(){
  this.storage.get('foto_quadro').then((photos) => {
  
    if(photos[0].data!="undefined" && photos[0].data!=null){
      
        this.foto= this.web.convertFileSrc(photos[0].data);
        
        this.liberado=true;
        this.storage.set('foto_quadro',null)
      //  alert("entrou no ft quadro")
      }
      
    
  },
  error=>{
    alert("Erro")
    this.liberado=false;
  }
  
  );

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



atualizar_pagina(event){
event.target.complete();
  this.storage.get('foto_quadro').then((photos) => {
  this.quadro=photos[0].data;
    if(photos[0].data!="undefined" && photos[0].data!=null){
    this.foto= this.web.convertFileSrc(photos[0].data);
    
    this.liberado=true;
    this.storage.set('foto_quadro',null);
    event.target.complete();
   // alert("entrou no if")
    }else{
    //  alert("ta no else")
     // this.atualizar();
      event.target.complete();
    }
  
  
},
error=>{
alert("Erro")
event.target.complete();
}

);


 }


async acao() {
 // console.log(page.id)
  const actionSheet = await this.actionSheetController.create({
   
    cssClass: 'my-custom-class',
    buttons: [{
      text: 'Tirar foto',
      role: 'color',
      icon: 'camera-sharp',
      handler: () => {
        this.photo2.captureImage();
       
      }
    }, {
      text: 'Adicionar da galeria',
      icon: 'image-sharp',
      role: 'color',
      handler: () => {
        this.photo.captureImage();
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

 
}





