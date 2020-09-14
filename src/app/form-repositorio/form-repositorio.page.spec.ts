import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormRepositorioPage } from './form-repositorio.page';

describe('FormRepositorioPage', () => {
  let component: FormRepositorioPage;
  let fixture: ComponentFixture<FormRepositorioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRepositorioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormRepositorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
