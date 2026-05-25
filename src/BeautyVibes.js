import { useState, useRef } from "react";

const C = {
  bg:'#FDF6EE', card:'#FFFFFF', primary:'#C4556A', primaryLight:'#F2DDE2',
  accent:'#B8936A', accentLight:'#F5EDE3', dark:'#2A1F1A', muted:'#8A7A72',
  border:'#EDE0D4', headerBg:'#FFFAF5', success:'#2E7D52', successLight:'#E6F4ED',
};

const ADMIN_PASSWORD = "beautyvibes2026";

const initialProducts = [
  { id:1,  ref:'1002346', name:'Crème Hydratante Intense', subtitle:'Karité & Amande', category:'Corps',      size:'250 ml',   price:89,  badge:'Nouveau', bg:'linear-gradient(145deg,#EDD5B5,#C9A07A)', icon:'🫙', image:null },
  { id:2,  ref:'1002341', name:'Crème de Douche',          subtitle:'Karité & Amande', category:'Corps',      size:'225 ml',   price:69,  badge:'',        bg:'linear-gradient(145deg,#EDD5B5,#C9A07A)', icon:'🧴', image:null },
  { id:3,  ref:'1002347', name:'Gommage Corps',            subtitle:'Karité & Amande', category:'Corps',      size:'110 ml',   price:65,  badge:'',        bg:'linear-gradient(145deg,#EDD5B5,#C9A07A)', icon:'✨', image:null },
  { id:4,  ref:'1002343', name:'Crème pour les Mains',     subtitle:'Karité & Amande', category:'Corps',      size:'30 ml',    price:35,  badge:'',        bg:'linear-gradient(145deg,#EDD5B5,#C9A07A)', icon:'🤲', image:null },
  { id:5,  ref:'1002135', name:'Crème Hydratante Intense', subtitle:'Pistache',         category:'Corps',      size:'250 ml',   price:89,  badge:'Nouveau', bg:'linear-gradient(145deg,#BFDB90,#7AAA48)', icon:'🫙', image:null },
  { id:6,  ref:'1002133', name:'Crème de Douche',          subtitle:'Pistache',         category:'Corps',      size:'225 ml',   price:69,  badge:'Nouveau', bg:'linear-gradient(145deg,#BFDB90,#7AAA48)', icon:'🧴', image:null },
  { id:7,  ref:'1002134', name:'Crème pour les Mains',     subtitle:'Pistache',         category:'Corps',      size:'30 ml',    price:35,  badge:'',        bg:'linear-gradient(145deg,#BFDB90,#7AAA48)', icon:'🤲', image:null },
  { id:8,  ref:'1001789', name:'Velvet Blossom',           subtitle:'Eau de Parfum — Femme', category:'Parfums', size:'50 ml', price:159, badge:'Nouveau', bg:'linear-gradient(145deg,#D4B0E8,#9060C0)', icon:'🌸', image:null },
  { id:9,  ref:'1001791', name:'Vibrant Aura',             subtitle:'Eau de Parfum — Femme', category:'Parfums', size:'50 ml', price:159, badge:'Nouveau', bg:'linear-gradient(145deg,#A0D4C0,#3A9470)', icon:'💚', image:null },
  { id:10, ref:'1001793', name:'Eternal Spice',            subtitle:'Eau de Parfum — Homme', category:'Parfums', size:'50 ml', price:169, badge:'Nouveau', bg:'linear-gradient(145deg,#D4C090,#906820)', icon:'🌿', image:null },
  { id:11, ref:'1001792', name:'Noir Temptation',          subtitle:'Eau de Parfum — Homme', category:'Parfums', size:'50 ml', price:169, badge:'Nouveau', bg:'linear-gradient(145deg,#888888,#303030)', icon:'🖤', image:null },
  { id:12, ref:'1002050', name:'Theros',                   subtitle:'Eau de Parfum — Homme', category:'Parfums', size:'50 ml', price:169, badge:'Nouveau', bg:'linear-gradient(145deg,#C8D890,#6A8830)', icon:'🌿', image:null },
  { id:13, ref:'1002167', name:'Vitamine C Glow Serum',    subtitle:'Dr. C. Tuna',      category:'Soins',      size:'30 ml',    price:189, badge:'Nouveau', bg:'linear-gradient(145deg,#F0C060,#E06010)', icon:'💊', image:null },
  { id:14, ref:'1002180', name:'Spray Anti-Transpirant',   subtitle:'Soin Corporel',    category:'Hygiène',    size:'115 ml',   price:49,  badge:'',        bg:'linear-gradient(145deg,#A0C8F0,#3070B0)', icon:'💧', image:null },
  { id:15, ref:'1001918', name:'Dentifrice Blanchissant',  subtitle:'Safran & Matcha',  category:'Hygiène',    size:'Standard', price:45,  badge:'Nouveau', bg:'linear-gradient(145deg,#C8E080,#608030)', icon:'🦷', image:null },
  { id:16, ref:'1001919', name:'Dentifrice Blanchissant',  subtitle:'Siwak & Datte',    category:'Hygiène',    size:'Standard', price:45,  badge:'Nouveau', bg:'linear-gradient(145deg,#D8C070,#905020)', icon:'🦷', image:null },
  { id:17, ref:'1001967', name:'Rouge à Lèvres Liquide',   subtitle:'04 Decidida — Glossy', category:'Maquillage', size:'5.5 ml', price:55, badge:'Nouveau', bg:'linear-gradient(145deg,#E890A8,#B02850)', icon:'💄', image:null },
  { id:18, ref:'1001968', name:'Rouge à Lèvres Liquide',   subtitle:'05 Positiva — Glossy', category:'Maquillage', size:'5.5 ml', price:55, badge:'Nouveau', bg:'linear-gradient(145deg,#E8A0A0,#C03050)', icon:'💄', image:null },
];

