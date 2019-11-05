import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailsComponent } from './recipe-details.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RecipeDetailsComponent', () => {
  let component: RecipeDetailsComponent;
  let fixture: ComponentFixture<RecipeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeDetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should set the right values and call the right functions', () => {
    const randomDateSpy = spyOn(component, 'randomDate').and.callThrough();

    component.recipeDetails = { awesomeDeveloper: 'Abhishek' };
    component.ngOnChanges();

    expect(component.showAnimation).toBe(false);
    expect(component.noRecipeSelected).toBe(false);
    expect(component.ingredientList).toEqual([]);
    expect(component.instructionList).toEqual([]);
    expect(randomDateSpy).toHaveBeenCalledTimes(1);
  });

});
