import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          { path: '',  loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)}
        ]
      },
      {
        path: 'repositorios',
        loadChildren: () => import('../repositorios/repositorios.module').then(m => m.RepositoriosPageModule)
      },
  
      {
        path: 'disciplinas',
        loadChildren: () => import('../disciplinas/disciplinas.module').then(m => m.DisciplinasPageModule)
      },
      {
        path: 'conteudos',
        loadChildren: () => import('../conteudos/conteudos.module').then(m => m.ConteudosPageModule)
      },
      {
        path: '',
        redirectTo: '/start/tabs/home',
        pathMatch: 'full'
      }
     
    ]
  },
  {
    path: '',
    redirectTo: '/start/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
