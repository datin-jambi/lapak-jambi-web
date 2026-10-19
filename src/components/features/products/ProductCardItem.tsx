'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Building2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPricingUnit } from '@/utils/format';
import type { ProductCard } from '@/types/api';

interface ProductCardItemProps {
  product: ProductCard;
  className?: string;
}

const DEFAULT_COVER =
  'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80';

export function ProductCardItem({ product, className }: ProductCardItemProps) {
  const imageUrl = product.coverUrl || DEFAULT_COVER;
  const unitLabel = formatPricingUnit(product.pricingUnit);

  return (
    <Link href={`/aset/${product.slug}`} className="group block h-full">
      <Card
        className={`h-full overflow-hidden border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl ${className || ''}`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Badge Kategori & OPD */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-md">
              <Building2 className="size-3 text-gold" />
              <span className="max-w-[140px] truncate">{product.organization?.name || 'Pemprov Jambi'}</span>
            </span>
            {product.category?.name && (
              <Badge
                variant="secondary"
                className="bg-white/90 text-[11px] font-semibold text-primary backdrop-blur-sm"
              >
                {product.category.name}
              </Badge>
            )}
          </div>

          {/* Lokasi / Alamat di pojok bawah gambar */}
          {product.address && (
            <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-xs text-white/90 drop-shadow">
              <MapPin className="size-3 text-gold shrink-0" />
              <span className="truncate max-w-[240px]">{product.address}</span>
            </div>
          )}
        </div>

        <CardContent className="flex flex-col justify-between p-4 flex-1">
          <div>
            <h3 className="font-semibold text-base text-foreground line-clamp-1 group-hover:text-gold transition-colors">
              {product.name}
            </h3>
            {product.excerpt && (
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {product.excerpt}
              </p>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-border/40 flex items-end justify-between">
            <div>
              <span className="text-[11px] text-muted-foreground block font-medium">Tarif Retribusi</span>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-bold text-primary dark:text-gold">
                  {formatCurrency(product.startingPrice)}
                </span>
                <span className="text-xs text-muted-foreground">/{unitLabel}</span>
              </div>
            </div>

            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/5 text-primary group-hover:bg-gold group-hover:text-white transition-all">
              <ArrowRight className="size-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
