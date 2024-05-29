import {Task} from './classTask.js';

export const lists = {};
const addNewTodoListButton = document.getElementById("add-new-todo-list");
addNewTodoListButton.addEventListener("click", addNewTodoListHandler);
// ! ******************************************** ! //
export function addNewTaskToDom() {
    const inputElement = document.getElementById("input-text");
    const inputValue = inputElement.value.trim();
    const list = document.getElementById("list-of-tasks");

    if (inputValue) {
        const newTaskItem = new Task(inputValue); 
        const divEl = document.createElement("div");
        divEl.setAttribute("id", `divID-${newTaskItem.idOfcurrentElement}`);
        divEl.classList.add("task-line");

        list.append(divEl);
        const checkbox = document.createElement("input");
        
        checkbox.type = "checkbox";
        checkbox.id = "myCheckbox";
        divEl.append(checkbox); 

        const labelText = document.createElement("label");
        labelText.setAttribute("for", "myCheckbox");
    
        labelText.classList.add("checkbox-label");
        divEl.append(labelText);
        labelText.textContent = newTaskItem.inputValue;

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
            h2.textContent = currentNameOfList;

            if (currentNameOfList !== "choose your list") {
                document.getElementById("input-block").classList.remove("hide");
                const list = document.getElementById("list-of-tasks");
                
                console.log(currentNameOfList);
                list.innerHTML = "";

            //! вывод всех задач из текущего списка задач
            renderTaskList(currentNameOfList, list);
            }else{
                document.getElementById("input-block").classList.add("hide");
                document.getElementById("list-of-tasks").innerHTML = "";                
            }
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
            divEl.classList.add("task-line");
    
            list.append(divEl);
            const checkbox = document.createElement("input");
        
            checkbox.type = "checkbox";
            checkbox.id = "myCheckbox";
            divEl.append(checkbox); 

            const labelText = document.createElement("label");
            labelText.setAttribute("for", "myCheckbox");
        
            labelText.classList.add("checkbox-label");
            divEl.append(labelText);
            labelText.textContent = newTaskItem.inputValue;
                
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
 

