const readline = require("readline");
const { testVillage } = require("./testVillage");
const { Robot } = require("../index");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function Game() {
  this.running = true;
  this.menu = [
    "PARCELS: Lists the parcels you have and their addresses",
    "MOVE-{Location}: Will change your location",
    "AUTODRIVE : Will move to all addresses and deliver all parcels, then return to Post Office",
    "DELIVER: Will deliver any matching parcels at your current location",
    "EXIT: Quits the game",
  ];
  this.village = testVillage;
  this.robot = new Robot(testVillage);
  const parcels = [
    { address: "Aadils House" },
    { address: "Cabin" },
    { address: "Shop" },
    { address: "Gretes House" },
  ];
  this.robot.pickUp(...parcels);
  this.moves = 0;

  Game.prototype.displayState = function () {
    console.log(`Your current location is ${this.robot.location}.`);
    const locations = this.village.pathsFrom(this.robot.location);
    console.log("Roads from here lead to:");
    locations.forEach((location) => {
      console.log(location);
    });
    console.log(`You have made ${this.moves} moves`);
    console.log(
      `You still have ${this.robot.parcels.length} parcels left to deliver`
    );
    console.log("\n");
  };
  Game.prototype.run = function () {
    this.displayState();
    console.log("please select from the options below:");
    this.menu.forEach((option) => {
      console.log(option);
    });
    rl.question("what would you like to do? ", (answer) => {
      const [command, option] = answer.split("-");
      const check = command.toLowerCase();
      console.clear();
      switch (true) {
        case check === "exit":
          this.running = false;
          break;
        case check === "current":
          console.log(`your current location is ${this.robot.location}\n`);
          break;
        case check === "list":
          const locations = this.village.pathsFrom(this.robot.location);
          console.log("Roads from here lead to:");
          locations.forEach((location) => {
            console.log(location);
          });
          console.log(`\n`);
          break;
        case check === "parcels":
          console.log("You currently have parcels addressed to:\n");
          this.robot.parcels.forEach(({ address }) => {
            console.log(address);
          });
          console.log("\n");
          break;
        case check === "move":
          this.robot.move(option);
          this.moves++;
          console.log("\n");
          break;
        case check === "deliver":
          this.robot.deliver();
          console.log("\n");
          break;
        case check === "autodrive":
          this.robot.autoDrive();
          console.log("autodriving", "\n");
          break;
        default:
          console.log(
            `I'm sorry I don't understand what you mean by: ${answer}`
          );
          console.log("\n");
      }
      if (this.running) {
        this.run();
      } else {
        console.clear();
        rl.close();
      }
    });
  };
}

module.exports = { Game };
