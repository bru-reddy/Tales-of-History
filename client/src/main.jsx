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
function Layout({children}){\n const[open,setOpen]=useState(false),authState=useSession(),session=authState.session;\n const logout=()=>{localStorage.removeItem("toh_token");window.location.href="/"};\n const first=session?.user?.name?.split(" ")[0]||"Explorer";\n return <div className="app"><header className="topHeader"><Link to="/" className="brand brandPro"><span className="mark"><Landmark size={21}/></span><span><b>Tales of History</b><small>Stories That Shaped Our World</small></span></Link><button className="mobileBtn" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav className={"topNav "+(open?"open":"")}><Link to="/">Home</Link><Link to="/collection/history">History</Link><Link to="/collection/mythology">Mythology</Link><Link to="/timeline">Timeline</Link><Link to="/ai">AI Tutor</Link><Link to="/about">About</Link><button className="iconNav"><Search size={20}/></button><button className="iconNav"><Bell size={19}/></button>{session?<div className="profileNav"><span>{first.charAt(0).toUpperCase()}</span><small>Welcome, <b>{first}</b></small><ChevronDown size={15}/></div>:<Link to="/login" className="signin">Sign in</Link>}</nav></header>{children}<footer><div><b>The Tales of History</b><span>Read the past. Explore the story. Understand the world.</span></div><span>Interactive history & mythology library</span></footer></div>\n}
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
const explorerImageFor=t=>explorerImages[t.slug]||imageFor(t);


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
  {slug:"norse-mythology",title:"Norse Mythology",icon:"ᛟ",text:"Odin, Thor, Loki, Yggdrasil and Ragnarök from Scandinavian traditions."},\n  {slug:"celtic-mythology",title:"Celtic Mythology",icon:"☘",text:"Celtic gods, heroes, fae, sacred places and folklore from Ireland, Britain and related traditions."},\n  {slug:"folklore-legends",title:"Folklore & Legends",icon:"♧",text:"Legendary heroes, spirits, monsters, tricksters and folk traditions from around the world."}
 ]};

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
 const params=useParams(), slug=forcedSlug||params.slug;
 const [topics,setTopics]=useState([]),[loading,setLoading]=useState(true),[active,setActive]=useState("All"),[q,setQ]=useState("");
 const isHistory=kind==="history";
 const options=isHistory?categoryOptions.history:categoryOptions.mythology;
 const current=options.find(x=>x.slug===slug)||options[0];
 const historyImage=current.slug==="indian-history"?"https://commons.wikimedia.org/wiki/Special:FilePath/Taj%20Mahal%20in%20March%202018.jpg?width=1800":"https://commons.wikimedia.org/wiki/Special:FilePath/Parthenon%20in%20Athens.jpg?width=1800";
 const mythImages={
  "indian-mythology":"https://commons.wikimedia.org/wiki/Special:FilePath/Krishna%20and%20Arjuna%20at%20Kurukshetra.jpg?width=1800",
  "japanese-mythology":"https://commons.wikimedia.org/wiki/Special:FilePath/Itsukushima%20Shrine%20Torii.jpg?width=1800",
  "chinese-mythology":"https://commons.wikimedia.org/wiki/Special:FilePath/Chinese%20dragon%20painting.jpg?width=1800",
  "greek-mythology":"https://commons.wikimedia.org/wiki/Special:FilePath/Parthenon%20in%20Athens.jpg?width=1800",
  "roman-mythology":"https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20Forum%20Rome.jpg?width=1800",
  "macedonian-mythology":"https://commons.wikimedia.org/wiki/Special:FilePath/Vergina%20Sun.jpg?width=1800",
  "egyptian-mythology":"https://commons.wikimedia.org/wiki/Special:FilePath/Great%20Sphinx%20of%20Giza%20and%20Pyramids.jpg?width=1800",
  "norse-mythology":"https://commons.wikimedia.org/wiki/Special:FilePath/Odin%20by%20Georg%20von%20Rosen%2C%201881.jpg?width=1800"
 };
 useEffect(()=>{setLoading(true);api("/topics").then(d=>{setTopics(d);setLoading(false)})},[slug]);
 const map={"indian-mythology":"Indian Mythology","japanese-mythology":"Japanese Mythology","chinese-mythology":"Chinese Mythology","greek-mythology":"Greek Mythology","roman-mythology":"Roman Mythology","macedonian-mythology":"Macedonian Mythology","egyptian-mythology":"Egyptian Mythology","norse-mythology":"Norse Mythology"};
 const base=topics.filter(t=>isHistory?t.subcategory===current.title:(t.subcategory===map[current.slug]||(current.slug==="macedonian-mythology"&&/Alexander|Macedon/i.test(t.title+" "+t.summary))));
 const chips=isHistory?["All","Ancient","Medieval","Empires","Rulers","Revolutions","Renaissance","Industrial Age","World Wars","Independence","Science & Culture"]:["All","Creation","Gods & Goddesses","Heroes","Yokai (Spirits)","Demons (Oni)","Folklore","Love & Tragedy","Moral Tales"];
 const filtered=base.filter(t=>{
   const hay=(t.title+" "+t.summary+" "+t.era+" "+(t.tags||[]).join(" ")).toLowerCase();
   const matchQ=!q||hay.includes(q.toLowerCase());
   let matchChip=true;
   if(active!=="All"){
    const c=active.toLowerCase();
    matchChip=hay.includes(c)||((active==="Gods & Goddesses")&&/god|goddess|deity|kami/i.test(hay))||((active==="Heroes")&&/hero|warrior|king|queen/i.test(hay))||((active==="Folklore")&&/folklore|folk|legend/i.test(hay))||((active==="Demons (Oni)")&&/demon|oni|monster|spirit/i.test(hay))||((active==="Yokai (Spirits)")&&/yokai|spirit|fox|ghost/i.test(hay))||((active==="Empires")&&/empire|dynasty|kingdom/i.test(hay))||((active==="Rulers")&&/king|emperor|queen|ruler/i.test(hay))||((active==="Revolutions")&&/revolution|rebellion|uprising/i.test(hay))||((active==="World Wars")&&/war|world war/i.test(hay))||((active==="Independence")&&/independence|national|colonial/i.test(hay))||((active==="Science & Culture")&&/science|culture|renaissance|printing/i.test(hay));
   }
   return matchQ&&matchChip;
 });
 const sideOptions=isHistory?categoryOptions.history:categoryOptions.mythology;
 const heroImage=isHistory?historyImage:(mythImages[current.slug]||"https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=85");
 const count=loading?"…":filtered.length;
 return <Layout><main className="explorer">
  <aside className="explorerSide">
   <Link to={isHistory?"/collection/history":"/collection/mythology"} className="sideBack">← {isHistory?"History":"Mythological History"}</Link>
   <h3>{isHistory?"History Categories":"Mythology Traditions"}</h3>
   {sideOptions.map(o=><Link key={o.slug} to={(isHistory?"/history/":"/mythology/")+o.slug} className={"sideOption "+(o.slug===current.slug?"active":"")}><span className="sideIcon">{o.icon}</span><span>{o.title}</span></Link>)}
   {!isHistory&&<><Link to="/mythology/celtic-mythology" className="sideOption"><span className="sideIcon">☘</span><span>Celtic Mythology</span></Link><Link to="/mythology/folklore-legends" className="sideOption"><span className="sideIcon">♧</span><span>Folklore & Legends</span></Link></>}
   <div className="sideQuote">“In every culture, myths are memories of the human soul.”<b>— Tales of History</b></div>
  </aside>
  <div className="explorerMain">
   <section className="explorerHero" style={{backgroundImage:"linear-gradient(90deg,rgba(15,15,14,.9),rgba(15,15,14,.25)),url("+heroImage+")"}}>
    <div className="heroCopy"><span>{isHistory?"HISTORICAL HISTORY":"MYTHOLOGICAL HISTORY"}</span><h1>{current.title}</h1><p>{current.text}</p>
     <div className="heroStats"><span><BookOpen/> {count} Stories</span><span><Landmark/> {isHistory?"Eras & Events":"Gods & Goddesses"}</span><span><ScrollText/> {isHistory?"Archives & Sources":"Folklore & Legends"}</span></div>
    </div>
   </section>
   <section className="explorerToolbar"><div className="chipRow">{chips.map(c=><button className={active===c?"active":""} onClick={()=>setActive(c)} key={c}>{c}</button>)}</div><label className="explorerSearch"><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search stories..."/></label></section>
   <section className="explorerStories"><div className="explorerTitle"><div><span className="kicker">STORY COLLECTION</span><h2>Stories from {current.title}</h2></div><span>{count} stories</span></div>
    <div className="storyCardGrid">{filtered.map(t=><Link className="explorerCard" to={"/topic/"+t.slug} key={t.slug}><div className="explorerCardImg"><img src={explorerImageFor(t)} alt={t.title} loading="lazy" onError={e=>{e.currentTarget.style.opacity=".15"}}/><span className="cardBadge">{isHistory?t.era:t.era}</span></div><div className="explorerCardBody"><span className="cardType">{isHistory?(t.era||"HISTORY"):(t.tags?.[0]||"FOLKLORE").toUpperCase()}</span><h3>{t.title}</h3><p>{t.summary}</p><span className="openArrow">→</span></div></Link>)}</div>
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
function App(){return <Routes><Route path="/" element={<Home/>}/><Route path="/collection/:type" element={<Collection/>}/><Route path="/history/:slug" element={<ExplorerPage kind="history"/>}/><Route path="/mythology/:slug" element={<ExplorerPage kind="mythology"/>}/><Route path="/mythology/:slug" element={<MythologyPage/>}/><Route path="/topic/:slug" element={<Topic/>}/><Route path="/timeline" element={<Timeline/>}/><Route path="/login" element={<Login/>}/><Route path="/about" element={<About/>}/></Routes>}
createRoot(document.getElementById("root")).render(<BrowserRouter><App/></BrowserRouter>);