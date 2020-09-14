import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.page.html',
  styleUrls: ['./exportar.page.scss'],
})
export class ExportarPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  baixar(){
    window.open('https://play.google.com/store/apps/details?id=cn.xender&hl=pt_BR', '_system', 'location=yes'); 
    return false;
   }

   terminar(){
    this.router.navigateByUrl('tabs')
   }
}
