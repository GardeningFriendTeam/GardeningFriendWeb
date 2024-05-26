import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCategoriaCultivoComponent } from './agregar-categoria-cultivo.component';

describe('AgregarCategoriaCultivoComponent', () => {
  let component: AgregarCategoriaCultivoComponent;
  let fixture: ComponentFixture<AgregarCategoriaCultivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCategoriaCultivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCategoriaCultivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
