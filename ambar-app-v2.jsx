import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, X, MessageCircle, Menu, ChevronDown, Plus, Minus, ArrowRight, Truck, Award, Shield, MapPin, Mail, Phone, Instagram } from 'lucide-react';

// =========================================================================
// ÁMBAR PERFUMERÍA — Design tokens (v2)
// =========================================================================
const C = {
  ink: '#0E0703',
  inkSoft: '#1A0F08',
  brown: '#241509',
  brownMid: '#3A2516',
  gold: '#C9A961',
  goldLight: '#E5C879',
  goldDeep: '#8B6F2B',
  cream: '#F5EDD8',
  pearl: '#FAF4E1',
  ash: '#8C7E62',
  mute: '#B8AC8E',
};

const WA_NUMBER = '573173641851';
const SHOPIFY_BASE = 'https://nova-import-7.myshopify.com';

const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap');
    .f-serif { font-family: 'Cormorant Garamond', serif; }
    .f-sans { font-family: 'Inter', sans-serif; }
    .f-kicker {
      font-family: 'Inter', sans-serif;
      font-size: 0.7rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 600;
    }
    .f-eyebrow {
      font-family: 'Inter', sans-serif;
      font-size: 0.78rem;
      letter-spacing: 0.06em;
      font-weight: 500;
    }
    body { background: ${C.ink}; color: ${C.pearl}; margin: 0; }
    * { box-sizing: border-box; }

    @keyframes fadeup { from {opacity:0; transform:translateY(16px)} to {opacity:1; transform:none} }
    .fadeup { animation: fadeup 0.7s ease-out both; }
    .fadeup-d1 { animation: fadeup 0.7s 0.1s ease-out both; }
    .fadeup-d2 { animation: fadeup 0.7s 0.2s ease-out both; }

    @keyframes shimmer { 0% {background-position: -200% 0} 100% {background-position: 200% 0} }
    .gold-text {
      background: linear-gradient(90deg, ${C.goldDeep}, ${C.goldLight}, ${C.goldDeep});
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 8s linear infinite;
    }

    @keyframes scrollx { from {transform: translateX(0)} to {transform: translateX(-50%)} }
    .marquee { animation: scrollx 50s linear infinite; }

    .grain { background-image: radial-gradient(rgba(201,169,97,0.04) 1px, transparent 1px); background-size: 6px 6px; }
    .glow { box-shadow: 0 0 120px rgba(201,169,97,0.22); }

    .link-uline { position: relative; }
    .link-uline::after { content: ''; position: absolute; left: 0; bottom: -3px; width: 0; height: 1px; background: ${C.gold}; transition: width 0.3s ease; }
    .link-uline:hover::after { width: 100%; }

    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: ${C.inkSoft}; }
    ::-webkit-scrollbar-thumb { background: ${C.goldDeep}; border-radius: 4px; }

    @keyframes float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
    .float { animation: float 7s ease-in-out infinite; }

    /* Fluid responsive headings */
    .hero-title { font-size: clamp(3rem, 9vw, 6rem); line-height: 0.95; }
    .section-title { font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.05; }
    .story-title { font-size: clamp(2.25rem, 5vw, 4rem); line-height: 1; }

    /* Button utility classes */
    .btn-primary {
      display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
      padding: 0.875rem 1.75rem;
      background: ${C.gold}; color: ${C.brown};
      font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.875rem;
      letter-spacing: 0.02em;
      transition: all 0.25s ease;
      border: 1px solid ${C.gold};
    }
    .btn-primary:hover { background: ${C.goldLight}; border-color: ${C.goldLight}; transform: translateY(-1px); }

    .btn-secondary {
      display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
      padding: 0.875rem 1.75rem;
      background: transparent; color: ${C.goldLight};
      font-family: 'Inter', sans-serif; font-weight: 500; font-size: 0.875rem;
      letter-spacing: 0.02em;
      transition: all 0.25s ease;
      border: 1px solid rgba(201,169,97,0.4);
    }
    .btn-secondary:hover { border-color: ${C.gold}; background: rgba(201,169,97,0.08); color: ${C.cream}; }

    .btn-ghost {
      display: inline-flex; align-items: center; gap: 0.4rem;
      font-family: 'Inter', sans-serif; font-weight: 500; font-size: 0.85rem;
      color: ${C.goldLight}; transition: color 0.2s;
    }
    .btn-ghost:hover { color: ${C.cream}; }
  `}</style>
);

const PRODUCTS = [/* INJECT_PRODUCTS_HERE */];

const formatPrice = (n) => '$' + n.toLocaleString('es-CO');
const getShopifyUrl = (p) => `${SHOPIFY_BASE}/products/${p.id}`;
const buildWA = (perfume) => {
  const text = perfume
    ? `Hola Ámbar, me interesa ${perfume.name}. ¿Disponible?`
    : 'Hola Ámbar, quisiera asesoría para escoger un perfume.';
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
};

// =========================================================================
// PROMO BAR — bigger, more readable
// =========================================================================
function PromoBar() {
  const items = [
    'Envío gratis desde $150.000',
    'Pago contra entrega',
    'Marcas árabes 100% originales',
    'Garantía de autenticidad',
  ];
  return (
    <div className="overflow-hidden py-2" style={{background: C.inkSoft, borderBottom: `1px solid ${C.gold}1A`}}>
      <div className="flex marquee whitespace-nowrap" style={{gap: '3rem'}}>
        {[...items, ...items, ...items, ...items].map((it, i) => (
          <span key={i} className="f-sans flex items-center gap-3" style={{color: C.mute, fontSize: '0.78rem'}}>
            <span style={{color: C.gold}}>◆</span> {it}
          </span>
        ))}
      </div>
    </div>
  );
}

// =========================================================================
// HEADER — clean logo, less items
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
  const active = (k) => currentView === 'catalog' && currentFilter === k;
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md" style={{background: 'rgba(14,7,3,0.92)', borderBottom: `1px solid ${C.gold}1F`}}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-4">
        <button onClick={() => onNav('home')} className="flex items-center" aria-label="Ámbar Perfumería">
          <span className="f-serif text-3xl md:text-4xl italic font-medium tracking-tight" style={{color: C.cream}}>
            Á<span className="gold-text">mbar</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map(n => (
            <button
              key={n.key}
              onClick={() => onNav('catalog', n.key)}
              className="f-sans link-uline transition"
              style={{fontSize: '0.85rem', fontWeight: active(n.key) ? 600 : 400, color: active(n.key) ? C.gold : C.pearl}}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={buildWA()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 f-sans"
            style={{fontSize: '0.82rem', color: C.goldLight, fontWeight: 500}}
            title="Asesoría por WhatsApp"
          >
            <MessageCircle size={16}/> <span>Asesoría</span>
          </a>
          <button onClick={onCartOpen} className="relative p-2.5 rounded transition hover:bg-white/5" aria-label="Carrito">
            <ShoppingBag size={20} color={C.gold} strokeWidth={1.5}/>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 text-[10px] w-4.5 h-4.5 min-w-4 px-1 flex items-center justify-center rounded-full font-bold" style={{background: C.gold, color: C.brown}}>{cartCount}</span>
            )}
          </button>
          <button className="lg:hidden p-2.5" onClick={() => setMobileOpen(o => !o)} aria-label="Menú">
            {mobileOpen ? <X size={20} color={C.gold} strokeWidth={1.5}/> : <Menu size={20} color={C.gold} strokeWidth={1.5}/>}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden px-5 pb-6 flex flex-col gap-1 border-t" style={{borderColor: C.gold + '15'}}>
          {navItems.map(n => (
            <button
              key={n.key}
              onClick={() => { onNav('catalog', n.key); setMobileOpen(false); }}
              className="f-sans text-left py-3 transition"
              style={{fontSize: '0.95rem', fontWeight: active(n.key) ? 600 : 400, color: active(n.key) ? C.gold : C.pearl}}
            >
              {n.label}
            </button>
          ))}
          <a href={buildWA()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-3 mt-2 f-sans" style={{color: C.goldLight, fontSize: '0.95rem'}}>
            <MessageCircle size={16}/> Asesoría por WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}

// =========================================================================
// HERO — controlled, single style headline
// =========================================================================
function Hero({ onCta }) {
  return (
    <section className="relative overflow-hidden" style={{background: `linear-gradient(135deg, ${C.ink} 0%, ${C.brown} 100%)`}}>
      <div className="absolute inset-0 grain opacity-40"></div>
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/3 rounded-full opacity-35 pointer-events-none" style={{background: `radial-gradient(circle, ${C.gold} 0%, transparent 65%)`}}></div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24 lg:py-28 grid md:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
        <div>
          <p className="f-kicker mb-5 fadeup" style={{color: C.gold}}>Importación directa · Colombia</p>
          <h1 className="f-serif hero-title font-medium mb-6 fadeup-d1" style={{color: C.cream}}>
            <span>Esencia</span><br/>
            <span>en cada </span>
            <em className="gold-text italic">gota.</em>
          </h1>
          <p className="f-sans text-base md:text-lg leading-relaxed mb-8 max-w-md fadeup-d2" style={{color: C.mute, lineHeight: 1.65}}>
            Perfumería árabe auténtica y esencias inspiradas en las casas más prestigiosas del mundo.
          </p>
          <div className="flex flex-wrap gap-3 fadeup-d2">
            <button onClick={() => onCta('all')} className="btn-primary">
              Explorar catálogo <ArrowRight size={16}/>
            </button>
            <button onClick={() => onCta('arabes')} className="btn-secondary">
              Ver árabes premium
            </button>
          </div>
        </div>

        <div className="relative h-[380px] md:h-[520px] hidden md:flex items-center justify-center fadeup-d1">
          <div className="relative w-[340px] h-[440px] float">
            <div className="absolute -inset-16 rounded-full glow opacity-60 pointer-events-none" style={{background: `radial-gradient(circle, ${C.gold} 0%, transparent 60%)`}}></div>
            <img src="https://nova-import-catalogo.vercel.app/images/products/arabes/khamrah.jpg" alt="Khamrah Lattafa" className="w-full h-full object-contain relative z-10" />
          </div>
        </div>
      </div>

      {/* Trust strip — better mobile */}
      <div className="relative z-10" style={{borderTop: `1px solid ${C.gold}18`, background: 'rgba(14,7,3,0.6)'}}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 md:py-5 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {[
            {icon: Truck, label: 'Envío 24-72h'},
            {icon: Award, label: 'Garantía autenticidad'},
            {icon: Shield, label: 'Pago contra entrega'},
            {icon: MessageCircle, label: 'Asesoría WhatsApp'},
          ].map((it, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <it.icon size={16} color={C.gold} strokeWidth={1.5}/>
              <span className="f-sans" style={{fontSize: '0.8rem', color: C.cream}}>{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// COLLECTION STRIP — center title, cleaner kicker
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
    <section className="py-20 md:py-28 px-5 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12 md:mb-14">
        <p className="f-eyebrow mb-3" style={{color: C.gold}}>Explora por categoría</p>
        <h2 className="f-serif section-title" style={{color: C.cream}}>
          Nuestras <em className="gold-text italic">colecciones</em>
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {cats.map((c, i) => (
          <button
            key={c.key}
            onClick={() => onNav(c.key)}
            className="group relative overflow-hidden aspect-[4/5] transition fadeup"
            style={{animationDelay: `${0.06 * i}s`}}
          >
            <div className="absolute inset-0 z-10" style={{background: `linear-gradient(180deg, transparent 35%, ${C.ink} 95%)`}}></div>
            <img src={c.img} alt={c.label} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 md:p-5">
              <h3 className="f-serif text-xl md:text-2xl mb-1" style={{color: C.cream}}>{c.label}</h3>
              <p className="f-sans" style={{fontSize: '0.75rem', color: C.goldLight, letterSpacing: '0.04em'}}>{counts[c.key]} perfumes</p>
            </div>
          </button>
        ))}
      </div>
      <div className="text-center mt-10">
        <button onClick={() => onNav('all')} className="btn-secondary">
          Ver todos los perfumes <ArrowRight size={14}/>
        </button>
      </div>
    </section>
  );
}

// =========================================================================
// PRODUCT CARD — simplified, no halo
// =========================================================================
function ProductCard({ product, onClick }) {
  const variant100 = product.variants.find(v => v.size === '100ml' && v.tier === 'AA') || product.variants[product.variants.length - 1];
  return (
    <button onClick={onClick} className="group text-left fadeup w-full">
      <div className="relative aspect-[4/5] mb-3 md:mb-4 overflow-hidden" style={{background: C.inkSoft}}>
        <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105" />
        {(product.featured || product.bestseller) && (
          <span className="absolute top-3 left-3 f-sans" style={{
            fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
            background: product.featured ? C.gold : 'rgba(14,7,3,0.7)',
            color: product.featured ? C.brown : C.goldLight,
            padding: '0.3rem 0.55rem',
            border: product.featured ? 'none' : `1px solid ${C.gold}`,
          }}>{product.featured ? 'Destacado' : 'Best seller'}</span>
        )}
      </div>
      <p className="f-eyebrow mb-1" style={{color: C.goldLight, fontSize: '0.7rem'}}>{product.brand || product.inspiredBy || 'Inspirado'}</p>
      <h3 className="f-serif text-lg md:text-xl mb-1 leading-tight" style={{color: C.cream}}>{product.name}</h3>
      <p className="f-sans mb-2" style={{fontSize: '0.75rem', color: C.ash}}>{product.family}</p>
      <p className="f-sans font-semibold" style={{fontSize: '0.9rem', color: C.goldLight}}>desde {formatPrice(variant100.price)}</p>
    </button>
  );
}

// =========================================================================
// BEST SELLERS — center align
// =========================================================================
function BestSellers({ products, onSelect }) {
  const featured = useMemo(() => {
    const flagged = products.filter(p => p.bestseller || p.featured);
    if (flagged.length >= 8) return flagged.slice(0, 8);
    return [...flagged, ...products.filter(p => !flagged.includes(p))].slice(0, 8);
  }, [products]);

  return (
    <section className="py-20 md:py-28 px-5 md:px-8" style={{background: C.inkSoft}}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-14">
          <p className="f-eyebrow mb-3" style={{color: C.gold}}>Los más deseados</p>
          <h2 className="f-serif section-title" style={{color: C.cream}}>
            Lo que <em className="gold-text italic">enamora</em>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
          {featured.map(p => <ProductCard key={p.id} product={p} onClick={() => onSelect(p)} />)}
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// EDITORIAL STORY — slimmer copy
// =========================================================================
function EditorialStory({ products }) {
  const hero = products.find(p => p.id === 'bade-al-oud-sublime') || products.find(p => p.type === 'arabe') || products[0];
  return (
    <section className="py-20 md:py-28 px-5 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 grain opacity-30"></div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
        <div className="relative h-[380px] md:h-[560px] order-2 md:order-1">
          <div className="absolute -inset-10 rounded-full opacity-35 -z-10 pointer-events-none" style={{background: `radial-gradient(circle, ${C.gold} 0%, transparent 65%)`}}></div>
          <img src={hero.imageUrl} alt={hero.name} className="w-full h-full object-contain relative z-10" />
        </div>
        <div className="order-1 md:order-2">
          <p className="f-eyebrow mb-3" style={{color: C.gold}}>La historia</p>
          <h2 className="f-serif story-title mb-6" style={{color: C.cream}}>
            Importación directa
            <br/>desde <em className="gold-text italic">Dubái.</em>
          </h2>
          <p className="f-sans text-base md:text-lg mb-8" style={{color: C.mute, lineHeight: 1.7}}>
            Trabajamos con las casas más reconocidas de Oriente Medio — Lattafa, Armaf, Al Haramain, Orientica —
            y creamos esencias inspiradas en los grandes perfumes occidentales.
          </p>
          <ul className="space-y-4 max-w-md">
            {[
              {icon: Truck, k: 'Envíos rápidos', d: 'Llega a toda Colombia en 24-72h'},
              {icon: Award, k: 'Frescura garantizada', d: 'Stock rotativo importado mensualmente'},
              {icon: MessageCircle, k: 'Asesoría sin compromiso', d: 'Te ayudamos a encontrar tu firma aromática'},
            ].map(item => (
              <li key={item.k} className="flex gap-3 items-start">
                <item.icon size={18} color={C.gold} strokeWidth={1.5} className="mt-0.5 flex-shrink-0"/>
                <div>
                  <p className="f-sans font-semibold" style={{color: C.cream, fontSize: '0.95rem'}}>{item.k}</p>
                  <p className="f-sans" style={{color: C.mute, fontSize: '0.85rem', lineHeight: 1.5}}>{item.d}</p>
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
// FRAGRANCE FAMILIES — top 8 only, better layout
// =========================================================================
function FragranceFamilies({ products }) {
  const families = useMemo(() => {
    const map = {};
    products.forEach(p => {
      const fam = p.family || 'Otros';
      if (!map[fam]) map[fam] = 0;
      map[fam]++;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [products]);

  return (
    <section className="py-20 md:py-28 px-5 md:px-8 relative" style={{background: C.inkSoft}}>
      <div className="absolute inset-0 grain opacity-25"></div>
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <p className="f-eyebrow mb-3" style={{color: C.gold}}>Familias olfativas</p>
        <h2 className="f-serif section-title mb-4" style={{color: C.cream}}>
          Encuentra <em className="gold-text italic">tu nota</em>
        </h2>
        <p className="f-sans text-base mb-10 max-w-xl mx-auto" style={{color: C.mute, lineHeight: 1.65}}>
          Cada perfume cuenta una historia distinta. Estas son las familias más populares de nuestra colección.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {families.map(([family, count]) => (
            <div
              key={family}
              className="p-4 border transition hover:scale-105"
              style={{borderColor: C.gold + '35', background: C.brown + '60'}}
            >
              <p className="f-serif text-lg" style={{color: C.cream}}>{family}</p>
              <p className="f-sans mt-1" style={{fontSize: '0.75rem', color: C.goldLight}}>{count} perfumes</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// FAQ — replaces fake testimonials
// =========================================================================
function FaqAccordion() {
  const faqs = [
    {
      q: '¿Los perfumes son originales?',
      a: 'Los árabes (Lattafa, Armaf, Al Haramain, Orientica, Bharara) son 100% originales importados directamente desde Dubái. Las esencias inspiradas son fragancias del mismo perfil olfativo que las grandes casas (Dior, Chanel, Hugo Boss, etc.) — no son falsificaciones, son reinterpretaciones.',
    },
    {
      q: '¿Cuánto tarda el envío?',
      a: 'Entre 24 y 72 horas hábiles a las principales ciudades. Envío gratis a partir de $150.000. Pago contra entrega disponible en Bogotá, Medellín, Cali, Barranquilla y otras ciudades principales.',
    },
    {
      q: '¿Qué pasa si no me gusta el perfume?',
      a: 'Tienes 15 días para cambiarlo o solicitar reembolso. La fragancia debe llegar en buen estado y con el sello sin abrir si quieres reembolso completo.',
    },
    {
      q: '¿Cómo elijo el perfume correcto?',
      a: 'Te ayudamos por WhatsApp. Escríbenos contándonos qué tipo de aromas te gustan o cuál es tu fragancia favorita actual, y te recomendamos las opciones más afines.',
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="py-20 md:py-28 px-5 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="f-eyebrow mb-3" style={{color: C.gold}}>Preguntas frecuentes</p>
          <h2 className="f-serif section-title" style={{color: C.cream}}>
            Lo que <em className="gold-text italic">quieres saber</em>
          </h2>
        </div>
        <div className="divide-y" style={{borderColor: C.gold + '22'}}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="py-5 md:py-6" style={{borderTop: i === 0 ? `1px solid ${C.gold}22` : 'none', borderBottom: `1px solid ${C.gold}22`}}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex items-center justify-between w-full text-left gap-4">
                  <span className="f-serif text-xl md:text-2xl" style={{color: C.cream}}>{f.q}</span>
                  <span className="flex-shrink-0 transition" style={{transform: isOpen ? 'rotate(180deg)' : 'none'}}>
                    <ChevronDown size={20} color={C.gold} strokeWidth={1.5}/>
                  </span>
                </button>
                {isOpen && (
                  <p className="f-sans mt-3 fadeup" style={{color: C.mute, lineHeight: 1.7, fontSize: '0.95rem'}}>{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// CTA — softer, less dominant
// =========================================================================
function CtaBlock() {
  return (
    <section className="py-20 md:py-24 px-5 md:px-8 relative overflow-hidden" style={{background: `linear-gradient(135deg, ${C.brown} 0%, ${C.brownMid} 100%)`}}>
      <div className="absolute inset-0 grain opacity-25"></div>
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <p className="f-eyebrow mb-3" style={{color: C.gold}}>Hablemos</p>
        <h2 className="f-serif story-title mb-5" style={{color: C.cream}}>
          ¿Necesitas <em className="gold-text italic">consejo</em>?
        </h2>
        <p className="f-sans text-base md:text-lg mb-8 max-w-xl mx-auto" style={{color: C.mute, lineHeight: 1.7}}>
          Te ayudamos a encontrar el perfume perfecto para ti o para regalar.
        </p>
        <a href={buildWA()} target="_blank" rel="noopener noreferrer" className="btn-primary">
          <MessageCircle size={16}/> Escríbenos por WhatsApp
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
    all: { kicker: 'Catálogo completo', title: 'Todos los perfumes' },
    mujer: { kicker: 'Femeninos', title: 'Para ella' },
    hombre: { kicker: 'Masculinos', title: 'Para él' },
    unisex: { kicker: 'Unisex', title: 'Sin género' },
    arabes: { kicker: 'Árabes premium', title: 'Importación Oriente Medio' },
    inspirados: { kicker: 'Esencias inspiradas', title: 'Inspirados en los grandes' },
  };
  const meta = titles[filter] || titles.all;

  return (
    <section className="py-12 md:py-16 px-5 md:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10 md:mb-14 text-center">
        <p className="f-eyebrow mb-3" style={{color: C.gold}}>{meta.kicker}</p>
        <h1 className="f-serif section-title mb-3" style={{color: C.cream}}>{meta.title}</h1>
        <p className="f-sans" style={{color: C.ash, fontSize: '0.85rem'}}>{filtered.length} perfumes</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
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
  const [qty, setQty] = useState(1);

  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{background: 'rgba(14,7,3,0.97)', backdropFilter: 'blur(10px)'}}>
      <div className="max-w-7xl mx-auto p-5 md:p-10">
        <button onClick={onClose} className="btn-ghost mb-6">
          ← Volver
        </button>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="aspect-[4/5] relative overflow-hidden" style={{background: C.inkSoft}}>
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div>
            <p className="f-eyebrow mb-2" style={{color: C.gold}}>{product.brand || product.inspiredBy} · {product.family}</p>
            <h1 className="f-serif story-title mb-2" style={{color: C.cream}}>{product.name}</h1>
            <p className="f-sans mb-6" style={{color: C.ash, fontSize: '0.85rem'}}>{product.gender}</p>

            <p className="f-sans text-base md:text-lg mb-8" style={{color: C.mute, lineHeight: 1.7}}>{product.description}</p>

            <div className="mb-8 pb-8" style={{borderBottom: `1px solid ${C.gold}1F`}}>
              <p className="f-eyebrow mb-3" style={{color: C.gold}}>Notas olfativas</p>
              <p className="f-serif italic" style={{color: C.cream, fontSize: '1.15rem', lineHeight: 1.5}}>{product.notes}</p>
            </div>

            <div className="mb-8">
              <p className="f-eyebrow mb-4" style={{color: C.gold}}>Selecciona tamaño y calidad</p>
              <div className="grid grid-cols-3 gap-2">
                {product.variants.map((v, i) => {
                  const selected = variant.size === v.size && variant.tier === v.tier;
                  return (
                    <button
                      key={i}
                      onClick={() => setVariant(v)}
                      className="p-3 border text-center transition"
                      style={{
                        borderColor: selected ? C.gold : C.gold + '2A',
                        background: selected ? C.gold + '12' : 'transparent',
                        color: C.cream,
                      }}
                    >
                      <p className="f-sans font-semibold text-base">{v.size}</p>
                      <p className="f-sans" style={{fontSize: '0.7rem', opacity: 0.6}}>{v.tier}</p>
                      <p className="f-sans mt-1.5 font-semibold" style={{fontSize: '0.85rem', color: C.goldLight}}>{formatPrice(v.price)}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <p className="f-eyebrow mb-3" style={{color: C.gold}}>Cantidad</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-11 h-11 border flex items-center justify-center transition hover:bg-white/5" style={{borderColor: C.gold + '40', color: C.cream}} aria-label="Restar"><Minus size={16}/></button>
                <span className="f-serif text-2xl w-12 text-center" style={{color: C.cream}}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-11 h-11 border flex items-center justify-center transition hover:bg-white/5" style={{borderColor: C.gold + '40', color: C.cream}} aria-label="Sumar"><Plus size={16}/></button>
                <span className="f-sans ml-2" style={{color: C.mute, fontSize: '0.85rem'}}>Total: <span style={{color: C.goldLight, fontWeight: 600}}>{formatPrice(variant.price * qty)}</span></span>
              </div>
            </div>

            <div className="flex gap-2 mb-3">
              <button onClick={() => onAddToCart(product, variant, qty)} className="btn-primary flex-1">
                Agregar al carrito
              </button>
              <a href={buildWA(product)} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{padding: '0.875rem 1.1rem'}} title="WhatsApp">
                <MessageCircle size={16}/>
              </a>
            </div>
            <a href={getShopifyUrl(product)} target="_blank" rel="noopener noreferrer" className="btn-ghost block text-center mt-3">
              Ver en nuestra tienda Shopify →
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
function CartDrawer({ open, onClose, cart, onRemove, onUpdateQty, onCheckout }) {
  if (!open) return null;
  const total = cart.reduce((sum, item) => sum + item.variant.price * item.qty, 0);
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0" style={{background: 'rgba(14,7,3,0.85)', backdropFilter: 'blur(4px)'}}/>
      <div className="relative w-full max-w-md p-6 md:p-8 overflow-y-auto" style={{background: C.inkSoft, borderLeft: `1px solid ${C.gold}25`}} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="f-serif text-2xl md:text-3xl" style={{color: C.cream}}>Tu selección</h2>
          <button onClick={onClose} className="p-2 rounded transition hover:bg-white/5"><X size={20} color={C.gold} strokeWidth={1.5}/></button>
        </div>
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="f-sans" style={{color: C.ash}}>Aún no agregas perfumes.</p>
          </div>
        ) : (
          <>
            <div className="space-y-5 mb-8">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-4 pb-5" style={{borderBottom: `1px solid ${C.gold}15`}}>
                  <div className="w-20 h-24 flex-shrink-0 overflow-hidden" style={{background: C.brown}}>
                    <img src={item.product.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="f-eyebrow" style={{color: C.goldLight, fontSize: '0.7rem'}}>{item.product.brand || item.product.inspiredBy}</p>
                    <p className="f-serif text-lg leading-tight" style={{color: C.cream}}>{item.product.name}</p>
                    <p className="f-sans my-1" style={{fontSize: '0.75rem', color: C.ash}}>{item.variant.size} · {item.variant.tier}</p>
                    <p className="f-sans font-semibold mb-2" style={{color: C.goldLight}}>{formatPrice(item.variant.price * item.qty)}</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onUpdateQty(i, -1)} className="w-7 h-7 border flex items-center justify-center transition hover:bg-white/5" style={{borderColor: C.gold + '40', color: C.cream}}><Minus size={12}/></button>
                      <span className="f-sans font-semibold w-6 text-center" style={{color: C.cream, fontSize: '0.9rem'}}>{item.qty}</span>
                      <button onClick={() => onUpdateQty(i, 1)} className="w-7 h-7 border flex items-center justify-center transition hover:bg-white/5" style={{borderColor: C.gold + '40', color: C.cream}}><Plus size={12}/></button>
                    </div>
                  </div>
                  <button onClick={() => onRemove(i)} className="self-start p-1" style={{color: C.ash}} aria-label="Remover">
                    <X size={16}/>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-baseline mb-6 pt-5" style={{borderTop: `1px solid ${C.gold}25`}}>
              <span className="f-eyebrow" style={{color: C.cream}}>Total</span>
              <span className="f-serif text-3xl" style={{color: C.goldLight}}>{formatPrice(total)}</span>
            </div>
            <button onClick={onCheckout} className="btn-primary w-full">
              <MessageCircle size={16}/> Checkout por WhatsApp
            </button>
            <p className="f-sans text-center mt-4" style={{fontSize: '0.78rem', color: C.ash}}>Coordinamos pago contra entrega o por Nequi</p>
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
    <footer className="pt-20 md:pt-24 pb-8 px-5 md:px-8 relative" style={{background: C.ink, borderTop: `1px solid ${C.gold}1F`}}>
      <div className="absolute inset-0 grain opacity-20"></div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 md:gap-12 mb-14 relative z-10">
        <div className="md:col-span-1">
          <p className="f-serif text-3xl italic font-medium mb-4" style={{color: C.cream}}>
            Á<span className="gold-text">mbar</span>
          </p>
          <p className="f-sans text-sm mb-6" style={{color: C.mute, lineHeight: 1.6}}>
            Perfumería árabe e inspirada premium. Importación directa Colombia.
          </p>
          <div className="flex gap-2">
            <a href={buildWA()} target="_blank" rel="noopener noreferrer" className="p-2.5 border transition hover:bg-white/5" style={{borderColor: C.gold + '35', color: C.gold}} aria-label="WhatsApp">
              <MessageCircle size={16} strokeWidth={1.5}/>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="p-2.5 border transition hover:bg-white/5" style={{borderColor: C.gold + '35', color: C.gold}} aria-label="Instagram">
              <Instagram size={16} strokeWidth={1.5}/>
            </a>
          </div>
        </div>
        <div>
          <h4 className="f-eyebrow mb-4" style={{color: C.gold}}>Categorías</h4>
          <ul className="space-y-2.5 f-sans text-sm" style={{color: C.cream}}>
            <li><button onClick={() => onNav('mujer')} className="link-uline">Femeninos</button></li>
            <li><button onClick={() => onNav('hombre')} className="link-uline">Masculinos</button></li>
            <li><button onClick={() => onNav('unisex')} className="link-uline">Unisex</button></li>
            <li><button onClick={() => onNav('arabes')} className="link-uline">Árabes premium</button></li>
            <li><button onClick={() => onNav('inspirados')} className="link-uline">Esencias inspiradas</button></li>
          </ul>
        </div>
        <div>
          <h4 className="f-eyebrow mb-4" style={{color: C.gold}}>Información</h4>
          <ul className="space-y-2.5 f-sans text-sm" style={{color: C.cream}}>
            <li>Envíos 24-72h</li>
            <li>Garantía autenticidad</li>
            <li>Pago contra entrega</li>
            <li>Cambios y devoluciones</li>
            <li>Política de privacidad</li>
          </ul>
        </div>
        <div>
          <h4 className="f-eyebrow mb-4" style={{color: C.gold}}>Contacto</h4>
          <ul className="space-y-2.5 f-sans text-sm" style={{color: C.cream}}>
            <li className="flex items-center gap-2"><Phone size={13} color={C.gold} strokeWidth={1.5}/> 317 364 1851</li>
            <li className="flex items-center gap-2"><Mail size={13} color={C.gold} strokeWidth={1.5}/> hola@ambarperfumeria.co</li>
            <li className="flex items-center gap-2"><MapPin size={13} color={C.gold} strokeWidth={1.5}/> Bogotá, Colombia</li>
          </ul>
        </div>
      </div>
      <div className="text-center pt-6 flex flex-wrap justify-center md:justify-between gap-2" style={{borderTop: `1px solid ${C.gold}15`, color: C.ash}}>
        <p className="f-sans" style={{fontSize: '0.75rem'}}>© 2026 Ámbar Perfumería · Todos los derechos reservados</p>
        <p className="f-sans" style={{fontSize: '0.75rem'}}>Diseño · Importación · Colombia</p>
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

  const addToCart = (product, variant, qty = 1) => {
    setCart(c => {
      const existingIndex = c.findIndex(i => i.product.id === product.id && i.variant.size === variant.size && i.variant.tier === variant.tier);
      if (existingIndex >= 0) {
        return c.map((item, i) => i === existingIndex ? { ...item, qty: item.qty + qty } : item);
      }
      return [...c, { product, variant, qty }];
    });
    setCartOpen(true);
    setSelected(null);
  };

  const removeFromCart = (i) => setCart(c => c.filter((_, j) => j !== i));

  const updateQty = (i, delta) => {
    setCart(c => c.map((item, idx) => idx === i ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const checkoutWA = () => {
    const lines = cart.map(i => `• ${i.product.name} (${i.variant.size} ${i.variant.tier}) x${i.qty} — ${formatPrice(i.variant.price * i.qty)}`).join('\n');
    const total = cart.reduce((s, i) => s + i.variant.price * i.qty, 0);
    const text = `Hola Ámbar, quiero confirmar este pedido:\n\n${lines}\n\nTotal: ${formatPrice(total)}\n\n¿Cómo coordinamos el envío?`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen" style={{background: C.ink, color: C.pearl}}>
      <Fonts />
      <PromoBar />
      <Header onNav={nav} currentFilter={filter} currentView={view} cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      {view === 'home' && (
        <>
          <Hero onCta={(target) => nav('catalog', target)} />
          <CollectionStrip products={PRODUCTS} onNav={(c) => nav('catalog', c)} />
          <BestSellers products={PRODUCTS} onSelect={setSelected} />
          <EditorialStory products={PRODUCTS} />
          <FragranceFamilies products={PRODUCTS} />
          <FaqAccordion />
          <CtaBlock />
        </>
      )}

      {view === 'catalog' && (
        <CatalogView products={PRODUCTS} filter={filter} onSelect={setSelected} />
      )}

      {selected && <ProductDetail product={selected} onClose={() => setSelected(null)} onAddToCart={addToCart} />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onRemove={removeFromCart} onUpdateQty={updateQty} onCheckout={checkoutWA} />

      <Footer onNav={(c) => nav('catalog', c)} />

      {/* Floating WhatsApp (mobile only) */}
      <a href={buildWA()} target="_blank" rel="noopener noreferrer" className="md:hidden fixed bottom-5 right-5 z-30 flex items-center justify-center w-13 h-13 rounded-full shadow-lg transition hover:scale-110" style={{background: '#25D366', width: 52, height: 52}} title="Chat WhatsApp">
        <MessageCircle size={22} color="white" strokeWidth={1.5}/>
      </a>
    </div>
  );
}
