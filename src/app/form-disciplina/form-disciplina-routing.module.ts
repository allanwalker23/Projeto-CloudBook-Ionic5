import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormDisciplinaPage } from './form-disciplina.page';

const routes: Routes = [
  {
    path: '',
    component: FormDisciplinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormDisciplinaPageRoutingModule {}
