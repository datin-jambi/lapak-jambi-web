'use client';

import React from 'react';
import {
  Building2,
  BedDouble,
  Landmark,
  Dumbbell,
  Store,
  Wrench,
  FlaskConical,
  Sprout,
  Ticket,
  Mountain,
  Car,
  Trees,
  Layers,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react';

const iconMapping: Record<string, LucideIcon> = {
  // Backend icons
  'building-2': Building2,
  'bed-double': BedDouble,
  landmark: Landmark,
  dumbbell: Dumbbell,
  store: Store,
  wrench: Wrench,
  'flask-conical': FlaskConical,
  sprout: Sprout,
  ticket: Ticket,
  mountain: Mountain,
  car: Car,
  trees: Trees,

  // Fallback slug mappings
  'sewa-gedung-ruangan': Building2,
  'penginapan-asrama-rumah-dinas': BedDouble,
  'sewa-tanah-lahan': Landmark,
  'rekreasi-olahraga': Dumbbell,
  'sewa-kios-kantin-usaha': Store,
  'sewa-alat-laboratorium': Wrench,
  'layanan-laboratorium-kesehatan': FlaskConical,
  'penjualan-hasil-usaha-daerah': Sprout,

  // PascalCase variants
  Building2,
  Building: Building2,
  BedDouble,
  Landmark,
  Dumbbell,
  Store,
  Wrench,
  FlaskConical,
  Sprout,
  Ticket,
  Mountain,
};

interface CategoryIconProps {
  name?: string | null;
  slug?: string | null;
  className?: string;
}

export function CategoryIcon({ name, slug, className }: CategoryIconProps) {
  const key = (name || slug || '').toLowerCase().trim();
  const IconComponent = iconMapping[name || ''] || iconMapping[key] || (slug ? iconMapping[slug] : null) || Layers;

  return <IconComponent className={className || 'size-6'} />;
}
