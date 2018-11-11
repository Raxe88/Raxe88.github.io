//<![CDATA[
var req = false;
var randomSyncNumber = Math.floor((Math.random() * 8999) + 1000);
var showSyncStatus = 0; // 0 -> No s'ha ensenyat, 1 -> s'està ensenyant
var showRedAppStatus = 0; //0 -> No s'ha ensenyat, 1 -> s'ha d'obrir, 2 -> està obert i s'ha de tancar
var selectionBarPosition = 0;
var selectedElement = 0;

var gjson;

var cosa;

window.onload = function() {
    //Load JSON to global var jsonInfo
    gjson = loadJSON("resources/data.json");
    initializeData();
    registerKeyEventListener();
    setRandomSyncNumber();
    showRedInformativeMessage();
};

/**
 * Funció que gestiona les entrades del teclat. Si rep la 'R' de red o la tecla enter es canvia d'ubicació.
 * @param {tecla} kc 
 */
function handleKeyCode(kc) {
    if(kc== VK_GREEN){
        cosa = document.getElementById("firetv-background-tv");
        document.getElementById("firetv-background-tv").innerHTML = "";
    }
    if(kc== VK_YELLOW){
        document.getElementById("firetv-background-tv").innerHTML = cosa;
    }
    if (kc==VK_RED || kc == VK_ENTER) {
        showSync();
        showRedApp();
        return true;
    }
    if(kc==VK_UP && showRedAppStatus == 2){
        if(selectionBarPosition == 0 && selectedElement > 0){
            scrollVideosUp();
        }
        if(selectionBarPosition > 0){
            selectionBarPosition--;
            document.getElementById("selectionbar").style.cssText = "position: absolute; left: 75px; top:" + (40 + selectionBarPosition*100) + "px";
            document.getElementById("selectionbarUpArrow").style.cssText = "position: absolute; left: 770px; top:" + (36 + selectionBarPosition*100) + "px";
            document.getElementById("selectionbarDownArrow").style.cssText = "position: absolute; left: 770px; top:" + (108 + selectionBarPosition*100) + "px";
            document.getElementById("selectionbarOk").style.cssText = "position: absolute; left: 770px; top:" + (72 + selectionBarPosition*100) + "px";
        }
        if(selectedElement > 0){
            selectedElement--;
        }
        showArrows();
        updateSelected();
        console.log("SelectionBarPos: " + selectionBarPosition + " SelectedElement: " + selectedElement);
    }
    if(kc==VK_DOWN && showRedAppStatus == 2){
        if(selectionBarPosition < 5){ //La barra va de 0 a 5 (6 posicions)
            selectionBarPosition++;
            document.getElementById("selectionbar").style.cssText = "position: absolute; left: 75px; top:" + (40 + selectionBarPosition*100) + "px";
            document.getElementById("selectionbarUpArrow").style.cssText = "position: absolute; left: 770px; top:" + (36 + selectionBarPosition*100) + "px";
            document.getElementById("selectionbarDownArrow").style.cssText = "position: absolute; left: 770px; top:" + (108 + selectionBarPosition*100) + "px";
            document.getElementById("selectionbarOk").style.cssText = "position: absolute; left: 770px; top:" + (72 + selectionBarPosition*100) + "px";
        }
        if(selectionBarPosition == 5 && selectedElement >= 5 && selectedElement < gjson.videoList.length - 1){
            scrollVideosDown();
        }
        if(selectedElement < gjson.videoList.length - 1){
            selectedElement++;
            console.log("cosa");
        }
        showArrows();
        updateSelected();
        console.log("SelectionBarPos: " + selectionBarPosition + " SelectedElement: " + selectedElement);
    }
    if(kc==VK_0){
        hideRedApp();
    }
    return false;
};

/**
 * Funció que genera un nombre aleatori
 */
function setRandomSyncNumber(){
    document.getElementById("randomNumber").innerHTML = randomSyncNumber;
}

function showArrows(){
    if(selectedElement < gjson.videoList.length - 1){
        document.getElementById("selectionbarDownArrow").className = "";
    }else{
        document.getElementById("selectionbarDownArrow").className = "notShown";
    }
    if(selectedElement > 0){
        document.getElementById("selectionbarUpArrow").className = "";
    }else{
        document.getElementById("selectionbarUpArrow").className = "notShown";
    }
}

