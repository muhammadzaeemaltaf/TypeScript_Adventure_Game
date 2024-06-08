#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Declaration of variables
let heroHealth = 100;
let damageToHero = 25;
let healthPotion = 3;
let healHealth = 30;
let heathPotionDropChance = 50;
let enemyHealth = 75;
let damageToEnemy = 50;
// Declaration of enemy array
let enemies = ["Skeletion", "Zombie", "Warrior", "Assassin"];
console.log("");
console.log(chalk.gray(chalk.bold("===== WELLCOME TO DEADZONE! =====")));
let gameRun = true;
// Game Loop
Game: while (gameRun) {
    // Generate random enemy
    let enemyIndex = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[enemyIndex];
    console.log("\n" + chalk.yellow(`#--- ${enemy} has appeared! ---#\n`));
    console.log(`Your HP: ${heroHealth}`);
    console.log(`${enemy}'s HP: ${enemyHealth}\n`);
    while (enemyHealth > 0) {
        let heroAttack = Math.floor(Math.random() * damageToEnemy + 1);
        let enemyAttack = Math.floor(Math.random() * damageToHero + 1);
        let ask = await inquirer.prompt([
            {
                name: "opt",
                type: "list",
                message: "What do you like to do?",
                choices: ["Attack", "Take Health Potion", "Run"],
            },
        ]);
        // Attack condition
        if (ask.opt == "Attack") {
            console.log("");
            if (heroAttack > enemyAttack) {
                console.log(chalk.green(`You strike ${enemy} for ${heroAttack} damage.`));
                console.log(chalk.red(`You recieved ${enemyAttack} retaliation from ${enemy}.`));
            }
            else {
                console.log(chalk.red(`You strike ${enemy} for ${heroAttack} damage.`));
                console.log(chalk.green(`You recieved ${enemyAttack} retaliation from ${enemy}!`));
            }
            console.log("");
            heroHealth -= enemyAttack;
            enemyHealth -= heroAttack;
            if (enemyHealth < 0) {
                enemyHealth = 0;
            }
            if (heroHealth < 0) {
                heroHealth = 0;
            }
            console.log(`Your HP: ${heroHealth}`);
            console.log(`${enemy}'s HP: ${enemyHealth}\n`);
            if (heroHealth <= 0) {
                console.log(chalk.red("-".repeat(45) + "\n"));
                console.log(chalk.red(chalk.italic(`You Lose.`)));
                console.log(chalk.red(chalk.italic(`You have taken to much damage. You are to weak to continue.\n`)));
                console.log(chalk.red("-".repeat(45)));
                console.log("\n#===== Thank you for playing this game...");
                process.exit();
            }
        }
        // Health potion condition
        else if (ask.opt == "Take Health Potion") {
            if (healthPotion > 0) {
                if (heroHealth >= 75) {
                    console.log(`\nYou cannot use health potion because you have enough HP.\nYou HP: ${heroHealth}.\n`);
                }
                else {
                    heroHealth += healHealth;
                    healthPotion--;
                    if (heroHealth > 100) {
                        heroHealth = 100;
                    }
                    console.log(`\nYou use health potion for heal ${healHealth} HP`);
                    console.log(`You now have ${heroHealth} HP.`);
                    console.log(`You have ${healthPotion} health potion left.\n`);
                }
            }
            else {
                console.log("\nYou have no health potion left. Defeat enemy to get heath potion.\n");
            }
        }
        // Run condition
        else if (ask.opt == "Run") {
            console.log(`\nYou run away from ${enemy}.\n`);
            break;
        }
    }
    if (enemyHealth <= 0) {
        console.log(chalk.green("-".repeat(35) + "\n"));
        console.log(chalk.green(chalk.italic(`You win, ${enemy} has defeated!`)));
        console.log(chalk.green(chalk.italic(`You have ${heroHealth} HP left.\n`)));
        console.log(chalk.green("-".repeat(35)));
    }
    // Drop health potion
    if (enemyHealth <= 0 && heroHealth <= 40 && healthPotion < 3) {
        let randomNumber = Math.floor(Math.random() * 100 + 1);
        if (randomNumber < heathPotionDropChance) {
            healthPotion++;
            console.log(chalk.green(`\n${enemy} give you one health potion.`));
            console.log(`You have ${heroHealth} HP left.`);
            console.log(`You have now ${healthPotion} health potion.\n`);
        }
    }
    console.log("");
    let ask = await inquirer.prompt([
        {
            name: "ans",
            type: "list",
            message: "What would you like to do now?",
            choices: ["Continue", "Exit"],
        },
    ]);
    if (ask.ans == "Continue") {
        console.log("You are continue on your adventure.");
        enemyHealth = 75;
        continue Game;
    }
    else {
        console.log(chalk.green("\nYou successfully exit from DeadZone!"));
        break;
    }
}
console.log("\n#==== Thank you for playing this game...");
