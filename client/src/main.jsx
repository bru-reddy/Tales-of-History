import React,{useEffect,useMemo,useState}from"react";
import{createRoot}from"react-dom/client";
import{BrowserRouter,Link,Route,Routes,useNavigate,useParams}from"react-router-dom";
import{Bell,BookOpen,ChevronDown,ChevronRight,Clock3,Globe2,Landmark,Menu,Search,Sparkles,ScrollText,Shield,Star,UserRound,X}from"lucide-react";
import"./styles.css";

const API=import.meta.env.VITE_API_URL||"http://localhost:5000/api";
async function api(p,o={}){
 const token=localStorage.getItem("toh_token");
 const r=await fetch(API+p,{...o,headers:{"Content-Type":"application/json",...(token?{"Authorization":"Bearer "+token}:{}),...(o.headers||{})}});
 let d={};try{d=await r.json()}catch{}
 if(!r.ok)throw Error(d.message||"Request failed");return d;
}
function useSession(){
 const[session,setSession]=useState(null),[loading,setLoading]=useState(true);
 useEffect(()=>{
  const token=localStorage.getItem("toh_token");
  if(!token){setLoading(false);return}
  api("/auth/me").then(setSession).catch(()=>{localStorage.removeItem("toh_token");setSession(null)}).finally(()=>setLoading(false));
 },[]);
 return {session,loading};
}
function Layout({children}){
 const[open,setOpen]=useState(false),authState=useSession(),session=authState.session;
 const logout=()=>{localStorage.removeItem("toh_token");window.location.href="/"};
 const first=session?.user?.name?.split(" ")[0]||"Explorer";
 return <div className="app"><header className="topHeader"><Link to="/" className="brand brandPro"><span className="mark"><Landmark size={21}/></span><span><b>Tales of History</b><small>Stories That Shaped Our World</small></span></Link><button className="mobileBtn" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav className={"topNav "+(open?"open":"")}><Link to="/">Home</Link><Link to="/collection/history">History</Link><Link to="/collection/mythology">Mythology</Link><Link to="/timeline">Timeline</Link><Link to="/ai">AI Tutor</Link><Link to="/about">About</Link><button className="iconNav"><Search size={20}/></button><button className="iconNav"><Bell size={19}/></button>{session?<div className="profileNav"><span>{first.charAt(0).toUpperCase()}</span><small>Welcome, <b>{first}</b></small><ChevronDown size={15}/></div>:<Link to="/login" className="signin">Sign in</Link>}</nav></header>{children}<footer><div><b>The Tales of History</b><span>Read the past. Explore the story. Understand the world.</span></div><span>Interactive history & mythology library</span></footer></div>
}
function HistorySplash({onDone}){
 useEffect(()=>{const t=setTimeout(onDone,1500);return()=>clearTimeout(t)},[onDone]);
 return <div className="historySplash"><div className="splashOrnament"><div className="orbit orbit1"></div><div className="orbit orbit2"></div><Landmark size={46}/></div><span>THE TALES OF HISTORY</span><b>The past is opening...</b><div className="splashLine"><i/></div></div>
}