/**
 * Funció que es crida quan prémen el boto vermell i ensenya el missatge de sincronització. També s'encarrega d'engegar l'aplicació quan prémen "ok".
 */
function showSync(){

    //Si no han vist el missatge encara
    if(showSyncStatus == 0){
        //Engegar l'animació d'ensenyar el missatge de sincronització
        document.getElementById("sync").className = "FadeIn";
        //Amagar el missatge de prémer el botó vermell
        document.getElementById("pressRedButtonMessage").className = "FadeOut";
        //Canviar l'estat del missatge de sincronització a ensenyant
        showSyncStatus++;

    //Si s'està veient el missatge de sincronització i l'app no està engegada
    }else if(showSyncStatus == 1 && showRedAppStatus < 1){
        //Amagar el missatge de sincronització
        document.getElementById("sync").className = "FadeOut";

        //Engengar l'app vermella
        showRedAppStatus = 1;
    }
};

function initializeData(){
    for (var i = 0; i < gjson.userList.length; i++){
        document.getElementById("connectedUsers").childNodes[1].appendChild(document.createElement("li")).appendChild(document.createTextNode(gjson.userList[i]));
    }
    var k = 0;
    for(var i = 1; i < 12; i = i + 2){
        document.getElementById("videos").childNodes[i].childNodes[1].innerHTML = gjson.videoList[k].title;
        document.getElementById("videos").childNodes[i].childNodes[3].innerHTML = gjson.videoList[k].albumName;
        k++;
    }
    document.getElementById("elementInfo").childNodes[1].appendChild(document.createElement("li")).appendChild(document.createTextNode(gjson.videoList[0].title));
    document.getElementById("elementInfo").childNodes[1].appendChild(document.createElement("li")).appendChild(document.createTextNode(gjson.videoList[0].albumName));
    document.getElementById("elementInfo").childNodes[1].appendChild(document.createElement("li")).appendChild(document.createTextNode(gjson.videoList[0].artistName));
    document.getElementById("elementInfo").childNodes[1].appendChild(document.createElement("li")).appendChild(document.createTextNode("Views: " + gjson.videoList[0].views));
}

function updateSelected(){
    for(var i = 1; i < 12; i = i + 2){
        document.getElementById("videos").childNodes[i].childNodes[1].className = "videoNotSelected";
        document.getElementById("videos").childNodes[i].childNodes[3].className = "videoNotSelected";
    }
    document.getElementById("videos").childNodes[selectionBarPosition*2 + 1].childNodes[1].className = "videoSelected";
    document.getElementById("videos").childNodes[selectionBarPosition*2 + 1].childNodes[3].className = "videoSelected";

    document.getElementById("elementInfo").childNodes[1].childNodes[1].remove();
    document.getElementById("elementInfo").childNodes[1].childNodes[1].remove();
    document.getElementById("elementInfo").childNodes[1].childNodes[1].remove();
    document.getElementById("elementInfo").childNodes[1].childNodes[1].remove();
    document.getElementById("elementInfo").childNodes[1].appendChild(document.createElement("li")).appendChild(document.createTextNode(gjson.videoList[selectedElement].title));
    document.getElementById("elementInfo").childNodes[1].appendChild(document.createElement("li")).appendChild(document.createTextNode(gjson.videoList[selectedElement].albumName));
    document.getElementById("elementInfo").childNodes[1].appendChild(document.createElement("li")).appendChild(document.createTextNode(gjson.videoList[selectedElement].artistName));
    document.getElementById("elementInfo").childNodes[1].appendChild(document.createElement("li")).appendChild(document.createTextNode("Views: " + gjson.videoList[selectedElement].views));
}

function scrollVideosUp(){
    var k = selectedElement - selectionBarPosition - 1;
    for(var i = 1; i < 12; i = i + 2){
        document.getElementById("videos").childNodes[i].childNodes[1].innerHTML = gjson.videoList[k].title;
        document.getElementById("videos").childNodes[i].childNodes[3].innerHTML = gjson.videoList[k].albumName;
        k++;
    }
}

function scrollVideosDown(){
    var k = selectedElement - selectionBarPosition + 1;
    for(var i = 1; i < 12; i = i + 2){
        document.getElementById("videos").childNodes[i].childNodes[1].innerHTML = gjson.videoList[k].title;
        document.getElementById("videos").childNodes[i].childNodes[3].innerHTML = gjson.videoList[k].albumName;
        k++;
    }
}

