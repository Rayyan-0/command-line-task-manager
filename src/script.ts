import promptSync from 'prompt-sync'

const prompt = promptSync()

let exit: boolean = false; 

type task = {
    name: string | number
    description: string | number
    isUrgent: boolean
    isImportant: boolean
}
    
console.log("press A to add a new task. V to see current tasks. type exit to, well, exit.\n");

const tasks: task[] = [];

do {
    const input = prompt("")
    
    const add_new_task = () => {
    
    let newTask: task = {
        name: prompt("Please enter a task name: "),
        description: prompt("Describe your task: "),
        isUrgent: prompt("Urgent? true/false: ") === "true",
        isImportant: prompt("Important? true/false: ") === "true",}
    
     tasks.push(newTask);
     console.log(`
==================================================

✅ New task with name ${newTask.name} added successfully!

==================================================
        `);
    }
    
    if (input === "a") {
        add_new_task();
    }
    
    if (input === "v") {
        console.log(`
==================================================

📋 Here's a list of all your current tasks.

To enter a specific task, just write its name.

==================================================
`);
        let taskList = tasks.forEach((task) => console.log(`Name: ${task.name} \nDesc: ${task.description} \nis Urgent: ${task.isUrgent} \nisImportant: ${task.isImportant} \n\n===================================================== \n`))
        console.log(taskList)
    }

        if (input === "exit") {
        exit = true;
    }
    
        // if (input === "e") {
        //     let userSearch = prompt("Please provide the name of the task you want to edit")
        //     tasks.map((task) => {
        //         if (task.name == userSearch) {
        //             console.log("Select what you want to ")
        //         }
        //     })
        // }

} while (exit == false)
