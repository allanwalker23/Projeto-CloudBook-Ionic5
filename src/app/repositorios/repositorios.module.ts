import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepositoriosPageRoutingModule } from './repositorios-routing.module';

import { RepositoriosPage } from './repositorios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepositoriosPageRoutingModule
  ],
  declarations: [RepositoriosPage]
})
export class RepositoriosPageModule {}
