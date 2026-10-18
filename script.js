const starterPrompts = [
 {id:1,title:"A City Above the Clouds",category:"Images",tag:"Fantasy",symbol:"✧",glow:"#7d55ef",glow2:"#5abaff",desc:"Imagine a dreamlike city floating high above the world.",prompt:"Create a breathtaking floating city above the clouds at golden hour, elegant futuristic towers, bridges between sky islands, soft sun rays, volumetric clouds, intricate architecture, cinematic wide-angle composition, rich detail, atmospheric fantasy concept art."},
 {id:2,title:"The Last Goal of the Final",category:"Sports",tag:"Football",symbol:"⚽",glow:"#5c48d7",glow2:"#28c4b7",desc:"Capture the unforgettable moment of a championship final.",prompt:"Create a cinematic football championship final in a packed stadium, a striker taking the decisive shot, floodlights cutting through light mist, dynamic perspective, realistic pitch, intense crowd atmosphere, high-speed sports photography."},
 {id:3,title:"Cricket in the Year 2150",category:"Sports",tag:"Future",symbol:"◉",glow:"#167fbd",glow2:"#a05bfa",desc:"Reimagine the cricket stadium of tomorrow.",prompt:"Design a cricket stadium in the year 2150, sweeping futuristic architecture, holographic scoreboards, advanced but believable sports equipment, luminous boundary markings, thousands of spectators, dusk sky, detailed science-fiction concept art."},
 {id:4,title:"The Friendly Lab Robot",category:"Technology",tag:"Robotics",symbol:"⌘",glow:"#397be6",glow2:"#7e5cf5",desc:"Create a helpful robot with personality and charm.",prompt:"Design a friendly next-generation assistant robot in a bright research lab, expressive digital eyes, carefully engineered joints, brushed metal and soft polymer materials, subtle cyan light accents, believable proportions, clean product concept photography."},
 {id:5,title:"A Door in the Forest",category:"Stories",tag:"Adventure",symbol:"⌁",glow:"#6b42bd",glow2:"#3a9b8a",desc:"Begin a mysterious adventure in an enchanted woodland.",prompt:"Write an imaginative adventure about a curious young inventor who finds a tiny glowing door hidden inside an ancient forest tree. Include a clever puzzle, an unexpected friend, vivid sensory details, gentle suspense, and a hopeful ending."},
 {id:6,title:"The Miniature Toy Planet",category:"Images",tag:"Miniature",symbol:"◇",glow:"#db6f9c",glow2:"#e7b750",desc:"Turn a tabletop of toys into an entire tiny world.",prompt:"Create a whimsical miniature planet built from toys, tiny brick houses, winding toy-car roads, little trees and playful mechanical creatures, macro photography, soft studio light, shallow depth of field, intricate textures, joyful colors."},
 {id:7,title:"Neon Rain City",category:"Images",tag:"Cyberpunk",symbol:"⌁",glow:"#8a4df1",glow2:"#1a9fda",desc:"Explore a futuristic city glowing after dark.",prompt:"Create a rain-soaked futuristic city street at night, neon reflections on wet pavement, layered signs, distant flying transport, atmospheric haze, cinematic composition, detailed architecture, vibrant purple and electric-blue lighting."},
 {id:8,title:"The Game That Built Itself",category:"Gaming",tag:"Game Design",symbol:"⌗",glow:"#5d54db",glow2:"#4a9df0",desc:"Invent a game world that changes with every choice.",prompt:"Develop a concept for an original exploration game where the environment rearranges itself based on the player's choices. Describe the core gameplay loop, three memorable locations, a simple progression system, and one surprising mechanic."},
 {id:9,title:"A Tiny Dragon's Big Day",category:"Stories",tag:"Wholesome",symbol:"♨",glow:"#bb5d8e",glow2:"#e7a54e",desc:"Write a warm, funny story about a small dragon.",prompt:"Write a funny, heartwarming story about a tiny dragon who wants to help a village baker. Give the dragon one unusual talent, a small problem to solve, lively dialogue, and a satisfying ending suitable for young readers."},
 {id:10,title:"The Impossible Space Station",category:"Technology",tag:"Sci-fi",symbol:"✣",glow:"#3c68d9",glow2:"#8351df",desc:"Design a spectacular research station orbiting a distant planet.",prompt:"Design a believable science research station orbiting a ringed planet, modular habitats, solar arrays, docking craft, subtle interior lights, enormous planetary scale, accurate-looking materials, cinematic orbital view, detailed space concept art."},
 {id:11,title:"The Secret Level",category:"Gaming",tag:"Level Design",symbol:"▦",glow:"#287f9e",glow2:"#7b54e7",desc:"Create a hidden level that rewards curious players.",prompt:"Design a secret level for an adventure game hidden behind an ordinary-looking library bookshelf. Describe the visual theme, three environmental clues, one nonviolent puzzle, a clever reward, and how players discover the entrance."},
 {id:12,title:"The Future Classroom",category:"Technology",tag:"Future",symbol:"⌬",glow:"#327bca",glow2:"#44c9b5",desc:"Imagine a classroom that makes learning more creative.",prompt:"Imagine a welcoming classroom of the future with interactive learning walls, flexible desks, helpful educational robots, indoor plants, accessible tools, natural daylight, and collaborative project spaces. Keep the design practical, inclusive, and inspiring."}
];
let prompts = [...starterPrompts];
let activeCategory = "All", searchTerm = "", sortMode = "featured", showAll = false, saved = new Set();
const grid = document.getElementById("promptGrid"), searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount"), emptyState = document.getElementById("emptyState");
const showMore = document.getElementById("showMore"), toast = document.getElementById("toast");
let toastTimer;
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function visiblePrompts(){
 let items = prompts.filter(p => (activeCategory==="All" || p.category===activeCategory) && (p.title+" "+p.category+" "+p.tag+" "+p.desc+" "+p.prompt).toLowerCase().includes(searchTerm.toLowerCase()));
 if(sortMode==="az") items.sort((a,b)=>a.title.localeCompare(b.title));
 return items;
}
function render(){
 const items=visiblePrompts(), shown=showAll?items:items.slice(0,6);
 grid.innerHTML=shown.map(p=>`<article class="prompt-card">
  <div class="card-art" style="--glow:${p.glow||"#7d55ef"};--glow2:${p.glow2||"#5abaff"};--art:${p.art||"#c4adff"}">
   <div class="art-grid"></div><span class="art-label">PROMPT NO. ${String(p.id).padStart(3,"0")}</span><span class="art-symbol" aria-hidden="true">${escapeHTML(p.symbol||"✳")}</span>
  </div>
  <div class="card-body"><div class="card-topline"><span class="tag">${escapeHTML(p.tag||p.category)}</span><span class="card-id">#${String(p.id).padStart(3,"0")}</span></div>
   <h3>${escapeHTML(p.title)}</h3><p class="card-desc">${escapeHTML(p.desc||"A community-shared creative prompt.")}</p>
   <div class="prompt-preview">${escapeHTML(p.prompt)}</div>
   <div class="card-footer"><button class="copy-btn" data-copy="${p.id}">▢ &nbsp; Copy prompt</button><button class="save-btn ${saved.has(p.id)?"saved":""}" data-save="${p.id}" aria-label="${saved.has(p.id)?"Remove from":"Add to"} favorites" title="Save favorite">${saved.has(p.id)?"★":"☆"}</button></div>
  </div></article>`).join("");
 resultCount.textContent=`${items.length} prompt${items.length===1?"":"s"} found`;
 document.getElementById("promptCount").textContent=`${prompts.length} creative prompts`;
 emptyState.classList.toggle("hidden",items.length!==0);
 grid.classList.toggle("hidden",items.length===0);
 showMore.parentElement.classList.toggle("hidden",items.length<=6);
 showMore.classList.toggle("hidden",items.length<=6);
 showMore.innerHTML=showAll?"Show fewer prompts ↑":"Show more prompts ↓";
}
function announce(message){
 toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);
 toastTimer=setTimeout(()=>toast.classList.remove("show"),2200);
}
async function copyPrompt(p){
 try{await navigator.clipboard.writeText(p.prompt);announce("Prompt copied to clipboard!");}
 catch(e){
  const area=document.createElement("textarea");area.value=p.prompt;area.style.position="fixed";area.style.opacity="0";document.body.appendChild(area);area.select();
  const ok=document.execCommand("copy");area.remove();announce(ok?"Prompt copied to clipboard!":"Copy failed — select and copy the prompt text.");
 }
}
grid.addEventListener("click",e=>{
 const copy=e.target.closest("[data-copy]"), save=e.target.closest("[data-save]");
 if(copy){const p=prompts.find(p=>p.id===Number(copy.dataset.copy));if(p)copyPrompt(p);}
 if(save){const id=Number(save.dataset.save);saved.has(id)?saved.delete(id):saved.add(id);render();announce(saved.has(id)?"Added to favorites":"Removed from favorites");}
});
searchInput.addEventListener("input",()=>{searchTerm=searchInput.value.trim();showAll=false;render();});
document.getElementById("sortSelect").addEventListener("change",e=>{sortMode=e.target.value;render();});
document.querySelectorAll(".category").forEach(btn=>btn.addEventListener("click",()=>{
 activeCategory=btn.dataset.category;showAll=false;
 document.querySelectorAll(".category").forEach(b=>b.classList.toggle("active",b===btn));render();
}));
showMore.addEventListener("click",()=>{showAll=!showAll;render();});
document.getElementById("resetFilters").addEventListener("click",()=>{
 activeCategory="All";searchTerm="";sortMode="featured";showAll=false;searchInput.value="";document.getElementById("sortSelect").value="featured";
 document.querySelectorAll(".category").forEach(b=>b.classList.toggle("active",b.dataset.category==="All"));render();
});
document.getElementById("promptForm").addEventListener("submit",e=>{
 e.preventDefault();const data=new FormData(e.currentTarget);
 const title=String(data.get("title")).trim(),category=String(data.get("category")),tag=String(data.get("tag")).trim()||category,prompt=String(data.get("prompt")).trim();
 if(!title||!prompt)return;
 const palette=[["#8b5cf6","#299df5"],["#397be6","#7e5cf5"],["#db6f9c","#e7b750"],["#287f9e","#7b54e7"]];
 const colors=palette[prompts.length%palette.length];
 prompts.unshift({id:Math.max(0,...prompts.map(p=>p.id))+1,title,category,tag,symbol:"✳",glow:colors[0],glow2:colors[1],desc:"Community-submitted prompt.",prompt});
 activeCategory="All";searchTerm="";sortMode="featured";showAll=true;searchInput.value="";document.getElementById("sortSelect").value="featured";
 document.querySelectorAll(".category").forEach(b=>b.classList.toggle("active",b.dataset.category==="All"));
 e.currentTarget.reset();document.getElementById("formFeedback").textContent="Added to the demo library. It will disappear when this page data is reset.";
 render();announce("Your prompt was added!");document.getElementById("explore").scrollIntoView({behavior:"smooth"});
});
const menuToggle=document.getElementById("menuToggle"),nav=document.querySelector(".nav-links");
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));
render();