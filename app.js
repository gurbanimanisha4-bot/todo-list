const taskInput = document.querySelector("#taskInput")
const addBtn = document.querySelector("#addBtn")
const taskList = document.querySelector("#taskList")

// Load saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || []

// Render List
function renderTask(){
  taskList.innerText = ""
  tasks.forEach((task, index)=>{
    const li = document.createElement("li")

    // checkbox
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = task.completed
    checkbox.addEventListener("change",()=> toggleTask(index))

    // Task Text
    const span = document.createElement("span")
    span.innerText = task.text
    if(task.completed){   
      span.classList.add("completed")
    }

    // Delete Button
    const delBtn = document.createElement("button")
    delBtn.innerText= "Delete"
    delBtn.classList.add("delete-btn")
    delBtn.addEventListener("click",()=>deleteTask(index))

    li.appendChild(checkbox)
    li.appendChild(span)
    li.appendChild(delBtn)

    taskList.appendChild(li)
 })
}

// Add Task
function addTask(){
  const text = taskInput.value.trim()
  if(text === ""){
    alert("Task Cannot be empty!")
    return
  }
  tasks.push({text, completed:false})
  taskInput.value = ""
  saveTask()
  renderTask()
}

// Toggle Task
function toggleTask(index){
  tasks[index].completed = !tasks[index].completed
  saveTask()
  renderTask()
}

// Delete Task
function deleteTask(index){
  tasks.splice(index,1)
  saveTask()
  renderTask()
}

// Save Task
function saveTask(){
  localStorage.setItem("tasks",JSON.stringify(tasks))
}

// Event Listener
addBtn.addEventListener("click",addTask)

// Initial Render
renderTask()

// Hourly Alarm Feature
function startHourlyAlarm(){
  function ringAlarm(){
    alert("⏰ Hourly Reminder: Check your tasks!")
    let audio = new Audio("alarm.mp3.wav")
    audio.play()
  }
  let now = new Date()
  let msToNextHour = (60-now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000

  setTimeout(()=>{
    ringAlarm()
    setInterval(ringAlarm,3600000)
  },msToNextHour)
}
startHourlyAlarm()