import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisAnotacaoPageRoutingModule } from './vis-anotacao-routing.module';

import { VisAnotacaoPage } from './vis-anotacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisAnotacaoPageRoutingModule
  ],
  declarations: [VisAnotacaoPage]
})
export class VisAnotacaoPageModule {}
