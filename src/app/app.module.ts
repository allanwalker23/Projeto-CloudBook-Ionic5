import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalService } from './global.service';
import { HttpClientModule } from  '@angular/common/http';
import { AuthModule } from  './auth/auth.module';
import { StorageService } from 'src/services/storage.service';
import { AlunoService } from 'src/services/aluno.service';
import { AuthInterceptorProvider } from 'src/interceptors/auth-interceptor';
import { ErrorInterceptorProvider } from 'src/interceptors/error-inteceptor';
import { RepositorioService } from 'src/services/repositorio.service';
import { DisciplinaService } from 'src/services/disciplina.service';
import { ConteudoService } from 'src/services/conteudo.service';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DirInterceptor } from 'src/interceptors/dir-interceptor';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { ImagemPage } from './imagem/imagem.page';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule,AuthModule,IonicStorageModule.forRoot()],
  providers: [
    Camera,
    StatusBar,
    ScreenOrientation,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }
    ,GlobalService,
    StorageService,
    FileOpener,
    AndroidFullScreen,
    ConteudoService,
    DisciplinaService,
    WebView,
    AlunoService,
    ImagemPage,
    RepositorioService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    DirInterceptor,
    File,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
