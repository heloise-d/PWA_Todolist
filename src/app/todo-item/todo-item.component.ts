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

  // Changer l'état de isDone des items
  itemDone(item:TodoItemData, done:boolean){
    this.todoService.setItemsDone(done, item);
  }

  // Changer le label de l'item
  itemLabel(item:TodoItemData, label:string){
    this.todoService.setItemsLabel(label,item);
  }





  
  private keepLastItemModified : TodoItemData;

  editMode(item : TodoItemData, bool:boolean){
    // Si on entre en mode édition : (donc bool = true)
    if (bool == true){
      
      if (this.keepLastItemModified != null){
        this.keepLastItemModified.editing = false;
      }
      item.editing = true;
      this.keepLastItemModified = item;
    }

    // Si on sort du mode édition : (donc bool = false)
    else {
      item.editing = false;
    }
    
  }

}
