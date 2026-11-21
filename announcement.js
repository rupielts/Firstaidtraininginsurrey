/* Shows the text from message.txt as a flashing message in the blue top section. Leave message.txt empty to hide it. */
(function(){
fetch("/message.txt",{cache:"no-cache"}).then(function(r){return r.ok?r.text():""}).then(function(t){
t=(t||"").trim();if(!t||/^<(!doctype|html)/i.test(t))return;
var h=document.querySelector(".hero .wrap h1");if(!h)return;
var d=document.createElement("div");d.className="flash";d.textContent=t;h.parentNode.insertBefore(d,h);
}).catch(function(){});
})();
