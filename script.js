const header=document.getElementById("header");
const menu=document.getElementById("menu");
const nav=document.getElementById("nav");

window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",window.scrollY>40);
});

menu.addEventListener("click",()=>nav.classList.toggle("open"));

document.querySelectorAll("#nav a").forEach(a=>{
  a.addEventListener("click",()=>nav.classList.remove("open"));
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const counters=document.querySelectorAll("[data-count]");
let counted=false;
const stats=document.querySelector(".stats");
const countObserver=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting&&!counted){
    counted=true;
    counters.forEach(el=>{
      const target=Number(el.dataset.count);
      let current=0;
      const step=Math.max(1,Math.ceil(target/45));
      const timer=setInterval(()=>{
        current+=step;
        if(current>=target){current=target;clearInterval(timer)}
        el.textContent=current;
      },30);
    });
  }
},{threshold:.4});
countObserver.observe(stats);

document.getElementById("year").textContent=new Date().getFullYear();
