//<![CDATA[
var req = false;

window.onload = function() {
    registerKeyEventListener();
    initApp();
    showRed();
};

/**
 * Funció que gestiona les entrades del teclat. Si rep la 'R' de red o la tecla enter es canvia d'ubicació.
 * @param {tecla} kc 
 */
function handleKeyCode(kc) {
    if (kc==VK_RED || kc == VK_ENTER) {
        document.location.href = './menu.html';
        return true;
    }
    return false;
};

/**
 * Funció asíncrona que permet que la resta del javascript s'executi sense interrompre.
 * Amb l'ús de la funció sleep i canviant les classes del component 'div' amb l'instrucció
 * de prémer el botó vermell es reprodueix l'animació de fadein i fadeout els cops que calen.
 */
async function showRed(){
    
    //S'ensenya 10 segons
    document.getElementById("pressRedButtonMessage").className = "FadeIn";
    await sleep(10000);

    //S'amaga 5 segons
    document.getElementById("pressRedButtonMessage").className = "FadeOut";
    await sleep(5000);

    //S'ensenya 5 segons
    document.getElementById("pressRedButtonMessage").className = "FadeIn";
    await sleep(5000);

    //S'amaga 1 minut
    document.getElementById("pressRedButtonMessage").className = "FadeOut";
    await sleep(60000);

    //S'ensenya 5 segons
    document.getElementById("pressRedButtonMessage").className = "FadeIn";
    await sleep(5000);

    //S'amaga per sempre
    document.getElementById("pressRedButtonMessage").className = "FadeOut";
}

/**
 * Funció que espera els milisegons indicats
 * @param {milisegons} ms 
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//]]>