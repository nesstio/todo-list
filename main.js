class Task{
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
        // addTaskButton.removeEventListener("click", this._handleChangedTask); //!
        this.inputValue = inputedText;

        const el = document.getElementById(`divID-${this.idOfcurrentElement}`);
        if (el) {
            el.firstElementChild.textContent = inputedText;
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


// ! ******************************************** ! //
function addNewTaskToDom() {
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

        addNewTaskToCertainList(newTaskItem); 

console.log(newTaskItem);
    }else{
        alert("Input is empty. Please enter a task.");
    }
}
function addNewTaskToCertainList(newTaskItem) {
    const dropdown = document.getElementById("listSelect");
    const selectedListOption = dropdown.querySelector('option:checked');
    const listName = selectedListOption.text;
    lists[listName].push(newTaskItem);
console.log(lists);

}
function addNewTodoListHandler(){
    
    const listName = document.getElementById("name-of-new-todo-list").value.trim();

    if (!listName) {
        alert("Name of ToDo list empty. Enter name!");
    } else if (listName in lists){
        alert("This name exists. Enter another one!");        
    } else {
        document.getElementById("task-part").innerHTML = "";
        lists[listName] = [];
        //! нарисовать поле для ввода задачи с кнопкой "add task"
        //! и вывести все элементы все задачи
        createTaskInputAndRenderListToDom(listName);

        document.getElementById("place").textContent = listName;

        const dropdown = document.getElementById("listSelect");
        const option = document.createElement("option");
        option.text = listName; 
        dropdown.append(option);

        //!  ADD NEW TODO LIST NAME AS SELECTED OPTION //
        option.selected = true;
        document.getElementById("name-of-new-todo-list").value = "";
        
        dropdown.addEventListener("change", () => {
            const currentNameOfList = document.querySelector('option:checked').text;
            const h2 = document.getElementById("place");
            const list = document.getElementById("list-of-tasks");

            h2.textContent = currentNameOfList;
console.log(currentNameOfList);
            list.innerHTML = "";

            //! вывод всех задач из текущего списка задач
            renderTaskList(currentNameOfList, list);
            
        }); 
        
        const addTaskButton = document.getElementById('button-add-task');
        addTaskButton.addEventListener("click", addNewTaskToDom);        
    }
console.log(lists);
}
function renderTaskList(currentNameOfList, list) {
    const currentListOfTasks = lists[currentNameOfList];
        for (let i = 0; i < currentListOfTasks.length; i++) {
            const inputValue = currentListOfTasks[i].inputValue;
            const newTaskItem = currentListOfTasks[i];
            if (inputValue) {
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
            }
        }
}
function createTaskInputAndRenderListToDom(listName) {
    const headerOfCertainList = document.createElement("h2");
    headerOfCertainList.id = "place";
    headerOfCertainList.textContent = `${listName}`; 

    const divInputBlock = document.createElement("div");
    divInputBlock.id = "input-block";
    divInputBlock.classList.add("input-block");

    const inputText = document.createElement("input");
    inputText.classList.add("field__add-task");
    inputText.type = "text";
    inputText.placeholder = "Enter a task...";
    inputText.id = "input-text";

    const addTaskButton = document.createElement("input");
    addTaskButton.classList.add("button__add-task");
    addTaskButton.type = "button";
    addTaskButton.value = "Add task";
    addTaskButton.id = "button-add-task";

    const listOfTasks = document.createElement("div");
    listOfTasks.classList.add("list-of-tasks");
    listOfTasks.id = "list-of-tasks";
    
    const taskPart = document.getElementById("task-part");
    taskPart.appendChild(headerOfCertainList);
    headerOfCertainList.after(divInputBlock);
    divInputBlock.appendChild(inputText);
    divInputBlock.appendChild(addTaskButton);
    divInputBlock.after(listOfTasks);

}
// ! *********************************************!//
const lists = {};
const addNewTodoListButton = document.getElementById("add-new-todo-list");
addNewTodoListButton.addEventListener("click", addNewTodoListHandler); 

