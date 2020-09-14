import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagemPage } from './imagem.page';

const routes: Routes = [
  {
    path: '',
    component: ImagemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagemPageRoutingModule {}
