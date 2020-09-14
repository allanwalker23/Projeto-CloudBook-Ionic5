import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportarPage } from './exportar.page';

const routes: Routes = [
  {
    path: '',
    component: ExportarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportarPageRoutingModule {}
