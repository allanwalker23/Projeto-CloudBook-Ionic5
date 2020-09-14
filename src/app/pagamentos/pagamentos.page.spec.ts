import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PagamentosPage } from './pagamentos.page';

describe('PagamentosPage', () => {
  let component: PagamentosPage;
  let fixture: ComponentFixture<PagamentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagamentosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PagamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
