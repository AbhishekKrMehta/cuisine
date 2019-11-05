import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CuisineService } from './cuisine.service';

describe('CuisineService', () => {
    let service: CuisineService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CuisineService]
        });
        service = TestBed.get(CuisineService);
        httpMock = TestBed.get(HttpTestingController);
    });
    afterEach(() => {
        httpMock.verify();
    });

    // todo: learn more about HTTP mocking
    describe('#getRecipeList', () => {
        it('should return an Observable<Recipe[]>', () => {
            const dummyRecipeList = [
                { recipe1: 'vanillaCake' },
                { recipe2: 'chocolateCake' }
            ];

            service.getRecipeList().subscribe(recipe => {
                expect(recipe.length).toBe(2);
                expect(recipe).toEqual(dummyRecipeList);
            });

            const req = httpMock.expectOne(`https://api.spoonacular.com/recipes/search?cuisine=MiddleEastern&number=50&instructionsRequired=true&apiKey=${service.apiKey}`);
            expect(req.request.method).toBe('GET');
            req.flush(dummyRecipeList);
        });
    });
});
