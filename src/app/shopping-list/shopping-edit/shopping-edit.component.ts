import { Component,  OnDestroy,  OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingrediant } from 'src/app/shared/ingrediants.model';
import { ShoppingListService } from '../shopping-list.services';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{
 @ViewChild('f') slForm: NgForm;
 subscription: Subscription;
 editMode= false;
 editteditemIndex: number;
 editedItem :Ingrediant;
  
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
   this.subscription= this.slService.startedEditing.
    subscribe(
      (index: number)=>{
        this.editteditemIndex= index;
        this.editMode=true;
        this.editedItem = this.slService.getIngrediant(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }
  onSubmit(form: NgForm){
    const value = form.value
    const newingrediant = new Ingrediant(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngrediant(this.editteditemIndex,newingrediant)
    }else{
      this.slService.addIngrediants(newingrediant);
    }
    this.editMode= false;
 }
 ngOnDestroy(): void {
   this.subscription.unsubscribe();
 }

 onDeletItems(){
  this.slService.deletIngrediants(this.editteditemIndex);
  this.onClear();
 }

 onClear(){
  this.slForm.reset();
  this.editMode=false;
 }

}
