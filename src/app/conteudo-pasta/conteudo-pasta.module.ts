import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConteudoPastaPageRoutingModule } from './conteudo-pasta-routing.module';

import { ConteudoPastaPage } from './conteudo-pasta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConteudoPastaPageRoutingModule
  ],
  declarations: [ConteudoPastaPage]
})
export class ConteudoPastaPageModule {}
