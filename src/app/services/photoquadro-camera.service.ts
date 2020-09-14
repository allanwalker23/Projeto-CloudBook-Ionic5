import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class PhotoquadrocameraService {
email="allanhipolito@gmail.com";
  public photo: Photo[]=[];

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
     allowEdit:true,

    correctOrientation:true,
    mediaType: this.camera.MediaType.PICTURE
    
  }

    
  
  constructor(public loading:LoadingController,public camera:Camera, public storage: Storage,public file:File,private webview:WebView) { 
  
  }

  async carrega_foto(){
    
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Carregando foto...',
      duration: 3000,
      
    });
    await loading.present();
  
    const { role, data } = await loading.onDidDismiss();
  }

  async captureImage() {
    
    this.camera.getPicture(this.options).then((imageData) => {
      // Adiciona uma nova foto à galeria
      
      
      this.photo.unshift({
          email:this.email,
          data :imageData
         
      });
      this.storage.set('foto_quadro', this.photo);
      
        
        
        
      
  this.carrega_foto();    
    }, (err) => {
      // Handle error
      console.log("Erro na Camera: " + err);
  });
  
}



}



 class Photo{
  email:string;
  data:any;  
}

