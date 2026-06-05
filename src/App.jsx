import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, X, ArrowRight, ChevronLeft, ChevronDown, Heart, Star, Plus, Minus, Trash2, Truck, Lock, Sparkles, MessageCircle, Filter, Award, Globe, Check, CheckCircle2, Package, MapPin, Mail, Phone, Instagram, Facebook, ExternalLink, Clock, Shield, Tag, ArrowUpRight, Info, AlertCircle } from 'lucide-react';

// ============================================================
// FONTS + GLOBAL STYLES
// ============================================================
const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=Fraunces:opsz,ital,wght@9..144,0,400;9..144,0,500;9..144,1,400&display=swap');
    .f-archivo { font-family: 'Archivo', sans-serif; }
    .f-dm { font-family: 'DM Sans', sans-serif; }
    .f-fraunces { font-family: 'Fraunces', serif; }
    .f-mono { font-family: 'Archivo', sans-serif; letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.7rem; font-weight: 600; }
    @keyframes scroll-x { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .marquee { animation: scroll-x 35s linear infinite; }
    @keyframes fadein { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .fade { animation: fadein 0.5s ease-out; }
    .grain { background-image: radial-gradient(rgba(0,0,0,0.02) 1px, transparent 1px); background-size: 3px 3px; }
  `}</style>
);

// ============================================================
// BRAND COLORS
// ============================================================
const C = {
  navy: '#2D1810',
  navyDark: '#1A0E08',
  orange: '#C9A961',
  orangeDark: '#A8893F',
  cream: '#F5EDD8',
  warm: '#F0E6CC',
  ink: '#1A1A1A',
  muted: '#6B7280',
};

// ============================================================
// LOGO ADAPTADO
// ============================================================
const Logo = ({ variant = 'header' }) => {
  if (variant === 'mark') {
    return (
      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: C.navy }}>
        <span className="f-archivo font-black text-white text-lg">N</span>
        <span className="f-archivo font-black text-lg ml-[1px]" style={{ color: C.orange }}>i</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.navy }}>
        <Globe size={18} className="text-white" strokeWidth={2.5} />
      </div>
      <div className="leading-none">
        <div className="f-archivo font-black text-xl tracking-tight leading-none">
          <span style={{ color: C.navy }}>Nova</span>
          <span style={{ color: C.orange }}> Import</span>
        </div>

      </div>
    </div>
  );
};

// ============================================================
// PRODUCT DATA
// ============================================================
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
  },

];

const BRANDS = ['Lattafa', 'Armaf', 'Afnan', 'Bharara'];
const FAMILIES = ['Oriental Dulce', 'Oriental Café', 'Oud Frutal', 'Amaderado Aromático', 'Oriental Cuero', 'Oriental Especiado', 'Aromático Fougère', 'Floral Oriental', 'Gourmand Frutal', 'Aromático Frutal', 'Aromático Fresco', 'Acuático Amaderado', 'Aromático Cítrico', 'Oriental Floral', 'Cítrico Fresco'];

const fmt = (n) => `$${n.toLocaleString('es-CO')}`;
const minPrice = (p) => Math.min(...p.variants.map(v => v.price));
const maxPrice = (p) => Math.max(...p.variants.map(v => v.price));
const totalStock = (p) => p.variants.reduce((s, v) => s + v.stock, 0);

// Wishlist (localStorage based)
const WISHLIST_KEY = 'novaimport_wishlist';
let wishlistCache = null;
let wishlistListeners = [];
const getWishlist = () => {
  if (wishlistCache !== null) return wishlistCache;
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(WISHLIST_KEY) : null;
    wishlistCache = raw ? JSON.parse(raw) : [];
  } catch (e) { wishlistCache = []; }
  return wishlistCache;
};
const isInWishlist = (id) => getWishlist().includes(id);
const toggleWishlist = (id) => {
  const list = getWishlist();
  const idx = list.indexOf(id);
  if (idx >= 0) list.splice(idx, 1);
  else list.push(id);
  wishlistCache = [...list];
  try { window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistCache)); } catch (e) {}
  wishlistListeners.forEach(fn => fn(wishlistCache));
};
const useWishlist = () => {
  const [, setTick] = useState(0);
  useEffect(() => {
    const listener = () => setTick(t => t + 1);
    wishlistListeners.push(listener);
    return () => { wishlistListeners = wishlistListeners.filter(l => l !== listener); };
  }, []);
  return getWishlist();
};

// Comments (localStorage based)
const COMMENTS_KEY = 'novaimport_comments';
let commentsCache = null;
let commentsListeners = [];
const getAllComments = () => {
  if (commentsCache !== null) return commentsCache;
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(COMMENTS_KEY) : null;
    commentsCache = raw ? JSON.parse(raw) : {};
  } catch (e) { commentsCache = {}; }
  return commentsCache;
};
const getCommentsForProduct = (id) => (getAllComments()[id] || []);
const addComment = (productId, { name, rating, text }) => {
  const all = { ...getAllComments() };
  const list = all[productId] ? [...all[productId]] : [];
  list.unshift({
    id: Date.now(),
    name: (name || 'Anónimo').trim().slice(0, 60),
    rating: Math.max(1, Math.min(5, Number(rating) || 5)),
    text: (text || '').trim().slice(0, 600),
    date: new Date().toISOString(),
  });
  all[productId] = list;
  commentsCache = all;
  try { window.localStorage.setItem(COMMENTS_KEY, JSON.stringify(all)); } catch (e) {}
  commentsListeners.forEach(fn => fn(all));
};
const useComments = (productId) => {
  const [, setTick] = useState(0);
  useEffect(() => {
    const listener = () => setTick(t => t + 1);
    commentsListeners.push(listener);
    return () => { commentsListeners = commentsListeners.filter(l => l !== listener); };
  }, []);
  return getCommentsForProduct(productId);
};

// E-commerce links — generate search URLs by product name
const SHOPIFY_BASE = 'https://ambar-perfumeria-7.myshopify.com';
const MERCADOLIBRE_BASE = 'https://listado.mercadolibre.com.co';
const buildSearchTerm = (product) => {
  const base = product.name.replace(/[·\u00b7\u2022]/g, '').replace(/\s+/g,' ').trim();
  return encodeURIComponent(base);
};
const getMercadoLibreUrl = (product) => product.mercadoLibreUrl || `${MERCADOLIBRE_BASE}/${buildSearchTerm(product)}`;
const getShopifyUrl = (product) => `${SHOPIFY_BASE}/products/${product.id}`;

// ============================================================
// PRODUCT IMAGE — Photographic style on white
// ============================================================
const ProductImage = ({ product, aspect = 'aspect-square', size = 'md' }) => {
  const { primary, accent, shadow } = product.color;
  const isInsp = product.type === 'inspirado';
  
  // If real product image URL is provided, use it instead of CSS bottle
  if (product.imageUrl && product.imageUrl.trim() !== '') {
    return (
      <div className={`relative ${aspect} bg-white overflow-hidden flex items-center justify-center`}>
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse at 50% 70%, ${primary}08 0%, transparent 65%)`
        }} />
        <img
          src={product.imageUrl}
          alt={product.name}
          className="relative max-w-[85%] max-h-[85%] object-contain"
          style={{ filter: `drop-shadow(0 20px 30px ${shadow})` }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {isInsp && (
          <div className="absolute top-2 right-2 px-2 py-0.5 f-archivo text-[8px] tracking-[0.18em] font-bold uppercase" style={{ background: C.navy, color: 'white' }}>
            Esencia inspirada
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className={`relative ${aspect} bg-white overflow-hidden flex items-end justify-center`}>
      {/* Background subtle gradient */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at 50% 70%, ${primary}10 0%, transparent 65%)`
      }} />
      {/* Floor shadow ellipse */}
      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[60%] h-3 rounded-full blur-md" style={{ background: shadow }} />
      {/* "Esencia inspirada" badge */}
      {isInsp && (
        <div className="absolute top-2 right-2 px-2 py-0.5 f-archivo text-[8px] tracking-[0.18em] font-bold uppercase z-10" style={{ background: C.navy, color: 'white' }}>
          Esencia inspirada
        </div>
      )}
      
      {/* Bottle */}
      <div className="relative w-[42%] h-[78%] mb-[10%]" style={{ filter: `drop-shadow(0 25px 35px ${shadow})` }}>
        {/* Cap */}
        <div className="absolute top-0 left-[20%] right-[20%] h-[12%] rounded-t-sm" style={{
          background: `linear-gradient(180deg, #2A2520 0%, #1A1612 50%, #0A0805 100%)`,
        }} />
        {/* Cap detail line */}
        <div className="absolute left-[18%] right-[18%] h-[1.5%]" style={{ top: '11%', background: '#0a0805' }} />
        {/* Neck */}
        <div className="absolute left-[28%] right-[28%] h-[8%]" style={{
          top: '12.5%',
          background: `linear-gradient(180deg, ${primary}90 0%, ${primary}70 100%)`,
        }} />
        {/* Shoulder */}
        <div className="absolute left-[5%] right-[5%] h-[6%]" style={{
          top: '20%',
          background: `linear-gradient(180deg, ${accent} 0%, ${primary} 100%)`,
          clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)',
        }} />
        {/* Body */}
        <div className="absolute left-0 right-0 rounded-b-sm" style={{
          top: '25%',
          bottom: 0,
          background: `linear-gradient(135deg, ${primary} 0%, ${accent} 35%, ${primary} 60%, ${accent}CC 100%)`,
        }}>
          {/* Highlight strip left */}
          <div className="absolute left-[8%] top-[5%] bottom-[5%] w-[8%]" style={{
            background: `linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.05) 100%)`,
            filter: 'blur(2px)',
          }} />
          {/* Highlight right */}
          <div className="absolute right-[12%] top-[10%] bottom-[10%] w-[3%]" style={{
            background: `linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)`,
            filter: 'blur(1px)',
          }} />
          {/* Label */}
          <div className="absolute left-[12%] right-[12%] top-[35%] bottom-[30%] flex flex-col items-center justify-center text-center px-1" style={{
            background: 'linear-gradient(180deg, #FAFAF7 0%, #F0EDE6 100%)',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
          }}>
            <div className="f-archivo font-black text-[7px] tracking-[0.15em]" style={{ color: C.navy }}>NOVA</div>
            <div className="f-archivo font-bold text-[5px] tracking-[0.2em]" style={{ color: C.orange }}>IMPORT</div>
            <div className="w-3 border-t my-[3px]" style={{ borderColor: primary, opacity: 0.4 }} />
            <div className="f-fraunces italic text-[7px] leading-tight" style={{ color: '#1A1612' }}>
              {isInsp ? product.inspiredBy?.replace('tipo ', '') : product.name}
            </div>
            <div className="f-archivo text-[4px] tracking-[0.2em] mt-[1px]" style={{ color: '#6B5A4A' }}>EAU DE PARFUM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MARQUEE
// ============================================================
const Marquee = () => (
  <div className="overflow-hidden text-white" style={{ background: C.navy }}>
    <div className="flex marquee whitespace-nowrap py-2.5">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-10 px-5 f-archivo text-xs font-medium tracking-wide">
          <span>✈ IMPORTAMOS DIRECTO DESDE DUBÁI</span>
          <span style={{ color: C.orange }}>·</span>
          <span>📦 ENVÍO GRATIS DESDE $150.000</span>
          <span style={{ color: C.orange }}>·</span>
          <span>💳 PAGA CON ADDI HASTA EN 4 CUOTAS</span>
          <span style={{ color: C.orange }}>·</span>
          <span>🇦🇪 MARCAS ÁRABES 100% ORIGINALES</span>
          <span style={{ color: C.orange }}>·</span>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================
// HEADER
// ============================================================
const Header = ({ onNavigate, currentView, cartCount, onCartOpen, searchQuery }) => {
  const [open, setOpen] = useState(false);
  const wishlist = useWishlist();
  const wishlistCount = wishlist.length;
  const links = [
    { id: 'catalog-bebe', label: 'Bebé' },
    { id: 'catalog-mascotas', label: 'Mascotas' },
    { id: 'catalog-hogar', label: 'Hogar' },
    { id: 'catalog-perfumeria', label: 'Perfumería' },
    { id: 'catalog-bestsellers', label: 'Más vendidos', highlight: true },
    { id: 'maison', label: 'Nosotros' },
  ];
  
  return (
    <>
      <Marquee />
      <header className="sticky top-0 z-40 bg-white border-b" style={{ borderColor: '#E5E5E0' }}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-20 flex items-center gap-6">
          <button className="lg:hidden" onClick={() => setOpen(true)}>
            <Menu size={22} style={{ color: C.navy }} />
          </button>
          
          <button onClick={() => onNavigate('home')} className="flex-shrink-0">
            <Logo />
          </button>
          
          <nav className="hidden lg:flex items-center gap-7 ml-6 f-archivo text-sm font-semibold">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => onNavigate(l.id)}
                className={`hover:opacity-70 transition-opacity ${l.highlight ? 'flex items-center gap-1.5' : ''}`}
                style={{ color: l.highlight ? C.orange : C.ink }}
              >
                {l.highlight && <Star size={12} fill={C.orange} />}
                {l.label}
              </button>
            ))}
          </nav>
          
          <form
            onSubmit={(e) => { e.preventDefault(); const q = (e.target.q.value || '').trim(); if (q) onNavigate({ view: 'search', q }); }}
            className="flex-1 max-w-md relative hidden md:block ml-4"
          >
            <input
              name="q"
              defaultValue={searchQuery || ''}
              className="w-full bg-stone-100 px-4 py-2.5 pl-10 text-sm rounded-full focus:outline-none focus:ring-2 f-dm"
              placeholder="Buscar perfume, marca, familia…"
            />
            <Search size={16} className="absolute left-3.5 top-3 text-stone-400" />
          </form>
          
          <div className="flex gap-4 items-center" style={{ color: C.navy }}>
            <a
              href={`https://wa.me/573173641851?text=${encodeURIComponent('Hola Ámbar Perfumería, quiero hacer seguimiento de mi pedido. Mi número es: ')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block"
              title="Seguir pedido por WhatsApp"
            >
              <Package size={20} />
            </a>
            <button onClick={() => onNavigate('wishlist')} className="relative" title="Favoritos">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold f-archivo" style={{ background: C.orange }}>
                  {wishlistCount}
                </span>
              )}
            </button>
            <button onClick={onCartOpen} className="relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold f-archivo" style={{ background: C.orange }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Subnav */}
        <div className="border-t hidden lg:block" style={{ borderColor: '#E5E5E0', background: '#FAFAF7' }}>
          <div className="max-w-[1400px] mx-auto px-8 py-2.5 flex gap-6 text-xs f-archivo font-medium overflow-x-auto" style={{ color: C.muted }}>
            <span className="flex items-center gap-1.5"><Truck size={12} /> Envío 24-72h a todo Colombia</span>
            <span className="flex items-center gap-1.5"><Shield size={12} /> Garantía de autenticidad</span>
            <span className="flex items-center gap-1.5"><Lock size={12} /> Pago contraentrega · Nequi · Transferencia</span>
            <span className="flex items-center gap-1.5"><MessageCircle size={12} /> Atención por WhatsApp</span>
          </div>
        </div>
      </header>
      
      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: '#E5E5E0' }}>
            <Logo />
            <button onClick={() => setOpen(false)}><X size={22} /></button>
          </div>
          <nav className="p-6 space-y-1 f-archivo">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => { onNavigate(l.id); setOpen(false); }}
                className="block w-full text-left py-3 text-xl font-bold border-b"
                style={{ borderColor: '#F0EDE6', color: l.highlight ? C.orange : C.ink }}
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

// ============================================================
// PRODUCT CARD
// ============================================================
const ProductCard = ({ product, onClick }) => {
  useWishlist(); // subscribe to wishlist changes
  const stock = totalStock(product);
  const min = minPrice(product);
  const hasRange = product.variants.length > 1;
  
  return (
    <div className="group cursor-pointer bg-white" onClick={onClick}>
      <div className="relative">
        <ProductImage product={product} aspect="aspect-square" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.bestseller && (
            <span className="text-white px-2 py-1 text-[10px] f-archivo font-black tracking-wider" style={{ background: C.orange }}>
              BESTSELLER
            </span>
          )}
          {product.type === 'arabe' && (
            <span className="text-white px-2 py-1 text-[10px] f-archivo font-bold tracking-wider" style={{ background: C.navy }}>
              ÁRABE ORIGINAL
            </span>
          )}
          {product.type === 'inspirado' && product.featured && (
            <span className="bg-stone-900 text-white px-2 py-1 text-[10px] f-archivo font-bold tracking-wider">
              DESTACADO
            </span>
          )}
          {(product.type === 'bebe' || product.type === 'mascotas' || product.type === 'hogar') && product.featured && (
            <span className="bg-stone-900 text-white px-2 py-1 text-[10px] f-archivo font-bold tracking-wider">
              {product.type === 'bebe' ? 'BEBÉ' : product.type === 'mascotas' ? 'MASCOTAS' : 'HOGAR'}
            </span>
          )}
        </div>
        
        {/* Stock indicator */}
        {stock < 10 && stock > 0 && (
          <span className="absolute top-3 right-3 bg-amber-50 text-amber-800 px-2 py-1 text-[10px] f-archivo font-bold border border-amber-300">
            ÚLTIMAS {stock}
          </span>
        )}
        {stock === 0 && (
          <span className="absolute top-3 right-3 bg-stone-100 text-stone-500 px-2 py-1 text-[10px] f-archivo font-bold border">
            AGOTADO
          </span>
        )}
        
        {/* Heart - Wishlist */}
        <button
          className="absolute bottom-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          aria-label={isInWishlist(product.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <Heart
            size={14}
            strokeWidth={2}
            fill={isInWishlist(product.id) ? C.orange : 'none'}
            style={{ color: isInWishlist(product.id) ? C.orange : C.navy }}
          />
        </button>
      </div>
      
      <div className="pt-3 px-1 space-y-1">
        <div className="flex items-center gap-2 text-[10px] f-archivo font-bold tracking-wider" style={{ color: C.muted }}>
          {product.type === 'arabe' ? (
            <span style={{ color: C.navy }}>{product.brand.toUpperCase()}</span>
          ) : product.type === 'inspirado' ? (
            <span style={{ color: C.orange }}>ÁMBAR PERFUMERÍA</span>
          ) : (
            <span style={{ color: C.orange }}>ÁMBAR PERFUMERÍA</span>
          )}
          <span>·</span>
          <span>{product.family.toUpperCase()}</span>
        </div>
        <h3 className="f-archivo font-bold text-base leading-tight" style={{ color: C.ink }}>
          {product.name}
        </h3>
        <p className="text-xs line-clamp-1 f-dm" style={{ color: C.muted }}>{product.notes}</p>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="f-archivo font-black text-lg" style={{ color: C.ink }}>{fmt(min)}</span>
          {hasRange && <span className="f-dm text-xs" style={{ color: C.muted }}>desde · {product.variants[0].size}</span>}
        </div>
        <div className="flex items-center gap-1 text-xs pt-1">
          <Star size={11} fill={C.orange} style={{ color: C.orange }} />
          <span className="f-archivo font-bold">{(4.6 + Math.random() * 0.3).toFixed(1)}</span>
          <span className="f-dm" style={{ color: C.muted }}>({Math.floor(Math.random() * 150) + 30})</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// HOME
// ============================================================
const Home = ({ onNavigate, onSelectProduct }) => {
  const arabes = PRODUCTS.filter(p => p.type === 'arabe');
  const inspirados = PRODUCTS.filter(p => p.type === 'inspirado');
  const bestsellers = PRODUCTS.filter(p => p.bestseller);
  
  return (
    <main className="bg-white f-dm">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyDark} 100%)` }}>
        <div className="absolute inset-0 opacity-30" style={{
          background: `radial-gradient(circle at 80% 50%, ${C.orange}40 0%, transparent 50%)`
        }} />
        <div className="absolute inset-0 grain opacity-50" />
        
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full f-archivo text-xs font-bold tracking-wider" style={{ background: 'rgba(245,130,32,0.2)', color: C.orange }}>
              <Sparkles size={12} /> IMPORTACIÓN DIRECTA
            </div>
            <h1 className="f-archivo font-black text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              Productos<br />que se<br />
              <span style={{ color: C.orange }}>venden solos.</span>
            </h1>
            <p className="text-white/80 max-w-md text-lg leading-relaxed">
              Importamos tendencias, perfumería y productos seleccionados con calidad garantizada y envíos rápidos a toda Colombia.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={() => onNavigate('catalog')} className="px-7 py-4 f-archivo font-bold text-sm tracking-wide flex items-center gap-3 hover:scale-105 transition-transform" style={{ background: C.orange, color: 'white' }}>
                EXPLORAR CATÁLOGO <ArrowRight size={16} />
              </button>
              <button onClick={() => onNavigate('catalog-bestsellers')} className="border-2 border-white text-white px-7 py-4 f-archivo font-bold text-sm tracking-wide hover:bg-white hover:text-stone-900 transition-colors">
                LOS MÁS VENDIDOS
              </button>
            </div>
            <div className="flex gap-6 pt-4 text-sm">
              <div className="flex items-center gap-2"><Star size={14} fill={C.orange} style={{ color: C.orange }} /><span><strong className="f-archivo">4.9</strong> · +5.000 clientes</span></div>
              <div className="flex items-center gap-2"><Check size={14} style={{ color: C.orange }} /><span>+5.000 clientes</span></div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white"><ProductImage product={PRODUCTS[0]} aspect="aspect-[3/4]" /></div>
                <div className="bg-white"><ProductImage product={PRODUCTS[7]} aspect="aspect-square" /></div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="bg-white"><ProductImage product={PRODUCTS[3]} aspect="aspect-square" /></div>
                <div className="bg-white"><ProductImage product={PRODUCTS[9]} aspect="aspect-[3/4]" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust strip */}
      <section className="border-b" style={{ borderColor: '#E5E5E0', background: C.cream }}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { icon: Truck, title: 'Despachos nacionales rápidos', sub: 'Entregas de 24 a 72 horas en ciudades principales.' },
            { icon: Award, title: 'Productos seleccionados', sub: 'Importamos referencias con alta demanda y excelente relación calidad-precio.' },
            { icon: Shield, title: 'Compra con confianza', sub: 'Pagos seguros y soporte directo por WhatsApp.' },
            { icon: Sparkles, title: 'Nuevos productos constantemente', sub: 'Actualizamos el catálogo con tendencias y productos virales.' },
          ].map((t, i) => {
            const Icon = t.icon;
            return (
              <div key={i} className="flex items-center justify-center gap-3">
                <Icon size={28} strokeWidth={1.5} style={{ color: C.orange }} />
                <div className="text-left">
                  <div className="f-archivo font-bold text-sm">{t.title}</div>
                  <div className="text-xs" style={{ color: C.muted }}>{t.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Categories grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="f-archivo font-black text-3xl lg:text-4xl mb-2">Encuentra tu próxima firma</h2>
            <p className="text-stone-600">Filtrado por tu estilo</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'catalog-bebe', label: 'BEBÉ', sub: 'Vajilla · Juguetes · Esenciales', color: '#A8475C' },
              { id: 'catalog-mascotas', label: 'MASCOTAS', sub: 'Entrenamiento · Cuidado', color: '#2A6B4A' },
              { id: 'catalog-hogar', label: 'HOGAR', sub: 'Organización · Baño · Cocina', color: C.navy },
              { id: 'catalog-perfumeria', label: 'PERFUMERÍA', sub: 'Árabes · Inspirados premium', color: C.orange },
            ].map(c => (
              <button key={c.id} onClick={() => onNavigate(c.id)} className="aspect-[4/5] lg:aspect-[3/4] relative overflow-hidden group" style={{ background: c.color }}>
                <div className="absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(180deg, ${c.color}DD 0%, ${c.color} 100%)` }} />
                <div className="absolute inset-0 grain opacity-30" />
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <div className="f-archivo font-black text-2xl lg:text-3xl tracking-tight mb-1">{c.label}</div>
                  <div className="text-xs lg:text-sm opacity-80 mb-3">{c.sub}</div>
                  <div className="flex items-center gap-2 f-archivo font-bold text-xs">
                    EXPLORAR <ArrowRight size={14} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Bestsellers */}
      <section className="py-12 lg:py-16" style={{ background: C.cream }}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="f-mono mb-2" style={{ color: C.orange }}>★ MÁS VENDIDOS</div>
              <h2 className="f-archivo font-black text-3xl lg:text-4xl">Los favoritos del mes</h2>
            </div>
            <button onClick={() => onNavigate('catalog-bestsellers')} className="hidden md:flex items-center gap-2 f-archivo font-bold text-sm hover:gap-3 transition-all" style={{ color: C.navy }}>
              Ver todos <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {bestsellers.slice(0, 4).map(p => <ProductCard key={p.id} product={p} onClick={() => onSelectProduct(p.id)} />)}
          </div>
        </div>
      </section>
      
      {/* Brands Strip - Árabes */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <div className="f-mono mb-3" style={{ color: C.navy }}>🇦🇪 MARCAS ÁRABES ORIGINALES</div>
            <h2 className="f-archivo font-black text-3xl lg:text-4xl mb-3">Importados directo desde Dubái</h2>
            <p style={{ color: C.muted }}>Lattafa, Armaf, Afnan, Bharara. Las casas árabes más reconocidas del mundo, con certificado de autenticidad.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8 mb-10">
            {BRANDS.map(b => (
              <div key={b} className="px-6 py-3 border-2 rounded-full f-archivo font-bold" style={{ borderColor: C.navy, color: C.navy }}>{b}</div>
            ))}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {arabes.slice(0, 4).map(p => <ProductCard key={p.id} product={p} onClick={() => onSelectProduct(p.id)} />)}
          </div>
          <div className="text-center mt-8">
            <button onClick={() => onNavigate('catalog-arabe')} className="px-7 py-3.5 f-archivo font-bold text-sm tracking-wide border-2 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-colors" style={{ borderColor: C.ink, color: C.ink }}>
              VER TODOS LOS ÁRABES
            </button>
          </div>
        </div>
      </section>
      
      {/* CATÁLOGO COMPLETO — Ámbar Perfumería Esencias Inspiradas */}
      <section className="py-16 lg:py-20" style={{ background: C.warm }}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          
          {/* Section header */}
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <div className="f-mono mb-3" style={{ color: C.orange }}>★ ÁMBAR PERFUMERÍA · CATÁLOGO COMPLETO</div>
            <h2 className="f-archivo font-black text-3xl lg:text-5xl mb-4">Esencias Inspiradas</h2>
            <p className="text-base lg:text-lg" style={{ color: C.muted }}>
              Nuestra línea propia de fragancias con perfiles olfativos inspirados en grandes casas de perfumería. Disponibles en 30, 50, 75 y 100 ml. Dos calidades: <strong>AA estándar</strong> y <strong>AAA premium</strong>.
            </p>
          </div>
          
          {/* LEGAL DISCLAIMER — prominent banner */}
          <div className="max-w-3xl mx-auto mb-10 p-5 lg:p-6 border-2 flex items-start gap-3" style={{ borderColor: C.navy, background: 'rgba(27,58,111,0.04)' }}>
            <Info size={20} className="shrink-0 mt-0.5" style={{ color: C.navy }} strokeWidth={2} />
            <div className="text-xs lg:text-sm leading-relaxed" style={{ color: C.ink }}>
              <strong className="f-archivo tracking-wide" style={{ color: C.navy }}>AVISO IMPORTANTE.</strong>{' '}
              Los productos de la línea <strong>Ámbar Perfumería</strong> son <strong>esencias inspiradas</strong> en perfiles olfativos de fragancias comerciales reconocidas. <strong>No son los perfumes originales</strong>. No están afiliados, autorizados ni producidos por las casas matrices referenciadas. Las marcas mencionadas son propiedad de sus respectivos titulares y se citan únicamente como referencia descriptiva del perfil olfativo del producto.
            </div>
          </div>
          
          {/* Full inspirados grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {inspirados.map(p => <ProductCard key={p.id} product={p} onClick={() => onSelectProduct(p.id)} />)}
          </div>
          
          <div className="text-center mt-10">
            <button onClick={() => onNavigate('catalog-inspirado')} className="px-7 py-3.5 f-archivo font-bold text-sm tracking-wide border-2 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-colors" style={{ borderColor: C.ink, color: C.ink }}>
              FILTRAR Y EXPLORAR LÍNEA COMPLETA
            </button>
          </div>
        </div>
      </section>
      
    </main>
  );
};

// ============================================================
// CATALOG
// ============================================================
const DEFAULT_FILTERS = { gender: 'todos', type: 'todos', brand: 'todos', family: 'todos' };

const Catalog = ({ initialFilter = {}, onSelectProduct, title = 'Catálogo completo' }) => {
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    gender: initialFilter.gender || 'todos',
    type: initialFilter.type || 'todos',
    ...initialFilter,
  });
  const [sort, setSort] = useState('relevance');
  const [showAllOverride, setShowAllOverride] = useState(false);

  // Available filter values are computed dynamically from the products that match the lock filters (bestseller/typeIn)
  // so the user only sees options that will actually return results.
  const lockedProducts = PRODUCTS.filter(p => {
    if (filters.bestseller && !p.bestseller) return false;
    if (filters.typeIn && Array.isArray(filters.typeIn) && !filters.typeIn.includes(p.type)) return false;
    return true;
  });

  // Extrae la marca de un producto: usa p.brand si existe, si no extrae de p.inspiredBy
  // Reconoce marcas compuestas (Jean Paul Gaultier, Yves Saint Laurent, etc.)
  const KNOWN_COMPOUND_BRANDS = [
    'Jean Paul Gaultier', 'Yves Saint Laurent', 'Paco Rabanne', 'Carolina Herrera',
    'Maison Francis Kurkdjian', 'Parfums de Marly', 'Bond No. 9', 'Hugo Boss',
    'Ralph Lauren', 'Britney Spears', 'Ariana Grande', 'Paris Hilton',
    'Perry Ellis', 'Tommy Hilfiger', 'Dolce & Gabbana',
  ];
  const extractBrand = (p) => {
    if (p.brand) return p.brand;
    if (!p.inspiredBy) return null;
    for (const b of KNOWN_COMPOUND_BRANDS) {
      if (p.inspiredBy.startsWith(b)) return b;
    }
    return p.inspiredBy.split(' ')[0];
  };
  const availableBrands = [...new Set(lockedProducts.map(extractBrand).filter(Boolean))].sort();
  const availableFamilies = [...new Set(lockedProducts.map(p => p.family).filter(Boolean))];
  const availableGenders = [...new Set(lockedProducts.map(p => p.gender).filter(Boolean))];

  const filterDefs = [
    { key: 'gender', label: 'Género', opts: ['todos', ...availableGenders] },
    { key: 'type', label: 'Tipo', opts: [
      { v: 'todos', l: 'Todos' },
      { v: 'arabe', l: 'Marcas árabes' },
      { v: 'inspirado', l: 'Inspirados' },
      { v: 'bebe', l: 'Bebé' },
      { v: 'mascotas', l: 'Mascotas' },
      { v: 'hogar', l: 'Hogar' },
    ]},
    { key: 'brand', label: 'Marca', opts: ['todos', ...availableBrands] },
    { key: 'family', label: 'Familia', opts: ['todos', ...availableFamilies] },
  ];

  const activeFiltersCount = filterDefs.reduce((n, f) => n + (filters[f.key] !== 'todos' ? 1 : 0), 0);

  // showAllOverride bypasses initialFilter — useful for nav links that landed on a sub-catalog
  const baseProducts = showAllOverride ? PRODUCTS : lockedProducts;

  let products = baseProducts.filter(p => {
    if (filters.gender !== 'todos' && p.gender !== filters.gender && p.gender !== 'Unisex') return false;
    if (filters.type !== 'todos' && p.type !== filters.type) return false;
    if (filters.brand !== 'todos' && extractBrand(p) !== filters.brand) return false;
    if (filters.family !== 'todos' && p.family !== filters.family) return false;
    return true;
  });

  if (sort === 'price-asc') products = [...products].sort((a, b) => minPrice(a) - minPrice(b));
  if (sort === 'price-desc') products = [...products].sort((a, b) => maxPrice(b) - maxPrice(a));

  const resetAll = () => {
    setFilters(DEFAULT_FILTERS);
    setShowAllOverride(true);
  };
  
  return (
    <main className="bg-white min-h-screen f-dm">
      <section className="py-10 lg:py-12 border-b" style={{ background: C.cream, borderColor: '#E5E5E0' }}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="f-mono mb-3" style={{ color: C.orange }}>EL CATÁLOGO</div>
          <h1 className="f-archivo font-black text-4xl lg:text-5xl mb-3">{title}</h1>
          <p style={{ color: C.muted }}>
            {products.length} {products.length > 0 && products.every(p => p.type === 'arabe' || p.type === 'inspirado') ? 'fragancias' : 'productos'}
            {activeFiltersCount > 0 ? ' filtrados' : ' disponibles'} · Envío a toda Colombia
          </p>
        </div>
      </section>
      
      {/* Filters */}
      <section className="border-b bg-white" style={{ borderColor: '#E5E5E0' }}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-4 flex flex-wrap items-center gap-2 lg:gap-3">
          <div className="w-full lg:w-auto flex items-center gap-2 f-archivo text-xs font-bold mr-2" style={{ color: C.muted }}>
            <Filter size={14} /> FILTROS
            <button
              onClick={resetAll}
              className="ml-auto lg:ml-3 f-archivo text-xs font-bold px-3 py-1.5 rounded-full text-white transition-colors hover:opacity-90"
              style={{ background: C.navy }}
            >
              MOSTRAR TODOS
            </button>
          </div>
          <div className="flex gap-2 lg:gap-3 overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-wrap w-full lg:w-auto pb-1 lg:pb-0">
            {filterDefs.map(f => {
              const isActive = filters[f.key] !== 'todos';
              return (
                <div key={f.key} className="relative flex-shrink-0">
                  <select
                    value={filters[f.key]}
                    onChange={(e) => setFilters({ ...filters, [f.key]: e.target.value })}
                    className="appearance-none f-archivo text-xs lg:text-sm font-semibold pl-3 lg:pl-4 pr-8 lg:pr-9 py-2 border-2 rounded-full cursor-pointer transition-colors"
                    style={{
                      borderColor: isActive ? C.orange : '#D5D5D0',
                      background: isActive ? '#FFF7ED' : 'white',
                      color: isActive ? C.orange : C.ink,
                    }}
                  >
                    {f.opts.map(o => {
                      const v = typeof o === 'object' ? o.v : o;
                      const l = typeof o === 'object' ? o.l : o;
                      return <option key={v} value={v}>{v === 'todos' ? `${f.label}: Todos` : `${f.label}: ${l}`}</option>;
                    })}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-2.5 pointer-events-none" style={{ color: isActive ? C.orange : C.ink }} />
                </div>
              );
            })}

            {activeFiltersCount > 0 && (
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="f-archivo text-xs font-bold underline hover:opacity-70 whitespace-nowrap self-center"
                style={{ color: C.muted }}
              >
                Limpiar ({activeFiltersCount})
              </button>
            )}
          </div>

          <div className="lg:ml-auto relative w-full lg:w-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none f-archivo text-xs lg:text-sm font-semibold pl-3 lg:pl-4 pr-9 py-2 border rounded-full bg-white cursor-pointer w-full lg:w-auto"
              style={{ borderColor: '#D5D5D0' }}
            >
              <option value="relevance">Ordenar: Relevancia</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>
      </section>
      
      {/* Grid */}
      <section className="py-10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {products.map(p => <ProductCard key={p.id} product={p} onClick={() => onSelectProduct(p.id)} />)}
          </div>
          {products.length === 0 && (
            <div className="text-center py-20 f-dm" style={{ color: C.muted }}>
              No hay productos con esos filtros. <button onClick={resetAll} className="underline" style={{ color: C.navy }}>Mostrar todos los productos</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};


// ============================================================
// REVIEWS BLOCK
// ============================================================
const ReviewsBlock = ({ productId }) => {
  const comments = useComments(productId);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);

  const avg = comments.length > 0
    ? (comments.reduce((s, c) => s + c.rating, 0) / comments.length).toFixed(1)
    : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(productId, { name, rating, text });
    setText('');
    setName('');
    setRating(5);
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="grid sm:grid-cols-2 gap-6 items-start">
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-5 border space-y-3" style={{ borderColor: '#E5E5E0' }}>
          <div className="f-archivo font-bold text-sm" style={{ color: C.orange }}>DEJA TU RESEÑA</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre (opcional)"
            maxLength={60}
            className="w-full border px-3 py-2 text-sm f-dm focus:outline-none focus:border-orange-500"
            style={{ borderColor: '#D5D5D0' }}
          />
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(s => (
              <button
                type="button"
                key={s}
                onClick={() => setRating(s)}
                aria-label={`${s} estrellas`}
                className="p-0.5"
              >
                <Star size={20} fill={s <= rating ? C.orange : 'none'} style={{ color: C.orange }} />
              </button>
            ))}
            <span className="text-xs f-archivo font-bold ml-2" style={{ color: C.muted }}>{rating}/5</span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Cuéntanos qué te pareció..."
            maxLength={600}
            rows={4}
            className="w-full border px-3 py-2 text-sm f-dm focus:outline-none focus:border-orange-500 resize-none"
            style={{ borderColor: '#D5D5D0' }}
          />
          <button
            type="submit"
            disabled={!text.trim() || sent}
            className="w-full py-3 f-archivo font-bold text-sm tracking-wide text-white transition-colors disabled:opacity-50"
            style={{ background: sent ? '#10B981' : C.navy }}
          >
            {sent ? '¡GRACIAS POR TU RESEÑA!' : 'PUBLICAR RESEÑA'}
          </button>
          <p className="text-[11px] f-dm" style={{ color: C.muted }}>
            Tus reseñas se guardan en tu navegador y son visibles para ti. Pronto sincronizaremos con nuestra base de datos.
          </p>
        </form>

        {/* Summary */}
        <div className="space-y-4">
          {avg !== null ? (
            <div className="bg-white p-5 border" style={{ borderColor: '#E5E5E0' }}>
              <div className="flex items-baseline gap-2">
                <span className="f-archivo font-black text-4xl">{avg}</span>
                <span className="text-sm" style={{ color: C.muted }}>/5</span>
              </div>
              <div className="flex items-center gap-1 my-2">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={16} fill={s <= Math.round(avg) ? C.orange : 'none'} style={{ color: C.orange }} />
                ))}
              </div>
              <p className="text-xs f-dm" style={{ color: C.muted }}>
                Basado en {comments.length} {comments.length === 1 ? 'reseña' : 'reseñas'}
              </p>
            </div>
          ) : (
            <div className="bg-white p-5 border text-center" style={{ borderColor: '#E5E5E0' }}>
              <Sparkles size={28} className="mx-auto mb-2" style={{ color: C.orange }} />
              <p className="f-archivo font-bold">Sé el primero en opinar</p>
              <p className="text-xs mt-1" style={{ color: C.muted }}>Comparte tu experiencia con este producto.</p>
            </div>
          )}
        </div>
      </div>

      {/* List */}
      {comments.length > 0 && (
        <div className="space-y-4">
          <div className="f-archivo font-bold text-sm" style={{ color: C.orange }}>OPINIONES RECIENTES</div>
          {comments.map(c => (
            <div key={c.id} className="bg-white p-4 border" style={{ borderColor: '#E5E5E0' }}>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="f-archivo font-bold">{c.name}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={12} fill={s <= c.rating ? C.orange : 'none'} style={{ color: C.orange }} />
                    ))}
                  </div>
                </div>
                <div className="text-[11px] f-dm" style={{ color: C.muted }}>
                  {new Date(c.date).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
              <p className="text-sm f-dm leading-relaxed mt-3" style={{ color: '#3A3A3A' }}>{c.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================
// PRODUCT DETAIL
// ============================================================
const ProductDetail = ({ product, onBack, onAddToCart, onWhatsAppBuy, onSelectProduct }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState('description');
  const productComments = useComments(product.id);
  const productAvgRating = productComments.length > 0
    ? productComments.reduce((s, c) => s + c.rating, 0) / productComments.length
    : 0;
  
  const handleAdd = () => {
    onAddToCart(product, selectedVariant, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  
  const handleWhatsApp = () => {
    const msg = `Hola Ámbar Perfumería, quiero pedir:\n${product.name}${product.inspiredBy ? ' ' + product.inspiredBy : ''}\nPresentación: ${selectedVariant.size} · ${selectedVariant.tier}\nCantidad: ${qty}\nTotal: ${fmt(selectedVariant.price * qty)}`;
    onWhatsAppBuy(msg);
  };
  
  const sizeGroups = product.variants.reduce((acc, v) => {
    if (!acc[v.size]) acc[v.size] = [];
    acc[v.size].push(v);
    return acc;
  }, {});
  
  const tiers = [...new Set(product.variants.filter(v => v.size === selectedVariant.size).map(v => v.tier))];
  
  const related = PRODUCTS.filter(p => p.id !== product.id && (p.family === product.family || p.gender === product.gender)).slice(0, 4);
  
  return (
    <main className="bg-white min-h-screen f-dm">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-4 text-sm">
        <button onClick={onBack} className="flex items-center gap-1.5 hover:opacity-70 f-archivo font-medium" style={{ color: C.muted }}>
          <ChevronLeft size={14} /> Volver al catálogo
        </button>
      </div>
      
      <section className="pb-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: image gallery */}
          <div>
            {(() => {
              const isPerfume = product.type === 'arabe' || product.type === 'inspirado';
              const galleryImages = product.gallery && product.gallery.length > 0
                ? product.gallery
                : isPerfume
                  ? [product.imageUrl, 'https://nova-import-catalogo.vercel.app/images/products/tamanos-disponibles.png'].filter(Boolean)
                  : product.imageUrl ? [product.imageUrl] : [];
              const activeIdx = typeof activeImage === 'number' ? activeImage : 0;
              const safeIdx = Math.min(activeIdx, Math.max(galleryImages.length - 1, 0));
              const mainSrc = galleryImages[safeIdx];
              return (
                <>
                  <div className="bg-white border" style={{ borderColor: '#E5E5E0' }}>
                    {mainSrc ? (
                      <div className="relative aspect-square bg-white overflow-hidden flex items-center justify-center">
                        <img
                          src={mainSrc}
                          alt={product.name}
                          className="relative max-w-[95%] max-h-[95%] object-contain"
                          style={{ filter: isPerfume && safeIdx === galleryImages.length - 1 && mainSrc.includes('tamanos') ? 'none' : `drop-shadow(0 20px 30px ${product.color.shadow})` }}
                        />
                      </div>
                    ) : (
                      <ProductImage product={product} aspect="aspect-square" />
                    )}
                  </div>
                  {galleryImages.length > 1 && (
                    <div className={`grid gap-2 mt-2 ${galleryImages.length === 2 ? 'grid-cols-2' : galleryImages.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                      {galleryImages.map((src, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveImage(i)}
                          className="aspect-square bg-white border cursor-pointer hover:border-orange-500 transition-colors flex items-center justify-center p-2"
                          style={{ borderColor: safeIdx === i ? '#F58220' : '#E5E5E0' }}
                        >
                          <img
                            src={src}
                            alt={`${product.name} ${i + 1}`}
                            className="max-w-full max-h-full object-contain"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
          
          {/* Right: info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 f-archivo text-xs font-bold tracking-wider mb-2">
                {product.type === 'arabe' ? (
                  <>
                    <span style={{ color: C.navy }}>{product.brand.toUpperCase()}</span>
                    <span style={{ background: C.navy }} className="text-white px-2 py-0.5 text-[10px]">ÁRABE ORIGINAL</span>
                  </>
                ) : product.type === 'inspirado' ? (
                  <span style={{ background: C.orange }} className="text-white px-2 py-0.5 text-[10px]">ÁMBAR PERFUMERÍA</span>
                ) : (
                  <span style={{ background: C.orange }} className="text-white px-2 py-0.5 text-[10px]">ÁMBAR PERFUMERÍA</span>
                )}
                <span style={{ color: C.muted }}>· {product.family}</span>
              </div>
              <h1 className="f-archivo font-black text-3xl lg:text-4xl leading-tight">
                {product.name}
              </h1>
              {product.inspiredBy && (
                <p className="mt-2 f-fraunces italic text-base lg:text-lg" style={{ color: C.muted }}>
                  Perfil olfativo inspirado en <span className="not-italic font-medium" style={{ color: C.ink }}>{product.inspiredBy}</span>
                </p>
              )}
              <div className="flex items-center gap-3 mt-3 text-sm">
                <button onClick={() => setTab('reviews')} className="flex items-center gap-1 hover:opacity-70">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= Math.round(productAvgRating) ? C.orange : 'none'} style={{ color: C.orange }} />)}
                  <span className="f-archivo font-bold ml-1">{productAvgRating > 0 ? productAvgRating.toFixed(1) : '—'}</span>
                  <span className="text-xs underline" style={{ color: C.muted }}>({productComments.length} {productComments.length === 1 ? 'reseña' : 'reseñas'})</span>
                </button>
                <span className="text-green-600 flex items-center gap-1 f-archivo font-bold text-xs"><Check size={12} /> En stock</span>
              </div>
            </div>
            
            {/* Price */}
            <div className="py-4 border-y" style={{ borderColor: '#E5E5E0' }}>
              <div className="f-archivo font-black text-4xl" style={{ color: C.ink }}>{fmt(selectedVariant.price)}</div>
              <div className="text-sm mt-1" style={{ color: C.muted }}>
                Hasta 4 cuotas de {fmt(Math.ceil(selectedVariant.price / 4))} con Addi
              </div>
            </div>
            
            {/* Size selector */}
            <div>
              <div className="f-archivo font-bold text-sm mb-2.5">Tamaño · Presentación</div>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                {Object.entries(sizeGroups).map(([size, vars]) => {
                  const v = vars[0];
                  const selected = selectedVariant.size === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedVariant(v)}
                      className={`border-2 p-3 text-center transition-all ${selected ? 'border-stone-900' : 'border-stone-200 hover:border-stone-400'}`}
                    >
                      <div className="f-archivo font-bold text-base">{size}</div>
                      <div className="f-archivo text-xs mt-0.5" style={{ color: C.muted }}>{fmt(Math.min(...vars.map(x => x.price)))}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Tier selector */}
            {tiers.length > 1 && (
              <div>
                <div className="f-archivo font-bold text-sm mb-2.5">Calidad</div>
                <div className="grid grid-cols-2 gap-2">
                  {tiers.map(t => {
                    const v = product.variants.find(x => x.size === selectedVariant.size && x.tier === t);
                    const selected = selectedVariant.tier === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setSelectedVariant(v)}
                        className={`border-2 p-3 text-left transition-all ${selected ? 'border-stone-900' : 'border-stone-200 hover:border-stone-400'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="f-archivo font-bold text-base">{t}</div>
                            <div className="f-archivo text-xs" style={{ color: C.muted }}>
                              {t === 'AAA' ? 'Premium · larga duración' : 'Calidad estándar'}
                            </div>
                          </div>
                          <div className="f-archivo font-bold">{fmt(v.price)}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Quantity + CTA */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="f-archivo font-bold text-sm">Cantidad</div>
                <div className="flex items-center border" style={{ borderColor: '#D5D5D0' }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-stone-100"><Minus size={14} /></button>
                  <span className="px-4 f-archivo font-bold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:bg-stone-100"><Plus size={14} /></button>
                </div>
              </div>
              
              <button
                onClick={handleAdd}
                disabled={added}
                className="w-full py-4 f-archivo font-bold text-sm tracking-wide flex items-center justify-center gap-3 transition-all"
                style={{ background: added ? '#10B981' : C.navy, color: 'white' }}
              >
                {added ? <><CheckCircle2 size={16} /> AÑADIDO AL CARRITO</> : <><ShoppingBag size={16} /> AÑADIR AL CARRITO · {fmt(selectedVariant.price * qty)}</>}
              </button>
              
              {product.whatsappOnly ? (
                <a
                  href={`https://wa.me/573173641851?text=${encodeURIComponent(`Hola Ámbar Perfumería, quiero pedir: ${product.name} · ${selectedVariant.size} · ${selectedVariant.tier} · Cantidad: ${qty} · Total: ${fmt(selectedVariant.price * qty)}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 f-archivo font-bold text-sm tracking-wide flex items-center justify-center gap-2 text-white transition-colors hover:opacity-90"
                  style={{ background: '#25D366' }}
                >
                  <MessageCircle size={16} /> PEDIR POR WHATSAPP · {fmt(selectedVariant.price * qty)}
                </a>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={getMercadoLibreUrl(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 f-archivo font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-colors hover:opacity-90"
                    style={{ background: '#FFE600', color: '#2D3277' }}
                  >
                    <ExternalLink size={14} /> COMPRAR EN MERCADO LIBRE
                  </a>
                  <a
                    href={getShopifyUrl(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 f-archivo font-bold text-sm tracking-wide flex items-center justify-center gap-2 text-white transition-colors hover:opacity-90"
                    style={{ background: '#5E8E3E' }}
                  >
                    <ExternalLink size={14} /> COMPRAR EN SHOPIFY
                  </a>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2 text-xs" style={{ color: C.muted }}>
                <Truck size={16} className="mt-0.5 flex-shrink-0" style={{ color: C.orange }} />
                <div><strong className="f-archivo">Envío 24-72h</strong><br />Gratis desde $150.000</div>
              </div>
              <div className="flex items-start gap-2 text-xs" style={{ color: C.muted }}>
                <Shield size={16} className="mt-0.5 flex-shrink-0" style={{ color: C.orange }} />
                <div><strong className="f-archivo">Garantía</strong><br />30 días devolución</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tabs */}
      <section className="border-t" style={{ borderColor: '#E5E5E0', background: C.cream }}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12">
          <div className="flex gap-6 border-b mb-8" style={{ borderColor: '#E5E5E0' }}>
            {[
              { id: 'description', label: 'Descripción' },
              { id: 'notes', label: 'Notas olfativas' },
              { id: 'shipping', label: 'Envío y devoluciones' },
              { id: 'reviews', label: 'Reseñas' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`pb-4 f-archivo font-bold text-sm border-b-2 transition-colors ${tab === t.id ? '' : 'border-transparent'}`}
                style={{ borderColor: tab === t.id ? C.orange : 'transparent', color: tab === t.id ? C.ink : C.muted }}
              >
                {t.label}
              </button>
            ))}
          </div>
          
          {tab === 'description' && (
            <div className="max-w-3xl space-y-4 f-dm leading-relaxed" style={{ color: '#3A3A3A' }}>
              <p>{product.description}</p>
              {product.type === 'inspirado' && (
                <p className="text-sm pt-4 border-t" style={{ color: C.muted, borderColor: '#E5E5E0' }}>
                  <strong>Nota legal:</strong> Producto inspirado en una fragancia comercial. No es el perfume original ni está asociado con la marca referida. Su composición olfativa busca evocar familia y estilo del original.
                </p>
              )}
            </div>
          )}
          
          {tab === 'notes' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <div className="f-archivo font-bold text-sm mb-3" style={{ color: C.orange }}>NOTAS</div>
                <p className="f-archivo text-xl">{product.notes}</p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 border" style={{ borderColor: '#E5E5E0' }}>
                  <div className="f-archivo font-bold text-xs tracking-wider mb-1" style={{ color: C.orange }}>FAMILIA</div>
                  <div className="f-archivo font-bold">{product.family}</div>
                </div>
                <div className="bg-white p-5 border" style={{ borderColor: '#E5E5E0' }}>
                  <div className="f-archivo font-bold text-xs tracking-wider mb-1" style={{ color: C.orange }}>GÉNERO</div>
                  <div className="f-archivo font-bold">{product.gender}</div>
                </div>
                <div className="bg-white p-5 border" style={{ borderColor: '#E5E5E0' }}>
                  <div className="f-archivo font-bold text-xs tracking-wider mb-1" style={{ color: C.orange }}>TIPO</div>
                  <div className="f-archivo font-bold">Eau de Parfum</div>
                </div>
              </div>
            </div>
          )}
          
          {tab === 'shipping' && (
            <div className="max-w-3xl space-y-4 f-dm leading-relaxed" style={{ color: '#3A3A3A' }}>
              <p><strong className="f-archivo">Envíos:</strong> Despachamos a toda Colombia vía Servientrega y Coordinadora. Bogotá 24h, ciudades principales 48-72h, resto del país 3-5 días hábiles. Envío gratuito para compras desde $150.000.</p>
              <p><strong className="f-archivo">Devoluciones:</strong> Tienes 30 días desde la entrega para solicitar cambio o devolución, siempre que el producto esté sellado y sin abrir. Defectos de fábrica los cubrimos al 100%.</p>
              <p><strong className="f-archivo">Pago seguro:</strong> Aceptamos Nequi, Bancolombia, transferencia, pago contraentrega y cuotas con Addi. Confirmamos cada pedido por WhatsApp antes de enviar.</p>
            </div>
          )}

          {tab === 'reviews' && <ReviewsBlock productId={product.id} />}
        </div>
      </section>
      
      {/* Related */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <h2 className="f-archivo font-black text-2xl lg:text-3xl mb-6">También te puede gustar</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {related.map(p => <ProductCard key={p.id} product={p} onClick={() => onSelectProduct(p.id)} />)}
          </div>
        </div>
      </section>
    </main>
  );
};



// ============================================================
// SEARCH RESULTS VIEW
// ============================================================
const SearchResults = ({ query, onSelectProduct, onNavigate }) => {
  const q = (query || '').toLowerCase().trim();
  const items = q ? PRODUCTS.filter(p => {
    const haystack = [p.name, p.brand, p.family, p.gender, p.inspiredBy || '', p.description || '', p.notes || '']
      .join(' ').toLowerCase();
    return q.split(/\s+/).every(token => haystack.includes(token));
  }) : [];

  return (
    <main className="bg-white min-h-screen f-dm">
      <section className="py-10 lg:py-12 border-b" style={{ background: C.cream, borderColor: '#E5E5E0' }}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="f-mono mb-3" style={{ color: C.orange }}>RESULTADOS DE BÚSQUEDA</div>
          <h1 className="f-archivo font-black text-3xl lg:text-4xl mb-3">
            {q ? <>Buscaste: <span style={{ color: C.orange }}>"{query}"</span></> : 'Escribe algo para buscar'}
          </h1>
          <p style={{ color: C.muted }}>
            {items.length} {items.length === 1 ? 'resultado' : 'resultados'} encontrados
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <Search size={48} className="mx-auto mb-4" strokeWidth={1.5} style={{ color: C.muted }} />
              <p className="f-archivo font-bold text-xl mb-2">Sin resultados</p>
              <p className="text-sm mb-6" style={{ color: C.muted }}>
                Intenta con otra palabra. Busca por nombre, marca, género o familia olfativa.
              </p>
              <button
                onClick={() => onNavigate('catalog')}
                className="text-white px-6 py-3 f-archivo font-bold text-sm"
                style={{ background: C.navy }}
              >
                VER TODO EL CATÁLOGO
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
              {items.map(p => <ProductCard key={p.id} product={p} onClick={() => onSelectProduct(p.id)} />)}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

// ============================================================
// WISHLIST VIEW
// ============================================================
const Wishlist = ({ onSelectProduct, onNavigate }) => {
  const ids = useWishlist();
  const items = PRODUCTS.filter(p => ids.includes(p.id));

  return (
    <main className="bg-white min-h-screen f-dm">
      <section className="py-10 lg:py-12 border-b" style={{ background: C.cream, borderColor: '#E5E5E0' }}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="f-mono mb-3" style={{ color: C.orange }}>TUS FAVORITOS</div>
          <h1 className="f-archivo font-black text-4xl lg:text-5xl mb-3">Lista de deseos</h1>
          <p style={{ color: C.muted }}>
            {items.length === 0
              ? 'Aún no has guardado productos. Toca el ❤ para agregar a esta lista.'
              : `${items.length} ${items.length === 1 ? 'producto guardado' : 'productos guardados'}`}
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <Heart size={48} className="mx-auto mb-4" strokeWidth={1.5} style={{ color: C.orange }} />
              <p className="f-archivo font-bold text-xl mb-2">Tu lista está vacía</p>
              <p className="text-sm mb-6" style={{ color: C.muted }}>Toca el corazón en cualquier producto para guardarlo aquí.</p>
              <button
                onClick={() => onNavigate('catalog')}
                className="text-white px-6 py-3 f-archivo font-bold text-sm"
                style={{ background: C.navy }}
              >
                EXPLORAR CATÁLOGO
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
              {items.map(p => <ProductCard key={p.id} product={p} onClick={() => onSelectProduct(p.id)} />)}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

// ============================================================
// CART DRAWER
// ============================================================
const CartDrawer = ({ open, onClose, cart, onUpdateQty, onRemove, onWhatsApp }) => {
  const subtotal = cart.reduce((s, i) => s + i.variant.price * i.qty, 0);
  const shipping = subtotal >= 150000 || subtotal === 0 ? 0 : 12000;
  const total = subtotal + shipping;
  
  return (
    <>
      {open && <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white z-50 transform transition-transform duration-500 ${open ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: '#E5E5E0' }}>
          <h2 className="f-archivo font-black text-xl">Tu pedido ({cart.length})</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag size={36} className="mx-auto text-stone-300 mb-4" strokeWidth={1} />
              <p className="f-archivo font-bold mb-2">Tu carrito está vacío</p>
              <p className="text-sm" style={{ color: C.muted }}>Encuentra tu próxima fragancia favorita.</p>
            </div>
          ) : cart.map((item, i) => (
            <div key={`${item.product.id}-${item.variant.size}-${item.variant.tier}-${i}`} className="flex gap-3 pb-5 border-b" style={{ borderColor: '#E5E5E0' }}>
              <div className="w-20 h-24 bg-stone-50 flex-shrink-0">
                <ProductImage product={item.product} aspect="aspect-[5/6]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="f-archivo font-bold text-sm leading-tight">{item.product.name}</h3>
                {item.product.inspiredBy && <div className="f-fraunces italic text-xs" style={{ color: C.muted }}>{item.product.inspiredBy}</div>}
                <div className="f-archivo text-xs mt-1" style={{ color: C.muted }}>{item.variant.size} · {item.variant.tier}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border" style={{ borderColor: '#D5D5D0' }}>
                    <button onClick={() => onUpdateQty(i, item.qty - 1)} className="px-2 py-1 hover:bg-stone-100"><Minus size={12} /></button>
                    <span className="px-3 f-archivo font-bold text-sm">{item.qty}</span>
                    <button onClick={() => onUpdateQty(i, item.qty + 1)} className="px-2 py-1 hover:bg-stone-100"><Plus size={12} /></button>
                  </div>
                  <span className="f-archivo font-bold text-sm">{fmt(item.variant.price * item.qty)}</span>
                </div>
              </div>
              <button onClick={() => onRemove(i)} className="text-stone-400 hover:text-red-500 flex-shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        
        {cart.length > 0 && (
          <div className="border-t p-5 space-y-3" style={{ borderColor: '#E5E5E0', background: C.cream }}>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span style={{ color: C.muted }}>Subtotal</span><span className="f-archivo font-bold">{fmt(subtotal)}</span></div>
              <div className="flex justify-between"><span style={{ color: C.muted }}>Envío {shipping === 0 && '(gratis 🎉)'}</span><span className="f-archivo font-bold">{shipping === 0 ? '—' : fmt(shipping)}</span></div>
              <div className="flex justify-between pt-2 border-t" style={{ borderColor: '#E5E5E0' }}>
                <span className="f-archivo font-black text-lg">Total</span>
                <span className="f-archivo font-black text-lg">{fmt(total)}</span>
              </div>
            </div>
            <button onClick={onWhatsApp} className="w-full text-white py-3.5 f-archivo font-bold text-sm flex items-center justify-center gap-3 transition-colors hover:opacity-90" style={{ background: '#25D366' }}>
              <MessageCircle size={16} /> FINALIZAR PEDIDO POR WHATSAPP · {fmt(total)}
            </button>
            <p className="text-[11px] f-dm text-center" style={{ color: C.muted }}>
              Te llevamos a WhatsApp con tu pedido listo. Allí confirmamos disponibilidad, dirección y método de pago (Nequi, transferencia, contraentrega).
            </p>
          </div>
        )}
      </div>
    </>
  );
};

// ============================================================
// TRACK ORDER
// ============================================================
// ============================================================
// MAISON / NOSOTROS
// ============================================================
const Maison = () => (
  <main className="bg-white f-dm">
    <section className="py-16 lg:py-24" style={{ background: C.navy }}>
      <div className="max-w-4xl mx-auto px-4 lg:px-8 text-white">
        <div className="f-mono mb-4" style={{ color: C.orange }}>NUESTRA HISTORIA</div>
        <h1 className="f-archivo font-black text-5xl lg:text-7xl leading-[0.95] mb-6">Ámbar Perfumería S.A.S.</h1>
        <p className="text-xl lg:text-2xl text-white/80 max-w-2xl">Importadora de productos seleccionados — tendencias, perfumería y categorías virales — con calidad garantizada y envíos rápidos a toda Colombia. Trabajamos directo con los fabricantes para ofrecerte la mejor relación calidad-precio.</p>
      </div>
    </section>
    
    <section className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 grid md:grid-cols-3 gap-10 text-center">
        {[
          { num: '+5.000', label: 'Clientes satisfechos en Colombia' },
          { num: '24-72h', label: 'Tiempo promedio de entrega' },
          { num: '100%', label: 'Productos con calidad garantizada' },
        ].map((s, i) => (
          <div key={i}>
            <div className="f-archivo font-black text-6xl mb-2" style={{ color: C.orange }}>{s.num}</div>
            <p style={{ color: C.muted }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
    
    <section className="py-16 lg:py-20" style={{ background: C.cream }}>
      <div className="max-w-3xl mx-auto px-4 lg:px-8 space-y-6">
        <h2 className="f-archivo font-black text-3xl lg:text-4xl">¿Por qué Ámbar Perfumería?</h2>
        <div className="space-y-5">
          {[
            { title: 'Importación directa', text: 'Trabajamos directo con los fabricantes para evitar intermediarios y trasladarte el mejor precio. Curamos cada referencia antes de incluirla en catálogo.' },
            { title: 'Productos seleccionados', text: 'Solo importamos productos con demanda comprobada y excelente relación calidad-precio. Tendencias, virales y categorías ganadoras.' },
            { title: 'Atención humana', text: 'Hablas por WhatsApp con personas reales, no con un bot. Asesoría antes de comprar, sin obligación.' },
            { title: 'Garantía total', text: '30 días para devolver o cambiar tu producto si no es lo que esperabas. Defectos de fábrica cubiertos al 100%.' },
          ].map((b, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 f-archivo font-black text-white" style={{ background: C.orange }}>
                {i + 1}
              </div>
              <div>
                <div className="f-archivo font-bold text-lg mb-1">{b.title}</div>
                <p style={{ color: C.muted }}>{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

// ============================================================
// FOOTER
// ============================================================
const Footer = ({ onNavigate }) => (
  <footer style={{ background: C.navyDark, color: '#A8B5CC' }}>
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-14">
      <div className="grid md:grid-cols-4 gap-8 mb-10">
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.orange }}>
              <Globe size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="f-archivo font-black text-xl text-white leading-none">Ámbar Perfumería</div>
            </div>
          </div>
          <p className="text-sm">Importadora de productos seleccionados, perfumería y tendencias con calidad garantizada.</p>
          <div className="flex gap-3">
            <a href="https://www.instagram.com/nova.import_sas/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} className="hover:text-white cursor-pointer" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61551260687550" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={20} className="hover:text-white cursor-pointer" />
            </a>
            <a href="https://wa.me/573173641851" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <MessageCircle size={20} className="hover:text-white cursor-pointer" />
            </a>
          </div>
        </div>
        
        <div>
          <div className="f-archivo font-bold text-white text-sm mb-3 tracking-wider">CATÁLOGO</div>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => onNavigate('catalog-bebe')} className="hover:text-white">Bebé</button></li>
            <li><button onClick={() => onNavigate('catalog-mascotas')} className="hover:text-white">Mascotas</button></li>
            <li><button onClick={() => onNavigate('catalog-hogar')} className="hover:text-white">Hogar</button></li>
            <li><button onClick={() => onNavigate('catalog-perfumeria')} className="hover:text-white">Perfumería (todos)</button></li>
            <li><button onClick={() => onNavigate('catalog-arabe')} className="hover:text-white">Perfumería árabe</button></li>
            <li><button onClick={() => onNavigate('catalog-inspirado')} className="hover:text-white">Esencias inspiradas</button></li>
            <li><button onClick={() => onNavigate('catalog-bestsellers')} className="hover:text-white">Más vendidos</button></li>
          </ul>
        </div>
        
        <div>
          <div className="f-archivo font-bold text-white text-sm mb-3 tracking-wider">AYUDA</div>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`https://wa.me/573173641851?text=${encodeURIComponent('Hola Ámbar Perfumería, quiero hacer seguimiento de mi pedido.')}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Seguimiento de pedido
              </a>
            </li>
            <li>
              <a href={`https://wa.me/573173641851?text=${encodeURIComponent('Hola, necesito información sobre envíos y entregas.')}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Envíos y entregas
              </a>
            </li>
            <li>
              <a href={`https://wa.me/573173641851?text=${encodeURIComponent('Hola, quiero hacer un cambio o devolución.')}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Cambios y devoluciones
              </a>
            </li>
            <li>
              <a href={`https://wa.me/573173641851?text=${encodeURIComponent('Hola Ámbar Perfumería, tengo una pregunta.')}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Atención al cliente
              </a>
            </li>
            <li className="flex items-center gap-1.5">
              <MessageCircle size={12} />
              <a href="https://wa.me/573173641851" target="_blank" rel="noopener noreferrer" className="hover:text-white">+57 317 364 1851</a>
            </li>
            <li className="flex items-center gap-1.5">
              <Mail size={12} />
              <a href="mailto:novaimportaciones190@gmail.com" className="hover:text-white">novaimportaciones190@gmail.com</a>
            </li>
          </ul>
        </div>
        
        <div>
          <div className="f-archivo font-bold text-white text-sm mb-3 tracking-wider">LEGAL</div>
          <ul className="space-y-2 text-sm">
            <li>Política de privacidad</li>
            <li>Tratamiento de datos · Ley 1581</li>
            <li>Términos y condiciones</li>
            <li>Política de cookies</li>
            <li>Aviso de marcas</li>
          </ul>
        </div>
      </div>
      
      <div className="pt-6 border-t flex flex-col md:flex-row gap-4 justify-between text-xs" style={{ borderColor: '#1A3055' }}>
        <div>© 2026 Ámbar Perfumería S.A.S. · NIT 52.960.928-7 · Bogotá D.C., Colombia</div>
        <div className="flex gap-6 flex-wrap items-center f-archivo font-medium">
          <span>NEQUI</span><span>BANCOLOMBIA</span><span>ADDI</span><span>CONTRAENTREGA</span><span>SERVIENTREGA</span>
        </div>
      </div>
    </div>
  </footer>
);

// ============================================================
// COOKIE BANNER
// ============================================================
const CookieBanner = ({ onClose }) => (
  <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t shadow-lg" style={{ borderColor: '#E5E5E0' }}>
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-4 flex flex-col lg:flex-row items-start lg:items-center gap-3 justify-between">
      <p className="text-sm" style={{ color: '#3A3A3A' }}>
        Usamos cookies para mejorar tu experiencia. Al continuar aceptas el tratamiento de datos según la <strong>Ley 1581 de 2012</strong>.
      </p>
      <div className="flex gap-2 flex-shrink-0">
        <button onClick={onClose} className="border px-4 py-2 f-archivo font-bold text-xs" style={{ borderColor: '#D5D5D0' }}>RECHAZAR</button>
        <button onClick={onClose} className="text-white px-4 py-2 f-archivo font-bold text-xs" style={{ background: C.navy }}>ACEPTAR</button>
      </div>
    </div>
  </div>
);

// ============================================================
// APP
// ============================================================
export default function App() {
  // Lee view inicial desde la URL (ej. /catalog-mujer → 'catalog-mujer'). Default: 'home'.
  const readViewFromPath = () => {
    if (typeof window === 'undefined') return 'home';
    const p = window.location.pathname.replace(/^\//,'').replace(/\/$/, '');
    return p || 'home';
  };
  const [view, setView] = useState(readViewFromPath);
  const [selectedId, setSelectedId] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cookies, setCookies] = useState(() => {
    try {
      return typeof window !== 'undefined' && !window.localStorage.getItem('novaimport_cookies_dismissed');
    } catch (e) { return true; }
  });
  const dismissCookies = () => {
    try { window.localStorage.setItem('novaimport_cookies_dismissed', '1'); } catch (e) {}
    setCookies(false);
  };
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    try {
      const s = window.localStorage.getItem('cart_nova');
      if (s) setCart(JSON.parse(s));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem('cart_nova', JSON.stringify(cart)); } catch (e) {}
  }, [cart]);
  // Escucha back/forward del browser para sincronizar el view con la URL
  useEffect(() => {
    const onPop = () => setView(readViewFromPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  
  const navigate = (v) => {
    if (typeof v === 'object' && v !== null && v.view === 'search') {
      setSearchQuery(v.q || '');
      setView('search');
      setSelectedId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setView(v);
    if (v !== 'product') setSelectedId(null);
    if (v !== 'search') setSearchQuery('');
    // Actualiza la URL del browser para que tenga URLs compartibles
    try {
      const path = v === 'home' ? '/' : '/' + v;
      if (window.location.pathname !== path) {
        window.history.pushState({ view: v }, '', path);
      }
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const selectProduct = (id) => {
    setSelectedId(id);
    setView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const addToCart = (product, variant, qty) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.product.id === product.id && i.variant.size === variant.size && i.variant.tier === variant.tier);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { product, variant, qty }];
    });
  };
  
  const updateQty = (i, qty) => {
    if (qty <= 0) { setCart(cart.filter((_, j) => j !== i)); return; }
    setCart(cart.map((it, j) => j === i ? { ...it, qty } : it));
  };
  
  const removeFromCart = (i) => setCart(cart.filter((_, j) => j !== i));
  
const WA_NUMBER = '573173641851';
  
  const openWhatsApp = (msg) => {
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  const cartWhatsApp = () => {
    const lines = cart.map(it => `• ${it.product.name}${it.product.inspiredBy ? ' ' + it.product.inspiredBy : ''} · ${it.variant.size} ${it.variant.tier} × ${it.qty}`).join('\n');
    const total = cart.reduce((s, i) => s + i.variant.price * i.qty, 0);
    const msg = `Hola Ámbar Perfumería 👋\nQuiero hacer este pedido:\n\n${lines}\n\nTotal: ${fmt(total)}\n\n¿Me confirman disponibilidad y método de pago? Gracias.`;
    openWhatsApp(msg);
  };
  
  const productWhatsApp = (msg) => {
    openWhatsApp(msg);
  };
  
  const product = selectedId ? PRODUCTS.find(p => p.id === selectedId) : null;
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  
  const renderView = () => {
    if (view === 'catalog') return <Catalog onSelectProduct={selectProduct} />;
    if (view === 'catalog-bebe') return <Catalog initialFilter={{ type: 'bebe' }} title="Productos para bebé" onSelectProduct={selectProduct} />;
    if (view === 'catalog-mascotas') return <Catalog initialFilter={{ type: 'mascotas' }} title="Productos para mascotas" onSelectProduct={selectProduct} />;
    if (view === 'catalog-hogar') return <Catalog initialFilter={{ type: 'hogar' }} title="Productos para el hogar" onSelectProduct={selectProduct} />;
    if (view === 'catalog-perfumeria') return <Catalog initialFilter={{ typeIn: ['arabe', 'inspirado'] }} title="Perfumería · Árabes e Inspirados" onSelectProduct={selectProduct} />;
    if (view === 'catalog-hombre') return <Catalog initialFilter={{ gender: 'Hombre' }} title="Fragancias para él" onSelectProduct={selectProduct} />;
    if (view === 'catalog-mujer') return <Catalog initialFilter={{ gender: 'Mujer' }} title="Fragancias para ella" onSelectProduct={selectProduct} />;
    if (view === 'catalog-arabe') return <Catalog initialFilter={{ type: 'arabe' }} title="Marcas árabes 100% originales" onSelectProduct={selectProduct} />;
    if (view === 'catalog-inspirado') return <Catalog initialFilter={{ type: 'inspirado' }} title="Esencias inspiradas premium" onSelectProduct={selectProduct} />;
    if (view === 'catalog-bestsellers') return <Catalog initialFilter={{ bestseller: true }} title="Los más vendidos" onSelectProduct={selectProduct} />;
    if (view === 'product' && product) return <ProductDetail product={product} onBack={() => navigate('catalog')} onAddToCart={addToCart} onWhatsAppBuy={productWhatsApp} onSelectProduct={selectProduct} />;
    if (view === 'wishlist') return <Wishlist onSelectProduct={selectProduct} onNavigate={navigate} />;
    if (view === 'search') return <SearchResults query={searchQuery} onSelectProduct={selectProduct} onNavigate={navigate} />;
    if (view === 'maison') return <Maison />;
    return <Home onNavigate={navigate} onSelectProduct={selectProduct} />;
  };
  
  return (
    <div className="f-dm" style={{ background: 'white' }}>
      <Fonts />
      <Header onNavigate={navigate} currentView={view} cartCount={cartCount} onCartOpen={() => setCartOpen(true)} searchQuery={searchQuery} />
      <div className="fade" key={view + (selectedId || '')}>
        {renderView()}
      </div>
      <Footer onNavigate={navigate} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onWhatsApp={cartWhatsApp}
      />
      {cookies && <CookieBanner onClose={dismissCookies} />}
      
      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/573173641851?text=Hola%20Nova%20Import%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20perfumes"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-30 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        title="Chat por WhatsApp"
      >
        <MessageCircle size={26} strokeWidth={2} />
      </a>
      
    </div>
  );
}
