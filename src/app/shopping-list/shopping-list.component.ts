import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingrediant } from '../shared/ingrediants.model';
import { ShoppingListService } from './shopping-list.services';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit ,OnDestroy{
  ingrediants: Ingrediant[] = [];
  private subscription:Subscription;
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingrediants = this.slService.getIngrediants();
    this.subscription= this.slService.ingrediantsChanged
      .subscribe(
        (ingrediants:Ingrediant[]) => {
            this.ingrediants=ingrediants;
        }
      )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }
  
}
