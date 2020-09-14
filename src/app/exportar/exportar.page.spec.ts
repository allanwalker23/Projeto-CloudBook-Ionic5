import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExportarPage } from './exportar.page';

describe('ExportarPage', () => {
  let component: ExportarPage;
  let fixture: ComponentFixture<ExportarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExportarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
