(()=>{var e={867:(e,t,o)=>{var n={"./common.css":261,"./style.css":683};function r(e){var t=c(e);return o(t)}function c(e){if(!o.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=c,e.exports=r,r.id=867},261:(e,t,o)=>{"use strict";o.r(t)},683:(e,t,o)=>{"use strict";o.r(t)}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var c=t[n]={exports:{}};return e[n](c,c.exports,o),c.exports}o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{"use strict";window.addEventListener("DOMContentLoaded",(function(){localStorage.setItem("Condition","Edit");var e=JSON.parse(window.localStorage.getItem("savedRecipesPage"));if(null==e)return;(function(e){if(null==e)return;for(var t=document.querySelector("table"),o=0;o<e.length;o++)t.insertRow(-1).innerHTML="<td><div>".concat(e[o].recipeName,'</div></td>\n      <td>\n        <button class="button" id="recipe').concat(o,'">View/Edit</button>\n      </td>\n      <td>\n        <button class="button" id="remove').concat(o,'" name = "').concat(e[o].recipeName,'">Delete</button>\n      </td>')})(e),localStorage.removeItem("index");for(var t=function(e){var t=document.getElementById("recipe".concat(e)),o=document.getElementById("remove".concat(e));t.addEventListener("click",(function(){localStorage.setItem("Condition","Edit"),window.location="../customizeRecipePage/customizeRecipe.html",localStorage.setItem("savedIndex",e)})),o.addEventListener("click",(function(e){!function(e){var t=JSON.parse(localStorage.getItem("savedRecipesPage")),o=localStorage.getItem("nameRecipes"),n=document.querySelector("table");o=o.split(",");for(var r=0;r<t.length;++r)if(t[r].recipeName==e){t.splice(r,1),o.splice(r,1),n.deleteRow(r+1);break}localStorage.removeItem(e),0!=o.length?localStorage.setItem("nameRecipes",o.toString()):localStorage.removeItem("nameRecipes");localStorage.setItem("savedRecipesPage",JSON.stringify(t))}(e.target.name)}))},o=0;o<e.length;o++)t(o);document.querySelector("table").style.overflowY="scroll"})),window.onload=function(){fetch("../common.html").then((function(e){return e.text()})).then((function(e){return document.getElementById("home").innerHTML=e}))};var e=o(867);e.keys().forEach(e)})()})();