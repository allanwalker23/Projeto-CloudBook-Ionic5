import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConteudoPastaPage } from './conteudo-pasta.page';

const routes: Routes = [
  {
    path: '',
    component: ConteudoPastaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConteudoPastaPageRoutingModule {}
