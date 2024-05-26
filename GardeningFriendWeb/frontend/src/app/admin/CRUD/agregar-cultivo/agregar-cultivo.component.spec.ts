import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCultivoComponent } from './agregar-cultivo.component';

describe('AgregarCultivoComponent', () => {
  let component: AgregarCultivoComponent;
  let fixture: ComponentFixture<AgregarCultivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCultivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCultivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
