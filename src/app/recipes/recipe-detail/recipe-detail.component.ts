import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.services';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService,private route: ActivatedRoute,private router: Router) {

   }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params:Params)=>{
          this.id= +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      )
  }

  onAddToShoppingList(){
    this.recipeService.addIngrediantsToShoppingList(this.recipe.ingrediants);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
    // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
  }

  onDeletRecipe(){
    this.recipeService.deletRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
