import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCategoriaCultivoComponent } from './ver-categoria-cultivo.component';

describe('VerCategoriaCultivoComponent', () => {
  let component: VerCategoriaCultivoComponent;
  let fixture: ComponentFixture<VerCategoriaCultivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerCategoriaCultivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCategoriaCultivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
