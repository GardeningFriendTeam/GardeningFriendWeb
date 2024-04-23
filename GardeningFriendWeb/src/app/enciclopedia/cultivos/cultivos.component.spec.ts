import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivosComponent } from './cultivos.component';

describe('CultivosComponent', () => {
  let component: CultivosComponent;
  let fixture: ComponentFixture<CultivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CultivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CultivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
