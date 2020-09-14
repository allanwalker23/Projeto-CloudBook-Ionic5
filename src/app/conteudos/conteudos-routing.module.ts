import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConteudosPage } from './conteudos.page';

const routes: Routes = [
  {
    path: '',
    component: ConteudosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConteudosPageRoutingModule {}
