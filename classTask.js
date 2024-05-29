import {lists} from './main.js';
import {addNewTaskToDom} from './main.js';
export class Task{
    inputValue;
    idOfcurrentElement;
    
    deleteButton;
    editButton;

    static idCount = 0;

    _handleChangedTask;
    _handleDeleteTask;
    _handleEditTask;

    constructor(inputValue){
        this.inputValue = inputValue;

        this.idOfcurrentElement = Task.idCount;
        Task.idCount += 1;

        this.deleteButton = document.createElement("button");
        this.deleteButton.textContent = "delete";
        this.editButton = document.createElement("button"); 
        this.editButton.textContent = "edit";

        this._handleChangedTask = this.#handleChangedTask.bind(this);
        this._handleDeleteTask  = this.#handleDeleteTask.bind(this); 
        this._handleEditTask = this.#handleEditTask.bind(this);

    }
    
    #handleChangedTask(){

        const inputElement = document.getElementById("input-text");
        const inputedText = inputElement.value.trim();
        const addTaskButton = document.getElementById('button-add-task');
        this.inputValue = inputedText;

        const el = document.getElementById(`divID-${this.idOfcurrentElement}`);
        if (el) {
            el.children[1].textContent = inputedText;
        }

        addTaskButton.removeEventListener("click", this._handleChangedTask); 

        addTaskButton.addEventListener("click", addNewTaskToDom);

        addTaskButton.style.background = "green";
        addTaskButton.value = "Add task";

        inputElement.value = "";
    }
    #handleDeleteTask(){
        document.getElementById(`divID-${this.idOfcurrentElement}`).remove();
        console.log("remove");
        const currentNameOfList = document.getElementById("place").textContent;
        const currentList = lists[currentNameOfList]
        console.log(currentList)

        //! delete item from array of Tasks 
        currentList.forEach((currentValue, index, array) => {
            if (currentValue.idOfcurrentElement === this.idOfcurrentElement) {
                array.splice(index, 1);
            }
        });
        console.log(currentList)        
    }
    #handleEditTask(){
        document.getElementById("input-text").value = this.inputValue;
        const addTaskButton = document.getElementById('button-add-task');   
        addTaskButton.removeEventListener("click", addNewTaskToDom);
        addTaskButton.style.background = "yellow";
        addTaskButton.value = "change";

        //! проверка на одинаковость ссылок
        const handler1 = this._handleChangedTask;
        const handler2 = this._handleChangedTask;
        console.log(handler1 === handler2); // true

        // !!УДАЛЕНИЕ ОБРАБОТЧИКА СОБЫТИЙ НА ВСЯКИЙ СЛУЧАЙ
        addTaskButton.removeEventListener("click", handler1); //!!
        addTaskButton.addEventListener("click", handler2); 
    }
    attachEventListeners(){
        this.deleteButton.addEventListener("click",  this._handleDeleteTask);
        this.editButton.addEventListener("click", this._handleEditTask);
    }
}
