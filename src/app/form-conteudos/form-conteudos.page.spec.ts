import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormConteudosPage } from './form-conteudos.page';

describe('FormConteudosPage', () => {
  let component: FormConteudosPage;
  let fixture: ComponentFixture<FormConteudosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormConteudosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormConteudosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
