//<![CDATA[
var req = false;
var randomSyncNumber = Math.floor((Math.random() * 8999) + 1000);
var showSyncStatus = 0; // 0 -> No s'ha ensenyat, 1 -> s'està ensenyant, 2 -> està en un altre menú

window.onload = function() {
    registerKeyEventListener();
    initApp();
    setRandomSyncNumber();
    showRed();
};

/**
 * Funció que gestiona les entrades del teclat. Si rep la 'R' de red o la tecla enter es canvia d'ubicació.
 * @param {tecla} kc 
 */
function handleKeyCode(kc) {
    if (kc==VK_RED || kc == VK_ENTER) {
        showSync();
        //document.location.href = './menu.html';
        return true;
    }
    if(kc==VK_LEFT){
        document.getElementById("firetv-background-tv").style.cssText = "";
        document.getElementById("firetv-background-tv").childNodes[0].style.cssText = "";
        document.getElementById("firetv-background-tv").childNodes[0].className = "ResizeTranslate";
    }
    return false;
};

function setRandomSyncNumber(){
    document.getElementById("randomNumber").innerHTML = randomSyncNumber;
}

function showSync(){
    if(showSyncStatus == 0){
        document.getElementById("sync").className = "FadeIn";
        document.getElementById("pressRedButtonMessage").className = "FadeOut";
        showSyncStatus++;
    }else if(showSyncStatus == 1){
        document.getElementById("sync").className = "FadeOut";
    }
};

/**
 * Funció asíncrona que permet que la resta del javascript s'executi sense interrompre.
 * Amb l'ús de la funció sleep i canviant les classes del component 'div' amb l'instrucció
 * de prémer el botó vermell es reprodueix l'animació de fadein i fadeout els cops que calen.
 */
async function showRed(){

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