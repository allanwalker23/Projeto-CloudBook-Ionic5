import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Injectable({
  providedIn: 'root'
})
export class PhotoquadroService {
email="allanhipolito@gmail.com";
  public photo: Photo[]=[];

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
     allowEdit:true,

    correctOrientation:true,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType:this.camera.PictureSourceType.PHOTOLIBRARY
  }

    
  
  constructor(public camera:Camera, public storage: Storage,public file:File,private webview:WebView) { 
  
  }

 

  async captureImage() {
    
    this.camera.getPicture(this.options).then((imageData) => {
      // Adiciona uma nova foto à galeria
      
      
      this.photo.unshift({
          email:this.email,
          data :imageData
         
      });
      this.storage.set('foto_quadro', this.photo);
      
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

