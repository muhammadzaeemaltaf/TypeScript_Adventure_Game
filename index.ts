#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Declaration of variables
let heroHealth: number = 100;
let damageToHero: number = 25;
let healthPortion: number = 3;
let healHealth: number = 30;
let heathProtionDropChance: number = 50;

let enemyHealth: number = 75;
let damageToEnemy: number = 50;

// Declaration of enemy array
let enemies: string[] = ["Skeletion", "Zombie", "Warrior", "Assassin"];

console.log("");
console.log(chalk.gray(chalk.bold("===== WELLCOME TO DEADZONE! =====")));

let gameRun: boolean = true;

// Game Loop
Game: while (gameRun) {

  // Generate random enemy
  let enemyIndex = Math.floor(Math.random() * enemies.length);
  let enemy = enemies[enemyIndex];

  console.log("\n" + chalk.yellow(`#--- ${enemy} has appeared! ---#\n`));

  console.log(`Your HP: ${heroHealth}`);
  console.log(`${enemy}'s HP: ${enemyHealth}\n`);

  while (enemyHealth > 0) {
    let heroAttack: number = Math.floor(Math.random() * damageToEnemy + 1);
    let enemyAttack: number = Math.floor(Math.random() * damageToHero + 1);

    let ask = await inquirer.prompt([
      {
        name: "opt",
        type: "list",
        message: "What do you like to do?",
        choices: ["Attack", "Take Health Protion", "Run"],
      },
    ]);


    // Attack condition
    if (ask.opt == "Attack") {
      console.log("");
      if (heroAttack > enemyAttack) {
        console.log(
          chalk.green(`You strike ${enemy} for ${heroAttack} damage.`)
        );
        console.log(
          chalk.red(`You recieved ${enemyAttack} retaliation from ${enemy}.`)
        );
      } else {
        console.log(chalk.red(`You strike ${enemy} for ${heroAttack} damage.`));
        console.log(
          chalk.green(`You recieved ${enemyAttack} retaliation from ${enemy}!`)
        );
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
        console.log(
          chalk.red(
            chalk.italic(
              `You have taken to much damage. You are to weak to continue.\n`
            )
          )
        );
        console.log(chalk.red("-".repeat(45)));

        console.log("\n#===== Thank you for playing this game...");

        process.exit();
      }
    } 

    // Health protion condition 
    else if (ask.opt == "Take Health Protion") {
      if (healthPortion > 0) {
        heroHealth += healHealth;
        healthPortion--;
        console.log(`\nYou use health portion for heal ${healHealth} HP`);
        console.log(`You now have ${heroHealth} HP.`);
        console.log(`You have ${healthPortion} health protion left.\n`);
      } else {
        console.log(
          "\nYou have no health protion left. Defeat enemy to get heath protion.\n"
        );
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

  // Drop health portion
  if (enemyHealth <= 0 && heroHealth <= 40 && healthPortion < 3) {
    let randomNumber: number = Math.floor(Math.random() * 100 + 1);
    
    
    if (randomNumber < heathProtionDropChance) {
      healthPortion++;

      console.log(chalk.green(`\n${enemy} give you one health portion.`));
      console.log(`You have ${heroHealth} HP left.`);
      console.log(`Your health portion is ${healthPortion}.\n`);
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
  } else {
    console.log(chalk.green("\nYou successfully exit from DeadZone!"));
    break;
  }
}

console.log("\n#==== Thank you for playing this game...");
