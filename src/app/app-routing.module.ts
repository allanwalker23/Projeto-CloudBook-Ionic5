import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'tabs', loadChildren:() => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'start', loadChildren:() => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'login', loadChildren:() => import('./login/login.module').then(m => m.LoginPageModule)},
  {
    path: 'repositorios',
    loadChildren: () => import('./repositorios/repositorios.module').then( m => m.RepositoriosPageModule)
  },
  {
    path: 'disciplinas',
    loadChildren: () => import('./disciplinas/disciplinas.module').then( m => m.DisciplinasPageModule)
  },
  {
    path: 'conteudos',
    loadChildren: () => import('./conteudos/conteudos.module').then( m => m.ConteudosPageModule)
  },
  {
    path: 'configuracoes',
    loadChildren: () => import('./configuracoes/configuracoes.module').then( m => m.ConfiguracoesPageModule)
  },
  {
    path: 'pagamentos',
    loadChildren: () => import('./pagamentos/pagamentos.module').then( m => m.PagamentosPageModule)
  },
  {
    path: 'creditos',
    loadChildren: () => import('./creditos/creditos.module').then( m => m.CreditosPageModule)
  },
  {
    path: 'form-repositorio',
    loadChildren: () => import('./form-repositorio/form-repositorio.module').then( m => m.FormRepositorioPageModule)
  },
  {
    path: 'form-disciplina',
    loadChildren: () => import('./form-disciplina/form-disciplina.module').then( m => m.FormDisciplinaPageModule)
  },
  {
    path: 'form-conteudos',
    loadChildren: () => import('./form-conteudos/form-conteudos.module').then( m => m.FormConteudosPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'imagem',
    loadChildren: () => import('./imagem/imagem.module').then( m => m.ImagemPageModule)
  },
  {
    path: 'anotacao',
    loadChildren: () => import('./anotacao/anotacao.module').then( m => m.AnotacaoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'conteudo-pasta',
    loadChildren: () => import('./conteudo-pasta/conteudo-pasta.module').then( m => m.ConteudoPastaPageModule)
  },
  {
    path: 'update-repositorio',
    loadChildren: () => import('./update-repositorio/update-repositorio.module').then( m => m.UpdateRepositorioPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'vis-anotacao',
    loadChildren: () => import('./vis-anotacao/vis-anotacao.module').then( m => m.VisAnotacaoPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'exportar',
    loadChildren: () => import('./exportar/exportar.module').then( m => m.ExportarPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
