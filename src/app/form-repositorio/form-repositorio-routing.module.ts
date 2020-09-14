import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormRepositorioPage } from './form-repositorio.page';

const routes: Routes = [
  {
    path: '',
    component: FormRepositorioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRepositorioPageRoutingModule {}
