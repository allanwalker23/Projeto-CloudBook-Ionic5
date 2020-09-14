import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RepositoriosPage } from './repositorios.page';

describe('RepositoriosPage', () => {
  let component: RepositoriosPage;
  let fixture: ComponentFixture<RepositoriosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoriosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoriosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
