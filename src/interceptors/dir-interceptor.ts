import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';
import { File } from '@ionic-native/file/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable()
export class DirInterceptor{
    nome_app = "CloudBook";
    
    constructor(public router:Router,public file:File,public platform:Platform,public alert:AlertController,public storage:Storage) {

    }

    verificar(email){
        if(this.platform.is('android')) {
            this.file.checkDir(this.file.externalRootDirectory+this.nome_app+"/", email).then(response => {
                //FLUXO NORMAL
                
            }).catch(err => {
             this.showErrorVerification();

               //MODIFICAR CONTEUDO DAS FOTOS  
            });
    }  

 
}

   

async showErrorVerification() {
    let alert = await this.alert.create({
      header: 'Atenção',
      message: 'O repositório desta conta não esta sincronizado com o celular, por favor exporte a pasta desta conta para poder visualizar as imagens corretamente',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

}