//<![CDATA[
var req = false;
var randomSyncNumber = Math.floor((Math.random() * 8999) + 1000);
var showSyncStatus = 0; // 0 -> No s'ha ensenyat, 1 -> s'està ensenyant
var showRedAppStatus = 0; //0 -> No s'ha ensenyat, 1 -> s'ha d'obrir, 2 -> està obert i s'ha de tancar

window.onload = function() {
    registerKeyEventListener();
    initApp();
    setRandomSyncNumber();
    showRedInformativeMessage();
};

/**
 * Funció que gestiona les entrades del teclat. Si rep la 'R' de red o la tecla enter es canvia d'ubicació.
 * @param {tecla} kc 
 */
function handleKeyCode(kc) {
    if (kc==VK_RED || kc == VK_ENTER) {
        showSync();
        showRedApp();
        //document.location.href = './menu.html';
        return true;
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

/**
 * Funció que depenet de l'estat de la variable showRedAppStatus s'ensenya o s'amaga l'aplicació vermella
 */
async function showRedApp(){
    
    /*var newDiv = document.createElement('div');
    newDiv.setAttribute("id", "newFireTV");
    newDiv.setAttribute("style", "position: absolute; top: 0px !important; left: 0px !important");
    var firetvnode = document.getElementById("firetv-background-tv");
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
            await sleep(1000);
            document.getElementById("firetv-background-tv").childNodes[0].className = "RedApp";
            //S'està ensenyant l'animació
            showRedAppStatus = 2;
            break;
        case 2: //Que s'hagi d'amagar l'aplicació perquè l'han tancada
            document.getElementById("firetv-background-tv").childNodes[0].className = "";
            
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