!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");t.addEventListener("click",(function(){d=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.setAttribute("disabled","disabled"),e.removeAttribute("disabled")})),e.addEventListener("click",(function(){clearInterval(d),e.setAttribute("disabled","disabled"),t.removeAttribute("disabled")}));var d=null}();
//# sourceMappingURL=01-color-switcher.3348d121.js.map