import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnotacaoPage } from './anotacao.page';

const routes: Routes = [
  {
    path: '',
    component: AnotacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnotacaoPageRoutingModule {}
