import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuisineService {

  apiKey = '173c897d29ce4935b11807a5d170fbc3';

  constructor(private httpClient: HttpClient) { }

  getRecipeList(): Observable<any> {
    console.log("making API call");
    const getCuisineListUrl = `https://api.spoonacular.com/recipes/search?cuisine=MiddleEastern&number=50&instructionsRequired=true&apiKey=${this.apiKey}`;
    return this.httpClient.get(getCuisineListUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getRecipeDetails(recipeId: number): Observable<any> {
    console.log("making API call");
    const getRecipeDetailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${this.apiKey}`;
    return this.httpClient.get(getRecipeDetailsUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // todo: usee this
  getSimilarRecipeList(recipeId: number): Observable<any> {
    console.log("making API call");
    const getRecipeDetailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/similar?apiKey=${this.apiKey}`;
    return this.httpClient.get(getRecipeDetailsUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
