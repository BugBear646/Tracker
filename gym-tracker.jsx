import { useState, useEffect } from "react";

/* ─── Mobile hook ─────────────────────────────────────────────────────── */
const useIsMobile = () => {
  const [m, setM] = useState(() => typeof window !== "undefined" && window.innerWidth < 640);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 640);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return m;
};

/* ─── Data ────────────────────────────────────────────────────────────── */
const EXERCISES = {
  Monday:    { label:"CHEST & TRICEPS",  emoji:"💪", exercises:[
    {id:"bench_press",    name:"Bench Press",              sets:"4x8-10",   muscle:"Chest",       desc:"Lie flat on a bench, grip the bar slightly wider than shoulder-width. Lower the bar to your mid-chest with control, then press explosively back up. Keep your feet flat, back slightly arched, and shoulder blades pinched together.", tip:"💡 Don't flare your elbows — keep them at ~75° to protect your shoulders.", youtube:"https://www.youtube.com/watch?v=vcBig73ojpE"},
    {id:"incline_db",     name:"Incline Dumbbell Press",   sets:"3x10-12",  muscle:"Upper Chest", desc:"Set bench to 30–45°. Press dumbbells from shoulder height upward, slightly arcing inward at the top. Controls the upper chest and front delts. Squeeze the chest at the peak of each rep.", tip:"💡 Keep wrists straight and don't let dumbbells drift too far apart at the bottom.", youtube:"https://www.youtube.com/watch?v=8iPEnn-ltC8"},
    {id:"cable_fly",      name:"Cable Crossover Fly",      sets:"3x12-15",  muscle:"Chest",       desc:"Set cables at shoulder height or above. Step forward, lean slightly, and bring both handles together in a hugging arc. Focus on the squeeze at the center — this is a stretch and contraction movement, not a push.", tip:"💡 Use lighter weight — feel the chest working, not the arms.", youtube:"https://www.youtube.com/watch?v=taI4XduLpTk"},
    {id:"dips",           name:"Weighted Dips",            sets:"3x8-10",   muscle:"Triceps",     desc:"Use parallel bars. Lower yourself until upper arms are parallel to the floor, then push back up. Lean slightly forward to hit chest more, stay upright to target triceps. Add a dip belt for extra weight.", tip:"💡 Full range of motion is key — don't do half-reps.", youtube:"https://www.youtube.com/watch?v=2z8JmcrW-As"},
    {id:"tricep_push",    name:"Tricep Pushdown",          sets:"3x12-15",  muscle:"Triceps",     desc:"Attach a rope or bar to a high pulley. Keep elbows pinned to your sides and push the handle down until arms are fully extended. Squeeze at the bottom, then control the return.", tip:"💡 Don't let your elbows flare out — control is everything here.", youtube:"https://www.youtube.com/watch?v=2-LAMcpzODU"},
    {id:"overhead_ext",  name:"Overhead Tricep Ext.",     sets:"3x10-12",  muscle:"Triceps",     desc:"Hold a dumbbell or EZ-bar overhead with both hands. Lower it behind your head by bending your elbows, keeping them pointing forward. Extend back up. This hits the long head of the tricep fully.", tip:"💡 Keep your core tight — don't arch your lower back.", youtube:"https://www.youtube.com/watch?v=nRiJVZDpdL0"},
  ]},
  Tuesday:   { label:"BACK & BICEPS",    emoji:"🏋️", exercises:[
    {id:"deadlift",       name:"Deadlift",                 sets:"4x5-6",    muscle:"Back",        desc:"Stand with feet hip-width, bar over mid-foot. Hinge at hips, grip just outside legs. Drive through the floor, keeping bar close to your body. Lock out at the top — hips and shoulders rise together.", tip:"💡 Brace your core like you're about to get punched before every rep.", youtube:"https://www.youtube.com/watch?v=op9kVnSso6Q"},
    {id:"pullup",         name:"Pull-Ups",                 sets:"4x8-10",   muscle:"Lats",        desc:"Hang from a bar with an overhand grip, slightly wider than shoulders. Pull your chest to the bar by driving your elbows down and back. Lower with control. Avoid swinging or kipping.", tip:"💡 Initiate the pull by depressing your shoulder blades first.", youtube:"https://www.youtube.com/watch?v=eGo4IYlbE5g"},
    {id:"barbell_row",    name:"Barbell Row",              sets:"4x8-10",   muscle:"Back",        desc:"Hinge at 45°, keep back flat. Pull the bar to your lower chest/upper abdomen, driving elbows back and squeezing the shoulder blades together. Lower with control.", tip:"💡 Don't jerk — use momentum only on the final reps when grinding.", youtube:"https://www.youtube.com/watch?v=FWJR5Ve8bnQ"},
    {id:"lat_pulldown",   name:"Lat Pulldown",             sets:"3x10-12",  muscle:"Lats",        desc:"Sit with thighs under pads. Grip bar wide, lean back slightly, and pull the bar to your upper chest. Think 'elbows to hips'. Squeeze the lats at the bottom, then slowly return.", tip:"💡 Avoid shrugging — keep shoulders away from ears throughout.", youtube:"https://www.youtube.com/watch?v=CAwf7n6Luuc"},
    {id:"barbell_curl",   name:"Barbell Curl",             sets:"3x10-12",  muscle:"Biceps",      desc:"Stand with feet shoulder-width, underhand grip on bar. Curl the bar up to shoulder height, keeping elbows pinned at your sides. Squeeze at the top and lower slowly for maximum time under tension.", tip:"💡 Don't swing! Slow negatives (3 seconds down) build more muscle.", youtube:"https://www.youtube.com/watch?v=kwG2ipFRgfo"},
    {id:"hammer_curl",    name:"Hammer Curl",              sets:"3x12-15",  muscle:"Biceps",      desc:"Hold dumbbells with a neutral (palms-facing) grip. Curl up, keeping the neutral grip throughout. Targets the brachialis and brachioradialis — adds thickness and arm width.", tip:"💡 Alternate arms or do both simultaneously — both work great.", youtube:"https://www.youtube.com/watch?v=zC3nLlEvin4"},
  ]},
  Wednesday: { label:"LEGS",              emoji:"🦵", exercises:[
    {id:"squat",          name:"Back Squat",               sets:"4x6-8",    muscle:"Quads",       desc:"Bar rests on upper traps (high bar) or rear delts (low bar). Feet shoulder-width, toes slightly out. Squat to at least parallel, driving knees out. Stand up by pushing the floor away.", tip:"💡 'Chest up, knees out' — say it before every set.", youtube:"https://www.youtube.com/watch?v=ultWZbUMPL8"},
    {id:"leg_press",      name:"Leg Press",                sets:"4x10-12",  muscle:"Quads",       desc:"Sit in the machine with feet hip-width on the platform. Lower the sled until knees reach ~90°, then press back up without locking out. High foot placement targets glutes/hamstrings, low targets quads.", tip:"💡 Never let your lower back peel off the seat.", youtube:"https://www.youtube.com/watch?v=IZxyjW7MPJQ"},
    {id:"rdl",            name:"Romanian Deadlift",        sets:"3x10-12",  muscle:"Hamstrings",  desc:"Hold barbell at hip height, soft knees. Hinge at hips, pushing them back while lowering the bar along your legs until you feel a strong hamstring stretch. Drive hips forward to return.", tip:"💡 This is a HIP HINGE, not a squat — keep the bar close to your legs.", youtube:"https://www.youtube.com/watch?v=JCXUYuzwNrM"},
    {id:"leg_curl",       name:"Leg Curl",                 sets:"3x12-15",  muscle:"Hamstrings",  desc:"Lie face down on the machine. Curl your heels toward your glutes as far as possible, squeeze at peak contraction, then lower slowly. The negative (lowering) phase is critical for hamstring development.", tip:"💡 Point your toes for greater hamstring engagement.", youtube:"https://www.youtube.com/watch?v=1Tq3QdYUuHs"},
    {id:"calf_raise",     name:"Standing Calf Raise",      sets:"4x15-20",  muscle:"Calves",      desc:"Stand on edge of a step or calf raise machine. Lower your heels fully for a deep stretch, then rise up onto your toes and squeeze hard at the top. Calves respond well to full range and high reps.", tip:"💡 Pause 2 seconds at the top and bottom — no bouncing.", youtube:"https://www.youtube.com/watch?v=-M4-G8p1fCI"},
    {id:"lunges",         name:"Walking Lunges",           sets:"3x12 each",muscle:"Glutes",      desc:"Step forward into a lunge, lowering your rear knee toward the floor. Push through the front heel to bring the rear foot forward into the next step. Alternate legs as you walk. Keep your torso upright throughout.", tip:"💡 Long strides hit more glute; short strides hit more quad.", youtube:"https://www.youtube.com/watch?v=L8fvypPrzzs"},
  ]},
  Thursday:  { label:"REST & RECOVERY",  emoji:"😴", exercises:[
    {id:"stretch",        name:"Full Body Stretch",        sets:"20 min",   muscle:"Recovery",    desc:"Target every major muscle group: hip flexors, hamstrings, quads, chest, lats, and shoulders. Hold each stretch for 30–60 seconds. Focus on areas that feel tight from previous training days.", tip:"💡 Never stretch cold muscles — do 5 min light cardio first.", youtube:"https://www.youtube.com/watch?v=qULTwquOuT4"},
    {id:"foam_roll",      name:"Foam Rolling",             sets:"15 min",   muscle:"Recovery",    desc:"Slowly roll over each muscle group and pause on any tight or tender spots for 20–30 seconds. Focus on glutes, IT band, thoracic spine, and quads. This breaks up adhesions and improves blood flow.", tip:"💡 Roll slow — 1 inch per second. Fast rolling does nothing.", youtube:"https://www.youtube.com/watch?v=nt_MDXR_Kb4"},
    {id:"walk",           name:"Light Walk / Cardio",      sets:"30 min",   muscle:"Cardio",      desc:"A brisk 30-minute walk increases blood flow to sore muscles, accelerating recovery without adding stress. Keep intensity low — you should be able to hold a conversation comfortably.", tip:"💡 Walking after meals also improves insulin sensitivity.", youtube:"https://www.youtube.com/watch?v=njeZ29umqVE"},
  ]},
  Friday:    { label:"SHOULDERS & ABS",  emoji:"🎯", exercises:[
    {id:"ohp",            name:"Overhead Press",           sets:"4x8-10",   muscle:"Shoulders",   desc:"Stand or sit with a barbell or dumbbells at shoulder height. Press directly overhead until arms are fully extended. Lower back to shoulders with control. Brace your core and glutes throughout — no lower back arching.", tip:"💡 Think 'push your head through the window' at the top of the movement.", youtube:"https://www.youtube.com/watch?v=2yjwXTZQDDI"},
    {id:"lateral_raise",  name:"Lateral Raise",            sets:"4x12-15",  muscle:"Shoulders",   desc:"Hold dumbbells at your sides. Raise them out to 90° (parallel to floor) with a slight bend in the elbows. Lead with your elbows, not your hands. The medial delt is almost exclusively trained through this movement.", tip:"💡 Use lighter weight — this is a precision exercise, not a strength move.", youtube:"https://www.youtube.com/watch?v=3VcKaXpzqRo"},
    {id:"face_pull",      name:"Face Pull",                sets:"3x15-20",  muscle:"Rear Delt",   desc:"Set a rope attachment at face height on a cable. Pull the rope toward your face, flaring elbows out and back. Externally rotate wrists at the end. Builds rear delts and external rotators — essential for shoulder health.", tip:"💡 This exercise prevents the rounded-shoulder look from heavy pressing.", youtube:"https://www.youtube.com/watch?v=rep-qVOkqgk"},
    {id:"arnold_press",   name:"Arnold Press",             sets:"3x10-12",  muscle:"Shoulders",   desc:"Start with dumbbells in front of your face, palms facing you. As you press up, rotate your palms outward so they face forward at the top. Reverse on the way down. Hits all three delt heads.", tip:"💡 Named after the GOAT — go full range to get the full benefit.", youtube:"https://www.youtube.com/watch?v=6Z15_WdXmVw"},
    {id:"cable_crunch",   name:"Cable Crunch",             sets:"4x15-20",  muscle:"Abs",         desc:"Kneel in front of a high cable with a rope. Hold the rope at your head, then crunch your elbows toward your knees by flexing your abs — not by pulling with your arms or bending at the hips.", tip:"💡 The abs do the work — your arms are just holding the rope.", youtube:"https://www.youtube.com/watch?v=2fbujeH3F0E"},
    {id:"hanging_leg",    name:"Hanging Leg Raise",        sets:"4x12-15",  muscle:"Abs",         desc:"Hang from a pull-up bar. Keeping legs straight (or bent for beginner), raise them to hip height or above using your core. Don't swing — control the movement. Lower slowly for maximum tension.", tip:"💡 Posterior pelvic tilt at the top increases lower ab activation.", youtube:"https://www.youtube.com/watch?v=hdng3Nm1x_E"},
  ]},
  Saturday:  { label:"FULL BODY / HIIT", emoji:"🔥", exercises:[
    {id:"clean_press",    name:"Power Clean to Press",     sets:"4x5",      muscle:"Full Body",   desc:"An explosive compound lift — pull the bar from the floor explosively, catch it in a front rack position, then press overhead. Trains power, coordination, and nearly every muscle. Keep the movement fast and controlled.", tip:"💡 Master the clean before adding weight. Technique is everything.", youtube:"https://www.youtube.com/watch?v=_irgVV7VYFI"},
    {id:"kettlebell",     name:"Kettlebell Swings",        sets:"4x20",     muscle:"Full Body",   desc:"Hip-hinge movement — drive your hips forward explosively to swing the kettlebell to chest height. Let it fall back between your legs, loading the hamstrings. It's NOT a squat. Pure hip power and posterior chain conditioning.", tip:"💡 Squeeze your glutes hard at the top of every swing.", youtube:"https://www.youtube.com/watch?v=YSxHifyI6s8"},
    {id:"burpees",        name:"Burpees",                  sets:"4x15",     muscle:"Cardio",      desc:"Drop to a plank, do a push-up, jump your feet in, then explode upward into a jump with arms overhead. Full body conditioning move that spikes heart rate fast. Keep a steady pace over max speed.", tip:"💡 Scale by removing the jump or push-up if needed — just keep moving.", youtube:"https://www.youtube.com/watch?v=dZgVxmf6jkA"},
    {id:"box_jump",       name:"Box Jumps",                sets:"4x10",     muscle:"Explosive",   desc:"Stand in front of a sturdy box. Swing your arms and dip slightly, then explode upward onto the box, landing softly with bent knees. Step (don't jump) back down. Trains fast-twitch muscle fibers and athleticism.", tip:"💡 Land SOFT — if it sounds loud, you're not using your muscles to absorb impact.", youtube:"https://www.youtube.com/watch?v=52r_Ul5k03g"},
    {id:"battle_rope",    name:"Battle Ropes",             sets:"4x30s",    muscle:"Cardio",      desc:"Hold one end of each rope. Create waves by alternating arm movements up and down as fast as possible. Keeps tension in the ropes throughout. Brutal on the arms, shoulders, and cardiovascular system.", tip:"💡 Stay in a semi-squat position — this engages your legs and core too.", youtube:"https://www.youtube.com/watch?v=roH-vKUiSQM"},
    {id:"plank",          name:"Plank",                    sets:"4x60s",    muscle:"Core",        desc:"Forearms on the floor, elbows under shoulders. Body in a straight line from head to heels. Engage everything — abs, glutes, quads. Don't let your hips sag or rise. Breathe slowly and hold the position.", tip:"💡 Think 'drag your elbows toward your toes' — this activates the core 2x more.", youtube:"https://www.youtube.com/watch?v=ASdvN_XEl_c"},
  ]},
  Sunday:    { label:"REST DAY",          emoji:"🧘", exercises:[
    {id:"yoga",           name:"Yoga / Mobility Work",     sets:"30 min",   muscle:"Flexibility", desc:"Focus on poses that open up your hips, thoracic spine, and hamstrings. Sun salutations, pigeon pose, downward dog, and child's pose are excellent choices. Move slowly and breathe into each pose.", tip:"💡 Consistency beats intensity — 20 min daily beats 2 hours once a week.", youtube:"https://www.youtube.com/watch?v=v7AYKMP6rOE"},
    {id:"meditation",     name:"Meditation",               sets:"10 min",   muscle:"Mental",      desc:"Sit comfortably, close your eyes, and focus on your breath. When your mind wanders, gently return your attention to breathing. Even 10 minutes improves focus, reduces cortisol, and enhances recovery quality.", tip:"💡 Use apps like Headspace or Wim Hof breathing to get started.", youtube:"https://www.youtube.com/watch?v=inpok4MKVLM"},
    {id:"meal_prep",      name:"Meal Prep",                sets:"Active",   muscle:"Nutrition",   desc:"Prepare your proteins, carbs, and veggies for the week. Cook in bulk: grilled chicken, rice, sweet potatoes, eggs, and green vegetables. Proper nutrition is 60-70% of your results — don't skip this.", tip:"💡 Aim for 1g of protein per lb of bodyweight daily for muscle growth.", youtube:"https://www.youtube.com/watch?v=U4pnNgCsGvk"},
  ]},
};

