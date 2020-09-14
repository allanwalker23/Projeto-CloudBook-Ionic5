import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, PopoverController } from '@ionic/angular';

import { ConteudosPageRoutingModule } from './conteudos-routing.module';

import { ConteudosPage } from './conteudos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConteudosPageRoutingModule
  ],
  declarations: [ConteudosPage]
})
export class ConteudosPageModule {}
