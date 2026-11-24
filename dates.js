(function(){
var MO="jan feb mar apr may jun jul aug sep oct nov dec".split(" ");
var FORM="https://docs.google.com/forms/d/e/1FAIpQLSd6vaZjImw5oUv58NsYlstE_fEaAbzJ8Xz3VQoItz8GDVg2LA/viewform";
var top=document.querySelector(".top"),call=top&&top.querySelector(".call");
if(!top||!call)return;
var btn=document.createElement("button");btn.type="button";btn.className="dates-btn";
btn.innerHTML='<span class="dl">Course dates</span><span class="ds">Dates</span>';
top.insertBefore(btn,call);
var m,data;
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function parse(o){
var x=/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(\d{1,2})/i.exec(o);
if(!x)return{label:o,when:null,head:o,rest:""};
var n=new Date(),t=new Date(n.getFullYear(),n.getMonth(),n.getDate()),d=new Date(t.getFullYear(),MO.indexOf(x[1].toLowerCase()),+x[2]);
if(d<t-15552000000)d=new Date(t.getFullYear()+1,d.getMonth(),d.getDate());
return{label:o,when:d,head:d.toLocaleDateString("en-CA",{weekday:"long",month:"long",day:"numeric"}),rest:o.replace(x[0],"").replace(/^[\s\-\u2013:]+|[\s\-\u2013:]+$/g,"")};
}
function build(){
m=document.createElement("div");m.className="modal";m.hidden=true;
m.innerHTML='<div class="sheet dsheet" role="dialog" aria-modal="true" aria-labelledby="dt"><div class="mbar"><b id="dt">Upcoming course dates</b><button type="button" aria-label="Close">&times;</button></div><div class="mbody"></div></div>';
document.body.appendChild(m);
m.addEventListener("click",function(e){if(e.target===m||e.target.closest(".dreg"))hide();});
m.querySelector("button").addEventListener("click",hide);
}
function render(j){
var b=m.querySelector(".mbody");
var fb='<p>Dates are listed in our registration form.</p><p><a class="dreg o" href="'+FORM+'" target="_blank" rel="noopener" data-course="Course dates (open form)">Open the form</a></p><p>Or call <a href="tel:+16048258882">604-825-8882</a>.</p>';
if(!j||!j.ok||!j.options||!j.options.length){b.innerHTML=fb;return;}
var n=new Date(),t=new Date(n.getFullYear(),n.getMonth(),n.getDate());
var rows=j.options.map(parse).filter(function(r){return !r.when||r.when>=t;}).sort(function(a,c){return(a.when||1e15)-(c.when||1e15);});
if(!rows.length){b.innerHTML='<p>No upcoming dates are listed right now.</p>'+fb;return;}
b.innerHTML=rows.map(function(r){
var base=j.entry?FORM+"?usp=pp_url&entry."+j.entry+"="+encodeURIComponent(r.label):FORM;
var emb=base+(base.indexOf("?")>0?"&":"?")+"embedded=true";
return '<div class="drow"><div class="dinfo"><b>'+esc(r.head)+'</b><span>'+esc(r.rest)+'</span></div><a class="dreg o" href="'+esc(base)+'" target="_blank" rel="noopener" data-course="Course date: '+esc(r.head)+'" data-url="'+esc(emb)+'">Register</a></div>';
}).join("");
}
function openDates(){
if(!m)build();
m.hidden=false;document.body.style.overflow="hidden";
if(data){render(data);}else{
m.querySelector(".mbody").innerHTML="<p>Loading dates...</p>";
fetch("/api/dates").then(function(r){return r.json();}).catch(function(){return{ok:false};}).then(function(j){data=j&&j.ok?j:null;render(j);});}
m.querySelector("button").focus();
}
function hide(){m.hidden=true;document.body.style.overflow="";btn.focus();}
btn.addEventListener("click",openDates);
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&m&&!m.hidden)hide();});
})();
