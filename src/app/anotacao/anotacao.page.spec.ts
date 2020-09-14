import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnotacaoPage } from './anotacao.page';

describe('AnotacaoPage', () => {
  let component: AnotacaoPage;
  let fixture: ComponentFixture<AnotacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnotacaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnotacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
