import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCategoriaCultivoComponent } from './editar-categoria-cultivo.component';

describe('EditarCategoriaCultivoComponent', () => {
  let component: EditarCategoriaCultivoComponent;
  let fixture: ComponentFixture<EditarCategoriaCultivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCategoriaCultivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCategoriaCultivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
