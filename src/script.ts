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

enum stages {notComplete = "pending", inProgress = "active", taskCompleted = "complete"}

type Task = {
  name: string | number;
  description: string | number;
  isUrgent: boolean;
  isImportant: boolean;
  status: stages;
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
      const status = stages.notComplete;

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
`);});}


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
                    let newStatus: number = parseInt((await ask("Please provide the new task status: 1 = pending, 2 = active, 3 = completed: ")));
                    switch (newStatus) {
                      case 1:
                        matches[0].status = stages.notComplete;
                        break;
                      case 2:
                        matches[0].status = stages.inProgress;
                        break;
                      case 3:
                        case 3:
                        matches[0].status = stages.taskCompleted;
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
      exit = true;
      rl.close();}  
    
    
}
})();