const THEMES = [
  {id:"fire",        name:"Fire Beast",    primary:"#FF4500", secondary:"#FF8C00", accent:"#FFD700", bg:"#0A0A0A", card:"#111111", text:"#FFFFFF"},
  {id:"electric",    name:"Electric Blue", primary:"#00D4FF", secondary:"#0066FF", accent:"#7B2FFF", bg:"#050510", card:"#0A0A1A", text:"#FFFFFF"},
  {id:"venom",       name:"Venom Green",   primary:"#39FF14", secondary:"#00FF88", accent:"#CCFF00", bg:"#050A05", card:"#0A100A", text:"#FFFFFF"},
  {id:"blood",       name:"Blood Iron",    primary:"#DC143C", secondary:"#8B0000", accent:"#FF6B6B", bg:"#0A0505", card:"#100A0A", text:"#FFFFFF"},
  {id:"chrome",      name:"Chrome Beast",  primary:"#C0C0C0", secondary:"#808080", accent:"#FFFFFF", bg:"#0A0A0A", card:"#111111", text:"#FFFFFF"},
  {id:"ultraviolet", name:"Ultraviolet",   primary:"#9D00FF", secondary:"#FF00FF", accent:"#FF69B4", bg:"#07030A", card:"#0F080F", text:"#FFFFFF"},
];

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const ytId = (url) => { const m = url.match(/(?:v=|youtu\.be\/)([^&\n?#]+)/); return m ? m[1] : null; };

const store = {
  get: () => { try { return JSON.parse(localStorage.getItem("ironlog_v3") || "{}"); } catch { return {}; } },
  set: (u) => { try { localStorage.setItem("ironlog_v3", JSON.stringify({...store.get(),...u})); } catch {} },
};

/* ─── Main App ────────────────────────────────────────────────────────── */
export default function App() {
  const isMobile = useIsMobile();
  const todayName = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const todayKey  = new Date().toISOString().split("T")[0];

  const [day,       setDay]       = useState(todayName);
  const [theme,     setTheme]     = useState(THEMES[0]);
  const [user,      setUser]      = useState(null);
  const [checked,   setChecked]   = useState({});
  const [expanded,  setExpanded]  = useState({});
  const [animKey,   setAnimKey]   = useState(null);
  const [showAuth,  setShowAuth]  = useState(false);
  const [showTheme, setShowTheme] = useState(false);

  useEffect(() => {
    const d = store.get();
    if (d.checked) setChecked(d.checked);
    if (d.theme)   setTheme(THEMES.find(t => t.id === d.theme) || THEMES[0]);
    if (d.user)    setUser(d.user);
  }, []);

  const toggle = (exId) => {
    const k = `${todayKey}_${day}_${exId}`;
    setAnimKey(k); setTimeout(() => setAnimKey(null), 350);
    setChecked(prev => { const n = {...prev, [k]: !prev[k]}; store.set({checked:n}); return n; });
  };

  const signIn = () => {
    const u = {name:"Alex Johnson", email:"alex@gmail.com", photo:"https://ui-avatars.com/api/?name=Alex+Johnson&background=random&color=fff&size=40"};
    const d = store.get();
    store.set({user:u, joinDate: d.joinDate || todayKey});
    setUser(u); setShowAuth(false);
  };

  const signOut = () => { setUser(null); store.set({user:null}); };

  const pickTheme = (t) => { setTheme(t); store.set({theme:t.id}); setShowTheme(false); };

  const exs      = EXERCISES[day]?.exercises || [];
  const done     = exs.filter(e => checked[`${todayKey}_${day}_${e.id}`]).length;
  const pct      = exs.length ? Math.round(done / exs.length * 100) : 0;
  const P=theme.primary, S=theme.secondary, A=theme.accent;
  const R = isMobile ? 24 : 32;

  return (
    <div style={{background:theme.bg, color:theme.text, minHeight:"100vh",
      fontFamily:"'Bebas Neue',Impact,sans-serif", position:"relative", overflow:"hidden"}}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:3px;height:3px;}
        ::-webkit-scrollbar-thumb{background:${P}44;border-radius:2px;}
        .card:active{opacity:.9;}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 1.5px ${P};}50%{box-shadow:0 0 0 2.5px ${P},0 0 10px ${P}88;}}
        @keyframes shimmer{0%{transform:translateX(-100%);}100%{transform:translateX(100%);}}
      `}</style>

      {/* Ambient glows */}
      <div style={{position:"fixed",top:"-20%",left:"-10%",width:"50%",height:"50%",
        background:`radial-gradient(ellipse,${P}18 0%,transparent 70%)`,pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",bottom:"-10%",right:"-10%",width:"40%",height:"40%",
        background:`radial-gradient(ellipse,${S}12 0%,transparent 70%)`,pointerEvents:"none",zIndex:0}}/>

      {/* ── HEADER ──────────────────────────────────────────── */}
      <header style={{position:"sticky",top:0,zIndex:100,
        background:`${theme.bg}EE`,backdropFilter:"blur(20px)",
        borderBottom:`1px solid ${P}30`,padding:`0 ${isMobile?14:20}px`}}>
        <div style={{maxWidth:920,margin:"0 auto",display:"flex",alignItems:"center",
          justifyContent:"space-between",height:isMobile?52:64}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:isMobile?20:26}}>⚡</span>
            <div>
              <div style={{fontSize:isMobile?17:22,letterSpacing:3,color:P,lineHeight:1}}>IRON LOG</div>
              {!isMobile&&<div style={{fontSize:9,letterSpacing:4,opacity:.4,fontFamily:"monospace"}}>DAILY WORKOUT TRACKER</div>}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:isMobile?7:10}}>
            <div style={{display:"flex",alignItems:"center",gap:5,padding:isMobile?"4px 9px":"5px 12px",
              border:`1px solid ${A}50`,borderRadius:30,background:`${A}10`}}>
              <span style={{fontSize:isMobile?12:14}}>🔥</span>
              <span style={{fontSize:isMobile?11:13,color:A}}>7{!isMobile&&" DAY STREAK"}</span>
            </div>
            <button onClick={()=>setShowTheme(v=>!v)} style={{background:`linear-gradient(135deg,${P},${S})`,
              border:"none",borderRadius:"50%",width:isMobile?30:36,height:isMobile?30:36,cursor:"pointer",fontSize:isMobile?12:14}}>🎨</button>
            {user
              ? <img onClick={signOut} src={user.photo} alt="" style={{width:isMobile?28:36,height:isMobile?28:36,
                  borderRadius:"50%",border:`2px solid ${P}`,cursor:"pointer"}}/>
              : <button onClick={()=>setShowAuth(true)} style={{background:"transparent",border:`1px solid ${P}`,
                  color:P,padding:isMobile?"5px 10px":"6px 14px",borderRadius:6,cursor:"pointer",
                  fontSize:isMobile?10:12,letterSpacing:2,fontFamily:"inherit"}}>SIGN IN</button>}
          </div>
        </div>
      </header>

      {/* ── THEME PICKER ────────────────────────────────────── */}
      {showTheme && (
        <div onClick={()=>setShowTheme(false)}
          style={{position:"fixed",inset:0,zIndex:150,background:"transparent"}}/>
      )}
      {showTheme && (
        <div style={{position:"fixed",top:isMobile?58:68,right:isMobile?10:20,
          left:isMobile?10:"auto",zIndex:200,background:theme.card,
          border:`1px solid ${P}40`,borderRadius:12,padding:14,
          width:isMobile?"auto":210,boxShadow:`0 20px 60px rgba(0,0,0,.7)`}}>
          <div style={{fontSize:10,letterSpacing:3,opacity:.4,marginBottom:10,fontFamily:"monospace"}}>CHOOSE YOUR POWER</div>
          {THEMES.map(t=>(
            <button key={t.id} onClick={()=>pickTheme(t)}
              style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"8px 10px",
                background:t.id===theme.id?`${t.primary}20`:"transparent",
                border:t.id===theme.id?`1px solid ${t.primary}`:"1px solid transparent",
                borderRadius:7,cursor:"pointer",marginBottom:3,color:theme.text,
                fontFamily:"inherit",letterSpacing:1,fontSize:12}}>
              <div style={{display:"flex",gap:3}}>
                {[t.primary,t.secondary,t.accent].map((c,i)=>(
                  <div key={i} style={{width:9,height:9,borderRadius:"50%",background:c}}/>
                ))}
              </div>
              {t.name}
            </button>
          ))}
        </div>
      )}

      {/* ── AUTH MODAL ──────────────────────────────────────── */}
      {showAuth && (
        <div onClick={()=>setShowAuth(false)} style={{position:"fixed",inset:0,zIndex:300,
          display:"flex",alignItems:"center",justifyContent:"center",
          background:"rgba(0,0,0,.85)",backdropFilter:"blur(12px)"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:theme.card,
            border:`1px solid ${P}40`,borderRadius:20,padding:"36px 32px",
            width:isMobile?"92vw":340,textAlign:"center",
            boxShadow:`0 40px 80px rgba(0,0,0,.8),0 0 60px ${P}20`}}>
            <div style={{fontSize:40,marginBottom:8}}>⚡</div>
            <div style={{fontSize:22,letterSpacing:4,color:P,marginBottom:6}}>JOIN THE GRIND</div>
            <div style={{fontSize:10,opacity:.4,letterSpacing:2,marginBottom:28,fontFamily:"monospace"}}>
              TRACK · PROGRESS · DOMINATE
            </div>
            <button onClick={signIn} style={{width:"100%",display:"flex",alignItems:"center",
              justifyContent:"center",gap:12,padding:"13px 20px",background:"#FFF",color:"#333",
              border:"none",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:600}}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <div style={{marginTop:12,fontSize:9,opacity:.3,letterSpacing:1,fontFamily:"monospace"}}>YOUR DATA STAYS PRIVATE</div>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ────────────────────────────────────── */}
      <div style={{maxWidth:920,margin:"0 auto",padding:isMobile?"16px 12px 160px":"24px 20px 130px",
        position:"relative",zIndex:1}}>

        {/* Day tabs */}
        <div style={{display:"flex",gap:isMobile?5:8,marginBottom:isMobile?16:24,overflowX:"auto",paddingBottom:4}}>
          {DAYS.map(d => {
            const exList = EXERCISES[d]?.exercises||[];
            const cnt = exList.filter(e=>checked[`${todayKey}_${d}_${e.id}`]).length;
            const active = d===day, isToday = d===todayName;
            return (
              <button key={d} onClick={()=>setDay(d)}
                style={{flexShrink:0,padding:isMobile?"7px 9px":"9px 16px",
                  background:active?`linear-gradient(135deg,${P},${S})`:theme.card,
                  border:isToday&&!active?`1px solid ${P}80`:`1px solid ${P}20`,
                  borderRadius:9,cursor:"pointer",color:theme.text,fontFamily:"inherit",
                  letterSpacing:isMobile?0:1,fontSize:isMobile?11:13,
                  boxShadow:active?`0 5px 18px ${P}40`:"none",transition:"all .2s",
                  minWidth:isMobile?36:"auto"}}>
                <div>{d.slice(0,3).toUpperCase()}</div>
                {cnt>0&&<div style={{fontSize:9,opacity:.8,marginTop:1}}>{cnt}/{exList.length}</div>}
              </button>
            );
          })}
        </div>

        {/* Day header + ring */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
          marginBottom:isMobile?12:18,gap:12}}>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:9,letterSpacing:4,opacity:.35,fontFamily:"monospace",marginBottom:3}}>
              {day===todayName?"TODAY'S MISSION":day.toUpperCase()}
            </div>
            <div style={{fontSize:isMobile?21:34,letterSpacing:isMobile?1:3,color:P,lineHeight:1.1}}>
              {EXERCISES[day]?.emoji} {EXERCISES[day]?.label}
            </div>
          </div>
          <div style={{flexShrink:0,textAlign:"center"}}>
            <div style={{position:"relative",width:R*2+12,height:R*2+12}}>
              <svg width={R*2+12} height={R*2+12} style={{transform:"rotate(-90deg)"}}>
                <circle cx={R+6} cy={R+6} r={R} fill="none" stroke={`${P}20`} strokeWidth="5"/>
                <circle cx={R+6} cy={R+6} r={R} fill="none" stroke={P} strokeWidth="5"
                  strokeDasharray={`${2*Math.PI*R}`}
                  strokeDashoffset={`${2*Math.PI*R*(1-pct/100)}`}
                  strokeLinecap="round" style={{transition:"stroke-dashoffset .5s"}}/>
              </svg>
              <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div style={{fontSize:isMobile?13:17,color:P}}>{pct}%</div>
              </div>
            </div>
            <div style={{fontSize:9,opacity:.4,marginTop:2}}>{done}/{exs.length}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{height:3,background:`${P}18`,borderRadius:2,overflow:"hidden",marginBottom:isMobile?16:22}}>
          <div style={{height:"100%",background:`linear-gradient(90deg,${P},${A})`,
            width:`${pct}%`,borderRadius:2,transition:"width .5s",boxShadow:`0 0 8px ${P}`}}/>
        </div>

        {/* Exercise cards */}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {exs.map(ex => {
            const ck  = `${todayKey}_${day}_${ex.id}`;
            const ek  = `${day}_${ex.id}`;
            const done= !!checked[ck];
            const exp = !!expanded[ek];
            const vid = ytId(ex.youtube);
            return (
              <div key={ex.id} className="card"
                style={{background:done?`${P}10`:theme.card,
                  border:done?`1px solid ${P}50`:`1px solid ${P}18`,
                  borderRadius:13,overflow:"hidden",
                  transform:animKey===ck?"scale(0.99)":"scale(1)",
                  boxShadow:done?`0 4px 18px ${P}18`:"none",
                  transition:"all .2s"}}>

                {/* Main row */}
                <div onClick={()=>toggle(ex.id)}
                  style={{display:"flex",alignItems:"center",gap:isMobile?10:13,
                    padding:isMobile?"11px 13px":"14px 17px",cursor:"pointer"}}>
                  {/* Checkbox */}
                  <div style={{width:isMobile?25:27,height:isMobile?25:27,borderRadius:7,flexShrink:0,
                    border:done?`2px solid ${P}`:`2px solid ${P}40`,
                    background:done?`linear-gradient(135deg,${P},${S})`:"transparent",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    transition:"all .2s",boxShadow:done?`0 0 12px ${P}55`:""}} >
                    {done&&<span style={{fontSize:12}}>✓</span>}
                  </div>
                  {/* Name + muscle */}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:isMobile?14:17,letterSpacing:isMobile?1:2,
                      color:done?P:theme.text,textDecoration:done?"line-through":"none",
                      opacity:done?.7:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      {ex.name}
                    </div>
                    <div style={{fontSize:9,letterSpacing:2,opacity:.35,fontFamily:"monospace",marginTop:2}}>
                      {ex.muscle.toUpperCase()}
                    </div>
                  </div>
                  {/* Sets */}
                  <div style={{fontSize:isMobile?10:11,color:P,fontFamily:"monospace",
                    opacity:.8,flexShrink:0,letterSpacing:1}}>
                    {ex.sets}
                  </div>
                  {/* Expand */}
                  <button onClick={e=>{e.stopPropagation();setExpanded(v=>({...v,[ek]:!v[ek]}));}}
                    style={{background:exp?`${P}22`:"transparent",border:`1px solid ${P}33`,
                      borderRadius:6,color:P,padding:isMobile?"4px 7px":"5px 9px",cursor:"pointer",
                      fontSize:10,fontFamily:"inherit",flexShrink:0,transition:"background .2s"}}>
                    {exp?"▲":"▼"}
                  </button>
                </div>

                {/* Expanded panel */}
                {exp && (
                  <div style={{borderTop:`1px solid ${P}20`,
                    padding:isMobile?"13px 13px 17px":"18px 17px 20px",
                    background:`${P}06`}}>
                    <div style={{display:"grid",
                      gridTemplateColumns:(!isMobile&&vid)?"1fr 210px":"1fr",
                      gap:isMobile?14:22,alignItems:"start"}}>
                      {/* Description */}
                      <div>
                        <div style={{fontSize:10,letterSpacing:3,color:P,opacity:.6,
                          marginBottom:9,fontFamily:"monospace"}}>HOW TO DO IT</div>
                        <p style={{fontFamily:"system-ui,sans-serif",fontSize:isMobile?13:14,
                          lineHeight:1.75,opacity:.78,marginBottom:14}}>{ex.desc}</p>
                        <div style={{fontFamily:"system-ui,sans-serif",fontSize:isMobile?12:13,
                          lineHeight:1.65,padding:"10px 13px",background:`${A}12`,
                          border:`1px solid ${A}35`,borderRadius:8,color:A}}>{ex.tip}</div>
                      </div>
                      {/* YouTube */}
                      {vid && (
                        <div>
                          <div style={{fontSize:10,letterSpacing:3,color:P,opacity:.6,
                            marginBottom:9,fontFamily:"monospace"}}>WATCH TUTORIAL</div>
                          <a href={ex.youtube} target="_blank" rel="noopener noreferrer"
                            style={{display:"block",textDecoration:"none"}}>
                            <div style={{position:"relative",borderRadius:9,overflow:"hidden",
                              aspectRatio:"16/9",border:`1px solid ${P}30`}}>
                              <img src={`https://img.youtube.com/vi/${vid}/mqdefault.jpg`}
                                alt={ex.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                              <div style={{position:"absolute",inset:0,
                                background:"linear-gradient(to top,rgba(0,0,0,.75) 0%,transparent 60%)"}}/>
                              <div style={{position:"absolute",top:"50%",left:"50%",
                                transform:"translate(-50%,-50%)",width:44,height:44,
                                background:"rgba(255,0,0,.9)",borderRadius:"50%",
                                display:"flex",alignItems:"center",justifyContent:"center",
                                boxShadow:"0 4px 20px rgba(255,0,0,.55)"}}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                              <div style={{position:"absolute",bottom:7,left:9,right:9,
                                fontFamily:"system-ui",fontSize:10,color:"white",fontWeight:700,
                                textShadow:"0 1px 4px rgba(0,0,0,.8)",zIndex:2}}>{ex.name}</div>
                            </div>
                          </a>
                          <a href={ex.youtube} target="_blank" rel="noopener noreferrer"
                            style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,
                              marginTop:8,padding:"8px 12px",background:"rgba(255,0,0,.1)",
                              border:"1px solid rgba(255,0,0,.4)",borderRadius:8,color:"#FF4444",
                              textDecoration:"none",fontFamily:"system-ui",fontSize:12,fontWeight:700}}>
                            <svg width="14" height="14" viewBox="0 0 24 24">
                              <path fill="#FF0000" d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z"/>
                            </svg>
                            Open on YouTube
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Completion banner */}
        {pct===100 && (
          <div style={{marginTop:22,padding:isMobile?18:26,textAlign:"center",
            background:`linear-gradient(135deg,${P}20,${S}15)`,
            border:`1px solid ${P}60`,borderRadius:15,boxShadow:`0 0 40px ${P}25`}}>
            <div style={{fontSize:isMobile?30:42,marginBottom:7}}>🏆</div>
            <div style={{fontSize:isMobile?20:27,letterSpacing:3,color:P}}>BEAST MODE UNLOCKED</div>
            <div style={{fontSize:10,letterSpacing:2,opacity:.45,marginTop:7,fontFamily:"monospace"}}>
              {day.toUpperCase()} COMPLETE
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{marginTop:36,paddingTop:16,borderTop:`1px solid ${P}15`,
          display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:9,letterSpacing:3,opacity:.22,fontFamily:"monospace"}}>IRON LOG v3.0</div>
          {user&&<div style={{fontSize:10,letterSpacing:1,opacity:.28,fontFamily:"monospace"}}>⚡ {user.email}</div>}
        </div>
      </div>

      {/* ── CALENDAR STRIP ──────────────────────────────────── */}
      <CalendarStrip theme={theme} checked={checked} />
    </div>
  );
}

