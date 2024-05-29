let docTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Come Back :(";
});
window.addEventListener("focus", () => {
  document.title = docTitle;
});

let inputValue = document.getElementById("input-text");
let listOfTasks = document.getElementById("list-of-tasks");

let buttonAddTask = document.getElementById("button-add-task");
buttonAddTask.addEventListener("click", addNewTask);

let counterForCreateId = 0;

function addNewTask(e) {
  const containerForTaskLine = document.createElement("div");
  containerForTaskLine.id = "containerForTaskLine-id-" + counterForCreateId.toString();
console.log(containerForTaskLine.id);
  containerForTaskLine.className = "string-of-task";

  //create text
  const text = document.createElement("span");
  text.style.width = "80%";
  // let taskText = e.target.value;
  let taskText = inputValue.value;
  text.innerText = taskText;
  text.id = "text-id-" + counterForCreateId.toString();
console.log(text.id);

  //create bucket-picture as button
  const imageBucket = document.createElement("img");
  imageBucket.src = "/images/delete-bucket.png";
  imageBucket.className = "image-delete-bucket";
  imageBucket.id = "image-bucket-id-" + counterForCreateId.toString();
console.log(imageBucket.id);
  imageBucket.addEventListener("click", deleteTask);

  //create pen-picture as button
  const imagePen = document.createElement("img");
  imagePen.src = "images/update-content-pen.png";
  imagePen.className = "image-update-pen";
  imagePen.id = "image-pen-id-" + counterForCreateId.toString();
console.log(imagePen.id);
  imagePen.addEventListener("click", updateTask);


  //adding text and bucket-image-button as child to the tree
  listOfTasks.appendChild(containerForTaskLine);
  containerForTaskLine.append(text, imageBucket, imagePen);

  //clear input field
  inputValue.value = "";
  counterForCreateId++;
}
function deleteTask(e){
  let idForDeleteTask = e.target.id.replace('image-bucket-id-', 'containerForTaskLine-id-');
  const elementToDelete = document.getElementById(idForDeleteTask);
  elementToDelete.remove();
}
function updateTask(e){
  //get access to task through id
  let idForUpdateTask = e.target.id.replace('image-pen-id-', 'text-id-');
  const elementToUpdate = document.getElementById(idForUpdateTask);
console.log(elementToUpdate.textContent);

  //
  inputValue.value = elementToUpdate.textContent;

  //change button "add task" behavior
  buttonAddTask.value = "Edit task";
  buttonAddTask.style.background = "blue";

  buttonAddTask.removeEventListener("click", addNewTask);
  
  //pass a parameter to an event handler by creating a closure
  //example: https://www.quora.com/How-do-you-pass-a-parameter-to-an-event-handler-in-JavaScript
console.log(elementToUpdate);
  buttonAddTask.addEventListener('click', (e) => {
    editTask(e, elementToUpdate);
  });

  // buttonAddTask.removeEventListener("click", () => {
  //   elementToUpdate.textContent = inputValue.value;
  //   inputValue.value = "";
  // });
 


// console.log(buttonAddTask.value);
// console.dir(buttonAddTask);
  

  // на данном этапе при нажатии на /pen/ текст возвращается назад в
  //inputValue(поле), и при нажатии на кнопку сохранить, сохраняется 
  //новая строчка.
  // todo: 
  // при нажатии на /pen/ кнопка/add task/ должна менять своё поведение
  // и становиться кнопкой /save/
  // todo:
  //  
}

function editTask(e, elementToUpdate){
console.dir(e);
  // let idForUpdateTask = e.target.id.replace('image-pen-id-', 'text-id-');
  // const elementToUpdate = document.getElementById(idForUpdateTask);
console.log("elementToUpdate");
console.log(elementToUpdate);
  elementToUpdate.textContent = inputValue.value;
  inputValue.value = "";

  buttonAddTask.removeEventListener('click', (e) => {
    editTask(e, elementToUpdate);    
  });
  buttonAddTask.addEventListener("click", addNewTask);
  buttonAddTask.value = "Add task";
  buttonAddTask.style.background = "yellow";
}
