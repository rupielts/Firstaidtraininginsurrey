(function(){
var EMBED="https://docs.google.com/forms/d/e/1FAIpQLSd6vaZjImw5oUv58NsYlstE_fEaAbzJ8Xz3VQoItz8GDVg2LA/viewform?embedded=true";
var OPEN="https://docs.google.com/forms/d/e/1FAIpQLSd6vaZjImw5oUv58NsYlstE_fEaAbzJ8Xz3VQoItz8GDVg2LA/viewform?usp=header";
var m,last;
function build(){
m=document.createElement("div");m.className="modal";m.hidden=true;
m.innerHTML='<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="mt"><div class="mbar"><b id="mt"></b><a href="'+OPEN+'" target="_blank" rel="noopener">Open in a new tab</a><button type="button" aria-label="Close">&times;</button></div><div class="mbody"></div></div>';
document.body.appendChild(m);
m.addEventListener("click",function(e){if(e.target===m)hide()});
m.querySelector("button").addEventListener("click",hide);}
function show(c,t){
if(!m)build();
m.querySelector("#mt").textContent="Register: "+c;
var b=m.querySelector(".mbody");b.innerHTML="<p>Loading the form...</p>";
var f=document.createElement("iframe");f.src=EMBED;f.title="Course registration form";b.appendChild(f);
m.hidden=false;document.body.style.overflow="hidden";last=t;m.querySelector("button").focus();}
function hide(){m.hidden=true;m.querySelector(".mbody").innerHTML="";document.body.style.overflow="";if(last)last.focus();}
document.addEventListener("click",function(e){var a=e.target.closest("[data-course]");if(!a)return;e.preventDefault();show(a.dataset.course,a);});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&m&&!m.hidden)hide();});
})();
