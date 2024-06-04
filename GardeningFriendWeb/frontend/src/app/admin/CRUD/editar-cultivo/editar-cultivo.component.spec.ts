import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCultivoComponent } from './editar-cultivo.component';

describe('EditarCultivoComponent', () => {
  let component: EditarCultivoComponent;
  let fixture: ComponentFixture<EditarCultivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCultivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCultivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
