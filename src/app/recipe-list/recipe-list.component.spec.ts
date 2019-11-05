import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListComponent } from './recipe-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CuisineService } from '../cuisine.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { recipeListMock } from 'src/mock-data/recipe-list.mock';
import { recipeDetailsMock } from 'src/mock-data/recipe-details.mock';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  const CuisineServiceMock = {
    getRecipeList: () => {
      return of({
        results: [
          { awesomeDeveloper: 'Abhishek' }
        ]
      });
    },
    getRecipeDetails: (recipeId) => {
      return of({ awesomeDeveloper: 'Abhishek' });
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, FormsModule, OverlayModule, MatSnackBarModule, BrowserAnimationsModule],
      providers: [
        { provide: CuisineService, useValue: CuisineServiceMock }
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
    const getRecipeListSpy = spyOn(component, 'getRecipeList').and.callThrough();
    expect(getRecipeListSpy).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(component.searchForm.get('userInput')).toBeTruthy();
    expect(getRecipeListSpy).toHaveBeenCalledTimes(1);
  });

  it('getRecipeList function should set mock value if useMockData is set to true', () => {
    const getRecipeListSpy = spyOn(component.cuisineService, 'getRecipeList').and.callThrough();
    component.useMockData = true;
    component.getRecipeList();

    expect(getRecipeListSpy).not.toHaveBeenCalled();
    expect(component.recipeList).toBe(recipeListMock);
  });

  it('getRecipeList function should set value returned from API if useMockData is set to false', () => {
    const getRecipeListSpy = spyOn(component.cuisineService, 'getRecipeList').and.callThrough();
    component.useMockData = false;

    expect(getRecipeListSpy).not.toHaveBeenCalled();

    component.getRecipeList();

    expect(getRecipeListSpy).toHaveBeenCalledTimes(1);
    expect(component.recipeList).toEqual([
      { awesomeDeveloper: 'Abhishek' }
    ]);
  });

  it('getRecipeDetails function should set mock value if useMockData is set to true', () => {
    const getRecipeDetailsSpy = spyOn(component.cuisineService, 'getRecipeDetails').and.callThrough();
    component.useMockData = true;
    component.getRecipeDetails(592479);
    expect(getRecipeDetailsSpy).not.toHaveBeenCalled();
    expect(component.recipeDetails).toBe(recipeDetailsMock[0]);
  });

  it('getRecipeDetails function should set value returned from API if useMockData is set to false', () => {
    const getRecipeDetailsSpy = spyOn(component.cuisineService, 'getRecipeDetails').and.callThrough();
    component.useMockData = false;

    expect(getRecipeDetailsSpy).not.toHaveBeenCalled();

    component.getRecipeDetails(1);

    expect(getRecipeDetailsSpy).toHaveBeenCalledTimes(1);
    expect(component.recipeDetails).toEqual(
      { awesomeDeveloper: 'Abhishek' }
    );
  });

});
