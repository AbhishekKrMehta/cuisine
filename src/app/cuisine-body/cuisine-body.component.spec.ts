import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListComponent } from './cuisine-body.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CuisineService } from '../cuisine.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, FormsModule, OverlayModule, MatSnackBarModule, BrowserAnimationsModule],
      providers: [
        { provide: CuisineService, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the right values when ngOnInit() is called', () => {
    // todo onToggle should be getRecipeList
    const getRecipeListSpy = spyOn(component, 'onToggle').and.callThrough();
    component.ngOnInit();
    expect(component.searchForm.get('userInput')).toBeTruthy();
    expect(getRecipeListSpy).toHaveBeenCalledTimes(1);
  });
});
