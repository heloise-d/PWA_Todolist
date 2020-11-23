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


  // getteurs :
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

  // Définir qu'un item est terminé :
  itemDone(item:TodoItemData, done:boolean){
    this.todoService.setItemsDone(done, item);
  }

  // Changer le nom de l'item
  itemLabel(item:TodoItemData, label:string){
    this.todoService.setItemsLabel(label,item);
  }


  editMode(item : TodoItemData, bool:boolean){
    // Si on entre en mode édition : 
    if (bool == true){
      item.editing = true; // Changer l'attribut editing de l'item en true
    }

    // Si on sort du mode édition : 
    else {
      item.editing = false; // Changer l'attribut editing de l'item en false
    }
    
  }

}