const storyImages={
 "shiva":"https://commons.wikimedia.org/wiki/Special:FilePath/India_statue_of_nataraja.jpg?width=1200",
 "ramayana":"https://commons.wikimedia.org/wiki/Special:FilePath/Rama%2C%20Sita%2C%20Lakshmana%2C%20and%20Hanuman.jpg?width=1200",
 "krishna":"https://commons.wikimedia.org/wiki/Special:FilePath/Image_of_Krishna._Wellcome_M0012571.jpg?width=1200",
 "mahabharata":"https://commons.wikimedia.org/wiki/Special:FilePath/Arjuna%20and%20His%20Charioteer%20Krishna%20Confront%20Karna.jpg?width=1200",
 "vedic-age":"https://commons.wikimedia.org/wiki/Special:FilePath/Vedic%20Period%20India.jpg?width=1200",
 "buddha":"https://commons.wikimedia.org/wiki/Special:FilePath/Buddha%20in%20Sarnath%20Museum%20-%20Dharmachakra%20Pravartana.jpg?width=1200",
 "jainism":"https://commons.wikimedia.org/wiki/Special:FilePath/Statue%20of%20Mahavira%20at%20Sri%20Mahavirji.jpg?width=1200",
 "gupta-empire":"https://commons.wikimedia.org/wiki/Special:FilePath/Ajanta%20Cave%2026.jpg?width=1200",
 "chola-empire":"https://commons.wikimedia.org/wiki/Special:FilePath/Brihadeeswarar%20Temple%20Gopuram.jpg?width=1200",
 "vijayanagara":"https://commons.wikimedia.org/wiki/Special:FilePath/Vittala%20Temple%20Hampi.jpg?width=1200",
 "mughal-empire":"https://commons.wikimedia.org/wiki/Special:FilePath/Taj%20Mahal%20in%20March%202018.jpg?width=1200",
 "revolt-1857":"https://commons.wikimedia.org/wiki/Special:FilePath/Rani%20Lakshmibai%20statue%20Jhansi.jpg?width=1200",
 "indian-national-movement":"https://commons.wikimedia.org/wiki/Special:FilePath/Gandhi%20spinning.jpg?width=1200",
 "dandi-march":"https://commons.wikimedia.org/wiki/Special:FilePath/Gandhi%20Dandi%20March.jpg?width=1200",
 "independence-partition":"https://commons.wikimedia.org/wiki/Special:FilePath/Indian%20Independence%20Day%201947.jpg?width=1200",
 "mesopotamia":"https://commons.wikimedia.org/wiki/Special:FilePath/Ziggurat%20of%20Ur.jpg?width=1200",
 "ancient-egypt":"https://commons.wikimedia.org/wiki/Special:FilePath/All%20Gizah%20Pyramids.jpg?width=1200",
 "ancient-greece":"https://commons.wikimedia.org/wiki/Special:FilePath/Parthenon%20in%20Athens.jpg?width=1200",
 "alexander":"https://commons.wikimedia.org/wiki/Special:FilePath/Alexander%20the%20Great%20mosaic.jpg?width=1200",
 "roman-republic":"https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20Forum%20Rome%20September%202014%2002.jpg?width=1200",
 "renaissance":"https://commons.wikimedia.org/wiki/Special:FilePath/Mona%20Lisa%2C%20by%20Leonardo%20da%20Vinci%2C%20from%20C2RMF%20retouched.jpg?width=1200",
 "industrial-revolution":"https://commons.wikimedia.org/wiki/Special:FilePath/Coalbrookdale%20by%20Night%2C%20painted%20by%20Philip%20James%20de%20Loutherbourg%2C%201801.jpg?width=1200",
 "world-war-i":"https://commons.wikimedia.org/wiki/Special:FilePath/WWI%20trenches%20in%20France.jpg?width=1200",
 "world-war-ii":"https://commons.wikimedia.org/wiki/Special:FilePath/Normandy%20American%20Cemetery%20and%20Memorial%202.jpg?width=1200",
 "greek-mythology":"https://commons.wikimedia.org/wiki/Special:FilePath/Parthenon%20from%20west.jpg?width=1200",
 "norse-mythology":"https://commons.wikimedia.org/wiki/Special:FilePath/Odin%20by%20Georg%20von%20Rosen%2C%201881.jpg?width=1200",
 "egypt-osiris":"https://commons.wikimedia.org/wiki/Special:FilePath/Osiris%2C%20Egyptian%20god.jpg?width=1200"
};
const imageFor=(t)=>storyImages[t.slug]||t.image;
const explorerImages={
"izanagi-izanami":"https://commons.wikimedia.org/wiki/Special:FilePath/Izanagi_and_Izanami.jpg?width=1200",
"susanoo-yamata":"https://commons.wikimedia.org/wiki/Special:FilePath/Susanoo%20and%20Yamata%20no%20Orochi.jpg?width=1200",
"amaterasu-cave":"https://commons.wikimedia.org/wiki/Special:FilePath/Amaterasu%20cave.jpg?width=1200",
"momotaro":"https://commons.wikimedia.org/wiki/Special:FilePath/Momotaro.jpg?width=1200",
"pangu-nuwa":"https://commons.wikimedia.org/wiki/Special:FilePath/Pangu.jpg?width=1200",
"chang-e":"https://commons.wikimedia.org/wiki/Special:FilePath/Chang%27e.jpg?width=1200",
"monkey-king":"https://commons.wikimedia.org/wiki/Special:FilePath/Sun%20Wukong.jpg?width=1200",
"perseus-medusa":"https://commons.wikimedia.org/wiki/Special:FilePath/Perseus%20with%20the%20Head%20of%20Medusa.jpg?width=1200",
"orpheus":"https://commons.wikimedia.org/wiki/Special:FilePath/Orpheus%20and%20Eurydice.jpg?width=1200",
"icarus":"https://commons.wikimedia.org/wiki/Special:FilePath/Icarus.jpg?width=1200",
"jason-golden-fleece":"https://commons.wikimedia.org/wiki/Special:FilePath/Jason%20and%20the%20Golden%20Fleece.jpg?width=1200",
"romulus-remus":"https://commons.wikimedia.org/wiki/Special:FilePath/She-wolf%20suckling%20Romulus%20and%20Remus.jpg?width=1200",
"venus-rome":"https://commons.wikimedia.org/wiki/Special:FilePath/Venus%20and%20Mars%20Pompeii.jpg?width=1200",
"janus-new-year":"https://commons.wikimedia.org/wiki/Special:FilePath/Janus%20Vatican.jpg?width=1200",
"thoth":"https://commons.wikimedia.org/wiki/Special:FilePath/Thoth%20Egyptian.jpg?width=1200",
"anubis":"https://commons.wikimedia.org/wiki/Special:FilePath/Anubis%20Louvre.jpg?width=1200",
"book-of-dead":"https://commons.wikimedia.org/wiki/Special:FilePath/Papyrus%20of%20Ani.jpg?width=1200",
"thor-hammer":"https://commons.wikimedia.org/wiki/Special:FilePath/Thor%20with%20Mjolnir.jpg?width=1200",
"baldur":"https://commons.wikimedia.org/wiki/Special:FilePath/Balder.jpg?width=1200",
"odin-ravens":"https://commons.wikimedia.org/wiki/Special:FilePath/Odin%20riding%20Sleipnir.jpg?width=1200",
"valhalla":"https://commons.wikimedia.org/wiki/Special:FilePath/Valhalla.jpg?width=1200"
};
const categoryImagePools={
 "Indian Mythology":[
  "https://commons.wikimedia.org/wiki/Special:FilePath/Krishna%20and%20Arjuna%20at%20Kurukshetra.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Nataraja%20at%20Chidambaram.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Ram%20Sita%20Lakshman%20Hanuman.jpg?width=1200"
 ],
 "Japanese Mythology":[
  "https://commons.wikimedia.org/wiki/Special:FilePath/Itsukushima%20Shrine%20Torii.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Fushimi%20Inari%20Taisha%20torii.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Mount%20Fuji%20from%20Lake%20Kawaguchi.jpg?width=1200"
 ],
 "Chinese Mythology":[
  "https://commons.wikimedia.org/wiki/Special:FilePath/Chinese%20dragon%20painting.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Forbidden%20City%20Beijing.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Chinese%20temple.jpg?width=1200"
 ],
 "Greek Mythology":[
  "https://commons.wikimedia.org/wiki/Special:FilePath/Parthenon%20in%20Athens.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Apollo%20Belvedere.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Greek%20amphora.jpg?width=1200"
 ],
 "Roman Mythology":[
  "https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20Forum%20Rome.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Pantheon%20Rome.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20mosaic.jpg?width=1200"
 ],
 "Macedonian Mythology":[
  "https://commons.wikimedia.org/wiki/Special:FilePath/Vergina%20Sun.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Ancient%20Pella%20Macedonia.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Mount%20Olympus.jpg?width=1200"
 ],
 "Egyptian Mythology":[
  "https://commons.wikimedia.org/wiki/Special:FilePath/Great%20Sphinx%20of%20Giza%20and%20Pyramids.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Temple%20of%20Karnak.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Egyptian%20hieroglyphs.jpg?width=1200"
 ],
 "Norse Mythology":[
  "https://commons.wikimedia.org/wiki/Special:FilePath/Odin%20by%20Georg%20von%20Rosen%2C%201881.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Viking%20ships.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Norse%20mythology%20illustration.jpg?width=1200"
 ],
 "Celtic Mythology":[
  "https://commons.wikimedia.org/wiki/Special:FilePath/Newgrange%20Ireland.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Celtic%20cross%20Monasterboice.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Cliffs%20of%20Moher.jpg?width=1200"
 ]
};
const explorerImageFor=(t)=>{
 if(explorerImages[t.slug])return explorerImages[t.slug];
 const pool=categoryImagePools[t.subcategory];
 return pool?pool[Math.abs((t.title||"").split("").reduce((a,c)=>a+c.charCodeAt(0),0))%pool.length]:imageFor(t);
};


