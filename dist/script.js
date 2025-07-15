"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
let exit = false;
console.log("press A to add a new task. V to see current tasks. type exit to, well, exit.\n");
const tasks = [];
do {
    const input = prompt("");
    const add_new_task = () => {
        let newTask = {
            name: prompt("Please enter a task name: "),
            description: prompt("Describe your task: "),
            isUrgent: prompt("Urgent? true/false: ") === "true",
            isImportant: prompt("Important? true/false: ") === "true",
        };
        tasks.push(newTask);
        console.log(`
==================================================

✅ New task with name ${newTask.name} added successfully!

==================================================
        `);
    };
    if (input === "A") {
        add_new_task();
    }
    if (input === "V") {
        console.log(`
==================================================

📋 Here's a list of all your current tasks.

To enter a specific task, just write its name.

==================================================
`);
        let taskList = tasks.forEach((task) => console.log(`Name: ${task.name} \nDesc: ${task.description} \nis Urgent: ${task.isUrgent} \nisImportant: ${task.isImportant} \n\n===================================================== \n`));
        console.log(taskList);
    }
    if (input === "exit") {
        exit = true;
    }
} while (exit == false);
//# sourceMappingURL=script.js.map