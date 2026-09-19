import React,{useEffect,useMemo,useState}from"react";
import{createRoot}from"react-dom/client";
import{BrowserRouter,Link,Route,Routes,useNavigate,useParams}from"react-router-dom";
import{BookOpen,ChevronRight,Clock3,Globe2,Landmark,Menu,Search,Sparkles,ScrollText,Shield,Star,UserRound,X}from"lucide-react";
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
 return <div className="app"><header><Link to="/" className="brand"><span className="mark"><Landmark size={19}/></span>The Tales of History</Link><button className="mobileBtn" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav className={open?"open":""}><Link to="/">Explore</Link><Link to="/timeline">Timeline</Link><Link to="/about">About</Link>{session?<><span className="welcome">Hi, {session.user?.name?.split(" ")[0]||"Learner"}</span><button className="signin" onClick={logout}>Sign out</button></>:<Link to="/login" className="signin">Sign in</Link>}</nav></header>{children}<footer><div><b>The Tales of History</b><span>Read the past. Explore the story. Understand the world.</span></div><span>Interactive history & mythology library</span></footer></div>
}

function HistorySplash({onDone}){
 useEffect(()=>{const t=setTimeout(onDone,1500);return()=>clearTimeout(t)},[onDone]);
 return <div className="historySplash"><div className="splashOrnament"><div className="orbit orbit1"></div><div className="orbit orbit2"></div><Landmark size={46}/></div><span>THE TALES OF HISTORY</span><b>The past is opening...</b><div className="splashLine"><i/></div></div>
}

const storyImages={
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
 "ramayana":"https://commons.wikimedia.org/wiki/Special:FilePath/Rama%20and%20Sita%20in%20the%20forest.jpg?width=1200",
 "mahabharata":"https://commons.wikimedia.org/wiki/Special:FilePath/Kurukshetra%20war.jpg?width=1200",
 "egypt-osiris":"https://commons.wikimedia.org/wiki/Special:FilePath/Osiris%2C%20Egyptian%20god.jpg?width=1200"
};
const imageFor=(t)=>storyImages[t.slug]||t.image;

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
  {slug:"norse-mythology",title:"Norse Mythology",icon:"ᛟ",text:"Odin, Thor, Loki, Yggdrasil and Ragnarök from Scandinavian traditions."}
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

function MythologyPage(){
 const{slug}=useParams(),[topics,setTopics]=useState([]),[loading,setLoading]=useState(true);
 const option=categoryOptions.mythology.find(x=>x.slug===slug);
 useEffect(()=>{api("/topics").then(d=>{setTopics(d);setLoading(false)})},[]);
 const map={"indian-mythology":"Indian Mythology","japanese-mythology":"Japanese Mythology","chinese-mythology":"Chinese Mythology","greek-mythology":"Greek Mythology","roman-mythology":"Roman Mythology","macedonian-mythology":"Macedonian Mythology","egyptian-mythology":"Egyptian Mythology","norse-mythology":"Norse Mythology"};
 const stories=topics.filter(t=>t.subcategory===map[slug]||(slug==="macedonian-mythology"&&/Alexander|Macedon/i.test(t.title+" "+t.summary)));
 if(!option)return <Layout><div className="loading">Tradition not found.</div></Layout>;
 return <Layout><main className="collectionPage"><section className="collectionHero mythologyDetailHero"><span className="eyebrow">MYTHOLOGICAL TRADITION</span><h1>{option.title}</h1><p>{option.text}</p></section><section className="section"><Link className="backLink" to="/collection/mythology">← Back to mythologies</Link><div className="sectionHead mythDetailHead"><div><span className="kicker">STORY COLLECTION</span><h2>Stories from {option.title}</h2></div><span>{loading?"…":stories.length+" stories"}</span></div><div className="mythStoryGrid">{stories.map(t=><Link className="mythStoryCard" to={"/topic/"+t.slug} key={t.slug}><div className="cardImg"><img src={imageFor(t)} alt={t.title} loading="lazy"/></div><div className="cardBody"><span className="label">{t.era}</span><h3>{t.title}</h3><p>{t.summary}</p><b>Open story →</b></div></Link>)}</div>{!loading&&!stories.length&&<div className="emptyState">More stories for this tradition are being added.</div>}</section></main></Layout>
}

