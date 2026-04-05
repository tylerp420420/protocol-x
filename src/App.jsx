import React, { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, AreaChart, Area, LineChart, Line } from "recharts";
import { supabase } from "./supabase";

function useIsMobile(){const[m,s]=useState(window.innerWidth<768);useEffect(()=>{const h=()=>s(window.innerWidth<768);window.addEventListener('resize',h);return()=>window.removeEventListener('resize',h);},[]);return m;}
const ADMIN_EMAIL="tylerparkinson420420@gmail.com";
const C={bg:"#08090d",cd:"rgba(255,255,255,0.025)",bd:"rgba(255,255,255,0.06)",ac:"#f59e0b",ag:"rgba(245,158,11,0.12)",cy:"#06b6d4",cg:"rgba(6,182,212,0.12)",gn:"#10b981",gg:"rgba(16,185,129,0.12)",rd:"#ef4444",rg:"rgba(239,68,68,0.12)",tx:"#f1f5f9",sb:"#64748b",mt:"#334155",sf:"rgba(255,255,255,0.05)",gl:"rgba(15,16,22,0.85)",pp:"#8b5cf6",or:"#f97316"};
const RK=[{n:"Initiate",x:0,i:"🌑",c:"#64748b"},{n:"Apprentice",x:100,i:"🌒",c:"#94a3b8"},{n:"Operator",x:300,i:"🌓",c:"#f59e0b"},{n:"Specialist",x:600,i:"🌔",c:"#f97316"},{n:"Elite",x:1000,i:"🌕",c:"#06b6d4"},{n:"Master",x:1750,i:"⚡",c:"#8b5cf6"},{n:"Sovereign",x:3000,i:"👑",c:"#eab308"},{n:"Ascendant",x:5000,i:"💎",c:"#ec4899"}];
const XP={h:10,dg:8,wg:20,mg:50,yg:150,j:15,w:15,f:5,b:10,s:5,pd:20,n:5,wt:5,rt:10};
const QS=["Discipline is choosing between what you want now and what you want most.","You don't rise to the level of your goals. You fall to the level of your systems.","The pain of discipline is nothing like the pain of disappointment.","Small daily improvements are the key to staggering long-term results.","Champions do ordinary things extraordinarily well.","We are what we repeatedly do. Excellence is not an act, but a habit.","Hard choices, easy life. Easy choices, hard life.","Don't count the days. Make the days count.","Success isn't owned. It's leased, and rent is due every day.","Motivation gets you started. Habit keeps you going.","Be so good they can't ignore you.","Comfort is the enemy of achievement.","Execution over everything.","Your habits will determine your future.","Stop wishing. Start doing.","Obsessed is a word the lazy use to describe the dedicated.","Results happen over time, not overnight. Stay consistent.","The grind you put in today is the advantage you have tomorrow.","Suffer the pain of discipline or suffer the pain of regret.","What you do every day matters more than what you do once in a while."];
const JTAGS=["Mindset","Trading","Health","Personal","Gratitude","Goals","Productivity"];
const td=()=>new Date().toISOString().split("T")[0];
const dn2=d=>["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date(d).getDay()];
const doy=()=>{const n=new Date(),s=new Date(n.getFullYear(),0,0);return Math.floor((n-s)/864e5);};
const wkk=()=>{const d=new Date(),o=new Date(d.getFullYear(),0,1);return d.getFullYear()+"-W"+Math.ceil((((d-o)/864e5)+o.getDay()+1)/7);};
const mkk=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0");};
const ykk=()=>String(new Date().getFullYear());
const tq=()=>QS[doy()%QS.length];
const gr=x=>{let r=RK[0];for(const k of RK){if(x>=k.x)r=k;else break;}return r;};
const nrk=x=>{for(const k of RK){if(x<k.x)return k;}return null;};

const DD=()=>({xp:0,habits:[{id:"h1",name:"Morning Routine",active:true},{id:"h2",name:"Exercise",active:true},{id:"h3",name:"Read 30 mins",active:true},{id:"h4",name:"No Social Media before 12pm",active:true},{id:"h5",name:"Gratitude Practice",active:true}],habitLog:{},goals:{daily:[],weekly:[],monthly:[],yearly:[]},goalArchive:[],journal:[],workouts:[],transactions:[],books:[],sleepLog:{},meals:[],macroTargets:{calories:2500,protein:150,carbs:300,fat:80},weightLog:[],weightTarget:{weight:null,date:null},recentScans:[],waterLog:{},waterTarget:2500,trades:[],routine:[{id:"r1",time:"06:00",name:"Wake Up & Hydrate"},{id:"r2",time:"06:30",name:"Gym / Training"},{id:"r3",time:"08:00",name:"Shower & Prep"},{id:"r4",time:"08:30",name:"Deep Work Block 1"},{id:"r5",time:"12:00",name:"Lunch"},{id:"r6",time:"13:00",name:"Deep Work Block 2"},{id:"r7",time:"17:00",name:"Review & Plan Tomorrow"},{id:"r8",time:"21:00",name:"Wind Down & Read"},{id:"r9",time:"22:00",name:"Lights Out"}],routineSat:[],routineSun:[],routineLog:{},streak:0,bestStreak:0,lastDate:td(),lastWeek:wkk(),lastMonth:mkk(),lastYear:ykk()});

async function loadUD(uid){try{const{data}=await supabase.from('user_data').select('data').eq('id',uid).single();return data&&data.data?{...DD(),...data.data}:DD();}catch{return DD();}}
async function saveUD(uid,d){try{await supabase.from('user_data').upsert({id:uid,data:d,updated_at:new Date().toISOString()});}catch(e){console.error(e);}}
let stm=null;function dsave(uid,d){if(stm)clearTimeout(stm);stm=setTimeout(()=>saveUD(uid,d),500);}

function calcPS(d){const t=td(),tl=d.habitLog[t]||[],act=d.habits.filter(h=>h.active);const hP=act.length?(tl.length/act.length)*100:0;const ri=d[rtKey(dayType(t))]||[],rd=(d.routineLog||{})[t]||[];const rP=ri.length?(rd.length/ri.length)*100:0;const dg=d.goals.daily||[];const dgP=dg.length?(dg.filter(g=>g.completed).length/dg.length)*100:0;const hJ=d.journal.some(j=>j.date===t)?100:0;const hS=d.sleepLog[t]?100:0;const hM=(d.meals||[]).some(m=>m.date===t)?100:0;const hW=d.workouts.some(w=>w.date===t)?100:0;return Math.round([hP,rP,dgP,hJ,hS,hM,hW].reduce((a,b)=>a+b,0)/7);}

function dayType(s){const dw=new Date(s+"T12:00:00").getDay();return dw===6?"sat":dw===0?"sun":"week";}
function rtKey(dt){return dt==="sat"?"routineSat":dt==="sun"?"routineSun":"routine";}

// UI Components
function Cd({children,style,glow,onClick}){return <div onClick={onClick} style={{background:C.cd,border:"1px solid "+C.bd,borderRadius:16,padding:18,cursor:onClick?"pointer":"default",...(glow?{boxShadow:"0 0 30px "+glow}:{}),...style}}>{children}</div>;}
function SC({label,value,sub,color}){return <Cd style={{flex:1,minWidth:110}}><div style={{color:C.sb,fontSize:9.5,letterSpacing:1.5,fontWeight:600,marginBottom:6,fontFamily:"Outfit,sans-serif"}}>{label}</div><div style={{color:color||C.tx,fontSize:22,fontWeight:800,fontFamily:"Outfit,sans-serif",lineHeight:1}}>{value}</div>{sub&&<div style={{color:C.sb,fontSize:10.5,marginTop:4}}>{sub}</div>}</Cd>;}
function SH({title,sub,right}){return <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:18}}><div><h2 style={{color:C.tx,fontSize:22,fontWeight:800,margin:0,fontFamily:"Outfit,sans-serif"}}>{title}</h2>{sub&&<p style={{color:C.sb,fontSize:12.5,margin:"3px 0 0"}}>{sub}</p>}</div>{right}</div>;}
function Bt({children,onClick,v,style:s}){const b={primary:{background:"linear-gradient(135deg,#f59e0b,#f97316)",color:"#000",fontWeight:700},secondary:{background:C.sf,color:C.tx,fontWeight:600},danger:{background:C.rg,color:"#ef4444",fontWeight:600}};return <button onClick={onClick} style={{border:"none",borderRadius:10,padding:"9px 15px",cursor:"pointer",fontSize:12.5,display:"flex",alignItems:"center",gap:5,fontFamily:"Plus Jakarta Sans,sans-serif",...b[v||"primary"],...s}}>{children}</button>;}
function Inp({value,onChange,onKeyDown,placeholder,type,style:s}){return <input value={value} onChange={onChange} onKeyDown={onKeyDown} placeholder={placeholder} type={type||"text"} style={{background:C.sf,border:"1px solid "+C.bd,borderRadius:10,padding:"10px 14px",color:C.tx,fontSize:13,outline:"none",fontFamily:"Plus Jakarta Sans,sans-serif",...s}}/>;}
function PB({val,max,col}){return <div style={{height:5,background:C.sf,borderRadius:4,overflow:"hidden",flex:1}}><div style={{height:"100%",borderRadius:4,background:col,width:Math.min(100,(val/Math.max(max,1))*100)+"%"}}/></div>;}