const categoryOptions={
 history:[
  {slug:"indian-history",title:"Indian History",icon:"INDIA",text:"From ancient civilizations and empires to independence and modern India.",items:["Ancient India","Medieval India","Modern India"]},
  {slug:"international-history",title:"International History",icon:"WORLD",text:"Civilizations, revolutions, wars, discoveries and the forces that reshaped the world.",items:["Ancient Civilizations","Medieval Era","Renaissance","Industrial Age","World Wars","Contemporary History"]}
 ],
 mythology:[
  {slug:"indian-mythology",title:"Indian Mythology",icon:"ॐ",text:"Epics, deities, heroes and traditions from India's many regional and textual traditions."},
  {slug:"japanese-mythology",title:"Japanese Mythology",icon:"日",text:"Creation stories, kami, Amaterasu and the mythic traditions of Japan."},
  {slug:"chinese-mythology",title:"Chinese Mythology",icon:"龍",text:"Creation traditions, immortals, legendary rulers and classic Chinese mythic figures."},
  {slug:"greek-mythology",title:"Greek Mythology",icon:"Ω",text:"Olympian gods, heroes, monsters and epic journeys from Greek traditions."},
  {slug:"roman-mythology",title:"Roman Mythology",icon:"SPQR",text:"Roman gods, founding legends and stories shaped by Roman religious culture."},
  {slug:"macedonian-mythology",title:"Macedonian Mythology",icon:"☀",text:"Ancient Macedonian religious traditions, legends and the mythic world around Macedon."},
  {slug:"egyptian-mythology",title:"Egyptian Mythology",icon:"☥",text:"Ra, Osiris, Isis, Horus and the rich cosmology of ancient Egypt."},
  {slug:"norse-mythology",title:"Norse Mythology",icon:"ᛟ",text:"Odin, Thor, Loki, Yggdrasil and Ragnarök from Scandinavian traditions."},
  {slug:"celtic-mythology",title:"Celtic Mythology",icon:"☘",text:"Celtic gods, heroes, fae, sacred places and folklore from Ireland, Britain and related traditions."},
  {slug:"folklore-legends",title:"Folklore & Legends",icon:"♧",text:"Legendary heroes, spirits, monsters, tricksters and folk traditions from around the world."}
 ]};