function Collection(){
 const{type}=useParams(),[sub,setSub]=useState(""),[era,setEra]=useState(""),[topics,setTopics]=useState([]),[loading,setLoading]=useState(true);
 const isMyth=type==="mythology",options=isMyth?categoryOptions.mythology:categoryOptions.history;
 useEffect(()=>{setLoading(true);api("/topics").then(d=>{setTopics(d);setLoading(false)})},[]);
 const filtered=useMemo(()=>{if(!sub)return[];if(isMyth){const map={"indian-mythology":"Indian Mythology","japanese-mythology":"Japanese Mythology","chinese-mythology":"Chinese Mythology","greek-mythology":"Greek Mythology","roman-mythology":"Roman Mythology","macedonian-mythology":"Macedonian Mythology","egyptian-mythology":"Egyptian Mythology","norse-mythology":"Norse Mythology"};return topics.filter(t=>t.subcategory===map[sub]||(sub==="macedonian-mythology"&&/Alexander|Macedon/i.test(t.title+" "+t.summary)))}const map={"indian-history":t=>t.subcategory==="Indian History","international-history":t=>t.subcategory==="International History"};return topics.filter(t=>t.category==="History"&&map[sub]?.(t)&&(era?t.era===era||String(t.era).toLowerCase().includes(era.toLowerCase()):true))},[sub,topics,isMyth,era]);
 return <Layout><main className="collectionPage"><section className="collectionHero"><span className="eyebrow">{isMyth?"MYTHOLOGICAL TRADITIONS":"HISTORY THROUGH TIME"}</span><h1>{isMyth?"Choose a mythology":"Choose a history path"}</h1><p>{isMyth?"Explore each tradition as its own world of characters, beliefs, symbols and stories.":"Move from ancient worlds to modern turning points through organized historical paths."}</p></section><section className="section"><div className="optionGrid">{options.map(o=>isMyth?<Link className="optionCard" to={"/mythology/"+o.slug} key={o.slug}><span className="optionGlyph">{o.icon}</span><div><span className="label">MYTHOLOGY</span><h3>{o.title}</h3><p>{o.text}</p></div><ChevronRight/></Link>:<button className={"optionCard "+(sub===o.slug?"selected":"")} onClick={()=>{setSub(o.slug);setEra("")}} key={o.slug}><span className="optionGlyph">{o.icon}</span><div><span className="label">{isMyth?"MYTHOLOGY":"HISTORY"}</span><h3>{o.title}</h3><p>{o.text}</p></div><ChevronRight/></button>)}</div></section>{!isMyth&&sub&&<section className="section eraSection"><span className="kicker">NARROW THE JOURNEY</span><h2>{sub==="indian-history"?"Indian History":"International History"} by era</h2><div className="eraChips">{options.find(o=>o.slug===sub)?.items.map(e=><button key={e} onClick={()=>setEra(era===e?"":e)}>{e}</button>)}</div></section>}<section className="section storySection">{sub&&<><div className="sectionHead"><div><span className="kicker">STORY COLLECTION</span><h2>{options.find(o=>o.slug===sub)?.title}</h2></div><span>{loading?"…":filtered.length+" stories"}</span></div><div className="timelineRail">{filtered.sort((a,b)=>(a.startYear||0)-(b.startYear||0)).map(t=><Link className="storyRow" to={"/topic/"+t.slug} key={t.slug}><span className="storyYear">{t.startYear<0?Math.abs(t.startYear)+" BCE":t.startYear||"—"}</span><div><h3>{t.title}</h3><p>{t.summary}</p></div><span className="storyArrow">Open story <ChevronRight size={17}/></span></Link>)}</div>{!loading&&!filtered.length&&<div className="emptyState">More stories for this tradition are being added.</div>}</>}</section></main></Layout>
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
function App(){return <Routes><Route path="/" element={<Home/>}/><Route path="/collection/:type" element={<Collection/>}/><Route path="/mythology/:slug" element={<MythologyPage/>}/><Route path="/topic/:slug" element={<Topic/>}/><Route path="/timeline" element={<Timeline/>}/><Route path="/login" element={<Login/>}/><Route path="/about" element={<About/>}/></Routes>}
createRoot(document.getElementById("root")).render(<BrowserRouter><App/></BrowserRouter>);