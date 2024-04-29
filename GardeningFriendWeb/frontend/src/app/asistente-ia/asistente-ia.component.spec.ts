import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenteIaComponent } from './asistente-ia.component';

describe('AsistenteIaComponent', () => {
  let component: AsistenteIaComponent;
  let fixture: ComponentFixture<AsistenteIaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenteIaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsistenteIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