const categoryVisuals={
 "indian-history":{
  eyebrow:"INDIAN HISTORY",title:"Ancient India",
  text:"Explore the dawn of one of the world's oldest civilizations — from the Indus Valley and the Vedic Age to the rise of great empires, religions, and ideas that shaped the Indian subcontinent.",
  hero:"https://commons.wikimedia.org/wiki/Special:FilePath/Vittala%20Temple%20Hampi.jpg?width=1800",
  statLabels:["Great Civilizations","Philosophy & Religion","Culture & Society"],
  quote:"In the soil of ancient India lie the roots of a timeless civilization."
 },
 "international-history":{
  eyebrow:"WORLD HISTORY",title:"International History",
  text:"Explore the rise and fall of civilizations, revolutions, wars, discoveries and the ideas that shaped our world. From ancient empires to the modern age, these are the stories of humanity.",
  hero:"https://commons.wikimedia.org/wiki/Special:FilePath/Colosseum%20in%20Rome%2C%20Italy%20-%20April%202008.jpg?width=1800",
  statLabels:["Ancient Civilizations","Empires & Kingdoms","Ideas & Revolutions","World at War"],
  quote:"Different lands, one human story."
 },
 "japanese-mythology":{eyebrow:"JAPANESE MYTHOLOGY",title:"Japanese Mythology",text:"Explore creation myths, kami, heroic legends and supernatural traditions from Japan's ancient chronicles and folklore.",hero:"https://commons.wikimedia.org/wiki/Special:FilePath/Itsukushima%20Shrine%20Torii.jpg?width=1800",statLabels:["Creation & Kami","Heroes & Legends","Spirits & Folklore"],quote:"Stories of kami, heroes and the spirit world."},
 "chinese-mythology":{eyebrow:"CHINESE MYTHOLOGY",title:"Chinese Mythology",text:"Enter a world of creation stories, immortals, legendary rulers, dragons, heroes and enduring folklore.",hero:"https://commons.wikimedia.org/wiki/Special:FilePath/Forbidden%20City%20Beijing.jpg?width=1800",statLabels:["Creation & Immortals","Heroes & Legends","Folklore & Spirits"],quote:"A mythic world shaped by heaven, earth and humanity."},
 "greek-mythology":{eyebrow:"GREEK MYTHOLOGY",title:"Greek Mythology",text:"Explore Olympian gods, heroes, monsters and epic journeys through the stories that shaped Greek cultural imagination.",hero:"https://commons.wikimedia.org/wiki/Special:FilePath/Parthenon%20in%20Athens.jpg?width=1800",statLabels:["Gods & Goddesses","Heroes & Monsters","Love & Tragedy"],quote:"Gods, heroes and monsters beneath the Mediterranean sun."},
 "roman-mythology":{eyebrow:"ROMAN MYTHOLOGY",title:"Roman Mythology",text:"Discover Roman gods, founding legends, sacred traditions and stories shaped by the religious culture of Rome.",hero:"https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20Forum%20Rome%20September%202014%2002.jpg?width=1800",statLabels:["Gods & Religion","Founding Legends","Heroes & Traditions"],quote:"Myths that travelled with Rome."},
 "macedonian-mythology":{eyebrow:"MACEDONIAN MYTHOLOGY",title:"Macedonian Mythology",text:"Explore ancient Macedonian religious traditions, legendary figures and the mythic world surrounding Macedon and its wider Greek cultural setting.",hero:"https://commons.wikimedia.org/wiki/Special:FilePath/Vergina%20Sun.jpg?width=1800",statLabels:["Gods & Rituals","Heroes & Legends","Macedon & Greece"],quote:"Legends from the crossroads of the ancient world."},
 "egyptian-mythology":{eyebrow:"EGYPTIAN MYTHOLOGY",title:"Egyptian Mythology",text:"Journey through the cosmology of ancient Egypt, from Ra, Osiris and Isis to Horus, Anubis and the world of the afterlife.",hero:"https://commons.wikimedia.org/wiki/Special:FilePath/Great%20Sphinx%20of%20Giza%20and%20Pyramids.jpg?width=1800",statLabels:["Gods & Goddesses","Creation & Cosmos","Death & Afterlife"],quote:"Where gods, kings and the afterlife meet."},
 "norse-mythology":{eyebrow:"NORSE MYTHOLOGY",title:"Norse Mythology",text:"Enter the world of Odin, Thor, Loki, Yggdrasil, Valhalla and Ragnarök through Scandinavian mythic traditions.",hero:"https://commons.wikimedia.org/wiki/Special:FilePath/Odin%20by%20Georg%20von%20Rosen%2C%201881.jpg?width=1800",statLabels:["Gods & Giants","Heroes & Sagas","Ragnarök & Fate"],quote:"A world suspended between gods, giants and fate."},
 "celtic-mythology":{eyebrow:"CELTIC MYTHOLOGY",title:"Celtic Mythology",text:"Explore Celtic gods, heroes, fae, sacred places and folklore from Ireland, Britain and related traditions.",hero:"https://commons.wikimedia.org/wiki/Special:FilePath/Newgrange%20Ireland.jpg?width=1800",statLabels:["Gods & Heroes","Fae & Spirits","Sacred Places"],quote:"Where legend lives in landscape and memory."},
 "folklore-legends":{eyebrow:"FOLKLORE & LEGENDS",title:"Folklore & Legends",text:"Discover legendary heroes, spirits, monsters, tricksters and folk traditions passed between generations around the world.",hero:"https://commons.wikimedia.org/wiki/Special:FilePath/Cliffs%20of%20Moher.jpg?width=1800",statLabels:["Heroes & Tricksters","Spirits & Monsters","Folk Traditions"],quote:"Every generation leaves a story behind."}
};
const categoryCardImages={
 "indian-history":[storyImages["chola-empire"],storyImages["vedic-age"],storyImages["mahabharata"],storyImages["buddha"],storyImages["jainism"],storyImages["vijayanagara"]],
 "international-history":[
  "https://commons.wikimedia.org/wiki/Special:FilePath/Ziggurat%20of%20Ur.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/All%20Gizah%20Pyramids.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Persepolis.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Parthenon%20in%20Athens.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Alexander%20the%20Great%20mosaic.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20Forum.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Great%20Wall%20of%20Han%20Dynasty.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Chichen%20Itz%C3%A1%20Pyramide.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Angkor%20Wat.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Stonehenge%20at%20sunset.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Knights%20of%20the%20Holy%20Ghost%20embarking%20on%20the%20crusades.jpg?width=1200",
  "https://commons.wikimedia.org/wiki/Special:FilePath/Mona%20Lisa%2C%20by%20Leonardo%20da%20Vinci%2C%20from%20C2RMF%20retouched.jpg?width=1200"
 ],
 "japanese-mythology":[explorerImages["izanagi-izanami"],explorerImages["susanoo-yamata"],explorerImages["amaterasu-cave"],explorerImages["momotaro"],categoryImagePools["Japanese Mythology"][0],categoryImagePools["Japanese Mythology"][1]],
 "chinese-mythology":[explorerImages["pangu-nuwa"],explorerImages["chang-e"],explorerImages["monkey-king"],categoryImagePools["Chinese Mythology"][0],categoryImagePools["Chinese Mythology"][1],categoryImagePools["Chinese Mythology"][2]],
 "greek-mythology":[explorerImages["perseus-medusa"],explorerImages["orpheus"],explorerImages["icarus"],explorerImages["jason-golden-fleece"],categoryImagePools["Greek Mythology"][0],categoryImagePools["Greek Mythology"][1]],
 "roman-mythology":[explorerImages["romulus-remus"],explorerImages["venus-rome"],explorerImages["janus-new-year"],categoryImagePools["Roman Mythology"][0],categoryImagePools["Roman Mythology"][1],categoryImagePools["Roman Mythology"][2]],
 "macedonian-mythology":[storyImages["alexander"],categoryImagePools["Macedonian Mythology"][0],categoryImagePools["Macedonian Mythology"][1],categoryImagePools["Macedonian Mythology"][2]],
 "egyptian-mythology":[explorerImages["thoth"],explorerImages["anubis"],explorerImages["book-of-dead"],categoryImagePools["Egyptian Mythology"][0],categoryImagePools["Egyptian Mythology"][1],categoryImagePools["Egyptian Mythology"][2]],
 "norse-mythology":[explorerImages["thor-hammer"],explorerImages["baldur"],explorerImages["odin-ravens"],explorerImages["valhalla"],categoryImagePools["Norse Mythology"][0],categoryImagePools["Norse Mythology"][1]],
 "celtic-mythology":[categoryImagePools["Celtic Mythology"][0],categoryImagePools["Celtic Mythology"][1],categoryImagePools["Celtic Mythology"][2],storyImages["greek-mythology"],storyImages["norse-mythology"]],
 "folklore-legends":[storyImages["greek-mythology"],storyImages["norse-mythology"],storyImages["egypt-osiris"],categoryImagePools["Celtic Mythology"][0],categoryImagePools["Greek Mythology"][2]]
};
const topicImageFor=(t,slug)=>{
 const explicit=explorerImages[t.slug];
 if(explicit)return explicit;
 const pool=categoryCardImages[slug]||categoryCardImages["international-history"];
 return pool[Math.abs(String(t.slug||t.title||"").split("").reduce((a,ch)=>a+ch.charCodeAt(0),0))%pool.length];
};

