import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from '../recipe.services';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
 

  constructor(private route: ActivatedRoute ,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params:Params)=>{
          this.id= +params['id'];
          this.editMode=params['id'] != null;
          this.initForm();
        }
      )
  }

  onSubmit(){
    if(this.editMode){
        this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }else{
        this.recipeService.addRecipe(this.recipeForm.value)
    }
        this.onCancel(); 
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  onAddIngrediant(){
   (<FormArray>this.recipeForm.get('ingrediants')).push(
    new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
    })
   )
  }

  onDeletIngrediant(index: number){
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(index);
  }

  private initForm(){
    let recipeName = '';
    let recipeiImagePath = '';
    let recipeDescription = '';
    let recipeIngrediants= new FormArray<FormGroup>([]);

    if (this.editMode) {
        const recipe = this.recipeService.getRecipe(this.id);
        recipeName = recipe.name;
        recipeiImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe['ingrediants']) {
          for (let ingrediant of recipe.ingrediants) {
            recipeIngrediants.push(
              new FormGroup({
                'name': new FormControl(ingrediant.name,Validators.required),
                'amount': new FormControl(ingrediant.amount,[
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            )
          }
        }
      }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeiImagePath,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'ingrediants': recipeIngrediants
    })
  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingrediants')).controls;
  }

}
