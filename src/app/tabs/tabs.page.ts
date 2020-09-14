import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DisciplinaService } from 'src/services/disciplina.service';
import { GlobalService } from '../global.service';
import { DisciplinaDTO } from '../models/dto/disciplina.dto';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  disciplinas : DisciplinaDTO[];
  constructor(private router:Router,public disciplinaservice:DisciplinaService,public global:GlobalService,private screenOrientation: ScreenOrientation) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
  
  disciplina(){
   this.router.navigateByUrl('disciplinas');
  }
}
