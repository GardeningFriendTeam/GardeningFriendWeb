import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenteIAComponent } from './asistente-ia.component';

describe('AsistenteIAComponent', () => {
  let component: AsistenteIAComponent;
  let fixture: ComponentFixture<AsistenteIAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenteIAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenteIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
