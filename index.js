#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";
console.log('');
console.log(chalk.redBright.italic("***************************************************************"));
console.log(chalk.cyanBright.italic("********************* COUNTDOWN TIMER ************************"));
console.log(chalk.redBright.italic("***************************************************************"));
console.log('');
const getUserInput = async () => {
    const res = await inquirer.prompt([
        {
            name: "userInput",
            type: "number",
            message: "Please Enter The Amount of Seconds:",
            validate: (input) => {
                if (isNaN(input)) {
                    return "Please enter a valid number";
                }
                else if (input <= 0) {
                    return "Please enter a number greater than zero";
                }
                else if (input > 60) {
                    return "Seconds must be less than or equal to 60";
                }
                else {
                    return true;
                }
            }
        }
    ]);
    return res.userInput;
};
const startTime = (val) => {
    const intTime = new Date().getTime() + (val * 1000);
    const interval = setInterval(() => {
        const currTime = new Date();
        const timeDiff = differenceInSeconds(new Date(intTime), currTime);
        if (timeDiff <= 0) {
            clearInterval(interval);
            console.log(chalk.greenBright("\nTime Has Expired"));
        }
        else {
            const min = Math.floor(timeDiff / 60);
            const sec = timeDiff % 60;
            console.log(chalk.cyanBright(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
        }
    }, 1000);
};
const main = async () => {
    const input = await getUserInput();
    startTime(input);
};
main();
