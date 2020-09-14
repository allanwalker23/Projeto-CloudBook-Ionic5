import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';


import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-form-conteudos',
  templateUrl: './form-conteudos.page.html',
  styleUrls: ['./form-conteudos.page.scss'],
})
export class FormConteudosPage implements OnInit {

  constructor(public router:Router,private screenOrientation: ScreenOrientation) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
   }

  ngOnInit() {
    
  }

  

  proximo(){
    this.router.navigateByUrl('/imagem');
  }

}
