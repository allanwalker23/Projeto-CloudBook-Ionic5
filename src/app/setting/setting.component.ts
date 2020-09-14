import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {

  constructor(public router:Router,public global:GlobalService) {
    
   }

  ngOnInit() {
    
  }

  foto(){
    this.router.navigateByUrl('imagem');
  }

  anotacao(){
    this.router.navigateByUrl('anotacao');
  }

  
  }

