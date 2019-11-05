import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnChanges {

  @Input() recipeDetails: any = {};
  ingredientList: Array<any>;
  noRecipeSelected = true;
  showAnimation = false;
  publicationDate: Date;
  instructionList: Array<any>;

  ngOnChanges() {
    this.showAnimation = false;
    setTimeout(() => {
      this.showAnimation = true;
    }, 10);
    this.noRecipeSelected = Object.keys(this.recipeDetails).length === 0;
    if (!this.noRecipeSelected) {
      this.ingredientList = this.recipeDetails.extendedIngredients &&
        this.recipeDetails.extendedIngredients.map(ingredient => ingredient.originalString) || [];
      const steps: Array<any> = this.recipeDetails.analyzedInstructions &&
        this.recipeDetails.analyzedInstructions.length && this.recipeDetails.analyzedInstructions[0].steps || [];
      this.instructionList = steps.map(step => step.step);
    }
    this.publicationDate = this.randomDate(new Date(2015, 0, 1), new Date());
  }

  // use random date for 'Publication Date' since API doesn't provide one
  randomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}
