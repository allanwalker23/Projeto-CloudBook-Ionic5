import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormRepositorioPageRoutingModule } from './form-repositorio-routing.module';

import { FormRepositorioPage } from './form-repositorio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule, 
    FormsModule, 
    FormRepositorioPageRoutingModule
  ],
  declarations: [FormRepositorioPage]
})
export class FormRepositorioPageModule {}