const CATS = ['Tous','Corps','Parfums','Soins','Hygiène','Maquillage'];

/* ─── PRODUCT CARD ─── */
function ProductCard({ product: p, onAdd }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background:C.card, borderRadius:18, overflow:'hidden', border:`1px solid ${C.border}`,
        transform: hov ? 'translateY(-5px)' : 'none',
        boxShadow: hov ? '0 16px 40px rgba(196,85,106,0.15)' : 'none',
        transition:'transform .25s,box-shadow .25s', display:'flex', flexDirection:'column' }}>
      <div style={{ height:190, position:'relative', overflow:'hidden', flexShrink:0 }}>
        {p.image
          ? <img src={p.image} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          : <div style={{ width:'100%', height:'100%', background:p.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:52, filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}>{p.icon}</span>
            </div>
        }
        {p.badge && (
          <span style={{ position:'absolute', top:12, left:12, background:C.primary, color:'white',
            fontSize:10, fontWeight:700, padding:'4px 10px', borderRadius:12, letterSpacing:'.1em' }}>
            {p.badge.toUpperCase()}
          </span>
        )}
      </div>
      <div style={{ padding:'16px', flex:1, display:'flex', flexDirection:'column' }}>
        <span style={{ fontSize:10, color:C.accent, background:C.accentLight, padding:'2px 8px', borderRadius:8, fontWeight:700, letterSpacing:'.08em', alignSelf:'flex-start' }}>
          {p.category.toUpperCase()}
        </span>
        <p style={{ margin:'8px 0 2px', fontSize:14, fontWeight:700, color:C.dark, lineHeight:1.3 }}>{p.name}</p>
        <p style={{ margin:'0 0 6px', fontSize:12, color:C.muted, fontStyle:'italic' }}>{p.subtitle}</p>
        <p style={{ margin:'0 0 auto', fontSize:11, color:C.muted }}>{p.size}</p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:14 }}>
          <span style={{ fontSize:20, fontWeight:700, color:C.primary }}>{p.price} <span style={{ fontSize:12 }}>DH</span></span>
          <button onClick={() => onAdd(p)}
            style={{ background:C.primary, color:'white', border:'none', borderRadius:20, padding:'8px 16px',
              fontSize:12, cursor:'pointer', fontFamily:'Georgia,serif', letterSpacing:'.04em' }}>
            + Panier
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── ADMIN LOGIN SCREEN ─── */
function AdminLogin({ onLogin }) {
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState(false);
  const [show, setShow] = useState(false);

  const attempt = () => {
    if (pwd === ADMIN_PASSWORD) { onLogin(); setErr(false); }
    else { setErr(true); setPwd(''); }
  };

  return (
    <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:24, padding:'48px 40px', width:380, textAlign:'center', boxShadow:'0 20px 60px rgba(196,85,106,0.1)' }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🔐</div>
        <h2 style={{ margin:'0 0 8px', fontSize:24, fontWeight:700, color:C.dark }}>Accès Administrateur</h2>
        <p style={{ margin:'0 0 32px', fontSize:14, color:C.muted, fontStyle:'italic' }}>Espace réservé — Beauty Vibes</p>
        <div style={{ position:'relative', marginBottom:16 }}>
          <input
            type={show ? 'text' : 'password'}
            value={pwd}
            onChange={e => { setPwd(e.target.value); setErr(false); }}
            onKeyDown={e => e.key === 'Enter' && attempt()}
            placeholder="Mot de passe"
            style={{ width:'100%', boxSizing:'border-box', border:`1.5px solid ${err ? C.primary : C.border}`,
              borderRadius:12, padding:'14px 48px 14px 18px', fontSize:15, fontFamily:'Georgia,serif',
              background:C.bg, color:C.dark, outline:'none' }}
          />
          <button onClick={() => setShow(v => !v)}
            style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)',
              background:'none', border:'none', cursor:'pointer', fontSize:18, color:C.muted }}>
            {show ? '🙈' : '👁'}
          </button>
        </div>
        {err && <p style={{ margin:'0 0 12px', fontSize:13, color:C.primary }}>❌ Mot de passe incorrect</p>}
        <button onClick={attempt}
          style={{ width:'100%', background:C.primary, color:'white', border:'none', borderRadius:24,
            padding:'14px', fontSize:15, cursor:'pointer', fontFamily:'Georgia,serif', fontWeight:700, letterSpacing:'.06em' }}>
          Se Connecter
        </button>
        <p style={{ margin:'20px 0 0', fontSize:11, color:C.muted, fontStyle:'italic' }}>
          💡 Indice : beautyvibes + l'année 2026
        </p>
      </div>
    </div>
  );
}

