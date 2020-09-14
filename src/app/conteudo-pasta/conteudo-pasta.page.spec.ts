import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConteudoPastaPage } from './conteudo-pasta.page';

describe('ConteudoPastaPage', () => {
  let component: ConteudoPastaPage;
  let fixture: ComponentFixture<ConteudoPastaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConteudoPastaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConteudoPastaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
