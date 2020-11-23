import {Component, OnInit} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

    private todoList: TodoListData; 
    filter:string; // Filtre permettant de modifier l'affichage de la todolist
    
    // Constructeur :
    constructor(private todoService: TodoService) {
        todoService.getTodoListDataObservable().subscribe( tdl => this.todoList = tdl );
        this.filter = "filterAll";
    }

    ngOnInit() {
    }
    
    // getteurs :
    get label(): string {
        return this.todoList.label;
    }
    
    get items(): TodoItemData[] {
        return this.todoList.items;
    }
    

    // Ajouter un item dans la todolist
    appendItem(label:string){
        if (label =='') return;
        this.todoService.appendItems({
            label,
            isDone:false,
            editing:false
        });
    }

    // Définir qu'un item est terminé :
    itemDone(item:TodoItemData, done:boolean){
        this.todoService.setItemsDone(done, item);
    }

    // Changer le nom de l'item
    itemLabel(item:TodoItemData, label:string){
        this.todoService.setItemsLabel(label,item);
    }

    // Supprimer un item de la todolist
    itemDelete(item:TodoItemData){
        this.todoService.removeItems(item);
    }

    // Supprimer cochées
    deleteItemsDone(){
        // Parcourir la liste d'items :
        this.todoList.items.forEach(element => {
            if (element.isDone == true) { // Si l'attribut isDone de l'item a pour valeur false (donc que l'item est terminé)
                this.itemDelete(element); // Supprimer l'élément de la todolist
            }
        });
    }

    // Compter le nombre d'items non terminés restants
    countLeft(){
        let count:number = 0;
        // Parcourir la todolist :
        this.todoList.items.forEach(element => {
            if (element.isDone == false){
                count++;
            }
        });
        return count;
    }

    // Changer le filtre :
    changeFilter(filter:string){
        this.filter = filter;
    }

}
