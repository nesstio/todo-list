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
  // containerForTaskLine.className = "string-of-task";

  //create text
  const text = document.createElement("span");
  // let taskText = e.target.value;
  let taskText = inputValue.value;
  text.innerText = taskText;
  text.id = "text-id-" + counterForCreateId.toString();
console.log(text.id);

  //create bucket-picture as button
  const image = document.createElement("img");
  image.src = "/images/delete-bucket.png";
  image.className = "image-delete-bucket";
  image.id = "image-id-" + counterForCreateId.toString();
console.log(image.id);
  image.addEventListener("click", deleteTask);
  
  //adding text and bucket-image-button as child to the tree
  listOfTasks.appendChild(containerForTaskLine);
  containerForTaskLine.append(text, image);

  //clear input field
  inputValue.value = "";
  counterForCreateId++;
}
function deleteTask(e){
  let idForDeleteTask = e.target.id.replace('image-id-', 'containerForTaskLine-id-') 
  const elementToDelete = document.getElementById(idForDeleteTask);
  elementToDelete.remove();
}