function Home(){
 const authState=useSession(),session=authState.session,[showSplash,setShowSplash]=useState(localStorage.getItem("toh_just_signed_in")==="1"),[t,setT]=useState([]),[q,setQ]=useState("");
 useEffect(()=>{api("/topics").then(setT)},[]);
 useEffect(()=>{if(showSplash)localStorage.removeItem("toh_just_signed_in")},[showSplash]);
 const f=t.filter(x=>String(x.title+" "+x.summary+" "+x.category+" "+x.era+" "+(x.tags||[])).toLowerCase().includes(q.toLowerCase()));
 if(showSplash)return <HistorySplash onDone={()=>{localStorage.removeItem("toh_just_signed_in");setShowSplash(false)}}/>;
 return <Layout><main>
  <section className="welcomeHero"><div className="eyebrow"><Sparkles size={15}/> YOUR HISTORY JOURNEY</div><h1>Welcome, <em>{session?.user?.name||"Explorer"}.</em></h1><p>Choose a path through the past. Follow a timeline, open a story, and stay as long as curiosity takes you.</p><div className="search"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search civilizations, events, myths..."/></div></section>
  <section className="section categorySection"><div className="sectionHead"><div><span className="kicker">CHOOSE YOUR PATH</span><h2>Where would you like to begin?</h2></div><span>Explore by world</span></div><div className="categoryGrid">
   <Link className="categoryCard historyCard" to="/collection/history"><div className="categoryIcon"><Landmark/></div><div><span className="label">HISTORY</span><h3>History</h3><p>Indian and international history, organized into eras, timelines and connected stories.</p></div><ChevronRight/></Link>
   <Link className="categoryCard mythologyCard" to="/collection/mythology"><div className="categoryIcon"><Star/></div><div><span className="label">MYTHOLOGY</span><h3>Mythological History</h3><p>Explore mythic traditions from India, Japan, China, Greece, Rome, Macedon, Egypt and the Norse world.</p></div><ChevronRight/></Link>
  </div></section>
  <section className="section"><div className="sectionHead"><div><span className="kicker">STORY LIBRARY</span><h2>Stories waiting to be opened</h2></div><span>{f.length} stories</span></div><div className="grid">{f.slice(0,12).map(x=><Link className="card" to={"/topic/"+x.slug} key={x.slug}><div className="cardImg"><img src={imageFor(x)} alt={x.title} loading="lazy" onError={e=>{e.currentTarget.style.display="none"}}/></div><div className="cardBody"><div className="meta"><span>{x.category}</span><span>{x.era}</span></div><h3>{x.title}</h3><p>{x.summary}</p><b>Open story →</b></div></Link>)}</div></section>
  <section className="journeyBanner"><div><span className="kicker">READ IT LIKE A STORY</span><h2>Not just facts. A journey through time.</h2><p>Every story has a beginning, turning points, people, consequences and a world around it.</p></div><Link className="pill" to="/timeline"><Clock3 size={16}/> Walk the timeline</Link></section>
 </main></Layout>
}

