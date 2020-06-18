import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljiOStavciComponent } from './detalji-ostavci.component';

describe('DetaljiOStavciComponent', () => {
  let component: DetaljiOStavciComponent;
  let fixture: ComponentFixture<DetaljiOStavciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaljiOStavciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaljiOStavciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
