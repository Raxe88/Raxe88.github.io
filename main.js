var gameStatus = {
  presses: 0,
  elements: {
    autopresser: {
      num: 0,
      price: 50,
      tableid: 1
    },
    presserlonger: {
      num: 0,
      price: 25,
      tableid: 2
    },
  }
};
gameStatus["presses"] = 0;

//Un joc
function addPress(){
  console.log("Pressed");
  if (gameStatus.elements.presserlonger.num == 0) {
    gameStatus["presses"]++;
  } else {
    gameStatus.presses = Math.pow(gameStatus.presses++, gameStatus.elements.presserlonger.num - 1);
  }
  updatePresses();
}

function updatePresses(){
  document.getElementById("numPresses").innerHTML = gameStatus.presses;
}

function buy(name){
  if(gameStatus.elements[name].price <= gameStatus.presses){
    gameStatus.presses -= gameStatus.elements[name].price;
    gameStatus.elements[name].num++;
    updateElement(name);
    updatePresses();
  } else{
    console.log("Not enough presses for ".concat(name));
  }
}

function updateElement(name){
  document.getElementById("elements").rows[gameStatus.elements[name].tableid].cells[2].innerHTML = "".concat(gameStatus.elements[name].price," p");
  document.getElementById("elements").rows[gameStatus.elements[name].tableid].cells[3].innerHTML = gameStatus.elements[name].num;
}

function codeAddress(){

}
