import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormDisciplinaPageRoutingModule } from './form-disciplina-routing.module';

import { FormDisciplinaPage } from './form-disciplina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,  
    FormDisciplinaPageRoutingModule
  ],
  declarations: [FormDisciplinaPage]
})
export class FormDisciplinaPageModule {}
