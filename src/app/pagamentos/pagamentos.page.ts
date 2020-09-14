import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.page.html',
  styleUrls: ['./pagamentos.page.scss'],
})
export class PagamentosPage implements OnInit {
  loaded: boolean = false;
  step: number = -1;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.loaded = true;
    }, 1500);
  }

}
