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

type Task = {
  name: string | number;
  description: string | number;
  isUrgent: boolean;
  isImportant: boolean;
};

let exit = false;
const tasks: Task[] = [];

console.log("press A to add a new task. V to see current tasks. type exit to, well, exit.\n");

(async function main() {
  while (!exit) {


    const input = (await ask("> ")).toLowerCase();

    const addNewTask = async () => {
      const name = await ask("Please enter a task name: ");
      const description = await ask("Describe your task: ");
      const isUrgent = (await ask("Urgent? true/false: ")).toLowerCase() === "true";
      const isImportant = (await ask("Important? true/false: ")).toLowerCase() === "true";

      const newTask: Task = {
        name,
        description,
        isUrgent,
        isImportant
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

📋 Here's a list of all your current tasks.

==================================================
`);
      tasks.map(task => {
        console.log(`Name: ${task.name} Desc: ${task.description} is Urgent: ${task.isUrgent} is Important: ${task.isImportant}
==================================================
`);});}


    if (input === "e") {
        let taskName = await ask("Please enter a task name: ");
        let matches = tasks.filter((item) => String(item.name).includes(taskName))
        //SECTION TWO.
        let editConf: string = (await ask(`Do you want to edit ${matches[0].name}? y/n `)).toLowerCase();
        if (editConf == "y") {
            let editedProperty = (await ask("Choose from the following properties: name - description - isUrgent - isImportant "))
            switch (editedProperty) {
                case "name":
                    let newName: string | number = (await ask("Please provide the new task name: "))
                    matches[0].name = newName;
                case "description":
                    let newdesc: string | number = (await ask("Please provide the new task description: "))
                    matches[0].description = newdesc;
                case "isUrgent":
                    let newUrgent: string | number = (await ask("Please provide the new task urgency: "))
                    matches[0].name = newUrgent;
                case "isImportant":
                    let newImportant: string | number = (await ask("Please provide the new task importance: "))
                    matches[0].name = newImportant;
                    
            }
        }
    }  

    
    if (input === "exit") {
      exit = true;
      rl.close();}  
    
    
}
})();
