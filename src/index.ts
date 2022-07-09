import {v4 as uuidV4 } from "uuid"

// console.log(uuidV4())
type Task = {
  id: string, 
  title: string,
  completed: boolean,
  created: Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")

let tasks: Task[] = loadTasks()
tasks.forEach(val => addListItem(val))


form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    created: new Date()
  }

  tasks.push(newTask)

  addListItem(newTask)
  input.value = ""

  saveTasks()
})

function addListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  const deleteBtn = document.createElement("button")
  deleteBtn.innerHTML = "Delete"
  deleteBtn.setAttribute('id', task.id)

  deleteBtn.addEventListener('click', (e)=>{
    // allTodo?.forEach(val => {
    //   if(val?.id == e.target?.id) {
    //     const the = document.getElementById(e.target.id) as HTMLLinkElement
    //     the.remove()

        
    //     return
    //   }
    const id = e.target?.id;
    console.log(id)
    tasks.map((val, idx) => {
      if(val.id == id){
        tasks.splice(idx,1)
        saveTasks();

        tasks = loadTasks()
        tasks.forEach(val => addListItem(val))
        window.location.reload()
      }
    })
    
  })

  checkbox.addEventListener("change", ()=>{
    task.completed = checkbox.checked

    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)

  const todo = document.createElement("div")
  todo.style.display = 'flex'
  todo.style.justifyContent = 'space-between'
  todo.style.width = '150px'

  todo.append(label, deleteBtn)
  item.setAttribute('id', task.id)

  item.append(todo)
  list?.append(item)

}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null ) return []
  return JSON.parse(taskJSON)
}