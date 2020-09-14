import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlunoService } from 'src/services/aluno.service';
import { RepositorioService } from 'src/services/repositorio.service';
import { StorageService } from 'src/services/storage.service';
import { AlunoDto } from '../models/dto/aluno.dto';
import { RepositorioInsert } from '../models/insert/repositorio.insert';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-form-repositorio',
  templateUrl: './form-repositorio.page.html',
  styleUrls: ['./form-repositorio.page.scss'],
})
export class FormRepositorioPage implements OnInit {
  formulario: FormGroup;
  
  nome:string;
  descricao:string;
  aluno:AlunoDto;
  email=this.storageservice.getLocalUser().email;
  
  repo:RepositorioInsert ={
    nome:"",
    data:null,
    descricao:"",
    aluno:{
      id:"",
    }
  };
  constructor(public loading:LoadingController,public storageservice:StorageService,public platform:Platform,public file:File,public alunoservice:AlunoService,public storage:StorageService,public alertController: AlertController,private screenOrientation: ScreenOrientation,private router:Router,public formBuilder: FormBuilder,public repositorioservice:RepositorioService) { 
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    
 this.formulario = this.formBuilder.group({

      
          nome: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(80)]],
          data:null,
          descricao: ['',[Validators.maxLength(80)]], 
        });
    
      
  }

  ngOnInit() {
   
    }

  criar() {
    let id_string;
    let localuser = this.storage.getLocalUser();
    if(localuser && localuser.email){
      this.alunoservice.findByEmail(localuser.email)
      .subscribe(response =>{
        id_string = response.id.toString();
      
        this.repo ={
          nome:this.nome,
          data:null,
          descricao:this.descricao,
          aluno:{
            id:id_string,
          
          }
        };
        this.repositorioservice.insert(this.repo)
        .subscribe(Response=>{
          this.criar_diretorio();
          this.presentLoading();
          this.router.navigateByUrl('tabs');
        },
        error =>{
          this.showInsertError();
        })
      },
      error =>{
        this.showInsertError();
      });
    }
 
  }

  async presentLoading() {
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Adicionando repositório...',
      duration: 3000
    });
    await loading.present();
  
    const { role, data } = await loading.onDidDismiss();
    
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

  criar_diretorio(){
    this.platform.ready().then(() =>{
      if(this.platform.is('android')) {
        this.file.checkDir(this.file.externalRootDirectory+"/CloudBook/"+this.email+"/",this.nome).then(response => {
     // this.criar_diretorio2();
    //  alert("Pasta criada");
        }).catch(err => {
          console.log('Directory doesn\'t exist'+JSON.stringify(err));
          this.file.createDir(this.file.externalRootDirectory+"/CloudBook/"+this.email+"/", this.nome, false).then(response => {
            
          // this.criar_diretorio2();
        //   alert("Pasta criada");
          }).catch(err => {
          alert('Pasta não criada'+JSON.stringify(err));
          }); 
        });
      }
    });
    
  }
}
