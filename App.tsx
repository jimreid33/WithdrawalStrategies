import { useState, useMemo, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, CartesianGrid, Legend, ReferenceLine, ComposedChart } from "recharts";

const d = s => s.split(",").map(v => +v / 100);
const STK=d("11.62,37.49,43.61,-8.42,-24.90,-43.34,-8.19,53.99,-1.44,47.67,33.92,-35.03,31.12,-0.41,-9.78,-11.59,20.34,25.90,19.75,36.44,-8.07,5.71,5.50,18.79,31.71,24.02,18.37,-0.99,52.62,31.56,6.56,-10.78,43.36,11.96,0.47,26.89,-8.73,22.80,16.48,12.45,-10.06,23.98,11.06,-8.50,4.01,14.31,18.98,-14.66,-26.47,37.20,23.84,-7.18,6.56,18.44,32.42,-4.91,21.41,22.51,6.27,32.16,18.47,5.23,16.81,31.49,-3.17,30.55,7.67,9.99,1.31,37.43,23.07,33.36,28.58,21.04,-9.10,-11.89,-22.10,28.68,10.88,4.91,15.79,5.49,-37.00,26.46,15.06,2.11,16.00,32.39,13.69,1.38,11.96,21.83,-4.38,31.49,18.40,28.71,-18.11,26.29,25.02");
const BND=d("5.38,4.52,0.92,6.01,6.72,-2.32,8.79,1.83,9.00,4.98,3.06,1.56,6.23,4.52,2.96,0.50,1.94,2.81,1.80,2.22,1.00,0.91,1.85,2.32,0.70,-0.30,1.63,3.23,2.68,-0.65,-0.42,7.84,-1.29,-0.39,11.76,1.85,5.56,1.64,3.51,0.71,2.73,1.01,4.54,-0.74,16.86,8.72,5.16,4.61,5.69,7.83,12.87,1.41,3.49,4.09,3.91,9.45,29.10,7.41,14.02,20.33,15.14,2.90,6.10,13.29,9.73,15.46,7.19,11.24,-5.14,16.80,2.10,8.38,10.21,-1.77,12.59,7.62,12.95,2.40,2.25,1.36,3.14,10.05,13.11,-2.40,7.12,9.02,1.99,-1.25,3.13,1.69,0.99,0.84,1.58,6.28,6.43,-1.71,-4.73,4.20,2.80");
const INF=d("1.49,-1.69,-1.16,0.58,-2.66,-8.94,-10.30,0.76,2.03,2.99,1.45,3.60,-2.08,-1.42,0.72,9.93,9.03,3.16,2.11,2.25,18.13,8.84,2.99,-2.07,5.93,5.87,0.75,0.75,-0.74,0.37,2.99,2.90,1.76,1.73,1.36,0.67,1.33,1.64,0.97,1.92,3.46,3.04,4.72,6.18,5.57,3.27,3.41,8.71,12.34,6.94,4.86,6.70,9.02,13.29,12.52,8.92,3.83,3.79,3.95,3.80,1.10,4.43,4.42,4.65,6.11,3.06,2.90,2.75,2.67,2.54,3.32,1.70,1.61,2.68,3.39,1.55,2.38,1.88,3.26,3.42,2.54,4.08,0.09,2.72,1.50,2.96,1.74,1.50,0.76,0.73,2.07,2.11,1.91,2.29,1.36,7.04,6.45,3.35,2.90");
const CAPE=[11.3,13.2,16.5,27.1,19.7,16.0,8.3,8.7,13.0,12.5,17.1,21.1,11.5,15.7,14.1,12.2,8.8,9.1,10.6,12.4,18.7,11.7,9.8,9.1,10.7,12.5,12.0,12.4,11.3,17.3,18.3,15.0,13.9,19.2,18.5,17.7,21.5,19.2,21.5,23.3,24.1,20.0,22.2,21.9,16.5,17.2,18.7,19.2,12.4,8.9,11.5,11.8,9.7,9.5,9.1,9.0,7.7,8.4,10.3,10.8,14.6,18.8,14.0,15.5,17.6,15.8,20.8,21.5,21.7,20.7,25.3,28.7,33.4,41.3,44.2,35.8,31.4,23.7,27.2,26.4,26.7,27.5,24.1,13.3,20.5,23.0,21.2,22.0,25.5,27.2,25.1,28.1,33.3,28.4,30.8,34.8,38.3,28.9,33.5];
const Y0=1926,NY=STK.length;

