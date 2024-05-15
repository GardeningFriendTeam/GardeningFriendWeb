import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejosComponent } from './consejos.component';

describe('ConsejosComponent', () => {
  let component: ConsejosComponent;
  let fixture: ComponentFixture<ConsejosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsejosComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConsejosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
