import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
//import { EventEmitter } from 'protractor';
import { TodoItemData } from '../dataTypes/TodoItemData';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() private data : TodoItemData;
  
  constructor(private todoService : TodoService) { }

  ngOnInit() {
  }


  get label() : string {
    return this.data.label;
  }

  get items() : TodoItemData {
    return this.data;
  }

  // Supprimer un élement de la liste d'éléments
  itemDelete(item:TodoItemData){
    this.todoService.removeItems(item);
  }

  // Changer l'état de isDone d'un item
  itemDone(item:TodoItemData, done:boolean){
    this.todoService.setItemsDone(done, item);
  }

  // Changer le label de l'item
  itemLabel(item:TodoItemData, label:string){
    this.todoService.setItemsLabel(label,item);
  }





  
  //private keepLastItemModified : TodoItemData;

  editMode(item : TodoItemData, bool:boolean){
    // Si on entre en mode édition : 
    if (bool == true){
      
      /*if (this.keepLastItemModified != undefined){
        this.keepLastItemModified.editing = false;
      }
      this.keepLastItemModified = item;
      */
      item.editing = true;
    }

    // Si on sort du mode édition : 
    else {
      item.editing = false;
      //this.keepLastItemModified = item;
    }
    
  }

}
