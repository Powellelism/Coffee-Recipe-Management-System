(()=>{var e={867:(e,t,r)=>{var n={"./common.css":261,"./style.css":683};function o(e){var t=a(e);return r(t)}function a(e){if(!r.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}o.keys=function(){return Object.keys(n)},o.resolve=a,e.exports=o,o.id=867},261:(e,t,r)=>{"use strict";r.r(t)},683:(e,t,r)=>{"use strict";r.r(t)}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{"use strict";window.addEventListener("DOMContentLoaded",(function(){var e=document.getElementById("name"),t=document.querySelectorAll('[name="coffee-type"]'),r=document.getElementById("drinks-name"),n=document.getElementById("size-name"),o=document.getElementById("caramel"),a=document.getElementById("sugar"),c=document.getElementById("extra-shot"),d=document.getElementById("cream"),l=document.getElementById("water"),i=document.getElementById("milk"),m=[o,a,c,i,d,l],s=localStorage.getItem("index");if(s){var u=JSON.parse(localStorage.getItem("recipes"))[s];e.value=u.recipeName,"Hot"==u.coffeeType?t[0].checked=!0:t[1].checked=!0,r.selectedIndex=u.drinkType,n.selectedIndex=u.size;for(var f=u.addOns,g=0;g<f.length;g++)m[f[g]].checked=!0;localStorage.removeItem("savedIndex")}var v=localStorage.getItem("savedIndex");if(v){var p=JSON.parse(localStorage.getItem("savedRecipesPage"))[v];e.value=p.recipeName,"Edit"===localStorage.getItem("Condition")&&localStorage.setItem("OldNameEdit",p.recipeName),"Hot"==p.coffeeType?t[0].checked=!0:t[1].checked=!0,r.selectedIndex=p.drinkType,n.selectedIndex=p.size;for(var y=p.addOns,I=0;I<y.length;I++)m[y[I]].checked=!0}var h=document.querySelector("form"),S=localStorage.getItem("Condition");h.addEventListener("submit",(function(o){if(o.preventDefault(),function(e,t){var r=localStorage.getItem("OldNameEdit"),n=localStorage.getItem("nameRecipes");if(null===n)return!0;var o=n.split(",");if("Create"===t){for(var a in o)if(o[a]===e)return!1}else for(var c in o)if(o[c]===e&&o[c]!==r)return!1;return!0}(e.value,S)){for(var a=[],c=0;c<m.length;c++)m[c].checked&&a.push(c);var d={recipeName:e.value,coffeeType:t[0].checked?"Hot":"Cold",drinkType:r.selectedIndex,size:n.selectedIndex,addOns:a},l=JSON.stringify(d);localStorage.setItem("custom",l),window.location="../reviewRecipePage/reviewRecipe.html"}else alert("The recipe name already exists. Please rename your recipe.")}))})),window.onload=function(){fetch("../common.html").then((function(e){return e.text()})).then((function(e){return document.getElementById("home").innerHTML=e}))};var e=r(867);e.keys().forEach(e)})()})();