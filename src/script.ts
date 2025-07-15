import promptSync from 'prompt-sync'

const prompt = promptSync()

let exit: boolean = false; 

do {
    const input = prompt("press A to add a new task. V to see current tasks: ")
    
    type task = {
        name: string | number
        description: string | number
        isUrgent: boolean
        isImportant: boolean
    }
    
    const tasks: task[] = [];
    
    const add_new_task = () => {
    
    let newTask: task = {
        name: prompt("Please enter a task name: "),
        description: prompt("Describe your task: "),
        isUrgent: prompt("Urgent? true/false: ") === "true",
        isImportant: prompt("Important? true/false: ") === "true",}
    
     tasks.push(newTask);
     console.log(`New task with name ${newTask.name} has been added. Click V to see list of all tasks. `)
    }
    
    if (input === "A") {
        add_new_task();
    }
    
    if (input === "V") {
        console.log("Here's a list of all your current tasks. To enter a specific task, just write its name")
        let taskList = tasks.forEach((task) => console.log(task.name))
        console.log(taskList)
    }

        if (input === "exit") {
        exit = true;
    }

} while (exit == false)
