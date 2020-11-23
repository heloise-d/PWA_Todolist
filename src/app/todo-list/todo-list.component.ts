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
    
    constructor(private todoService: TodoService) {
        todoService.getTodoListDataObservable().subscribe( tdl => this.todoList = tdl );
    }

    ngOnInit() {
    }
    
    get label(): string {
        return this.todoList.label;
    }
    
    get items(): TodoItemData[] {
        return this.todoList.items;
    }
    


    appendItem(label:string){
        if (label =='') return;
        this.todoService.appendItems({
            label,
            isDone:false,
            editing:false
        });
    }

    itemDone(item:TodoItemData, done:boolean){
        this.todoService.setItemsDone(done, item);
    }

    itemLabel(item:TodoItemData, label:string){
        this.todoService.setItemsLabel(label,item);
    }


    itemDelete(item:TodoItemData){
        this.todoService.removeItems(item);
    }

    // Supprimer cochées
    deleteItemsDone(){
        this.todoList.items.forEach(element => {
            if (element.isDone == true) {
                this.itemDelete(element);
            }
        });
    }

    // Compter le nombre d'items (qui ne sont pas encore faits) restants
    countLeft(){
        let count:number = 0;
        this.todoList.items.forEach(element => {
            if (element.isDone == false){
                count++;
            }
        });
        return count;
    }

}
