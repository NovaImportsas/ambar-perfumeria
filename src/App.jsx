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
const PRODUCTS = [
  {
    id: 'khamrah',
    name: 'Khamrah',
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Oriental Dulce',
    gender: 'Unisex',
    notes: 'Canela · Dátil · Vainilla · Tonka · Mirra · Praliné',
    description: 'Una celebración árabe en frasco. Khamrah de Lattafa es un oriental dulce y especiado que recuerda el ambiente de una boda en el desierto. Apertura cálida con dátiles confitados y canela, corazón de vainilla cremosa, fondo de tonka, praliné y mirra. Buena proyección, durabilidad de 8+ horas.',
    color: { primary: '#3D1A0F', accent: '#8B4513', shadow: 'rgba(139,69,19,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/khamrah.jpg',

    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/khamrah.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    featured: true,
    bestseller: true,
  },
  {
    id: 'khamrah-qahwa',
    name: 'Khamrah Qahwa',
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Oriental Café',
    gender: 'Unisex',
    notes: 'Café · Cardamomo · Cacao · Vainilla · Praliné · Sándalo',
    description: 'La versión café del icónico Khamrah. Cardamomo verde y café espresso recién molido sobre una base de cacao amargo y vainilla bourbon. Para quienes aman el aroma del café pero en clave de perfume.',
    color: { primary: '#2A1810', accent: '#6B3D1F', shadow: 'rgba(107,61,31,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/khamrah-qahwa.jpg',

    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/khamrah-qahwa.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    featured: true,
  },
  {
    id: 'khamrah-dukhan',
    name: 'Khamrah Dukhan',
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Oriental Ahumado',
    gender: 'Unisex',
    notes: 'Ámbar · Resinas · Incienso · Vainilla · Maderas · Almizcle',
    description: 'La cara más ahumada de la familia Khamrah. Ámbar resinoso con un velo de incienso y maderas oscuras. Para quienes buscan un oriental con carácter contemplativo.',
    color: { primary: '#2D1812', accent: '#7A3D24', shadow: 'rgba(122,61,36,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/khamrah-dukhan.jpg',

    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/khamrah-dukhan.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],  },
  {
    id: 'bade-al-oud-sublime',
    name: "Bade'e Al Oud Sublime",
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Oud Frutal',
    gender: 'Unisex',
    notes: 'Frambuesa negra · Oud · Azafrán · Pachulí · Ámbar · Almizcle',
    description: 'El oud encuentra a la frambuesa negra. Apertura jugosa y oscura, corazón de oud noble y azafrán, fondo de ámbar y pachulí. Para portar en ocasiones especiales — proyecta hasta el otro lado de la sala.',
    color: { primary: '#3D0E1F', accent: '#7A1E3E', shadow: 'rgba(122,30,62,0.35)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/bade-al-oud-sublime.jpg',

    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/bade-al-oud-sublime.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    featured: true,
  },
  {
    id: 'bade-al-oud-glory',
    name: "Bade'e Al Oud · Oud For Glory",
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Oud Oriental',
    gender: 'Unisex',
    notes: 'Saffron · Rosa · Oud · Cuero · Ámbar · Pachulí',
    description: 'El oud árabe en su versión más imponente. Apertura especiada con azafrán, corazón de rosa y oud envejecido, fondo de cuero y ámbar. Frasco negro con detalles dorados, presentación premium.',
    color: { primary: '#1A1209', accent: '#8B6F2B', shadow: 'rgba(139,111,43,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/bade-al-oud-glory.jpg',

    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/bade-al-oud-glory.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    featured: true,
  },
  {
    id: 'asad',
    name: 'Asad',
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Oriental Cuero',
    gender: 'Hombre',
    notes: 'Manzana negra · Cuero · Tabaco · Sándalo · Ámbar · Almizcle',
    description: 'Manzana negra confitada sobre un cuero curtido. Lattafa Asad es el perfume árabe de cuero por excelencia, con una potencia que recuerda a fragancias de diseñador del doble del precio.',
    color: { primary: '#2A1108', accent: '#5C2D17', shadow: 'rgba(92,45,23,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/asad.jpg',

    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/asad.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],  },
  {
    id: 'asad-bourbon',
    name: 'Asad Bourbon',
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Gourmand Amaderado',
    gender: 'Hombre',
    notes: 'Bourbon · Vainilla · Tabaco · Cacao · Maderas · Cuero',
    description: 'La versión gourmand del Asad clásico. Bourbon, vainilla y tabaco sobre un fondo amaderado y de cuero suave. Más dulce y nocturno que el Asad original.',
    color: { primary: '#2D1B0E', accent: '#6B3F1F', shadow: 'rgba(107,63,31,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/asad-bourbon.jpg',

    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/asad-bourbon.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],  },
  {
    id: 'club-nuit-intense',
    name: 'Club de Nuit Intense Man',
    brand: 'Armaf',
    type: 'arabe',
    family: 'Amaderado Aromático',
    gender: 'Hombre',
    notes: 'Piña · Manzana negra · Pimienta · Abedul · Pachulí · Ámbar gris',
    description: 'La opción árabe más conocida del segmento. Frescura cítrica seguida de un corazón especiado y un fondo amaderado denso. Versátil — funciona en oficina, cena y noche.',
    color: { primary: '#1A1E14', accent: '#3D4A2B', shadow: 'rgba(61,74,43,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/club-nuit-intense.jpg',

    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/club-nuit-intense.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    bestseller: true,
  },
  {
    id: '9pm',
    name: '9PM',
    brand: 'Afnan',
    type: 'arabe',
    family: 'Oriental Especiado',
    gender: 'Hombre',
    notes: 'Manzana · Lavanda · Canela · Cuero · Vainilla · Sándalo',
    description: 'Apertura de manzana especiada con un fondo de vainilla y sándalo cremoso. Una opción dulce-masculina con presencia segura sin volverse abrumadora.',
    color: { primary: '#1A1A1A', accent: '#3D2914', shadow: 'rgba(61,41,20,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/9pm.jpg',

    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/9pm.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],  },
  {
    id: 'bharara-king',
    name: 'Bharara King',
    brand: 'Bharara',
    type: 'arabe',
    family: 'Aromático Especiado',
    gender: 'Hombre',
    notes: 'Cardamomo · Pimienta · Cuero · Ámbar · Vetiver · Almizcle',
    description: 'Un aromático especiado con presencia. Frescura inicial con cardamomo y pimienta, fondo de cuero y ámbar. Frasco transparente con tapa cobre, diseño elegante.',
    color: { primary: '#0D1F2D', accent: '#5C3E1F', shadow: 'rgba(92,62,31,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/bharara-king.jpg',

    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/bharara-king.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],  },
  {
    id: 'bharara-bleu',
    name: 'Bharara Bleu',
    brand: 'Bharara',
    type: 'arabe',
    family: 'Acuático Aromático',
    gender: 'Hombre',
    notes: 'Bergamota · Sal marina · Lavanda · Pachulí · Cedro · Ámbar gris',
    description: 'La interpretación de Bharara del acorde acuático masculino. Frescura salina con un fondo amaderado limpio. Frasco azul cobalto con etiqueta dorada.',
    color: { primary: '#0A2540', accent: '#2A5A8A', shadow: 'rgba(42,90,138,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/bharara-bleu.jpg',

    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/bharara-bleu.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],  },
  {
    id: 'amber-rouge',
    name: 'Amber Rouge',
    brand: 'Orientica',
    type: 'arabe',
    family: 'Oriental Ámbar',
    gender: 'Unisex',
    notes: 'Azafrán · Rosa · Ámbar · Oud · Pachulí · Vainilla',
    description: 'El ámbar oriental en su versión más ornamental. Rosa y azafrán abren paso a un fondo denso de ámbar y oud. Frasco con detalles tipo joyería rosé gold.',
    color: { primary: '#4A0E1A', accent: '#A8475C', shadow: 'rgba(168,71,92,0.35)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/amber-rouge.jpg',

    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/amber-rouge.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    featured: true,
  },
  {
    id: 'art-of-universe',
    name: 'Art of Universe',
    brand: 'Lattafa Pride',
    type: 'arabe',
    family: 'Aromático Amaderado',
    gender: 'Hombre',
    notes: 'Bergamota · Mandarina · Lavanda · Geranio · Cedro · Almizcle',
    description: 'Fragancia masculina fresca con notas aromáticas y un fondo amaderado limpio. Presentación premium en frasco azul con grabado de planetas.',
    color: { primary: '#0F1F4A', accent: '#3D5A8A', shadow: 'rgba(61,90,138,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/art-of-universe.jpg',

    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/art-of-universe.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],  },
  {
    id: 'emeer',
    name: 'Emeer',
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Oriental Especiado',
    gender: 'Hombre',
    notes: 'Cardamomo · Saffron · Cuero · Ámbar · Oud · Maderas',
    description: 'Composición oriental masculina con notas especiadas y un fondo ámbar-cuero. Frasco dorado calado, presentación distintiva.',
    color: { primary: '#3D2A0F', accent: '#A8852B', shadow: 'rgba(168,133,43,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/emeer.jpg',

    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/emeer.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],  },
  {
    id: 'his-confession',
    name: 'His Confession',
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Oriental Aromático',
    gender: 'Hombre',
    notes: 'Cardamomo · Pimienta · Cuero · Tabaco · Sándalo · Maderas',
    description: 'Oriental masculino con carácter clásico. Notas especiadas sobre un fondo de cuero y tabaco rubio. Presentación con busto escultórico negro y dorado.',
    color: { primary: '#1A0F0A', accent: '#8B6F2B', shadow: 'rgba(139,111,43,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/his-confession.jpg',

    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/his-confession.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],  },
  {
    id: 'odyssey-mandarin',
    name: 'Odyssey Mandarin Sky',
    brand: 'Armaf',
    type: 'arabe',
    family: 'Cítrico Frutal',
    gender: 'Unisex',
    notes: 'Mandarina · Bergamota · Jengibre · Pimienta rosa · Cedro · Almizcle',
    description: 'Cítrico fresco con un acorde de mandarina jugosa y un fondo limpio amaderado. Edición limitada con funda en cuero turquesa, presentación de colección.',
    color: { primary: '#0F4A6B', accent: '#F58220', shadow: 'rgba(245,130,32,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/odyssey-mandarin.jpg',

    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/odyssey-mandarin.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],  },
  {
    id: 'amber-oud-rouge',
    name: 'Amber Oud Rouge',
    brand: 'Al Haramain',
    type: 'arabe',
    family: 'Oud Oriental',
    gender: 'Unisex',
    notes: 'Rosa · Oud · Ámbar · Sándalo · Pachulí · Almizcle',
    description: 'Oud árabe clásico con un corazón de rosa búlgara y un fondo de ámbar resinoso. Una de las opciones más reconocidas de Al Haramain para entrar al mundo del oud.',
    color: { primary: '#4A1818', accent: '#A8525C', shadow: 'rgba(168,82,92,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/amber-oud-rouge.jpg',

    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/amber-oud-rouge.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],  },
  {
    id: 'insp-badboy',
    name: 'Esencia inspirada en Bad Boy',
    inspiredBy: 'Carolina Herrera Bad Boy',
    type: 'inspirado',
    family: 'Aromático Frutal',
    gender: 'Hombre',
    notes: 'Bergamota · Pimienta blanca · Cedro · Cacao · Haba tonka',
    description: 'Esencia inspirada en el perfil aromático frutal masculino tipo Bad Boy de Carolina Herrera. Apertura especiada, corazón aromático, fondo cremoso de cacao y tonka. Producto no afiliado con la casa referenciada.',
    color: { primary: '#1F2D14', accent: '#4A6B2B', shadow: 'rgba(74,107,43,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-badboy.png',
    bestseller: true,
    featured: true,
  },
  {
    id: 'insp-sauvage',
    name: 'Esencia inspirada en Sauvage',
    inspiredBy: 'Dior Sauvage',
    type: 'inspirado',
    family: 'Aromático Fresco',
    gender: 'Hombre',
    notes: 'Bergamota · Pimienta de Sichuán · Ambroxan · Lavanda · Cedro',
    description: 'Esencia inspirada en el perfil fresco aromático masculino tipo Sauvage de Dior. Apertura cítrica, corazón aromático especiado, fondo limpio amaderado con ambroxan. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0D2535', accent: '#2A6B8A', shadow: 'rgba(42,107,138,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-sauvage.png',
    bestseller: true,
  },
  {
    id: 'insp-invictus',
    name: 'Esencia inspirada en Invictus',
    inspiredBy: 'Paco Rabanne Invictus',
    type: 'inspirado',
    family: 'Acuático Amaderado',
    gender: 'Hombre',
    notes: 'Pomelo · Mandarina · Hoja de laurel · Ámbar gris · Madera de guayaco',
    description: 'Esencia inspirada en el perfil acuático masculino tipo Invictus de Paco Rabanne. Frescura cítrica con un fondo de ámbar gris. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0F2535', accent: '#3D7AA8', shadow: 'rgba(61,122,168,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-invictus.png',
  },
  {
    id: 'insp-invictus-victory',
    name: 'Esencia inspirada en Invictus Victory Elixir',
    inspiredBy: 'Paco Rabanne Invictus Victory Elixir',
    type: 'inspirado',
    family: 'Oriental Aromático',
    gender: 'Hombre',
    notes: 'Saffron · Lavanda · Pachulí · Ámbar · Mirra · Cumin',
    description: 'Esencia inspirada en la versión más intensa de la línea Invictus. Apertura especiada con azafrán, corazón aromático, fondo oriental denso. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A1F35', accent: '#5C3D6B', shadow: 'rgba(92,61,107,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-invictus-victory.png',
  },
  {
    id: 'insp-212men',
    name: 'Esencia inspirada en 212 Men',
    inspiredBy: 'Carolina Herrera 212 Men',
    type: 'inspirado',
    family: 'Aromático Cítrico',
    gender: 'Hombre',
    notes: 'Bergamota · Petitgrain · Lavanda · Geranio · Almizcle · Sándalo',
    description: 'Esencia inspirada en el perfil urbano clásico tipo 212 Men de Carolina Herrera. Frescura limpia con un fondo elegante de almizcle. Producto no afiliado con la casa referenciada.',
    color: { primary: '#3A3A3A', accent: '#6B7280', shadow: 'rgba(107,114,128,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-212men.png',
  },
  {
    id: 'insp-212vipblack',
    name: 'Esencia inspirada en 212 VIP Black',
    inspiredBy: 'Carolina Herrera 212 VIP Black',
    type: 'inspirado',
    family: 'Amaderado Especiado',
    gender: 'Hombre',
    notes: 'Pimienta · Cuero · Vainilla · Vetiver · Tabaco · Ámbar',
    description: 'Esencia inspirada en el perfil nocturno especiado tipo 212 VIP Black. Apertura con pimienta y cuero, fondo de tabaco y ámbar. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A0A0A', accent: '#3D3D3D', shadow: 'rgba(61,61,61,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-212vipblack.png',
    bestseller: true,
  },
  {
    id: 'insp-1million',
    name: 'Esencia inspirada en 1 Million',
    inspiredBy: 'Paco Rabanne 1 Million',
    type: 'inspirado',
    family: 'Especiado Cuero',
    gender: 'Hombre',
    notes: 'Pomelo · Menta · Canela · Rosa · Cuero · Ámbar',
    description: 'Esencia inspirada en el perfil especiado tipo 1 Million de Paco Rabanne. Apertura cítrica refrescante, corazón especiado, fondo cálido de cuero y ámbar. Producto no afiliado con la casa referenciada.',
    color: { primary: '#3D2A0A', accent: '#A8852B', shadow: 'rgba(168,133,43,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-1million.png',
    bestseller: true,
  },
  {
    id: 'insp-phantom',
    name: 'Esencia inspirada en Phantom',
    inspiredBy: 'Paco Rabanne Phantom',
    type: 'inspirado',
    family: 'Aromático Cítrico',
    gender: 'Hombre',
    notes: 'Lavanda · Limón · Manzana · Vainilla · Pachulí · Madera',
    description: 'Esencia inspirada en el perfil aromático moderno tipo Phantom. Frescura limpia con un fondo gourmand sutil. Producto no afiliado con la casa referenciada.',
    color: { primary: '#3D3D3D', accent: '#8A8A8A', shadow: 'rgba(138,138,138,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-phantom.png',
  },
  {
    id: 'insp-bleudechanel',
    name: 'Esencia inspirada en Bleu de Chanel',
    inspiredBy: 'Chanel Bleu de Chanel',
    type: 'inspirado',
    family: 'Amaderado Aromático',
    gender: 'Hombre',
    notes: 'Pomelo · Limón · Menta · Jengibre · Sándalo · Cedro · Ámbar',
    description: 'Esencia inspirada en el perfil amaderado aromático tipo Bleu de Chanel. Apertura cítrica fresca, corazón aromático, fondo de maderas elegantes. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A1F4A', accent: '#1E4A8A', shadow: 'rgba(30,74,138,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-bleudechanel.png',
    bestseller: true,
    featured: true,
  },
  {
    id: 'insp-lemale',
    name: 'Esencia inspirada en Le Male',
    inspiredBy: 'Jean Paul Gaultier Le Male',
    type: 'inspirado',
    family: 'Aromático Oriental',
    gender: 'Hombre',
    notes: 'Lavanda · Menta · Cardamomo · Canela · Vainilla · Haba tonka',
    description: 'Esencia inspirada en el perfil aromático oriental tipo Le Male de Jean Paul Gaultier. Lavanda fresca sobre un fondo dulce de vainilla y tonka. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0F3D5A', accent: '#3D7AA8', shadow: 'rgba(61,122,168,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-lemale.png',
  },
  {
    id: 'insp-scandal',
    name: 'Esencia inspirada en Scandal Le Parfum',
    inspiredBy: 'Jean Paul Gaultier Scandal Le Parfum',
    type: 'inspirado',
    family: 'Oriental Dulce',
    gender: 'Hombre',
    notes: 'Caramelo · Mandarina · Lavanda · Cuero · Sándalo · Almizcle',
    description: 'Esencia inspirada en el perfil oriental dulce tipo Scandal Le Parfum. Apertura jugosa, corazón aromático, fondo de cuero y caramelo. Producto no afiliado con la casa referenciada.',
    color: { primary: '#1A0A0A', accent: '#3D1414', shadow: 'rgba(61,20,20,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-scandal.png',
  },
  {
    id: 'insp-ombrenomade',
    name: 'Esencia inspirada en Ombre Nomade',
    inspiredBy: 'Louis Vuitton Ombre Nomade',
    type: 'inspirado',
    family: 'Oud Resinoso',
    gender: 'Unisex',
    notes: 'Frambuesa · Incienso · Oud · Maderas resinosas · Benjuí · Ámbar',
    description: 'Esencia inspirada en el perfil oud nicho tipo Ombre Nomade. Frambuesa oscura sobre incienso resinoso, fondo de oud y benjuí. Producto no afiliado con la casa referenciada.',
    color: { primary: '#1A0A0A', accent: '#5C2A1F', shadow: 'rgba(92,42,31,0.35)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-ombrenomade.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-ombrenomade.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
    featured: true,
  },
  {
    id: 'insp-santal33',
    name: 'Esencia inspirada en Santal 33',
    inspiredBy: 'Le Labo Santal 33',
    type: 'inspirado',
    family: 'Amaderado Especiado',
    gender: 'Unisex',
    notes: 'Cardamomo · Violeta · Iris · Sándalo · Cuero · Cedro',
    description: 'Esencia inspirada en el perfil amaderado nicho tipo Santal 33. Sándalo cremoso con un acorde de iris y cuero suave. Producto no afiliado con la casa referenciada.',
    color: { primary: '#5C4A3A', accent: '#A89178', shadow: 'rgba(168,145,120,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: '',
    featured: true,
  },
  {
    id: 'insp-coco',
    name: 'Esencia inspirada en Coco Mademoiselle',
    inspiredBy: 'Chanel Coco Mademoiselle',
    type: 'inspirado',
    family: 'Oriental Floral',
    gender: 'Mujer',
    notes: 'Naranja · Bergamota · Rosa · Jazmín · Pachulí · Vainilla',
    description: 'Esencia inspirada en el perfil oriental floral femenino tipo Coco Mademoiselle. Apertura cítrica, corazón floral, fondo de pachulí y vainilla. Producto no afiliado con la casa referenciada.',
    color: { primary: '#3D2A1F', accent: '#8A5A3D', shadow: 'rgba(138,90,61,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-coco-mademoiselle.png',
    bestseller: true,
  },
  {
    id: 'insp-lightblue',
    name: 'Esencia inspirada en Light Blue Pour Homme',
    inspiredBy: 'Dolce & Gabbana Light Blue Pour Homme',
    type: 'inspirado',
    family: 'Cítrico Aromático',
    gender: 'Hombre',
    notes: 'Limón · Manzana · Bambú · Rosa · Madera de cedro · Almizcle',
    description: 'Esencia inspirada en el perfil cítrico fresco femenino tipo Light Blue. Frescura mediterránea con un fondo limpio de cedro. Producto no afiliado con la casa referenciada.',
    color: { primary: '#1A3D4A', accent: '#5C8AA0', shadow: 'rgba(92,138,160,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-lightblue.png',
  },
  {
    id: 'insp-montblanc-legend',
    name: 'Esencia inspirada en Legend',
    inspiredBy: 'Montblanc Legend',
    type: 'inspirado',
    family: 'Aromático Frutal',
    gender: 'Hombre',
    notes: 'Bergamota · Piña · Lavanda · Verbena · Manzana roja · Geranio · Cumarina · Rosa · Sándalo · Haba tonka · Ámbar · Musgo de roble',
    description: 'Esencia inspirada en el perfil aromático frutal masculino tipo Legend de Montblanc. Carisma, frescura y elegancia. Una esencia que deja huella y nunca pasa desapercibida. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A1B40', accent: '#3D6BB5', shadow: 'rgba(61,107,181,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-montblanc-legend.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-montblanc-legend.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-diesel-plus',
    name: 'Esencia inspirada en Diesel Plus',
    inspiredBy: 'Diesel Plus Plus',
    type: 'inspirado',
    family: 'Amaderado Especiado',
    gender: 'Hombre',
    notes: 'Pimienta · Cardamomo · Cuero · Cedro · Vetiver · Ámbar',
    description: 'Esencia inspirada en el perfil amaderado especiado tipo Diesel Plus. Apertura especiada, fondo de cuero y maderas. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A0A0A', accent: '#5C4A2B', shadow: 'rgba(92,74,43,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-diesel-plus.png',
  },
  {
    id: 'insp-212-forever-young',
    name: 'Esencia inspirada en 212 Forever Young',
    inspiredBy: 'Carolina Herrera 212 Men Forever Young',
    type: 'inspirado',
    family: 'Aromático Frutal',
    gender: 'Hombre',
    notes: 'Pomelo · Pera · Cedro · Pachulí · Ámbar · Almizcle',
    description: 'Esencia inspirada en el perfil aromático fresco tipo 212 Forever Young. Frescura cítrica frutal con un fondo limpio amaderado. Producto no afiliado con la casa referenciada.',
    color: { primary: '#1A1A1A', accent: '#6B7280', shadow: 'rgba(107,114,128,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-212-forever-young.png',
  },
  {
    id: 'insp-212-heroes',
    name: 'Esencia inspirada en 212 Heroes',
    inspiredBy: 'Carolina Herrera 212 Heroes',
    type: 'inspirado',
    family: 'Amaderado Aromático',
    gender: 'Hombre',
    notes: 'Bergamota · Manzana · Cardamomo · Maderas · Almizcle · Ámbar',
    description: 'Esencia inspirada en el perfil amaderado aromático tipo 212 Heroes. Apertura fresca, corazón aromático especiado, fondo amaderado. Producto no afiliado con la casa referenciada.',
    color: { primary: '#1A1A1A', accent: '#B91C1C', shadow: 'rgba(185,28,28,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-212-heroes.png',
  },
  {
    id: 'insp-212-sexy-men',
    name: 'Esencia inspirada en 212 Sexy Men',
    inspiredBy: 'Carolina Herrera 212 Sexy Men',
    type: 'inspirado',
    family: 'Oriental Especiado',
    gender: 'Hombre',
    notes: 'Bergamota · Pimienta · Cardamomo · Pachulí · Almizcle · Vainilla',
    description: 'Esencia inspirada en el perfil oriental especiado tipo 212 Sexy Men. Apertura cítrica especiada, fondo cálido oriental. Producto no afiliado con la casa referenciada.',
    color: { primary: '#3D1A1F', accent: '#A8475C', shadow: 'rgba(168,71,92,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-212-sexy-men.png',
  },
  {
    id: 'insp-invictus-victory-negro',
    name: 'Esencia inspirada en Invictus Victory',
    inspiredBy: 'Paco Rabanne Invictus Victory',
    type: 'inspirado',
    family: 'Oriental Aromático',
    gender: 'Hombre',
    notes: 'Saffron · Lavanda · Pachulí · Ámbar · Mirra',
    description: 'Esencia inspirada en el perfil oriental aromático tipo Invictus Victory. Apertura especiada, corazón aromático, fondo oriental denso. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A0A0A', accent: '#8B6F2B', shadow: 'rgba(139,111,43,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-invictus-victory-negro.png',
  },
  {
    id: 'insp-ultra-male',
    name: 'Esencia inspirada en Ultra Male',
    inspiredBy: 'Jean Paul Gaultier Ultra Male',
    type: 'inspirado',
    family: 'Gourmand Aromático',
    gender: 'Hombre',
    notes: 'Pera · Lavanda · Canela · Caramelo · Vainilla · Ámbar',
    description: 'Esencia inspirada en el perfil gourmand aromático tipo Ultra Male de Jean Paul Gaultier. Apertura jugosa, corazón aromático especiado, fondo dulce de caramelo y vainilla. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0F1F4A', accent: '#2A3F8A', shadow: 'rgba(42,63,138,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-ultra-male.png',
  },
  {
    id: 'insp-le-male-lover',
    name: 'Esencia inspirada en Le Male Lover',
    inspiredBy: 'Jean Paul Gaultier Le Male Lover',
    type: 'inspirado',
    family: 'Aromático Especiado',
    gender: 'Hombre',
    notes: 'Lavanda · Canela · Cuero · Vainilla · Maderas',
    description: 'Esencia inspirada en el perfil aromático especiado tipo Le Male Lover. Versión más intensa y especiada del clásico Le Male. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A1F35', accent: '#B91C1C', shadow: 'rgba(185,28,28,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-le-male-lover.png',
  },
  {
    id: 'insp-le-beau',
    name: 'Esencia inspirada en Le Beau Le Parfum',
    inspiredBy: 'Jean Paul Gaultier Le Beau Le Parfum',
    type: 'inspirado',
    family: 'Amaderado Coco',
    gender: 'Hombre',
    notes: 'Bergamota · Coco · Sándalo · Haba tonka · Ámbar',
    description: 'Esencia inspirada en el perfil amaderado coco tipo Le Beau Le Parfum. Apertura cítrica fresca, corazón de coco, fondo cremoso amaderado. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A2A1F', accent: '#2D5A3D', shadow: 'rgba(45,90,61,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-le-beau.png',
  },
  {
    id: 'insp-scandal-pour-homme',
    name: 'Esencia inspirada en Scandal Pour Homme',
    inspiredBy: 'Jean Paul Gaultier Scandal Pour Homme',
    type: 'inspirado',
    family: 'Oriental Aromático',
    gender: 'Hombre',
    notes: 'Mandarina · Lavanda · Caramelo · Pachulí · Cuero',
    description: 'Esencia inspirada en el perfil oriental aromático tipo Scandal Pour Homme. Apertura cítrica fresca, corazón aromático, fondo de caramelo y cuero. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A2545', accent: '#B91C1C', shadow: 'rgba(185,28,28,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-scandal-pour-homme.png',
  },
  {
    id: 'insp-eros',
    name: 'Esencia inspirada en Eros',
    inspiredBy: 'Versace Eros',
    type: 'inspirado',
    family: 'Aromático Fougère',
    gender: 'Hombre',
    notes: 'Menta · Manzana verde · Haba tonka · Vainilla · Cedro · Ámbar',
    description: 'Esencia inspirada en el perfil aromático fougère tipo Eros de Versace. Apertura fresca de menta, corazón aromático, fondo dulce de tonka y vainilla. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A1F4A', accent: '#1E4A8A', shadow: 'rgba(30,74,138,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-eros.png',
    bestseller: true,
    featured: true,
  },
  {
    id: 'insp-valentino-intense',
    name: 'Esencia inspirada en Valentino Uomo Intense',
    inspiredBy: 'Valentino Uomo Intense',
    type: 'inspirado',
    family: 'Oriental Cuero',
    gender: 'Hombre',
    notes: 'Bergamota · Mirto · Iris · Cuero · Vainilla · Ámbar',
    description: 'Esencia inspirada en el perfil oriental cuero tipo Valentino Uomo Intense. Apertura cítrica, corazón aromático, fondo cálido de cuero y vainilla. Producto no afiliado con la casa referenciada.',
    color: { primary: '#1A1A1A', accent: '#8B6F2B', shadow: 'rgba(139,111,43,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-valentino-intense.png',
  },
  {
    id: 'insp-club-nuit-intense',
    name: 'Esencia inspirada en Club de Nuit Intense',
    inspiredBy: 'Armaf Club de Nuit Intense Man',
    type: 'inspirado',
    family: 'Amaderado Aromático',
    gender: 'Hombre',
    notes: 'Limón · Piña · Bergamota · Manzana · Grosella negra · Abedul · Jazmín · Rosa · Almizcle · Ámbar gris · Pachulí · Vainilla · Musgo',
    description: "Esencia inspirada en el perfil aromático amaderado masculino tipo Club de Nuit Intense. Intensa, elegante y duradera. Ideal para uso diario y noches especiales. Producto no afiliado con la casa referenciada.",
    color: { primary: '#0B1B3A', accent: '#3A5DA6', shadow: 'rgba(58,93,166,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-club-nuit-intense.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-club-nuit-intense.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-leau-issey',
    name: "Esencia inspirada en L'Eau d'Issey Pour Homme",
    inspiredBy: "Issey Miyake L'Eau d'Issey Pour Homme",
    type: 'inspirado',
    family: 'Acuático Amaderado',
    gender: 'Unisex',
    notes: 'Yuzu · Limón · Verbena · Bergamota · Mandarina · Flor de loto · Lirio de agua · Canela · Cedro · Almizcle · Ámbar · Tabaco',
    description: "Esencia inspirada en el perfil acuático fresco tipo L'Eau d'Issey. Frescura cítrica con un fondo limpio y atemporal. Producto no afiliado con la casa referenciada.",
    color: { primary: '#1A4A75', accent: '#7AB8DC', shadow: 'rgba(122,184,220,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-leau-issey.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-leau-issey.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-perry-380',
    name: 'Esencia inspirada en 380° Perry Ellis',
    inspiredBy: 'Perry Ellis 360°',
    type: 'inspirado',
    family: 'Aromático Cítrico',
    gender: 'Hombre',
    notes: 'Bergamota · Limón · Lima · Mandarina · Cardamomo · Lavanda · Geranio · Maderas cálidas · Almizcle · Ámbar · Musgo de roble',
    description: "Esencia inspirada en el perfil moderno y masculino tipo 380° Perry Ellis. Cítrica con especias suaves y un fondo amaderado. Producto no afiliado con la casa referenciada.",
    color: { primary: '#0E2A55', accent: '#4F7DCB', shadow: 'rgba(79,125,203,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-perry-380.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-perry-380.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-hugo-boss-iced',
    name: 'Esencia inspirada en Hugo Boss Iced',
    inspiredBy: 'Hugo Boss Bottled Iced',
    type: 'inspirado',
    family: 'Aromático Fresco',
    gender: 'Hombre',
    notes: 'Menta helada · Manzana verde · Cítricos · Té negro · Lavanda · Geranio · Especias · Maderas ambaradas · Almizcle · Vetiver · Musgo',
    description: "Esencia inspirada en el perfil fresco y energético tipo Hugo Boss Iced. Sensación helada y refrescante para uso diario. Producto no afiliado con la casa referenciada.",
    color: { primary: '#0F2D5C', accent: '#5AA5E0', shadow: 'rgba(90,165,224,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-hugo-boss-iced.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-hugo-boss-iced.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-blue-seduction',
    name: 'Esencia inspirada en Blue Seduction',
    inspiredBy: 'Antonio Banderas Blue Seduction',
    type: 'inspirado',
    family: 'Acuático Amaderado',
    gender: 'Hombre',
    notes: 'Melón · Menta · Pepino · Cítricos · Manzana verde · Notas acuáticas · Albahaca · Almizcle · Ámbar gris · Maderas ligeras',
    description: "Esencia inspirada en el perfil fresco y atractivo tipo Blue Seduction. Notas acuáticas y aromáticas para el hombre moderno. Producto no afiliado con la casa referenciada.",
    color: { primary: '#1A4F8C', accent: '#7AC0E8', shadow: 'rgba(122,192,232,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-blue-seduction.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-blue-seduction.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-paris-hilton',
    name: 'Esencia inspirada en Paris Hilton',
    inspiredBy: 'Paris Hilton (Mujer)',
    type: 'inspirado',
    family: 'Floral Oriental',
    gender: 'Mujer',
    notes: 'Manzana · Durazno · Fresa · Yuca · Melón · Lirio de los valles · Mimosa · Jazmín · Nardos · Ylang-ylang · Almizcle · Musgo de roble · Sándalo',
    description: "Esencia inspirada en el perfil femenino, fresco y dulce tipo Paris Hilton. Elegancia y encanto en cada nota. Producto no afiliado con la casa referenciada.",
    color: { primary: '#A6457A', accent: '#F2B7D1', shadow: 'rgba(242,183,209,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-paris-hilton.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-paris-hilton.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-lapidus',
    name: 'Esencia inspirada en Lapidus',
    inspiredBy: 'Ted Lapidus Pour Homme',
    type: 'inspirado',
    family: 'Aromático Fougère',
    gender: 'Hombre',
    notes: 'Lavanda · Albahaca · Bergamota · Limón · Notas verdes · Clavel · Canela · Jazmín · Geranio · Rosa · Sándalo · Vetiver · Pachulí · Musgo de roble · Ámbar',
    description: "Esencia inspirada en el perfil clásico y atemporal masculino tipo Lapidus. Aromática, fougère y sofisticada. Producto no afiliado con la casa referenciada.",
    color: { primary: '#0F2848', accent: '#506FA8', shadow: 'rgba(80,111,168,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-lapidus.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-lapidus.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-lacoste-red',
    name: 'Esencia inspirada en Lacoste Red',
    inspiredBy: 'Lacoste Red',
    type: 'inspirado',
    family: 'Aromático Frutal',
    gender: 'Hombre',
    notes: 'Manzana roja · Piña · Ciruela · Toronja · Pino · Jazmín · Geranio · Cedro · Sándalo · Pachulí · Vetiver · Ámbar',
    description: "Esencia inspirada en el perfil energético y juvenil tipo Lacoste Red. Frutal con un fondo amaderado vibrante. Producto no afiliado con la casa referenciada.",
    color: { primary: '#1A2E5C', accent: '#C8242E', shadow: 'rgba(200,36,46,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-lacoste-red.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-lacoste-red.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-starwalker',
    name: 'Esencia inspirada en Starwalker',
    inspiredBy: 'Montblanc Starwalker',
    type: 'inspirado',
    family: 'Amaderado Aromático',
    gender: 'Hombre',
    notes: 'Bergamota · Mandarina · Bambú · Hojas de violeta · Jengibre · Nuez moscada · Sándalo · Jazmín · Ámbar · Almizcle blanco · Cedro · Musgo de roble',
    description: "Esencia inspirada en el perfil moderno, fresco e inconfundible tipo Starwalker. Aromática y amaderada para el hombre que deja huella. Producto no afiliado con la casa referenciada.",
    color: { primary: '#0A1B40', accent: '#3D6BB5', shadow: 'rgba(61,107,181,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-starwalker.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-starwalker.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-tommy-hilfiger',
    name: 'Esencia inspirada en Tommy',
    inspiredBy: 'Tommy Hilfiger Tommy',
    type: 'inspirado',
    family: 'Aromático Cítrico',
    gender: 'Hombre',
    notes: 'Bergamota · Mandarina · Lavanda · Menta · Manzana verde · Arándano · Geranio · Jazmín · Sándalo · Ámbar · Musgo de roble · Cedro',
    description: "Esencia inspirada en el perfil clásico, fresco e icónico tipo Tommy. Frescura juvenil con un fondo elegante. Producto no afiliado con la casa referenciada.",
    color: { primary: '#0E2354', accent: '#C82832', shadow: 'rgba(200,40,50,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-tommy-hilfiger.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-tommy-hilfiger.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-toy-boy',
    name: 'Esencia inspirada en Toy Boy',
    inspiredBy: 'Moschino Toy Boy',
    type: 'inspirado',
    family: 'Oriental Especiado',
    gender: 'Hombre',
    notes: 'Manzana verde · Pimienta rosa · Pera · Bergamota · Rosa · Clavo · Magnolia · Lino · Vetiver · Sándalo · Ámbar · Cedro · Almizcle',
    description: "Esencia inspirada en el perfil irreverente y sofisticado tipo Toy Boy. Especiada y seductora, rompe las reglas. Producto no afiliado con la casa referenciada.",
    color: { primary: '#0A0F1F', accent: '#D14778', shadow: 'rgba(209,71,120,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-toy-boy.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-toy-boy.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-lacoste-blanca',
    name: 'Esencia inspirada en Lacoste Blanca',
    inspiredBy: 'Lacoste L.12.12 Blanc',
    type: 'inspirado',
    family: 'Amaderado Aromático',
    gender: 'Hombre',
    notes: 'Pomelo · Cardamomo · Cedro · Romero · Ylang-ylang · Nardos · Cuero · Vetiver · Gamuza · Madera de cedro',
    description: "Esencia inspirada en el perfil fresco, limpio e inconfundible tipo Lacoste Blanca. Pomelo y cardamomo sobre un fondo de cuero y madera. Producto no afiliado con la casa referenciada.",
    color: { primary: '#1A3A72', accent: '#D4DEEC', shadow: 'rgba(212,222,236,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-lacoste-blanca.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-lacoste-blanca.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-hugo-red',
    name: 'Esencia inspirada en Hugo Red',
    inspiredBy: 'Hugo Boss Red',
    type: 'inspirado',
    family: 'Aromático Frutal',
    gender: 'Hombre',
    notes: 'Manzana roja · Toronja · Cedrón · Geranio · Lavanda · Salvia · Sándalo · Ámbar · Vetiver · Madera de cedro',
    description: "Esencia inspirada en el perfil audaz y enérgico tipo Hugo Red. Frutal y aromática con presencia inolvidable. Producto no afiliado con la casa referenciada.",
    color: { primary: '#1A2E5C', accent: '#C8242E', shadow: 'rgba(200,36,46,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-hugo-red.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-hugo-red.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-jean-pascal',
    name: 'Esencia inspirada en Jean Pascal',
    inspiredBy: 'Jean Pascal Pour Homme',
    type: 'inspirado',
    family: 'Aromático Fougère',
    gender: 'Hombre',
    notes: 'Bergamota · Limón · Albahaca · Lavanda · Clavel · Geranio · Jazmín · Rosa · Sándalo · Ámbar · Musgo de roble · Cedro',
    description: "Esencia inspirada en la elegancia clásica y carisma auténtico tipo Jean Pascal. Aromática y atemporal. Producto no afiliado con la casa referenciada.",
    color: { primary: '#0E2A60', accent: '#D4AC58', shadow: 'rgba(212,172,88,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-jean-pascal.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-jean-pascal.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-odyssey-manager',
    name: 'Esencia inspirada en Odyssey Manager',
    inspiredBy: 'Armaf Odyssey',
    type: 'inspirado',
    family: 'Amaderado Aromático',
    gender: 'Hombre',
    notes: 'Bergamota · Mandarina · Pimienta rosa · Lavanda · Salvia · Geranio · Ámbar · Vetiver · Cedro · Pachulí',
    description: "Esencia inspirada en el perfil moderno y sofisticado tipo Odyssey Manager. Liderazgo y carisma en cada nota. Producto no afiliado con la casa referenciada.",
    color: { primary: '#0A1F4D', accent: '#D4AC58', shadow: 'rgba(212,172,88,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-odyssey-manager.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-odyssey-manager.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-bharara-king',
    name: 'Esencia inspirada en Bharara King',
    inspiredBy: 'Bharara King',
    type: 'inspirado',
    family: 'Oriental Especiado',
    gender: 'Hombre',
    notes: 'Piña · Bergamota · Grosellas negras · Pimienta negra · Iris · Jazmín · Pachulí · Ámbar · Vainilla · Almizcle · Madera de oud · Musgo',
    description: "Esencia inspirada en el perfil de poder y realeza tipo Bharara King. Especiada, intensa y profunda. Producto no afiliado con la casa referenciada.",
    color: { primary: '#0A0F2E', accent: '#D4AC58', shadow: 'rgba(212,172,88,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-bharara-king.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-bharara-king.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-erba-pura',
    name: 'Esencia inspirada en Erba Pura',
    inspiredBy: 'Xerjoff Erba Pura',
    type: 'inspirado',
    family: 'Gourmand Frutal',
    gender: 'Hombre',
    notes: 'Naranja · Limón · Bergamota · Frutas exóticas · Frutas tropicales · Frutas blancas · Jazmín · Almizcle blanco · Vainilla · Ámbar · Maderas preciosas',
    description: "Esencia inspirada en el perfil exótico y sofisticado tipo Erba Pura. Vitalidad y frescura frutal con un fondo dulce. Producto no afiliado con la casa referenciada.",
    color: { primary: '#1A4D40', accent: '#C8A858', shadow: 'rgba(200,168,88,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-erba-pura.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-erba-pura.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-il-femme-lumin',
    name: 'Esencia inspirada en Il Femme Lumin',
    inspiredBy: 'Il Femme Lumin',
    type: 'inspirado',
    family: 'Floral Oriental',
    gender: 'Mujer',
    notes: 'Bergamota · Mandarina · Pera · Grosella negra · Flor de azahar · Jazmín · Tuberosa · Ylang-ylang · Vainilla · Praliné · Almizcle blanco · Ámbar',
    description: "Esencia inspirada en el perfil luminoso y femenino tipo Il Femme Lumin. Dulce, sofisticada y femenina. Producto no afiliado con la casa referenciada.",
    color: { primary: '#A6457A', accent: '#F2B7D1', shadow: 'rgba(242,183,209,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-il-femme-lumin.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-il-femme-lumin.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-silver-mountain',
    name: 'Esencia inspirada en Silver Mountain Water',
    inspiredBy: 'Creed Silver Mountain Water',
    type: 'inspirado',
    family: 'Cítrico Fresco',
    gender: 'Hombre',
    notes: 'Bergamota · Mandarina · Té verde · Grosellas negras · Nenúfar · Ámbar · Almizcle · Sándalo · Musgo de roble',
    description: "Esencia inspirada en el perfil fresco, puro y elegante tipo Silver Mountain Water. Cítrica con un fondo cristalino. Producto no afiliado con la casa referenciada.",
    color: { primary: '#1A3A72', accent: '#A8C8E8', shadow: 'rgba(168,200,232,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/insp-silver-mountain.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/insp-silver-mountain.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-his-confession',
    name: 'Esencia inspirada en His Confession',
    inspiredBy: 'His Confession',
    type: 'inspirado',
    family: 'Oriental Especiado',
    gender: 'Hombre',
    notes: 'Mandarina · Canela · Lavanda · Iris · Nardos · Benjuí · Ciprés · Vainilla · Haba tonka · Ámbar · Pachulí · Incienso',
    description: 'Esencia inspirada en el perfil oriental especiado masculino tipo His Confession. Intensa, seductora e inolvidable. Magnética, misteriosa y llena de confianza. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A0A0A', accent: '#D4AC58', shadow: 'rgba(212,172,88,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-his-confession.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-his-confession.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-ck-one',
    name: 'Esencia inspirada en CK One',
    inspiredBy: 'Calvin Klein One',
    type: 'inspirado',
    family: 'Cítrico Fresco',
    gender: 'Unisex',
    notes: 'Bergamota · Mandarina · Piña · Papaya · Limón · Lirio de los valles · Violeta · Nuez moscada · Rosa · Jazmín · Almizcle · Ámbar · Cedro · Musgo de roble',
    description: 'Esencia inspirada en el perfil cítrico fresco icónico tipo CK One. La esencia de la libertad. Un clásico que trasciende tiempo, géneros y estilos. Producto no afiliado con la casa referenciada.',
    color: { primary: '#2A3D2A', accent: '#A8B89E', shadow: 'rgba(168,184,158,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/insp-ck-one.jpg',
    gallery: [
      'https://nova-import-catalogo.vercel.app/images/products/insp-ck-one.jpg',
      'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png',
    ],
  },
  {
    id: 'insp-ecleire-dama',
    name: 'Esencia inspirada en Ecléire Dama',
    inspiredBy: 'Lattafa Ecléire Dama',
    type: 'inspirado',
    family: 'Floral Fresca',
    gender: 'Mujer',
    notes: 'Cítricos · Pera · Jazmín · Magnolia · Almizcle · Cedro',
    description: 'Esencia inspirada en el perfil fresco floral femenino tipo Ecléire Dama de Lattafa. Luminosa, moderna, elegancia árabe con un toque luminoso. Producto no afiliado con la casa referenciada.',
    color: { primary: '#1F3D6B', accent: '#A8C5E8', shadow: 'rgba(168,197,232,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-ecleire-dama.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-ecleire-dama.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-212-heroes-dama',
    name: 'Esencia inspirada en 212 Heroes Dama',
    inspiredBy: 'Carolina Herrera 212 Heroes Forever Young',
    type: 'inspirado',
    family: 'Floral Frutal',
    gender: 'Mujer',
    notes: 'Pera · Pomelo · Cardamomo · Pachulí · Ámbar · Almizcle',
    description: 'Esencia inspirada en el perfil floral frutal urbano tipo 212 Heroes Dama de Carolina Herrera. Energía NYC, frescura y carácter. Producto no afiliado con la casa referenciada.',
    color: { primary: '#5A8AC0', accent: '#C8D9E8', shadow: 'rgba(200,217,232,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-212-heroes-dama.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-212-heroes-dama.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-light-blue-dama',
    name: 'Esencia inspirada en Light Blue Dama',
    inspiredBy: 'Dolce & Gabbana Light Blue Pour Femme',
    type: 'inspirado',
    family: 'Cítrico Fresco',
    gender: 'Mujer',
    notes: 'Manzana · Limón siciliano · Cedro · Campanilla · Bambú · Rosa',
    description: 'Esencia inspirada en el perfil cítrico fresco mediterráneo tipo Light Blue de Dolce & Gabbana. Brisa de verano italiano en frasco. Producto no afiliado con la casa referenciada.',
    color: { primary: '#5BA3C9', accent: '#D5E8F0', shadow: 'rgba(213,232,240,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-light-blue-dama.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-light-blue-dama.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    bestseller: true,
  },
  {
    id: 'insp-musaman',
    name: 'Esencia inspirada en Musaman',
    inspiredBy: 'Lattafa Musaman',
    type: 'inspirado',
    family: 'Oriental Amaderado',
    gender: 'Unisex',
    notes: 'Maderas · Especias · Ámbar · Resinas · Almizcle',
    description: 'Esencia inspirada en el perfil oriental amaderado unisex tipo Musaman de Lattafa. Calidez árabe con un toque moderno. Producto no afiliado con la casa referenciada.',
    color: { primary: '#5A3A1F', accent: '#C8954D', shadow: 'rgba(200,149,77,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-musaman.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-musaman.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-coco-intense',
    name: 'Esencia inspirada en Coco Mademoiselle Intense',
    inspiredBy: 'Chanel Coco Mademoiselle Intense',
    type: 'inspirado',
    family: 'Oriental Floral',
    gender: 'Mujer',
    notes: 'Naranja · Bergamota · Rosa · Jazmín · Pachulí · Vainilla intensa · Tonka',
    description: 'Esencia inspirada en el perfil oriental floral intenso tipo Coco Mademoiselle Intense de Chanel. Más profunda y nocturna que la versión clásica. Producto no afiliado con la casa referenciada.',
    color: { primary: '#2A1810', accent: '#8B5E2F', shadow: 'rgba(139,94,47,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-coco-intense.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-coco-intense.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    bestseller: true,
  },
  {
    id: 'insp-bright-crystal',
    name: 'Esencia inspirada en Bright Crystal',
    inspiredBy: 'Versace Bright Crystal',
    type: 'inspirado',
    family: 'Floral Frutal',
    gender: 'Mujer',
    notes: 'Yuzu · Granada · Peonía · Magnolia · Lotus · Almizcle · Ámbar',
    description: 'Esencia inspirada en el perfil floral frutal luminoso tipo Bright Crystal de Versace. Brillo, ligereza y feminidad solar. Producto no afiliado con la casa referenciada.',
    color: { primary: '#E89BB8', accent: '#F8D5E0', shadow: 'rgba(248,213,224,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-bright-crystal.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-bright-crystal.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-island-bliss',
    name: 'Esencia inspirada en Island Bliss',
    inspiredBy: 'Armaf Island Bliss',
    type: 'inspirado',
    family: 'Acuático Floral',
    gender: 'Mujer',
    notes: 'Cítricos · Frangipani · Coco · Tiare · Almizcle blanco · Maderas claras',
    description: 'Esencia inspirada en el perfil acuático tropical tipo Island Bliss de Armaf. Vacaciones líquidas, mar y flores blancas. Producto no afiliado con la casa referenciada.',
    color: { primary: '#5DBFD4', accent: '#C8E8F0', shadow: 'rgba(200,232,240,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-island-bliss.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-island-bliss.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-9am-pour-femme',
    name: 'Esencia inspirada en 9 AM Pour Femme',
    inspiredBy: 'Afnan 9 AM Pour Femme',
    type: 'inspirado',
    family: 'Floral Frutal',
    gender: 'Mujer',
    notes: 'Mandarina · Bergamota · Jazmín · Pera · Almizcle · Vainilla',
    description: 'Esencia inspirada en el perfil floral frutal luminoso tipo 9 AM Pour Femme de Afnan. Mañanas radiantes, energía femenina cítrica. Producto no afiliado con la casa referenciada.',
    color: { primary: '#E8804A', accent: '#F5C896', shadow: 'rgba(245,200,150,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-9am-pour-femme.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-9am-pour-femme.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-very-good-girl',
    name: 'Esencia inspirada en Very Good Girl',
    inspiredBy: 'Carolina Herrera Very Good Girl',
    type: 'inspirado',
    family: 'Floral Oriental',
    gender: 'Mujer',
    notes: 'Cereza · Bayas rojas · Rosa búlgara · Tuberosa · Almendra · Pachulí · Cacao',
    description: 'Esencia inspirada en el perfil floral oriental intenso tipo Very Good Girl de Carolina Herrera. Cereza adictiva, rosa y un fondo cremoso. Producto no afiliado con la casa referenciada.',
    color: { primary: '#8B0F1F', accent: '#D43A4A', shadow: 'rgba(212,58,74,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-very-good-girl.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-very-good-girl.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    bestseller: true,
  },
  {
    id: 'insp-yum-yum',
    name: 'Esencia inspirada en Yum Yum',
    inspiredBy: 'Armaf Yum Yum',
    type: 'inspirado',
    family: 'Gourmand Dulce',
    gender: 'Mujer',
    notes: 'Algodón de azúcar · Caramelo · Frutas dulces · Vainilla · Tonka · Almizcle blanco',
    description: 'Esencia inspirada en el perfil gourmand dulce tipo Yum Yum de Armaf. Un postre líquido divertido y femenino, ideal para amantes de las notas dulces. Producto no afiliado con la casa referenciada.',
    color: { primary: '#E89AC4', accent: '#F8C8E0', shadow: 'rgba(248,200,224,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-yum-yum.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-yum-yum.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-odyssey-candee',
    name: 'Esencia inspirada en Odyssey Candee',
    inspiredBy: 'Armaf Odyssey Candee',
    type: 'inspirado',
    family: 'Gourmand Floral',
    gender: 'Mujer',
    notes: 'Frutos rojos · Vainilla · Praliné · Caramelo · Pachulí · Almizcle',
    description: 'Esencia inspirada en el perfil gourmand floral tipo Odyssey Candee de Armaf. Dulzura sofisticada en presentación coleccionable. Producto no afiliado con la casa referenciada.',
    color: { primary: '#9C66C7', accent: '#D5B8E8', shadow: 'rgba(213,184,232,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-odyssey-candee.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-odyssey-candee.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-gaultier-divine',
    name: 'Esencia inspirada en Gaultier Divine',
    inspiredBy: 'Jean Paul Gaultier Divine',
    type: 'inspirado',
    family: 'Floral Almizclada',
    gender: 'Mujer',
    notes: 'Pera · Sal marina · Nardo · Almizcle · Maderas claras · Ámbar',
    description: 'Esencia inspirada en el perfil floral salado y luminoso tipo Gaultier Divine de Jean Paul Gaultier. Sensualidad clásica, modernidad parisina. Producto no afiliado con la casa referenciada.',
    color: { primary: '#D4A78E', accent: '#F0DCC8', shadow: 'rgba(240,220,200,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-gaultier-divine.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-gaultier-divine.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-ahli-corvus-dama',
    name: 'Esencia inspirada en Ahli Corvus Dama',
    inspiredBy: 'Lattafa Ahli Corvus Dama',
    type: 'inspirado',
    family: 'Floral Frutal',
    gender: 'Mujer',
    notes: 'Frutos rojos · Rosa · Peonía · Jazmín · Almizcle · Cedro rosado',
    description: 'Esencia inspirada en el perfil floral femenino sofisticado tipo Ahli Corvus Dama de Lattafa. Elegancia árabe en clave rosa. Producto no afiliado con la casa referenciada.',
    color: { primary: '#C56A82', accent: '#F0BDC8', shadow: 'rgba(240,189,200,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-ahli-corvus-dama.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-ahli-corvus-dama.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-bharara-rose',
    name: 'Esencia inspirada en Bharara Rose',
    inspiredBy: 'Bharara Rose',
    type: 'inspirado',
    family: 'Floral Rosa',
    gender: 'Mujer',
    notes: 'Rosa búlgara · Lichi · Peonía · Frambuesa · Almizcle · Maderas suaves',
    description: 'Esencia inspirada en el perfil floral rosa femenino tipo Bharara Rose. Romanticismo árabe, rosa cremosa y duradera. Producto no afiliado con la casa referenciada.',
    color: { primary: '#E89BB0', accent: '#F8D5DE', shadow: 'rgba(248,213,222,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-bharara-rose.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-bharara-rose.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-jadore-dior',
    name: "Esencia inspirada en J'adore",
    inspiredBy: "Dior J'adore",
    type: 'inspirado',
    family: 'Floral Solar',
    gender: 'Mujer',
    notes: 'Ylang-ylang · Damasco · Rosa de Damasco · Jazmín sambac · Tuberosa · Maderas blancas',
    description: "Esencia inspirada en el perfil floral solar icónico tipo J'adore de Dior. Oro líquido, ramo de flores blancas elegante y atemporal. Producto no afiliado con la casa referenciada.",
    color: { primary: '#C9A04D', accent: '#F0DCA8', shadow: 'rgba(240,220,168,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-jadore-dior.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-jadore-dior.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    featured: true,
    bestseller: true,
  },
  {
    id: 'insp-scandal-dama',
    name: 'Esencia inspirada en Scandal',
    inspiredBy: 'Jean Paul Gaultier Scandal',
    type: 'inspirado',
    family: 'Floral Gourmand',
    gender: 'Mujer',
    notes: 'Caramelo · Miel · Mandarina · Gardenia · Pachulí · Almizcle',
    description: 'Esencia inspirada en el perfil floral gourmand seductor tipo Scandal de Jean Paul Gaultier. Miel y caramelo en clave nocturna. Producto no afiliado con la casa referenciada.',
    color: { primary: '#2A1810', accent: '#C9954D', shadow: 'rgba(201,149,77,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-scandal-dama.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-scandal-dama.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-miss-dior',
    name: 'Esencia inspirada en Miss Dior',
    inspiredBy: 'Dior Miss Dior',
    type: 'inspirado',
    family: 'Floral Chypre',
    gender: 'Mujer',
    notes: 'Rosa · Peonía · Mandarina · Lirio del valle · Almizcle · Pachulí',
    description: 'Esencia inspirada en el perfil floral chypre tipo Miss Dior. Romanticismo parisino con un fondo amaderado elegante. Producto no afiliado con la casa referenciada.',
    color: { primary: '#E899B5', accent: '#F8D8E2', shadow: 'rgba(248,216,226,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-miss-dior.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-miss-dior.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-burberry-her',
    name: 'Esencia inspirada en Burberry Her',
    inspiredBy: 'Burberry Her',
    type: 'inspirado',
    family: 'Frutal Gourmand',
    gender: 'Mujer',
    notes: 'Frutos rojos · Grosella negra · Frambuesa · Violeta · Almizcle · Maderas',
    description: 'Esencia inspirada en el perfil frutal gourmand tipo Burberry Her. Energía urbana londinense, atrevida y jugosa. Producto no afiliado con la casa referenciada.',
    color: { primary: '#C05870', accent: '#F0B8C5', shadow: 'rgba(240,184,197,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-burberry-her.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-burberry-her.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-ilmin-il-roso',
    name: 'Esencia inspirada en Ilmin Il Roso',
    inspiredBy: 'Ilmin Il Roso',
    type: 'inspirado',
    family: 'Oriental Especiado',
    gender: 'Mujer',
    notes: 'Rosa · Azafrán · Oud · Ámbar · Pachulí · Cuero',
    description: 'Esencia inspirada en el perfil oriental especiado tipo Il Roso de Ilmin. Intensidad nocturna, rosa profunda con un fondo de cuero y oud. Producto no afiliado con la casa referenciada.',
    color: { primary: '#6B1923', accent: '#C9954D', shadow: 'rgba(201,149,77,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-ilmin-il-roso.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-ilmin-il-roso.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-yara-edp',
    name: 'Esencia inspirada en Yara EDP',
    inspiredBy: 'Lattafa Yara EDP',
    type: 'inspirado',
    family: 'Floral Oriental',
    gender: 'Mujer',
    notes: 'Orquídea · Frutas tropicales · Tonka · Vainilla · Almizcle · Madera',
    description: 'Esencia inspirada en el perfil floral oriental tipo Yara EDP de Lattafa. Dulzura intensa, cremosa y duradera. Producto no afiliado con la casa referenciada.',
    color: { primary: '#C9407A', accent: '#F0B8D0', shadow: 'rgba(240,184,208,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-yara-edp.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-yara-edp.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-yara-moi',
    name: 'Esencia inspirada en Yara Moi',
    inspiredBy: 'Lattafa Yara Moi',
    type: 'inspirado',
    family: 'Floral Almizclada',
    gender: 'Mujer',
    notes: 'Jazmín · Almizcle blanco · Pera · Maderas claras · Vainilla suave',
    description: 'Esencia inspirada en el perfil floral almizclado luminoso tipo Yara Moi de Lattafa. Pureza, elegancia y un toque romántico. Producto no afiliado con la casa referenciada.',
    color: { primary: '#D4C09A', accent: '#F0E5D0', shadow: 'rgba(240,229,208,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-yara-moi.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-yara-moi.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-olympea',
    name: 'Esencia inspirada en Olympéa',
    inspiredBy: 'Paco Rabanne Olympéa',
    type: 'inspirado',
    family: 'Floral Salada',
    gender: 'Mujer',
    notes: 'Pomelo · Flor de jengibre · Sal · Vainilla · Sándalo · Almizcle',
    description: 'Esencia inspirada en el perfil floral salado mítico tipo Olympéa de Paco Rabanne. Diosa moderna, dulzura con sal marina. Producto no afiliado con la casa referenciada.',
    color: { primary: '#C9A85B', accent: '#F0DCA8', shadow: 'rgba(240,220,168,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-olympea.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-olympea.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-212-sexy',
    name: 'Esencia inspirada en 212 Sexy',
    inspiredBy: 'Carolina Herrera 212 Sexy',
    type: 'inspirado',
    family: 'Floral Oriental',
    gender: 'Mujer',
    notes: 'Bergamota · Pimienta rosa · Cardamomo · Rosa · Vainilla · Sándalo',
    description: 'Esencia inspirada en el perfil floral oriental sensual tipo 212 Sexy de Carolina Herrera. Glamour neoyorquino con un fondo especiado. Producto no afiliado con la casa referenciada.',
    color: { primary: '#B85068', accent: '#E8A8B8', shadow: 'rgba(232,168,184,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-212-sexy.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-212-sexy.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-la-vie-est-belle',
    name: 'Esencia inspirada en La Vie Est Belle',
    inspiredBy: 'Lancôme La Vie Est Belle',
    type: 'inspirado',
    family: 'Floral Gourmand',
    gender: 'Mujer',
    notes: 'Iris · Pera · Pachulí · Vainilla · Praliné · Tonka',
    description: 'Esencia inspirada en el perfil floral gourmand icónico tipo La Vie Est Belle de Lancôme. La sonrisa en frasco, dulce y elegante. Producto no afiliado con la casa referenciada.',
    color: { primary: '#E89BB5', accent: '#F8D5DE', shadow: 'rgba(248,213,222,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-la-vie-est-belle.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-la-vie-est-belle.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    bestseller: true,
  },
  {
    id: 'insp-yara-tous',
    name: 'Esencia inspirada en Yara Tous',
    inspiredBy: 'Lattafa Yara Tous',
    type: 'inspirado',
    family: 'Floral Frutal',
    gender: 'Mujer',
    notes: 'Frutas oscuras · Orquídea · Mora · Pachulí · Vainilla · Maderas',
    description: 'Esencia inspirada en el perfil floral frutal nocturno tipo Yara Tous de Lattafa. Pasión sensual, frutas oscuras y dulzura adictiva. Producto no afiliado con la casa referenciada.',
    color: { primary: '#5A2A6B', accent: '#C8A8D8', shadow: 'rgba(200,168,216,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-yara-tous.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-yara-tous.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-noble-blush',
    name: 'Esencia inspirada en Noble Blush',
    inspiredBy: 'Lattafa Noble Blush',
    type: 'inspirado',
    family: 'Floral Sofisticada',
    gender: 'Mujer',
    notes: 'Rosa damascena · Lichi · Iris · Pachulí · Almizcle blanco · Maderas suaves',
    description: 'Esencia inspirada en el perfil floral sofisticado tipo Noble Blush de Lattafa. Lujo árabe en clave rosa con un fondo distintivo. Producto no afiliado con la casa referenciada.',
    color: { primary: '#D48B9A', accent: '#F0CDD5', shadow: 'rgba(240,205,213,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-noble-blush.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-noble-blush.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-arabians-tonka',
    name: 'Esencia inspirada en Arabians Tonka',
    inspiredBy: 'Montale Arabians Tonka',
    type: 'inspirado',
    family: 'Oriental Gourmand',
    gender: 'Unisex',
    notes: 'Tonka · Dátiles · Azafrán · Ámbar · Maderas oudh · Praliné',
    description: 'Esencia inspirada en el perfil oriental gourmand unisex tipo Arabians Tonka de Montale. Misterio árabe envolvente, dulce y especiado. Producto no afiliado con la casa referenciada.',
    color: { primary: '#5A3015', accent: '#C9844A', shadow: 'rgba(201,132,74,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-arabians-tonka.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-arabians-tonka.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-lady-million-lucky',
    name: 'Esencia inspirada en Lady Million Lucky',
    inspiredBy: 'Paco Rabanne Lady Million Lucky',
    type: 'inspirado',
    family: 'Floral Frutal',
    gender: 'Mujer',
    notes: 'Frambuesa · Hoja de violeta · Rosa · Gardenia · Pachulí · Sándalo · Ámbar',
    description: 'Esencia inspirada en el perfil floral frutal lujoso tipo Lady Million Lucky de Paco Rabanne. Champaña líquida, sofisticación dorada. Producto no afiliado con la casa referenciada.',
    color: { primary: '#C9A555', accent: '#F0DCA8', shadow: 'rgba(240,220,168,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-lady-million-lucky.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-lady-million-lucky.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-la-bomba',
    name: 'Esencia inspirada en La Bomba',
    inspiredBy: 'Carolina Herrera La Bomba',
    type: 'inspirado',
    family: 'Floral Oriental',
    gender: 'Mujer',
    notes: 'Cereza · Almendra · Caramelo · Pachulí · Cacao · Vainilla',
    description: 'Esencia inspirada en el perfil floral oriental explosivo tipo La Bomba de Carolina Herrera. Sensualidad atrevida con un fondo gourmand. Producto no afiliado con la casa referenciada.',
    color: { primary: '#8B0F1F', accent: '#E84A5C', shadow: 'rgba(232,74,92,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-la-bomba.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-la-bomba.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-ysl-libre',
    name: 'Esencia inspirada en YSL Libre',
    inspiredBy: 'Yves Saint Laurent Libre',
    type: 'inspirado',
    family: 'Floral Fougère',
    gender: 'Mujer',
    notes: 'Lavanda · Azahar · Jazmín · Almizcle · Cedro · Vainilla · Ámbar',
    description: 'Esencia inspirada en el perfil floral fougère femenino tipo Libre de Yves Saint Laurent. Libertad, dualidad fresca-cálida, sensualidad parisina. Producto no afiliado con la casa referenciada.',
    color: { primary: '#C9A04D', accent: '#1A1A1A', shadow: 'rgba(201,160,77,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-ysl-libre.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-ysl-libre.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-afeef-lattafa',
    name: 'Esencia inspirada en Afeef',
    inspiredBy: 'Lattafa Afeef',
    type: 'inspirado',
    family: 'Oriental Amaderado',
    gender: 'Unisex',
    notes: 'Maderas oudh · Ámbar · Especias · Resinas · Almizcle · Cuero',
    description: 'Esencia inspirada en el perfil oriental amaderado intenso tipo Afeef de Lattafa. Profundidad árabe envolvente y duradera. Producto no afiliado con la casa referenciada.',
    color: { primary: '#1F2D5A', accent: '#C9A04D', shadow: 'rgba(201,160,77,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-afeef-lattafa.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-afeef-lattafa.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-la-belle',
    name: 'Esencia inspirada en La Belle',
    inspiredBy: 'Jean Paul Gaultier La Belle',
    type: 'inspirado',
    family: 'Floral Gourmand',
    gender: 'Mujer',
    notes: 'Pera · Jazmín · Vainilla · Ron · Maderas suaves · Tonka',
    description: 'Esencia inspirada en el perfil floral gourmand tipo La Belle de Jean Paul Gaultier. Sensualidad embriagadora, dulzura con un toque adictivo. Producto no afiliado con la casa referenciada.',
    color: { primary: '#D85A88', accent: '#F0B8D0', shadow: 'rgba(240,184,208,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-la-belle.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-la-belle.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-good-girl',
    name: 'Esencia inspirada en Good Girl',
    inspiredBy: 'Carolina Herrera Good Girl',
    type: 'inspirado',
    family: 'Floral Oriental',
    gender: 'Mujer',
    notes: 'Almendra · Café · Jazmín · Tuberosa · Cacao · Tonka · Sándalo',
    description: 'Esencia inspirada en el perfil floral oriental seductor tipo Good Girl de Carolina Herrera. La dualidad de la mujer moderna, sofisticada y atrevida. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A0A0A', accent: '#C9A04D', shadow: 'rgba(201,160,77,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-good-girl.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-good-girl.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    featured: true,
    bestseller: true,
  },
  {
    id: 'insp-good-girl-blush',
    name: 'Esencia inspirada en Good Girl Blush',
    inspiredBy: 'Carolina Herrera Good Girl Blush',
    type: 'inspirado',
    family: 'Floral Almizclada',
    gender: 'Mujer',
    notes: 'Tuberosa · Jazmín · Almendra blanca · Almizcle · Maderas claras',
    description: 'Esencia inspirada en el perfil floral almizclado luminoso tipo Good Girl Blush de Carolina Herrera. La versión luminosa y romántica del clásico. Producto no afiliado con la casa referenciada.',
    color: { primary: '#E8A8C0', accent: '#F8DCE5', shadow: 'rgba(248,220,229,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-good-girl-blush.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-good-girl-blush.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-212-vip-rose',
    name: 'Esencia inspirada en 212 VIP Rosé',
    inspiredBy: 'Carolina Herrera 212 VIP Rosé',
    type: 'inspirado',
    family: 'Floral Frutal',
    gender: 'Mujer',
    notes: 'Frambuesa · Champagne · Vodka · Rosa · Almizcle · Maderas claras',
    description: 'Esencia inspirada en el perfil floral frutal festivo tipo 212 VIP Rosé de Carolina Herrera. Champaña rosa, celebración en frasco. Producto no afiliado con la casa referenciada.',
    color: { primary: '#E8A88B', accent: '#F8DCC8', shadow: 'rgba(248,220,200,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-212-vip-rose.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-212-vip-rose.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-her-confession',
    name: 'Esencia inspirada en Her Confession',
    inspiredBy: 'Lattafa Her Confession',
    type: 'inspirado',
    family: 'Floral Oriental',
    gender: 'Mujer',
    notes: 'Mandarina · Canela · Lavanda · Iris · Nardos · Vainilla · Haba tonka · Ámbar',
    description: 'Esencia inspirada en el perfil floral oriental intenso tipo Her Confession de Lattafa. Confesión sensual, dulzura especiada y elegante. Producto no afiliado con la casa referenciada.',
    color: { primary: '#8B1A2A', accent: '#C9954D', shadow: 'rgba(201,149,77,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-her-confession.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-her-confession.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-club-de-nuit-woman',
    name: 'Esencia inspirada en Club de Nuit Woman',
    inspiredBy: 'Armaf Club de Nuit Woman',
    type: 'inspirado',
    family: 'Floral Frutal',
    gender: 'Mujer',
    notes: 'Cassis · Piña · Manzana verde · Rosa · Jazmín · Pachulí · Almizcle · Ámbar',
    description: 'Esencia inspirada en el perfil floral frutal nocturno tipo Club de Nuit Woman de Armaf. Energía sensual de noche, sofisticación frutal. Producto no afiliado con la casa referenciada.',
    color: { primary: '#0A0A0A', accent: '#C9A04D', shadow: 'rgba(201,160,77,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-club-de-nuit-woman.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-club-de-nuit-woman.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-yara-clasica',
    name: 'Esencia inspirada en Yara Clásica',
    inspiredBy: 'Lattafa Yara',
    type: 'inspirado',
    family: 'Floral Oriental',
    gender: 'Mujer',
    notes: 'Orquídea · Frutas tropicales · Tonka · Vainilla · Almizcle',
    description: 'Esencia inspirada en el perfil floral oriental viral tipo Yara de Lattafa. Dulce, cremosa, adictiva. La fragancia árabe más comentada. Producto no afiliado con la casa referenciada.',
    color: { primary: '#D85A88', accent: '#F0B8D0', shadow: 'rgba(240,184,208,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-yara-clasica.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-yara-clasica.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    featured: true,
    bestseller: true,
  },
  {
    id: 'insp-yara-candy',
    name: 'Esencia inspirada en Yara Candy',
    inspiredBy: 'Lattafa Yara Candy',
    type: 'inspirado',
    family: 'Gourmand Frutal',
    gender: 'Mujer',
    notes: 'Frambuesa · Caramelo · Praliné · Tonka · Vainilla',
    description: 'Esencia inspirada en el perfil gourmand frutal tipo Yara Candy de Lattafa. La evolución dulce y juguetona del icónico Yara. Producto no afiliado con la casa referenciada.',
    color: { primary: '#E84A8A', accent: '#F8A8C8', shadow: 'rgba(248,168,200,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-yara-candy.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-yara-candy.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    bestseller: true,
  },
  {
    id: 'insp-sense-de-laverne',
    name: 'Esencia inspirada en Sense de Laverne',
    inspiredBy: 'Georgina Sense de Laverne',
    type: 'inspirado', family: 'Floral Frutal', gender: 'Mujer',
    notes: 'Frutos rojos · Pera · Rosa · Jazmín · Almizcle · Maderas suaves',
    description: 'Esencia inspirada en el perfil floral frutal tipo Sense de Laverne Georgina. Frescura femenina sofisticada. Producto no afiliado con la casa referenciada.',
    color: { primary: '#C56B82', accent: '#F0BDC8', shadow: 'rgba(240,189,200,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-sense-de-laverne.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-sense-de-laverne.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-bleecker-street-karol-g',
    name: 'Esencia inspirada en Bleecker Street',
    inspiredBy: 'Bond No. 9 Bleecker Street (Karol G)',
    type: 'inspirado', family: 'Floral Frutal', gender: 'Unisex',
    notes: 'Frutos rojos · Pomelo · Hierbabuena · Rosa · Almizcle · Maderas claras',
    description: "Esencia inspirada en el perfil floral frutal urbano tipo Bleecker Street de Bond No. 9, edición Karol G. Energía NYC con dulzura latina. Producto no afiliado con la casa referenciada.",
    color: { primary: '#5BA3D4', accent: '#C8E0F0', shadow: 'rgba(200,224,240,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-bleecker-street-karol-g.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-bleecker-street-karol-g.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    bestseller: true,
  },
  {
    id: 'insp-baccarat-rouge-540',
    name: 'Esencia inspirada en Baccarat Rouge 540',
    inspiredBy: 'Maison Francis Kurkdjian Baccarat Rouge 540',
    type: 'inspirado', family: 'Oriental Amaderado', gender: 'Unisex',
    notes: 'Jazmín · Azafrán · Ámbar gris · Cedro · Almizcle · Resinas',
    description: 'Esencia inspirada en el perfil oriental amaderado lujoso tipo Baccarat Rouge 540 de Maison Francis Kurkdjian. Frasco de joyería con un perfume mítico. Producto no afiliado con la casa referenciada.',
    color: { primary: '#8B0F23', accent: '#C9A04D', shadow: 'rgba(201,160,77,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-baccarat-rouge-540.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-baccarat-rouge-540.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    featured: true,
    bestseller: true,
  },
  {
    id: 'insp-delina-parfums-marly',
    name: 'Esencia inspirada en Delina',
    inspiredBy: 'Parfums de Marly Delina',
    type: 'inspirado', family: 'Floral Rosa', gender: 'Mujer',
    notes: 'Rosa turca · Lichi · Ruibarbo · Bergamota · Pera · Almizcle · Cedro',
    description: 'Esencia inspirada en el perfil floral rosa de nicho tipo Delina de Parfums de Marly. Rosa elegante con un fondo cremoso. Producto no afiliado con la casa referenciada.',
    color: { primary: '#E89BB5', accent: '#F8D5DE', shadow: 'rgba(248,213,222,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-delina-parfums-marly.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-delina-parfums-marly.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-rave-now-women',
    name: 'Esencia inspirada en RAVE Now Women',
    inspiredBy: 'Paris Hilton Rave Now Women',
    type: 'inspirado', family: 'Floral Frutal', gender: 'Mujer',
    notes: 'Frutas tropicales · Frambuesa · Jazmín · Vainilla · Almizcle · Maderas claras',
    description: 'Esencia inspirada en el perfil floral frutal vibrante tipo RAVE de Paris Hilton. Energía juvenil, frescura festiva. Producto no afiliado con la casa referenciada.',
    color: { primary: '#C24C7A', accent: '#F0AAC0', shadow: 'rgba(240,170,192,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-rave-now-women.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-rave-now-women.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-perry-ellis-360-women',
    name: 'Esencia inspirada en 360° Perry Ellis',
    inspiredBy: 'Perry Ellis 360 for Women',
    type: 'inspirado', family: 'Floral Fresco', gender: 'Mujer',
    notes: 'Cítricos · Pera · Magnolia · Lirio del valle · Almizcle · Maderas suaves',
    description: 'Esencia inspirada en el perfil floral fresco tipo 360° Perry Ellis for Women. Frescura clásica americana, ligera y luminosa. Producto no afiliado con la casa referenciada.',
    color: { primary: '#8AB8D4', accent: '#D5E8F0', shadow: 'rgba(213,232,240,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-perry-ellis-360-women.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-perry-ellis-360-women.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-ralph-lauren-dama',
    name: 'Esencia inspirada en Ralph',
    inspiredBy: 'Ralph Lauren Ralph',
    type: 'inspirado', family: 'Floral Frutal', gender: 'Mujer',
    notes: 'Manzana · Mandarina · Magnolia · Boysenberry · Iris · Almizcle',
    description: 'Esencia inspirada en el perfil floral frutal juvenil tipo Ralph de Ralph Lauren. Frescura clásica americana, energía vivaz. Producto no afiliado con la casa referenciada.',
    color: { primary: '#5DB8C9', accent: '#C8E0E8', shadow: 'rgba(200,224,232,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-ralph-lauren-dama.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-ralph-lauren-dama.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-tommy-hilfiger-mujer',
    name: 'Esencia inspirada en Tommy Girl',
    inspiredBy: 'Tommy Hilfiger Tommy Girl',
    type: 'inspirado', family: 'Cítrico Floral', gender: 'Mujer',
    notes: 'Manzano silvestre · Bayas · Mandarina · Lirio · Magnolia · Sándalo',
    description: 'Esencia inspirada en el perfil cítrico floral fresco tipo Tommy Girl de Tommy Hilfiger. Frescura americana clásica, deportiva y luminosa. Producto no afiliado con la casa referenciada.',
    color: { primary: '#C03A4A', accent: '#F0A8B5', shadow: 'rgba(240,168,181,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-tommy-hilfiger-mujer.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-tommy-hilfiger-mujer.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-hugo-boss-xx',
    name: 'Esencia inspirada en Hugo Boss XX',
    inspiredBy: 'Hugo Boss Hugo XX',
    type: 'inspirado', family: 'Floral Frutal', gender: 'Mujer',
    notes: 'Manzana verde · Pomelo · Hibisco · Loto · Cedro · Almizcle',
    description: 'Esencia inspirada en el perfil floral frutal joven tipo Hugo XX de Hugo Boss. Frescura urbana, atrevida y femenina. Producto no afiliado con la casa referenciada.',
    color: { primary: '#7CB85E', accent: '#C8E0B8', shadow: 'rgba(200,224,184,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-hugo-boss-xx.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-hugo-boss-xx.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-cloud-ariana-grande',
    name: 'Esencia inspirada en Cloud',
    inspiredBy: 'Ariana Grande Cloud',
    type: 'inspirado', family: 'Gourmand Floral', gender: 'Mujer',
    notes: 'Lavanda · Pera · Bergamota · Praliné · Coco · Almizcle · Maderas blancas',
    description: 'Esencia inspirada en el perfil gourmand floral tipo Cloud de Ariana Grande. Suavidad cremosa, dulzura femenina aireada. Producto no afiliado con la casa referenciada.',
    color: { primary: '#7FB5D4', accent: '#D5E8F5', shadow: 'rgba(213,232,245,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-cloud-ariana-grande.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-cloud-ariana-grande.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    bestseller: true,
  },
  {
    id: 'insp-sweet-like-candy',
    name: 'Esencia inspirada en Sweet Like Candy',
    inspiredBy: 'Ariana Grande Sweet Like Candy',
    type: 'inspirado', family: 'Gourmand Frutal', gender: 'Mujer',
    notes: 'Frutas confitadas · Frambuesa · Pera · Algodón de azúcar · Vainilla · Almizcle',
    description: 'Esencia inspirada en el perfil gourmand frutal dulce tipo Sweet Like Candy de Ariana Grande. Dulzura adolescente adictiva, postre líquido. Producto no afiliado con la casa referenciada.',
    color: { primary: '#E8A0C8', accent: '#F8D5E5', shadow: 'rgba(248,213,229,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-sweet-like-candy.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-sweet-like-candy.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-thank-u-next',
    name: 'Esencia inspirada en Thank U Next',
    inspiredBy: 'Ariana Grande Thank U Next',
    type: 'inspirado', family: 'Floral Frutal', gender: 'Mujer',
    notes: 'Pera · Frutos rojos · Rosa · Almizcle · Macarrón · Coco · Maderas claras',
    description: 'Esencia inspirada en el perfil floral frutal pop tipo Thank U Next de Ariana Grande. Dulzura juvenil con un toque empoderador. Producto no afiliado con la casa referenciada.',
    color: { primary: '#E8A0B8', accent: '#F8D5DE', shadow: 'rgba(248,213,222,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-thank-u-next.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-thank-u-next.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-fantasy-britney',
    name: 'Esencia inspirada en Fantasy',
    inspiredBy: 'Britney Spears Fantasy',
    type: 'inspirado', family: 'Gourmand Frutal', gender: 'Mujer',
    notes: 'Lichi · Kiwi · Cupcake · Jazmín · Orquídea · Almizcle · Maderas dulces',
    description: 'Esencia inspirada en el perfil gourmand frutal pop tipo Fantasy de Britney Spears. Dulzura empalagosa, frutas y postre. Producto no afiliado con la casa referenciada.',
    color: { primary: '#B85AAC', accent: '#E8B8DC', shadow: 'rgba(232,184,220,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-fantasy-britney.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-fantasy-britney.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-hidden-fantasy-britney',
    name: 'Esencia inspirada en Hidden Fantasy',
    inspiredBy: 'Britney Spears Hidden Fantasy',
    type: 'inspirado', family: 'Oriental Frutal', gender: 'Mujer',
    notes: 'Mango · Litchi · Cacao · Jazmín · Vainilla · Almizcle · Ámbar',
    description: 'Esencia inspirada en el perfil oriental frutal nocturno tipo Hidden Fantasy de Britney Spears. Misterio dulce, frutas oscuras. Producto no afiliado con la casa referenciada.',
    color: { primary: '#6B0F4A', accent: '#C25AAC', shadow: 'rgba(194,90,172,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-fantasy-britney-2.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-fantasy-britney-2.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-can-can-paris-hilton',
    name: 'Esencia inspirada en Can Can',
    inspiredBy: 'Paris Hilton Can Can',
    type: 'inspirado', family: 'Floral Oriental', gender: 'Mujer',
    notes: 'Bergamota · Frutos rojos · Magnolia · Jazmín · Pachulí · Ámbar · Almizcle',
    description: 'Esencia inspirada en el perfil floral oriental seductor tipo Can Can de Paris Hilton. Sensualidad parisina con un toque de drama. Producto no afiliado con la casa referenciada.',
    color: { primary: '#C53888', accent: '#F0A0C8', shadow: 'rgba(240,160,200,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-can-can-paris-hilton.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-can-can-paris-hilton.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-paris-hilton-paris-dama',
    name: 'Esencia inspirada en Paris (Paris Hilton)',
    inspiredBy: 'Paris Hilton Paris',
    type: 'inspirado', family: 'Floral Oriental', gender: 'Mujer',
    notes: 'Manzana · Durazno · Mimosa · Jazmín · Ylang-ylang · Sándalo · Almizcle',
    description: 'Esencia inspirada en el perfil floral oriental clásico tipo Paris de Paris Hilton. Glamour rubio con dulzura femenina. Producto no afiliado con la casa referenciada.',
    color: { primary: '#D89CB5', accent: '#F0CDD8', shadow: 'rgba(240,205,216,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-paris-hilton-paris-dama.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-paris-hilton-paris-dama.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-omnia-coral',
    name: 'Esencia inspirada en Omnia Coral',
    inspiredBy: 'Bvlgari Omnia Coral',
    type: 'inspirado', family: 'Floral Frutal', gender: 'Mujer',
    notes: 'Pomelo · Granada · Hibisco · Loto · Almizcle blanco · Maderas claras',
    description: 'Esencia inspirada en el perfil floral frutal solar tipo Omnia Coral de Bvlgari. Energía vibrante coral, vacaciones italianas. Producto no afiliado con la casa referenciada.',
    color: { primary: '#E87A6B', accent: '#F8C8B8', shadow: 'rgba(248,200,184,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-omnia-coral.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-omnia-coral.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-omnia-crystalline',
    name: 'Esencia inspirada en Omnia Crystalline',
    inspiredBy: 'Bvlgari Omnia Crystalline',
    type: 'inspirado', family: 'Floral Acuático', gender: 'Mujer',
    notes: 'Loto · Bambú · Nuez moscada · Madera de Guayaco · Almizcle blanco',
    description: 'Esencia inspirada en el perfil floral acuático sereno tipo Omnia Crystalline de Bvlgari. Pureza, transparencia, frescura zen. Producto no afiliado con la casa referenciada.',
    color: { primary: '#B8D8E0', accent: '#E0F0F5', shadow: 'rgba(224,240,245,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-omnia-crystalline.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-omnia-crystalline.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-omnia-amethyste',
    name: 'Esencia inspirada en Omnia Amethyste',
    inspiredBy: 'Bvlgari Omnia Amethyste',
    type: 'inspirado', family: 'Floral Frutal', gender: 'Mujer',
    notes: 'Pomelo rosa · Iris pallida · Rosa · Lirio del valle · Madera de Guayaco · Almizcle',
    description: 'Esencia inspirada en el perfil floral frutal romántico tipo Omnia Amethyste de Bvlgari. Elegancia delicada, romanticismo violeta. Producto no afiliado con la casa referenciada.',
    color: { primary: '#9C7AB8', accent: '#D5C8E5', shadow: 'rgba(213,200,229,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-omnia-amethyste.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-omnia-amethyste.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-valentino-donna',
    name: 'Esencia inspirada en Valentino Donna Born in Roma',
    inspiredBy: 'Valentino Donna Born in Roma',
    type: 'inspirado', family: 'Floral Amaderado', gender: 'Mujer',
    notes: 'Bergamota · Grosella negra · Jazmín · Rosa · Vainilla · Cedro · Almizcle',
    description: 'Esencia inspirada en el perfil floral amaderado contemporáneo tipo Donna Born in Roma de Valentino. Roma moderna, elegancia atrevida. Producto no afiliado con la casa referenciada.',
    color: { primary: '#8B3A7A', accent: '#D5A8C8', shadow: 'rgba(213,168,200,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-valentino-donna.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-valentino-donna.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'insp-prada-paradoxe',
    name: 'Esencia inspirada en Prada Paradoxe',
    inspiredBy: 'Prada Paradoxe',
    type: 'inspirado', family: 'Floral Almizclada', gender: 'Mujer',
    notes: 'Neroli · Bergamota · Pera · Jazmín sambac · Almizcle blanco · Maderas suaves',
    description: 'Esencia inspirada en el perfil floral almizclado moderno tipo Prada Paradoxe. Feminidad multifacética, lujo minimalista. Producto no afiliado con la casa referenciada.',
    color: { primary: '#C9A04D', accent: '#F0DCA8', shadow: 'rgba(240,220,168,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-prada-paradoxe.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-prada-paradoxe.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
    bestseller: true,
  },
  {
    id: 'insp-la-vie-est-belle-elixir',
    name: "Esencia inspirada en La Vie Est Belle L'Elixir",
    inspiredBy: "Lancôme La Vie Est Belle L'Elixir",
    type: 'inspirado', family: 'Floral Gourmand', gender: 'Mujer',
    notes: 'Iris · Cassis · Pera · Pachulí · Vainilla intensa · Praliné · Tonka',
    description: "Esencia inspirada en el perfil floral gourmand intenso tipo La Vie Est Belle L'Elixir de Lancôme. La versión más profunda y nocturna del clásico. Producto no afiliado con la casa referenciada.",
    color: { primary: '#8B0F4A', accent: '#D45A8A', shadow: 'rgba(212,90,138,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/mujer/insp-la-vie-est-belle-elixir.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/mujer/insp-la-vie-est-belle-elixir.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'bade-al-oud-honor',
    name: "Bade'e Al Oud Honor",
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Floral Oriental',
    gender: 'Unisex',
    notes: 'Rosa · Jazmín · Oud · Sándalo · Almizcle · Ámbar',
    description: "Variación luminosa del icónico Bade'e Al Oud de Lattafa. Floral elegante con un fondo de oud refinado. Producto oriental sofisticado.",
    color: { primary: '#F0E4D8', accent: '#C9A04D', shadow: 'rgba(201,160,77,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/bade-al-oud-honor.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/bade-al-oud-honor.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'il-femme',
    name: "Il Femme",
    brand: 'Ilmin Parfums',
    type: 'arabe',
    family: 'Floral Oriental',
    gender: 'Unisex',
    notes: 'Rosa · Lichi · Frutos rojos · Pachulí · Almizcle · Maderas suaves',
    description: "Floral oriental femenino de Ilmin Parfums. Romanticismo árabe con un fondo cremoso y elegante.",
    color: { primary: '#D86B82', accent: '#F0BDC8', shadow: 'rgba(240,189,200,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/il-femme.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/il-femme.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'ahli-vega',
    name: "Ahli Vega",
    brand: 'Lattafa',
    type: 'arabe',
    family: 'Oriental Amaderado',
    gender: 'Unisex',
    notes: 'Bergamota · Cardamomo · Maderas oscuras · Ámbar · Almizcle · Pachulí',
    description: "Oriental amaderado de Lattafa con una composición moderna y sofisticada. Calidez árabe con un toque cósmico.",
    color: { primary: '#1F2D5A', accent: '#C9A04D', shadow: 'rgba(201,160,77,0.3)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/ahli-vega.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/ahli-vega.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  },
  {
    id: 'amber-rouge-premium',
    name: "Amber Rouge Premium 200ml",
    brand: 'Orientica',
    type: 'arabe',
    family: 'Oriental Amaderado',
    gender: 'Unisex',
    notes: 'Ámbar · Oud · Resinas · Maderas preciosas · Almizcle · Especias',
    description: "Versión premium de Amber Rouge en formato 200ml edición especial. Lujo oriental máximo, resinoso e intenso.",
    color: { primary: '#6B0F1F', accent: '#C9844A', shadow: 'rgba(201,132,74,0.4)' },
    variants: [
      { size: '30ml', tier: 'AA', price: 20000, stock: 20 },
      { size: '50ml', tier: 'AA', price: 30000, stock: 18 },
      { size: '75ml', tier: 'AA', price: 40000, stock: 15 },
      { size: '100ml', tier: 'AA', price: 80000, stock: 12 },
      { size: '100ml', tier: 'AAA', price: 160000, stock: 6 },
    ],
    imageUrl: 'https://nova-import-catalogo.vercel.app/images/products/arabes/amber-rouge-premium.jpg',
    gallery: ['https://nova-import-catalogo.vercel.app/images/products/arabes/amber-rouge-premium.jpg', 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'],
  }
];

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