/* ─── GitHub-style contribution calendar ─────────────────────────────── */
function CalendarStrip({ theme, checked }) {
  const P=theme.primary, S=theme.secondary, A=theme.accent;

  // Get join date (first sign-in) or fallback to Jan 1 this year
  const d = store.get();
  const rawJoin = d.joinDate || `${new Date().getFullYear()}-01-01`;
  const joinDate = new Date(rawJoin);
  joinDate.setHours(0,0,0,0);

  const today = new Date(); today.setHours(0,0,0,0);
  const calYear = joinDate.getFullYear();

  // Full calendar year Jan 1 → Dec 31
  const yearStart = new Date(calYear, 0, 1);
  const yearEnd   = new Date(calYear, 11, 31);

  // Grid starts on Sunday on/before Jan 1
  const gridStart = new Date(yearStart);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());

  // Total weeks to cover Jan 1 → Dec 31
  const WEEKS = Math.ceil((yearEnd - gridStart) / (7 * 86400000)) + 1;

  // Build all day cells
  const cells = [];
  for (let w = 0; w < WEEKS; w++) {
    for (let dw = 0; dw < 7; dw++) {
      const date = new Date(gridStart);
      date.setDate(gridStart.getDate() + w*7 + dw);
      date.setHours(0,0,0,0);
      const ds = date.toISOString().split("T")[0];
      const inYear   = date.getFullYear() === calYear;
      const isToday  = date.getTime() === today.getTime();
      const isFuture = date > today;
      const active   = inYear && date >= joinDate && !isFuture;
      const workouts = active ? Object.keys(checked).filter(k => k.startsWith(ds) && checked[k]).length : 0;
      cells.push({ date, ds, inYear, isToday, isFuture, active, workouts, w, dw });
    }
  }

  // Month labels — exactly Jan→Dec, pixel-aligned to week column
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const CELL = 11, GAP = 3, COL = CELL + GAP;
  const monthLabels = MONTHS.map((label, mi) => {
    const first = new Date(calYear, mi, 1);
    const diffDays = Math.floor((first - gridStart) / 86400000);
    return { label, left: Math.floor(diffDays / 7) * COL };
  });

  const DOW = ["","Mon","","Wed","","Fri",""];
  const DOW_W = 28;
  const gridPxW = WEEKS * COL - GAP;
  const totalW  = DOW_W + gridPxW;
  const workoutDays = cells.filter(c => c.workouts > 0).length;

  return (
    <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:50,
      background:`${theme.bg}F3`,backdropFilter:"blur(20px)",
      borderTop:`1px solid ${P}30`,padding:"9px 16px 11px"}}>

      <style>{`@keyframes pulse{0%,100%{box-shadow:0 0 0 1.5px ${P};}50%{box-shadow:0 0 0 2.5px ${P},0 0 10px ${P}88;}}`}</style>

      <div style={{maxWidth:920,margin:"0 auto"}}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
          <div style={{fontFamily:"monospace",fontSize:10,letterSpacing:1.5,color:P,opacity:.75}}>
            {workoutDays} WORKOUT DAYS
            <span style={{opacity:.4,color:theme.text}}> · JAN – DEC {calYear}</span>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <span style={{fontFamily:"monospace",fontSize:8,opacity:.3}}>Less</span>
            {[.12,.3,.55,.8,1].map((op,i)=>(
              <div key={i} style={{width:CELL,height:CELL,borderRadius:2,
                background:i===0?`${P}1E`:`${P}${Math.round(op*255).toString(16).padStart(2,"0")}`}}/>
            ))}
            <span style={{fontFamily:"monospace",fontSize:8,opacity:.3}}>More</span>
          </div>
        </div>

        {/* Scrollable grid wrapper */}
        <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
          {/* Fixed-width inner so scroll works and labels stay aligned */}
          <div style={{display:"flex",width:totalW,minWidth:totalW}}>

            {/* Day-of-week labels */}
            <div style={{width:DOW_W,flexShrink:0,display:"flex",flexDirection:"column",
              gap:GAP,paddingTop:18,paddingRight:4}}>
              {DOW.map((lbl,i)=>(
                <div key={i} style={{height:CELL,fontSize:8,fontFamily:"monospace",
                  color:theme.text,opacity:.3,lineHeight:`${CELL}px`,textAlign:"right",whiteSpace:"nowrap"}}>
                  {lbl}
                </div>
              ))}
            </div>

            {/* Month labels + cells — same pixel coordinate system */}
            <div style={{width:gridPxW,flexShrink:0}}>
              {/* Month label row */}
              <div style={{position:"relative",height:16,marginBottom:2,width:gridPxW}}>
                {monthLabels.map((ml,i)=>(
                  <div key={i} style={{position:"absolute",left:ml.left,
                    fontSize:10,fontFamily:"monospace",color:theme.text,
                    opacity:.45,whiteSpace:"nowrap",lineHeight:"16px"}}>
                    {ml.label}
                  </div>
                ))}
              </div>

              {/* Cell columns */}
              <div style={{display:"flex",gap:GAP}}>
                {Array.from({length:WEEKS},(_,w)=>(
                  <div key={w} style={{display:"flex",flexDirection:"column",gap:GAP,flexShrink:0}}>
                    {Array.from({length:7},(_,dw)=>{
                      const c = cells[w*7+dw];
                      if (!c) return <div key={dw} style={{width:CELL,height:CELL}}/>;

                      let bg;
                      if (!c.inYear)         bg = "transparent";
                      else if (!c.active)    bg = `${P}18`;
                      else if (!c.workouts)  bg = `${P}22`;
                      else {
                        const shade = c.workouts<=1?.35:c.workouts<=3?.55:c.workouts<=5?.78:1;
                        bg = `${P}${Math.round(shade*255).toString(16).padStart(2,"0")}`;
                      }

                      const label = c.date.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})
                        + (c.workouts?` · ${c.workouts} done`:"");

                      return (
                        <div key={dw} title={label} style={{
                          width:CELL,height:CELL,borderRadius:2,background:bg,flexShrink:0,
                          border:c.isToday?`1.5px solid ${P}`:"none",
                          animation:c.isToday?"pulse 2s infinite":"none",
                          cursor:"default",transition:"background .2s"}}/>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
