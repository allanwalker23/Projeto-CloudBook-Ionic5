import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public foto_default = "assets/perfil.png"
  public logo:string="assets/imgs/icone_imagem_azul.png";
  public logo_quadro:string="assets/adc-quadro2.png";
  public checado:string="";
  public idRepositorio:string;
  public nomeRepositorio:string;
  public nomeDisciplina:string;
  public idDisciplina:string;
  public foto_perfil:any;
  public id_repositorio_update:string;
  public nome_anotacao:string;
  public texto_anotacao:string;
  public logo_dark:string="assets/imgs/light.png";
  public logo_favicon ="assets/icon/favicon2.png";

  constructor() { }
}