/* ─── PAYMENT MODAL ─── */
function PaymentModal({ cart, total, onClose, onSuccess }) {
  const [step, setStep] = useState(1); // 1=info, 2=payment, 3=success
  const [method, setMethod] = useState('card'); // 'card' or 'cod'
  const [form, setForm] = useState({ name:'', email:'', phone:'', address:'', city:'', cardNum:'', expiry:'', cvv:'' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const upd = (f, v) => setForm(p => ({...p, [f]: v}));

  const fmtCard = v => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
  const fmtExp  = v => { const d = v.replace(/\D/g,'').slice(0,4); return d.length > 2 ? d.slice(0,2)+'/'+d.slice(2) : d; };
  const fmtCvv  = v => v.replace(/\D/g,'').slice(0,3);

  const validate1 = () => {
    const e = {};
    if (!form.name.trim())    e.name = 'Requis';
    if (!form.email.includes('@')) e.email = 'Email invalide';
    if (form.phone.length < 8) e.phone = 'Numéro invalide';
    if (!form.address.trim()) e.address = 'Requis';
    if (!form.city.trim())    e.city = 'Requis';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validate2 = () => {
    if (method === 'cod') return true;
    const e = {};
    if (form.cardNum.replace(/\s/g,'').length < 16) e.cardNum = 'Numéro incomplet';
    if (form.expiry.length < 5) e.expiry = 'Invalide';
    if (form.cvv.length < 3)    e.cvv = 'Invalide';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitPayment = () => {
    if (!validate2()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(3); onSuccess(); }, 2200);
  };

  const INP = (err) => ({
    border:`1.5px solid ${err ? C.primary : C.border}`, borderRadius:10, padding:'11px 14px',
    fontSize:13, fontFamily:'Georgia,serif', background:C.bg, color:C.dark,
    width:'100%', boxSizing:'border-box', outline:'none',
  });
  const LBL = { fontSize:11, color:C.muted, letterSpacing:'.1em', display:'block', marginBottom:5, fontWeight:700 };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(42,31,26,0.6)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
      <div style={{ background:C.card, borderRadius:24, width:'100%', maxWidth:520, maxHeight:'90vh', overflowY:'auto', boxShadow:'0 24px 80px rgba(0,0,0,0.25)' }}>

        {/* Header */}
        <div style={{ padding:'22px 28px', borderBottom:`1px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:C.dark }}>
              {step===1 ? '📦 Vos Informations' : step===2 ? '💳 Paiement' : '🎉 Commande Confirmée'}
            </h2>
            {step < 3 && <p style={{ margin:'2px 0 0', fontSize:12, color:C.muted }}>Étape {step} sur 2</p>}
          </div>
          {step < 3 && <button onClick={onClose} style={{ background:'none', border:'none', fontSize:22, cursor:'pointer', color:C.muted }}>✕</button>}
        </div>

        <div style={{ padding:'24px 28px' }}>

          {/* STEP 1 — Info */}
          {step === 1 && (<>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
              <div style={{ gridColumn:'1/-1' }}>
                <label style={LBL}>NOM COMPLET</label>
                <input style={INP(errors.name)} value={form.name} onChange={e => upd('name', e.target.value)} placeholder="Votre nom" />
                {errors.name && <p style={{ margin:'4px 0 0', fontSize:11, color:C.primary }}>{errors.name}</p>}
              </div>
              <div>
                <label style={LBL}>EMAIL</label>
                <input style={INP(errors.email)} value={form.email} onChange={e => upd('email', e.target.value)} placeholder="email@exemple.com" type="email" />
                {errors.email && <p style={{ margin:'4px 0 0', fontSize:11, color:C.primary }}>{errors.email}</p>}
              </div>
              <div>
                <label style={LBL}>TÉLÉPHONE</label>
                <input style={INP(errors.phone)} value={form.phone} onChange={e => upd('phone', e.target.value)} placeholder="06 XX XX XX XX" />
                {errors.phone && <p style={{ margin:'4px 0 0', fontSize:11, color:C.primary }}>{errors.phone}</p>}
              </div>
              <div style={{ gridColumn:'1/-1' }}>
                <label style={LBL}>ADRESSE DE LIVRAISON</label>
                <input style={INP(errors.address)} value={form.address} onChange={e => upd('address', e.target.value)} placeholder="Rue, N°, Quartier" />
                {errors.address && <p style={{ margin:'4px 0 0', fontSize:11, color:C.primary }}>{errors.address}</p>}
              </div>
              <div>
                <label style={LBL}>VILLE</label>
                <input style={INP(errors.city)} value={form.city} onChange={e => upd('city', e.target.value)} placeholder="Casablanca..." />
                {errors.city && <p style={{ margin:'4px 0 0', fontSize:11, color:C.primary }}>{errors.city}</p>}
              </div>
            </div>

            {/* Order summary */}
            <div style={{ background:C.accentLight, borderRadius:14, padding:'16px 18px', marginBottom:20 }}>
              <p style={{ margin:'0 0 10px', fontSize:12, fontWeight:700, color:C.accent, letterSpacing:'.08em' }}>RÉCAPITULATIF</p>
              {cart.map(i => (
                <div key={i.id} style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:13 }}>
                  <span style={{ color:C.dark }}>{i.name} <span style={{ color:C.muted }}>×{i.qty}</span></span>
                  <span style={{ fontWeight:700, color:C.dark }}>{i.price * i.qty} DH</span>
                </div>
              ))}
              <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:10, marginTop:8, display:'flex', justifyContent:'space-between' }}>
                <span style={{ fontSize:14, fontWeight:700 }}>Total</span>
                <span style={{ fontSize:18, fontWeight:700, color:C.primary }}>{total} DH</span>
              </div>
            </div>

            <button onClick={() => validate1() && setStep(2)}
              style={{ width:'100%', background:C.primary, color:'white', border:'none', borderRadius:24,
                padding:'14px', fontSize:14, cursor:'pointer', fontFamily:'Georgia,serif', fontWeight:700, letterSpacing:'.06em' }}>
              Continuer vers le Paiement →
            </button>
          </>)}

          {/* STEP 2 — Payment */}
          {step === 2 && (<>
            {/* Method selector */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
              {[['card','💳','Carte Bancaire'],['cod','💵','Paiement à la livraison']].map(([val,icon,lbl]) => (
                <div key={val} onClick={() => setMethod(val)}
                  style={{ border:`2px solid ${method===val ? C.primary : C.border}`, borderRadius:14, padding:'16px 12px',
                    cursor:'pointer', textAlign:'center', background: method===val ? C.primaryLight : C.card, transition:'all .2s' }}>
                  <div style={{ fontSize:28, marginBottom:6 }}>{icon}</div>
                  <p style={{ margin:0, fontSize:12, fontWeight:700, color: method===val ? C.primary : C.muted }}>{lbl}</p>
                </div>
              ))}
            </div>

            {method === 'card' && (
              <div style={{ marginBottom:20 }}>
                {/* Card visual */}
                <div style={{ height:120, borderRadius:16, background:'linear-gradient(135deg,#C4556A,#8B3A4F)', padding:'18px 22px', marginBottom:20, position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', right:-20, top:-20, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }} />
                  <div style={{ position:'absolute', right:20, top:40, width:80, height:80, borderRadius:'50%', background:'rgba(255,255,255,0.06)' }} />
                  <p style={{ margin:'0 0 16px', color:'rgba(255,255,255,0.7)', fontSize:12, letterSpacing:'.1em' }}>BEAUTY VIBES</p>
                  <p style={{ margin:'0 0 12px', color:'white', fontSize:18, letterSpacing:'.12em', fontFamily:'monospace' }}>
                    {form.cardNum || '•••• •••• •••• ••••'}
                  </p>
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <span style={{ color:'rgba(255,255,255,0.8)', fontSize:12 }}>{form.name || 'NOM PRÉNOM'}</span>
                    <span style={{ color:'rgba(255,255,255,0.8)', fontSize:12, fontFamily:'monospace' }}>{form.expiry || 'MM/AA'}</span>
                  </div>
                </div>

                <div style={{ marginBottom:14 }}>
                  <label style={LBL}>NUMÉRO DE CARTE</label>
                  <input style={INP(errors.cardNum)} value={form.cardNum} onChange={e => upd('cardNum', fmtCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} />
                  {errors.cardNum && <p style={{ margin:'4px 0 0', fontSize:11, color:C.primary }}>{errors.cardNum}</p>}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                  <div>
                    <label style={LBL}>DATE D'EXPIRATION</label>
                    <input style={INP(errors.expiry)} value={form.expiry} onChange={e => upd('expiry', fmtExp(e.target.value))} placeholder="MM/AA" maxLength={5} />
                    {errors.expiry && <p style={{ margin:'4px 0 0', fontSize:11, color:C.primary }}>{errors.expiry}</p>}
                  </div>
                  <div>
                    <label style={LBL}>CVV</label>
                    <input style={INP(errors.cvv)} value={form.cvv} onChange={e => upd('cvv', fmtCvv(e.target.value))} placeholder="•••" maxLength={3} type="password" />
                    {errors.cvv && <p style={{ margin:'4px 0 0', fontSize:11, color:C.primary }}>{errors.cvv}</p>}
                  </div>
                </div>
                <div style={{ background:'#F0F8F4', border:`1px solid #C0E0D0`, borderRadius:10, padding:'10px 14px', marginBottom:4 }}>
                  <p style={{ margin:0, fontSize:11, color:'#2E7D52' }}>🔒 Paiement sécurisé — Vos données sont protégées par chiffrement SSL</p>
                </div>
              </div>
            )}

            {method === 'cod' && (
              <div style={{ background:C.accentLight, borderRadius:14, padding:'20px', marginBottom:20, textAlign:'center' }}>
                <div style={{ fontSize:40, marginBottom:10 }}>🚚</div>
                <p style={{ margin:'0 0 6px', fontWeight:700, fontSize:15, color:C.dark }}>Paiement à la Livraison</p>
                <p style={{ margin:0, fontSize:13, color:C.muted, fontStyle:'italic' }}>Vous payez en cash à la réception de votre commande. Disponible partout au Maroc.</p>
              </div>
            )}

            <div style={{ display:'flex', gap:10 }}>
              <button onClick={() => setStep(1)} style={{ flex:1, background:'transparent', border:`1px solid ${C.border}`, borderRadius:24, padding:'13px', fontSize:13, cursor:'pointer', fontFamily:'Georgia,serif', color:C.muted }}>
                ← Retour
              </button>
              <button onClick={submitPayment} disabled={loading}
                style={{ flex:2, background: loading ? C.muted : C.primary, color:'white', border:'none', borderRadius:24,
                  padding:'13px', fontSize:14, cursor: loading ? 'wait' : 'pointer', fontFamily:'Georgia,serif', fontWeight:700 }}>
                {loading ? '⏳ Traitement en cours...' : `Payer ${total} DH →`}
              </button>
            </div>
          </>)}

          {/* STEP 3 — Success */}
          {step === 3 && (
            <div style={{ textAlign:'center', padding:'20px 0 10px' }}>
              <div style={{ fontSize:64, marginBottom:16 }}>🎉</div>
              <h3 style={{ margin:'0 0 10px', fontSize:22, fontWeight:700, color:C.success }}>Commande Confirmée !</h3>
              <p style={{ margin:'0 0 6px', fontSize:15, color:C.dark }}>Merci <strong>{form.name}</strong> pour votre achat !</p>
              <p style={{ margin:'0 0 24px', fontSize:13, color:C.muted, fontStyle:'italic' }}>
                Un email de confirmation sera envoyé à <strong>{form.email}</strong>
              </p>
              <div style={{ background:C.successLight, borderRadius:14, padding:'16px', marginBottom:28 }}>
                <p style={{ margin:'0 0 4px', fontSize:13, color:C.success, fontWeight:700 }}>📦 Livraison estimée : 2–4 jours ouvrables</p>
                <p style={{ margin:0, fontSize:12, color:C.success }}>Livraison à : {form.address}, {form.city}</p>
              </div>
              <button onClick={onClose}
                style={{ background:C.primary, color:'white', border:'none', borderRadius:24, padding:'13px 36px',
                  fontSize:14, cursor:'pointer', fontFamily:'Georgia,serif', fontWeight:700 }}>
                Retour à la Boutique
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN APP ─── */
export default function BeautyVibes() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filter, setFilter] = useState('Tous');
  const [products, setProducts] = useState(initialProducts);
  const [adminAuth, setAdminAuth] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [addOpen, setAddOpen] = useState(false);
  const [newP, setNewP] = useState({ name:'', subtitle:'', category:'Corps', size:'', price:'', badge:'', bg:'linear-gradient(145deg,#D4B8A0,#A07850)', icon:'🧴', image:null });
  const [toast, setToast] = useState('');
  const [payOpen, setPayOpen] = useState(false);
  const fileInputRef = useRef({});

  const cartCount = cart.reduce((s,i) => s+i.qty, 0);
  const cartTotal = cart.reduce((s,i) => s+i.price*i.qty, 0);
  const filtered = filter==='Tous' ? products : products.filter(p => p.category===filter);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(''), 2800); };

  const addToCart = product => {
    setCart(prev => {
      const ex = prev.find(i => i.id===product.id);
      return ex ? prev.map(i => i.id===product.id ? {...i, qty:i.qty+1} : i) : [...prev, {...product, qty:1}];
    });
    showToast(`✓  ${product.name} ajouté au panier`);
  };

  const changeQty = (id,d) => setCart(prev => prev.map(i => i.id===id ? {...i, qty:Math.max(0,i.qty+d)} : i).filter(i => i.qty>0));

  /* IMAGE UPLOAD */
  const handleImageUpload = (id, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      setProducts(prev => prev.map(p => p.id===id ? {...p, image: e.target.result} : p));
      showToast('✓ Photo mise à jour !');
    };
    reader.readAsDataURL(file);
  };

  const handleEditImageUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => setEditData(d => ({...d, image: e.target.result}));
    reader.readAsDataURL(file);
  };

  /* ADMIN CRUD */
  const startEdit = p => { setEditId(p.id); setEditData({...p}); };
  const saveEdit = () => {
    setProducts(prev => prev.map(p => p.id===editId ? {...editData, price:Number(editData.price)} : p));
    setEditId(null); showToast('✓ Produit mis à jour !');
  };
  const saveNew = () => {
    if (!newP.name || !newP.price) return;
    const id = Math.max(...products.map(p => p.id)) + 1;
    setProducts(prev => [...prev, {...newP, id, ref:String(1000000+id), price:Number(newP.price)}]);
    setNewP({ name:'', subtitle:'', category:'Corps', size:'', price:'', badge:'', bg:'linear-gradient(145deg,#D4B8A0,#A07850)', icon:'🧴', image:null });
    setAddOpen(false); showToast('✓ Nouveau produit ajouté !');
  };
  const deleteP = id => { if (window.confirm('Supprimer ce produit ?')) setProducts(prev => prev.filter(p => p.id!==id)); };

  const INPUT = { border:`1px solid ${C.border}`, borderRadius:8, padding:'8px 12px', fontSize:13, fontFamily:'Georgia,serif', background:C.headerBg, width:'100%', boxSizing:'border-box', color:C.dark };
  const LBL2 = { fontSize:10, color:C.muted, letterSpacing:'.1em', display:'block', marginBottom:4, fontWeight:700 };

  return (
    <div style={{ fontFamily:"'Georgia','Times New Roman',serif", background:C.bg, minHeight:'100vh', color:C.dark }}>

      {/* ─── HEADER ─── */}
      <header style={{ position:'sticky', top:0, background:C.headerBg, borderBottom:`1px solid ${C.border}`, zIndex:100, padding:'0 28px', display:'flex', alignItems:'center', justifyContent:'space-between', height:64 }}>
        <span onClick={() => setPage('home')} style={{ fontSize:22, fontWeight:700, color:C.primary, cursor:'pointer', fontStyle:'italic', letterSpacing:'.1em' }}>Beauty Vibes</span>
        <nav style={{ display:'flex', gap:4 }}>
          {[['home','Accueil'],['catalogue','Catalogue'],['admin','🔒 Admin']].map(([p,lbl]) => (
            <button key={p} onClick={() => { if(p==='admin'&&!adminAuth) setPage('admin'); else setPage(p); }}
              style={{ background:page===p ? C.primaryLight : 'transparent', border:'none', padding:'8px 18px', borderRadius:22,
                color:page===p ? C.primary : C.muted, cursor:'pointer', fontSize:13, fontFamily:'Georgia,serif', fontWeight:page===p?700:400, transition:'all .2s' }}>
              {lbl}
            </button>
          ))}
        </nav>
        <button onClick={() => setCartOpen(true)} style={{ background:'transparent', border:`1px solid ${C.border}`, borderRadius:24, padding:'8px 18px', cursor:'pointer', display:'flex', alignItems:'center', gap:8, fontSize:13, fontFamily:'Georgia,serif', color:C.dark }}>
          🛒 Panier
          {cartCount > 0 && <span style={{ background:C.primary, color:'white', borderRadius:'50%', width:20, height:20, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700 }}>{cartCount}</span>}
        </button>
      </header>

      {/* ─── HOME ─── */}
      {page==='home' && (<>
        <section style={{ background:'linear-gradient(150deg,#F7ECD8 0%,#F5D8E0 45%,#EDD8F5 100%)', padding:'72px 48px', textAlign:'center' }}>
          <p style={{ fontSize:12, color:C.accent, letterSpacing:'.22em', margin:'0 0 12px', fontWeight:700 }}>JANVIER — FÉVRIER 2026</p>
          <h1 style={{ fontSize:52, fontWeight:700, color:C.dark, margin:'0 0 16px', lineHeight:1.1 }}>Votre Beauté,<br /><em style={{ color:C.primary }}>Notre Passion</em></h1>
          <p style={{ fontSize:16, color:C.muted, margin:'0 0 36px', fontStyle:'italic' }}>Cosmétiques premium · Soins & Parfums · Livraison Maroc</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => { setFilter('Tous'); setPage('catalogue'); }} style={{ background:C.primary, color:'white', border:'none', padding:'13px 34px', borderRadius:32, fontSize:14, cursor:'pointer', fontFamily:'Georgia,serif' }}>Découvrir la Collection</button>
            <button onClick={() => { setFilter('Parfums'); setPage('catalogue'); }} style={{ background:'transparent', color:C.primary, border:`1.5px solid ${C.primary}`, padding:'13px 34px', borderRadius:32, fontSize:14, cursor:'pointer', fontFamily:'Georgia,serif' }}>Voir les Parfums</button>
          </div>
        </section>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, padding:'48px 28px 24px' }}>
          {[['🧴','Soins Corps','Corps','linear-gradient(135deg,#F8ECD8,#EDD8B8)','#7A5030'],
            ['💄','Maquillage','Maquillage','linear-gradient(135deg,#F8D8E4,#F0B8C8)','#882040'],
            ['🌸','Parfums','Parfums','linear-gradient(135deg,#EAD8F8,#D4B8F0)','#6A2890'],
            ['✨','Soins Visage','Soins','linear-gradient(135deg,#F8ECC0,#F0D070)','#7A5000']
          ].map(([icon,lbl,cat,bg,clr]) => (
            <div key={cat} onClick={() => { setFilter(cat); setPage('catalogue'); }}
              style={{ background:bg, borderRadius:20, padding:'30px 16px', textAlign:'center', cursor:'pointer', transition:'transform .2s' }}
              onMouseEnter={e => e.currentTarget.style.transform='scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
              <div style={{ fontSize:38, marginBottom:10 }}>{icon}</div>
              <p style={{ margin:'0 0 4px', fontSize:15, fontWeight:700, color:clr }}>{lbl}</p>
              <p style={{ margin:0, fontSize:11, color:clr, opacity:.7, fontStyle:'italic' }}>{products.filter(p=>p.category===cat).length} produits</p>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 28px' }}>
          <h2 style={{ margin:0, fontSize:26, fontWeight:700 }}>Nouveautés & Coups de Cœur</h2>
          <button onClick={() => { setFilter('Tous'); setPage('catalogue'); }} style={{ background:'transparent', border:`1px solid ${C.border}`, padding:'8px 20px', borderRadius:20, color:C.muted, cursor:'pointer', fontSize:13, fontFamily:'Georgia,serif' }}>Voir tout →</button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', gap:18, padding:'0 28px 56px' }}>
          {products.filter(p => p.badge).slice(0,6).map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
        </div>
      </>)}

      {/* ─── CATALOGUE ─── */}
      {page==='catalogue' && (<>
        <div style={{ padding:'28px 28px 0', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div>
            <h1 style={{ margin:0, fontSize:30, fontWeight:700 }}>Notre Catalogue</h1>
            <p style={{ margin:'4px 0 0', fontSize:13, color:C.muted, fontStyle:'italic' }}>Jan — Fév 2026 · {filtered.length} produits</p>
          </div>
        </div>
        <div style={{ display:'flex', gap:8, padding:'18px 28px 14px', flexWrap:'wrap' }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ background:filter===c?C.primary:C.card, color:filter===c?'white':C.muted, border:`1px solid ${filter===c?C.primary:C.border}`, padding:'8px 20px', borderRadius:20, fontSize:13, cursor:'pointer', fontFamily:'Georgia,serif', transition:'all .2s' }}>{c}</button>
          ))}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', gap:18, padding:'0 28px 56px' }}>
          {filtered.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
        </div>
      </>)}

      {/* ─── ADMIN ─── */}
      {page==='admin' && (
        !adminAuth
          ? <AdminLogin onLogin={() => setAdminAuth(true)} />
          : (
        <div style={{ padding:'28px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
            <div>
              <h1 style={{ margin:0, fontSize:26, fontWeight:700 }}>🔧 Gestion des Produits</h1>
              <p style={{ margin:'4px 0 0', fontSize:13, color:C.muted, fontStyle:'italic' }}>{products.length} produits · Accès Admin</p>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={() => setAddOpen(v=>!v)} style={{ background:C.primary, color:'white', border:'none', padding:'10px 20px', borderRadius:22, fontSize:13, cursor:'pointer', fontFamily:'Georgia,serif' }}>
                {addOpen ? '✕ Annuler' : '+ Ajouter produit'}
              </button>
              <button onClick={() => setAdminAuth(false)} style={{ background:'transparent', border:`1px solid ${C.border}`, padding:'10px 16px', borderRadius:22, fontSize:12, cursor:'pointer', color:C.muted, fontFamily:'Georgia,serif' }}>
                🚪 Déconnexion
              </button>
            </div>
          </div>

          {/* Add form */}
          {addOpen && (
            <div style={{ background:C.headerBg, border:`1px solid ${C.border}`, borderRadius:18, padding:22, marginBottom:22 }}>
              <h3 style={{ margin:'0 0 16px', fontSize:17, color:C.dark }}>Nouveau Produit</h3>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:12 }}>
                {[['Nom','name'],['Sous-titre / Série','subtitle'],['Taille','size'],['Icône emoji','icon']].map(([lbl,fld]) => (
                  <div key={fld}>
                    <label style={LBL2}>{lbl.toUpperCase()}</label>
                    <input style={INPUT} value={newP[fld]||''} onChange={e => setNewP(p=>({...p,[fld]:e.target.value}))} />
                  </div>
                ))}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:16 }}>
                <div>
                  <label style={LBL2}>CATÉGORIE</label>
                  <select style={INPUT} value={newP.category} onChange={e => setNewP(p=>({...p,category:e.target.value}))}>
                    {CATS.filter(c=>c!=='Tous').map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={LBL2}>PRIX (DH)</label>
                  <input type="number" style={INPUT} value={newP.price} onChange={e => setNewP(p=>({...p,price:e.target.value}))} />
                </div>
                <div>
                  <label style={LBL2}>BADGE</label>
                  <input style={INPUT} value={newP.badge||''} placeholder="Nouveau..." onChange={e => setNewP(p=>({...p,badge:e.target.value}))} />
                </div>
                <div>
                  <label style={LBL2}>PHOTO</label>
                  <input type="file" accept="image/*" onChange={e => {
                    const f = e.target.files[0]; if(!f) return;
                    const r = new FileReader(); r.onload = ev => setNewP(p=>({...p,image:ev.target.result})); r.readAsDataURL(f);
                  }} style={{ ...INPUT, padding:'5px 8px', fontSize:11 }} />
                </div>
              </div>
              {newP.image && <img src={newP.image} alt="" style={{ height:80, borderRadius:10, objectFit:'cover', marginBottom:12 }} />}
              <button onClick={saveNew} style={{ background:C.primary, color:'white', border:'none', padding:'10px 24px', borderRadius:20, fontSize:13, cursor:'pointer', fontFamily:'Georgia,serif', fontWeight:700 }}>
                ✓ Enregistrer
              </button>
            </div>
          )}

          {/* Products table */}
          <div style={{ background:C.card, borderRadius:16, border:`1px solid ${C.border}`, overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
              <thead>
                <tr style={{ background:C.accentLight }}>
                  {['Photo','Réf.','Produit','Catégorie','Taille','Prix','Actions'].map(h => (
                    <th key={h} style={{ padding:'11px 14px', textAlign:'left', fontWeight:700, color:C.muted, fontSize:10, letterSpacing:'.12em', borderBottom:`1px solid ${C.border}` }}>{h.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map(p => editId===p.id ? (
                  <tr key={p.id} style={{ background:'#FDF6EE' }}>
                    {/* Edit photo */}
                    <td style={{ padding:'10px 14px' }}>
                      <div style={{ position:'relative', width:50, height:50 }}>
                        {editData.image
                          ? <img src={editData.image} alt="" style={{ width:50, height:50, borderRadius:10, objectFit:'cover' }} />
                          : <div style={{ width:50, height:50, borderRadius:10, background:p.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{p.icon}</div>
                        }
                        <label style={{ position:'absolute', inset:0, borderRadius:10, background:'rgba(0,0,0,0.45)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', opacity:0, transition:'opacity .2s' }}
                          onMouseEnter={e => e.currentTarget.style.opacity=1} onMouseLeave={e => e.currentTarget.style.opacity=0}>
                          <span style={{ color:'white', fontSize:18 }}>📷</span>
                          <input type="file" accept="image/*" style={{ display:'none' }} onChange={e => handleEditImageUpload(e.target.files[0])} />
                        </label>
                      </div>
                    </td>
                    <td style={{ padding:'10px 14px' }}><span style={{ fontSize:10, color:C.muted, fontFamily:'monospace' }}>{p.ref}</span></td>
                    <td style={{ padding:'10px 14px' }}>
                      <input style={{...INPUT, marginBottom:5}} value={editData.name} onChange={e => setEditData(d=>({...d,name:e.target.value}))} />
                      <input style={INPUT} value={editData.subtitle||''} onChange={e => setEditData(d=>({...d,subtitle:e.target.value}))} placeholder="Sous-titre" />
                    </td>
                    <td style={{ padding:'10px 14px' }}>
                      <select style={INPUT} value={editData.category} onChange={e => setEditData(d=>({...d,category:e.target.value}))}>
                        {CATS.filter(c=>c!=='Tous').map(c=><option key={c}>{c}</option>)}
                      </select>
                    </td>
                    <td style={{ padding:'10px 14px' }}><input style={{...INPUT,width:80}} value={editData.size||''} onChange={e => setEditData(d=>({...d,size:e.target.value}))} /></td>
                    <td style={{ padding:'10px 14px' }}>
                      <input type="number" style={{...INPUT,width:72}} value={editData.price} onChange={e => setEditData(d=>({...d,price:e.target.value}))} />
                    </td>
                    <td style={{ padding:'10px 14px' }}>
                      <div style={{ display:'flex', gap:6 }}>
                        <button onClick={saveEdit} style={{ background:C.primary, color:'white', border:'none', padding:'6px 12px', borderRadius:8, cursor:'pointer', fontSize:12, fontWeight:700 }}>✓</button>
                        <button onClick={() => setEditId(null)} style={{ background:C.accentLight, border:'none', padding:'6px 12px', borderRadius:8, cursor:'pointer', fontSize:12 }}>✕</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={p.id} style={{ borderBottom:`1px solid ${C.border}`, transition:'background .15s' }}
                    onMouseEnter={e => e.currentTarget.style.background='#FFFAF5'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                    {/* Photo + upload */}
                    <td style={{ padding:'10px 14px' }}>
                      <div style={{ position:'relative', width:50, height:50 }}>
                        {p.image
                          ? <img src={p.image} alt={p.name} style={{ width:50, height:50, borderRadius:10, objectFit:'cover' }} />
                          : <div style={{ width:50, height:50, borderRadius:10, background:p.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{p.icon}</div>
                        }
                        <label style={{ position:'absolute', inset:0, borderRadius:10, background:'rgba(0,0,0,0.45)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', opacity:0, transition:'opacity .2s' }}
                          onMouseEnter={e => e.currentTarget.style.opacity=1} onMouseLeave={e => e.currentTarget.style.opacity=0}>
                          <span style={{ color:'white', fontSize:16 }}>📷</span>
                          <input type="file" accept="image/*" style={{ display:'none' }} onChange={e => handleImageUpload(p.id, e.target.files[0])} />
                        </label>
                      </div>
                    </td>
                    <td style={{ padding:'10px 14px' }}><span style={{ fontSize:10, color:C.muted, fontFamily:'monospace' }}>{p.ref}</span></td>
                    <td style={{ padding:'10px 14px' }}>
                      <p style={{ margin:'0 0 2px', fontSize:13, fontWeight:700 }}>{p.name}</p>
                      {p.subtitle && <p style={{ margin:0, fontSize:11, color:C.muted, fontStyle:'italic' }}>{p.subtitle}</p>}
                      {p.badge && <span style={{ fontSize:9, background:C.primaryLight, color:C.primary, padding:'2px 7px', borderRadius:8, fontWeight:700 }}>{p.badge}</span>}
                    </td>
                    <td style={{ padding:'10px 14px' }}>
                      <span style={{ background:C.accentLight, color:C.accent, fontSize:10, padding:'3px 10px', borderRadius:10, fontWeight:700 }}>{p.category}</span>
                    </td>
                    <td style={{ padding:'10px 14px', color:C.muted, fontSize:12 }}>{p.size||'—'}</td>
                    <td style={{ padding:'10px 14px', fontWeight:700, color:C.primary, fontSize:15 }}>{p.price} <span style={{ fontSize:11, fontWeight:400 }}>DH</span></td>
                    <td style={{ padding:'10px 14px' }}>
                      <div style={{ display:'flex', gap:6 }}>
                        <button onClick={() => startEdit(p)} style={{ background:C.accentLight, color:C.accent, border:'none', padding:'6px 12px', borderRadius:8, cursor:'pointer', fontSize:11, fontWeight:700 }}>Modifier</button>
                        <button onClick={() => deleteP(p.id)} style={{ background:C.primaryLight, color:C.primary, border:'none', padding:'6px 12px', borderRadius:8, cursor:'pointer', fontSize:11, fontWeight:700 }}>Supprimer</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* ─── CART PANEL ─── */}
      {cartOpen && (<>
        <div onClick={() => setCartOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(42,31,26,0.45)', zIndex:200 }} />
        <div style={{ position:'fixed', top:0, right:0, bottom:0, width:380, background:C.headerBg, zIndex:300, boxShadow:'-8px 0 40px rgba(0,0,0,0.15)', display:'flex', flexDirection:'column' }}>
          <div style={{ padding:'20px 22px', borderBottom:`1px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <h2 style={{ margin:0, fontSize:19, fontWeight:700 }}>Mon Panier {cartCount>0 && <span style={{ fontSize:13, color:C.muted, fontWeight:400 }}>({cartCount} article{cartCount>1?'s':''})</span>}</h2>
            <button onClick={() => setCartOpen(false)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:20, color:C.muted }}>✕</button>
          </div>
          <div style={{ flex:1, overflowY:'auto', padding:'14px 22px' }}>
            {cart.length===0 ? (
              <div style={{ textAlign:'center', padding:'60px 0', color:C.muted }}>
                <div style={{ fontSize:50, marginBottom:12 }}>🛒</div>
                <p style={{ fontStyle:'italic', margin:'0 0 16px' }}>Votre panier est vide</p>
                <button onClick={() => { setCartOpen(false); setPage('catalogue'); }} style={{ background:'none', border:`1px solid ${C.border}`, padding:'8px 20px', borderRadius:20, color:C.muted, cursor:'pointer', fontSize:13, fontFamily:'Georgia,serif' }}>Continuer mes achats →</button>
              </div>
            ) : cart.map(item => (
              <div key={item.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 0', borderBottom:`1px solid ${C.border}` }}>
                <div style={{ width:54, height:54, borderRadius:12, overflow:'hidden', flexShrink:0 }}>
                  {item.image
                    ? <img src={item.image} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    : <div style={{ width:'100%', height:'100%', background:item.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{item.icon}</div>
                  }
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ margin:'0 0 2px', fontSize:13, fontWeight:700 }}>{item.name}</p>
                  <p style={{ margin:0, fontSize:11, color:C.muted, fontStyle:'italic' }}>{item.subtitle}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:8 }}>
                    <button onClick={() => changeQty(item.id,-1)} style={{ background:C.primaryLight, border:'none', width:24, height:24, borderRadius:6, cursor:'pointer', color:C.primary, fontWeight:700, fontSize:15, lineHeight:1 }}>−</button>
                    <span style={{ fontSize:14, fontWeight:600, minWidth:18, textAlign:'center' }}>{item.qty}</span>
                    <button onClick={() => changeQty(item.id,+1)} style={{ background:C.primaryLight, border:'none', width:24, height:24, borderRadius:6, cursor:'pointer', color:C.primary, fontWeight:700, fontSize:15, lineHeight:1 }}>+</button>
                  </div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <p style={{ margin:0, fontWeight:700, color:C.primary, fontSize:16 }}>{item.price*item.qty} DH</p>
                  <p style={{ margin:'2px 0 0', fontSize:10, color:C.muted }}>{item.price} DH/u</p>
                </div>
              </div>
            ))}
          </div>
          {cart.length>0 && (
            <div style={{ padding:'18px 22px', borderTop:`1px solid ${C.border}` }}>
              <div style={{ display:'flex', justifyContent:'space-between', paddingBottom:12, marginBottom:12, borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:16, fontWeight:700 }}>Total</span>
                <span style={{ fontSize:22, fontWeight:700, color:C.primary }}>{cartTotal} DH</span>
              </div>
              <button onClick={() => { setCartOpen(false); setPayOpen(true); }}
                style={{ width:'100%', background:C.primary, color:'white', border:'none', padding:'14px', borderRadius:28, fontSize:14, cursor:'pointer', fontFamily:'Georgia,serif', fontWeight:700, letterSpacing:'.06em' }}>
                💳 Passer la Commande →
              </button>
            </div>
          )}
        </div>
      </>)}

      {/* ─── PAYMENT MODAL ─── */}
      {payOpen && (
        <PaymentModal
          cart={cart} total={cartTotal}
          onClose={() => setPayOpen(false)}
          onSuccess={() => { setCart([]); }}
        />
      )}

      {/* ─── TOAST ─── */}
      {toast && (
        <div style={{ position:'fixed', bottom:26, left:'50%', transform:'translateX(-50%)', background:C.dark, color:'white',
          padding:'11px 26px', borderRadius:28, fontSize:13, zIndex:600, fontFamily:'Georgia,serif',
          boxShadow:'0 8px 24px rgba(0,0,0,0.2)', whiteSpace:'nowrap' }}>
          {toast}
        </div>
      )}
    </div>
  );
}