function ExplorerPage({kind,slug:forcedSlug}){
 const params=useParams(),slug=forcedSlug||params.slug;
 const [topics,setTopics]=useState([]),[loading,setLoading]=useState(true),[active,setActive]=useState("All"),[q,setQ]=useState("");
 const isHistory=kind==="history";
 const options=isHistory?categoryOptions.history:categoryOptions.mythology;
 const current=options.find(x=>x.slug===slug)||options[0];
 const visual=categoryVisuals[current.slug]||categoryVisuals["international-history"];
 useEffect(()=>{setLoading(true);api("/topics").then(d=>{setTopics(d);setLoading(false)}).catch(()=>setLoading(false))},[slug]);
 const map={"indian-mythology":"Indian Mythology","japanese-mythology":"Japanese Mythology","chinese-mythology":"Chinese Mythology","greek-mythology":"Greek Mythology","roman-mythology":"Roman Mythology","macedonian-mythology":"Macedonian Mythology","egyptian-mythology":"Egyptian Mythology","norse-mythology":"Norse Mythology","celtic-mythology":"Celtic Mythology"};
 const base=topics.filter(t=>isHistory?t.subcategory===current.title:(current.slug==="folklore-legends"?t.category==="Mythology":t.subcategory===map[current.slug]||(current.slug==="macedonian-mythology"&&/Alexander|Macedon/i.test(t.title+" "+t.summary))));
 const chips=isHistory
  ?(current.slug==="indian-history"?["All","Indus Valley","Vedic Age","Mahajanapadas","Empires","Philosophy & Religion","Science & Knowledge","Culture & Society"]:["All","Ancient World","Medieval Era","Renaissance","Industrial Age","World Wars","Contemporary","Empires","Culture & Society"])
  :["All","Creation","Gods & Goddesses","Heroes","Yokai (Spirits)","Demons (Oni)","Folklore","Love & Tragedy","Moral Tales"];
 const filtered=base.filter(t=>{
  const hay=(t.title+" "+t.summary+" "+t.era+" "+(t.tags||[]).join(" ")).toLowerCase();
  const matchQ=!q||hay.includes(q.toLowerCase());
  if(active==="All")return matchQ;
  const c=active.toLowerCase();
  const matchChip=hay.includes(c)
   ||(active==="Gods & Goddesses"&&/god|goddess|deity|kami/i.test(hay))
   ||(active==="Heroes"&&/hero|warrior|king|queen/i.test(hay))
   ||(active==="Folklore"&&/folklore|folk|legend/i.test(hay))
   ||(active==="Demons (Oni)"&&/demon|oni|monster|spirit/i.test(hay))
   ||(active==="Yokai (Spirits)"&&/yokai|spirit|fox|ghost/i.test(hay))
   ||(active==="Empires"&&/empire|dynasty|kingdom/i.test(hay))
   ||(active==="Rulers"&&/king|emperor|queen|ruler/i.test(hay))
   ||(active==="Revolutions"&&/revolution|rebellion|uprising/i.test(hay))
   ||(active==="World Wars"&&/war|world war/i.test(hay))
   ||(active==="Independence"&&/independence|national|colonial/i.test(hay))
   ||(active==="Science & Knowledge"&&/science|culture|renaissance|printing|knowledge/i.test(hay));
  return matchQ&&matchChip;
 });
 const sidebarItems=isHistory
  ?(current.slug==="indian-history"
    ?[{heading:"Indian History",items:[["Ancient India","indian-history"],["Medieval India","indian-history"],["Modern India","indian-history"]]}]
    :[{heading:"History Categories",items:categoryOptions.history.map(o=>[o.title,o.slug])},{heading:"Explore by Era",items:[["Ancient World","ancient"],["Medieval Era","medieval"],["Renaissance","renaissance"],["Industrial Age","industrial"],["World Wars","wars"],["Contemporary History","contemporary"]]}])
  :[{heading:"Mythology Traditions",items:categoryOptions.mythology.map(o=>[o.title,o.slug])},{heading:"Explore by Theme",items:[["Creation","theme"],["Gods & Goddesses","theme"],["Heroes","theme"],["Folklore & Legends","theme"]]}];
 const topicCount=loading?"…":filtered.length;
 return <Layout><main className="explorer">
  <aside className="explorerSide">
   <Link to={isHistory?"/collection/history":"/collection/mythology"} className="sideBack">← {isHistory?"Back to History":"Back to Mythology"}</Link>
   {sidebarItems.map((section,si)=><div className="sideSection" key={section.heading}>
    <h3>{section.heading}</h3>
    {section.items.map(([label,target])=>{
      const isCategory=target!=="theme"&&target!=="ancient"&&target!=="medieval"&&target!=="renaissance"&&target!=="industrial"&&target!=="wars"&&target!=="contemporary";
      const href=isCategory?(isHistory?"/history/"+target:"/mythology/"+target):"#";
      return <a key={label} href={href} className={"sideOption "+(label===current.title?"active":"")} onClick={e=>{if(!isCategory)e.preventDefault()}}><span className="sideIcon">{isHistory?(si===0?(label.includes("International")?"◉":"♜"):"◌"):"✦"}</span><span>{label}</span></a>
    })}
   </div>)}
   <div className="sideQuote">“{visual.quote}”<b>— Tales of History</b></div>
  </aside>
  <div className="explorerMain">
   <section className="explorerHero" style={{backgroundImage:"linear-gradient(90deg,rgba(15,15,14,.92),rgba(15,15,14,.22)),url("+visual.hero+")"}}>
    <div className="heroCopy"><span>{visual.eyebrow}</span><h1>{visual.title}</h1><p>{visual.text}</p>
     <div className="heroStats"><span><BookOpen/> {topicCount} Stories</span>{visual.statLabels.map((s,i)=><span key={s}>{i===0?<Landmark/>:i===1?<Globe2/>:i===2?<Sparkles/>:<ScrollText/>} {s}</span>)}</div>
    </div>
   </section>
   <section className="explorerToolbar"><div className="chipRow">{chips.map(ch=><button className={active===ch?"active":""} onClick={()=>setActive(ch)} key={ch}>{ch}</button>)}</div><label className="explorerSearch"><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search stories..."/></label></section>
   <section className="explorerStories"><div className="explorerTitle"><div><span className="kicker">STORY COLLECTION</span><h2>Stories from {visual.title}</h2></div><span>{topicCount} stories</span></div>
    <div className="storyCardGrid">{filtered.map(t=><Link className="explorerCard" to={"/topic/"+t.slug} key={t.slug}><div className="explorerCardImg"><img src={topicImageFor(t,current.slug)} alt={t.title} loading="lazy" onError={e=>{e.currentTarget.style.opacity=".15"}}/><span className="cardBadge">{t.era}</span></div><div className="explorerCardBody"><span className="cardType">{isHistory?(t.era||"HISTORY"):(t.tags?.[0]||"FOLKLORE").toUpperCase()}</span><h3>{t.title}</h3><p>{t.summary}</p><span className="openArrow">→</span></div></Link>)}</div>
    {!loading&&!filtered.length&&<div className="emptyState">No stories match this filter yet. Try “All” or another category.</div>}
   </section>
  </div>
 </main></Layout>
}
function Collection(){
 const{type}=useParams(),isMyth=type==="mythology";
 const options=isMyth?categoryOptions.mythology:categoryOptions.history;
 return <Layout><main className="collectionChooser"><section className="chooserHero"><span className="eyebrow">{isMyth?"MYTHOLOGICAL HISTORY":"HISTORY"}</span><h1>{isMyth?"Choose a mythology":"Choose a history category"}</h1><p>{isMyth?"Enter a complete tradition and explore its gods, heroes, monsters, demons, spirits and folklore.":"Enter a historical world and explore it through richly illustrated stories, timelines and sources."}</p></section><section className="chooserGrid">{options.map(o=><Link className="chooserCard" to={(isMyth?"/mythology/":"/history/")+o.slug} key={o.slug}><span className="chooserIcon">{o.icon}</span><div><span className="label">{isMyth?"MYTHOLOGY":"HISTORY"}</span><h2>{o.title}</h2><p>{o.text}</p></div><ChevronRight/></Link>)}</section></main></Layout>
}

