'use strict'
//
function arrayOfSelectors(selectorName, isTag = false) {
    let targetElem;
    if(!isTag){
        targetElem = document.getElementsByClassName(selectorName);
    }
    else{
        targetElem = document.getElementsByTagName(selectorName);
    }
    return targetElem;
}
function  addClass(targetName, newClass, delay, isTag = false) {
    let targetElem = arrayOfSelectors(targetName, isTag);
    for (let i = delay; i < targetElem.length; i++){
        targetElem[i].classList.add(newClass);
    }
}
function  removeClass(targetName, oldClass, delay, isTag = false) {
    let targetElem = arrayOfSelectors(targetName, isTag);
    for (let i = delay; i < targetElem.length; i++){
        targetElem[i].classList.remove(oldClass);
    }
}
//switcher
function switchClass(targetElemName, oldClass, newClass){
    addClass(targetElemName, newClass, 0);
    removeClass(targetElemName, oldClass, 0);
}
//toggle
function toggleClass(targetName, newClass, isTag){
    let arrayTarget = arrayOfSelectors(targetName, isTag);
    if( arrayTarget[0].classList.contains(newClass) ){
        removeClass(targetName, newClass, 0, isTag);
    }
    else
        addClass(targetName, newClass, 0, isTag);
}
//
function addNewNode(baseName, targetName) {
    let baseNode = document.getElementsByClassName(baseName)[0];
    let targetNode = document.getElementsByClassName(targetName)[0];
    let targetNodeClone = targetNode.cloneNode(true);
    baseNode.appendChild(targetNodeClone);
}
function removeNode(baseName, targetName) {
    let baseNode = document.getElementsByClassName(baseName)[0];
    let targetNode = document.getElementsByClassName(targetName)[0];
    baseNode.removeChild(targetNode);
}
//TIMER
function setTimer(hour, min, sec, ms, selector){
    // let minCoeff = 60;
    // let hourCoeff = minCoeff * 60;
    // let dayCoeff = hourCoeff * 24;
    let secCoeff = 100,
        minCoeff = secCoeff * 60,
        hourCoeff = minCoeff * 60;
    let counter = 0,
        timeLeft = hour * hourCoeff + min * minCoeff + sec * secCoeff + ms;

    function convertTime(delta) {
        hour = (Math.floor(delta / hourCoeff));
        min = (Math.floor((delta % hourCoeff) / minCoeff)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        sec = (Math.floor((((delta % hourCoeff) % minCoeff)) / secCoeff)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        ms = ((((delta % hourCoeff) % minCoeff)) % secCoeff).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

        return (hour + ':' + min + ':' + sec + ':' + ms);
    }
    function timeIt(){
        counter++;
        document.querySelector(selector).innerHTML = convertTime(timeLeft - counter);
        if (timeLeft <= counter){
            clearInterval(timerID);
        }
    }
    let timerID = setInterval(timeIt, 10);
}
//specific
//header for phone mode (screen max-width: 768)
document.querySelector('.user-menu').addEventListener("click", function () {
    switchClass('user-menu__list', 'disable-elem', 'active-elem');
});
document.documentElement.addEventListener("click", function (e) {
    if(!e.target.closest('.personal-header') ){
        switchClass('user-menu__list', 'active-elem', 'disable-elem');
    }
});
//burger set
document.querySelector('.burger').addEventListener("click", function () {
    toggleClass("burger", 'active');
    toggleClass("header-container__menu-list-wrap", 'unhidden-elem');
    toggleClass("section", 'blur-elem',true);
    toggleClass("footer", 'blur-elem',true);
    toggleClass("body", 'lock', true);
});
//decor border in 'categories-lots' settings
function elemDisplay(className, maxWidth, inverted, delay){
    if ( (window.innerWidth <= maxWidth && !inverted) || (window.innerWidth > maxWidth && inverted) ) {
        addClass(className, 'disable-elem', delay);
    }
    else if ( (window.innerWidth > maxWidth && !inverted) || (window.innerWidth <= maxWidth && inverted) ) {
        removeClass(className, 'disable-elem', delay);
    }
}
window.addEventListener('DOMContentLoaded', elemDisplay.bind(null, 'decor-border', 480, 0, 0));
window.addEventListener('resize', elemDisplay.bind(null, 'decor-border', 480, 0, 0));
window.addEventListener('DOMContentLoaded', elemDisplay.bind(null, 'decor-border__dot-horizontal', 480, 1, 6));
window.addEventListener('resize', elemDisplay.bind(null, 'decor-border__dot-horizontal', 480, 1, 6));

// decor 'hard-figure' in 'general-info' redrawing
function decorAdapt(){
    let textBlock = document.querySelector(".general-info__text");
    let decorBlock = document.querySelector(".block__figure_wrap");
    if ( ( decorBlock.clientHeight < (textBlock.clientHeight * 0.96) ) && window.innerWidth > 480 ){
        while (decorBlock.clientHeight < (textBlock.clientHeight * 0.96)){
            addNewNode("block__figure_wrap", "hard_figure");
        }
    }
    else if ( ( decorBlock.clientHeight > (textBlock.clientHeight * 1.2) ) && window.innerWidth > 480 ){
            removeNode("block__figure_wrap", "hard_figure");
    }
    else if (window.innerWidth <= 480){
        while ( decorBlock.children.length >= 6 ) {
            removeNode("block__figure_wrap", "hard_figure");
        }
    }
}
window.addEventListener('resize', decorAdapt);
window.addEventListener('DOMContentLoaded', decorAdapt);

//set timer in 'dinamic_lots' elements
window.addEventListener('DOMContentLoaded', setTimer.bind(null, 3, 21, 45, 37, ".timer-1"));
window.addEventListener('DOMContentLoaded', setTimer.bind(null, 3, 19, 40, 56, ".timer-2"));
window.addEventListener('DOMContentLoaded', setTimer.bind(null, 2, 0, 15, 17, ".timer-3"));
window.addEventListener('DOMContentLoaded', setTimer.bind(null, 2, 0, 15, 17, ".timer-4"));
window.addEventListener('DOMContentLoaded', setTimer.bind(null, 3, 21, 45, 37, ".timer-5"));

// switch row\column settings in 'quotes__elem'
window.addEventListener('resize', () => {
    if (window.innerWidth <= 480){
        switchClass("quotes__elem", "row-template__item-horizontal", "row-template__item-column");
    }
    else {
        switchClass("quotes__elem", "row-template__item-column" ,"row-template__item-horizontal");
    }
});
window.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 480){
        switchClass("quotes__elem", "row-template__item-horizontal", "row-template__item-column");
    }
    else {
        switchClass("quotes__elem", "row-template__item-column" ,"row-template__item-horizontal");
    }
});
//btn-update
let currentRotation = 0;
function rotateElem(elem) {
    currentRotation += 360;
    elem.querySelector(".btn-update-img").style.transform = 'rotate(' + currentRotation + 'deg)';
}