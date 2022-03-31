class Building {
  constructor() {
    (this.address = ""), (this.mailbox = []);
  }
}

class Village {
  constructor() {
    (this.buildings = []), (this.roads = []);
  }

  addBuilding(newBuilding) {
    this.buildings.push(newBuilding);
    return this;
  }

  addRoad(...newBuildings) {
    this.roads.push([...newBuildings]);
    return this;
  }

  pathsFrom(building) {
    const paths = [];

    this.roads.forEach((road) => {
      if (road.indexOf(building) === 0) {
        paths.push(road[1]);
      } else if (road.indexOf(building) === 1) {
        paths.push(road[0]);
      }
    });
    return paths;
  }
}

class Robot {
  constructor(village) {
    (this.village = village),
      (this.location = "Post Office"),
      (this.parcels = []);
  }

  move(locationAddress) {
    if (this.village.pathsFrom(locationAddress).length >= 1) {
      this.location = locationAddress;
      console.log(`Successfully moved to ${locationAddress}`);
    } else {
      console.log(`Unable to move, no paths available`);
    }
    return this;
  }

  pickUp(...parcels) {
    this.parcels.push(...parcels);
    return this;
  }

  deliver() {
    this.parcels = this.parcels.filter((parcel) => {
      const correctAddress = parcel.address === this.location;
      if (correctAddress) {
        this.village.buildings.forEach((building) => {
          if (building.name === parcel.address) {
            building.mailbox.push(parcel);
          }
        });
      }
      return !correctAddress;
    });
    return this;
  }

  autoDrive() {
    const travelHistory = ["Post Office"];

    const paths = { "Post Office": {} };

    while (this.parcels.length > 0) {
      this.parcels.forEach(({ address }) => {
        if (this.village.pathsFrom(this.location).includes(address)) {
          this.move(address);
          this.deliver();
          travelHistory.push(address);
        } else {
          const possiblePaths = this.village.pathsFrom(this.location);
          const notVisitedPaths = possiblePaths.filter((path) => {
            if (travelHistory.includes(path)) return false;
            return true;
          });
          const randomPath = notVisitedPaths[Math.round(Math.random())];

          this.move(randomPath);
          this.deliver();
          travelHistory.push(randomPath);
        }
      });
    }

    travelHistory.pop();
    while (this.location !== "Post Office") {
      this.move(travelHistory.pop());
      if (this.village.pathsFrom(this.location).includes("Post Office")) {
        this.move("Post Office");
      }
    }

    // leave the post office
    // go through every possible address at least once
    // deliver at each address
    // once all parcels are done, return to PO

    //create list of possible paths
    // find shortest list and execute it

    // find weights from all buildings back to post office so there is defined finish
  }
}
module.exports = { Building, Village, Robot };
