const fs = require("fs");
const readline = require("readline");
const { stdin: input, stdout: output } = require("process");
const db = require("./password.json");

const randNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const rl = readline.createInterface({ input, output });
console.log("Write 'start' for play game");

rl.on("line", (v) => {
  if (v == "start") {
    console.log("----------");
    console.log("Possible responses: 1 - more, 2 - less, 3 - equal");
    const pass1 = db.arr[randNum(0, db.arr.length - 1)];
    const pass2 = db.arr[randNum(0, db.arr.length - 1)];
    rl.question(
      `Is password '${pass1.password}' more used then '${pass2.password}': `,
      (answer) => {
        console.log("----------");
        if (isNaN(answer) || answer < 1 || answer > 3) {
          console.log("Wrong answer. For play again write 'start'");
        }
        console.log(
          `Users count for password '${pass1.password}': ${pass1.numberOfUsers}`
        );
        console.log(
          `Users count for password '${pass2.password}': ${pass2.numberOfUsers}`
        );
        console.log("----------");
        if (answer == 1 && pass1.numberOfUsers > pass2.numberOfUsers) {
          console.log("Yes! You win! For play again write 'start'");
        }
        if (answer == 1 && pass1.numberOfUsers < pass2.numberOfUsers) {
          console.log("No! You lose! For play again write 'start'");
        }
        if (answer == 2 && pass1.numberOfUsers < pass2.numberOfUsers) {
          console.log("Yes! You win! For play again write 'start'");
        }
        if (answer == 2 && pass1.numberOfUsers > pass2.numberOfUsers) {
          console.log("No! You lose! For play again write 'start'");
        }
        if (answer == 3 && pass1.numberOfUsers == pass2.numberOfUsers) {
          console.log("Yes! You win! For play again write 'start'");
        }
        if (answer == 3 && pass1.numberOfUsers != pass2.numberOfUsers) {
          console.log("No! You lose! For play again write 'start'");
        }
      }
    );
  } else {
    console.log("Write 'start' for play game");
  }
});
