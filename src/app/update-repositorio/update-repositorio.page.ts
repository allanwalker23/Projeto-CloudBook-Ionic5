import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RepositorioDTO } from '../models/dto/repositorio.dto';
import { StorageService } from 'src/services/storage.service';
import { AlunoService } from 'src/services/aluno.service';
import { RepositorioService } from 'src/services/repositorio.service';
import { RepositorioInsert } from '../models/insert/repositorio.insert';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-update-repositorio',
  templateUrl: './update-repositorio.page.html',
  styleUrls: ['./update-repositorio.page.scss'],
})
export class UpdateRepositorioPage implements OnInit {
  formulario: FormGroup;
  email=this.storageService.getLocalUser().email;
  repositorio:any;
  nome:string;
  desc:string;
  id:string;
   nome_repositorio:string;

   
  
  
  constructor(public file:File,public alertcontroller:AlertController,public router:Router,public global:GlobalService,public formBuilder: FormBuilder,public storageService:StorageService,public alunoService:AlunoService,public repo:RepositorioService,private screenOrientation: ScreenOrientation) { 
    this.id = this.global.id_repositorio_update;
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.formulario = this.formBuilder.group({
      nome_repositorio: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(80)]],
      descricao: ['',[ Validators.minLength(2),Validators.maxLength(80)]],
     
        
    });
  }

  ngOnInit() {

      this.repo.findById(this.id)
    .subscribe(Response => {
     this.repositorio=Response;
     console.log(this.repositorio)
    this.nome_repositorio=this.repositorio.nome;

    },
error => {
  //event.target.complete();
});

  }

  atualizar(){
    this.repositorio.nome=this.nome;
    this.repositorio.descricao=this.desc;
    this.repositorio.data= Date.now();
    console.log(this.repositorio)
    console.log(this.id);
    this.repo.update(this.id,this.repositorio).subscribe(Response=>{
      this.alterar_nome_diretorio();
     this.router.navigateByUrl('tabs')
    },
    error =>{
console.log(error)
    });
   
  }

  deletar(){
   this.deletar_diretorio();
        }

        async confirmacao() {
          const alert = await this.alertcontroller.create({
            cssClass: 'my-custom-class',
            header: 'Excluir repositório?',
            message: 'O repositório <strong>'+this.nome_repositorio+"</strong> será exluído permanentemente.",
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  
                }
              }, {
                text: 'Ok',
                handler: () => {
                 this.deletar();
                }
              }
            ]
          });
      
          await alert.present();
        }

        alterar_nome_diretorio(){
          this.file.moveDir(this.file.externalRootDirectory+"/CloudBook/"+this.email+"/",this.global.nomeRepositorio,this.file.externalRootDirectory+"/CloudBook/"+this.email+"/",this.nome).then(res=>{
            alert("Renomeado")
          }).catch(err =>{
            alert("Erro na remoção:"+ this.file.externalRootDirectory+"/CloudBook/"+this.email+","+this.global.nomeRepositorio);
          })
        }

        deletar_diretorio(){
          this.file.removeDir(this.file.externalRootDirectory+"CloudBook/"+this.email,this.global.nomeRepositorio).then(res =>{
            alert("Removeu diretorio")
            this.repo.delete(parseInt(this.id))
            .subscribe(Response =>{
              
              this.router.navigateByUrl('tabs')
            }),
            error =>{
              alert("Erro no servidor")
            };
          }).catch(error=>{
         this.showDeleteError();
          })
        }

        async showDeleteError() {
          let alert = await this.alertcontroller.create({
            header: 'Erro ao deletar disciplina',
            message: 'Por favor, delete todas as diciplinas deste repositório.',
            buttons: [
              {
                text: 'Ok'
              }
            ]
          });
          alert.present();
        }
  
}
