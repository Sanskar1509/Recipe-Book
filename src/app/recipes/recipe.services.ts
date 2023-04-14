import {  Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingrediant } from "../shared/ingrediants.model";
import { ShoppingListService } from "../shopping-list/shopping-list.services";
import { Recipe } from "./recipes.model";

@Injectable()
export class RecipeService{

    recipeschanged=new Subject<Recipe[]>();

  //  private recipes: Recipe[] = [
  //       new Recipe('Tasty Pizza' ,
  //       'Awesome',
  //       'https://img.freepik.com/free-vector/colorful-round-tasty-pizza_1284-10219.jpg?size=338&ext=jpg',
  //       [
  //           new Ingrediant('PizzaBread',2),
  //           new Ingrediant('Cheese',5)
  //       ]),
  //       new Recipe('Cheese Maggie' ,
  //       'Loved It',
  //       'https://5.imimg.com/data5/XG/IR/GLADMIN-60795231/maggie-500x500.png',
  //       [
  //           new Ingrediant('Maggie',2),
  //           new Ingrediant('CheeseSlice',4)
  //       ])
  //     ];
  private recipes: Recipe[]= [];

      constructor(private slServices:ShoppingListService){

      }

      setRecipes(recipes: Recipe[]){
        this.recipes=recipes;
        this.recipeschanged.next(this.recipes.slice());
      }
      getRecipes(){
        return this.recipes.slice();
      }
      getRecipe(index: number){
        return this.recipes[index];
        
      }

      addIngrediantsToShoppingList(ingrediants:Ingrediant[]){
        this.slServices.AddIngrediants(ingrediants);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeschanged.next(this.recipes.slice());
      }

      updateRecipe(index:number,newRecipe: Recipe){
        this.recipes[index]=newRecipe;
        this.recipeschanged.next(this.recipes.slice());
      }

      deletRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipeschanged.next(this.recipes.slice());
      }
}