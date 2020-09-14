import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateRepositorioPage } from './update-repositorio.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateRepositorioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateRepositorioPageRoutingModule {}
