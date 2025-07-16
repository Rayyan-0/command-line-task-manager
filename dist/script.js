"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
function ask(question) {
    return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}
let exit = false;
const tasks = [];
console.log("press A to add a new task. V to see current tasks. type exit to, well, exit.\n");
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        while (!exit) {
            const input = (yield ask("> ")).toLowerCase();
            const addNewTask = () => __awaiter(this, void 0, void 0, function* () {
                const name = yield ask("Please enter a task name: ");
                const description = yield ask("Describe your task: ");
                const isUrgent = (yield ask("Urgent? true/false: ")).toLowerCase() === "true";
                const isImportant = (yield ask("Important? true/false: ")).toLowerCase() === "true";
                const newTask = {
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
            });
            if (input === "a") {
                yield addNewTask();
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
`);
                });
            }
            if (input === "e") {
                let taskName = yield ask("Please enter a task name: ");
                let matches = tasks.filter((item) => String(item.name).includes(taskName));
                let editConf = (yield ask(`Do you want to edit ${matches[0].name}? y/n `)).toLowerCase();
                if (editConf == "y") {
                    let editedProperty = (yield ask("Choose from the following properties: name - description - isUrgent - isImportant "));
                    switch (editedProperty) {
                        case "name":
                            let newName = (yield ask("Please provide the new task name: "));
                            matches[0].name = newName;
                        case "description":
                            let newdesc = (yield ask("Please provide the new task description: "));
                            matches[0].description = newdesc;
                        case "isUrgent":
                            let newUrgent = (yield ask("Please provide the new task urgency: "));
                            matches[0].name = newUrgent;
                        case "isImportant":
                            let newImportant = (yield ask("Please provide the new task importance: "));
                            matches[0].name = newImportant;
                    }
                }
            }
            if (input === "exit") {
                exit = true;
                rl.close();
            }
        }
    });
})();
//# sourceMappingURL=script.js.map