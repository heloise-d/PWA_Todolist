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

    // Définit l'ensemble des items comme étant terminés / non terminés selon le cas
    togleAll(){
        let isDoneItem:boolean = true; // Par défaut, tous les attributs isDone des items de la liste seront mis à true
        if (this.countLeft() == 0) isDoneItem = false; // Si tous les items sont déjà terminés, il faudra que tous les attributs isDone des items de la liste soient mis à false

        // Parcours de la todolist et modification de isDone de chaque item
        this.todoList.items.forEach(element => {
            element.isDone = isDoneItem;
        });
    }

    // Supprimer tous les items de la todolist
    deleteAll(){
        // Parcourir la todolist
        this.todoList.items.forEach(element => {
            this.itemDelete(element); // Supprimer l'element
        });
    }

}
