import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagemPageRoutingModule } from './imagem-routing.module';

import { ImagemPage } from './imagem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule, 
   
    ImagemPageRoutingModule
  ],
  declarations: [ImagemPage]
})
export class ImagemPageModule {}
