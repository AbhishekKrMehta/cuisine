import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisineBodyComponent } from './cuisine-body.component';

describe('CuisineBodyComponent', () => {
  let component: CuisineBodyComponent;
  let fixture: ComponentFixture<CuisineBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuisineBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuisineBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