/**
 * Funció que depenet de l'estat de la variable showRedAppStatus s'ensenya o s'amaga l'aplicació vermella
 */
async function showRedApp(){
    
    /*var newDiv = document.createElement('div');
    newDiv.setAttribute("id", "newFireTV");
    newDiv.setAttribute("style", "position: absolute; top: 0px !important; left: 0px !important");
    firetvnode = document.getElementById("firetv-background-tv");
    document.childNodes[2].childNodes[2].remove(); //newDiv
    document.childNodes[2].childNodes[2].appendChild(newDiv);
    document.getElementById("newFireTV").appendChild(firetvnode);*/

    //document.getElementById("firetv-background-tv").style.cssText = "";
    //document.getElementById("firetv-background-tv").childNodes[0].className = "FadeOut";
    //await sleep(2000);
    //document.getElementById("firetv-background-tv").childNodes[0].style.cssText = "";
    //document.getElementById("firetv-background-tv").childNodes[0].style.cssText = "position: absolute; top: 100px; left: 750px; width: 30%; height: 30%; min-width: 1px; min-height: 1px; transform-origin: 50% 50% 0px; visibility: inherit;";
    switch(showRedAppStatus){
        case 1: //Que s'hagi d'ensenyar
            //Engegar animació
            document.getElementById("firetv-background-tv").childNodes[0].className = "RedAppFadeIn";
            document.getElementById("redButtonApp").className = "FadeIn redAppZPos";
            await sleep(1000);
            document.getElementById("firetv-background-tv").childNodes[0].className = "RedApp";
            //S'està ensenyant l'animació
            showRedAppStatus = 2;
            break;
        case 2: //Que s'hagi d'amagar l'aplicació perquè l'han tancada
            document.getElementById("firetv-background-tv").childNodes[0].className = "";
            document.getElementById("redButtonApp").className = "FadeOut";
            
            //Tornar tots els estats als originals
            showRedAppStatus = 0;
            showSyncStatus = 0;

            //Ensenyar el missatge informatiu de prémer el botó vermell.
            showRedInformativeMessage();
            break;
    }
}

/**
 * Funció asíncrona que permet que la resta del javascript s'executi sense interrompre.
 * Amb l'ús de la funció sleep i canviant les classes del component 'div' amb l'instrucció
 * de prémer el botó vermell es reprodueix l'animació de fadein i fadeout els cops que calen.
 */
async function showRedInformativeMessage(){

    //Si no s'ha obert encara l'aplicació
    if(showSyncStatus == 0){
        //S'ensenya 10 segons
        document.getElementById("pressRedButtonMessage").className = "FadeIn";
        await sleep(10000);

        //S'amaga 5 segons
        document.getElementById("pressRedButtonMessage").className = "FadeOut";
        await sleep(5000);
    }

    //Si no s'ha obert encara l'aplicació
    if(showSyncStatus == 0){
        //S'ensenya 5 segons
        document.getElementById("pressRedButtonMessage").className = "FadeIn";
        await sleep(5000);

        //S'amaga 1 minut
        document.getElementById("pressRedButtonMessage").className = "FadeOut";
        await sleep(60000);
    }

    //Si no s'ha obert encara l'aplicació
    if(showSyncStatus == 0){
        //S'ensenya 5 segons
        document.getElementById("pressRedButtonMessage").className = "FadeIn";
        await sleep(5000);

        //S'amaga per sempre
        document.getElementById("pressRedButtonMessage").className = "FadeOut";
    }
    
};

/**
 * Funció que espera els milisegons indicats
 * @param {milisegons} ms 
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};
//]]>


/**
 * Hack trobat a https://stackoverflow.com/questions/4116992/how-to-include-json-data-in-javascript-synchronously-without-parsing
 * @param {} filePath 
 */
function loadJSON(filePath) {
    // Load json file;
    var json = loadTextFileAjaxSync(filePath, "application/json");
    // Parse json
    return JSON.parse(json);
  }   
  
  // Load text with Ajax synchronously: takes path to file and optional MIME type
  function loadTextFileAjaxSync(filePath, mimeType)
  {
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",filePath,false);
    if (mimeType != null) {
      if (xmlhttp.overrideMimeType) {
        xmlhttp.overrideMimeType(mimeType);
      }
    }
    xmlhttp.send();
    if (xmlhttp.status==200)
    {
      return xmlhttp.responseText;
    }
    else {
      // TODO Throw exception
      return null;
    }
  }