function Topic(){
 const{slug}=useParams(),[t,setT]=useState(),[q,setQ]=useState(""),[a,setA]=useState(""),[notes,setNotes]=useState([]);
 useEffect(()=>{api("/topics/"+slug).then(setT)},[slug]);
 if(!t)return <Layout><div className="loading">Opening story…</div></Layout>;
 const paragraphs=String(t.content||"").split(/\n\n|(?<=\.) (?=[A-Z])/).filter(Boolean);
 const ask=async()=>{if(!q.trim())return;setA((await api("/ai/ask",{method:"POST",body:JSON.stringify({slug,question:q})})).answer)};
 const getNotes=async()=>setNotes((await api("/ai/exam-notes",{method:"POST",body:JSON.stringify({slug})})).notes);
 return <Layout><main><div className="storyHero" style={{backgroundImage:"linear-gradient(90deg,rgba(17,18,22,.96),rgba(17,18,22,.48)),url("+imageFor(t)+")"}}><div><span className="label">{t.category} · {t.subcategory||t.era}</span><h1>{t.title}</h1><p>{t.summary}</p></div></div><div className="storybookLayout"><article className="storybook"><div className="storyMeta"><span><Clock3 size={15}/>{t.startYear<0?Math.abs(t.startYear)+" BCE":t.startYear||"Unknown"} — {t.endYear<0?Math.abs(t.endYear)+" BCE":t.endYear||"Present"}</span><span><BookOpen size={15}/>{t.category==="Mythology"?"Mythic tradition":"Historical story"}</span></div><div className="chapterTitle"><span>THE STORY</span><h2>Turn the page</h2></div>{paragraphs.map((p,i)=><p className={i===0?"dropcap storyParagraph":"storyParagraph"} key={i}>{p}</p>)}<div className="figuresBlock"><span className="kicker">PEOPLE & IDEAS TO REMEMBER</span><div className="figures">{(t.keyFigures||[]).map(x=><span key={x}>{x}</span>)}</div></div><div className="storyTimeline"><span className="kicker">TIMELINE</span><div><b>{t.startYear<0?Math.abs(t.startYear)+" BCE":t.startYear}</b><span></span><b>{t.endYear<0?Math.abs(t.endYear)+" BCE":t.endYear}</b></div></div><div className="resources"><h3>Sources for this story</h3>{(t.sources||[]).map(s=><a href={s} target="_blank" rel="noreferrer" key={s}>{s}</a>)}</div></article><aside className="tutor"><div className="tutorTop"><div><span className="kicker">HISTORY TUTOR</span><h3>Ask while you read</h3></div><Sparkles/></div><textarea value={q} onChange={e=>setQ(e.target.value)} placeholder="Ask about a person, event, cause or consequence…"/><button className="dark" onClick={ask}>Ask tutor</button><div className="suggestions">{["Explain this simply","What caused this?","What happened next?"].map(x=><button key={x} onClick={()=>setQ(x)}>{x}</button>)}</div>{a&&<div className="answer">{a}</div>}<button className="outline" onClick={getNotes}>Generate exam notes</button>{notes.length>0&&<div className="answer">{notes.map(n=><p key={n}>• {n}</p>)}</div>}</aside></div></main></Layout>
}

