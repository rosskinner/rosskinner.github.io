!function(e){function t(t){for(var o,n,s=t[0],a=t[1],c=0,l=[];c<s.length;c++)n=s[c],Object.prototype.hasOwnProperty.call(r,n)&&r[n]&&l.push(r[n][0]),r[n]=0;for(o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o]);for(i&&i(t);l.length;)l.shift()()}var o={},r={1:0};function n(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.e=function(e){var t=[],o=r[e];if(0!==o)if(o)t.push(o[2]);else{var s=new Promise((function(t,n){o=r[e]=[t,n]}));t.push(o[2]=s);var a,c=document.createElement("script");c.charset="utf-8",c.timeout=120,n.nc&&c.setAttribute("nonce",n.nc),c.src=function(e){return n.p+""+({0:"app",2:"vendors~app"}[e]||e)+".bundle.js"}(e);var i=new Error;a=function(t){c.onerror=c.onload=null,clearTimeout(l);var o=r[e];if(0!==o){if(o){var n=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src;i.message="Loading chunk "+e+" failed.\n("+n+": "+s+")",i.name="ChunkLoadError",i.type=n,i.request=s,o[1](i)}r[e]=void 0}};var l=setTimeout((function(){a({type:"timeout",target:c})}),12e4);c.onerror=c.onload=a,document.head.appendChild(c)}return Promise.all(t)},n.m=e,n.c=o,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/assets/octopus/",n.oe=function(e){throw console.error(e),e};var s=window.webpackJsonp=window.webpackJsonp||[],a=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var i=a;n(n.s=0)}([function(e,t,o){"use strict";o.r(t);var r="#!/",n={"?projects":"/studio","?about":"/about","?contact":"/contact","projects/transport-accident-commision":"/projects/road-to-zero/","projects/mad-hatters":"/projects/mad-hatters/","projects/australian-music-vault":"/projects/australian-music-vault/","projects/kings-of-baxter":"/projects/kings-of-baxter/","projects/uluru-street-view-launch":"/projects/uluru-street-view-launch/","projects/the-oracles":"/projects/the-oracles/","projects/resting-pitch-face":"projects/resting-pitch-face/","projects/wings-activation":"/projects/wings-activation/","projects/story-spheres":"/projects/story-spheres/","projects/pixel":"/projects/pixel/","projects/love-at-fifth-site":"/projects/love-at-fifth-site/","projects/google-impact-challenge-2016":"/projects/google-impact-challenge-2016/","projects/for-the-love-of-meat":"/projects/for-the-love-of-meat/","projects/ghosts-vr":"/projects/ghosts-vr/","projects/talks-at-google":"/projects/talks-at-google/","projects/ghosts--toast-and-the-things-unsaid":"/projects/ghosts-toast-and-the-things-unsaid/","projects/loom":"/projects/loom/","projects/teddy-x":"/projects/teddy-x/","projects/the-cube":"/projects/the-cube/","projects/hangouts-in-history":"/projects/hangouts-in-history/","projects/start-with-code":"/projects/start-with-code/","projects/midsummer-nights-dreaming":"/projects/midsummer-nights-dreaming/","projects/google-impact-challenge":"/projects/google-impact-challenge/","projects/remember-me":"/projects/remember-me/","projects/the-binoculars":"/projects/the-binoculars/","projects/shakespeares-450th-birthday":"/projects/shakespeares-450th-birthday/","projects/skypad":"/projects/skypad/"};function s(){document.body.className+=" octopus",Promise.all([o.e(2),o.e(0)]).then(o.bind(null,351)).then((function(e){return new(0,e.default)})).catch((function(e){return console.log("An error occurred while loading the App",e)})).then((function(e){return e.load(a)}))}function a(){var e=document.getElementById("loading"),t=document.getElementById("loading-mask");t.classList.toggle("loader-anim"),t.classList.toggle("loader-clear"),e.classList.toggle("loading-container-clear");var o=window.whichAnimationEvent(e);o&&t.addEventListener(o,(function(){t.classList.toggle("loader-clear"),e.classList.toggle("loading-container-clear"),e.classList.toggle("dn"),e.parentElement.removeChild(e)}))}window.onload=function(){var e,t;/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?(e=document.getElementsByClassName("octopus-app")[0],(t=new window.Image).onload=a,t.src="/assets/images/octopus.jpg",e.appendChild(t)):s()},function(){var e=(document||window).location,t=e.hash,o=e.origin;if(t.indexOf(r)>-1){var s=t.replace(r,"");n.hasOwnProperty(s)&&e.replace("".concat(o).concat(n[s]))}}()}]);