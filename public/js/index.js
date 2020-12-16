/**
 * Module
 */
import {request} from "./controller.js";

/**
 * Event
 */
const button = document.getElementById('register');
button.addEventListener('keyup', function (e) {
    var key = e.key || e.keyCode;
    if (key === 'Enter' || key === 13) {
        request();
    }
});


