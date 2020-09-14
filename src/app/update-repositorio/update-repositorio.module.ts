import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateRepositorioPageRoutingModule } from './update-repositorio-routing.module';

import { UpdateRepositorioPage } from './update-repositorio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateRepositorioPageRoutingModule
  ],
  declarations: [UpdateRepositorioPage]
})
export class UpdateRepositorioPageModule {}
