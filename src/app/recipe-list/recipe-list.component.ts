import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaMatcher } from '@angular/cdk/layout';


import { CuisineService } from '../cuisine.service';
import { recipeDetailsMock } from 'src/mock-data/recipe-details.mock';
import { recipeListMock } from 'src/mock-data/recipe-list.mock';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  error: string;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  mobileQuery: MediaQueryList;
  originalRecipeList: Array<any>;
  recipeDetails = {};
  recipeList: Array<any>;
  searchActive = false;
  searchForm: FormGroup;
  searchResult = '';
  useMockData = true;
  private _mobileQueryListener: () => void;


  constructor(
    public cuisineService: CuisineService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      userInput: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]]
    });
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.getRecipeList();
  }

  get userInput(): AbstractControl {
    return this.searchForm.get('userInput');
  }

  getRecipeList(): void {
    this.recipeDetails = {};
    if (this.useMockData) {
      this.originalRecipeList = recipeListMock;
      this.recipeList = recipeListMock;
    } else {
      this.cuisineService.getRecipeList()
        .subscribe(
          data => {
            this.originalRecipeList = data.results || [];
            this.recipeList = data.results || [];
            const baseUri = data.baseUri;
            if (this.recipeList.length) {
              this.recipeList.map(recipe => {
                recipe.imageUrls[0] = `${baseUri}${recipe.imageUrls[0]}`;
                return recipe;
              });
            }
          },
          error => {
            this.error = error;
            console.log(`An error occurred: ${error}`);
          }
        );
    }
    this._snackBar.open(`You are now using ${this.useMockData ? 'mock' : 'real time'} data`, '', {
      duration: 4000
    });
  }

  getRecipeDetails(recipeId: number): void {
    if (this.useMockData) {
      this.recipeDetails = recipeDetailsMock.find(recipe => recipe.id === recipeId);
    } else {
      this.cuisineService.getRecipeDetails(recipeId).subscribe(
        recipe => {
          this.recipeDetails = recipe;
        },
        error => {
          this.error = error;
          console.log(`An error occurred: ${error}`);
        });
    }
  }

  getErrorMessage(): string {
    return this.userInput.hasError('required') ? 'Please provide an input' :
      this.userInput.hasError('pattern') ? 'Please enter a valid search query (only alphabets)' :
        '';
  }

  onFormSubmit(): void {
    this.searchActive = true;
    const userInput: string = this.userInput.value && this.userInput.value.toLowerCase();
    this.recipeList = this.originalRecipeList.filter(recipe => {
      return recipe.title && recipe.title.toLowerCase().includes(userInput);
    });
    if (this.recipeList.length) {
      this.searchResult = `Search results for "${userInput}":`;
    } else {
      this.searchResult = 'Sorry we could not find a match. Please try with a different keyword.';
    }
  }

  clearSearch(): void {
    this.searchActive = false;
    this.userInput.setValue('');
    this.recipeList = this.originalRecipeList;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
