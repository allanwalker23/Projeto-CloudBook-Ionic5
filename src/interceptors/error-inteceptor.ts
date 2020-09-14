
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { StorageService } from 'src/services/storage.service';
import { AlertController } from '@ionic/angular';
import { FieldMessage } from 'src/app/models/dto/fieldmessage';
 
 
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
 
    constructor(public storage: StorageService, public alertController: AlertController){ }
 
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req)
                .pipe(
                    catchError(error => {
                       if( !error.status ){
                            error = JSON.parse(error);
                        }
                        switch(error.status){
                            case 401:
                                this.handle401();
                                break;
                            case 403: this.handle403();
                            break;

                        
                        }
 
                        return throwError(error);
                    })) as any;
    }
 
 
async handle403(){
        this.storage.setLocalUser(null);
        const alert = await this.alertController.create({
            header: 'Falha na obtenção de dados',
            message: 'Você foi deslogado',
            buttons: ['OK']
          });
      
          await alert.present();
    }
async handle401(){
    const alert = await this.alertController.create({
        header: 'Falha na autenticação',
        message: 'Email ou senha incorretos',
        buttons: ['OK']
      });
  
      await alert.present();

}




}

 
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};