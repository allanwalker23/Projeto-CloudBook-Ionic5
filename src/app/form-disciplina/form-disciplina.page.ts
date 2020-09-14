import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlunoService } from 'src/services/aluno.service';
import { RepositorioService } from 'src/services/repositorio.service';
import { StorageService } from 'src/services/storage.service';
import { AlunoDto } from '../models/dto/aluno.dto';
import { RepositorioInsert } from '../models/insert/repositorio.insert';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { DisciplinaInsert } from '../models/insert/disciplina.insert';
import { GlobalService } from '../global.service';
import { DisciplinaService } from 'src/services/disciplina.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-form-disciplina',
  templateUrl: './form-disciplina.page.html',
  styleUrls: ['./form-disciplina.page.scss'],
})
export class FormDisciplinaPage implements OnInit {
  formulario: FormGroup;
nome:string;
email=this.storage.getLocalUser().email;
disciplina:DisciplinaInsert ={
  nome:"",
  repositorio:{
    id:"",
  }
};
  constructor(public loading:LoadingController,public file:File,public platform:Platform,public global:GlobalService,public alunoservice:AlunoService,public storage:StorageService,public alertController: AlertController,private screenOrientation: ScreenOrientation,private router:Router,public formBuilder: FormBuilder,public disciplinaservice:DisciplinaService) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.formulario = this.formBuilder.group({

      
      nome: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(80)]],
    });
   }

  ngOnInit() {
  }

  
  async presentLoading() {
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Adicionando disciplina...',
      duration: 3000
    });
    await loading.present();
  
    const { role, data } = await loading.onDidDismiss();
    
  }

  criar() {
    let id_string=this.global.idRepositorio;;
    

    this.disciplina ={
      nome:this.nome,
      repositorio:{
        id:id_string,
      
      }
    };
    
    this.disciplinaservice.insert(this.disciplina)
    .subscribe(Response=>{
      this.criar_diretorio();
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

  criar_diretorio(){
    this.platform.ready().then(() =>{
      if(this.platform.is('android')) {
        this.file.checkDir(this.file.externalRootDirectory+"/CloudBook/"+this.email+"/"+this.global.nomeRepositorio,this.nome).then(response => {
     // this.criar_diretorio2();
    //  alert("Pasta criada");
        }).catch(err => {
          console.log('Directory doesn\'t exist'+JSON.stringify(err));
          this.file.createDir(this.file.externalRootDirectory+"/CloudBook/"+this.email+"/"+this.global.nomeRepositorio, this.nome, false).then(response => {
            
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