// AUTH
function AuthScreen({onAuth}){
  const[mode,setMode]=useState("signin"),[email,setEmail]=useState(""),[pass,setPass]=useState(""),[pass2,setPass2]=useState(""),[err,setErr]=useState(""),[ld,sLd]=useState(false);
  const submit=async()=>{setErr("");sLd(true);const em=email.toLowerCase().trim();
    if(mode==="signup"){if(pass!==pass2){setErr("Passwords don't match.");sLd(false);return;}if(pass.length<6){setErr("Password must be 6+ characters.");sLd(false);return;}const{data,error}=await supabase.auth.signUp({email:em,password:pass});if(error){setErr(error.message);sLd(false);return;}if(em===ADMIN_EMAIL){onAuth(data.user);}else{setErr("PENDING");}}
    else{const{data,error}=await supabase.auth.signInWithPassword({email:em,password:pass});if(error){setErr(error.message);sLd(false);return;}const{data:profArr}=await supabase.rpc('check_user_status',{user_id:data.user.id});const prof=profArr&&profArr[0]?profArr[0]:null;if(em===ADMIN_EMAIL){onAuth(data.user);sLd(false);return;}if(!prof||prof.status==='pending'){await supabase.auth.signOut();setErr("PENDING");sLd(false);return;}if(prof.status==='denied'){await supabase.auth.signOut();setErr("Access denied by administrator.");sLd(false);return;}onAuth(data.user);}sLd(false);};
  if(err==="PENDING")return <div style={{width:"100vw",height:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{maxWidth:440,width:"100%",padding:"0 20px",textAlign:"center"}}><div style={{width:56,height:56,borderRadius:16,background:"linear-gradient(135deg,#f59e0b,#f97316)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:900,color:"#000",margin:"0 auto 20px",fontFamily:"Outfit,sans-serif"}}>PX</div><div style={{color:C.ac,fontSize:22,fontWeight:800,fontFamily:"Outfit,sans-serif",marginBottom:8}}>AWAITING APPROVAL</div><div style={{color:C.sb,fontSize:14,lineHeight:1.6,marginBottom:24}}>Your request to join Protocol X has been submitted. The administrator must verify your access. VIP only.</div><Cd style={{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 20px"}}><div style={{width:10,height:10,borderRadius:5,background:C.ac,animation:"pulse 2s infinite"}}/><span style={{color:C.ac,fontWeight:600,fontSize:13}}>PENDING VERIFICATION</span></Cd><div style={{marginTop:24}}><button onClick={()=>{setErr("");setMode("signin");}} style={{background:"none",border:"none",color:C.sb,cursor:"pointer",fontSize:13}}>← Back to Sign In</button></div></div></div>;
  return <div style={{width:"100vw",height:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{maxWidth:420,width:"100%",padding:"0 20px"}}><div style={{textAlign:"center",marginBottom:32}}><div style={{width:52,height:52,borderRadius:14,background:"linear-gradient(135deg,#f59e0b,#f97316)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:900,color:"#000",margin:"0 auto 16px",fontFamily:"Outfit,sans-serif"}}>PX</div><div style={{color:C.tx,fontSize:26,fontWeight:800,fontFamily:"Outfit,sans-serif"}}>PROTOCOL X</div><div style={{color:C.sb,fontSize:11,letterSpacing:3,fontWeight:600,marginTop:2}}>THE OPERATING SYSTEM FOR THE 0.1%</div></div><Cd style={{padding:28}}><div style={{display:"flex",gap:4,marginBottom:24}}>{["signin","signup"].map(m=><button key={m} onClick={()=>{setMode(m);setErr("");}} style={{flex:1,padding:"10px",borderRadius:10,border:mode===m?"1px solid "+C.ac:"1px solid "+C.bd,background:mode===m?C.ag:"transparent",color:mode===m?C.ac:C.sb,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Outfit,sans-serif"}}>{m==="signin"?"Sign In":"Sign Up"}</button>)}</div><div style={{marginBottom:14}}><label style={{color:C.sb,fontSize:10.5,fontWeight:600,letterSpacing:1,display:"block",marginBottom:6}}>EMAIL</label><Inp value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" style={{width:"100%",boxSizing:"border-box"}}/></div><div style={{marginBottom:14}}><label style={{color:C.sb,fontSize:10.5,fontWeight:600,letterSpacing:1,display:"block",marginBottom:6}}>PASSWORD</label><Inp value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="••••••••" style={{width:"100%",boxSizing:"border-box"}}/></div>{mode==="signup"&&<div style={{marginBottom:14}}><label style={{color:C.sb,fontSize:10.5,fontWeight:600,letterSpacing:1,display:"block",marginBottom:6}}>CONFIRM PASSWORD</label><Inp value={pass2} onChange={e=>setPass2(e.target.value)} type="password" placeholder="••••••••" style={{width:"100%",boxSizing:"border-box"}}/></div>}{err&&err!=="PENDING"&&<div style={{color:C.rd,fontSize:12,marginBottom:12,padding:"8px 12px",background:C.rg,borderRadius:8}}>{err}</div>}<Bt onClick={submit} style={{width:"100%",justifyContent:"center",padding:"12px",fontSize:14}}>{ld?"Processing...":mode==="signin"?"Authenticate →":"Request Access to Protocol X →"}</Bt>{mode==="signup"&&<div style={{color:C.sb,fontSize:11,textAlign:"center",marginTop:14}}>VIP access requires admin approval.</div>}</Cd><div style={{textAlign:"center",marginTop:20}}><div style={{display:"inline-flex",alignItems:"center",gap:6,color:C.sb,fontSize:11}}><div style={{width:6,height:6,borderRadius:3,background:C.gn}}/> PROTOCOL X ONLINE</div></div></div></div>;
}

// ADMIN
function AdminPanel(){
  const[users,setU]=useState([]),[ld,sL]=useState(false);
  const reload=async()=>{const{data}=await supabase.rpc('sync_and_get_profiles');setU(data||[]);sL(true);};
  useEffect(()=>{reload();},[]);
  const approve=async em=>{await supabase.rpc('update_user_status',{target_email:em,new_status:'approved'});reload();};
  const deny=async em=>{await supabase.rpc('update_user_status',{target_email:em,new_status:'denied'});reload();};
  const remove=async em=>{if(em===ADMIN_EMAIL)return;await supabase.rpc('delete_user_profile',{target_email:em});reload();};
  const pending=users.filter(u=>u.status==="pending"),approved=users.filter(u=>u.status==="approved"),denied=users.filter(u=>u.status==="denied");
  if(!ld)return <div style={{color:C.sb}}>Loading...</div>;
  return <div><SH title="Admin Panel" sub="Manage access to Protocol X."/><div style={{display:"flex",gap:12,marginBottom:20}}><SC label="TOTAL" value={users.length} color={C.cy}/><SC label="PENDING" value={pending.length} color={pending.length>0?C.ac:C.sb}/><SC label="APPROVED" value={approved.length} color={C.gn}/><SC label="DENIED" value={denied.length} color={C.rd}/></div>
    {pending.length>0&&<div style={{marginBottom:20}}><div style={{color:C.ac,fontSize:10,letterSpacing:1.5,fontWeight:700,marginBottom:10}}>⚠ PENDING</div>{pending.map(u=><Cd key={u.email} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",marginBottom:8,borderColor:"rgba(245,158,11,0.2)",background:C.ag}}><div><div style={{color:C.tx,fontSize:14,fontWeight:600}}>{u.email}</div></div><div style={{display:"flex",gap:8}}><Bt onClick={()=>approve(u.email)} style={{padding:"7px 14px"}}>✓ Approve</Bt><Bt v="danger" onClick={()=>deny(u.email)} style={{padding:"7px 14px"}}>✗ Deny</Bt></div></Cd>)}</div>}
    {approved.length>0&&<div style={{marginBottom:20}}><div style={{color:C.gn,fontSize:10,letterSpacing:1.5,fontWeight:700,marginBottom:10}}>APPROVED</div>{approved.map(u=><Cd key={u.email} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 18px",marginBottom:6}}><div style={{color:C.tx,fontSize:13,fontWeight:600}}>{u.email}{u.is_admin&&<span style={{color:C.ac,fontSize:10,marginLeft:8}}>ADMIN</span>}</div>{!u.is_admin&&<Bt v="danger" onClick={()=>deny(u.email)} style={{padding:"5px 10px",fontSize:11}}>Revoke</Bt>}</Cd>)}</div>}
    {denied.length>0&&<div><div style={{color:C.rd,fontSize:10,letterSpacing:1.5,fontWeight:700,marginBottom:10}}>DENIED</div>{denied.map(u=><Cd key={u.email} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 18px",marginBottom:6,opacity:0.6}}><span style={{color:C.tx,fontSize:13}}>{u.email}</span><Bt v="secondary" onClick={()=>approve(u.email)} style={{padding:"5px 10px",fontSize:11}}>Re-approve</Bt></Cd>)}</div>}
    <Bt v="secondary" onClick={reload} style={{marginTop:12}}>↻ Refresh</Bt>
  </div>;
}

// TODAY
function Today({data:d,setPage:sp}){const ps=calcPS(d),tl=d.habitLog[td()]||[],act=d.habits.filter(h=>h.active);const ri=(d[rtKey(dayType(td()))]||[]).sort((a,b)=>a.time.localeCompare(b.time)),rd=(d.routineLog||{})[td()]||[];const dg=d.goals.daily||[],tj=d.journal.filter(j=>j.date===td());const psC=ps>=80?C.gn:ps>=50?C.ac:ps>=25?C.or:C.rd;const ci=2*Math.PI*44;return <div><div style={{marginBottom:6}}><div style={{color:C.sb,fontSize:11,fontWeight:600,letterSpacing:2,marginBottom:3,fontFamily:"Outfit,sans-serif"}}>{new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"}).toUpperCase()}</div><h1 style={{color:C.tx,fontSize:28,fontWeight:800,margin:0,fontFamily:"Outfit,sans-serif"}}>Good {new Date().getHours()<12?"Morning":new Date().getHours()<18?"Afternoon":"Evening"}</h1></div><div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:14,margin:"18px 0"}}><Cd glow={psC+"22"} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:22}}><svg width="96" height="96" viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke={C.sf} strokeWidth="7"/><circle cx="50" cy="50" r="44" fill="none" stroke={psC} strokeWidth="7" strokeDasharray={ci} strokeDashoffset={ci*(1-ps/100)} strokeLinecap="round" transform="rotate(-90 50 50)"/><text x="50" y="46" textAnchor="middle" fill={psC} fontSize="24" fontWeight="900" fontFamily="Outfit">{ps}</text><text x="50" y="62" textAnchor="middle" fill={C.sb} fontSize="7" fontWeight="600" fontFamily="Outfit" letterSpacing="1">PROTOCOL X</text></svg><div style={{color:C.sb,fontSize:10,marginTop:6,letterSpacing:1.5,fontWeight:600}}>DAILY SCORE</div></Cd><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><Cd onClick={()=>sp("habits")} style={{cursor:"pointer",padding:14}}><div style={{color:C.sb,fontSize:9.5,fontWeight:600}}>HABITS</div><div style={{color:C.tx,fontSize:20,fontWeight:800,fontFamily:"Outfit,sans-serif"}}>{tl.length}/{act.length}</div><PB val={tl.length} max={act.length} col={C.gn}/></Cd><Cd onClick={()=>sp("routine")} style={{cursor:"pointer",padding:14}}><div style={{color:C.sb,fontSize:9.5,fontWeight:600}}>ROUTINE</div><div style={{color:C.tx,fontSize:20,fontWeight:800,fontFamily:"Outfit,sans-serif"}}>{rd.length}/{ri.length}</div><PB val={rd.length} max={ri.length} col={C.cy}/></Cd><Cd onClick={()=>sp("goals")} style={{cursor:"pointer",padding:14}}><div style={{color:C.sb,fontSize:9.5,fontWeight:600}}>DAILY GOALS</div><div style={{color:C.tx,fontSize:20,fontWeight:800,fontFamily:"Outfit,sans-serif"}}>{dg.filter(g=>g.completed).length}/{dg.length}</div><PB val={dg.filter(g=>g.completed).length} max={dg.length} col={C.ac}/></Cd><Cd onClick={()=>sp("journal")} style={{cursor:"pointer",padding:14}}><div style={{color:C.sb,fontSize:9.5,fontWeight:600}}>JOURNAL</div><div style={{color:tj.length?C.gn:C.sb,fontSize:16,fontWeight:700,marginTop:4}}>{tj.length?"✓ Logged":"Not yet"}</div></Cd></div></div><Cd style={{marginBottom:14}}><div style={{color:C.sb,fontSize:9.5,letterSpacing:1.5,fontWeight:600,marginBottom:8}}>NEXT UP</div>{ri.filter(r=>!rd.includes(r.id)).slice(0,3).map(r=><div key={r.id} style={{display:"flex",gap:12,padding:"5px 0"}}><span style={{color:C.ac,fontSize:12,fontWeight:700,fontFamily:"Outfit,sans-serif",minWidth:44}}>{r.time}</span><span style={{color:C.tx,fontSize:13}}>{r.name}</span></div>)}{ri.filter(r=>!rd.includes(r.id)).length===0&&<div style={{color:C.gn,fontSize:13,fontWeight:600}}>✓ Protocol X executed</div>}</Cd><Cd style={{background:"linear-gradient(135deg,rgba(245,158,11,0.05),rgba(6,182,212,0.03))",borderColor:"rgba(245,158,11,0.1)"}}><span style={{color:C.ac}}>✦</span> <span style={{color:C.sb,fontSize:10,letterSpacing:2,fontWeight:600}}>DAILY SIGNAL</span><div style={{color:C.tx,fontSize:14,fontStyle:"italic",fontWeight:500,lineHeight:1.5,opacity:0.85,marginTop:5}}>"{tq()}"</div></Cd></div>;}

// DASHBOARD
function Dash({data:d,setPage:sp}){const rk=gr(d.xp),nx=nrk(d.xp),tl=d.habitLog[td()]||[],act=d.habits.filter(h=>h.active);const comp=act.length?Math.round((tl.length/act.length)*100):0;const ci=2*Math.PI*44,pr=nx?(d.xp-rk.x)/(nx.x-rk.x):1,ps=calcPS(d);const l7=Array.from({length:7},(_,i)=>{const dt=new Date();dt.setDate(dt.getDate()-(6-i));const k=dt.toISOString().split("T")[0],l=d.habitLog[k]||[];return{day:dn2(k),pct:act.length?Math.round((l.length/act.length)*100):0};});const dm=[{d:"Habits",s:Math.min(100,comp)},{d:"Fitness",s:Math.min(100,d.workouts.length*12)},{d:"Finance",s:Math.min(100,d.transactions.length*8)},{d:"Books",s:Math.min(100,d.books.length*15)},{d:"Sleep",s:Math.min(100,Object.keys(d.sleepLog).length*10)},{d:"Food",s:Math.min(100,(d.meals||[]).length*5)}];return <div><SH title="Command Centre"/><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12,marginBottom:18}}><Cd glow={C.ag} style={{display:"flex",alignItems:"center",gap:12,padding:16}}><svg width="70" height="70" viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke={C.sf} strokeWidth="7"/><circle cx="50" cy="50" r="44" fill="none" stroke={rk.c} strokeWidth="7" strokeDasharray={ci} strokeDashoffset={ci*(1-pr)} strokeLinecap="round" transform="rotate(-90 50 50)"/><text x="50" y="46" textAnchor="middle" fill={C.tx} fontSize="18" fontWeight="800" fontFamily="Outfit">{rk.i}</text><text x="50" y="62" textAnchor="middle" fill={C.sb} fontSize="8" fontWeight="600" fontFamily="Outfit">{rk.n.toUpperCase()}</text></svg><div><div style={{color:C.sb,fontSize:9,letterSpacing:2,fontWeight:600}}>XP</div><div style={{color:C.ac,fontSize:24,fontWeight:900,fontFamily:"Outfit,sans-serif"}}>{d.xp.toLocaleString()}</div></div></Cd><SC label="PROTOCOL X" value={ps+"%"} color={ps>=80?C.gn:ps>=50?C.ac:C.rd}/><SC label="EXECUTION" value={comp+"%"} sub={tl.length+"/"+act.length} color={comp===100?C.gn:C.cy}/><SC label="STREAK" value={d.streak} sub={"Best: "+d.bestStreak} color={d.streak>0?C.ac:C.sb}/></div><div style={{display:"grid",gridTemplateColumns:"1.6fr 1fr",gap:14,marginBottom:18}}><Cd style={{padding:16}}><div style={{color:C.sb,fontSize:9.5,letterSpacing:1.5,fontWeight:600,marginBottom:12}}>7-DAY</div><ResponsiveContainer width="100%" height={120}><BarChart data={l7} barCategoryGap="25%"><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:C.sb,fontSize:10}}/><YAxis hide domain={[0,100]}/><Tooltip contentStyle={{background:C.gl,border:"1px solid "+C.bd,borderRadius:10,color:C.tx,fontSize:11}} formatter={v=>[v+"%"]}/><Bar dataKey="pct" radius={[5,5,0,0]} fill={C.ac}/></BarChart></ResponsiveContainer></Cd><Cd style={{padding:16}}><div style={{color:C.sb,fontSize:9.5,letterSpacing:1.5,fontWeight:600,marginBottom:10}}>DOMAINS</div><ResponsiveContainer width="100%" height={140}><RadarChart data={dm} cx="50%" cy="50%" outerRadius="70%"><PolarGrid stroke={C.bd}/><PolarAngleAxis dataKey="d" tick={{fill:C.sb,fontSize:9.5,fontWeight:600}}/><Radar dataKey="s" stroke={C.ac} fill={C.ac} fillOpacity={0.15} strokeWidth={2}/></RadarChart></ResponsiveContainer></Cd></div><Cd style={{background:"linear-gradient(135deg,rgba(245,158,11,0.05),rgba(6,182,212,0.03))",borderColor:"rgba(245,158,11,0.1)"}}><span style={{color:C.ac}}>✦</span> <span style={{color:C.sb,fontSize:10,letterSpacing:2,fontWeight:600}}>DAILY SIGNAL</span><div style={{color:C.tx,fontSize:14,fontStyle:"italic",fontWeight:500,lineHeight:1.5,opacity:0.85,marginTop:5}}>"{tq()}"</div></Cd></div>;}

// HABITS
function Habits({data:d,setData:sd,sxp}){const tl=d.habitLog[td()]||[],act=d.habits.filter(h=>h.active),[nh,snh]=useState("");const comp=act.length?Math.round((tl.length/act.length)*100):0;const tog=id=>{const log=tl.slice();const ix=log.indexOf(id);let xd=0;if(ix>=0){log.splice(ix,1);xd=-XP.h;}else{log.push(id);xd=XP.h;}if(tl.length!==act.length&&log.length===act.length)xd+=XP.pd;if(tl.length===act.length&&log.length!==act.length)xd-=XP.pd;sd({...d,habitLog:{...d.habitLog,[td()]:log},xp:Math.max(0,d.xp+xd)});if(xd>0)sxp(xd);};const add=()=>{if(!nh.trim())return;sd({...d,habits:[...d.habits,{id:"h"+Date.now(),name:nh.trim(),active:true}]});snh("");};return <div><SH title="Habits" sub="Daily protocol."/><div style={{display:"flex",gap:12,marginBottom:18}}><SC label="TODAY" value={tl.length+"/"+act.length} color={C.cy}/><SC label="DONE" value={comp+"%"} color={comp===100?C.gn:C.tx}/><SC label="STREAK" value={d.streak} color={C.ac}/></div>{comp===100&&<Cd style={{marginBottom:14,background:C.gg,padding:14}}><span style={{color:C.gn,fontWeight:700}}>🎯 PERFECT</span><span style={{color:C.sb,fontSize:12}}> +{XP.pd} bonus</span></Cd>}{act.map(h=>{const done=tl.includes(h.id);return <Cd key={h.id} onClick={()=>tog(h.id)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",padding:"13px 18px",marginBottom:6,background:done?C.gg:C.cd,borderColor:done?"rgba(16,185,129,0.15)":C.bd}}><div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:24,height:24,borderRadius:7,border:done?"none":"2px solid "+C.mt,background:done?"linear-gradient(135deg,#10b981,#059669)":"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{done&&<span style={{color:"#fff",fontSize:12,fontWeight:900}}>✓</span>}</div><span style={{color:done?C.gn:C.tx,fontSize:13.5,fontWeight:600,textDecoration:done?"line-through":"none",opacity:done?0.7:1}}>{h.name}</span></div><div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{color:C.ac,fontSize:11,fontWeight:700,opacity:done?1:0.3}}>+{XP.h}</span><button onClick={e=>{e.stopPropagation();sd({...d,habits:d.habits.filter(x=>x.id!==h.id)});}} style={{background:"none",border:"none",cursor:"pointer",color:C.mt,fontSize:15}}>×</button></div></Cd>})}<Cd style={{display:"flex",gap:10,marginTop:10}}><Inp value={nh} onChange={e=>snh(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")add();}} placeholder="Add habit..." style={{flex:1}}/><Bt onClick={add}>+ Add</Bt></Cd></div>;}

// ROUTINE
function Routine({data:d,setData:sd,sxp}){const dow=new Date().getDay();const defTab=dow===6?"sat":dow===0?"sun":"week";const[tab,sTab]=useState(defTab),[nt,sNT]=useState(""),[nTime,sNTime]=useState("06:00"),[ed,sEd]=useState(false);const rl=d.routineLog||{},done=rl[td()]||[];const rk=rtKey(tab);useEffect(()=>{if(tab!=="week"){const k=tab==="sat"?"routineSat":"routineSun";if((!d[k]||d[k].length===0)&&(d.routine||[]).length>0)sd({...d,[k]:[...(d.routine||[])]});}},[tab]);const items=(d[rk]||[]).sort((a,b)=>a.time.localeCompare(b.time));const comp=items.length?Math.round((done.length/items.length)*100):0;const isToday=tab===defTab;const tog=id=>{const log=done.slice();const ix=log.indexOf(id);let xd=ix>=0?-XP.rt:XP.rt;if(ix>=0)log.splice(ix,1);else log.push(id);if(done.length!==items.length&&log.length===items.length)xd+=XP.pd;if(done.length===items.length&&log.length!==items.length)xd-=XP.pd;sd({...d,routineLog:{...rl,[td()]:log},xp:Math.max(0,d.xp+xd)});if(ix<0)sxp(xd);};const add=()=>{if(!nt.trim())return;sd({...d,[rk]:[...(d[rk]||[]),{id:"r"+Date.now(),time:nTime,name:nt.trim()}]});sNT("");};const tabs=[{k:"week",l:"Mon–Fri"},{k:"sat",l:"Saturday"},{k:"sun",l:"Sunday"}];return <div><SH title="Routine" sub="Non-negotiables." right={<button onClick={()=>sEd(!ed)} style={{background:C.sf,border:"1px solid "+C.bd,borderRadius:8,padding:"5px 12px",color:ed?C.ac:C.sb,cursor:"pointer",fontSize:11,fontWeight:600}}>{ed?"Done":"✎ Edit"}</button>}/><div style={{display:"flex",gap:5,marginBottom:16}}>{tabs.map(t=><button key={t.k} onClick={()=>{sTab(t.k);sEd(false);}} style={{flex:1,padding:"9px",borderRadius:10,border:tab===t.k?"1px solid "+C.cy:"1px solid "+C.bd,background:tab===t.k?C.cy+"15":C.cd,color:tab===t.k?C.cy:C.sb,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"Outfit,sans-serif",position:"relative"}}>{t.l}{t.k===defTab&&<span style={{position:"absolute",top:5,right:7,width:5,height:5,borderRadius:"50%",background:C.ac,display:"inline-block"}}/>}</button>)}</div><div style={{display:"flex",gap:12,marginBottom:18}}><SC label="PROGRESS" value={comp+"%"} sub={done.length+"/"+items.length} color={comp===100?C.gn:C.cy}/><SC label="XP/BLOCK" value={"+"+XP.rt} color={C.ac}/></div>{!isToday&&<Cd style={{marginBottom:14,background:"rgba(6,182,212,0.05)",borderColor:"rgba(6,182,212,0.18)",padding:"10px 14px"}}><span style={{color:C.cy,fontSize:12,fontWeight:600}}>✎ Editing {tab==="sat"?"Saturday":"Sunday"} routine — not tracked today</span></Cd>}{comp===100&&isToday&&<Cd style={{marginBottom:14,background:C.gg,padding:14}}><span style={{color:C.gn,fontWeight:700}}>⚡ PROTOCOL X EXECUTED</span></Cd>}{items.map((r,i)=>{const dn=isToday&&done.includes(r.id);const isN=isToday&&!dn&&(i===0||done.includes(items[i-1]?.id));return <Cd key={r.id} onClick={ed||!isToday?undefined:()=>tog(r.id)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:ed||!isToday?"default":"pointer",padding:"12px 18px",marginBottom:5,background:dn?C.gg:isN?"rgba(245,158,11,0.04)":C.cd,borderColor:dn?"rgba(16,185,129,0.15)":isN?"rgba(245,158,11,0.15)":C.bd}}><div style={{display:"flex",alignItems:"center",gap:14}}><span style={{color:dn?C.gn:isN?C.ac:C.sb,fontSize:12,fontWeight:700,fontFamily:"Outfit,sans-serif",minWidth:44}}>{r.time}</span><div style={{width:2,height:22,background:dn?C.gn:isN?C.ac:C.bd}}/>{!ed&&isToday&&<div style={{width:22,height:22,borderRadius:6,border:dn?"none":"2px solid "+(isN?C.ac:C.mt),background:dn?"linear-gradient(135deg,#10b981,#059669)":"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{dn&&<span style={{color:"#fff",fontSize:11,fontWeight:900}}>✓</span>}</div>}<span style={{color:dn?C.gn:C.tx,fontSize:13.5,fontWeight:600,textDecoration:dn?"line-through":"none",opacity:dn?0.7:1}}>{r.name}</span></div><div style={{display:"flex",gap:6}}>{isN&&!ed&&<span style={{background:C.ag,color:C.ac,padding:"2px 7px",borderRadius:5,fontSize:9.5,fontWeight:700}}>NEXT</span>}{ed&&<button onClick={()=>sd({...d,[rk]:(d[rk]||[]).filter(x=>x.id!==r.id)})} style={{background:"none",border:"none",cursor:"pointer",color:C.rd,fontSize:15}}>×</button>}</div></Cd>})}{ed&&<Cd style={{display:"flex",gap:8,marginTop:10}}><Inp value={nTime} onChange={e=>sNTime(e.target.value)} type="time" style={{width:100}}/><Inp value={nt} onChange={e=>sNT(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")add();}} placeholder="Block name..." style={{flex:1}}/><Bt onClick={add}>+ Add</Bt></Cd>}</div>;}

// GOALS
const GT=[{k:"daily",l:"Daily",c:C.cy,xp:XP.dg},{k:"weekly",l:"Weekly",c:C.ac,xp:XP.wg},{k:"monthly",l:"Monthly",c:C.pp,xp:XP.mg},{k:"yearly",l:"Yearly",c:C.gn,xp:XP.yg}];
function Goals({data:d,setData:sd,sxp}){const[tab,sT]=useState("daily"),[ng,sng]=useState(""),[sa,ssa]=useState(false);const ti=GT.find(t=>t.k===tab),gs=d.goals[tab]||[],aG=gs.filter(g=>!g.completed),dG=gs.filter(g=>g.completed),arcs=d.goalArchive.filter(a=>a.type===tab);const addG=()=>{if(!ng.trim())return;sd({...d,goals:{...d.goals,[tab]:[...gs,{id:"g"+Date.now(),name:ng.trim(),completed:false}]}});sng("");};const togG=id=>{const up=gs.map(g=>g.id===id?{...g,completed:!g.completed}:g);const gl=gs.find(g=>g.id===id);const xd=gl.completed?-ti.xp:ti.xp;sd({...d,goals:{...d.goals,[tab]:up},xp:Math.max(0,d.xp+xd)});if(xd>0)sxp(xd);};const delG=id=>{const g=gs.find(x=>x.id===id);sd({...d,goals:{...d.goals,[tab]:gs.filter(x=>x.id!==id)},xp:g&&g.completed?Math.max(0,d.xp-ti.xp):d.xp});};const arcG=()=>{if(!gs.length)return;sd({...d,goals:{...d.goals,[tab]:[]},goalArchive:[{id:"a"+Date.now(),type:tab,date:td(),periodLabel:tab==="daily"?td():tab==="weekly"?wkk():tab==="monthly"?mkk():ykk(),goals:gs.map(g=>({name:g.name,completed:g.completed})),totalCompleted:dG.length,total:gs.length},...d.goalArchive]});};return <div><SH title="Goals"/><div style={{display:"flex",gap:5,marginBottom:18}}>{GT.map(t=>{const cnt=(d.goals[t.k]||[]).filter(g=>!g.completed).length;return <button key={t.k} onClick={()=>{sT(t.k);ssa(false);}} style={{flex:1,padding:"10px",borderRadius:11,border:tab===t.k?"1px solid "+t.c:"1px solid "+C.bd,background:tab===t.k?t.c+"15":C.cd,color:tab===t.k?t.c:C.sb,fontSize:12.5,fontWeight:700,cursor:"pointer",fontFamily:"Outfit,sans-serif"}}>{t.l}{cnt>0&&<span style={{marginLeft:5,background:t.c+"25",color:t.c,padding:"1px 6px",borderRadius:5,fontSize:10}}>{cnt}</span>}</button>})}</div><Cd style={{marginBottom:14}}><div style={{display:"flex",gap:10}}><Inp value={ng} onChange={e=>sng(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")addG();}} placeholder={"Add "+ti.l.toLowerCase()+" goal..."} style={{flex:1}}/><Bt onClick={addG}>+ Add</Bt></div></Cd>{aG.map(g=><Cd key={g.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 18px",marginBottom:6}}><div style={{display:"flex",alignItems:"center",gap:12}}><button onClick={()=>togG(g.id)} style={{width:24,height:24,borderRadius:7,border:"2px solid "+C.mt,background:"transparent",cursor:"pointer"}}/><span style={{color:C.tx,fontSize:13.5,fontWeight:600}}>{g.name}</span></div><div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{color:ti.c,fontSize:11,fontWeight:700}}>+{ti.xp}</span><button onClick={()=>delG(g.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.mt,fontSize:15}}>×</button></div></Cd>)}{dG.map(g=><Cd key={g.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 18px",marginBottom:5,opacity:0.5}}><div style={{display:"flex",alignItems:"center",gap:12}}><div onClick={()=>togG(g.id)} style={{width:24,height:24,borderRadius:7,background:"linear-gradient(135deg,#10b981,#059669)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><span style={{color:"#fff",fontWeight:900,fontSize:11}}>✓</span></div><span style={{color:C.tx,fontSize:13,textDecoration:"line-through"}}>{g.name}</span></div><button onClick={()=>delG(g.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.mt,fontSize:15}}>×</button></Cd>)}{gs.length>0&&<Bt v="secondary" onClick={arcG} style={{width:"100%",justifyContent:"center",marginTop:10}}>📦 Archive & Reset</Bt>}<button onClick={()=>ssa(!sa)} style={{background:"none",border:"none",color:C.sb,cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"Outfit,sans-serif",padding:"10px 0"}}>{sa?"▲":"▼"} ARCHIVE ({arcs.length})</button>{sa&&arcs.map(a=><Cd key={a.id} style={{padding:"12px 18px",marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:C.tx,fontSize:13,fontWeight:700}}>{a.periodLabel}</span><span style={{color:a.totalCompleted===a.total?C.gn:C.ac,fontWeight:800}}>{a.totalCompleted}/{a.total}</span></div>{a.goals.map((g,i)=><div key={i} style={{display:"flex",gap:8,padding:"3px 0"}}><span style={{color:g.completed?C.gn:C.rd}}>{g.completed?"✓":"✗"}</span><span style={{color:g.completed?C.tx:C.sb,fontSize:12,textDecoration:g.completed?"none":"line-through"}}>{g.name}</span></div>)}</Cd>)}</div>;}

// JOURNAL
function Journal({data:d,setData:sd,sxp}){
  const[jMode,sJMode]=useState("calendar");
  const[calYear,sCalYear]=useState(new Date().getFullYear());
  const[calMonth,sCalMonth]=useState(new Date().getMonth());
  const[selDate,sSelDate]=useState(null);
  const[searchQ,sSearchQ]=useState("");
  const[editId,sEditId]=useState(null);
  const[wType,sWT]=useState("morning");
  const[wWins,sWW]=useState(""),[wLessons,sWL]=useState(""),[wGrat,sWG]=useState(""),[wFocus,sWF]=useState(""),[wFree,sWFr]=useState(""),[wMind,sWM]=useState(7),[wEng,sWE]=useState(7),[wTag,sWTg]=useState("Mindset");

  const fmtD=dt=>`${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,"0")}-${String(dt.getDate()).padStart(2,"0")}`;
  const mCol=s=>s>=8?C.gn:s>=6?C.ac:s>=4?C.or:C.rd;
  const allEntries=d.journal||[];
  const entryDates=[...new Set(allEntries.map(j=>j.date))].sort();

  // Stats
  const streak=(()=>{let s=0,now=new Date();for(let i=0;i<365;i++){const ds=fmtD(new Date(now.getFullYear(),now.getMonth(),now.getDate()-i));if(allEntries.some(j=>j.date===ds))s++;else break;}return s;})();
  const cutoff=new Date();cutoff.setDate(cutoff.getDate()-30);
  const last30=allEntries.filter(j=>new Date(j.date+"T12:00:00")>=cutoff);
  const avg30=last30.length?(last30.reduce((a,j)=>a+j.mindset,0)/last30.length).toFixed(1):"--";
  const prev30Cut=new Date(cutoff.getTime()-30*86400000);
  const prev30=allEntries.filter(j=>{const dt=new Date(j.date+"T12:00:00");return dt<cutoff&&dt>=prev30Cut;});
  const prevAvg=prev30.length?prev30.reduce((a,j)=>a+j.mindset,0)/prev30.length:null;
  const trend=prevAvg?(parseFloat(avg30)>prevAvg?"↑":parseFloat(avg30)<prevAvg?"↓":"→"):"";
  const trendCol=trend==="↑"?C.gn:trend==="↓"?C.rd:C.sb;
  const tagC={};last30.forEach(j=>{tagC[j.tag]=(tagC[j.tag]||0)+1;});
  const topTag=Object.entries(tagC).sort((a,b)=>b[1]-a[1])[0]?.[0]||"--";

  // Calendar
  const calDays=()=>{const first=new Date(calYear,calMonth,1);const last=new Date(calYear,calMonth+1,0);const startDow=(first.getDay()+6)%7;const days=Array(startDow).fill(null);for(let i=1;i<=last.getDate();i++)days.push(new Date(calYear,calMonth,i));return days;};
  const monthEntries=allEntries.filter(j=>{const[y,m]=j.date.split("-");return +y===calYear&&+m-1===calMonth;});
  const monthAvg=monthEntries.length?(monthEntries.reduce((a,j)=>a+j.mindset,0)/monthEntries.length).toFixed(1):null;
  const mTagC={};monthEntries.forEach(j=>{mTagC[j.tag]=(mTagC[j.tag]||0)+1;});
  const monthTopTag=Object.entries(mTagC).sort((a,b)=>b[1]-a[1])[0]?.[0]||null;

  // Entry view
  const selEntries=selDate?allEntries.filter(j=>j.date===selDate):[];
  const selIdx=selDate?entryDates.indexOf(selDate):-1;
  const prevED=selIdx>0?entryDates[selIdx-1]:null;
  const nextED=selIdx<entryDates.length-1?entryDates[selIdx+1]:null;

  // Search
  const searchRes=searchQ.trim().length>1?allEntries.filter(j=>[j.wins,j.lessons,j.gratitude,j.focus,j.freeform].some(f=>f?.toLowerCase().includes(searchQ.toLowerCase()))):[];

  const clearForm=()=>{sWW("");sWL("");sWG("");sWF("");sWFr("");sWM(7);sWE(7);sWTg("Mindset");};
  const openWrite=(date,type)=>{sSelDate(date);sWT(type||(new Date().getHours()<14?"morning":"evening"));sEditId(null);clearForm();sJMode("write");};
  const openEdit=e=>{sSelDate(e.date);sWT(e.type);sEditId(e.id);sWW(e.wins||"");sWL(e.lessons||"");sWG(e.gratitude||"");sWF(e.focus||"");sWFr(e.freeform||"");sWM(e.mindset||7);sWE(e.energy||7);sWTg(e.tag||"Mindset");sJMode("write");};
  const saveEntry=()=>{
    if(!wWins.trim()&&!wLessons.trim()&&!wGrat.trim()&&!wFocus.trim()&&!wFree.trim())return;
    const entry={id:editId||"j"+Date.now(),type:wType,wins:wWins.trim(),lessons:wLessons.trim(),gratitude:wGrat.trim(),focus:wFocus.trim(),freeform:wFree.trim(),mindset:wMind,energy:wEng,tag:wTag,date:selDate||td(),time:new Date().toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})};
    if(editId){sd({...d,journal:d.journal.map(j=>j.id===editId?entry:j)});}
    else{sd({...d,journal:[entry,...d.journal],xp:d.xp+XP.j});sxp(XP.j);}
    clearForm();sEditId(null);sJMode(selDate?"entry":"calendar");
  };
  const delEntry=id=>{sd({...d,journal:d.journal.filter(j=>j.id!==id)});};

  const ts={width:"100%",background:C.sf,border:"1px solid "+C.bd,borderRadius:8,padding:"9px 11px",color:C.tx,fontSize:12.5,outline:"none",resize:"none",fontFamily:"Plus Jakarta Sans,sans-serif",boxSizing:"border-box"};
  const days=calDays();
  const DOWL=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const MNS=["January","February","March","April","May","June","July","August","September","October","November","December"];

  return <div>
    <SH title="Journal" sub="Structured reflection."/>

    {/* Stats bar */}
    {jMode!=="write"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:16}}>
      <Cd style={{padding:12}}><div style={{color:C.sb,fontSize:8.5,letterSpacing:1.5,fontWeight:600,marginBottom:3}}>STREAK</div><div style={{color:C.ac,fontSize:22,fontWeight:800,fontFamily:"Outfit,sans-serif",lineHeight:1}}>{streak}<span style={{fontSize:10,color:C.sb}}> days</span></div></Cd>
      <Cd style={{padding:12}}><div style={{color:C.sb,fontSize:8.5,letterSpacing:1.5,fontWeight:600,marginBottom:3}}>ENTRIES</div><div style={{color:C.tx,fontSize:22,fontWeight:800,fontFamily:"Outfit,sans-serif",lineHeight:1}}>{allEntries.length}</div></Cd>
      <Cd style={{padding:12}}><div style={{color:C.sb,fontSize:8.5,letterSpacing:1.5,fontWeight:600,marginBottom:3}}>30D MINDSET</div><div style={{display:"flex",alignItems:"baseline",gap:4}}><span style={{color:avg30!=="--"?mCol(parseFloat(avg30)):C.sb,fontSize:22,fontWeight:800,fontFamily:"Outfit,sans-serif",lineHeight:1}}>{avg30}</span><span style={{color:trendCol,fontSize:14,fontWeight:700}}>{trend}</span></div></Cd>
      <Cd style={{padding:12}}><div style={{color:C.sb,fontSize:8.5,letterSpacing:1.5,fontWeight:600,marginBottom:3}}>TOP TAG</div><div style={{color:C.cy,fontSize:13,fontWeight:800,fontFamily:"Outfit,sans-serif",lineHeight:1.3,marginTop:2}}>{topTag}</div></Cd>
    </div>}

    {/* Mode tabs */}
    {jMode!=="write"&&<div style={{display:"flex",gap:6,marginBottom:16}}>
      <button onClick={()=>sJMode("calendar")} style={{flex:1,padding:"8px",borderRadius:9,border:jMode==="calendar"?"1px solid "+C.ac:"1px solid "+C.bd,background:jMode==="calendar"?C.ag:C.sf,color:jMode==="calendar"?C.ac:C.sb,fontSize:12,fontWeight:700,cursor:"pointer"}}>📅 Calendar</button>
      <button onClick={()=>sJMode("search")} style={{flex:1,padding:"8px",borderRadius:9,border:jMode==="search"?"1px solid "+C.cy:"1px solid "+C.bd,background:jMode==="search"?C.cg:C.sf,color:jMode==="search"?C.cy:C.sb,fontSize:12,fontWeight:700,cursor:"pointer"}}>🔍 Search</button>
      <button onClick={()=>openWrite(td())} style={{flex:1,padding:"8px",borderRadius:9,border:"1px solid "+C.gn,background:C.gg,color:C.gn,fontSize:12,fontWeight:700,cursor:"pointer"}}>✎ Write Today</button>
    </div>}

    {/* CALENDAR VIEW */}
    {jMode==="calendar"&&<>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <button onClick={()=>{if(calMonth===0){sCalMonth(11);sCalYear(calYear-1);}else sCalMonth(calMonth-1);}} style={{background:C.sf,border:"1px solid "+C.bd,borderRadius:8,padding:"6px 14px",color:C.tx,cursor:"pointer",fontSize:16,lineHeight:1}}>‹</button>
        <div style={{textAlign:"center"}}>
          <div style={{color:C.tx,fontSize:15,fontWeight:700,fontFamily:"Outfit,sans-serif"}}>{MNS[calMonth]} {calYear}</div>
          {monthEntries.length>0&&<div style={{color:C.sb,fontSize:10.5,marginTop:2}}>
            {monthEntries.length} {monthEntries.length===1?"entry":"entries"}
            {monthAvg&&<span style={{color:mCol(parseFloat(monthAvg)),fontWeight:700}}> · {monthAvg} mindset</span>}
            {monthTopTag&&<span style={{color:C.mt}}> · #{monthTopTag}</span>}
          </div>}
          {monthEntries.length===0&&<div style={{color:C.mt,fontSize:10.5,marginTop:2}}>No entries this month</div>}
        </div>
        <button onClick={()=>{if(calMonth===11){sCalMonth(0);sCalYear(calYear+1);}else sCalMonth(calMonth+1);}} style={{background:C.sf,border:"1px solid "+C.bd,borderRadius:8,padding:"6px 14px",color:C.tx,cursor:"pointer",fontSize:16,lineHeight:1}}>›</button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:4}}>
        {DOWL.map(l=><div key={l} style={{textAlign:"center",color:C.mt,fontSize:9,fontWeight:700,letterSpacing:0.5,padding:"3px 0"}}>{l}</div>)}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:14}}>
        {days.map((day,i)=>{
          if(!day)return <div key={"e"+i}/>;
          const ds=fmtD(day);
          const de=allEntries.filter(j=>j.date===ds);
          const avgM=de.length?Math.round(de.reduce((a,e)=>a+e.mindset,0)/de.length):0;
          const dc=de.length?mCol(avgM):null;
          const isToday=ds===td();
          const isFuture=day>new Date()&&ds!==td();
          const hasMorn=de.some(j=>j.type==="morning");
          const hasEve=de.some(j=>j.type==="evening");
          return <div key={ds} onClick={()=>{if(!isFuture){sSelDate(ds);sJMode(de.length?"entry":"write");}}}
            style={{aspectRatio:"1",borderRadius:8,cursor:isFuture?"default":"pointer",background:de.length?dc+"22":"transparent",border:isToday?"2px solid "+C.ac+"bb":"1px solid "+(de.length?dc+"35":C.bd+"35"),display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:1,padding:2,opacity:isFuture?0.2:1}}>
            <div style={{color:isToday?C.ac:de.length?dc:C.sb,fontSize:11,fontWeight:isToday?900:de.length?700:400,lineHeight:1}}>{day.getDate()}</div>
            {de.length>0&&<div style={{display:"flex",gap:2,marginTop:1}}>
              {hasMorn&&<div style={{width:4,height:4,borderRadius:"50%",background:C.ac}}/>}
              {hasEve&&<div style={{width:4,height:4,borderRadius:"50%",background:C.cy}}/>}
            </div>}
            {de.length>0&&<div style={{color:dc,fontSize:7,fontWeight:800,lineHeight:1,marginTop:1}}>{avgM}</div>}
          </div>;
        })}
      </div>

      <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:4}}>
        {[[C.gn,"8–10"],[C.ac,"6–7"],[C.or,"4–5"],[C.rd,"1–3"]].map(([c,l])=>
          <div key={l} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,borderRadius:2,background:c+"35",border:"1px solid "+c}}/><span style={{color:C.sb,fontSize:9}}>Mindset {l}</span></div>
        )}
        <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:5,height:5,borderRadius:"50%",background:C.ac}}/><span style={{color:C.sb,fontSize:9}}>AM</span></div>
        <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:5,height:5,borderRadius:"50%",background:C.cy}}/><span style={{color:C.sb,fontSize:9}}>PM</span></div>
      </div>
    </>}

    {/* ENTRY VIEW */}
    {jMode==="entry"&&selDate&&<>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <button onClick={()=>sJMode("calendar")} style={{background:"none",border:"none",color:C.sb,cursor:"pointer",fontSize:22,padding:0,lineHeight:1}}>←</button>
        <div style={{textAlign:"center",flex:1,padding:"0 10px"}}>
          <div style={{color:C.tx,fontWeight:700,fontSize:13.5}}>{new Date(selDate+"T12:00:00").toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
          <div style={{color:C.sb,fontSize:10.5,marginTop:1}}>{selEntries.length===0?"No entries":`${selEntries.length} ${selEntries.length===1?"entry":"entries"}`}</div>
        </div>
        <div style={{display:"flex",gap:5}}>
          <button onClick={()=>{if(prevED)sSelDate(prevED);}} disabled={!prevED} style={{background:C.sf,border:"1px solid "+C.bd,borderRadius:7,padding:"5px 11px",color:prevED?C.tx:C.mt,cursor:prevED?"pointer":"default",fontSize:14,lineHeight:1}}>‹</button>
          <button onClick={()=>{if(nextED)sSelDate(nextED);}} disabled={!nextED} style={{background:C.sf,border:"1px solid "+C.bd,borderRadius:7,padding:"5px 11px",color:nextED?C.tx:C.mt,cursor:nextED?"pointer":"default",fontSize:14,lineHeight:1}}>›</button>
        </div>
      </div>

      {selEntries.length===0
        ?<Cd style={{textAlign:"center",padding:32}}><div style={{color:C.sb,fontSize:13,marginBottom:14}}>No entries for this day.</div><Bt onClick={()=>openWrite(selDate)}>+ Write Entry</Bt></Cd>
        :selEntries.map(e=>{
          const isMorn=e.type==="morning";const mc=mCol(e.mindset);const ec=mCol(e.energy);
          return <Cd key={e.id} style={{marginBottom:12,borderColor:isMorn?"rgba(245,158,11,0.25)":"rgba(6,182,212,0.25)",background:isMorn?"rgba(245,158,11,0.03)":"rgba(6,182,212,0.03)"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:15}}>{isMorn?"☀":"☽"}</span>
                <span style={{color:isMorn?C.ac:C.cy,fontSize:13,fontWeight:700,fontFamily:"Outfit,sans-serif"}}>{isMorn?"Morning":"Evening"}</span>
                <span style={{background:C.sf,color:C.sb,padding:"2px 7px",borderRadius:5,fontSize:9.5,fontWeight:600}}>{e.tag}</span>
              </div>
              <div style={{display:"flex",gap:5,alignItems:"center"}}>
                {e.time&&<span style={{color:C.mt,fontSize:10}}>{e.time}</span>}
                <button onClick={()=>openEdit(e)} style={{background:C.sf,border:"1px solid "+C.bd,borderRadius:6,padding:"3px 8px",color:C.sb,cursor:"pointer",fontSize:10.5,fontWeight:600}}>Edit</button>
                <button onClick={()=>{delEntry(e.id);if(selEntries.length===1)sJMode("calendar");}} style={{background:C.rg,border:"none",borderRadius:6,padding:"3px 8px",color:C.rd,cursor:"pointer",fontSize:10.5,fontWeight:600}}>Del</button>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              {[["MINDSET",e.mindset,mc],["ENERGY",e.energy,ec]].map(([l,v,c])=>
                <div key={l}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{color:C.sb,fontSize:9,fontWeight:700,letterSpacing:1}}>{l}</span><span style={{color:c,fontSize:11,fontWeight:800}}>{v}/10</span></div><div style={{height:5,background:C.sf,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:(v/10*100)+"%",background:c,borderRadius:3}}/></div></div>
              )}
            </div>
            {[[e.focus,"🎯","FOCUS / PRIORITY",C.ac],[e.gratitude,"🙏","GRATITUDE",C.gn],[e.wins,"🏆","WINS",C.ac],[e.lessons,"📝","LESSONS",C.cy],[e.freeform,"💭","THOUGHTS",C.sb]].filter(([v])=>v).map(([v,em,l,c])=>
              <div key={l} style={{marginBottom:10}}><div style={{color:c,fontSize:8.5,fontWeight:700,letterSpacing:1.5,marginBottom:4}}>{em} {l}</div><div style={{color:C.tx,fontSize:13,lineHeight:1.65,whiteSpace:"pre-wrap"}}>{v}</div></div>
            )}
          </Cd>;
        })
      }
      <Bt v="secondary" onClick={()=>openWrite(selDate)} style={{width:"100%",justifyContent:"center",marginTop:4}}>+ Add Entry for This Day</Bt>
    </>}

    {/* WRITE VIEW */}
    {jMode==="write"&&<>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <button onClick={()=>{sJMode(selEntries.length||editId?"entry":"calendar");clearForm();sEditId(null);}} style={{background:"none",border:"none",color:C.sb,cursor:"pointer",fontSize:22,padding:0,lineHeight:1}}>←</button>
        <div><div style={{color:C.tx,fontWeight:700,fontSize:14}}>{editId?"Edit Entry":"New Entry"}</div><div style={{color:C.sb,fontSize:11}}>{selDate&&new Date(selDate+"T12:00:00").toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})}</div></div>
      </div>
      <Cd>
        <div style={{display:"flex",gap:6,marginBottom:14}}>
          {["morning","evening"].map(t=><button key={t} onClick={()=>sWT(t)} style={{flex:1,padding:"9px",borderRadius:10,border:wType===t?"1px solid "+(t==="morning"?C.ac:C.cy):"1px solid "+C.bd,background:wType===t?(t==="morning"?C.ag:C.cg):C.sf,color:wType===t?(t==="morning"?C.ac:C.cy):C.sb,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"Outfit,sans-serif"}}>{t==="morning"?"☀ Morning":"☽ Evening"}</button>)}
        </div>
        <div style={{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"}}>
          {JTAGS.map(t=><button key={t} onClick={()=>sWTg(t)} style={{padding:"4px 9px",borderRadius:6,border:wTag===t?"1px solid "+C.ac:"1px solid "+C.bd,background:wTag===t?C.ag:C.sf,color:wTag===t?C.ac:C.sb,fontSize:10.5,fontWeight:600,cursor:"pointer"}}>{t}</button>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
          <div><div style={{color:C.sb,fontSize:9.5,fontWeight:600,marginBottom:4}}>MINDSET <span style={{color:mCol(wMind),fontWeight:800}}>{wMind}/10</span></div><input type="range" min="1" max="10" value={wMind} onChange={e=>sWM(+e.target.value)} style={{width:"100%",accentColor:mCol(wMind)}}/></div>
          <div><div style={{color:C.sb,fontSize:9.5,fontWeight:600,marginBottom:4}}>ENERGY <span style={{color:mCol(wEng),fontWeight:800}}>{wEng}/10</span></div><input type="range" min="1" max="10" value={wEng} onChange={e=>sWE(+e.target.value)} style={{width:"100%",accentColor:mCol(wEng)}}/></div>
        </div>
        {wType==="morning"&&<>
          <div style={{marginBottom:10}}><div style={{color:C.sb,fontSize:9.5,fontWeight:700,letterSpacing:1,marginBottom:4}}>🎯 TODAY'S FOCUS</div><textarea value={wFocus} onChange={e=>sWF(e.target.value)} placeholder="Your #1 priority today?" rows={2} style={ts}/></div>
          <div style={{marginBottom:10}}><div style={{color:C.sb,fontSize:9.5,fontWeight:700,letterSpacing:1,marginBottom:4}}>🙏 GRATITUDE</div><textarea value={wGrat} onChange={e=>sWG(e.target.value)} placeholder="3 things you're grateful for..." rows={2} style={ts}/></div>
        </>}
        {wType==="evening"&&<>
          <div style={{marginBottom:10}}><div style={{color:C.sb,fontSize:9.5,fontWeight:700,letterSpacing:1,marginBottom:4}}>🏆 WINS</div><textarea value={wWins} onChange={e=>sWW(e.target.value)} placeholder="What went well today?" rows={2} style={ts}/></div>
          <div style={{marginBottom:10}}><div style={{color:C.sb,fontSize:9.5,fontWeight:700,letterSpacing:1,marginBottom:4}}>📝 LESSONS</div><textarea value={wLessons} onChange={e=>sWL(e.target.value)} placeholder="What did you learn?" rows={2} style={ts}/></div>
          <div style={{marginBottom:10}}><div style={{color:C.sb,fontSize:9.5,fontWeight:700,letterSpacing:1,marginBottom:4}}>🔮 TOMORROW'S FOCUS</div><textarea value={wFocus} onChange={e=>sWF(e.target.value)} placeholder="Top priority tomorrow..." rows={2} style={ts}/></div>
        </>}
        <div style={{marginBottom:14}}><div style={{color:C.sb,fontSize:9.5,fontWeight:700,letterSpacing:1,marginBottom:4}}>💭 FREE THOUGHTS</div><textarea value={wFree} onChange={e=>sWFr(e.target.value)} placeholder="Stream of consciousness..." rows={3} style={ts}/></div>
        <button onClick={saveEntry} style={{width:"100%",padding:"12px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#f59e0b,#f97316)",color:"#000",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"Outfit,sans-serif"}}>
          {editId?"Save Changes ✓":"Save Entry (+"+XP.j+" XP)"}
        </button>
      </Cd>
    </>}

    {/* SEARCH VIEW */}
    {jMode==="search"&&<>
      <Cd style={{marginBottom:14}}>
        <Inp value={searchQ} onChange={e=>sSearchQ(e.target.value)} placeholder="Search wins, lessons, thoughts, gratitude..." style={{width:"100%"}}/>
      </Cd>
      {searchQ.trim().length>1&&searchRes.length===0&&<div style={{textAlign:"center",padding:28,color:C.sb,fontSize:12}}>No entries match "{searchQ}"</div>}
      {searchRes.map(j=>{
        const mc=mCol(j.mindset);
        const preview=[j.wins,j.lessons,j.gratitude,j.focus,j.freeform].filter(Boolean).join(" · ");
        return <Cd key={j.id} onClick={()=>{sSelDate(j.date);sJMode("entry");}} style={{marginBottom:8,cursor:"pointer"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <span style={{fontSize:13}}>{j.type==="morning"?"☀":"☽"}</span>
              <span style={{color:j.type==="morning"?C.ac:C.cy,fontSize:11,fontWeight:700}}>{j.type==="morning"?"Morning":"Evening"}</span>
              <span style={{background:C.sf,color:C.sb,padding:"1px 6px",borderRadius:4,fontSize:9.5}}>{j.tag}</span>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{color:mc,fontSize:10,fontWeight:700}}>M:{j.mindset}</span>
              <span style={{color:C.sb,fontSize:10.5}}>{new Date(j.date+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>
            </div>
          </div>
          {preview&&<div style={{color:C.sb,fontSize:11.5,lineHeight:1.5,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{preview.slice(0,140)}{preview.length>140?"...":""}</div>}
        </Cd>;
      })}
      {searchQ.trim().length<=1&&<div style={{textAlign:"center",padding:32,color:C.mt,fontSize:12}}>Type 2+ characters to search all your entries</div>}
    </>}
  </div>;
}

// NUTRITION
function Nutrition({data:d,setData:sd,sxp}){
  const[mt,sMT]=useState("Breakfast");
  const[meal,sML]=useState(""),[cal,sCal]=useState(""),[pro,sPro]=useState(""),[carb,sCb]=useState(""),[fat,sFat]=useState("");
  const[mode,sMode]=useState("log");
  const[scanning,setScanning]=useState(false),[scanErr,sScanErr]=useState(""),[manualBC,sManualBC]=useState("");
  const[searchQ,sSearchQ]=useState(""),[searchRes,sSearchRes]=useState([]),[searching,setSearching]=useState(false);
  const[product,sProduct]=useState(null),[servingG,sServingG]=useState("100");
  // Macro target editing
  const[editMT,sEditMT]=useState(false);
  const tgt=d.macroTargets||{calories:2500,protein:150,carbs:300,fat:80};
  const[tgtDraft,sTgtDraft]=useState({calories:String(tgt.calories),protein:String(tgt.protein),carbs:String(tgt.carbs),fat:String(tgt.fat)});
  // Water
  const waterTarget=d.waterTarget||2500;
  const todayWater=(d.waterLog||{})[td()]||[];
  const waterMl=todayWater.reduce((a,v)=>a+v,0);
  const[editWT,sEditWT]=useState(false),[wtDraft,sWtDraft]=useState(String(waterTarget));
  const addWater=ml=>{const log=d.waterLog||{};const arr=[...(log[td()]||[]),ml];sd({...d,waterLog:{...log,[td()]:arr}});};
  const undoWater=()=>{const log=d.waterLog||{};const arr=[...(log[td()]||[])];arr.pop();sd({...d,waterLog:{...log,[td()]:arr}});};
  // ZXing refs
  const videoRef=useRef(null),controlsRef=useRef(null);
  const stopCamera=()=>{if(controlsRef.current){try{controlsRef.current.stop();}catch{}controlsRef.current=null;}setScanning(false);};
  useEffect(()=>()=>stopCamera(),[]);

  const startScan=()=>{sScanErr("");sMode("scan");};

  useEffect(()=>{
    if(mode!=="scan")return;
    let live=true;
    const reader=new BrowserMultiFormatReader();
    reader.decodeFromConstraints(
      {video:{facingMode:{ideal:"environment"},width:{ideal:1280}}},
      videoRef.current,
      (result,err,controls)=>{
        if(!controlsRef.current)controlsRef.current=controls;
        if(result&&live){live=false;try{controls.stop();}catch{}controlsRef.current=null;lookupBarcode(result.getText());}
      }
    ).then(controls=>{
      if(!live){try{controls.stop();}catch{}return;}
      controlsRef.current=controls;setScanning(true);
    }).catch(()=>sScanErr("Camera access denied — try entering the barcode manually."));
    return()=>{live=false;if(controlsRef.current){try{controlsRef.current.stop();}catch{}controlsRef.current=null;}};
  },[mode]);

  const lookupBarcode=async bc=>{
    sMode("loading");sScanErr("");
    try{
      const r=await fetch(`https://world.openfoodfacts.org/api/v2/product/${bc}.json?fields=product_name,brands,stores,image_url,nutriments,serving_size,serving_quantity`);
      const data=await r.json();
      if(data.status===1&&data.product){
        const p=data.product,n=p.nutriments||{};
        const pd={barcode:bc,name:p.product_name||"Unknown Product",brand:p.brands||"",stores:p.stores||"",image:p.image_url||"",servingSize:p.serving_size||"100g",servingGrams:parseFloat(p.serving_quantity)||100,per100:{calories:parseFloat(n["energy-kcal_100g"])||parseFloat(n["energy-kcal"])||0,protein:parseFloat(n["proteins_100g"])||0,carbs:parseFloat(n["carbohydrates_100g"])||0,fat:parseFloat(n["fat_100g"])||0}};
        sProduct(pd);sServingG(String(pd.servingGrams));
        sd(prev=>({...prev,recentScans:[pd,...(prev.recentScans||[]).filter(r=>r.barcode!==bc)].slice(0,8)}));
        sMode("confirm");
      }else{sScanErr("Product not found — try searching by name.");sMode("scan");}
    }catch{sScanErr("Network error — check connection.");sMode("scan");}
  };

  const doSearch=async()=>{
    if(!searchQ.trim())return;
    setSearching(true);sSearchRes([]);
    try{
      const r=await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(searchQ)}&json=1&page_size=10&fields=product_name,brands,stores,image_url,nutriments,serving_size,serving_quantity,code`);
      const data=await r.json();
      sSearchRes((data.products||[]).filter(p=>p.product_name&&p.nutriments&&(p.nutriments["energy-kcal_100g"]||p.nutriments["energy-kcal"])));
    }catch{sSearchRes([]);}
    setSearching(false);
  };

  const selectProduct=p=>{
    const n=p.nutriments||{};
    const pd={barcode:p.code||"",name:p.product_name||"Unknown",brand:p.brands||"",stores:p.stores||"",image:p.image_url||"",servingSize:p.serving_size||"100g",servingGrams:parseFloat(p.serving_quantity)||100,per100:{calories:parseFloat(n["energy-kcal_100g"])||parseFloat(n["energy-kcal"])||0,protein:parseFloat(n["proteins_100g"])||0,carbs:parseFloat(n["carbohydrates_100g"])||0,fat:parseFloat(n["fat_100g"])||0}};
    sProduct(pd);sServingG(String(pd.servingGrams||100));sMode("confirm");
  };

  const calcM=()=>{if(!product)return{calories:0,protein:0,carbs:0,fat:0};const ratio=(parseFloat(servingG)||0)/100;return{calories:Math.round(product.per100.calories*ratio),protein:Math.round(product.per100.protein*ratio*10)/10,carbs:Math.round(product.per100.carbs*ratio*10)/10,fat:Math.round(product.per100.fat*ratio*10)/10};};

  const logProduct=()=>{
    if(!product)return;const m=calcM();
    sd({...d,meals:[{id:"m"+Date.now(),name:product.name,brand:product.brand,stores:product.stores,image:product.image,type:mt,servingG:parseFloat(servingG),barcode:product.barcode,...m,date:td()},...(d.meals||[])],xp:d.xp+XP.n});
    sxp(XP.n);sProduct(null);sSearchQ("");sSearchRes([]);sMode("log");
  };

  const addManual=()=>{if(!meal.trim())return;sd({...d,meals:[{id:"m"+Date.now(),name:meal.trim(),type:mt,calories:parseFloat(cal)||0,protein:parseFloat(pro)||0,carbs:parseFloat(carb)||0,fat:parseFloat(fat)||0,date:td()},...(d.meals||[])],xp:d.xp+XP.n});sML("");sCal("");sPro("");sCb("");sFat("");sxp(XP.n);};

  const pm=calcM();
  const recent=d.recentScans||[];
  const tm=(d.meals||[]).filter(m=>m.date===td());
  const tC=tm.reduce((a,m)=>a+(m.calories||0),0),tP=tm.reduce((a,m)=>a+(m.protein||0),0),tCb=tm.reduce((a,m)=>a+(m.carbs||0),0),tF=tm.reduce((a,m)=>a+(m.fat||0),0);
  const backBtn=(label,fn)=><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><button onClick={fn} style={{background:"none",border:"none",color:C.sb,cursor:"pointer",fontSize:22,lineHeight:1,padding:0}}>←</button><span style={{color:C.tx,fontWeight:700,fontSize:15}}>{label}</span></div>;

  return <div>
    <SH title="Nutrition" sub="Track meals & macros."/>

    {/* Macro targets */}
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
      <div style={{color:C.sb,fontSize:9.5,letterSpacing:1.5,fontWeight:600}}>DAILY TARGETS</div>
      <button onClick={()=>{sTgtDraft({calories:String(tgt.calories),protein:String(tgt.protein),carbs:String(tgt.carbs),fat:String(tgt.fat)});sEditMT(!editMT);}} style={{background:"none",border:"none",color:editMT?C.ac:C.sb,cursor:"pointer",fontSize:11,fontWeight:600}}>
        {editMT?"✕ Cancel":"✎ Edit targets"}
      </button>
    </div>
    {editMT&&<Cd style={{marginBottom:12,background:"rgba(245,158,11,0.04)",borderColor:"rgba(245,158,11,0.15)"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:10}}>
        {[["Calories","calories","kcal",C.or],["Protein","protein","g",C.gn],["Carbs","carbs","g",C.cy],["Fat","fat","g",C.pp]].map(([l,k,u,c])=>
          <div key={k}>
            <div style={{color:c,fontSize:9.5,fontWeight:700,marginBottom:4,letterSpacing:0.5}}>{l.toUpperCase()}</div>
            <Inp value={tgtDraft[k]} onChange={e=>sTgtDraft({...tgtDraft,[k]:e.target.value})} type="number" placeholder={String(tgt[k])}/>
            <div style={{color:C.sb,fontSize:9,marginTop:2}}>{u}</div>
          </div>
        )}
      </div>
      <Bt onClick={()=>{sd({...d,macroTargets:{calories:parseInt(tgtDraft.calories)||2500,protein:parseInt(tgtDraft.protein)||150,carbs:parseInt(tgtDraft.carbs)||300,fat:parseInt(tgtDraft.fat)||80}});sEditMT(false);}}>Save Targets</Bt>
    </Cd>}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:18}}>
      {[["CALS",tC,tgt.calories,C.or],["PROTEIN",tP,tgt.protein,C.gn],["CARBS",tCb,tgt.carbs,C.cy],["FAT",tF,tgt.fat,C.pp]].map(([l,v,mx,c])=>
        <Cd key={l} style={{padding:12}}>
          <div style={{color:C.sb,fontSize:9,letterSpacing:1,fontWeight:600,marginBottom:2}}>{l}</div>
          <div style={{color:c,fontSize:18,fontWeight:800,fontFamily:"Outfit,sans-serif",lineHeight:1}}>{Math.round(v)}<span style={{fontSize:10,color:C.sb}}>/{mx}</span></div>
          <PB val={v} max={mx} col={c}/>
        </Cd>
      )}
    </div>

    {/* Water tracker */}
    <Cd style={{marginBottom:18}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}><span style={{fontSize:16}}>💧</span><div style={{color:C.sb,fontSize:9.5,letterSpacing:1.5,fontWeight:600}}>WATER TODAY</div></div>
        {editWT
          ?<div style={{display:"flex",gap:6,alignItems:"center"}}>
            <Inp value={wtDraft} onChange={e=>sWtDraft(e.target.value)} type="number" style={{width:72,fontSize:12}} placeholder="2500"/>
            <span style={{color:C.sb,fontSize:10}}>ml</span>
            <Bt onClick={()=>{sd({...d,waterTarget:parseInt(wtDraft)||2500});sEditWT(false);}}>Save</Bt>
          </div>
          :<button onClick={()=>{sWtDraft(String(waterTarget));sEditWT(true);}} style={{background:"none",border:"none",color:C.sb,cursor:"pointer",fontSize:11,fontWeight:600}}>Edit target</button>
        }
      </div>
      <div style={{display:"flex",alignItems:"baseline",gap:6,marginBottom:6}}>
        <span style={{color:waterMl>=waterTarget?C.gn:C.cy,fontSize:26,fontWeight:800,fontFamily:"Outfit,sans-serif"}}>{(waterMl/1000).toFixed(2).replace(/\.?0+$/,"")}<span style={{fontSize:13}}>L</span></span>
        <span style={{color:C.sb,fontSize:13}}>/ {(waterTarget/1000).toFixed(1)}L</span>
        {waterMl>=waterTarget&&<span style={{color:C.gn,fontSize:11,fontWeight:700,marginLeft:4}}>✓ Goal hit!</span>}
      </div>
      <PB val={waterMl} max={waterTarget} col={waterMl>=waterTarget?C.gn:C.cy}/>
      <div style={{display:"flex",gap:6,marginTop:10}}>
        {[250,500,750,1000].map(ml=><button key={ml} onClick={()=>addWater(ml)} style={{flex:1,padding:"7px 4px",borderRadius:8,border:"1px solid "+C.bd,background:C.sf,color:C.cy,fontSize:12,fontWeight:700,cursor:"pointer"}}>{ml<1000?"+"+ml+"ml":"+1L"}</button>)}
        {todayWater.length>0&&<button onClick={undoWater} style={{padding:"7px 12px",borderRadius:8,border:"1px solid "+C.bd,background:C.sf,color:C.sb,fontSize:13,cursor:"pointer",fontWeight:600}} title="Undo last">↩</button>}
      </div>
    </Cd>

    {/* LOG mode */}
    {mode==="log"&&<>
      <div style={{display:"flex",gap:5,marginBottom:12}}>
        {["Breakfast","Lunch","Dinner","Snack"].map(t=><button key={t} onClick={()=>sMT(t)} style={{flex:1,padding:"7px 4px",borderRadius:8,border:mt===t?"1px solid "+C.ac:"1px solid "+C.bd,background:mt===t?C.ag:C.sf,color:mt===t?C.ac:C.sb,fontSize:11,fontWeight:600,cursor:"pointer"}}>{t}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
        <button onClick={startScan} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"13px",borderRadius:12,border:"1px solid "+C.ac,background:C.ag,color:C.ac,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Outfit,sans-serif"}}>
          <span style={{fontSize:20}}>📷</span> Scan Barcode
        </button>
        <button onClick={()=>sMode("search")} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"13px",borderRadius:12,border:"1px solid "+C.bd,background:C.sf,color:C.tx,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Outfit,sans-serif"}}>
          <span style={{fontSize:20}}>🔍</span> Search Food
        </button>
      </div>
      {recent.length>0&&<Cd style={{marginBottom:14}}>
        <div style={{color:C.sb,fontSize:9.5,letterSpacing:1.5,fontWeight:600,marginBottom:10}}>RECENT SCANS</div>
        {recent.slice(0,4).map((r,i)=>
          <div key={i} onClick={()=>{sProduct(r);sServingG(String(r.servingGrams||100));sMode("confirm");}} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:10,background:C.sf,cursor:"pointer",border:"1px solid "+C.bd,marginBottom:i<Math.min(recent.length,4)-1?6:0}}>
            {r.image?<img src={r.image} alt="" style={{width:34,height:34,objectFit:"contain",borderRadius:6,background:"#fff",flexShrink:0}}/>:<div style={{width:34,height:34,borderRadius:6,background:C.mt,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🍽</div>}
            <div style={{flex:1,minWidth:0}}>
              <div style={{color:C.tx,fontSize:12.5,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.name}</div>
              <div style={{color:C.sb,fontSize:10.5}}>{r.brand||"Unknown brand"}</div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{color:C.or,fontSize:11,fontWeight:700}}>{Math.round(r.per100.calories)} kcal</div>
              <div style={{color:C.sb,fontSize:9.5}}>per 100g</div>
            </div>
          </div>
        )}
      </Cd>}
      <Cd>
        <div style={{color:C.sb,fontSize:9.5,letterSpacing:1.5,fontWeight:600,marginBottom:8}}>MANUAL ENTRY</div>
        <div style={{display:"flex",gap:8,marginBottom:8}}>
          <Inp value={meal} onChange={e=>sML(e.target.value)} placeholder="Food name" style={{flex:2}}/>
          <Inp value={cal} onChange={e=>sCal(e.target.value)} placeholder="Kcal" type="number" style={{flex:1}}/>
        </div>
        <div style={{display:"flex",gap:8}}>
          <Inp value={pro} onChange={e=>sPro(e.target.value)} placeholder="Protein(g)" type="number" style={{flex:1}}/>
          <Inp value={carb} onChange={e=>sCb(e.target.value)} placeholder="Carbs(g)" type="number" style={{flex:1}}/>
          <Inp value={fat} onChange={e=>sFat(e.target.value)} placeholder="Fat(g)" type="number" style={{flex:1}}/>
          <Bt onClick={addManual}>+</Bt>
        </div>
      </Cd>
      {tm.length>0&&<div style={{marginTop:18}}>
        <div style={{color:C.sb,fontSize:9.5,letterSpacing:1.5,fontWeight:600,marginBottom:10}}>TODAY'S MEALS</div>
        {tm.map(m=><Cd key={m.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",marginBottom:6}}>
          {m.image?<img src={m.image} alt="" style={{width:40,height:40,objectFit:"contain",borderRadius:8,background:"#fff",flexShrink:0}}/>:<div style={{width:40,height:40,borderRadius:8,background:C.mt,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🍽</div>}
          <div style={{flex:1,minWidth:0}}>
            <div style={{color:C.tx,fontSize:13,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.name}</div>
            <div style={{color:C.sb,fontSize:10.5,marginBottom:3}}>{m.brand&&<span>{m.brand} · </span>}<span style={{color:C.ac}}>{m.type}</span>{m.servingG&&<span> · {m.servingG}g</span>}</div>
            <div style={{display:"flex",gap:10}}>
              <span style={{color:C.or,fontSize:10,fontWeight:700}}>{m.calories} kcal</span>
              <span style={{color:C.gn,fontSize:10,fontWeight:600}}>P {m.protein}g</span>
              <span style={{color:C.cy,fontSize:10,fontWeight:600}}>C {m.carbs}g</span>
              <span style={{color:C.pp,fontSize:10,fontWeight:600}}>F {m.fat}g</span>
            </div>
            {m.stores&&<div style={{color:C.mt,fontSize:10,marginTop:2}}>📍 {m.stores}</div>}
          </div>
          <button onClick={()=>sd({...d,meals:d.meals.filter(x=>x.id!==m.id)})} style={{background:"none",border:"none",cursor:"pointer",color:C.mt,fontSize:18,flexShrink:0}}>×</button>
        </Cd>)}
      </div>}
    </>}

    {/* SCAN mode */}
    {mode==="scan"&&<>
      {backBtn("Barcode Scanner",()=>{stopCamera();sMode("log");sScanErr("");})}
      <div style={{position:"relative",borderRadius:16,overflow:"hidden",background:"#000",marginBottom:14,aspectRatio:"4/3",maxHeight:340}}>
        <video ref={videoRef} muted playsInline style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
        {scanning&&<div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,pointerEvents:"none"}}>
          <div style={{width:"72%",aspectRatio:"3/1.2",border:"2.5px solid "+C.ac,borderRadius:10,boxShadow:"0 0 0 9999px rgba(0,0,0,0.45)",animation:"pulse 2s ease infinite"}}/>
          <span style={{color:"rgba(255,255,255,0.85)",fontSize:12,fontWeight:600,textShadow:"0 1px 4px rgba(0,0,0,0.9)"}}>Point camera at barcode</span>
        </div>}
        {!scanning&&!scanErr&&<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{color:"rgba(255,255,255,0.5)",fontSize:12,animation:"pulse 1s infinite"}}>Starting camera...</div></div>}
      </div>
      {scanErr&&<Cd style={{marginBottom:14,background:C.rg,borderColor:"rgba(239,68,68,0.2)",padding:12}}><div style={{color:C.rd,fontSize:12,fontWeight:600}}>{scanErr}</div></Cd>}
      <Cd>
        <div style={{color:C.sb,fontSize:9.5,letterSpacing:1.5,fontWeight:600,marginBottom:8}}>MANUAL BARCODE ENTRY</div>
        <div style={{display:"flex",gap:8}}>
          <Inp value={manualBC} onChange={e=>sManualBC(e.target.value)} placeholder="e.g. 5000112637922" style={{flex:1}} onKeyDown={e=>{if(e.key==="Enter"&&manualBC.trim())lookupBarcode(manualBC.trim());}}/>
          <Bt onClick={()=>{if(manualBC.trim())lookupBarcode(manualBC.trim());}}>Look Up</Bt>
        </div>
      </Cd>
    </>}

    {/* LOADING mode */}
    {mode==="loading"&&<Cd style={{textAlign:"center",padding:40}}>
      <div style={{fontSize:28,marginBottom:12}}>🔍</div>
      <div style={{color:C.ac,fontSize:12,fontWeight:700,letterSpacing:2,animation:"pulse 1s infinite"}}>SCANNING DATABASE...</div>
      <div style={{color:C.sb,fontSize:11,marginTop:6}}>Looking up product on OpenFoodFacts</div>
    </Cd>}

    {/* SEARCH mode */}
    {mode==="search"&&<>
      {backBtn("Search Food Database",()=>{sMode("log");sSearchRes([]);sSearchQ("");})}
      <Cd style={{marginBottom:14}}>
        <div style={{display:"flex",gap:8}}>
          <Inp value={searchQ} onChange={e=>sSearchQ(e.target.value)} placeholder="e.g. Greek yogurt, chicken breast..." style={{flex:1}} onKeyDown={e=>{if(e.key==="Enter")doSearch();}}/>
          <Bt onClick={doSearch}>Search</Bt>
        </div>
      </Cd>
      {searching&&<div style={{textAlign:"center",padding:24,color:C.sb,fontSize:12,animation:"pulse 1s infinite"}}>Searching 3M+ products...</div>}
      {searchRes.map((p,i)=>{
        const n=p.nutriments||{};
        const kcal=parseFloat(n["energy-kcal_100g"])||parseFloat(n["energy-kcal"])||0;
        const prot=parseFloat(n["proteins_100g"])||0;
        return <Cd key={i} onClick={()=>selectProduct(p)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",marginBottom:6,cursor:"pointer"}}>
          {p.image_url?<img src={p.image_url} alt="" style={{width:44,height:44,objectFit:"contain",borderRadius:8,background:"#fff",flexShrink:0}}/>:<div style={{width:44,height:44,borderRadius:8,background:C.mt,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>🍽</div>}
          <div style={{flex:1,minWidth:0}}>
            <div style={{color:C.tx,fontSize:13,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.product_name}</div>
            {p.brands&&<div style={{color:C.sb,fontSize:11,marginBottom:2}}>{p.brands}{p.stores&&<span style={{color:C.mt}}> · {p.stores}</span>}</div>}
            <div style={{display:"flex",gap:10}}>
              <span style={{color:C.or,fontSize:10,fontWeight:700}}>{Math.round(kcal)} kcal/100g</span>
              <span style={{color:C.gn,fontSize:10,fontWeight:600}}>P {Math.round(prot)}g/100g</span>
            </div>
          </div>
          <span style={{color:C.sb,fontSize:22,flexShrink:0}}>›</span>
        </Cd>;
      })}
      {!searching&&searchRes.length===0&&searchQ.trim()&&<div style={{textAlign:"center",padding:24,color:C.sb,fontSize:12}}>No results found. Try a different term.</div>}
    </>}

    {/* CONFIRM mode */}
    {mode==="confirm"&&product&&<>
      {backBtn("Confirm & Log",()=>{sMode("log");sProduct(null);})}
      <Cd style={{marginBottom:14,background:"linear-gradient(135deg,rgba(245,158,11,0.04),rgba(6,182,212,0.02))"}}>
        <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:16}}>
          {product.image?<img src={product.image} alt="" style={{width:72,height:72,objectFit:"contain",borderRadius:12,background:"#fff",flexShrink:0}}/>:<div style={{width:72,height:72,borderRadius:12,background:C.mt,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,flexShrink:0}}>🍽</div>}
          <div style={{flex:1}}>
            <div style={{color:C.tx,fontSize:15,fontWeight:700,lineHeight:1.3,marginBottom:5}}>{product.name}</div>
            {product.brand&&<div style={{color:C.ac,fontSize:12,fontWeight:600,marginBottom:2}}>{product.brand}</div>}
            {product.stores&&<div style={{color:C.sb,fontSize:11,marginBottom:2}}>📍 {product.stores}</div>}
            {product.barcode&&<div style={{color:C.mt,fontSize:10}}>Barcode: {product.barcode}</div>}
          </div>
        </div>
        <div style={{color:C.sb,fontSize:9.5,letterSpacing:1.5,fontWeight:600,marginBottom:8}}>PER 100g</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:18}}>
          {[["Cals",product.per100.calories,C.or,"kcal"],["Protein",product.per100.protein,C.gn,"g"],["Carbs",product.per100.carbs,C.cy,"g"],["Fat",product.per100.fat,C.pp,"g"]].map(([l,v,c,u])=>
            <div key={l} style={{background:C.sf,borderRadius:8,padding:"8px 10px",textAlign:"center"}}>
              <div style={{color:C.sb,fontSize:8.5,letterSpacing:1,fontWeight:600}}>{l.toUpperCase()}</div>
              <div style={{color:c,fontSize:14,fontWeight:800,fontFamily:"Outfit,sans-serif"}}>{Math.round(v*10)/10}<span style={{fontSize:9,color:C.sb}}>{u}</span></div>
            </div>
          )}
        </div>
        <div style={{color:C.sb,fontSize:9.5,letterSpacing:1.5,fontWeight:600,marginBottom:6}}>SERVING SIZE</div>
        {product.servingSize&&<div style={{color:C.sb,fontSize:11,marginBottom:8}}>Suggested: {product.servingSize}</div>}
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10,flexWrap:"wrap"}}>
          <Inp value={servingG} onChange={e=>sServingG(e.target.value)} type="number" style={{width:85}} placeholder="100"/>
          <span style={{color:C.sb,fontSize:12}}>grams</span>
          <div style={{display:"flex",gap:5,marginLeft:"auto"}}>
            {[50,100,150,200].map(g=><button key={g} onClick={()=>sServingG(String(g))} style={{padding:"5px 9px",borderRadius:7,border:"1px solid "+(servingG===String(g)?C.ac:C.bd),background:servingG===String(g)?C.ag:C.sf,color:servingG===String(g)?C.ac:C.sb,fontSize:11,cursor:"pointer",fontWeight:600}}>{g}g</button>)}
          </div>
        </div>
        <div style={{color:C.sb,fontSize:9.5,letterSpacing:1.5,fontWeight:600,marginBottom:8}}>FOR {servingG||0}g SERVING</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:18}}>
          {[["Cals",pm.calories,C.or,"kcal"],["Protein",pm.protein,C.gn,"g"],["Carbs",pm.carbs,C.cy,"g"],["Fat",pm.fat,C.pp,"g"]].map(([l,v,c,u])=>
            <div key={l} style={{background:c+"15",border:"1px solid "+c+"35",borderRadius:8,padding:"9px 10px",textAlign:"center"}}>
              <div style={{color:C.sb,fontSize:8.5,letterSpacing:1,fontWeight:600}}>{l.toUpperCase()}</div>
              <div style={{color:c,fontSize:16,fontWeight:800,fontFamily:"Outfit,sans-serif"}}>{v}<span style={{fontSize:9,color:C.sb}}>{u}</span></div>
            </div>
          )}
        </div>
        <div style={{color:C.sb,fontSize:9.5,letterSpacing:1.5,fontWeight:600,marginBottom:8}}>MEAL TYPE</div>
        <div style={{display:"flex",gap:5,marginBottom:16}}>
          {["Breakfast","Lunch","Dinner","Snack"].map(t=><button key={t} onClick={()=>sMT(t)} style={{flex:1,padding:"7px 4px",borderRadius:8,border:mt===t?"1px solid "+C.ac:"1px solid "+C.bd,background:mt===t?C.ag:C.sf,color:mt===t?C.ac:C.sb,fontSize:10.5,fontWeight:600,cursor:"pointer"}}>{t}</button>)}
        </div>
        <button onClick={logProduct} style={{width:"100%",padding:"13px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#f59e0b,#f97316)",color:"#000",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"Outfit,sans-serif",letterSpacing:0.5}}>
          ✓ Log This Meal
        </button>
      </Cd>
    </>}
  </div>;
}

// WEIGHT
function Weight({data:d,setData:sd,sxp}){const[wt,sWt]=useState(""),[tW,sTW]=useState(d.weightTarget?.weight||""),[tD,sTD]=useState(d.weightTarget?.date||"");const log=(d.weightLog||[]).sort((a,b)=>a.date.localeCompare(b.date)),last=log.length?log[log.length-1]:null;const l7=log.slice(-7).map(w=>({day:dn2(w.date),weight:w.weight}));const add=()=>{if(!wt)return;sd({...d,weightLog:[...(d.weightLog||[]),{id:"w"+Date.now(),weight:parseFloat(wt),date:td()}],xp:d.xp+XP.wt});sWt("");sxp(XP.wt);};return <div><SH title="Weight" sub="Track progress."/><div style={{display:"flex",gap:12,marginBottom:18}}><SC label="CURRENT" value={last?last.weight+"kg":"--"} color={C.cy}/><SC label="CHANGE" value={last&&log[0]?(last.weight-log[0].weight>0?"+":"")+(last.weight-log[0].weight).toFixed(1)+"kg":"--"} color={last&&log[0]?(last.weight<log[0].weight?C.gn:C.rd):C.sb}/></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><Cd><div style={{display:"flex",gap:10,marginBottom:12}}><Inp value={wt} onChange={e=>sWt(e.target.value)} placeholder="kg" type="number" style={{flex:1}}/><Bt onClick={add}>+ Log</Bt></div><div style={{color:C.sb,fontSize:10,fontWeight:600,marginBottom:6}}>TARGET</div><div style={{display:"flex",gap:8,marginBottom:8}}><Inp value={tW} onChange={e=>sTW(e.target.value)} placeholder="kg" type="number" style={{flex:1}}/><Inp value={tD} onChange={e=>sTD(e.target.value)} type="date" style={{flex:1}}/></div><Bt v="secondary" onClick={()=>sd({...d,weightTarget:{weight:parseFloat(tW)||null,date:tD||null}})} style={{width:"100%",justifyContent:"center"}}>Save</Bt>{d.weightTarget?.weight&&<div style={{color:C.sb,fontSize:11,marginTop:8,textAlign:"center"}}>Target: <span style={{color:C.ac,fontWeight:700}}>{d.weightTarget.weight}kg</span></div>}</Cd><Cd><div style={{color:C.sb,fontSize:10,letterSpacing:1.5,fontWeight:600,marginBottom:12}}>TREND</div><ResponsiveContainer width="100%" height={160}><LineChart data={l7}><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:C.sb,fontSize:10}}/><YAxis hide domain={["auto","auto"]}/><Line type="monotone" dataKey="weight" stroke={C.cy} strokeWidth={2.5} dot={{fill:C.cy,r:3}}/></LineChart></ResponsiveContainer></Cd></div></div>;}

// FITNESS
function Fitness({data:d,setData:sd,sxp}){const[type,sT]=useState("Strength"),[dur,sD]=useState(""),[notes,sN]=useState("");const types=["Strength","Cardio","HIIT","Yoga","Sports","Walking"];const add=()=>{sd({...d,workouts:[{id:"fw"+Date.now(),type,duration:parseInt(dur)||0,notes:notes.trim(),date:td()},...d.workouts],xp:d.xp+XP.w});sD("");sN("");sxp(XP.w);};return <div><SH title="Fitness"/><Cd style={{marginBottom:16}}><div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>{types.map(t=><button key={t} onClick={()=>sT(t)} style={{padding:"6px 11px",borderRadius:7,border:type===t?"1px solid "+C.ac:"1px solid "+C.bd,background:type===t?C.ag:C.sf,color:type===t?C.ac:C.sb,fontSize:11.5,fontWeight:600,cursor:"pointer"}}>{t}</button>)}</div><div style={{display:"flex",gap:10}}><Inp value={dur} onChange={e=>sD(e.target.value)} placeholder="Mins" type="number" style={{width:90}}/><Inp value={notes} onChange={e=>sN(e.target.value)} placeholder="Notes" style={{flex:1}}/><Bt onClick={add}>+ Log</Bt></div></Cd>{d.workouts.slice(0,8).map(w=><Cd key={w.id} style={{padding:"11px 16px",marginBottom:5}}><span style={{color:C.tx,fontSize:13,fontWeight:600}}>{w.type}</span><span style={{color:C.sb,fontSize:11}}> · {w.date}{w.duration?" · "+w.duration+"m":""}</span></Cd>)}</div>;}

// FINANCE
function Finance({data:d,setData:sd,sxp}){const[kind,sK]=useState("income"),[amt,sA]=useState(""),[cat,sC2]=useState(""),[note,sN]=useState("");const add=()=>{if(!amt)return;sd({...d,transactions:[{id:"t"+Date.now(),kind,amount:parseFloat(amt),category:cat.trim(),note:note.trim(),date:td()},...d.transactions],xp:d.xp+XP.f});sA("");sC2("");sN("");sxp(XP.f);};const inc=d.transactions.filter(t=>t.kind==="income").reduce((a,t)=>a+t.amount,0),exp=d.transactions.filter(t=>t.kind==="expense").reduce((a,t)=>a+t.amount,0);return <div><SH title="Finance"/><div style={{display:"flex",gap:12,marginBottom:16}}><SC label="IN" value={"£"+inc.toFixed(2)} color={C.gn}/><SC label="OUT" value={"£"+exp.toFixed(2)} color={C.rd}/><SC label="NET" value={(inc-exp>=0?"+":"")+"£"+(inc-exp).toFixed(2)} color={inc-exp>=0?C.gn:C.rd}/></div><Cd style={{marginBottom:16}}><div style={{display:"flex",gap:6,marginBottom:10}}>{["income","expense"].map(k=><button key={k} onClick={()=>sK(k)} style={{flex:1,padding:9,borderRadius:9,border:kind===k?"1px solid "+(k==="income"?C.gn:C.rd):"1px solid "+C.bd,background:kind===k?(k==="income"?C.gg:C.rg):C.sf,color:kind===k?(k==="income"?C.gn:C.rd):C.sb,fontSize:12,fontWeight:600,cursor:"pointer",textTransform:"capitalize"}}>{k}</button>)}</div><div style={{display:"flex",gap:8}}><Inp value={amt} onChange={e=>sA(e.target.value)} placeholder="0.00" type="number" style={{width:100}}/><Inp value={cat} onChange={e=>sC2(e.target.value)} placeholder="Category" style={{flex:1}}/><Inp value={note} onChange={e=>sN(e.target.value)} placeholder="Note" style={{flex:1}}/><Bt onClick={add}>+</Bt></div></Cd>{d.transactions.slice(0,10).map(t=><Cd key={t.id} style={{display:"flex",justifyContent:"space-between",padding:"11px 16px",marginBottom:5}}><span style={{color:C.tx,fontSize:13,fontWeight:600}}>{t.category||t.kind}<span style={{color:C.sb,fontSize:11}}> · {t.date}</span></span><span style={{color:t.kind==="income"?C.gn:C.rd,fontWeight:700}}>{t.kind==="income"?"+":"-"}£{t.amount.toFixed(2)}</span></Cd>)}</div>;}

// READING
function Reading({data:d,setData:sd,sxp}){const[title,sT2]=useState(""),[author,sA2]=useState("");const add=()=>{if(!title.trim())return;sd({...d,books:[...d.books,{id:"b"+Date.now(),title:title.trim(),author:author.trim(),finished:false}],xp:d.xp+XP.b});sT2("");sA2("");sxp(XP.b);};return <div><SH title="Reading"/><Cd style={{marginBottom:14}}><div style={{display:"flex",gap:10}}><Inp value={title} onChange={e=>sT2(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")add();}} placeholder="Book title" style={{flex:1}}/><Inp value={author} onChange={e=>sA2(e.target.value)} placeholder="Author" style={{width:130}}/><Bt onClick={add}>+</Bt></div></Cd>{d.books.filter(b=>!b.finished).map(b=><Cd key={b.id} style={{display:"flex",justifyContent:"space-between",padding:"12px 16px",marginBottom:6}}><span style={{color:C.tx,fontSize:13.5,fontWeight:700}}>{b.title}{b.author&&<span style={{color:C.sb,fontSize:12,fontWeight:400}}> — {b.author}</span>}</span><div style={{display:"flex",gap:5}}><button onClick={()=>sd({...d,books:d.books.map(x=>x.id===b.id?{...x,finished:true}:x)})} style={{background:C.gg,border:"none",borderRadius:6,padding:"4px 9px",color:C.gn,cursor:"pointer",fontSize:11,fontWeight:600}}>Done</button><button onClick={()=>sd({...d,books:d.books.filter(x=>x.id!==b.id)})} style={{background:"none",border:"none",cursor:"pointer",color:C.mt,fontSize:14}}>×</button></div></Cd>)}{d.books.filter(b=>b.finished).length>0&&<div style={{marginTop:14}}><div style={{color:C.sb,fontSize:10,letterSpacing:1.5,fontWeight:600,marginBottom:8}}>FINISHED</div>{d.books.filter(b=>b.finished).map(b=><Cd key={b.id} style={{padding:"10px 16px",marginBottom:5,opacity:0.6}}><span style={{color:C.gn,marginRight:6}}>✓</span><span style={{color:C.tx,fontSize:12.5}}>{b.title}</span></Cd>)}</div>}</div>;}

// SLEEP
function SleepPg({data:d,setData:sd,sxp}){const[hrs,sH]=useState("7"),[qual,sQ]=useState(3),[eng,sEn]=useState(3);const qs=["Terrible","Poor","Fair","Good","Excellent"],es=["Drained","Low","Moderate","High","Peak"];const logged=d.sleepLog[td()];const logS=()=>{sd({...d,sleepLog:{...d.sleepLog,[td()]:{hours:parseFloat(hrs)||0,quality:qual,energy:eng}},xp:d.xp+(logged?0:XP.s)});if(!logged)sxp(XP.s);};const l7=Array.from({length:7},(_,i)=>{const dt=new Date();dt.setDate(dt.getDate()-(6-i));const k=dt.toISOString().split("T")[0];return{day:dn2(k),hours:d.sleepLog[k]?.hours||0};});return <div><SH title="Sleep"/><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><Cd><div style={{marginBottom:12}}><label style={{color:C.sb,fontSize:10,fontWeight:600}}>Hours</label><input type="number" value={hrs} onChange={e=>sH(e.target.value)} step="0.5" style={{width:"100%",background:C.sf,border:"1px solid "+C.bd,borderRadius:9,padding:"9px 12px",color:C.tx,fontSize:15,fontWeight:700,outline:"none",marginTop:4,boxSizing:"border-box"}}/></div><div style={{marginBottom:12}}><label style={{color:C.sb,fontSize:10,fontWeight:600}}>Quality</label><div style={{display:"flex",gap:3,marginTop:4}}>{qs.map((q,i)=><button key={i} onClick={()=>sQ(i)} style={{flex:1,padding:"6px 2px",borderRadius:7,fontSize:9.5,fontWeight:600,cursor:"pointer",border:qual===i?"1px solid "+C.cy:"1px solid "+C.bd,background:qual===i?C.cg:C.sf,color:qual===i?C.cy:C.sb}}>{q}</button>)}</div></div><div style={{marginBottom:12}}><label style={{color:C.sb,fontSize:10,fontWeight:600}}>Energy</label><div style={{display:"flex",gap:3,marginTop:4}}>{es.map((e,i)=><button key={i} onClick={()=>sEn(i)} style={{flex:1,padding:"6px 2px",borderRadius:7,fontSize:9.5,fontWeight:600,cursor:"pointer",border:eng===i?"1px solid "+C.ac:"1px solid "+C.bd,background:eng===i?C.ag:C.sf,color:eng===i?C.ac:C.sb}}>{e}</button>)}</div></div><Bt onClick={logS} style={{width:"100%",justifyContent:"center"}}>{logged?"Update":"Log Sleep"}</Bt></Cd><Cd><div style={{color:C.sb,fontSize:10,letterSpacing:1.5,fontWeight:600,marginBottom:12}}>7-DAY</div><ResponsiveContainer width="100%" height={170}><AreaChart data={l7}><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:C.sb,fontSize:10}}/><YAxis hide domain={[0,10]}/><defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.cy} stopOpacity={0.3}/><stop offset="100%" stopColor={C.cy} stopOpacity={0}/></linearGradient></defs><Area type="monotone" dataKey="hours" stroke={C.cy} fill="url(#sg)" strokeWidth={2.5} dot={{fill:C.cy,r:3}}/></AreaChart></ResponsiveContainer></Cd></div></div>;}

// ANALYTICS
function Analytics({data:d}){const l14=Array.from({length:14},(_,i)=>{const dt=new Date();dt.setDate(dt.getDate()-(13-i));const k=dt.toISOString().split("T")[0];const hl=d.habitLog[k]||[],act=d.habits.filter(h=>h.active);return{day:k.slice(5),h:act.length?Math.round((hl.length/act.length)*100):0};});const jM=d.journal.slice(0,14).reverse().map(j=>({day:j.date.slice(5),m:j.mindset||5,e:j.energy||5}));return <div><SH title="Analytics" sub="Trends across all modules."/><Cd style={{marginBottom:16}}><div style={{color:C.sb,fontSize:10,letterSpacing:1.5,fontWeight:600,marginBottom:12}}>14-DAY HABITS</div><ResponsiveContainer width="100%" height={130}><AreaChart data={l14}><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:C.sb,fontSize:9}}/><YAxis hide domain={[0,100]}/><defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.ac} stopOpacity={0.3}/><stop offset="100%" stopColor={C.ac} stopOpacity={0}/></linearGradient></defs><Area type="monotone" dataKey="h" stroke={C.ac} fill="url(#hg)" strokeWidth={2} dot={{fill:C.ac,r:2}}/></AreaChart></ResponsiveContainer></Cd>{jM.length>0&&<Cd style={{marginBottom:16}}><div style={{color:C.sb,fontSize:10,letterSpacing:1.5,fontWeight:600,marginBottom:12}}>MINDSET & ENERGY</div><ResponsiveContainer width="100%" height={120}><LineChart data={jM}><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:C.sb,fontSize:9}}/><YAxis hide domain={[0,10]}/><Line type="monotone" dataKey="m" stroke={C.ac} strokeWidth={2} dot={{r:2}}/><Line type="monotone" dataKey="e" stroke={C.cy} strokeWidth={2} dot={{r:2}}/></LineChart></ResponsiveContainer></Cd>}<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>{[{l:"Total XP",v:d.xp,c:C.ac},{l:"Streak",v:d.streak,c:C.ac},{l:"Workouts",v:d.workouts.length,c:C.gn},{l:"Books Done",v:d.books.filter(b=>b.finished).length,c:C.pp},{l:"Meals",v:(d.meals||[]).length,c:C.or},{l:"Archived",v:d.goalArchive.length,c:C.cy}].map((s,i)=><Cd key={i} style={{padding:14}}><div style={{color:C.sb,fontSize:10,fontWeight:600}}>{s.l}</div><div style={{color:s.c,fontSize:20,fontWeight:800,fontFamily:"Outfit,sans-serif",marginTop:4}}>{s.v}</div></Cd>)}</div></div>;}

// WEEKLY REVIEW
function WeeklyReview({data:d}){const days=Array.from({length:7},(_,i)=>{const dt=new Date();dt.setDate(dt.getDate()-(6-i));return dt.toISOString().split("T")[0];});const act=d.habits.filter(h=>h.active);const perfDays=days.filter(k=>{const l=d.habitLog[k]||[];return l.length===act.length&&act.length>0;}).length;const wkW=d.workouts.filter(w=>days.includes(w.date)).length;const wkJ=d.journal.filter(j=>days.includes(j.date)).length;const protScores=days.map(k=>{const tl=d.habitLog[k]||[];const hP=act.length?(tl.length/act.length)*100:0;const hJ=d.journal.some(j=>j.date===k)?100:0;const hS=d.sleepLog[k]?100:0;return{day:dn2(k),score:Math.round((hP+hJ+hS)/3)};});const wdDays=days.filter(k=>dayType(k)==="week"),weDays=days.filter(k=>dayType(k)!=="week");const rtA=ds=>ds.length?Math.round(ds.map(k=>{const ri=d[rtKey(dayType(k))]||[],rd=(d.routineLog||{})[k]||[];return ri.length?(rd.length/ri.length)*100:0;}).reduce((a,b)=>a+b,0)/ds.length):0;const wdAvg=rtA(wdDays),weAvg=rtA(weDays);return <div><SH title="Weekly Review"/><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12,marginBottom:12}}><SC label="PERFECT" value={perfDays+"/7"} color={perfDays>=5?C.gn:C.ac}/><SC label="WORKOUTS" value={wkW} color={C.gn}/><SC label="JOURNAL" value={wkJ} color={C.cy}/><SC label="STREAK" value={d.streak} color={C.ac}/></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:18}}><SC label="WEEKDAY ROUTINE" value={wdAvg+"%"} color={C.cy} sub={wdDays.length+" days tracked"}/><SC label="WEEKEND ROUTINE" value={weAvg+"%"} color={C.pp} sub={weDays.length+" days tracked"}/></div><Cd style={{marginBottom:16}}><div style={{color:C.sb,fontSize:10,letterSpacing:1.5,fontWeight:600,marginBottom:12}}>DAILY PROTOCOL X</div><ResponsiveContainer width="100%" height={130}><BarChart data={protScores} barCategoryGap="20%"><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:C.sb,fontSize:10}}/><YAxis hide domain={[0,100]}/><Bar dataKey="score" radius={[5,5,0,0]} fill={C.ac}/></BarChart></ResponsiveContainer></Cd><Cd style={{background:"linear-gradient(135deg,rgba(245,158,11,0.04),rgba(6,182,212,0.02))"}}><div style={{color:C.sb,fontSize:10,letterSpacing:1.5,fontWeight:600,marginBottom:6}}>VERDICT</div><div style={{color:C.tx,fontSize:14,fontWeight:600}}>{perfDays>=6?"🔥 Dominant week.":perfDays>=4?"💪 Solid. Keep building.":perfDays>=2?"⚡ Room to grow.":"🎯 Reset. Come back stronger."}</div></Cd></div>;}

// RANK
function RankPg({data:d}){const rk=gr(d.xp),nx=nrk(d.xp),pct=nx?((d.xp-rk.x)/(nx.x-rk.x))*100:100;return <div><SH title="Rank"/><Cd glow={rk.c+"22"} style={{marginBottom:18,background:"linear-gradient(135deg,"+rk.c+"08,transparent)",borderColor:rk.c+"25"}}><div style={{display:"flex",alignItems:"center",gap:18}}><div style={{fontSize:42}}>{rk.i}</div><div><div style={{color:C.sb,fontSize:10,letterSpacing:2,fontWeight:600}}>CURRENT</div><div style={{color:rk.c,fontSize:26,fontWeight:900,fontFamily:"Outfit,sans-serif"}}>{rk.n}</div></div></div><div style={{marginTop:14}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{color:C.sb,fontSize:11}}>Progress</span><span style={{color:rk.c,fontSize:12,fontWeight:700}}>{d.xp}/{nx?nx.x:rk.x} XP</span></div><div style={{height:7,background:C.sf,borderRadius:5,overflow:"hidden"}}><div style={{height:"100%",borderRadius:5,background:"linear-gradient(90deg,"+rk.c+","+C.ac+")",width:pct+"%"}}/></div></div></Cd><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{RK.map((r,i)=>{const u=d.xp>=r.x,cur=rk.n===r.n;return <Cd key={i} style={{padding:"14px 16px",opacity:u?1:0.35,borderColor:cur?r.c:C.bd,background:cur?r.c+"08":C.cd}}><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:18}}>{r.i}</span><span style={{color:r.c,fontSize:15,fontWeight:800,fontFamily:"Outfit,sans-serif"}}>{r.n}</span>{cur&&<span style={{background:r.c,color:"#000",padding:"2px 7px",borderRadius:5,fontSize:9,fontWeight:800,marginLeft:"auto"}}>NOW</span>}</div><div style={{color:r.c,fontSize:11,fontWeight:700,marginTop:4}}>{r.x.toLocaleString()} XP</div></Cd>})}</div></div>;}

// SETTINGS
function Sett({data:d,setData:sd,onLogout}){return <div><SH title="Settings"/><Cd style={{marginBottom:14}}><div style={{color:C.tx,fontWeight:700,marginBottom:12}}>📦 Data</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8}}>{[{l:"XP",v:d.xp},{l:"Habits",v:d.habits.length},{l:"Journal",v:d.journal.length},{l:"Workouts",v:d.workouts.length},{l:"Meals",v:(d.meals||[]).length},{l:"Weight",v:(d.weightLog||[]).length},{l:"Books",v:d.books.length},{l:"Archived",v:d.goalArchive.length}].map((s,i)=><div key={i} style={{background:C.sf,borderRadius:9,padding:"9px 11px"}}><div style={{color:C.sb,fontSize:9,letterSpacing:1,fontWeight:600}}>{s.l.toUpperCase()}</div><div style={{color:C.tx,fontSize:17,fontWeight:800,fontFamily:"Outfit,sans-serif",marginTop:2}}>{s.v}</div></div>)}</div></Cd><Cd style={{marginBottom:14}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{color:C.tx,fontWeight:700}}>🔄 Reset Data</div><div style={{color:C.sb,fontSize:11}}>Cannot be undone.</div></div><Bt v="danger" onClick={()=>{if(confirm("Erase ALL data?")){sd(DD());}}}>Reset</Bt></div></Cd><Cd><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{color:C.tx,fontWeight:700}}>🚪 Log Out</div></div><Bt v="secondary" onClick={onLogout}>Log Out</Bt></div></Cd></div>;}

// SIDEBAR
function BottomNav({page:p,setPage:sp}){const tabs=[{id:"today",l:"Today",e:"☀"},{id:"habits",l:"Habits",e:"🔥"},{id:"routine",l:"Routine",e:"📋"},{id:"goals",l:"Goals",e:"◎"},{id:"journal",l:"Journal",e:"✎"}];return <div style={{position:"fixed",bottom:0,left:0,right:0,background:"rgba(8,9,13,0.98)",borderTop:"1px solid "+C.bd,display:"flex",justifyContent:"space-around",padding:"8px 0 env(safe-area-inset-bottom,8px)",zIndex:200,backdropFilter:"blur(20px)"}}>{tabs.map(t=>{const a=p===t.id;return <button key={t.id} onClick={()=>sp(t.id)} style={{background:"none",border:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",padding:"4px 12px"}}><span style={{fontSize:18}}>{t.e}</span><span style={{fontSize:9.5,fontWeight:a?700:500,color:a?C.ac:C.sb,letterSpacing:0.5}}>{t.l}</span></button>})}</div>;}

function SB({page:p,setPage:sp,data:d,isAdmin,pendingCount,mobile,open,setOpen}){const rk=gr(d.xp),nx=nrk(d.xp),pct=nx?((d.xp-rk.x)/(nx.x-rk.x))*100:100;const nav=[{id:"today",l:"Today",e:"☀"},{id:"dashboard",l:"Dashboard",e:"⌂"},{id:"habits",l:"Habits",e:"🔥"},{id:"routine",l:"Routine",e:"📋"},{id:"goals",l:"Goals",e:"◎"},{id:"journal",l:"Journal",e:"✎"},{id:"nutrition",l:"Nutrition",e:"🍎"},{id:"weight",l:"Weight",e:"⚖"},{id:"fitness",l:"Fitness",e:"💪"},{id:"finance",l:"Finance",e:"£"},{id:"reading",l:"Reading",e:"📖"},{id:"sleep",l:"Sleep",e:"🌙"},{id:"analytics",l:"Analytics",e:"📊"},{id:"weekly",l:"Week Review",e:"📈"},{id:"rank",l:"Rank",e:"🏆"},{id:"settings",l:"Settings",e:"⚙"}];if(isAdmin)nav.push({id:"admin",l:"Admin",e:"🛡"});
  if(mobile&&!open)return null;
  return <>{mobile&&<div onClick={()=>setOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:150}}/>}<div style={{width:210,minHeight:"100vh",background:"rgba(8,9,13,0.98)",borderRight:"1px solid "+C.bd,display:"flex",flexDirection:"column",padding:"18px 0",position:"fixed",left:0,top:0,zIndex:200,...(mobile?{boxShadow:"4px 0 24px rgba(0,0,0,0.5)"}:{})}}>
    <div style={{padding:"0 14px",marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:9}}><div style={{width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#f59e0b,#f97316)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color:"#000",fontFamily:"Outfit,sans-serif"}}>PX</div><div><div style={{color:C.tx,fontWeight:700,fontSize:13.5,fontFamily:"Outfit,sans-serif"}}>PROTOCOL X</div><div style={{color:C.sb,fontSize:8.5,letterSpacing:2.5,fontWeight:600}}>THE 0.1%</div></div></div>{mobile&&<button onClick={()=>setOpen(false)} style={{background:"none",border:"none",color:C.sb,fontSize:22,cursor:"pointer"}}>×</button>}</div>
    <div style={{padding:"0 8px",flex:1,overflowY:"auto"}}>{nav.map(n=>{const a=p===n.id;return <button key={n.id} onClick={()=>{sp(n.id);if(mobile)setOpen(false);}} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"7px 9px",marginBottom:1,borderRadius:8,border:"none",background:a?"linear-gradient(135deg,rgba(245,158,11,0.12),rgba(245,158,11,0.04))":"transparent",color:a?C.ac:C.sb,cursor:"pointer",fontSize:12,fontWeight:a?600:500,fontFamily:"Plus Jakarta Sans,sans-serif",borderLeft:a?"2px solid #f59e0b":"2px solid transparent",position:"relative"}}><span style={{fontSize:12,width:16,textAlign:"center"}}>{n.e}</span>{n.l}{n.id==="admin"&&pendingCount>0&&<span style={{position:"absolute",right:10,background:C.rd,color:"#fff",fontSize:9,fontWeight:800,padding:"1px 6px",borderRadius:8}}>{pendingCount}</span>}</button>})}</div>
    <div style={{margin:"0 10px",padding:11,borderRadius:10,background:C.cd,border:"1px solid "+C.bd}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}><span style={{fontSize:15}}>{rk.i}</span><span style={{color:rk.c,fontWeight:700,fontSize:10,letterSpacing:1.5,fontFamily:"Outfit,sans-serif"}}>{rk.n.toUpperCase()}</span></div><div style={{height:3,background:C.sf,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:"linear-gradient(90deg,"+rk.c+","+C.ac+")",width:pct+"%"}}/></div><div style={{color:C.sb,fontSize:10,marginTop:4}}>{d.xp} XP{nx?" · "+(nx.x-d.xp)+" to "+nx.n:""}</div></div>
  </div></>;
}

// TRADING HUB
function TradingHub({data:d,setData:sd,onClose}){
  const[tpg,sTpg]=useState("dashboard");
  const[strat,sStrat]=useState("MECH");
  const[flt,sFlt]=useState({year:"All",month:"All",session:"All",asset:"All",dow:"All",result:"All"});
  const[af,sAf]=useState({date:td(),time:"09:00",symbol:"",direction:"long",session:"LDN",rValue:"",setup:"",notes:""});
  const[csvMsg,sCsvMsg]=useState("");
  const[addMode,sAddMode]=useState("paste");
  const[pasteText,sPasteText]=useState("");
  const fileRef=useRef();
  const mobile=useIsMobile();
  const ts=d.trades||[];
  const STRATS={MECH:{c:"#06b6d4",g:"rgba(6,182,212,0.12)"},HYBRID:{c:"#f59e0b",g:"rgba(245,158,11,0.12)"},LRV:{c:"#8b5cf6",g:"rgba(139,92,246,0.12)"}};
  const sc=STRATS[strat];
  const sts=ts.filter(t=>(t.strategy||"MECH")===strat);
  const yr=[...new Set(sts.map(t=>t.date.slice(0,4)))].sort().reverse();
  const mo=[...new Set(sts.map(t=>t.date.slice(0,7)))].sort().reverse();
  const as=[...new Set(sts.map(t=>t.symbol))].sort();
  const ss=["LDN","NY","OTHER"];
  const DNS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const MNS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const ft=sts.filter(t=>{
    if(flt.year!=="All"&&!t.date.startsWith(flt.year))return false;
    if(flt.month!=="All"&&!t.date.startsWith(flt.month))return false;
    if(flt.session!=="All"&&t.session!==flt.session)return false;
    if(flt.asset!=="All"&&t.symbol!==flt.asset)return false;
    if(flt.dow!=="All"){if(DNS[new Date(t.date+"T12:00:00").getDay()]!==flt.dow)return false;}
    if(flt.result!=="All"&&t.result!==flt.result.toLowerCase())return false;
    return true;
  }).sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time));

  const wins=ft.filter(t=>t.result==="win"),losses=ft.filter(t=>t.result==="loss");
  const totalR=ft.reduce((a,t)=>a+t.rValue,0);
  const wr=ft.length?wins.length/ft.length*100:0;
  const avgW=wins.length?wins.reduce((a,t)=>a+t.rValue,0)/wins.length:0;
  const avgL=losses.length?losses.reduce((a,t)=>a+t.rValue,0)/losses.length:0;
  const exp=ft.length?(wr/100*avgW+(1-wr/100)*avgL):0;
  const pfac=losses.length&&Math.abs(avgL)>0?(Math.abs(avgW)*wins.length)/(Math.abs(avgL)*losses.length):wins.length?Infinity:0;
  let pk=0,mxDD=0,cu=0;for(const t of ft){cu+=t.rValue;if(cu>pk)pk=cu;const dr=pk-cu;if(dr>mxDD)mxDD=dr;}
  let bS=0,wS=0,cs=0,ct="";for(const t of ft){if(t.result==="win"){cs=ct==="win"?cs+1:1;ct="win";bS=Math.max(bS,cs);}else if(t.result==="loss"){cs=ct==="loss"?cs+1:1;ct="loss";wS=Math.max(wS,cs);}}
  const l5=[...ft].slice(-5);
  let ec=0;const eqD=ft.map((t,i)=>{ec+=t.rValue;return{n:i+1,r:parseFloat(ec.toFixed(2))};});

  const rf=r=>(r>=0?"+":"")+r.toFixed(1)+"R";
  const rc=r=>r>0?C.gn:r<0?C.rd:C.sb;
  const wc=w=>w>=55?C.gn:w>=45?C.ac:C.rd;
  const resetFlt=()=>sFlt({year:"All",month:"All",session:"All",asset:"All",dow:"All",result:"All"});

  const brkBy=key=>Object.entries(ft.reduce((acc,t)=>{const k=t[key]||"?";if(!acc[k])acc[k]={tr:0,wi:0,tR:0};acc[k].tr++;if(t.result==="win")acc[k].wi++;acc[k].tR+=t.rValue;return acc;},{})).map(([k,v])=>({k,tr:v.tr,wp:v.tr?Math.round(v.wi/v.tr*100):0,tR:parseFloat(v.tR.toFixed(1))})).sort((a,b)=>b.tr-a.tr);
  const brkDow=()=>{const acc={};ft.forEach(t=>{const dw=DNS[new Date(t.date+"T12:00:00").getDay()];if(!acc[dw])acc[dw]={tr:0,wi:0,tR:0};acc[dw].tr++;if(t.result==="win")acc[dw].wi++;acc[dw].tR+=t.rValue;});return Object.entries(acc).map(([k,v])=>({k,tr:v.tr,wp:v.tr?Math.round(v.wi/v.tr*100):0,tR:parseFloat(v.tR.toFixed(1))})).sort((a,b)=>b.tr-a.tr);};
  const brkMo=()=>{const acc={};ft.forEach(t=>{const mk=t.date.slice(0,7);if(!acc[mk])acc[mk]={tr:0,wi:0,tR:0,lb:MNS[parseInt(t.date.slice(5,7))-1].toUpperCase()};acc[mk].tr++;if(t.result==="win")acc[mk].wi++;acc[mk].tR+=t.rValue;});return Object.entries(acc).map(([,v])=>({k:v.lb,tr:v.tr,wp:v.tr?Math.round(v.wi/v.tr*100):0,tR:parseFloat(v.tR.toFixed(1))}));};

  const addT=()=>{const r=parseFloat(af.rValue);if(!af.symbol.trim()||isNaN(r))return;const res=r>0?"win":r<0?"loss":"be";sd({...d,trades:[...(d.trades||[]),{id:"t"+Date.now(),date:af.date,time:af.time,symbol:af.symbol.trim().toUpperCase(),direction:af.direction,session:af.session,rValue:r,result:res,setup:af.setup,notes:af.notes,strategy:strat}]});sAf({date:td(),time:"09:00",symbol:"",direction:"long",session:"LDN",rValue:"",setup:"",notes:""});sTpg("log");};
  const delT=id=>sd({...d,trades:(d.trades||[]).filter(t=>t.id!==id)});
  const importC=e=>{const file=e.target.files[0];if(!file)return;const rdr=new FileReader();rdr.onload=ev=>{const lines=ev.target.result.split("\n").filter(l=>l.trim());const nT=[];for(let i=1;i<lines.length;i++){const c=lines[i].split(",").map(x=>x.trim().replace(/^"|"$/g,""));if(c.length<6)continue;const[dt,ti,sym,dir,sess,rv,...rest]=c;const rv2=parseFloat(rv);if(!dt||!sym||isNaN(rv2))continue;nT.push({id:"t"+Date.now()+i,date:dt,time:ti||"09:00",symbol:sym.toUpperCase(),direction:dir||"long",session:sess||"OTHER",rValue:rv2,result:rv2>0?"win":rv2<0?"loss":"be",setup:rest[0]||"",notes:rest[1]||"",strategy:strat});}if(!nT.length){sCsvMsg("No valid rows. Format: date,time,symbol,direction,session,r");return;}sd({...d,trades:[...(d.trades||[]),...nT]});sCsvMsg(nT.length+" "+strat+" trades imported!");setTimeout(()=>sCsvMsg(""),3000);};rdr.readAsText(file);e.target.value="";};
  const exportC=()=>{const rows=[["strategy","date","time","symbol","direction","session","r","result","setup","notes"],...sts.map(t=>[t.strategy||strat,t.date,t.time,t.symbol,t.direction,t.session,t.rValue,t.result,t.setup||"",t.notes||""])];const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([rows.map(r=>r.join(",")).join("\n")],{type:"text/csv"}));a.download=`protocol_x_${strat.toLowerCase()}_trades.csv`;a.click();};

  const normDate=s=>{if(!s)return null;s=s.trim();if(/^\d{4}-\d{2}-\d{2}$/.test(s))return s;const a=s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);if(a){const[,p1,p2,yr]=a;return parseInt(p1)>12?`${yr}-${p2.padStart(2,"0")}-${p1.padStart(2,"0")}`:`${yr}-${p1.padStart(2,"0")}-${p2.padStart(2,"0")}`;}const b=s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);if(b)return `${b[1]}-${b[2].padStart(2,"0")}-${b[3].padStart(2,"0")}`;return null;};
  const parsePaste=raw=>{if(!raw.trim())return[];const lines=raw.trim().split("\n").filter(l=>l.trim());if(!lines.length)return[];const sep=lines[0].includes("\t")?"\t":",";const rows=lines.map(l=>l.split(sep).map(c=>c.trim().replace(/^"|"$/g,"")));const h0=rows[0].map(c=>c.toLowerCase().replace(/[^a-z0-9]/g,""));const MAPS={date:["date","day","tradedate"],time:["time","entrytime"],symbol:["symbol","pair","instrument","asset","market","ticker","currency"],direction:["direction","side","type","dir","buysell","longshort"],session:["session","sess","market"],r:["r","rvalue","rr","pnl","pandl","profit","result","risk"],setup:["setup","strategy","pattern","strat","entry","signal"],notes:["notes","note","comment","comments","detail","details","remarks"]};const colMap={date:-1,time:-1,symbol:-1,direction:-1,session:-1,r:-1,setup:-1,notes:-1};let hasHeader=false;for(const[f,aliases]of Object.entries(MAPS)){for(let i=0;i<h0.length;i++){if(aliases.some(a=>h0[i].includes(a))){colMap[f]=i;hasHeader=true;break;}}}if(!hasHeader){Object.assign(colMap,{date:0,time:1,symbol:2,direction:3,session:4,r:5,setup:6,notes:7});}const data=rows.slice(hasHeader?1:0);return data.map((cols,i)=>{const g=k=>colMap[k]>=0&&colMap[k]<cols.length?cols[colMap[k]]:"";const dt=normDate(g("date"));const sym=(g("symbol")||"").toUpperCase().replace(/[^A-Z0-9./]/g,"");const raw=g("r").replace(/\s/g,"");const rv=parseFloat(raw.replace(/[^0-9.\-+]/g,""));const errs=[];if(!dt)errs.push("invalid date");if(!sym)errs.push("missing symbol");if(isNaN(rv))errs.push("invalid R value");const rawDir=(g("direction")||"long").toLowerCase();const dir=rawDir.includes("sell")||rawDir.includes("short")?"short":"long";const rawSess=(g("session")||"OTHER").toUpperCase().trim();const sess=["LDN","NY","ASIA","OTHER"].includes(rawSess)?rawSess:(rawSess.includes("LON")?"LDN":rawSess.includes("NEW")||rawSess.includes("NY")?"NY":rawSess.includes("ASIA")?"ASIA":"OTHER");return{id:"t"+Date.now()+i,date:dt||"",time:g("time")||"09:00",symbol:sym,direction:dir,session:sess,rValue:isNaN(rv)?0:rv,result:isNaN(rv)||rv===0?"be":rv>0?"win":"loss",setup:g("setup")||"",notes:g("notes")||"",valid:errs.length===0,errs};}).filter(r=>r.date||r.symbol);};
  const FltSel=({l,k,opts})=><div><div style={{color:C.sb,fontSize:8.5,letterSpacing:1.5,fontWeight:700,marginBottom:4}}>{l}</div><select value={flt[k]} onChange={e=>sFlt({...flt,[k]:e.target.value})} style={{background:C.cd,border:"1px solid "+C.bd,borderRadius:8,padding:"7px 10px",color:C.tx,fontSize:12,cursor:"pointer",outline:"none",fontFamily:"Plus Jakarta Sans,sans-serif"}}>{["All",...opts].map(o=><option key={o} value={o}>{o}</option>)}</select></div>;
  const BrkRows=({rows})=>rows.length===0?<div style={{color:C.sb,fontSize:12,padding:"8px 0"}}>No data</div>:<>{rows.map(r=><div key={r.k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid "+C.bd}}><span style={{color:C.tx,fontSize:13,fontWeight:600,flex:1}}>{r.k}</span><div style={{display:"flex",gap:18}}><div style={{textAlign:"right",minWidth:40}}><div style={{color:C.sb,fontSize:8,letterSpacing:1,fontWeight:600}}>TRADES</div><div style={{color:C.tx,fontSize:13,fontWeight:700}}>{r.tr}</div></div><div style={{textAlign:"right",minWidth:44}}><div style={{color:C.sb,fontSize:8,letterSpacing:1,fontWeight:600}}>WIN%</div><div style={{color:wc(r.wp),fontSize:13,fontWeight:700}}>{r.wp}%</div></div><div style={{textAlign:"right",minWidth:60}}><div style={{color:C.sb,fontSize:8,letterSpacing:1,fontWeight:600}}>TOTAL R</div><div style={{color:rc(r.tR),fontSize:13,fontWeight:700}}>{rf(r.tR)}</div></div></div></div>)}</>;
  const TSC=({label,value,sub,glow})=><div style={{background:C.cd,border:"1px solid "+C.bd,borderRadius:14,padding:"16px 20px",flex:1,minWidth:130,...(glow?{boxShadow:"0 0 24px "+glow}:{})}}><div style={{color:C.sb,fontSize:8.5,letterSpacing:1.8,fontWeight:700,marginBottom:8,fontFamily:"Outfit,sans-serif"}}>{label}</div><div style={{fontFamily:"Outfit,sans-serif",lineHeight:1}}>{value}</div>{sub&&<div style={{marginTop:8}}>{sub}</div>}</div>;
  const navItems=[{id:"dashboard",l:"📊 Dashboard"},{id:"log",l:"📋 Trade Log"},{id:"breakdowns",l:"🔍 Breakdowns"},{id:"add",l:"+ Log Trade"}];
  const FltBar=({extra=[]})=><div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap",alignItems:"flex-end"}}><FltSel l="YEAR" k="year" opts={yr}/><FltSel l="MONTH" k="month" opts={mo}/><FltSel l="SESSION" k="session" opts={ss}/><FltSel l="ASSET" k="asset" opts={as}/>{extra.map((e,i)=><React.Fragment key={i}>{e}</React.Fragment>)}<button onClick={resetFlt} style={{background:C.sf,border:"1px solid "+C.bd,borderRadius:8,padding:"8px 14px",color:C.sb,cursor:"pointer",fontSize:12,fontWeight:600,alignSelf:"flex-end"}}>Reset</button></div>;

  return <div style={{position:"fixed",inset:0,background:C.bg,zIndex:200,display:"flex",flexDirection:"column",fontFamily:"Plus Jakarta Sans,sans-serif"}}>
    {/* Portal Header */}
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",height:58,borderBottom:"1px solid "+C.bd,background:"rgba(8,9,13,0.98)",backdropFilter:"blur(20px)",flexShrink:0,zIndex:10}}>
      <div style={{display:"flex",alignItems:"center",gap:14}}>
        <button onClick={onClose} style={{background:C.sf,border:"1px solid "+C.bd,borderRadius:8,padding:"6px 12px",color:C.sb,cursor:"pointer",fontSize:11,fontWeight:600,display:"flex",alignItems:"center",gap:5}}>← Protocol X</button>
        <div style={{width:1,height:20,background:C.bd}}/>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,#10b981,#059669)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>📈</div>
          <div><div style={{color:C.tx,fontWeight:800,fontSize:14,fontFamily:"Outfit,sans-serif",letterSpacing:0.5}}>TRADING HUB</div><div style={{color:"#10b981",fontSize:8.5,letterSpacing:2,fontWeight:600}}>PROTOCOL X</div></div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        {csvMsg&&<div style={{color:C.gn,fontSize:11,fontWeight:600,padding:"6px 12px",background:C.gg,borderRadius:8,border:"1px solid rgba(16,185,129,0.2)"}}>{csvMsg}</div>}
        <input type="file" ref={fileRef} accept=".csv" style={{display:"none"}} onChange={importC}/>
        <button onClick={exportC} style={{background:C.sf,border:"1px solid "+C.bd,borderRadius:8,padding:"7px 14px",color:C.tx,cursor:"pointer",fontSize:11,fontWeight:600}}>↓ Export CSV</button>
        <button onClick={()=>fileRef.current?.click()} style={{background:"linear-gradient(135deg,#10b981,#059669)",border:"none",borderRadius:8,padding:"7px 14px",color:"#fff",cursor:"pointer",fontSize:11,fontWeight:700}}>+ Import CSV</button>
        <button onClick={()=>sTpg("add")} style={{background:"linear-gradient(135deg,#f59e0b,#f97316)",border:"none",borderRadius:8,padding:"7px 14px",color:"#000",cursor:"pointer",fontSize:11,fontWeight:800}}>+ Log Trade</button>
      </div>
    </div>
    {/* Sub-nav */}
    <div style={{display:"flex",gap:2,padding:"10px 24px",borderBottom:"1px solid "+C.bd,background:"rgba(8,9,13,0.95)",flexShrink:0}}>
      {navItems.map(n=><button key={n.id} onClick={()=>sTpg(n.id)} style={{padding:"7px 16px",borderRadius:8,border:tpg===n.id?"1px solid "+sc.c:"1px solid transparent",background:tpg===n.id?sc.g:"transparent",color:tpg===n.id?sc.c:C.sb,fontSize:12,fontWeight:tpg===n.id?700:500,cursor:"pointer",fontFamily:"Plus Jakarta Sans,sans-serif",transition:"all 0.15s"}}>{n.l}</button>)}
      <div style={{flex:1}}/>
      <div style={{color:C.sb,fontSize:11,alignSelf:"center"}}>{sts.length} {strat} trades · filtered: {ft.length}</div>
    </div>
    {/* Strategy Selector */}
    <div style={{display:"flex",gap:0,borderBottom:"1px solid "+C.bd,background:"rgba(8,9,13,0.92)",flexShrink:0,padding:"0 24px"}}>
      {Object.entries(STRATS).map(([sk,sv])=>{
        const stTrades=ts.filter(t=>(t.strategy||"MECH")===sk);
        const stR=stTrades.reduce((a,t)=>a+t.rValue,0);
        const stWr=stTrades.length?Math.round(stTrades.filter(t=>t.result==="win").length/stTrades.length*100):0;
        const active=strat===sk;
        return <button key={sk} onClick={()=>{sStrat(sk);sFlt({year:"All",month:"All",session:"All",asset:"All",dow:"All",result:"All"});}} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 24px",border:"none",background:"transparent",cursor:"pointer",borderBottom:active?"2px solid "+sv.c:"2px solid transparent",transition:"all 0.15s",marginBottom:"-1px"}}>
          <div style={{textAlign:"left"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{color:active?sv.c:C.sb,fontSize:14,fontWeight:900,fontFamily:"Outfit,sans-serif",letterSpacing:1}}>{sk}</span>
              {active&&<span style={{background:sv.g,color:sv.c,fontSize:8,fontWeight:800,padding:"2px 6px",borderRadius:4,letterSpacing:1}}>ACTIVE</span>}
            </div>
            <div style={{display:"flex",gap:10,marginTop:3}}>
              <span style={{color:C.sb,fontSize:10}}>{stTrades.length} trades</span>
              {stTrades.length>0&&<><span style={{color:stR>0?"#10b981":stR<0?"#ef4444":C.sb,fontSize:10,fontWeight:700}}>{(stR>=0?"+":"")+stR.toFixed(1)}R</span><span style={{color:stWr>=50?"#10b981":C.sb,fontSize:10}}>{stWr}% win</span></>}
            </div>
          </div>
        </button>;
      })}
    </div>
    {/* Content */}
    <div style={{flex:1,overflowY:"auto",padding:"20px 24px"}}>
    <div style={{maxWidth:1200,margin:"0 auto"}}>

    {/* DASHBOARD */}
    {tpg==="dashboard"&&<div>
      <FltBar extra={[<FltSel l="DAY" k="dow" opts={DNS.slice(1).concat(DNS[0])}/>,<FltSel l="RESULT" k="result" opts={["Win","Loss","BE"]}/>]}/>
      {ft.length===0?<div style={{textAlign:"center",padding:"60px 0"}}><div style={{fontSize:48,marginBottom:16}}>📊</div><div style={{color:C.tx,fontSize:18,fontWeight:700,marginBottom:8,fontFamily:"Outfit,sans-serif"}}>Trading Journal Empty</div><div style={{color:C.sb,fontSize:13,marginBottom:24}}>Log your first trade or import a CSV to see your stats</div><div style={{display:"flex",gap:10,justifyContent:"center"}}><Bt onClick={()=>sTpg("add")}>+ Log First Trade</Bt><Bt v="secondary" onClick={()=>fileRef.current?.click()}>Import CSV</Bt></div></div>:<>
      <div style={{display:"flex",gap:10,marginBottom:10,flexWrap:"wrap"}}>
        <TSC label="TOTAL R" value={<span style={{color:rc(totalR),fontSize:30,fontWeight:900}}>{rf(totalR)}</span>} sub={<div style={{color:C.sb,fontSize:11}}>{ft.length} trades</div>} glow={totalR>0?"rgba(16,185,129,0.15)":"rgba(239,68,68,0.1)"}/>
        <TSC label="WIN RATE" value={<span style={{color:wc(wr),fontSize:30,fontWeight:900}}>{wr.toFixed(1)}%</span>} sub={<div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}><span style={{color:C.gn,fontSize:11,fontWeight:700}}>{wins.length}W</span><span style={{color:C.sb,fontSize:11}}>/</span><span style={{color:C.rd,fontSize:11,fontWeight:700}}>{losses.length}L</span><div style={{flex:1,height:4,background:C.sf,borderRadius:2,overflow:"hidden",maxWidth:60}}><div style={{height:"100%",background:"linear-gradient(90deg,"+C.gn+",#059669)",width:Math.round(wr)+"%",borderRadius:2}}/></div></div>}/>
        <TSC label="AVG WIN / AVG LOSS" value={<span style={{fontSize:20,fontWeight:900}}><span style={{color:C.gn}}>{rf(avgW)}</span><span style={{color:C.sb,fontSize:16}}> / </span><span style={{color:C.rd}}>{rf(avgL)}</span></span>}/>
        <TSC label="EXPECTANCY" value={<span style={{color:rc(exp),fontSize:28,fontWeight:900}}>{rf(exp)}</span>} sub={<div style={{color:C.sb,fontSize:11,marginTop:2}}>per trade</div>}/>
        <TSC label="PROFIT FACTOR" value={<span style={{color:pfac>=1.5?C.gn:pfac>=1?C.ac:C.rd,fontSize:28,fontWeight:900}}>{isFinite(pfac)?pfac.toFixed(2):"∞"}</span>}/>
        <TSC label="MAX DRAWDOWN" value={<span style={{color:C.rd,fontSize:28,fontWeight:900}}>-{mxDD.toFixed(1)}R</span>}/>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap"}}>
        <TSC label="BEST STREAK" value={<span style={{color:C.gn,fontSize:28,fontWeight:900}}>{bS}W</span>} sub={<div style={{color:C.sb,fontSize:11,marginTop:2}}>Worst: {wS}L</div>}/>
        <TSC label="LAST 5 TRADES" value={<div style={{display:"flex",gap:8,alignItems:"center",marginTop:4}}>{l5.length===0?<span style={{color:C.sb,fontSize:13}}>–</span>:l5.map((t,i)=><div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><div style={{width:14,height:14,borderRadius:"50%",background:t.result==="win"?C.gn:t.result==="loss"?C.rd:C.sb}}/><span style={{color:C.sb,fontSize:9,fontWeight:600,fontFamily:"Outfit,sans-serif"}}>{rf(t.rValue)}</span></div>)}</div>} sub={l5.length>0&&<div style={{color:C.sb,fontSize:10,marginTop:4}}>{l5.map(t=>rf(t.rValue)).join(", ")}</div>}/>
      </div>
      <div style={{background:C.cd,border:"1px solid "+C.bd,borderRadius:14,padding:"20px 20px 14px"}}>
        <div style={{color:C.sb,fontSize:8.5,letterSpacing:2,fontWeight:700,marginBottom:14}}>EQUITY CURVE (CUMULATIVE R)</div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={eqD} margin={{top:5,right:10,left:0,bottom:0}}>
            <defs><linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient></defs>
            <XAxis dataKey="n" hide/>
            <YAxis axisLine={false} tickLine={false} tick={{fill:C.sb,fontSize:10}} tickFormatter={v=>v+"R"} width={35}/>
            <Tooltip contentStyle={{background:C.gl,border:"1px solid "+C.bd,borderRadius:10,color:C.tx,fontSize:11}} formatter={v=>[v+"R","Cumulative R"]}/>
            <Area type="monotone" dataKey="r" stroke="#10b981" strokeWidth={2.5} fill="url(#eqGrad)"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      </>}
    </div>}

    {/* BREAKDOWNS */}
    {tpg==="breakdowns"&&<div>
      <FltBar/>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:12}}>
        <Cd style={{flex:1,minWidth:260}}><div style={{color:C.sb,fontSize:9,letterSpacing:2,fontWeight:700,marginBottom:14}}>SESSION BREAKDOWN</div><BrkRows rows={brkBy("session")}/></Cd>
        <Cd style={{flex:1,minWidth:260}}><div style={{color:C.sb,fontSize:9,letterSpacing:2,fontWeight:700,marginBottom:14}}>ASSET BREAKDOWN</div><BrkRows rows={brkBy("symbol")}/></Cd>
        <Cd style={{flex:1,minWidth:260}}><div style={{color:C.sb,fontSize:9,letterSpacing:2,fontWeight:700,marginBottom:14}}>DAY OF WEEK</div><BrkRows rows={brkDow()}/></Cd>
      </div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <Cd style={{flex:1,minWidth:260}}><div style={{color:C.sb,fontSize:9,letterSpacing:2,fontWeight:700,marginBottom:14}}>MONTHLY BREAKDOWN</div><BrkRows rows={brkMo()}/></Cd>
        <Cd style={{flex:1,minWidth:260}}><div style={{color:C.sb,fontSize:9,letterSpacing:2,fontWeight:700,marginBottom:14}}>DIRECTION BREAKDOWN</div><BrkRows rows={brkBy("direction")}/></Cd>
      </div>
    </div>}

    {/* TRADE LOG */}
    {tpg==="log"&&<div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <div><div style={{color:C.sb,fontSize:8.5,letterSpacing:2,fontWeight:700}}>TRADE LOG</div><div style={{color:C.tx,fontSize:13,fontWeight:700,marginTop:2}}>{ft.length} trades · Total R: <span style={{color:rc(totalR)}}>{rf(totalR)}</span></div></div>
        <div style={{display:"flex",gap:8}}>
          <FltSel l="ASSET" k="asset" opts={as}/>
          <FltSel l="SESSION" k="session" opts={ss}/>
          <FltSel l="RESULT" k="result" opts={["Win","Loss","BE"]}/>
          <button onClick={resetFlt} style={{background:C.sf,border:"1px solid "+C.bd,borderRadius:8,padding:"7px 10px",color:C.sb,cursor:"pointer",fontSize:11,fontWeight:600,alignSelf:"flex-end"}}>Reset</button>
        </div>
      </div>
      {ft.length===0?<Cd style={{textAlign:"center",padding:30}}><div style={{color:C.sb,fontSize:13}}>No trades match filters</div></Cd>:<div>
        <div style={{display:"grid",gridTemplateColumns:"90px 1fr 80px 70px 70px 60px 70px 30px",gap:8,padding:"6px 16px",marginBottom:4}}>{["DATE","SYMBOL","SESSION","DIR","SETUP","R","RESULT",""].map(h=><div key={h} style={{color:C.sb,fontSize:8.5,letterSpacing:1.5,fontWeight:700}}>{h}</div>)}</div>
        {[...ft].reverse().map(t=><div key={t.id} style={{display:"grid",gridTemplateColumns:"90px 1fr 80px 70px 70px 60px 70px 30px",gap:8,padding:"11px 16px",borderRadius:10,marginBottom:4,background:C.cd,border:"1px solid "+C.bd,alignItems:"center"}}>
          <div><div style={{color:C.tx,fontSize:11,fontWeight:600}}>{t.date}</div><div style={{color:C.sb,fontSize:9}}>{t.time}</div></div>
          <div><div style={{color:C.tx,fontWeight:800,fontSize:13,fontFamily:"Outfit,sans-serif"}}>{t.symbol}</div>{t.notes&&<div style={{color:C.sb,fontSize:10,marginTop:2,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",maxWidth:200}}>{t.notes}</div>}</div>
          <div style={{color:C.sb,fontSize:12,fontWeight:600}}>{t.session}</div>
          <div style={{color:t.direction==="long"?C.gn:C.rd,fontSize:11,fontWeight:700,textTransform:"uppercase"}}>{t.direction}</div>
          <div>{t.setup?<span style={{background:C.ag,color:C.ac,padding:"2px 7px",borderRadius:5,fontSize:9,fontWeight:700}}>{t.setup}</span>:<span style={{color:C.mt}}>–</span>}</div>
          <div style={{color:rc(t.rValue),fontWeight:900,fontSize:14,fontFamily:"Outfit,sans-serif"}}>{rf(t.rValue)}</div>
          <div style={{color:t.result==="win"?C.gn:t.result==="loss"?C.rd:C.sb,fontSize:9,fontWeight:700,letterSpacing:1}}>{t.result.toUpperCase()}</div>
          <button onClick={()=>delT(t.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.mt,fontSize:16,padding:0}}>×</button>
        </div>)}
      </div>}
    </div>}

    {/* ADD TRADE */}
    {tpg==="add"&&<div>
      <SH title="Log Trades" sub="Paste directly from Google Sheets or enter one manually."/>
      {/* Mode toggle */}
      <div style={{display:"flex",gap:4,marginBottom:18,background:C.cd,border:"1px solid "+C.bd,borderRadius:12,padding:4}}>
        {[{k:"paste",l:"📋 Paste from Sheets",sub:"Paste multiple rows at once"},{k:"single",l:"✏️ Single Trade",sub:"Manual entry form"}].map(m=><button key={m.k} onClick={()=>{sAddMode(m.k);sPasteText("");}} style={{flex:1,padding:"10px 12px",borderRadius:9,border:"none",background:addMode===m.k?"linear-gradient(135deg,rgba(16,185,129,0.15),rgba(16,185,129,0.08))":  "transparent",cursor:"pointer",textAlign:"left"}}><div style={{color:addMode===m.k?"#10b981":C.tx,fontSize:12.5,fontWeight:700,fontFamily:"Plus Jakarta Sans,sans-serif"}}>{m.l}</div><div style={{color:C.sb,fontSize:10.5,marginTop:2}}>{m.sub}</div></button>)}
      </div>

      {/* PASTE MODE */}
      {addMode==="paste"&&(()=>{
        const preview=parsePaste(pasteText);
        const valid=preview.filter(r=>r.valid);
        const invalid=preview.filter(r=>!r.valid);
        const confirmAll=()=>{if(!valid.length)return;sd({...d,trades:[...(d.trades||[]),...valid.map(({valid:_,errs:__,...t})=>({...t,strategy:strat}))]});sPasteText("");sTpg("log");};
        return <div>
          <Cd style={{padding:20,marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div><div style={{color:C.tx,fontSize:13,fontWeight:700}}>Paste your Google Sheets data below</div><div style={{color:C.sb,fontSize:11,marginTop:2}}>Select your rows in Sheets (Ctrl+C / Cmd+C) then paste here. Headers optional.</div></div>
              {pasteText&&<div style={{display:"flex",gap:8,alignItems:"center"}}>{valid.length>0&&<span style={{color:C.gn,fontSize:11,fontWeight:700,background:C.gg,padding:"3px 10px",borderRadius:6}}>{valid.length} valid</span>}{invalid.length>0&&<span style={{color:C.rd,fontSize:11,fontWeight:700,background:C.rg,padding:"3px 10px",borderRadius:6}}>{invalid.length} errors</span>}</div>}
            </div>
            <textarea value={pasteText} onChange={e=>sPasteText(e.target.value)} placeholder={"Paste rows here — e.g. from Google Sheets:\n\n2024-01-15\t09:30\tEURUSD\tlong\tLDN\t1.5\tBOS\tGood setup\n2024-01-16\t14:00\tNQ\tshort\tNY\t-1.0\tMSS\tEarly entry\n\nColumn headers are auto-detected if present."} rows={8} style={{background:C.sf,border:"1px solid "+C.bd,borderRadius:10,padding:"12px 14px",color:C.tx,fontSize:12,width:"100%",boxSizing:"border-box",resize:"vertical",outline:"none",fontFamily:"monospace",lineHeight:1.7}}/>
          </Cd>

          {/* Tips */}
          {!pasteText&&<Cd style={{padding:16,marginBottom:16,borderColor:"rgba(16,185,129,0.2)",background:"rgba(16,185,129,0.04)"}}>
            <div style={{color:"#10b981",fontSize:9.5,letterSpacing:1.5,fontWeight:700,marginBottom:10}}>HOW IT WORKS</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[{n:"1. Open Google Sheets",d:"Your trading journal with all your trades"},{n:"2. Select your data",d:"Highlight all rows (with or without headers)"},{n:"3. Copy (Cmd+C)",d:"Then click the text box above and paste"},{n:"4. Review & confirm",d:"Preview all detected trades, then import"}].map(s=><div key={s.n} style={{display:"flex",gap:8}}><div style={{width:20,height:20,borderRadius:6,background:"rgba(16,185,129,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><div style={{width:6,height:6,borderRadius:"50%",background:"#10b981"}}/></div><div><div style={{color:C.tx,fontSize:11.5,fontWeight:600}}>{s.n}</div><div style={{color:C.sb,fontSize:10.5,marginTop:1}}>{s.d}</div></div></div>)}
            </div>
            <div style={{marginTop:14,padding:"10px 14px",background:C.cd,borderRadius:8,border:"1px solid "+C.bd}}>
              <div style={{color:C.sb,fontSize:9,letterSpacing:1.5,fontWeight:700,marginBottom:6}}>SUPPORTED COLUMN ORDER (auto-detected)</div>
              <div style={{color:C.sb,fontSize:11,fontFamily:"monospace"}}>Date · Time · Symbol · Direction · Session · R · Setup · Notes</div>
              <div style={{color:C.mt,fontSize:10,marginTop:4}}>Column headers are matched automatically — "Pair", "Instrument", "P&L" etc. all work.</div>
            </div>
          </Cd>}

          {/* Preview */}
          {preview.length>0&&<div style={{marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{color:C.sb,fontSize:9,letterSpacing:2,fontWeight:700}}>PREVIEW — {preview.length} ROW{preview.length!==1?"S":""} DETECTED</div>
              <Bt onClick={()=>sPasteText("")} v="secondary" style={{padding:"5px 12px",fontSize:10}}>Clear</Bt>
            </div>
            <div style={{maxHeight:340,overflowY:"auto",borderRadius:10,border:"1px solid "+C.bd}}>
              <div style={{display:"grid",gridTemplateColumns:"90px 80px 70px 70px 55px 55px 80px 1fr 80px",gap:6,padding:"7px 14px",background:"rgba(255,255,255,0.02)",borderBottom:"1px solid "+C.bd}}>
                {["DATE","TIME","SYMBOL","DIRECTION","SESSION","R","RESULT","SETUP / NOTES","STATUS"].map(h=><div key={h} style={{color:C.sb,fontSize:8,letterSpacing:1.2,fontWeight:700}}>{h}</div>)}
              </div>
              {preview.map((r,i)=><div key={i} style={{display:"grid",gridTemplateColumns:"90px 80px 70px 70px 55px 55px 80px 1fr 80px",gap:6,padding:"9px 14px",borderBottom:"1px solid "+C.bd,background:r.valid?"transparent":"rgba(239,68,68,0.05)",alignItems:"center"}}>
                <div style={{color:r.valid?C.tx:C.rd,fontSize:11,fontWeight:r.valid?500:700}}>{r.date||"—"}</div>
                <div style={{color:C.sb,fontSize:11}}>{r.time}</div>
                <div style={{color:C.tx,fontWeight:800,fontSize:12,fontFamily:"Outfit,sans-serif"}}>{r.symbol||"—"}</div>
                <div style={{color:r.direction==="long"?C.gn:C.rd,fontSize:11,fontWeight:600,textTransform:"uppercase"}}>{r.direction}</div>
                <div style={{color:C.sb,fontSize:11}}>{r.session}</div>
                <div style={{color:r.rValue>0?C.gn:r.rValue<0?C.rd:C.sb,fontWeight:700,fontSize:12,fontFamily:"Outfit,sans-serif"}}>{isNaN(r.rValue)?"?":((r.rValue>=0?"+":"")+r.rValue.toFixed(1)+"R")}</div>
                <div style={{color:r.result==="win"?C.gn:r.result==="loss"?C.rd:C.sb,fontSize:9,fontWeight:700,letterSpacing:1}}>{r.result.toUpperCase()}</div>
                <div style={{color:C.sb,fontSize:10,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{[r.setup,r.notes].filter(Boolean).join(" · ")||"–"}</div>
                <div>{r.valid?<span style={{color:C.gn,fontSize:9,fontWeight:700,background:C.gg,padding:"2px 7px",borderRadius:4}}>✓ VALID</span>:<span style={{color:C.rd,fontSize:9,fontWeight:700}}>{r.errs.join(", ")}</span>}</div>
              </div>)}
            </div>
            {invalid.length>0&&<div style={{color:C.sb,fontSize:11,marginTop:8,padding:"8px 12px",background:C.rg,borderRadius:8,border:"1px solid rgba(239,68,68,0.15)"}}>⚠ {invalid.length} row{invalid.length!==1?"s":""} with errors will be skipped. Fix in your sheet and re-paste.</div>}
            <div style={{display:"flex",gap:10,marginTop:14}}>
              {valid.length>0&&<Bt onClick={confirmAll} style={{flex:1,justifyContent:"center",padding:"13px",fontSize:13}}>✓ Import {valid.length} Trade{valid.length!==1?"s":""}</Bt>}
              <Bt v="secondary" onClick={()=>sTpg("log")} style={{padding:"13px 20px"}}>Cancel</Bt>
            </div>
          </div>}
        </div>;
      })()}

      {/* SINGLE TRADE MODE */}
      {addMode==="single"&&<Cd style={{padding:24,maxWidth:520}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
          <div><label style={{color:C.sb,fontSize:9,letterSpacing:1,fontWeight:700,display:"block",marginBottom:5}}>DATE</label><Inp value={af.date} onChange={e=>sAf({...af,date:e.target.value})} type="date" style={{width:"100%"}}/></div>
          <div><label style={{color:C.sb,fontSize:9,letterSpacing:1,fontWeight:700,display:"block",marginBottom:5}}>TIME</label><Inp value={af.time} onChange={e=>sAf({...af,time:e.target.value})} type="time" style={{width:"100%"}}/></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
          <div><label style={{color:C.sb,fontSize:9,letterSpacing:1,fontWeight:700,display:"block",marginBottom:5}}>SYMBOL</label><Inp value={af.symbol} onChange={e=>sAf({...af,symbol:e.target.value})} placeholder="EURUSD, NQ, GBPUSD..." style={{width:"100%"}}/></div>
          <div><label style={{color:C.sb,fontSize:9,letterSpacing:1,fontWeight:700,display:"block",marginBottom:5}}>R VALUE</label><Inp value={af.rValue} onChange={e=>sAf({...af,rValue:e.target.value})} placeholder="+1.5 or -1.0" type="number" step="0.1" style={{width:"100%"}}/></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:12}}>
          <div><label style={{color:C.sb,fontSize:9,letterSpacing:1,fontWeight:700,display:"block",marginBottom:5}}>DIRECTION</label><select value={af.direction} onChange={e=>sAf({...af,direction:e.target.value})} style={{background:C.sf,border:"1px solid "+C.bd,borderRadius:10,padding:"10px 14px",color:C.tx,fontSize:13,width:"100%",outline:"none",fontFamily:"Plus Jakarta Sans,sans-serif"}}><option value="long">Long</option><option value="short">Short</option></select></div>
          <div><label style={{color:C.sb,fontSize:9,letterSpacing:1,fontWeight:700,display:"block",marginBottom:5}}>SESSION</label><select value={af.session} onChange={e=>sAf({...af,session:e.target.value})} style={{background:C.sf,border:"1px solid "+C.bd,borderRadius:10,padding:"10px 14px",color:C.tx,fontSize:13,width:"100%",outline:"none",fontFamily:"Plus Jakarta Sans,sans-serif"}}>{ss.map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={{color:C.sb,fontSize:9,letterSpacing:1,fontWeight:700,display:"block",marginBottom:5}}>SETUP</label><Inp value={af.setup} onChange={e=>sAf({...af,setup:e.target.value})} placeholder="BOS, MSS..." style={{width:"100%"}}/></div>
        </div>
        <div style={{marginBottom:18}}><label style={{color:C.sb,fontSize:9,letterSpacing:1,fontWeight:700,display:"block",marginBottom:5}}>NOTES</label><textarea value={af.notes} onChange={e=>sAf({...af,notes:e.target.value})} placeholder="Execution notes..." rows={3} style={{background:C.sf,border:"1px solid "+C.bd,borderRadius:10,padding:"10px 14px",color:C.tx,fontSize:13,width:"100%",boxSizing:"border-box",resize:"vertical",outline:"none",fontFamily:"Plus Jakarta Sans,sans-serif"}}/></div>
        <div style={{display:"flex",gap:10}}>
          <Bt onClick={addT} style={{flex:1,justifyContent:"center",padding:"12px",fontSize:13}}>✓ Save Trade</Bt>
          <Bt v="secondary" onClick={()=>sTpg("log")} style={{padding:"12px 18px"}}>Cancel</Bt>
        </div>
      </Cd>}
    </div>}

    </div>
    </div>
  </div>;
}

// MAIN APP
export default function App(){
  const[user,setUser]=useState(null),[isAdmin,setIsAdmin]=useState(false),[pg,sPg]=useState("today"),[d,sD]=useState(DD()),[ld,sLd]=useState(false),[toast,sT]=useState({v:false,a:0}),[pendingCount,sPC]=useState(0),[checking,setChecking]=useState(true),[showHub,sShowHub]=useState(false);
const mobile=useIsMobile();const[sideOpen,setSideOpen]=useState(false);

  useEffect(()=>{supabase.auth.getSession().then(({data:{session}})=>{if(session?.user){if(session.user.email===ADMIN_EMAIL){setUser(session.user);setIsAdmin(true);setChecking(false);return;}supabase.rpc('check_user_status',{user_id:session.user.id}).then(({data:profArr})=>{const prof=profArr&&profArr[0]?profArr[0]:null;if(prof&&prof.status==='approved'){setUser(session.user);setIsAdmin(prof.is_admin||false);}else{supabase.auth.signOut();}setChecking(false);});}else{setChecking(false);}});supabase.auth.onAuthStateChange((event,session)=>{if(event==='SIGNED_OUT'){setUser(null);setIsAdmin(false);sLd(false);}});},[]);

  useEffect(()=>{if(!isAdmin)return;const check=async()=>{const{data}=await supabase.rpc('get_all_profiles');sPC((data||[]).filter(x=>x.status==="pending").length);};check();const iv=setInterval(check,15000);return()=>clearInterval(iv);},[isAdmin]);

  useEffect(()=>{if(!user)return;loadUD(user.id).then(d2=>{
    if(!d2.goals?.daily)d2.goals={daily:[],weekly:[],monthly:[],yearly:[]};if(!d2.goalArchive)d2.goalArchive=[];if(!d2.meals)d2.meals=[];if(!d2.weightLog)d2.weightLog=[];if(!d2.weightTarget)d2.weightTarget={weight:null,date:null};if(!d2.recentScans)d2.recentScans=[];if(!d2.waterLog)d2.waterLog={};if(!d2.waterTarget)d2.waterTarget=2500;if(!d2.trades)d2.trades=[];if(!d2.routine)d2.routine=DD().routine;if(!d2.routineSat)d2.routineSat=[];if(!d2.routineSun)d2.routineSun=[];if(!d2.routineLog)d2.routineLog={};if(!d2.macroTargets)d2.macroTargets={calories:2500,protein:150,carbs:300,fat:80};
    const today=td(),w=wkk(),m=mkk(),y=ykk();
    if(d2.lastDate&&d2.lastDate!==today){if(d2.goals.daily.length>0){d2.goalArchive=[{id:"a"+Date.now(),type:"daily",date:d2.lastDate,periodLabel:d2.lastDate,goals:d2.goals.daily.map(g=>({name:g.name,completed:g.completed})),totalCompleted:d2.goals.daily.filter(g=>g.completed).length,total:d2.goals.daily.length},...d2.goalArchive];d2.goals.daily=[];}if(d2.lastWeek!==w&&d2.goals.weekly.length>0){d2.goalArchive=[{id:"a"+(Date.now()+1),type:"weekly",date:today,periodLabel:d2.lastWeek,goals:d2.goals.weekly.map(g=>({name:g.name,completed:g.completed})),totalCompleted:d2.goals.weekly.filter(g=>g.completed).length,total:d2.goals.weekly.length},...d2.goalArchive];d2.goals.weekly=[];}if(d2.lastMonth!==m&&d2.goals.monthly.length>0){d2.goalArchive=[{id:"a"+(Date.now()+2),type:"monthly",date:today,periodLabel:d2.lastMonth,goals:d2.goals.monthly.map(g=>({name:g.name,completed:g.completed})),totalCompleted:d2.goals.monthly.filter(g=>g.completed).length,total:d2.goals.monthly.length},...d2.goalArchive];d2.goals.monthly=[];}if(d2.lastYear!==y&&d2.goals.yearly.length>0){d2.goalArchive=[{id:"a"+(Date.now()+3),type:"yearly",date:today,periodLabel:d2.lastYear,goals:d2.goals.yearly.map(g=>({name:g.name,completed:g.completed})),totalCompleted:d2.goals.yearly.filter(g=>g.completed).length,total:d2.goals.yearly.length},...d2.goalArchive];d2.goals.yearly=[];}const act=d2.habits.filter(h=>h.active),prev=d2.habitLog[d2.lastDate]||[];if(prev.length===act.length&&act.length>0){d2.streak=(d2.streak||0)+1;d2.bestStreak=Math.max(d2.bestStreak||0,d2.streak);}else{const yy=new Date();yy.setDate(yy.getDate()-1);if(d2.lastDate!==yy.toISOString().split("T")[0])d2.streak=0;}d2.lastDate=today;d2.lastWeek=w;d2.lastMonth=m;d2.lastYear=y;}
    saveUD(user.id,d2);sD(d2);sLd(true);
  });},[user]);

  const setData=nd=>{sD(nd);if(user)dsave(user.id,nd);};
  const sxp=a=>{sT({v:true,a});setTimeout(()=>sT({v:false,a:0}),1500);};
  const logout=async()=>{await supabase.auth.signOut();setUser(null);setIsAdmin(false);sLd(false);sPg("today");};
  const onAuth=async u=>{const{data:prof}=await supabase.from('profiles').select('*').eq('id',u.id).single();setUser(u);setIsAdmin(prof?.is_admin||u.email===ADMIN_EMAIL);};

  const css="@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}body{background:"+C.bg+";}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:"+C.sf+";border-radius:3px;}input::placeholder,textarea::placeholder{color:"+C.mt+";}@keyframes xpSlide{0%{transform:translateY(-10px);opacity:0;}15%{transform:translateY(0);opacity:1;}85%{transform:translateY(0);opacity:1;}100%{transform:translateY(-20px);opacity:0;}}@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}@keyframes pageEnter{0%{opacity:0;transform:translateY(18px) scale(0.985);}60%{opacity:1;transform:translateY(-2px) scale(1.002);}100%{opacity:1;transform:translateY(0) scale(1);}}.page-enter{animation:pageEnter 0.38s cubic-bezier(0.22,1,0.36,1) both;}";

  if(checking)return <div style={{width:"100vw",height:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center"}}><style>{css}</style><div style={{color:C.sb,fontSize:12,letterSpacing:2,fontWeight:600}}>INITIALIZING PROTOCOL X...</div></div>;
  if(!user)return <><style>{css}</style><AuthScreen onAuth={onAuth}/></>;
  if(!ld)return <div style={{width:"100vw",height:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center"}}><style>{css}</style><div style={{textAlign:"center"}}><div style={{width:42,height:42,borderRadius:12,background:"linear-gradient(135deg,#f59e0b,#f97316)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:900,color:"#000",margin:"0 auto 12px",fontFamily:"Outfit,sans-serif"}}>PX</div><div style={{color:C.sb,fontSize:12,letterSpacing:2,fontWeight:600}}>INITIALIZING PROTOCOL X...</div></div></div>;

  const props={data:d,setData,sxp};
  const rp=()=>{if(pg==="today")return <Today data={d} setPage={sPg}/>;if(pg==="dashboard")return <Dash data={d} setPage={sPg}/>;if(pg==="habits")return <Habits {...props}/>;if(pg==="routine")return <Routine {...props}/>;if(pg==="goals")return <Goals {...props}/>;if(pg==="journal")return <Journal {...props}/>;if(pg==="nutrition")return <Nutrition {...props}/>;if(pg==="weight")return <Weight {...props}/>;if(pg==="fitness")return <Fitness {...props}/>;if(pg==="finance")return <Finance {...props}/>;if(pg==="reading")return <Reading {...props}/>;if(pg==="sleep")return <SleepPg {...props}/>;if(pg==="analytics")return <Analytics data={d}/>;if(pg==="weekly")return <WeeklyReview data={d}/>;if(pg==="rank")return <RankPg data={d}/>;if(pg==="settings")return <Sett data={d} setData={setData} onLogout={logout}/>;if(pg==="admin"&&isAdmin)return <AdminPanel/>;return <Today data={d} setPage={sPg}/>;};

 return <div style={{display:"flex",minHeight:"100vh",background:C.bg,fontFamily:"Plus Jakarta Sans,sans-serif"}}><style>{css}</style>{toast.v&&<div style={{position:"fixed",top:mobile?20:80,right:mobile?16:30,zIndex:9999,background:"linear-gradient(135deg,#f59e0b,#f97316)",color:"#000",fontWeight:800,fontSize:mobile?15:17,padding:mobile?"9px 18px":"11px 22px",borderRadius:12,animation:"xpSlide 1.5s ease forwards",boxShadow:"0 8px 32px rgba(245,158,11,0.4)",fontFamily:"Outfit,sans-serif"}}>+{toast.a} XP ⚡</div>}{mobile&&<div style={{position:"fixed",top:0,left:0,right:0,background:"rgba(8,9,13,0.98)",borderBottom:"1px solid "+C.bd,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",zIndex:100,backdropFilter:"blur(20px)"}}><button onClick={()=>setSideOpen(true)} style={{background:"none",border:"none",color:C.tx,fontSize:22,cursor:"pointer",padding:4}}>☰</button><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#f59e0b,#f97316)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:"#000",fontFamily:"Outfit,sans-serif"}}>PX</div><span style={{color:C.tx,fontWeight:700,fontSize:14,fontFamily:"Outfit,sans-serif"}}>PROTOCOL X</span></div><div style={{width:30}}/></div>}<SB page={pg} setPage={sPg} data={d} isAdmin={isAdmin} pendingCount={pendingCount} mobile={mobile} open={sideOpen} setOpen={setSideOpen}/><div style={{marginLeft:mobile?0:210,flex:1,padding:mobile?"70px 16px 80px":"24px 32px",maxWidth:940}}><div key={pg} className="page-enter">{rp()}</div></div>{mobile&&<BottomNav page={pg} setPage={sPg}/>}
  {/* Trading HUB button — top right corner */}
  <button onClick={()=>sShowHub(true)} style={{position:"fixed",top:mobile?12:16,right:mobile?60:20,zIndex:150,display:"flex",alignItems:"center",gap:9,background:"linear-gradient(135deg,#10b981,#059669)",border:"none",borderRadius:12,padding:mobile?"9px 14px":"11px 18px",color:"#fff",cursor:"pointer",boxShadow:"0 4px 24px rgba(16,185,129,0.45)",fontFamily:"Outfit,sans-serif"}}>
    <svg width={mobile?15:17} height={mobile?15:17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    <span style={{fontWeight:800,fontSize:mobile?11:13,letterSpacing:1}}>HUB</span>
  </button>
  {showHub&&<TradingHub data={d} setData={setData} onClose={()=>sShowHub(false)}/>}
</div>;
}