function Timeline(){
 const[t,setT]=useState([]);useEffect(()=>{api("/topics").then(setT)},[]);
 return <Layout><main className="section narrow"><span className="kicker">MASTER TIMELINE</span><h1>Walk through the past</h1><p className="lead">Every entry opens the full story in the same window.</p><div className="master">{t.filter(x=>x.startYear).sort((a,b)=>a.startYear-b.startYear).map(x=><Link to={"/topic/"+x.slug} key={x.slug}><span>{x.startYear<0?Math.abs(x.startYear)+" BCE":x.startYear}</span><div><b>{x.title}</b><small>{x.category} · {x.subcategory||x.era}</small></div><span>→</span></Link>)}</div></main></Layout>
}

function Login(){
 const nav=useNavigate(),[mode,setMode]=useState("login"),[form,setForm]=useState({name:"",email:"",password:"",confirm:""}),[err,setErr]=useState(""),[busy,setBusy]=useState(false);
 const submit=async e=>{e.preventDefault();setErr("");if(mode==="register"&&form.password!==form.confirm){setErr("Passwords do not match.");return}if(form.password.length<6){setErr("Password must be at least 6 characters.");return}setBusy(true);try{const d=await api("/auth/"+mode,{method:"POST",body:JSON.stringify({name:form.name.trim(),email:form.email.trim(),password:form.password})});localStorage.setItem("toh_token",d.token);localStorage.setItem("toh_just_signed_in","1");window.location.assign("/");}catch(x){setErr(x.message)}finally{setBusy(false)}};
 return <Layout><main className="auth"><div className="authCard"><span className="kicker">YOUR LEARNING SPACE</span><h1>{mode==="login"?"Welcome back":"Create your account"}</h1><p>{mode==="login"?"Sign in to continue your learning journey.":"Create an account to save your learning progress."}</p><form onSubmit={submit}>{mode==="register"&&<input required minLength="2" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>}<input required type="email" placeholder="Email address" autoComplete="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><input required minLength="6" type="password" placeholder="Password (6+ characters)" autoComplete={mode==="login"?"current-password":"new-password"} value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>{mode==="register"&&<input required minLength="6" type="password" placeholder="Confirm password" autoComplete="new-password" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})}/>} {err&&<small className="error">{err}</small>}<button className="dark" disabled={busy}>{busy?(mode==="login"?"Signing in…":"Creating account…"):(mode==="login"?"Sign in":"Create account")}</button></form><button className="switch" onClick={()=>{setErr("");setMode(mode==="login"?"register":"login");setForm({name:"",email:form.email,password:"",confirm:""})}}>{mode==="login"?"New here? Create an account":"Already have an account? Sign in"}</button></div></main></Layout>
}
function About(){return <Layout><main className="section narrow"><span className="kicker">THE IDEA</span><h1>Learn the past as a connected story.</h1><p className="lead">The Tales of History brings narratives, chronology and contextual learning together in one focused environment.</p><div className="aboutGrid">{["Structured library","Interactive timelines","Storybook reading","Contextual tutor"].map(x=><div className="aboutCard" key={x}><BookOpen/><h3>{x}</h3><p>Designed to make historical learning easier to navigate, revisit and question.</p></div>)}</div></main></Layout>}
class AppErrorBoundary extends React.Component{
 constructor(props){super(props);this.state={error:null}}
 static getDerivedStateFromError(error){return {error}}
 componentDidCatch(error){console.error("Tales of History runtime error:",error)}
 render(){
  if(this.state.error)return <div style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:"30px",background:"#f5f0e7",fontFamily:"system-ui"}}><div style={{maxWidth:"720px",background:"#fffdf8",border:"1px solid #ddd3c4",borderRadius:"18px",padding:"30px",boxShadow:"0 18px 40px rgba(40,30,20,.1)"}}><div style={{fontSize:"11px",letterSpacing:".15em",fontWeight:700,color:"#8a6b32"}}>TALES OF HISTORY</div><h1 style={{fontFamily:"Georgia,serif"}}>The page encountered an error.</h1><p style={{color:"#666"}}>The deployment is running, but the browser encountered a frontend error. Refresh once after the deployment completes.</p><details><summary>Technical details</summary><pre style={{whiteSpace:"pre-wrap",fontSize:"12px",marginTop:"15px"}}>{String(this.state.error?.stack||this.state.error)}</pre></details><button onClick={()=>window.location.reload()} style={{marginTop:"18px",padding:"11px 16px",border:0,borderRadius:"10px",background:"#242527",color:"#fff",cursor:"pointer"}}>Reload</button></div></div>;
  return this.props.children;
 }
}
function App(){return <Routes><Route path="/" element={<Home/>}/><Route path="/collection/:type" element={<Collection/>}/><Route path="/history/:slug" element={<ExplorerPage kind="history"/>}/><Route path="/mythology/:slug" element={<ExplorerPage kind="mythology"/>}/><Route path="/topic/:slug" element={<Topic/>}/><Route path="/timeline" element={<Timeline/>}/><Route path="/login" element={<Login/>}/><Route path="/about" element={<About/>}/></Routes>}
createRoot(document.getElementById("root")).render(<AppErrorBoundary><BrowserRouter><App/></BrowserRouter></AppErrorBoundary>);