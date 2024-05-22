class Task{
    inputValue;
    idOfcurrentElement;
    
    deleteButton;
    editButton;

    static idCount = 0;

    _handleChangedTask;

    constructor(inputValue){
        this.inputValue = inputValue;

        this.idOfcurrentElement = Task.idCount;
        Task.idCount += 1;

        this.deleteButton = document.createElement("button");
        this.deleteButton.textContent = "delete";
        this.editButton = document.createElement("button"); 
        this.editButton.textContent = "edit";

        this._handleChangedTask = this.#handleChangedTask.bind(this);

    }
    
    #handleChangedTask(){
        const inputElement = document.getElementById("input-text");
        const inputedText = inputElement.value.trim();
        this.inputValue = inputedText;

        const el = document.getElementById(`divID-${this.idOfcurrentElement}`);
        el.firstElementChild.textContent = inputedText;

        addTaskButton.removeEventListener("click", this._handleChangedTask); //!

        // addTaskButton.addEventListener("click", () => addNewTask);
        addTaskButton.addEventListener("click", addNewTask);

        addTaskButton.style.background = "green";
        addTaskButton.value = "Add task";

        inputElement.value = "";
    }
    #handleDeleteTask(){
        document.getElementById(`divID-${this.idOfcurrentElement}`).remove();
    }
    #handleEditTask(){
        document.getElementById("input-text").value = this.inputValue;
            
        addTaskButton.removeEventListener("click", addNewTask);
        addTaskButton.style.background = "yellow";
        addTaskButton.value = "change";

        addTaskButton.addEventListener("click", this._handleChangedTask); //!
    }
    attachEventListeners(){
        this.deleteButton.addEventListener("click", () => this.#handleDeleteTask());

        this.editButton.addEventListener("click", () => this.#handleEditTask());
    }
}


// ! ******************************************** ! //
function addNewTask() {
    const inputElement = document.getElementById("input-text");
    const inputValue = inputElement.value.trim();
    const list = document.getElementById("list-of-tasks");

    if (inputValue) {
        const newTaskItem = new Task(inputValue); 
        const divEl = document.createElement("div");
        divEl.setAttribute("id", `divID-${newTaskItem.idOfcurrentElement}`);

        list.append(divEl);
        const spanText = document.createElement("span");
        divEl.append(spanText);
        spanText.append(newTaskItem.inputValue);
        
        divEl.append(newTaskItem.idOfcurrentElement);
        divEl.append(newTaskItem.deleteButton); 
        divEl.append(newTaskItem.editButton); 
        newTaskItem.attachEventListeners();
        inputElement.value = "";

console.log(newTaskItem);
    }else{
        alert("Input is empty. Please enter a task.");
    }
}
function addNewTodoListHandler(){
    const listName = document.getElementById("name-of-new-todo-list").value.trim();

    if (!listName) {
        alert("Name of ToDo list empty. Enter name!");
    } else if (listName in lists){
        alert("This name exists. Enter another one!");        
    } else {
        lists[listName] = [];
        document.getElementById("place").textContent = listName;

        const dropdown = document.getElementById("listSelect");
        const option = document.createElement("option");
        option.text = listName; 
        dropdown.append(option);
        option.setAttribute("selected", "")

        document.getElementById("name-of-new-todo-list").value = "";
    }

    // if (listName && !(listName in lists)) {
    //     lists[listName] = [];
    //     document.getElementById("place").textContent = listName;
    // }else if(!listName){
    //     alert("Name of ToDo list empty. Enter name!");
    // }else if(listName in lists){
    //     alert("This name exists. Enter another one!");
    // }

    
    
console.log(lists);
    //!        ADD OPTION    //
    

    

}
// ! *********************************************!//
const lists = {};
const addNewTodoListButton = document.getElementById("add-new-todo-list");
addNewTodoListButton.addEventListener("click", addNewTodoListHandler); 

const addTaskButton = document.getElementById('button-add-task');
addTaskButton.addEventListener("click", addNewTask);