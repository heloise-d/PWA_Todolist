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

    public qrdata: string = null;

    private todoList: TodoListData; 
    filter:string; // Filtre permettant de modifier l'affichage de la todolist
    
    // Constructeur :
    constructor(private todoService: TodoService) {
        todoService.getTodoListDataObservable().subscribe( tdl => this.todoList = tdl );
        this.filter = "filterAll";

    }

    ngOnInit() {
       
        // Si le nombre d'items présents dans la Todolist n'est pas égal au nombre d'items dans le localstorage, il faut réimporter tous les items du localStorage 
        if (this.countTotal() != localStorage.length ){
            this.deleteAllLL(); // Supprimer au préalable tous les items de la Todolist

            // Parcours le localStorage et extrait les items qui y sont stockés
            for (let i = 0; i < localStorage.length; i++){
                let clef = localStorage.key(i);
                let item = JSON.parse(localStorage.getItem(clef));
                this.appendItem2(item);
            }  
        }
        
        // Pré-initialiser le QRCode :
        this.listQRcode();
    }
    
    // getteurs :
    get label(): string {
        return this.todoList.label;
    }
    
    get items(): TodoItemData[] {
        return this.todoList.items;
    }
    

    // Crée un nouvel item et l'ajoute dans la todolist
    appendItem(label:string){
        if (label =='') return;
        let item = {
            label:label,
            isDone:false,
            editing:false
        }
        this.todoService.appendItems(item);

        // Ajouter l'item dans le localStorage :
        localStorage.setItem(label, JSON.stringify(item));
    }

    // Ajoute un item déjà créé dans la todolist
    appendItem2(item:TodoItemData){
        if (item.label == '') return;
        this.todoService.appendItems(item); // Ajoute l'item dans la liste
        localStorage.setItem(item.label, JSON.stringify(item)); // Ajoute l'item dans le local storage
    }


    // Supprimer un item de la todolist
    itemDelete(item:TodoItemData){
        this.todoService.removeItems(item);

        // Supprimer l'item du localStorage :
        localStorage.removeItem(item.label);
    }

    // Supprimer cochées
    deleteItemsDone(){
        // Parcourir la liste d'items :
        this.todoList.items.forEach(element => {
            if (element.isDone == true) { // Si l'attribut isDone de l'item a pour valeur false (donc que l'item est terminé)
                this.itemDelete(element); // Supprimer l'élément de la todolist
                localStorage.removeItem(element.label); // Supprimer l'item du localStorage
            }
        });
    }

    // Compter le nombre total d'items :
    countTotal(){
        let count:number = 0;
        // Parcourir la todolist :
        this.todoList.items.forEach(element => {
            count++;
        });
        return count;
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
            localStorage.setItem(element.label, JSON.stringify(element)); // Mettre à jour l'objet dans le localStorage
        });
    }

    // Supprimer tous les items de la todolist et du localStorage
    deleteAll(){
        // Parcourir la todolist
        this.todoList.items.forEach(element => {
            this.itemDelete(element); // Supprimer l'element
            localStorage.removeItem(element.label); // Supprimer l'item du localStorage
        });
    }

    // Supprimer tous les items de la todolist seulement
    deleteAllLL(){
        // Parcourir la todolist
        this.todoList.items.forEach(element => {
            this.itemDelete(element); // Supprimer l'element
        });
    }

    // Générer QR Code :
    listQRcode(){
        this.qrdata="Taches : ";
        this.todoList.items.forEach(element => {

            if (element.isDone == false) this.qrdata += " A faire : "
            else { this.qrdata += "Deja fait : "}
            this.qrdata += element.label+"\n";
        });
    }

}
