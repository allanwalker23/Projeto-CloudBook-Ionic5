import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportarPageRoutingModule } from './exportar-routing.module';

import { ExportarPage } from './exportar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportarPageRoutingModule
  ],
  declarations: [ExportarPage]
})
export class ExportarPageModule {}
