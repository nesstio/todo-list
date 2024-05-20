class Task{
    inputValue;
    idOfcurrentElement;
    
    deleteButton;
    editButton;

    static idCount = 0;

    constructor(inputValue){
        this.inputValue = inputValue;

        this.idOfcurrentElement = Task.idCount;
        Task.idCount += 1;

        this.deleteButton = document.createElement("button");
        this.deleteButton.textContent = "delete";
        this.editButton = document.createElement("button"); 
        this.editButton.textContent = "edit";

    }
    // #helpFunction(){
    //     const inputElement = document.getElementById("input-text");
    //     const inputedText = inputElement.value.trim();
    //     this.inputValue = inputedText;

    //     const el = document.getElementById(`divID-${this.idOfcurrentElement}`);
    //     console.log(`divID-${this.idOfcurrentElement}`);
    //     console.log(this);
    //     el.firstElementChild.textContent = inputedText;

    //     addTaskButton.removeEventListener()
        
    //     console.log(this);
    // }
    attachEventListeners(){
        this.deleteButton.addEventListener("click", () => {
            document.getElementById(`divID-${this.idOfcurrentElement}`).remove();
        });

        this.editButton.addEventListener("click", () => {
            document.getElementById("input-text").value = this.inputValue;
            
            addTaskButton.removeEventListener("click", addNewTask);
            addTaskButton.style.background = "yellow";
            console.log(addTaskButton);
            addTaskButton.value = "change";

            
            addTaskButton.addEventListener("click", ()=>{
                const inputElement = document.getElementById("input-text");
                const inputedText = inputElement.value.trim();
                this.inputValue = inputedText;

                const el = document.getElementById(`divID-${this.idOfcurrentElement}`);
                console.log(`divID-${this.idOfcurrentElement}`);
                console.log(this);
                el.firstElementChild.textContent = inputedText;

                // addTaskButton.removeEventListener()
            });
            
        });
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

console.log(newTaskItem);

        inputElement.value = "";
    }else{
        alert("Input is empty. Please enter a task.");
    }
       
    
    
}
const addTaskButton = document.getElementById('button-add-task');
addTaskButton.addEventListener("click", addNewTask);