const RN=["Crisis","Bear","Normal","Bull"],RC=["#ef4444","#f97316","#6b7280","#22c55e"];
function classR(s){return s<=-.20?0:s<=-.05?1:s<=.15?2:3;}
const REG=STK.map(classR);
function buildRM(){const tr=Array.from({length:4},()=>new Array(4).fill(0)),po=Array.from({length:4},()=>[]);for(let i=0;i<NY;i++){po[REG[i]].push(i);if(i>0)tr[REG[i-1]][REG[i]]++;}const tp=tr.map(r=>{const s=r.reduce((a,b)=>a+b,0);return s>0?r.map(v=>v/s):r.map(()=>.25);});return{tp,po};}
const RM=buildRM();
const CN=["Low CAPE (<15)","Mid CAPE (15–25)","High CAPE (>25)"],CC=["#22c55e","#f59e0b","#ef4444"];
function classC(c){return c<15?0:c<=25?1:2;}
const CREG=CAPE.map(classC);
const CAPE_HORIZON=10;
function buildCPools(){const p=[[],[],[]];for(let i=0;i<NY-CAPE_HORIZON;i++)p[CREG[i]].push(i);return p;}
const CP=buildCPools();
const DEFAULT_CAPE=classC(CAPE[NY-1]);
function findEpisodes(){const eps=Array.from({length:4},()=>[]);let cur=REG[0],st=0;for(let i=1;i<=NY;i++){if(i===NY||REG[i]!==cur){eps[cur].push({start:st,len:i-st});if(i<NY){cur=REG[i];st=i;}}}return eps;}
const EPISODES=findEpisodes();
function mkRng(seed){let s=seed|0;return()=>{s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

function calcW(y,port,prevW,iW,rate,strat,sp,inf,ci,pRet){
  if(strat==="fixed")return y===0?iW:prevW*(1+inf);
  if(strat==="forgo"){if(y===0)return iW;return pRet<0?prevW:prevW*(1+inf);}
  if(strat==="guardrails"){if(y===0)return iW;let w=prevW*(1+inf),cur=w/port;if(cur>rate*(1+sp.band))w*=(1-sp.cut);else if(cur<rate*(1-sp.band))w*=(1+sp.raise);if(sp.floor>0)w=Math.max(w,iW*sp.floor*ci);return w;}
  if(strat==="rmd")return sp.rem>0?port/sp.rem:port;
  if(strat==="smoothed"){if(y===0)return port*rate;if(sp.mode==="yale")return sp.wt*prevW*(1+inf)+(1-sp.wt)*rate*port;const base=rate*port;return Math.max(prevW*(1-sp.fl),Math.min(prevW*(1+sp.cl),base));}
  return iW;
}
function simHist(si,p0,rate,alloc,hz,strat,sp){
  let port=p0,w=0,iW=p0*rate,ci=1,pRet=0;
  const path=[{yr:0,port:p0,pR:p0,w:0,wR:0,sR:0,bR:0,inf:0,reg:-1,cape:CAPE[si]}];
  for(let y=0;y<hz;y++){const di=si+y;if(di>=NY)return{ok:path[path.length-1].port>0,path,failYr:null};
    if(y>0)ci*=(1+INF[di-1]);const spe=strat==="rmd"?{...sp,rem:hz-y}:sp;
    w=calcW(y,port,w,iW,rate,strat,spe,y>0?INF[di-1]:0,ci,pRet);port-=w;
    if(port<=0){path.push({yr:y+1,port:0,pR:0,w,wR:w/ci,sR:STK[di],bR:BND[di],inf:INF[di],reg:REG[di],cape:CAPE[di],failed:true});return{ok:false,path,failYr:y+1};}
    pRet=alloc*STK[di]+(1-alloc)*BND[di];port*=(1+pRet);
    path.push({yr:y+1,port,pR:port/ci,w,wR:w/ci,sR:STK[di],bR:BND[di],inf:INF[di],reg:REG[di],cape:CAPE[di]});}
  return{ok:true,path,failYr:null};
}
function runMC(p0,rate,alloc,hz,strat,sp,nSims,genFn){
  return Array.from({length:nSims},(_,si)=>{const gen=genFn(si);let port=p0,w=0,iW=p0*rate,ci=1,failed=false,pRet=0;
    const path=[{yr:0,port:p0,pR:p0,w:0,wR:0}];
    for(let y=0;y<hz;y++){const{sR,bR,inf}=gen(y);if(y>0)ci*=(1+inf);const spe=strat==="rmd"?{...sp,rem:hz-y}:sp;
      w=calcW(y,port,w,iW,rate,strat,spe,y>0?inf:0,ci,pRet);port-=w;
      if(port<=0){path.push({yr:y+1,port:0,pR:0,w,wR:w/ci,failed:true});failed=true;break;}
      pRet=alloc*sR+(1-alloc)*bR;port*=(1+pRet);path.push({yr:y+1,port,pR:port/ci,w,wR:w/ci});}
    return{ok:!failed,path};});}
function genIID(rng){return()=>()=>{const i=Math.floor(rng()*NY);return{sR:STK[i],bR:BND[i],inf:INF[i]};};}
function genBlock(rng,bs){return()=>{let bS=-1,bP=bs;return()=>{if(bP>=bs){bS=Math.floor(rng()*(NY-bs));bP=0;}const i=bS+bP++;return{sR:STK[i],bR:BND[i],inf:INF[i]};};};}
function genRegime(rng){const{tp,po}=RM;return()=>{let cr=REG[Math.floor(rng()*NY)];return()=>{const r=rng();let cum=0;for(let j=0;j<4;j++){cum+=tp[cr][j];if(r<cum){cr=j;break;}}const pool=po[cr],i=pool[Math.floor(rng()*pool.length)];return{sR:STK[i],bR:BND[i],inf:INF[i]};};};}
function genCAPE(rng,capeLvl){const pool=CP[capeLvl];if(!pool.length)return genIID(rng);return()=>{let si=pool[Math.floor(rng()*pool.length)],cur=si,used=0,bS=-1,bP=7;return(y)=>{if(used<CAPE_HORIZON){const di=cur;cur++;used++;if(cur>=NY)cur=pool[Math.floor(rng()*pool.length)];return{sR:STK[di],bR:BND[di],inf:INF[di]};}if(bP>=7){bS=Math.floor(rng()*(NY-7));bP=0;}const i=bS+bP++;return{sR:STK[i],bR:BND[i],inf:INF[i]};};};}
function genNarrative(rng){const{tp}=RM;return()=>{let cr=REG[Math.floor(rng()*NY)],epS=-1,epP=0,epL=0;const pickEp=r=>{const e=EPISODES[r];return e.length?e[Math.floor(rng()*e.length)]:null;};return()=>{if(epP>=epL){const r=rng();let cum=0;for(let j=0;j<4;j++){cum+=tp[cr][j];if(r<cum){cr=j;break;}}const ep=pickEp(cr);if(ep){epS=ep.start;epL=ep.len;epP=0;}else{const pool=RM.po[cr],i=pool[Math.floor(rng()*pool.length)];return{sR:STK[i],bR:BND[i],inf:INF[i]};}}if(epP>0&&rng()<.08){const r=rng();let cum=0,nR=cr;for(let j=0;j<4;j++){cum+=tp[cr][j];if(r<cum){nR=j;break;}}if(nR!==cr){cr=nR;const ep=pickEp(cr);if(ep){epS=ep.start;epL=ep.len;epP=0;}}}const di=epS+epP;epP++;return{sR:STK[di],bR:BND[di],inf:INF[di]};};};}

function pct(arr,p){const s=[...arr].sort((a,b)=>a-b);const i=(s.length-1)*p;const lo=Math.floor(i);return s[lo]+(s[Math.min(lo+1,s.length-1)]-s[lo])*(i-lo);}
const fmt=v=>v>=1e6?`$${(v/1e6).toFixed(2)}M`:v>=1e3?`$${(v/1e3).toFixed(0)}K`:`$${Math.round(v)}`;
const fP=v=>`${(v*100).toFixed(1)}%`;
const TABS=["Historical (Bengen)","Monte Carlo","Compare Strategies"];
const MC_MODES=[
  {id:"iid",label:"Standard (i.i.d.)",desc:"Independent sampling — Morningstar comparable"},
  {id:"block",label:"Block Bootstrap",desc:"Contiguous blocks — preserves serial correlation"},
  {id:"regime",label:"Regime-Switching",desc:"Markov chain on bull/bear/crisis/normal"},
  {id:"cape",label:"CAPE-Conditioned",desc:"First decade from similar valuations, then unconditional"},
  {id:"narrative",label:"Narrative MC ★",desc:"Regime transitions + coherent historical episodes"},
];
const CS=[
  {id:"fixed",label:"Fixed Real",color:"#3b82f6",bg:"bg-blue-900 text-blue-300"},
  {id:"forgo",label:"Forgo Inflation",color:"#06b6d4",bg:"bg-cyan-900 text-cyan-300"},
  {id:"guardrails",label:"Guardrails",color:"#f59e0b",bg:"bg-amber-900 text-amber-300"},
  {id:"smoothed",label:"Smoothed %",color:"#a855f7",bg:"bg-purple-900 text-purple-300"},
  {id:"rmd",label:"RMD-Based",color:"#10b981",bg:"bg-emerald-900 text-emerald-300"},
];
const CSM=Object.fromEntries(CS.map(s=>[s.id,s]));

const PRESETS=[
  {id:"bengen",name:"Bengen Classic",desc:"The original 4% rule",rate:4,alloc:50,hz:30,strat:"fixed"},
  {id:"morningstar",name:"Morningstar",desc:"Forgo inflation after loss years",rate:3.8,alloc:50,hz:30,strat:"forgo"},
  {id:"yale",name:"Yale Endowment",desc:"Smoothed 5%, growth-tilted",rate:5,alloc:70,hz:30,strat:"smoothed",smM:"yale",smR:5,smW:70},
  {id:"vanguard",name:"Vanguard Dynamic",desc:"Capped annual spending changes",rate:5,alloc:60,hz:30,strat:"smoothed",smM:"vanguard",smR:5,smCl:5,smFl:2.5},
  {id:"aggressive",name:"Growth + Rails",desc:"80% equity with guardrails",rate:5,alloc:80,hz:30,strat:"guardrails",band:20,cut:10,raise:10,floor:80},
];

const TOUR=[
  {title:"Bengen's Discovery (1994)",tab:0,preset:"bengen",
    text:"William Bengen tested every 30-year retirement since 1926 using actual U.S. stock and bond returns. His finding: withdrawing 4% of your starting portfolio, adjusted each year for inflation, survived every historical period except the worst — retirees who started in the late 1960s and walked into stagflation. Look at the success rate, then click 1966 in the year grid to see what went wrong."},
  {title:"The Monte Carlo Gap",tab:1,preset:"bengen",mode:"iid",
    text:"Same 4% rule, but now we generate 1,000 random futures instead of replaying history. The success rate drops several points. Why? History is one path from one country that happened to go well. Monte Carlo can generate sequences that never occurred — a 1929 crash followed immediately by 1970s stagflation, for instance. More scenarios means more failure modes."},
  {title:"Narrative Monte Carlo ★",tab:1,preset:"bengen",mode:"narrative",
    text:"Standard Monte Carlo treats each year as independent — but real markets show momentum and mean reversion. Crashes are followed by recoveries, not more random draws. Narrative MC preserves this by playing actual historical episodes in sequence, governed by probabilistic regime transitions. Compare this success rate to the standard MC you just saw — the difference is the mean reversion premium."},
  {title:"The Strategy Tradeoff",tab:2,
    text:"Now the real question: can smarter withdrawal strategies let you spend more safely? The Compare tab shows Fixed Real (Bengen), Guardrails, and Yale-style smoothing side by side. Watch the tradeoff triangle: success rate, median spending, and spending volatility. There is no free lunch — but some strategies find better tradeoffs than others. Try pushing equity allocation higher and see which strategies handle it best."},
  {title:"Your Turn",tab:-1,
    text:"You have the keys. Every slider, method, and strategy is yours to explore. A few starting points: try 70–80% equities with Yale smoothing. Stress-test with CAPE-Conditioned at High CAPE for a pessimistic view of current valuations. Compare Narrative MC to standard MC at higher withdrawal rates where the differences are most visible. The Methodology Notes at the bottom document everything, including limitations and references."},
];

function buildPct(results,hz,pk,wk){return Array.from({length:hz+1},(_,y)=>{const pv=results.map(r=>(r.path[Math.min(y,r.path.length-1)]?.[pk]??0));const wv=results.filter(r=>r.path[y]?.[wk]>0).map(r=>r.path[y][wk]);return{yr:y,p5:pct(pv,.05),p25:pct(pv,.25),p50:pct(pv,.5),p75:pct(pv,.75),p95:pct(pv,.95),w5:wv.length?pct(wv,.05):0,w50:wv.length?pct(wv,.5):0,w95:wv.length?pct(wv,.95):0};});}
function sVol(path,wk){const ws=path.filter(s=>s[wk]>0).map(s=>s[wk]);if(ws.length<2)return 0;const mu=ws.reduce((a,b)=>a+b,0)/ws.length;return Math.sqrt(ws.reduce((a,b)=>a+(b-mu)**2,0)/(ws.length-1))/mu;}

function Sl({label,value,onChange,min,max,step,f}){return(<div className="flex flex-col gap-0.5"><div className="flex justify-between text-xs"><span className="text-gray-400">{label}</span><span className="text-white font-mono">{f?f(value):value}</span></div><input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(+e.target.value)} className="w-full accent-blue-500" style={{height:16}}/></div>);}
function Badge({name}){const s=CSM[name];if(!s)return null;return(<span className={`px-2 py-0.5 rounded text-xs font-medium ${s.bg}`}>{s.label}</span>);}
function GrIn({band,cut,raise,floor,set}){return(<div className="space-y-1 pt-1"><Sl label="Band" value={band} onChange={v=>set("band",v)} min={5} max={50} step={5} f={v=>`±${v}%`}/><Sl label="Cut" value={cut} onChange={v=>set("cut",v)} min={5} max={25} step={5} f={v=>`${v}%`}/><Sl label="Raise" value={raise} onChange={v=>set("raise",v)} min={5} max={25} step={5} f={v=>`${v}%`}/><Sl label="Floor" value={floor} onChange={v=>set("floor",v)} min={0} max={100} step={5} f={v=>`${v}%`}/></div>);}
function SmIn({mode,setMode,rate,setRate,wt,setWt,cl,setCl,fl,setFl}){return(<div className="space-y-1 pt-1">
  <div className="flex gap-1"><button onClick={()=>setMode("yale")} className={`flex-1 py-1 rounded text-xs font-medium ${mode==="yale"?"bg-purple-600 text-white":"bg-gray-700 text-gray-400"}`}>Yale</button><button onClick={()=>setMode("vanguard")} className={`flex-1 py-1 rounded text-xs font-medium ${mode==="vanguard"?"bg-purple-600 text-white":"bg-gray-700 text-gray-400"}`}>Vanguard</button></div>
  <Sl label="Target Rate" value={rate} onChange={setRate} min={3} max={8} step={0.5} f={v=>`${v}%`}/>
  {mode==="yale"?<Sl label="Smoothing Weight" value={wt} onChange={setWt} min={50} max={95} step={5} f={v=>`${v}% prior`}/>:
  <><Sl label="Max Increase" value={cl} onChange={setCl} min={1} max={15} step={0.5} f={v=>`+${v}%`}/><Sl label="Max Decrease" value={fl} onChange={setFl} min={1} max={10} step={0.5} f={v=>`-${v}%`}/></>}
</div>);}
function StratSelect({strat,setStrat}){return(<select value={strat} onChange={e=>setStrat(e.target.value)} className="w-full mt-0.5 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-white">
  <option value="fixed">Fixed Real (Bengen)</option><option value="forgo">Forgo Inflation (Morningstar)</option><option value="guardrails">Guardrails</option><option value="smoothed">Smoothed % (Yale/Vanguard)</option><option value="rmd">RMD-Based</option></select>);}
const TT=({active,payload,label})=>{if(!active||!payload?.length)return null;return(<div className="bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs shadow-lg max-w-xs"><div className="text-gray-400 mb-1">Year {label}</div>{payload.filter(p=>p.value!=null).map((p,i)=>(<div key={i} className="flex justify-between gap-3"><span style={{color:p.color||p.stroke}}>{p.name}</span><span className="font-mono text-white">{typeof p.value==="number"?(Math.abs(p.value)<2&&Math.abs(p.value)>0.0001?fP(p.value):fmt(p.value)):p.value}</span></div>))}</div>);};
function PctChart({data,pk,h}){return(<ResponsiveContainer width="100%" height={h||220}><LineChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="#374151"/><XAxis dataKey="yr" tick={{fill:"#9ca3af",fontSize:10}}/><YAxis tick={{fill:"#9ca3af",fontSize:10}} tickFormatter={fmt}/><Tooltip content={<TT/>}/><Line type="monotone" dataKey={`${pk}95`} stroke="#22c55e" strokeWidth={1} strokeDasharray="4 4" dot={false} name="95th"/><Line type="monotone" dataKey={`${pk}75`} stroke="#22c55e" strokeWidth={1.5} dot={false} name="75th"/><Line type="monotone" dataKey={`${pk}50`} stroke="#3b82f6" strokeWidth={2.5} dot={false} name="Median"/><Line type="monotone" dataKey={`${pk}25`} stroke="#f97316" strokeWidth={1.5} dot={false} name="25th"/><Line type="monotone" dataKey={`${pk}5`} stroke="#ef4444" strokeWidth={1} strokeDasharray="4 4" dot={false} name="5th"/><ReferenceLine y={0} stroke="#6b7280"/><Legend wrapperStyle={{fontSize:10}}/></LineChart></ResponsiveContainer>);}

function YearDetail({period:p,hz,real,onClose}){
  const pk=real?"pR":"port",wk=real?"wR":"w";
  const data=p.path.map((s,i)=>({yr:s.yr,port:s[pk],w:s[wk],sR:i>0?s.sR:null,bR:i>0?s.bR:null,inf:i>0?s.inf:null,reg:s.reg}));
  const tv=p.path[p.path.length-1][pk],ws=p.path.filter(s=>s[wk]>0).map(s=>s[wk]);const vol=sVol(p.path,wk);
  return(<div className="bg-gray-800 rounded-lg p-3 space-y-2 border border-gray-600">
    <div className="flex justify-between items-center"><div className="flex items-center gap-2 flex-wrap">
      <h3 className="text-sm font-bold text-white">Retiree: {p.startYear}</h3>
      <span className={`text-xs px-2 py-0.5 rounded font-medium ${p.ok?"bg-green-900 text-green-400":"bg-red-900 text-red-400"}`}>{p.ok?`Survived — ${fmt(tv)}`:`Failed yr ${p.failYr}`}</span>
      <span className="text-xs text-gray-500">CAPE: {CAPE[p.startYear-Y0]?.toFixed(1)}</span>
    </div><button onClick={onClose} className="text-gray-500 hover:text-white text-base px-1">✕</button></div>
    <div className="grid grid-cols-4 gap-2 text-center text-xs">
      <div><div className="text-gray-500">Terminal</div><div className="text-white font-semibold">{fmt(tv)}</div></div>
      <div><div className="text-gray-500">Spend Range</div><div className="text-white font-semibold">{ws.length?`${fmt(Math.min(...ws))}–${fmt(Math.max(...ws))}`:"—"}</div></div>
      <div><div className="text-gray-500">Spend Vol</div><div className="text-white font-semibold">{fP(vol)}</div></div>
      <div><div className="text-gray-500">Period</div><div className="text-white font-semibold">{p.startYear}–{p.startYear+hz}</div></div>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div><div className="text-xs text-gray-500 mb-0.5">Portfolio ({real?"Real":"Nom"})</div><ResponsiveContainer width="100%" height={140}><AreaChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="#374151"/><XAxis dataKey="yr" tick={{fill:"#9ca3af",fontSize:9}}/><YAxis tick={{fill:"#9ca3af",fontSize:9}} tickFormatter={fmt}/><Tooltip content={<TT/>}/><Area type="monotone" dataKey="port" stroke="#3b82f6" fill="#3b82f6" fillOpacity={.15} name="Portfolio" strokeWidth={2}/><ReferenceLine y={0} stroke="#6b7280"/></AreaChart></ResponsiveContainer></div>
      <div><div className="text-xs text-gray-500 mb-0.5">Spending ({real?"Real":"Nom"})</div><ResponsiveContainer width="100%" height={140}><AreaChart data={data.slice(1)}><CartesianGrid strokeDasharray="3 3" stroke="#374151"/><XAxis dataKey="yr" tick={{fill:"#9ca3af",fontSize:9}}/><YAxis tick={{fill:"#9ca3af",fontSize:9}} tickFormatter={fmt}/><Tooltip content={<TT/>}/><Area type="monotone" dataKey="w" stroke="#f59e0b" fill="#f59e0b" fillOpacity={.15} name="Spending" strokeWidth={2}/></AreaChart></ResponsiveContainer></div>
    </div>
    <div><div className="text-xs text-gray-500 mb-0.5">Returns: <span style={{color:RC[0]}}>Crisis</span> <span style={{color:RC[1]}}>Bear</span> <span style={{color:RC[2]}}>Norm</span> <span style={{color:RC[3]}}>Bull</span></div>
      <ResponsiveContainer width="100%" height={120}><ComposedChart data={data.slice(1)}><CartesianGrid strokeDasharray="3 3" stroke="#374151"/><XAxis dataKey="yr" tick={{fill:"#9ca3af",fontSize:9}}/><YAxis tick={{fill:"#9ca3af",fontSize:9}} tickFormatter={v=>`${(v*100).toFixed(0)}%`}/><Tooltip content={<TT/>}/><Bar dataKey="sR" name="Stocks" shape={({x,y,width,height,payload})=><rect x={x} y={Math.min(y,y+height)} width={width} height={Math.max(Math.abs(height),1)} fill={RC[payload.reg]||"#6b7280"} fillOpacity={.7}/>}/><Line type="monotone" dataKey="inf" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="3 3" dot={false} name="Inflation"/><ReferenceLine y={0} stroke="#6b7280"/><Legend wrapperStyle={{fontSize:9}}/></ComposedChart></ResponsiveContainer></div>
  </div>);
}

function ModelInfo({mode,capeLvl}){
  if(mode==="regime"){const{tp,po}=RM;return(<div className="bg-gray-800 rounded-lg p-3 space-y-2"><h3 className="text-xs font-semibold text-gray-400">Return-Based Regime Model</h3>
    <div className="grid grid-cols-4 gap-1 text-center text-xs">{RN.map((n,i)=>(<div key={i} className="rounded p-1" style={{background:RC[i]+"22"}}><div style={{color:RC[i]}} className="font-semibold">{n}</div><div className="text-gray-400">{po[i].length} yrs</div><div className="text-gray-500">μ={fP(po[i].reduce((a,j)=>a+STK[j],0)/po[i].length)}</div></div>))}</div>
    <div className="text-xs text-gray-500"><div className="font-medium text-gray-400 mb-0.5">Transitions</div><div className="grid grid-cols-5 gap-0.5 font-mono text-center"><div></div>{RN.map((n,i)=><div key={i} style={{color:RC[i]}}>{n.slice(0,4)}</div>)}{RN.map((n,i)=>[<div key={`l${i}`} style={{color:RC[i]}} className="text-left">{n.slice(0,4)}</div>,...tp[i].map((p,j)=><div key={j} className={p>.3?"text-white":"text-gray-500"}>{(p*100).toFixed(0)}%</div>)])}</div></div></div>);}
  if(mode==="cape"){return(<div className="bg-gray-800 rounded-lg p-3 space-y-2"><h3 className="text-xs font-semibold text-gray-400">CAPE-Conditioned Model</h3>
    <div className="grid grid-cols-3 gap-1 text-center text-xs">{CN.map((n,i)=>{const p=CP[i];const fR=p.map(j=>{let c=1;for(let k=0;k<Math.min(10,NY-j);k++)c*=(1+STK[j+k]);return Math.pow(c,1/Math.min(10,NY-j))-1;});const avg=fR.length?fR.reduce((a,b)=>a+b,0)/fR.length:0;
      return(<div key={i} className="rounded p-1.5" style={{background:CC[i]+"22"}}><div style={{color:CC[i]}} className="font-semibold">{n}</div><div className="text-gray-400">{p.length} starts</div><div className="text-gray-500">Fwd 10yr: {fP(avg)}/yr</div></div>);})}</div>
    <div className="text-xs text-gray-400 space-y-1"><p><span className="text-white">Two-phase:</span> Years 1–10 from CAPE-similar starts. Years 11+ unconditional block bootstrap.</p><p className="text-gray-500">Current: <span className="text-white">{CN[capeLvl]}</span> ({CP[capeLvl].length} starting years)</p></div>
    <div className="text-xs text-amber-400/80 bg-amber-900/20 rounded p-1.5 border border-amber-800/30"><p className="font-medium">⚠ Sample size caveat</p><p className="text-amber-400/60 mt-0.5">99 years split into 3 buckets yields ~30–40 starts each, but overlapping periods mean only ~8–12 are independent. Single episodes (e.g., 1960s stagflation) can dominate entire tiers. Best as directional context alongside other methods.</p></div></div>);}
  if(mode==="narrative"){return(<div className="bg-gray-800 rounded-lg p-3 space-y-2"><h3 className="text-xs font-semibold text-gray-400">Narrative Monte Carlo ★</h3>
    <div className="text-xs text-gray-400 space-y-1"><p>Markets tell stories — crashes have chapters, recoveries have arcs. Narrative MC generates scenarios with <span className="text-white">internal coherence</span>:</p>
      <p><span className="text-blue-400">Regime transitions:</span> Markov chain governs crisis/bear/normal/bull shifts.</p>
      <p><span className="text-blue-400">Episode playback:</span> Each regime draws an actual historical episode, played sequentially.</p>
      <p><span className="text-blue-400">Early transitions:</span> 8%/yr chance of mid-episode shift prevents unrealistic runs.</p>
      <p className="text-gray-500">Episodes: {EPISODES.map((e,i)=><span key={i} style={{color:RC[i]}}> {RN[i]}({e.length})</span>)}</p></div></div>);}
  return null;
}

function mkSmSp(mode,wt,cl,fl){return mode==="yale"?{mode,wt:wt/100}:{mode,cl:cl/100,fl:fl/100};}

function TourPanel({step,total,onNext,onPrev,onExit,data}){
  const s=data;const prog=((step+1)/total)*100;
  return(<div className="bg-gradient-to-r from-blue-950 to-indigo-950 border border-blue-800/50 rounded-lg p-3 space-y-2">
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-2"><span className="text-blue-400 text-xs font-mono">Step {step+1}/{total}</span><h3 className="text-sm font-bold text-white">{s.title}</h3></div>
      <button onClick={onExit} className="text-gray-500 hover:text-white text-xs px-2 py-0.5 rounded bg-gray-800/50">Exit Tour</button>
    </div>
    <div className="w-full bg-gray-800 rounded-full h-1"><div className="bg-blue-500 h-1 rounded-full transition-all" style={{width:`${prog}%`}}/></div>
    <p className="text-xs text-gray-300 leading-relaxed">{s.text}</p>
    <div className="flex justify-between items-center pt-1">
      <button onClick={onPrev} disabled={step===0} className={`text-xs px-3 py-1 rounded ${step===0?"text-gray-600 cursor-not-allowed":"text-blue-400 hover:text-blue-300 bg-gray-800/50"}`}>← Previous</button>
      {step<total-1?<button onClick={onNext} className="text-xs px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-500 font-medium">Next →</button>
      :<button onClick={onExit} className="text-xs px-3 py-1 rounded bg-green-600 text-white hover:bg-green-500 font-medium">Start Exploring →</button>}
    </div>
  </div>);
}

function PresetBar({onApply,active}){
  return(<div className="space-y-1"><div className="text-xs text-gray-500 font-medium">Quick Presets</div><div className="flex flex-wrap gap-1">
    {PRESETS.map(p=>(<button key={p.id} onClick={()=>onApply(p)} className={`px-2 py-1 rounded text-xs transition-colors ${active===p.id?"bg-blue-600 text-white ring-1 ring-blue-400":"bg-gray-700/70 text-gray-400 hover:text-gray-200 hover:bg-gray-600/70"}`} title={p.desc}>{p.name}</button>))}
  </div></div>);
}

export default function App(){
  const[tab,setTab]=useState(0),[real,setReal]=useState(true),[selYear,setSelYear]=useState(null);
  const[showDocs,setShowDocs]=useState(false),[tourStep,setTourStep]=useState(-1),[activePreset,setActivePreset]=useState("bengen");
  const[hRate,setHRate]=useState(4),[hAlloc,setHAlloc]=useState(50),[hHz,setHHz]=useState(30);
  const[hStrat,setHStrat]=useState("fixed"),[hBand,setHBand]=useState(20),[hCut,setHCut]=useState(10),[hRaise,setHRaise]=useState(10),[hFloor,setHFloor]=useState(80);
  const[hSmM,setHSmM]=useState("yale"),[hSmR,setHSmR]=useState(5),[hSmW,setHSmW]=useState(70),[hSmCl,setHSmCl]=useState(5),[hSmFl,setHSmFl]=useState(2.5);
  const[mcRate,setMcRate]=useState(4),[mcAlloc,setMcAlloc]=useState(50),[mcHz,setMcHz]=useState(30);
  const[mcStrat,setMcStrat]=useState("fixed"),[mcBand,setMcBand]=useState(20),[mcCut,setMcCut]=useState(10),[mcRaise,setMcRaise]=useState(10),[mcFloor,setMcFloor]=useState(80);
  const[mcSmM,setMcSmM]=useState("yale"),[mcSmR,setMcSmR]=useState(5),[mcSmW,setMcSmW]=useState(70),[mcSmCl,setMcSmCl]=useState(5),[mcSmFl,setMcSmFl]=useState(2.5);
  const[mcMode,setMcMode]=useState("iid"),[mcSims,setMcSims]=useState(1000),[mcSeed,setMcSeed]=useState(42);
  const[mcBlock,setMcBlock]=useState(7),[mcCapeLvl,setMcCapeLvl]=useState(DEFAULT_CAPE);
  const[showInfo,setShowInfo]=useState(false);
  const[cAlloc,setCAlloc]=useState(50),[cHz,setCHz]=useState(30),[cMcMode,setCMcMode]=useState("narrative");
  const[cFR,setCFR]=useState(4);
  const[cGR,setCGR]=useState(5),[cGBand,setCGBand]=useState(20),[cGCut,setCGCut]=useState(10),[cGRaise,setCGRaise]=useState(10),[cGFloor,setCGFloor]=useState(80);
  const[cSmM,setCSmM]=useState("yale"),[cSmR,setCSmR]=useState(5),[cSmW,setCSmW]=useState(70),[cSmCl,setCSmCl]=useState(5),[cSmFl,setCSmFl]=useState(2.5);
  const[cSel,setCSel]=useState(["fixed","guardrails","smoothed"]);
  const toggleCS=id=>setCSel(p=>p.includes(id)?p.length>2?p.filter(s=>s!==id):p:[...p,id]);

  const P0=1000000,pk=real?"pR":"port",wk=real?"wR":"w";
  const hGrS=(k,v)=>{({band:setHBand,cut:setHCut,raise:setHRaise,floor:setHFloor})[k](v);};
  const mcGrS=(k,v)=>{({band:setMcBand,cut:setMcCut,raise:setMcRaise,floor:setMcFloor})[k](v);};
  const cGrS=(k,v)=>{({band:setCGBand,cut:setCGCut,raise:setCGRaise,floor:setCGFloor})[k](v);};
  const hSmSp=()=>mkSmSp(hSmM,hSmW,hSmCl,hSmFl);
  const mcSmSp=()=>mkSmSp(mcSmM,mcSmW,mcSmCl,mcSmFl);
  const cSmSp=()=>mkSmSp(cSmM,cSmW,cSmCl,cSmFl);
  const getRate=(strat,fixedR,smR,hz)=>{if(strat==="rmd")return 1/hz;if(strat==="smoothed")return smR/100;return fixedR/100;};
  const getSp=(strat,grSp,smSp)=>{if(strat==="guardrails")return grSp;if(strat==="smoothed")return smSp;return{};};

  const applyPreset=useCallback((p,targetTab)=>{
    const t=targetTab??tab;setActivePreset(p.id);
    if(t===0){
      if(p.strat!=="rmd"&&p.strat!=="smoothed")setHRate(p.rate);setHAlloc(p.alloc);setHHz(p.hz);setHStrat(p.strat);
      if(p.strat==="guardrails"){setHBand(p.band||20);setHCut(p.cut||10);setHRaise(p.raise||10);setHFloor(p.floor||80);}
      if(p.strat==="smoothed"){setHSmM(p.smM||"yale");setHSmR(p.smR||5);setHSmW(p.smW||70);setHSmCl(p.smCl||5);setHSmFl(p.smFl||2.5);}
    }else if(t===1){
      if(p.strat!=="rmd"&&p.strat!=="smoothed")setMcRate(p.rate);setMcAlloc(p.alloc);setMcHz(p.hz);setMcStrat(p.strat);
      if(p.strat==="guardrails"){setMcBand(p.band||20);setMcCut(p.cut||10);setMcRaise(p.raise||10);setMcFloor(p.floor||80);}
      if(p.strat==="smoothed"){setMcSmM(p.smM||"yale");setMcSmR(p.smR||5);setMcSmW(p.smW||70);setMcSmCl(p.smCl||5);setMcSmFl(p.smFl||2.5);}
    }
  },[tab]);

  const advanceTour=useCallback((dir)=>{
    const next=tourStep+dir;if(next<0||next>=TOUR.length)return;
    const s=TOUR[next];setTourStep(next);
    if(s.tab!=null&&s.tab>=0)setTab(s.tab);
    if(s.preset){const p=PRESETS.find(x=>x.id===s.preset);if(p)applyPreset(p,s.tab);}
    if(s.mode!=null)setMcMode(s.mode);
    setSelYear(null);
  },[tourStep,applyPreset]);

  const startTour=()=>{setTourStep(0);const s=TOUR[0];if(s.tab!=null&&s.tab>=0)setTab(s.tab);if(s.preset){const p=PRESETS.find(x=>x.id===s.preset);if(p)applyPreset(p,s.tab);}setSelYear(null);};

  const hist=useMemo(()=>{
    const rate=getRate(hStrat,hRate,hSmR,hHz),alloc=hAlloc/100,sp=getSp(hStrat,{band:hBand/100,cut:hCut/100,raise:hRaise/100,floor:hFloor/100},hSmSp());
    const mx=NY-hHz,periods=[];
    for(let i=0;i<=mx;i++)periods.push({startYear:Y0+i,...simHist(i,P0,rate,alloc,hHz,hStrat,sp)});
    const succRate=periods.filter(p=>p.ok).length/periods.length;
    const sweep=[];for(let r=200;r<=800;r+=50){const rt=r/10000;let ok=0;for(let i=0;i<=mx;i++)if(simHist(i,P0,rt,alloc,hHz,hStrat,getSp(hStrat,{band:hBand/100,cut:hCut/100,raise:hRaise/100,floor:hFloor/100},hSmSp())).ok)ok++;sweep.push({rate:r/100,success:+(ok/(mx+1)*100).toFixed(1)});}
    let maxSafe=0;for(let r=200;r<=1000;r++){const rt=r/10000;let allOk=true;for(let i=0;i<=mx;i++){if(!simHist(i,P0,rt,alloc,hHz,hStrat,getSp(hStrat,{band:hBand/100,cut:hCut/100,raise:hRaise/100,floor:hFloor/100},hSmSp())).ok){allOk=false;break;}}if(allOk)maxSafe=r/100;else break;}
    const failed=periods.filter(p=>!p.ok);const worst=failed.length?failed.sort((a,b)=>(a.failYr||999)-(b.failYr||999))[0]:periods.sort((a,b)=>a.path[a.path.length-1].port-b.path[b.path.length-1].port)[0];
    return{periods,succRate,sweep,maxSafe,worst,pctData:buildPct(periods,hHz,pk,wk),medVol:pct(periods.map(p=>sVol(p.path,wk)),.5)};
  },[hRate,hAlloc,hHz,hStrat,hBand,hCut,hRaise,hFloor,hSmM,hSmR,hSmW,hSmCl,hSmFl,real]);

  const mc=useMemo(()=>{
    const rate=getRate(mcStrat,mcRate,mcSmR,mcHz),alloc=mcAlloc/100,sp=getSp(mcStrat,{band:mcBand/100,cut:mcCut/100,raise:mcRaise/100,floor:mcFloor/100},mcSmSp());
    const rng=mkRng(mcSeed);let gf;
    if(mcMode==="block")gf=genBlock(rng,mcBlock);else if(mcMode==="regime")gf=genRegime(rng);
    else if(mcMode==="cape")gf=genCAPE(rng,mcCapeLvl);else if(mcMode==="narrative")gf=genNarrative(rng);
    else gf=genIID(rng);
    const results=runMC(P0,rate,alloc,mcHz,mcStrat,sp,mcSims,gf);
    return{results,succRate:results.filter(r=>r.ok).length/results.length,pctData:buildPct(results,mcHz,pk,wk)};
  },[mcRate,mcAlloc,mcHz,mcStrat,mcBand,mcCut,mcRaise,mcFloor,mcSmM,mcSmR,mcSmW,mcSmCl,mcSmFl,mcMode,mcSims,mcSeed,mcBlock,mcCapeLvl,real]);

  const cmp=useMemo(()=>{
    const alloc=cAlloc/100,mx=NY-cHz;
    const cfgs={fixed:{rate:cFR/100,sp:{}},forgo:{rate:cFR/100,sp:{}},
      guardrails:{rate:cGR/100,sp:{band:cGBand/100,cut:cGCut/100,raise:cGRaise/100,floor:cGFloor/100}},
      smoothed:{rate:cSmR/100,sp:cSmSp()},rmd:{rate:1/cHz,sp:{}},};
    return cSel.map(id=>{const{rate,sp}=cfgs[id];let results;
      if(cMcMode==="historical"){results=[];for(let i=0;i<=mx;i++)results.push({...simHist(i,P0,rate,alloc,cHz,id,sp),startYear:Y0+i});}
      else{const rng=mkRng(42);let gf;
        if(cMcMode==="block")gf=genBlock(rng,7);else if(cMcMode==="regime")gf=genRegime(rng);
        else if(cMcMode==="cape")gf=genCAPE(rng,mcCapeLvl);else if(cMcMode==="narrative")gf=genNarrative(rng);
        else gf=genIID(rng);results=runMC(P0,rate,alloc,cHz,id,sp,1000,gf);}
      const sr=results.filter(r=>r.ok).length/results.length;
      const aW=[],aT=[];for(const r of results){aW.push(...r.path.filter(s=>s[wk]>0).map(s=>s[wk]));aT.push(r.path[r.path.length-1][pk]);}
      const vols=results.map(r=>sVol(r.path,wk));
      const pp=[],sp2=[];for(let y=0;y<=cHz;y++){pp.push(pct(results.map(r=>r.path[Math.min(y,r.path.length-1)]?.[pk]??0),.5));if(y>0)sp2.push(pct(results.filter(r=>r.path[y]?.[wk]>0).map(r=>r.path[y][wk]),.5));}
      return{name:id,succRate:sr,medW:pct(aW,.5),loW:pct(aW,.1),hiW:pct(aW,.9),medTerm:pct(aT,.5),medVol:pct(vols,.5),portPath:pp,spendPath:sp2};
    });
  },[cAlloc,cHz,cFR,cGR,cGBand,cGCut,cGRaise,cGFloor,cSmM,cSmR,cSmW,cSmCl,cSmFl,cMcMode,mcCapeLvl,cSel,real]);

  const selP=selYear!=null?hist.periods.find(p=>p.startYear===selYear):null;
  const sc="bg-gray-800 rounded-lg p-3";
  const touring=tourStep>=0;

  return(
    <div className="min-h-screen bg-gray-950 text-gray-100 p-2 text-sm" style={{fontFamily:"system-ui"}}>
      <div className="max-w-6xl mx-auto space-y-2">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div><h1 className="text-lg font-bold text-white">Retirement Withdrawal Strategy Simulator</h1><p className="text-xs text-gray-500">Bengen (1994) · Shiller/FRED data · 1926–2024 · $1M starting portfolio · v1.0</p></div>
          <div className="flex items-center gap-2">
            {!touring&&<button onClick={startTour} className="px-3 py-1.5 rounded text-xs font-medium bg-indigo-600/80 text-indigo-100 hover:bg-indigo-500/80 border border-indigo-500/30">📖 Guided Tour</button>}
            <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
              <button onClick={()=>setReal(true)} className={`px-2.5 py-1 rounded text-xs font-medium ${real?"bg-blue-600 text-white":"text-gray-400"}`}>Real $</button>
              <button onClick={()=>setReal(false)} className={`px-2.5 py-1 rounded text-xs font-medium ${!real?"bg-blue-600 text-white":"text-gray-400"}`}>Nominal $</button>
            </div>
          </div>
        </div>

        {touring&&<TourPanel step={tourStep} total={TOUR.length} data={TOUR[tourStep]} onNext={()=>advanceTour(1)} onPrev={()=>advanceTour(-1)} onExit={()=>setTourStep(-1)}/>}

        <div className="flex gap-1 bg-gray-900 rounded-lg p-1">{TABS.map((t,i)=>(<button key={i} onClick={()=>{setTab(i);setSelYear(null);}} className={`flex-1 py-1.5 px-2 rounded text-xs font-medium ${tab===i?"bg-blue-600 text-white":"text-gray-400 hover:text-gray-200 hover:bg-gray-800"}`}>{t}</button>))}</div>

        {tab===0&&(<div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <div className="bg-gray-800 rounded-lg p-3 space-y-2 lg:col-span-1">
            <PresetBar onApply={p=>applyPreset(p,0)} active={activePreset}/>
            <div className="border-t border-gray-700 pt-2"><h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Parameters</h3></div>
            {hStrat!=="rmd"&&hStrat!=="smoothed"&&<Sl label="Withdrawal Rate" value={hRate} onChange={setHRate} min={2} max={8} step={0.1} f={v=>`${v.toFixed(1)}%`}/>}
            <Sl label="Stocks / Bonds" value={hAlloc} onChange={setHAlloc} min={0} max={100} step={5} f={v=>`${v}/${100-v}`}/>
            <Sl label="Horizon" value={hHz} onChange={v=>{setHHz(v);setSelYear(null);}} min={10} max={40} step={1} f={v=>`${v}yr`}/>
            <div className="pt-1 border-t border-gray-700"><label className="text-xs text-gray-400">Strategy</label><StratSelect strat={hStrat} setStrat={setHStrat}/></div>
            {hStrat==="guardrails"&&<GrIn band={hBand} cut={hCut} raise={hRaise} floor={hFloor} set={hGrS}/>}
            {hStrat==="smoothed"&&<SmIn mode={hSmM} setMode={setHSmM} rate={hSmR} setRate={setHSmR} wt={hSmW} setWt={setHSmW} cl={hSmCl} setCl={setHSmCl} fl={hSmFl} setFl={setHSmFl}/>}
            <div className="pt-2 border-t border-gray-700 space-y-1">
              <div className="text-center"><div className="text-2xl font-bold" style={{color:hist.succRate>=.95?"#22c55e":hist.succRate>=.8?"#f59e0b":"#ef4444"}}>{(hist.succRate*100).toFixed(1)}%</div><div className="text-xs text-gray-500">Success ({hist.periods.length} periods)</div></div>
              {hStrat!=="rmd"&&hStrat!=="smoothed"&&<div className="text-center"><div className="text-base font-semibold text-blue-400">{hist.maxSafe.toFixed(2)}%</div><div className="text-xs text-gray-500">Max Safe WR</div></div>}
              <div className="text-center"><div className="text-sm font-semibold text-purple-400">{fP(hist.medVol)}</div><div className="text-xs text-gray-500">Med. Spend Vol</div></div>
              {hist.worst&&<div className="text-center text-xs text-gray-400">Worst: <span className="text-red-400 font-semibold cursor-pointer hover:underline" onClick={()=>setSelYear(hist.worst.startYear)}>{hist.worst.startYear}</span>{hist.worst.failYr?` (yr ${hist.worst.failYr})`:""}</div>}
            </div></div>
          <div className="lg:col-span-3 space-y-2">
            {selP&&<YearDetail period={selP} hz={hHz} real={real} onClose={()=>setSelYear(null)}/>}
            <div className={sc}><h3 className="text-xs font-semibold text-gray-400 mb-1">Success Rate by Withdrawal Rate</h3><ResponsiveContainer width="100%" height={160}><BarChart data={hist.sweep}><CartesianGrid strokeDasharray="3 3" stroke="#374151"/><XAxis dataKey="rate" tick={{fill:"#9ca3af",fontSize:10}} tickFormatter={v=>`${v}%`}/><YAxis domain={[0,100]} tick={{fill:"#9ca3af",fontSize:10}} tickFormatter={v=>`${v}%`}/><Tooltip content={<TT/>}/><Bar dataKey="success" name="Success %" radius={[3,3,0,0]} shape={({x,y,width,height,success})=><rect x={x} y={y} width={width} height={Math.max(height,0)} fill={success>=95?"#22c55e":success>=80?"#f59e0b":"#ef4444"} rx={3}/>}/></BarChart></ResponsiveContainer></div>
            <div className={sc}><h3 className="text-xs font-semibold text-gray-400 mb-1">Portfolio Percentiles ({real?"Real":"Nom"})</h3><PctChart data={hist.pctData} pk="p"/></div>
            <div className={sc}><h3 className="text-xs font-semibold text-gray-400 mb-1">Spending Percentiles ({real?"Real":"Nom"})</h3><PctChart data={hist.pctData.slice(1)} pk="w" h={180}/></div>
            <div className={sc}><h3 className="text-xs font-semibold text-gray-400 mb-1">Click any year to inspect</h3><div className="flex flex-wrap gap-0.5">{hist.periods.map(p=>(<button key={p.startYear} onClick={()=>setSelYear(selYear===p.startYear?null:p.startYear)} className={`px-1 py-0.5 rounded text-xs font-mono ${selYear===p.startYear?"ring-2 ring-blue-400 scale-110 z-10":""} ${p.ok?"bg-green-900/40 text-green-400 hover:bg-green-900/70":"bg-red-900/40 text-red-400 hover:bg-red-900/70"}`}>{p.startYear}</button>))}</div></div>
          </div></div>)}

        {tab===1&&(<div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <div className="bg-gray-800 rounded-lg p-3 space-y-2 lg:col-span-1">
            <PresetBar onApply={p=>applyPreset(p,1)} active={activePreset}/>
            <div className="border-t border-gray-700 pt-2"><h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Parameters</h3></div>
            <div><label className="text-xs text-gray-400">Strategy</label><StratSelect strat={mcStrat} setStrat={setMcStrat}/></div>
            {mcStrat!=="rmd"&&mcStrat!=="smoothed"&&<Sl label="Withdrawal Rate" value={mcRate} onChange={setMcRate} min={2} max={8} step={0.1} f={v=>`${v.toFixed(1)}%`}/>}
            <Sl label="Stocks / Bonds" value={mcAlloc} onChange={setMcAlloc} min={0} max={100} step={5} f={v=>`${v}/${100-v}`}/>
            <Sl label="Horizon" value={mcHz} onChange={setMcHz} min={10} max={40} step={1} f={v=>`${v}yr`}/>
            {mcStrat==="guardrails"&&<GrIn band={mcBand} cut={mcCut} raise={mcRaise} floor={mcFloor} set={mcGrS}/>}
            {mcStrat==="smoothed"&&<SmIn mode={mcSmM} setMode={setMcSmM} rate={mcSmR} setRate={setMcSmR} wt={mcSmW} setWt={setMcSmW} cl={mcSmCl} setCl={setMcSmCl} fl={mcSmFl} setFl={setMcSmFl}/>}
            <div className="pt-1 border-t border-gray-700 space-y-1"><label className="text-xs text-gray-400">Simulation Method</label>
              {MC_MODES.map(m=>(<button key={m.id} onClick={()=>{setMcMode(m.id);setShowInfo(false);}} className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${mcMode===m.id?"bg-blue-900/50 border border-blue-500/50 text-blue-300":"bg-gray-700/50 border border-gray-600/30 text-gray-400 hover:text-gray-200"}`}><span className="font-medium">{m.label}</span><div className="text-xs opacity-60 mt-0.5">{m.desc}</div></button>))}</div>
            {mcMode==="block"&&<Sl label="Block Size" value={mcBlock} onChange={setMcBlock} min={3} max={15} step={1} f={v=>`${v}yr`}/>}
            {mcMode==="cape"&&<div className="pt-1"><label className="text-xs text-gray-400">Starting Valuation</label><select value={mcCapeLvl} onChange={e=>setMcCapeLvl(+e.target.value)} className="w-full mt-0.5 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-white">{CN.map((n,i)=><option key={i} value={i}>{n}</option>)}</select><div className="text-xs text-gray-500 mt-0.5">Current: CAPE ≈ {CAPE[NY-1].toFixed(0)} → {CN[DEFAULT_CAPE]}</div></div>}
            {(mcMode==="regime"||mcMode==="cape"||mcMode==="narrative")&&<button onClick={()=>setShowInfo(!showInfo)} className="text-xs text-blue-400 hover:text-blue-300">{showInfo?"Hide":"Show"} model details →</button>}
            <Sl label="Simulations" value={mcSims} onChange={setMcSims} min={100} max={5000} step={100}/>
            <Sl label="Seed" value={mcSeed} onChange={setMcSeed} min={1} max={999} step={1}/>
            <div className="pt-2 border-t border-gray-700 text-center">
              <div className="text-2xl font-bold" style={{color:mc.succRate>=.95?"#22c55e":mc.succRate>=.8?"#f59e0b":"#ef4444"}}>{(mc.succRate*100).toFixed(1)}%</div>
              <div className="text-xs text-gray-500">Success · {MC_MODES.find(m=>m.id===mcMode)?.label}</div>
            </div></div>
          <div className="lg:col-span-3 space-y-2">
            {showInfo&&<ModelInfo mode={mcMode} capeLvl={mcCapeLvl}/>}
            <div className={sc}><h3 className="text-xs font-semibold text-gray-400 mb-1">Portfolio Percentiles ({real?"Real":"Nom"})</h3><PctChart data={mc.pctData} pk="p" h={240}/></div>
            <div className={sc}><h3 className="text-xs font-semibold text-gray-400 mb-1">Spending Percentiles ({real?"Real":"Nom"})</h3><PctChart data={mc.pctData.slice(1)} pk="w" h={200}/></div>
          </div></div>)}

        {tab===2&&(<div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <div className="bg-gray-800 rounded-lg p-3 space-y-2 lg:col-span-1">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Common</h3>
            <Sl label="Stocks / Bonds" value={cAlloc} onChange={setCAlloc} min={0} max={100} step={5} f={v=>`${v}/${100-v}`}/>
            <Sl label="Horizon" value={cHz} onChange={setCHz} min={10} max={40} step={1} f={v=>`${v}yr`}/>
            <div className="pt-1 border-t border-gray-700"><label className="text-xs text-gray-400">Data Method</label><select value={cMcMode} onChange={e=>setCMcMode(e.target.value)} className="w-full mt-0.5 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs text-white"><option value="historical">Historical Rolling</option><option value="iid">MC: Standard</option><option value="block">MC: Block Bootstrap</option><option value="regime">MC: Regime-Switching</option><option value="cape">MC: CAPE-Conditioned</option><option value="narrative">MC: Narrative ★</option></select></div>
            <div className="pt-1 border-t border-gray-700"><label className="text-xs text-gray-400 font-medium">Compare (min 2)</label>
              <div className="flex flex-wrap gap-1 mt-1">{CS.map(s=>(<button key={s.id} onClick={()=>toggleCS(s.id)} className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${cSel.includes(s.id)?s.bg:"bg-gray-700 text-gray-500"}`}>{s.label}</button>))}</div></div>
            {cSel.includes("fixed")&&<div className="pt-1 border-t border-gray-700"><h4 className="text-xs font-medium" style={{color:CSM.fixed.color}}>Fixed Real {cSel.includes("forgo")?"& Forgo":""}</h4><Sl label="Rate" value={cFR} onChange={setCFR} min={2} max={8} step={0.1} f={v=>`${v.toFixed(1)}%`}/></div>}
            {!cSel.includes("fixed")&&cSel.includes("forgo")&&<div className="pt-1 border-t border-gray-700"><h4 className="text-xs font-medium" style={{color:CSM.forgo.color}}>Forgo Inflation</h4><Sl label="Rate" value={cFR} onChange={setCFR} min={2} max={8} step={0.1} f={v=>`${v.toFixed(1)}%`}/></div>}
            {cSel.includes("guardrails")&&<div className="pt-1 border-t border-gray-700"><h4 className="text-xs font-medium" style={{color:CSM.guardrails.color}}>Guardrails</h4><Sl label="Init Rate" value={cGR} onChange={setCGR} min={2} max={8} step={0.1} f={v=>`${v.toFixed(1)}%`}/><GrIn band={cGBand} cut={cGCut} raise={cGRaise} floor={cGFloor} set={cGrS}/></div>}
            {cSel.includes("smoothed")&&<div className="pt-1 border-t border-gray-700"><h4 className="text-xs font-medium" style={{color:CSM.smoothed.color}}>Smoothed %</h4><SmIn mode={cSmM} setMode={setCSmM} rate={cSmR} setRate={setCSmR} wt={cSmW} setWt={setCSmW} cl={cSmCl} setCl={setCSmCl} fl={cSmFl} setFl={setCSmFl}/></div>}
            {cSel.includes("rmd")&&<div className="pt-1 border-t border-gray-700"><h4 className="text-xs font-medium" style={{color:CSM.rmd.color}}>RMD-Based</h4><p className="text-xs text-gray-500">1/{cHz} declining (simplified)</p></div>}
          </div>
          <div className="lg:col-span-3 space-y-2">
            <div className="grid gap-2" style={{gridTemplateColumns:`repeat(${cmp.length},1fr)`}}>{cmp.map(s=>(<div key={s.name} className={sc+" text-center space-y-0.5"}><Badge name={s.name}/><div className="text-xl font-bold" style={{color:s.succRate>=.95?"#22c55e":s.succRate>=.8?"#f59e0b":"#ef4444"}}>{(s.succRate*100).toFixed(1)}%</div><div className="text-xs text-gray-500">Success</div><div className="text-xs"><span className="text-gray-400">Med spend:</span> <span className="text-white font-semibold">{fmt(s.medW)}</span></div><div className="text-xs text-gray-500">{fmt(s.loW)} – {fmt(s.hiW)}</div><div className="text-xs"><span className="text-gray-400">Spend vol:</span> <span className="text-purple-400 font-semibold">{fP(s.medVol)}</span></div><div className="text-xs"><span className="text-gray-400">Terminal:</span> <span className="text-white font-semibold">{fmt(s.medTerm)}</span></div></div>))}</div>
            <div className={sc}><h3 className="text-xs font-semibold text-gray-400 mb-1">Median Portfolio ({real?"Real":"Nom"})</h3><ResponsiveContainer width="100%" height={200}><LineChart data={Array.from({length:cHz+1},(_,y)=>{const r={yr:y};cmp.forEach(s=>{r[s.name]=s.portPath[y];});return r;})}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151"/><XAxis dataKey="yr" tick={{fill:"#9ca3af",fontSize:10}}/><YAxis tick={{fill:"#9ca3af",fontSize:10}} tickFormatter={fmt}/><Tooltip content={<TT/>}/>
              {cmp.map(s=><Line key={s.name} type="monotone" dataKey={s.name} stroke={CSM[s.name].color} strokeWidth={2} dot={false} name={CSM[s.name].label}/>)}
              <ReferenceLine y={P0} stroke="#6b728060" strokeDasharray="3 3"/><ReferenceLine y={0} stroke="#6b7280"/><Legend wrapperStyle={{fontSize:10}}/></LineChart></ResponsiveContainer></div>
            <div className={sc}><h3 className="text-xs font-semibold text-gray-400 mb-1">Median Spending ({real?"Real":"Nom"})</h3><ResponsiveContainer width="100%" height={180}><LineChart data={Array.from({length:cHz},(_,y)=>{const r={yr:y+1};cmp.forEach(s=>{r[s.name]=s.spendPath[y]||0;});return r;})}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151"/><XAxis dataKey="yr" tick={{fill:"#9ca3af",fontSize:10}}/><YAxis tick={{fill:"#9ca3af",fontSize:10}} tickFormatter={fmt}/><Tooltip content={<TT/>}/>
              {cmp.map(s=><Line key={s.name} type="monotone" dataKey={s.name} stroke={CSM[s.name].color} strokeWidth={2} dot={false} name={CSM[s.name].label}/>)}
              <Legend wrapperStyle={{fontSize:10}}/></LineChart></ResponsiveContainer></div>
          </div></div>)}

        <div className="border-t border-gray-800 pt-2">
          <button onClick={()=>setShowDocs(!showDocs)} className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1">
            <span>{showDocs?"▼":"▶"}</span> Methodology Notes, References & Changelog
          </button>
          {showDocs&&(<div className="mt-2 bg-gray-900 rounded-lg p-3 text-xs text-gray-400 space-y-3">
            <div><h4 className="text-gray-300 font-semibold mb-1">Data Source</h4>
              <p>Returns reconstructed from publicly available sources: Robert Shiller's dataset (S&P 500 returns, CPI, CAPE) and FRED (intermediate-term government bond proxies), covering 1926–2024. This closely replicates but is not identical to the proprietary Ibbotson SBBI dataset used by Bengen (1994) and Morningstar. Methodology validation: the app reproduces Bengen's key finding of ~4% maximum safe withdrawal rate over 30-year rolling periods with a 50/50 stock/bond portfolio.</p></div>
            <div><h4 className="text-gray-300 font-semibold mb-1">US Survivorship Bias</h4>
              <p>All five simulation methods draw exclusively from US market history. The United States experienced unusually strong equity returns in the 20th century relative to global markets (Dimson, Marsh & Staunton, 2002). Retirees in Japan (post-1989), Germany (1910s–1940s), or other countries would have had materially different outcomes. Success rates carry inherent survivorship bias.</p></div>
            <div><h4 className="text-gray-300 font-semibold mb-1">Historical Periods & Overlap</h4>
              <p>The Historical (Bengen) tab reports success across ~70 overlapping 30-year rolling periods. Adjacent cohorts share nearly all returns. Failures cluster in one window (late 1960s stagflation). Effective independent sample size is ~8–12 for a 30-year horizon. A 98.6% rate from 70 overlapping periods is not equivalent to 98.6% from 70 independent trials.</p></div>
            <div><h4 className="text-gray-300 font-semibold mb-1">Withdrawal Strategies</h4>
              <p><span className="text-gray-300">Fixed Real (Bengen):</span> Fixed inflation-adjusted withdrawal. The original 4% rule. Bengen, W.P. (1994), "Determining Withdrawal Rates Using Historical Data," <em>Journal of Financial Planning</em>.</p>
              <p className="mt-1"><span className="text-gray-300">Forgo Inflation (Morningstar):</span> Skip CPI adjustment in years the portfolio declined. Tested in Benz, C., Ptak, J., & Rekenthaler, J. (2023–2024), "The State of Retirement Income," <em>Morningstar Research</em>.</p>
              <p className="mt-1"><span className="text-gray-300">Guardrails:</span> Adjust spending when withdrawal-to-portfolio ratio drifts outside a band. Guyton, J.T. & Klinger, W.J. (2006), "Decision Rules and Maximum Initial Withdrawal Rates," <em>Journal of Financial Planning</em>.</p>
              <p className="mt-1"><span className="text-gray-300">Smoothed % (Yale/Vanguard):</span> Yale mode: blend prior spending with portfolio target (Tobin, 1974; Yale Endowment reports). Vanguard mode: target % of portfolio with capped annual changes (Jaconetti, Kinniry & DiJoseph, 2020, <em>Vanguard Research</em>).</p>
              <p className="mt-1"><span className="text-gray-300">RMD-Based:</span> Simplified 1/N divisor (portfolio ÷ remaining years). Does <em>not</em> use actual IRS life expectancy tables. Real RMD divisors are longer, producing lower withdrawals.</p></div>
            <div><h4 className="text-gray-300 font-semibold mb-1">Monte Carlo Methods</h4>
              <p><span className="text-gray-300">i.i.d. (Standard):</span> Independent annual sampling. Industry standard (Morningstar). Overstates tail risk by ignoring serial correlation.</p>
              <p className="mt-1"><span className="text-gray-300">Block Bootstrap:</span> Contiguous multi-year blocks. Matches Portfolio Visualizer's approach. See Cogneau & Zakamouline (2013), "Block Bootstrap Methods and the Choice of Stocks for the Long Run," <em>Quantitative Finance</em>.</p>
              <p className="mt-1"><span className="text-gray-300">Regime-Switching:</span> Markov chain on four regimes. See Ang & Bekaert (2002), "Regime Switches in Interest Rates," <em>Journal of Business & Economic Statistics</em>.</p>
              <p className="mt-1"><span className="text-gray-300">CAPE-Conditioned:</span> Based on Fitzpatrick, D. & Tharp, D. (2023), "Evaluating Monte Carlo Forecast Accuracy," Income Lab / Kitces.com. Two-phase: first ~10 years from CAPE-similar starts, then unconditional bootstrap. See model details for sample size caveats.</p>
              <p className="mt-1"><span className="text-purple-400">Narrative MC ★:</span> Original method. Regime transitions (Markov) determine when markets shift; actual historical episodes play out how. Combines regime-switching macro dynamics with block bootstrap micro dynamics. Not peer-reviewed. Designed to preserve both serial correlation and within-episode coherence that i.i.d. sampling destroys.</p></div>
            <div><h4 className="text-gray-300 font-semibold mb-1">What This Tool Does Not Model</h4>
              <p>Social Security timing, tax-efficient withdrawal sequencing, healthcare and long-term care costs, dynamic spending needs, housing decisions, annuity/pension income, estate planning, international diversification. This is an educational and research tool, not financial advice.</p></div>
            <div><h4 className="text-gray-300 font-semibold mb-1">Key References</h4>
              <ul className="list-disc list-inside space-y-0.5 text-gray-500">
                <li>Bengen, W.P. (1994). "Determining Withdrawal Rates Using Historical Data." <em>Journal of Financial Planning</em>, 7(4), 171–180.</li>
                <li>Guyton, J.T. & Klinger, W.J. (2006). "Decision Rules and Maximum Initial Withdrawal Rates." <em>Journal of Financial Planning</em>, 19(3), 49–57.</li>
                <li>Kitces, M.E. & Pfau, W. (2015). "Retirement Risk, Rising Equity Glidepaths, and Valuation-Based Asset Allocation." <em>Journal of Financial Planning</em>, 28(3), 38–48.</li>
                <li>Fitzpatrick, D. & Tharp, D. (2023). "Evaluating Monte Carlo Models for Retirement Planning." Income Lab / Kitces.com.</li>
                <li>Benz, C., Ptak, J. & Rekenthaler, J. (2024). "The State of Retirement Income." Morningstar Research.</li>
                <li>Dimson, E., Marsh, P. & Staunton, M. (2002). <em>Triumph of the Optimists</em>. Princeton University Press.</li>
                <li>Shiller, R.J. Online Data. <span className="text-blue-400">econ.yale.edu/~shiller/data.htm</span></li>
              </ul></div>
            <div><h4 className="text-gray-300 font-semibold mb-1">Version History</h4>
              <div className="space-y-0.5 text-gray-500">
                <p><span className="text-gray-400">v1.0</span> — Current release. Five simulation engines (i.i.d., Block Bootstrap, Regime-Switching, CAPE-Conditioned, Narrative MC). Five withdrawal strategies (Fixed Real, Forgo Inflation, Guardrails, Smoothed %, RMD). Historical replication, Monte Carlo analysis, and strategy comparison tabs. Guided tour and strategy presets. Shiller/FRED data, 1926–2024.</p>
                <p><span className="text-gray-400">Development</span> — Bengen replication → real/nominal toggle → five MC engines → CAPE two-phase fix → Forgo Inflation & Smoothed % strategies → flexible Compare tab → documentation & citations → guided tour & presets.</p>
              </div></div>
          </div>)}
        </div>
      </div>
    </div>);
}