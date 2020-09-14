import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConteudosPage } from './conteudos.page';

describe('ConteudosPage', () => {
  let component: ConteudosPage;
  let fixture: ComponentFixture<ConteudosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConteudosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConteudosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
