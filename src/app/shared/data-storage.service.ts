import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { RecipeService } from "../recipes/recipe.services";
import { Recipe } from "../recipes/recipes.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient ,private recipeService: RecipeService,private authService: AuthService){
       
    }
    storeRecipes(){
            const recipes = this.recipeService.getRecipes();
             this.http.put('https://ng-course-recipe-book-8d6ca-default-rtdb.firebaseio.com/recipes.json',
             recipes)
             .subscribe(response =>{
                console.log(response);
                
             });
    }

    fetchRecipes() {
        return this.http
          .get<Recipe[]>(
            'https://ng-course-recipe-book-8d6ca-default-rtdb.firebaseio.com/recipes.json'
          )
          .pipe(
            map(recipes => {
              return recipes.map(recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingrediants ? recipe.ingrediants : []
                };
              });
            }),
            tap(recipes => {
              this.recipeService.setRecipes(recipes);
            })
          );
      } 
}