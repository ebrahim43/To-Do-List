let theInput = document.querySelector(".add-task input");
let plus = document.querySelector(".add-task .plus");
let theresult = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let taskStatus = document.querySelector(".task-status-all")

//Add New Task => Plus Button
plus.addEventListener("click", function(){
    if(theInput.value !== ''){
        addTask(theInput.value)
        theInput.value = '';
        theInput.focus();
    }
})

//Add New Task => Enter 
theInput.addEventListener("keypress", function(e){
    if(e.key === "Enter" && theInput.value !== ''){
        addTask(theInput.value);
        theInput.value = '';
        theInput.focus();
    }
});

function noTasksMessage(){
    if(theresult.childElementCount === 0)
        theresult.innerHTML = `<span class="no-tasks-message">No Tasks To Show</span>`}

function addTask(taskText){
    if(theresult.children[0].className === "no-tasks-message")
        theresult.innerHTML = '';

    //Create Main Div
    let task = document.createElement("div")
    task.className = "task";

    //Create New Task
    let taskSpan = document.createElement("span")
    taskSpan.className = "task-text";
    taskSpan.textContent = taskText;

    //Create Delete Span
    let deleteSpan = document.createElement("span")
    deleteSpan.className = "delete"; 
    deleteSpan.textContent = "Delete";

    // Create Finish Span
    let finishSpan = document.createElement("span")
    finishSpan.className = "finish";
    finishSpan.textContent = "Finish";

    //Append Element To Main Div
    task.appendChild(taskSpan);
    task.appendChild(deleteSpan);
    task.appendChild(finishSpan);
    
    //Append Main Div To The Result
    theresult.appendChild(task)

    updateTaskStatus();
}

//Function To Make Buttons Action
theresult.addEventListener("click", function(e){
    if(e.target.classList.contains("delete")){
        e.target.parentElement.remove()
        updateTaskStatus();
        noTasksMessage();

    }else if(e.target.classList.contains("finish")){
        e.target.parentElement.classList.toggle("finished");
        updateTaskStatus();
    }
});

// Add Delete All Button
let deleteAll = document.createElement("span")
deleteAll.className = "delete-all";
deleteAll.textContent = "Delete All";

taskStatus.append(deleteAll)

deleteAll.onclick = function(){
    theresult.innerHTML = ''
    updateTaskStatus();
    noTasksMessage();
}

//Create Finish All Element
let finishAll = document.createElement("span")
finishAll.className = "finish-all";
finishAll.textContent = "Finish All";
taskStatus.append(finishAll)

finishAll.onclick = function(){
    let allTasks =document.querySelectorAll(".task")
    allTasks.forEach(ele => {
        ele.classList.add("finished")
    })

    updateTaskStatus();
}

//Function To Update Status
function updateTaskStatus(){
    tasksCount.textContent = theresult.children.length;
    tasksCompleted.textContent = theresult.querySelectorAll('.task.finished').length;
}
