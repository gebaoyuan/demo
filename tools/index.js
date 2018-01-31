;

function _$(ele, flag) {
    if (flag)
        return document.querySelectorAll(ele);
    return document.querySelector(ele);
}

function setStyle(el, key, value) {
    el.style[key] = value;
}

function createElement(str) {
    return document.createElement(str);
}