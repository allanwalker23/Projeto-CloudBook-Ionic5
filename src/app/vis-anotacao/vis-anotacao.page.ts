import { Component, OnInit } from '@angular/core';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { ConteudoService } from 'src/services/conteudo.service';
import { GlobalService } from '../global.service';
import { AnyNaptrRecord } from 'dns';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@Component({
  selector: 'app-vis-anotacao',
  templateUrl: './vis-anotacao.page.html',
  styleUrls: ['./vis-anotacao.page.scss'],
})
export class VisAnotacaoPage implements OnInit {
titulo:any;
texto:any;
  constructor(public screen:ScreenOrientation,private androidFullScreen: AndroidFullScreen,public conteudoservice:ConteudoService,public global:GlobalService) {
  this.titulo=this.global.nome_anotacao;
  this.texto=this.global.texto_anotacao;
  this.screen.unlock();

   }

  
  ngOnInit() {
    this.androidFullScreen.isImmersiveModeSupported()
  .then(() => alert("Tela"))
  .catch(err => console.log(err));


  }

}
