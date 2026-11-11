/* Course-button alerts. Paste your free Web3Forms access key (created with info@rupielts.com) below. */
const KEY="PASTE_WEB3FORMS_KEY_HERE";
document.addEventListener("click",e=>{const a=e.target.closest("[data-course]");if(!a)return;const c=a.dataset.course;
try{fetch("https://api.web3forms.com/submit",{method:"POST",keepalive:true,headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({access_key:KEY,subject:"Course button clicked: "+c,from_name:"First aid website",course:c,page:location.pathname,time:new Date().toLocaleString("en-CA",{timeZone:"America/Vancouver"})})})}catch(_){}
if(window.gtag)gtag("event","course_click",{course:c});});
