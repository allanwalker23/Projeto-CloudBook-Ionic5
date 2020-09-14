import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnotacaoPageRoutingModule } from './anotacao-routing.module';

import { AnotacaoPage } from './anotacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnotacaoPageRoutingModule
  ],
  declarations: [AnotacaoPage]
})
export class AnotacaoPageModule {}
