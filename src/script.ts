import { match } from "assert";
import { AsyncLocalStorage } from "async_hooks";
import readline from "readline";

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promisify question for async/await
function ask(question: string): Promise<string> {
  return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}

enum stages {NotComplete = "pending", InProgress = "active", TaskCompleted = "completed", Archived = "archived"}

type Task = {
  name: string | number;
  description: string | number;
  isUrgent: boolean;
  isImportant: boolean;
  status: stages;
}

const fileSave = require('fs');

const saveData = (data: Task[]) => {
  const jsonData = JSON.stringify(data);
  fileSave.writefile('Tasks', jsonData)
}

let exit = false;
const tasks: Task[] = [];

console.log("press A to add a new task. V to see current tasks. E to edit task details and status. And exit to, well, exit.\n");
(async function main() {
  while (!exit) {


    const input = (await ask("> ")).toLowerCase();

    const addNewTask = async () => {
      const name = await ask("Please enter a task name: ");
      const description = await ask("Describe your task: ");
      const isUrgent = (await ask("Urgent? true/false: ")).toLowerCase() === "true";
      const isImportant = (await ask("Important? true/false: ")).toLowerCase() === "true";
      const status = stages.NotComplete;

      const newTask: Task = {
        name,
        description,
        isUrgent,
        isImportant,
        status,
      };

      tasks.push(newTask);

      console.log(`
==================================================

✅ New task with name "${newTask.name}" added successfully!

==================================================
      `);
    };

    if (input === "a") {
      await addNewTask();
    }

    if (input === "v") {
      console.log(`
==================================================

📋 Here's a list of all your current tasks. To view only active tasks press 'A'. To view Archived tasks press 'AR'. To view only inactive tasks press 'P'

==================================================
`);
      tasks.map(task => {
        console.log(`Name: ${task.name} Desc: ${task.description} isUrgent: ${task.isUrgent} / isImportant: ${task.isImportant} / status: ${task.status}
          

==================================================

`)})

    let viewChoice = (await ask("To view only active tasks press 'A'. To view Archived tasks press 'AR'. To view only inactive tasks press 'P': ")).toLowerCase();
    switch (viewChoice) {
      case "a":
        let activeTaskView = tasks.filter((task) => task.status == stages.InProgress)
        console.log(activeTaskView)
        break;
      case "ar":
        let archivedTaskView = tasks.filter((task) => task.status == stages.Archived)
        console.log(archivedTaskView)
      case "p":
        let pendingTaskView = tasks.filter((task) => task.status == stages.NotComplete)
        console.log(pendingTaskView)
    }


}


    if (input === "e") {
        let taskName = await ask("Please enter a task name: ");
        let matches = tasks.filter((item) => String(item.name).includes(taskName))
        //SECTION TWO.
        let editConf: string = (await ask(`Do you want to edit ${matches[0].name}? y/n `)).toLowerCase();
        if (editConf == "y") {
            let editedProperty = (await ask("Choose from the following properties: name - description - isUrgent - isImportant - status: "))
            switch (editedProperty) {
                case "name":
                    let newName: string | number = (await ask("Please provide the new task name: "))
                    matches[0].name = newName;
                    break;
                case "description":
                    let newdesc: string | number = (await ask("Please provide the new task description: "))
                    matches[0].description = newdesc;
                    break;
                case "isUrgent":
                    let newUrgent: boolean = JSON.parse((await ask("Please provide the new task urgency true/false: ")))
                    matches[0].isUrgent = newUrgent;
                    break;
                case "isImportant":
                    let newImportant: boolean = JSON.parse((await ask("Please provide the new task importance true/false: ")))
                    matches[0].isImportant = newImportant
                    break;
                case "status":
                    let newStatus: number = parseInt((await ask("Please provide the new task status: 1 = pending, 2 = active, 3 = completed, 4 = Archive: ")));
                    switch (newStatus) {
                      case 1:
                        matches[0].status = stages.NotComplete;
                        break;
                      case 2:
                        matches[0].status = stages.InProgress;
                        break;
                      case 3:
                        matches[0].status = stages.TaskCompleted;
                        break;
                      case 4:
                        matches[0].status = stages.Archived;
                        break;
 
                    }
                  
            }
        }
    }  

    if (input === "d") {
        let taskName = await ask("Please enter a task name: ");
        let matches = tasks.filter((item) => String(item.name).includes(taskName))
        //SECTION TWO.
        let editConf: string = (await ask(`Do you want to delete ${matches[0].name}? y/n `)).toLowerCase();
        if (editConf == "y") {
            let index = tasks.indexOf(matches[0]);
            tasks.splice(index, 1)
            }
        }  



    if (input === "exit") {
      saveData(tasks);
      exit = true;
      rl.close();}  
    
    
}
})();
