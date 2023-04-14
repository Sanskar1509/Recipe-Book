
import { Subject } from "rxjs";
import { Ingrediant } from "../shared/ingrediants.model";

export class ShoppingListService {
    ingrediantsChanged =new Subject<Ingrediant[]>();
    startedEditing =new Subject<number>();
   private ingrediants: Ingrediant[] = [
        new Ingrediant('apples',5),
        new Ingrediant('Banana',10)
      ];

    getIngrediants(){
        return this.ingrediants.slice();
    }

    getIngrediant(index: number){
        return this.ingrediants[index];
    }

    addIngrediants(ingrediant:Ingrediant){
        this.ingrediants.push(ingrediant);
        this.ingrediantsChanged.next(this.ingrediants.slice())
    }

    AddIngrediants(ingrediants:Ingrediant[]){
        // for (let ingrediant of ingrediants){
        //     this.addIngrediants(ingrediant);
        // }
        this.ingrediants.push(...ingrediants);
        this.ingrediantsChanged.next(this.ingrediants.slice());
    }

    updateIngrediant(index: number , newingrediant: Ingrediant){
        this.ingrediants[index]=newingrediant;
        this.ingrediantsChanged.next(this.ingrediants.slice());
    }
    deletIngrediants(index: number){
        this.ingrediants.splice(index,1);
        this.ingrediantsChanged.next(this.ingrediants.slice());
    }
}