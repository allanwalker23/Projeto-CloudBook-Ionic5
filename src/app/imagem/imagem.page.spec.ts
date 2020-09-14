import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImagemPage } from './imagem.page';

describe('ImagemPage', () => {
  let component: ImagemPage;
  let fixture: ComponentFixture<ImagemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
