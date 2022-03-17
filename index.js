function Building() {
  const newBuilding = {
    address: "",
    mailbox: [],
  };

  return newBuilding;
}

function Village() {
  const newVillage = {
    buildings: [],
    roads: [],
    addBuilding,
    addRoad,
    pathsFrom,
  };

  function addBuilding(newBuilding) {
    this.buildings.push(newBuilding);
    return this;
  }

  function addRoad(...newBuildings) {
    this.roads.push([...newBuildings]);
    return this;
  }

  function pathsFrom(building) {
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

  return newVillage;
}

function Robot(village) {
  const newRobot = {
    village,
    location: "Post Office",
    parcels: [],
    move,
    pickUp,
    deliver,
  };

  function move(locationAddress) {
    if (this.village.pathsFrom(locationAddress)) {
      this.location = locationAddress;
      console.log(`Successfully moved to ${locationAddress}`);
    } else {
      console.log(`Unable to move, no paths available`);
    }
    return this;
  }

  function pickUp(parcels) {
    this.parcels.push(parcels);
    return this;
  }

  function deliver() {
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

  return newRobot;
}
module.exports = { Building, Village, Robot };
