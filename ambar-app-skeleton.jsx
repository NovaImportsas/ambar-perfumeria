import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, X, MessageCircle, Search, Menu, ChevronRight, Heart, ArrowRight, Star, Sparkles, Award, Truck, Lock, MapPin, Mail, Phone, Instagram } from 'lucide-react';

// =========================================================================
// AMBAR PERFUMERIA — Brand tokens
// =========================================================================
const C = {
  ink: '#0F0703',
  inkSoft: '#1A0E08',
  brown: '#2D1810',
  brownMid: '#3D2418',
  brownLight: '#4D2E1C',
  gold: '#C9A961',
  goldLight: '#E5C879',
  goldDark: '#8B6F2B',
  goldDeep: '#6B5520',
  cream: '#F5EDD8',
  pearl: '#FAF4E1',
  ash: '#8C7E62',
  mute: '#C2B89F',
  warm: '#1A0E08',
};

const WA_NUMBER = '573173641851';
const SHOPIFY_BASE = 'https://nova-import-7.myshopify.com';

const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&family=Cinzel:wght@400;500;600&display=swap');
    .f-serif { font-family: 'Cormorant Garamond', serif; font-feature-settings: 'liga' 1, 'kern' 1; }
    .f-display { font-family: 'Cinzel', serif; letter-spacing: 0.05em; }
    .f-sans { font-family: 'Inter', sans-serif; }
    .f-mono { font-family: 'Inter', sans-serif; letter-spacing: 0.3em; text-transform: uppercase; font-size: 0.65rem; font-weight: 500; }
    body { background: ${C.ink}; color: ${C.pearl}; margin: 0; }
    * { box-sizing: border-box; }

    @keyframes fadeup { from {opacity:0; transform:translateY(20px)} to {opacity:1; transform:none} }
    .fadeup { animation: fadeup 0.9s ease-out both; }
    .fadeup-d1 { animation: fadeup 0.9s 0.15s ease-out both; }
    .fadeup-d2 { animation: fadeup 0.9s 0.3s ease-out both; }

    @keyframes shimmer { 0% {background-position: -200% 0} 100% {background-position: 200% 0} }
    .gold-text {
      background: linear-gradient(90deg, ${C.goldDark}, ${C.goldLight}, ${C.goldDark});
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 8s linear infinite;
    }

    @keyframes scrollx { from {transform: translateX(0)} to {transform: translateX(-50%)} }
    .marquee { animation: scrollx 60s linear infinite; }

    .grain {
      background-image: radial-gradient(rgba(201,169,97,0.04) 1px, transparent 1px);
      background-size: 6px 6px;
    }
    .glow-gold { box-shadow: 0 0 100px rgba(201,169,97,0.3); }
    .glow-gold-sm { box-shadow: 0 0 40px rgba(201,169,97,0.2); }

    .h-link { position: relative; }
    .h-link::after {
      content: ''; position: absolute; left: 0; bottom: -4px;
      width: 0; height: 1px; background: ${C.gold};
      transition: width 0.3s ease;
    }
    .h-link:hover::after { width: 100%; }

    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: ${C.inkSoft}; }
    ::-webkit-scrollbar-thumb { background: ${C.goldDark}; border-radius: 4px; }

    .product-card-img-bg {
      background: radial-gradient(circle at 50% 60%, var(--cardp, ${C.brown}) 0%, ${C.ink} 100%);
    }

    @keyframes float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-15px) } }
    .float { animation: float 6s ease-in-out infinite; }
  `}</style>
);

// PLACEHOLDER: PRODUCTS array goes here
const PRODUCTS = [/* INJECT_PRODUCTS_HERE */];

const formatPrice = (n) => '$' + n.toLocaleString('es-CO');
const getShopifyUrl = (p) => `${SHOPIFY_BASE}/products/${p.id}`;
const buildWA = (perfume) => {
  const text = perfume
    ? `Hola Ámbar Perfumería, me interesa ${perfume.name}. ¿Está disponible?`
    : 'Hola Ámbar Perfumería, quisiera asesoría para escoger un perfume.';
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
};

// =========================================================================
// PROMO MARQUEE
// =========================================================================
function PromoMarquee() {
  const items = [
    '◆ IMPORTAMOS DIRECTO DESDE DUBAI',
    '◆ ENVÍO GRATIS DESDE $150.000',
    '◆ PAGO CONTRA ENTREGA · NEQUI · ADDI',
    '◆ MARCAS ÁRABES 100% ORIGINALES',
    '◆ GARANTÍA DE AUTENTICIDAD',
  ];
  return (
    <div className="overflow-hidden border-b py-2.5" style={{background: C.ink, borderColor: C.gold + '20'}}>
      <div className="flex marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((it, i) => (
          <span key={i} className="mx-10 f-mono" style={{color: C.goldLight}}>{it}</span>
        ))}
      </div>
    </div>
  );
}

// =========================================================================
// HEADER
// =========================================================================
function Header({ onNav, currentFilter, currentView, cartCount, onCartOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    { key: 'all', label: 'Catálogo' },
    { key: 'mujer', label: 'Femeninos' },
    { key: 'hombre', label: 'Masculinos' },
    { key: 'unisex', label: 'Unisex' },
    { key: 'arabes', label: 'Árabes' },
    { key: 'inspirados', label: 'Esencias' },
  ];
  const active = (key) => currentView === 'catalog' && currentFilter === key;
  return (
    <header className="sticky top-0 z-40 backdrop-blur-lg" style={{background: 'rgba(15,7,3,0.88)', borderBottom: `1px solid ${C.gold}25`}}>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <button onClick={() => onNav('home')} className="flex items-baseline gap-2">
          <span className="f-serif text-3xl italic" style={{color: C.pearl}}>Á</span>
          <span className="f-display text-2xl gold-text">MBAR</span>
          <span className="f-mono ml-1" style={{color: C.ash, fontSize: '0.55rem'}}>PERFUMERÍA</span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map(n => (
            <button
              key={n.key}
              onClick={() => onNav('catalog', n.key)}
              className="h-link f-mono"
              style={{color: active(n.key) ? C.gold : C.pearl}}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={buildWA()} target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-4 py-2 border f-mono transition hover:bg-amber-900/30" style={{borderColor: C.gold + '50', color: C.gold}}>
            <MessageCircle size={14}/> ASESORÍA
          </a>
          <button onClick={onCartOpen} className="relative p-2">
            <ShoppingBag size={22} color={C.gold} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold" style={{background: C.gold, color: C.brown}}>{cartCount}</span>
            )}
          </button>
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(o => !o)}>
            {mobileOpen ? <X size={22} color={C.gold}/> : <Menu size={22} color={C.gold}/>}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden px-6 pb-6 flex flex-col gap-4 border-t" style={{borderColor: C.gold + '20'}}>
          {navItems.map(n => (
            <button key={n.key} onClick={() => { onNav('catalog', n.key); setMobileOpen(false); }} className="f-mono text-left py-2" style={{color: active(n.key) ? C.gold : C.pearl}}>{n.label}</button>
          ))}
        </nav>
      )}
    </header>
  );
}

// =========================================================================
// HERO — Editorial split with large bottle
// =========================================================================
function Hero({ onCta }) {
  return (
    <section className="relative overflow-hidden" style={{background: `linear-gradient(135deg, ${C.ink} 0%, ${C.warm} 60%, ${C.brown} 100%)`, minHeight: '92vh'}}>
      <div className="absolute inset-0 grain opacity-50"></div>
      <div className="absolute top-1/2 right-0 w-[700px] h-[700px] -translate-y-1/2 translate-x-1/4 rounded-full opacity-40" style={{background: `radial-gradient(circle, ${C.gold} 0%, transparent 65%)`}}></div>

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <p className="f-mono mb-6 fadeup" style={{color: C.gold}}>◆ IMPORTACIÓN DIRECTA · COLOMBIA</p>
          <h1 className="f-serif text-[5.5rem] md:text-[7.5rem] font-light leading-[0.9] mb-8 fadeup-d1" style={{color: C.pearl}}>
            Esencia
            <br/>
            en cada
            <br/>
            <em className="gold-text font-medium">gota.</em>
          </h1>
          <p className="text-lg leading-relaxed mb-10 max-w-lg fadeup-d2" style={{color: C.mute}}>
            Perfumería árabe auténtica y esencias inspiradas en las casas más prestigiosas del mundo.
            Cada frasco una historia, cada nota una promesa.
          </p>
          <div className="flex flex-wrap gap-4 fadeup-d2">
            <button onClick={() => onCta('all')} className="px-8 py-4 f-mono transition hover:scale-[1.03] flex items-center gap-2" style={{background: C.gold, color: C.brown}}>
              EXPLORAR CATÁLOGO <ArrowRight size={16}/>
            </button>
            <button onClick={() => onCta('arabes')} className="px-8 py-4 f-mono border transition hover:bg-amber-900/30" style={{borderColor: C.gold, color: C.gold}}>
              ÁRABES PREMIUM
            </button>
          </div>
        </div>

        <div className="relative h-[500px] md:h-[650px] hidden md:flex items-center justify-center fadeup-d1">
          <div className="relative w-[400px] h-[500px] float">
            <div className="absolute -inset-20 rounded-full glow-gold opacity-60" style={{background: `radial-gradient(circle, ${C.gold} 0%, transparent 60%)`}}></div>
            <img src="https://nova-import-catalogo.vercel.app/images/products/arabes/khamrah.jpg" alt="Khamrah Lattafa" className="w-full h-full object-contain relative z-10" />
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-t relative z-10" style={{borderColor: C.gold + '20', background: 'rgba(15,7,3,0.6)'}}>
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {icon: Truck, label: 'Envío 24-72h'},
            {icon: Award, label: 'Garantía autenticidad'},
            {icon: Lock, label: 'Pago contra entrega'},
            {icon: MessageCircle, label: 'Asesoría WhatsApp'},
          ].map((it, i) => (
            <div key={i} className="flex items-center gap-3">
              <it.icon size={18} color={C.gold}/>
              <span className="f-mono" style={{color: C.pearl}}>{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// COLLECTION STRIP — Categories with images
// =========================================================================
function CollectionStrip({ products, onNav }) {
  const counts = useMemo(() => ({
    mujer: products.filter(p => p.gender === 'Mujer' || p.gender === 'Femenino').length,
    hombre: products.filter(p => p.gender === 'Hombre' || p.gender === 'Masculino').length,
    unisex: products.filter(p => p.gender === 'Unisex').length,
    arabes: products.filter(p => p.type === 'arabe').length,
    inspirados: products.filter(p => p.type === 'inspirado').length,
  }), [products]);

  const cats = [
    { key: 'mujer', label: 'Femeninos', img: products.find(p => p.gender === 'Mujer' || p.gender === 'Femenino')?.imageUrl },
    { key: 'hombre', label: 'Masculinos', img: products.find(p => p.gender === 'Hombre' || p.gender === 'Masculino')?.imageUrl },
    { key: 'arabes', label: 'Árabes', img: products.find(p => p.type === 'arabe')?.imageUrl },
    { key: 'inspirados', label: 'Esencias inspiradas', img: products.find(p => p.type === 'inspirado')?.imageUrl },
    { key: 'unisex', label: 'Unisex', img: products.find(p => p.gender === 'Unisex')?.imageUrl },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-end justify-between mb-14 gap-6">
        <div>
          <p className="f-mono mb-3" style={{color: C.gold}}>◆ EXPLORA POR CATEGORÍA</p>
          <h2 className="f-serif text-5xl md:text-6xl" style={{color: C.pearl}}>Nuestras <em className="gold-text">colecciones</em></h2>
        </div>
        <button onClick={() => onNav('all')} className="f-mono flex items-center gap-2 h-link" style={{color: C.gold}}>
          VER TODOS LOS PERFUMES <ChevronRight size={14}/>
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cats.map((c, i) => (
          <button
            key={c.key}
            onClick={() => onNav(c.key)}
            className="group relative overflow-hidden aspect-[3/4] transition fadeup"
            style={{animationDelay: `${0.1 * i}s`}}
          >
            <div className="absolute inset-0 z-10" style={{background: `linear-gradient(180deg, transparent 30%, ${C.ink} 95%)`}}></div>
            <img src={c.img} alt={c.label} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
              <h3 className="f-serif text-2xl md:text-3xl mb-1" style={{color: C.pearl}}>{c.label}</h3>
              <p className="f-mono" style={{color: C.gold}}>{counts[c.key]} perfumes</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

// =========================================================================
// PRODUCT CARD
// =========================================================================
function ProductCard({ product, onClick }) {
  const variant100 = product.variants.find(v => v.size === '100ml' && v.tier === 'AA') || product.variants[product.variants.length - 1];
  return (
    <button onClick={onClick} className="group text-left fadeup">
      <div
        className="relative aspect-[3/4] mb-4 overflow-hidden product-card-img-bg"
        style={{ '--cardp': product.color?.accent || C.brown }}
      >
        <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-contain p-6 transition duration-700 group-hover:scale-110" />
        {product.featured && (
          <span className="absolute top-3 left-3 f-mono text-[9px] px-2 py-1" style={{background: C.gold, color: C.brown}}>DESTACADO</span>
        )}
        {product.bestseller && !product.featured && (
          <span className="absolute top-3 left-3 f-mono text-[9px] px-2 py-1 border" style={{borderColor: C.gold, color: C.gold, background: 'rgba(15,7,3,0.7)'}}>BEST SELLER</span>
        )}
      </div>
      <p className="f-mono mb-1" style={{color: C.goldLight}}>{product.brand || product.inspiredBy || 'Inspirado'}</p>
      <h3 className="f-serif text-xl md:text-2xl mb-1 leading-tight" style={{color: C.pearl}}>{product.name}</h3>
      <p className="text-xs mb-3 f-sans" style={{color: C.ash}}>{product.family} · {product.gender}</p>
      <p className="f-sans font-medium" style={{color: C.gold}}>desde {formatPrice(variant100.price)}</p>
    </button>
  );
}

// =========================================================================
// BEST SELLERS
// =========================================================================
function BestSellers({ products, onSelect }) {
  const featured = useMemo(() => {
    const flagged = products.filter(p => p.bestseller || p.featured);
    if (flagged.length >= 8) return flagged.slice(0, 8);
    return [...flagged, ...products.filter(p => !flagged.includes(p))].slice(0, 8);
  }, [products]);

  return (
    <section className="py-24 px-6" style={{background: C.inkSoft}}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="f-mono mb-3" style={{color: C.gold}}>◆ LOS MÁS DESEADOS</p>
          <h2 className="f-serif text-5xl md:text-6xl" style={{color: C.pearl}}>Lo que <em className="gold-text">enamora.</em></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {featured.map(p => <ProductCard key={p.id} product={p} onClick={() => onSelect(p)} />)}
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// EDITORIAL STORY — Brand narrative with large image
// =========================================================================
function EditorialStory({ products }) {
  const hero = products.find(p => p.id === 'bade-al-oud-sublime') || products.find(p => p.type === 'arabe') || products[0];
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 grain opacity-30"></div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="relative h-[500px] md:h-[650px] order-2 md:order-1">
          <div className="absolute -inset-12 rounded-full opacity-40 -z-10" style={{background: `radial-gradient(circle, ${C.gold} 0%, transparent 65%)`}}></div>
          <img src={hero.imageUrl} alt={hero.name} className="w-full h-full object-contain relative z-10" />
          <div className="absolute bottom-0 right-0 p-6 z-20">
            <p className="f-mono mb-1" style={{color: C.gold}}>EN PORTADA</p>
            <p className="f-serif text-2xl italic" style={{color: C.pearl}}>{hero.name}</p>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <p className="f-mono mb-4" style={{color: C.gold}}>◆ LA HISTORIA</p>
          <h2 className="f-serif text-5xl md:text-7xl mb-8 leading-[0.95]" style={{color: C.pearl}}>
            El arte ancestral
            <br/>
            de la <em className="gold-text">perfumería.</em>
          </h2>
          <p className="text-lg leading-relaxed mb-6" style={{color: C.mute}}>
            Importamos directamente desde Dubai. Trabajamos con las casas más reconocidas
            de Oriente Medio — Lattafa, Armaf, Al Haramain, Orientica — y creamos esencias
            que capturan el espíritu de los grandes perfumes occidentales.
          </p>
          <p className="text-lg leading-relaxed mb-10" style={{color: C.mute}}>
            5 tamaños disponibles. 2 calidades. Envíos a toda Colombia en 24-72 horas.
          </p>
          <ul className="space-y-4">
            {[
              {k: 'Frescura garantizada', d: 'Stock rotativo importado mensualmente'},
              {k: 'Asesoría experta', d: 'Te ayudamos a encontrar tu firma aromática'},
              {k: 'Precios sin intermediarios', d: 'Importación directa desde origen'},
              {k: 'Devoluciones sin preguntas', d: '15 días para cambiar de opinión'},
            ].map(item => (
              <li key={item.k} className="flex gap-4">
                <span className="f-serif text-2xl" style={{color: C.gold}}>◆</span>
                <div>
                  <p className="f-sans font-medium" style={{color: C.pearl}}>{item.k}</p>
                  <p className="text-sm" style={{color: C.ash}}>{item.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// FRAGRANCE FAMILIES
// =========================================================================
function FragranceFamilies({ products, onSelectFamily }) {
  const families = useMemo(() => {
    const map = {};
    products.forEach(p => {
      const fam = p.family || 'Otros';
      if (!map[fam]) map[fam] = 0;
      map[fam]++;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 14);
  }, [products]);

  return (
    <section className="py-24 px-6 relative" style={{background: C.warm}}>
      <div className="absolute inset-0 grain opacity-20"></div>
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <p className="f-mono mb-3" style={{color: C.gold}}>◆ FAMILIAS OLFATIVAS</p>
        <h2 className="f-serif text-5xl md:text-6xl mb-4" style={{color: C.pearl}}>Encuentra <em className="gold-text">tu nota.</em></h2>
        <p className="text-lg mb-14 max-w-2xl mx-auto" style={{color: C.mute}}>
          Cada perfume cuenta una historia distinta. Explora por familia olfativa para descubrir aromas afines a tu personalidad.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {families.map(([family, count]) => (
            <button
              key={family}
              onClick={() => onSelectFamily && onSelectFamily(family)}
              className="px-6 py-3 border f-mono transition hover:bg-amber-900/40 hover:scale-105"
              style={{borderColor: C.gold + '50', color: C.pearl}}
            >
              {family} <span style={{color: C.gold}}>· {count}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// TESTIMONIALS
// =========================================================================
function Testimonials() {
  const reviews = [
    {n: 'Camila R.', c: 'Bogotá', t: 'El Khamrah es ESPECTACULAR. Llegó perfecto, súper rápido. Repetiré sin duda.', r: 5},
    {n: 'Andrés M.', c: 'Medellín', t: 'Pedí el inspirado de Sauvage y honestamente no le encuentro diferencia. Increíble proyección.', r: 5},
    {n: 'Luisa F.', c: 'Cali', t: 'La asesoría por WhatsApp es genial. Me ayudaron a escoger un Lattafa que me encantó.', r: 5},
  ];
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <p className="f-mono mb-3" style={{color: C.gold}}>◆ TESTIMONIOS</p>
        <h2 className="f-serif text-5xl md:text-6xl" style={{color: C.pearl}}>Quienes <em className="gold-text">ya viven Ámbar.</em></h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <div key={i} className="p-8 border" style={{borderColor: C.gold + '30', background: C.inkSoft}}>
            <div className="flex gap-1 mb-4">
              {[...Array(r.r)].map((_, k) => <Star key={k} size={14} fill={C.gold} color={C.gold}/>)}
            </div>
            <p className="f-serif text-xl italic mb-6 leading-relaxed" style={{color: C.pearl}}>"{r.t}"</p>
            <p className="f-mono" style={{color: C.gold}}>{r.n}</p>
            <p className="text-xs" style={{color: C.ash}}>{r.c}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// =========================================================================
// CTA BLOCK
// =========================================================================
function CtaBlock() {
  return (
    <section className="py-32 px-6 text-center relative overflow-hidden" style={{background: `linear-gradient(135deg, ${C.warm} 0%, ${C.brownMid} 100%)`}}>
      <div className="absolute inset-0 grain opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-30" style={{background: `radial-gradient(circle, ${C.gold} 0%, transparent 70%)`}}></div>
      <div className="max-w-3xl mx-auto relative z-10">
        <p className="f-mono mb-4" style={{color: C.gold}}>◆ HABLEMOS DIRECTO</p>
        <h2 className="f-serif text-5xl md:text-7xl mb-8 leading-[0.95]" style={{color: C.pearl}}>
          ¿Necesitas <em className="gold-text">consejo</em>?
        </h2>
        <p className="text-lg mb-12 max-w-xl mx-auto" style={{color: C.mute}}>
          Te ayudamos a encontrar el perfume perfecto para ti o para regalar.
          Asesoría personalizada, sin compromiso.
        </p>
        <a href={buildWA()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-12 py-5 f-mono hover:scale-105 transition" style={{background: C.gold, color: C.brown}}>
          <MessageCircle size={18}/> ESCRÍBENOS POR WHATSAPP
        </a>
      </div>
    </section>
  );
}

// =========================================================================
// CATALOG VIEW
// =========================================================================
function CatalogView({ products, filter, onSelect }) {
  const filtered = useMemo(() => {
    if (filter === 'mujer') return products.filter(p => p.gender === 'Mujer' || p.gender === 'Femenino');
    if (filter === 'hombre') return products.filter(p => p.gender === 'Hombre' || p.gender === 'Masculino');
    if (filter === 'unisex') return products.filter(p => p.gender === 'Unisex');
    if (filter === 'arabes') return products.filter(p => p.type === 'arabe');
    if (filter === 'inspirados') return products.filter(p => p.type === 'inspirado');
    return products;
  }, [products, filter]);

  const titles = {
    all: { kicker: 'TODOS LOS PERFUMES', title: 'Catálogo completo' },
    mujer: { kicker: 'FEMENINOS', title: 'Para ella' },
    hombre: { kicker: 'MASCULINOS', title: 'Para él' },
    unisex: { kicker: 'UNISEX', title: 'Sin género' },
    arabes: { kicker: 'ÁRABES PREMIUM', title: 'Importación Oriente Medio' },
    inspirados: { kicker: 'ESENCIAS INSPIRADAS', title: 'Inspirados en los grandes' },
  };
  const meta = titles[filter] || titles.all;

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12 text-center">
        <p className="f-mono mb-3" style={{color: C.gold}}>◆ {meta.kicker}</p>
        <h1 className="f-serif text-5xl md:text-6xl mb-3" style={{color: C.pearl}}>{meta.title}</h1>
        <p className="f-sans" style={{color: C.ash}}>{filtered.length} perfumes</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {filtered.map(p => <ProductCard key={p.id} product={p} onClick={() => onSelect(p)} />)}
      </div>
    </section>
  );
}

// =========================================================================
// PRODUCT DETAIL MODAL
// =========================================================================
function ProductDetail({ product, onClose, onAddToCart }) {
  const initialVariant = product.variants.find(v => v.size === '100ml' && v.tier === 'AA') || product.variants[0];
  const [variant, setVariant] = useState(initialVariant);

  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{background: 'rgba(15,7,3,0.97)', backdropFilter: 'blur(10px)'}}>
      <div className="max-w-7xl mx-auto p-6 md:p-12">
        <button onClick={onClose} className="mb-8 f-mono flex items-center gap-2 h-link" style={{color: C.gold}}>
          ← VOLVER
        </button>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="aspect-square relative product-card-img-bg" style={{'--cardp': product.color?.accent || C.brown}}>
            <div className="absolute -inset-8 rounded-full opacity-30 -z-10" style={{background: `radial-gradient(circle, ${C.gold} 0%, transparent 70%)`}}></div>
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain p-8 relative z-10" />
          </div>

          <div>
            <p className="f-mono mb-2" style={{color: C.gold}}>{product.brand || product.inspiredBy} · {product.family}</p>
            <h1 className="f-serif text-5xl md:text-7xl mb-3 leading-[0.95]" style={{color: C.pearl}}>{product.name}</h1>
            <p className="f-sans text-sm mb-6" style={{color: C.ash}}>{product.gender}</p>

            <p className="text-lg leading-relaxed mb-8" style={{color: C.mute}}>{product.description}</p>

            <div className="mb-8 pb-8 border-b" style={{borderColor: C.gold + '25'}}>
              <p className="f-mono text-xs mb-3" style={{color: C.gold}}>NOTAS OLFATIVAS</p>
              <p className="f-serif text-xl italic leading-relaxed" style={{color: C.pearl}}>{product.notes}</p>
            </div>

            <div className="mb-8">
              <p className="f-mono text-xs mb-4" style={{color: C.gold}}>SELECCIONA TAMAÑO Y CALIDAD</p>
              <div className="grid grid-cols-3 gap-2">
                {product.variants.map((v, i) => {
                  const selected = variant.size === v.size && variant.tier === v.tier;
                  return (
                    <button
                      key={i}
                      onClick={() => setVariant(v)}
                      className="p-3 border text-center transition"
                      style={{
                        borderColor: selected ? C.gold : C.gold + '30',
                        background: selected ? C.gold + '20' : 'transparent',
                        color: C.pearl,
                      }}
                    >
                      <p className="f-sans font-medium text-base">{v.size}</p>
                      <p className="text-[10px] opacity-60">{v.tier}</p>
                      <p className="f-mono mt-2" style={{color: C.gold}}>{formatPrice(v.price)}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3 mb-3">
              <button onClick={() => onAddToCart(product, variant)} className="flex-1 py-4 f-mono transition hover:scale-[1.02]" style={{background: C.gold, color: C.brown}}>
                AGREGAR AL CARRITO
              </button>
              <a href={buildWA(product)} target="_blank" rel="noopener noreferrer" className="px-5 py-4 f-mono border flex items-center gap-2 transition hover:bg-amber-900/30" style={{borderColor: C.gold, color: C.gold}}>
                <MessageCircle size={16}/>
              </a>
            </div>
            <a href={getShopifyUrl(product)} target="_blank" rel="noopener noreferrer" className="block text-center f-mono py-3 h-link" style={{color: C.gold}}>
              VER EN NUESTRA TIENDA SHOPIFY →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// CART DRAWER
// =========================================================================
function CartDrawer({ open, onClose, cart, onRemove, onCheckout }) {
  if (!open) return null;
  const total = cart.reduce((sum, item) => sum + item.variant.price * item.qty, 0);
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0" style={{background: 'rgba(15,7,3,0.8)', backdropFilter: 'blur(4px)'}}/>
      <div className="relative w-full max-w-md p-8 overflow-y-auto" style={{background: C.inkSoft, borderLeft: `1px solid ${C.gold}30`}} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="f-serif text-3xl" style={{color: C.pearl}}>Tu selección</h2>
          <button onClick={onClose}><X size={22} color={C.gold}/></button>
        </div>
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p style={{color: C.ash}}>Aún no agregas perfumes.</p>
          </div>
        ) : (
          <>
            <div className="space-y-5 mb-8">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-4 pb-5 border-b" style={{borderColor: C.gold + '20'}}>
                  <div className="w-20 h-20 flex-shrink-0 product-card-img-bg" style={{'--cardp': item.product.color?.accent || C.brown}}>
                    <img src={item.product.imageUrl} alt="" className="w-full h-full object-contain p-2" />
                  </div>
                  <div className="flex-1">
                    <p className="f-mono text-[10px]" style={{color: C.goldLight}}>{item.product.brand || item.product.inspiredBy}</p>
                    <p className="f-serif text-lg leading-tight" style={{color: C.pearl}}>{item.product.name}</p>
                    <p className="text-xs my-1" style={{color: C.ash}}>{item.variant.size} · {item.variant.tier}</p>
                    <p className="f-sans font-medium" style={{color: C.gold}}>{formatPrice(item.variant.price * item.qty)}</p>
                  </div>
                  <button onClick={() => onRemove(i)} className="self-start" style={{color: C.ash}}>
                    <X size={18}/>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-baseline mb-6 pb-6 border-t pt-6" style={{borderColor: C.gold + '30'}}>
              <span className="f-mono" style={{color: C.pearl}}>TOTAL</span>
              <span className="f-serif text-3xl" style={{color: C.gold}}>{formatPrice(total)}</span>
            </div>
            <button onClick={onCheckout} className="w-full py-4 f-mono transition hover:scale-[1.02] flex items-center justify-center gap-2" style={{background: C.gold, color: C.brown}}>
              <MessageCircle size={16}/> CHECKOUT POR WHATSAPP
            </button>
            <p className="text-center mt-4 text-xs" style={{color: C.ash}}>Coordinamos pago contra entrega o por Nequi</p>
          </>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// FOOTER
// =========================================================================
function Footer({ onNav }) {
  return (
    <footer className="pt-24 pb-10 px-6 relative" style={{background: C.ink, borderTop: `1px solid ${C.gold}25`}}>
      <div className="absolute inset-0 grain opacity-20"></div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16 relative z-10">
        <div className="md:col-span-1">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="f-serif text-3xl italic" style={{color: C.pearl}}>Á</span>
            <span className="f-display text-2xl gold-text">MBAR</span>
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{color: C.ash}}>
            Perfumería árabe e inspirada premium.
            Importación directa Colombia.
          </p>
          <div className="flex gap-3">
            <a href={buildWA()} target="_blank" rel="noopener noreferrer" className="p-2 border" style={{borderColor: C.gold + '40', color: C.gold}}>
              <MessageCircle size={16}/>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="p-2 border" style={{borderColor: C.gold + '40', color: C.gold}}>
              <Instagram size={16}/>
            </a>
          </div>
        </div>
        <div>
          <h4 className="f-mono mb-5" style={{color: C.gold}}>CATEGORÍAS</h4>
          <ul className="space-y-3 text-sm" style={{color: C.pearl}}>
            <li><button onClick={() => onNav('mujer')} className="h-link">Femeninos</button></li>
            <li><button onClick={() => onNav('hombre')} className="h-link">Masculinos</button></li>
            <li><button onClick={() => onNav('unisex')} className="h-link">Unisex</button></li>
            <li><button onClick={() => onNav('arabes')} className="h-link">Árabes premium</button></li>
            <li><button onClick={() => onNav('inspirados')} className="h-link">Esencias inspiradas</button></li>
          </ul>
        </div>
        <div>
          <h4 className="f-mono mb-5" style={{color: C.gold}}>AYUDA</h4>
          <ul className="space-y-3 text-sm" style={{color: C.pearl}}>
            <li>Envíos 24-72h</li>
            <li>Garantía autenticidad</li>
            <li>Pago contra entrega</li>
            <li>Cambios y devoluciones</li>
            <li>Política de privacidad</li>
          </ul>
        </div>
        <div>
          <h4 className="f-mono mb-5" style={{color: C.gold}}>CONTACTO</h4>
          <ul className="space-y-3 text-sm" style={{color: C.pearl}}>
            <li className="flex items-center gap-2"><Phone size={14} color={C.gold}/> 317 364 1851</li>
            <li className="flex items-center gap-2"><Mail size={14} color={C.gold}/> hola@ambarperfumeria.co</li>
            <li className="flex items-center gap-2"><MapPin size={14} color={C.gold}/> Bogotá, Colombia</li>
          </ul>
        </div>
      </div>
      <div className="text-center pt-8 border-t flex flex-wrap justify-between gap-3" style={{borderColor: C.gold + '20', color: C.ash}}>
        <p className="f-mono">© 2026 ÁMBAR PERFUMERÍA · TODOS LOS DERECHOS RESERVADOS</p>
        <p className="f-mono">DISEÑO · IMPORTACIÓN · COLOMBIA</p>
      </div>
    </footer>
  );
}

// =========================================================================
// MAIN APP
// =========================================================================
export default function App() {
  const [view, setView] = useState('home');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const nav = (v, f) => {
    setView(v);
    if (f) setFilter(f);
    setSelected(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product, variant) => {
    setCart(c => [...c, { product, variant, qty: 1 }]);
    setCartOpen(true);
    setSelected(null);
  };

  const removeFromCart = (i) => setCart(c => c.filter((_, j) => j !== i));

  const checkoutWA = () => {
    const lines = cart.map(i => `• ${i.product.name} (${i.variant.size} ${i.variant.tier}) — ${formatPrice(i.variant.price * i.qty)}`).join('\n');
    const total = cart.reduce((s, i) => s + i.variant.price * i.qty, 0);
    const text = `Hola Ámbar Perfumería, quiero confirmar este pedido:\n\n${lines}\n\nTotal: ${formatPrice(total)}\n\n¿Cómo coordinamos el envío?`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen" style={{background: C.ink, color: C.pearl}}>
      <Fonts />
      <PromoMarquee />
      <Header onNav={nav} currentFilter={filter} currentView={view} cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      {view === 'home' && (
        <>
          <Hero onCta={(target) => nav('catalog', target)} />
          <CollectionStrip products={PRODUCTS} onNav={(c) => nav('catalog', c)} />
          <BestSellers products={PRODUCTS} onSelect={setSelected} />
          <EditorialStory products={PRODUCTS} />
          <FragranceFamilies products={PRODUCTS} />
          <Testimonials />
          <CtaBlock />
        </>
      )}

      {view === 'catalog' && (
        <CatalogView products={PRODUCTS} filter={filter} onSelect={setSelected} />
      )}

      {selected && <ProductDetail product={selected} onClose={() => setSelected(null)} onAddToCart={addToCart} />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onRemove={removeFromCart} onCheckout={checkoutWA} />

      <Footer onNav={(c) => nav('catalog', c)} />

      {/* Floating WhatsApp */}
      <a href={buildWA()} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-30 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition hover:scale-110" style={{background: '#25D366'}} title="Chatear por WhatsApp">
        <MessageCircle size={24} color="white"/>
      </a>
    </div>
  );
}
