"use client";

import { useState } from "react";
import Image from "next/image";
import { assetUrl, NO_IMAGE_SRC } from "@/shared/api";
import { cn } from "@/shared/lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";

interface ProductGalleryProps {
  /** Фото в порядке из админки; пустой массив — фото не загружали. */
  images: string[];
  name: string;
}

interface ThumbsProps {
  images: string[];
  active: number;
  onSelect: (index: number) => void;
  className?: string;
}

function Thumbs({ images, active, onSelect, className }: ThumbsProps) {
  return (
    <div className={cn("mt-3 grid grid-cols-4 gap-3", className)}>
      {images.map((src, index) => (
        <button
          key={src}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Фото ${index + 1}`}
          aria-current={index === active}
          className={cn(
            "relative aspect-square overflow-hidden border transition-colors",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-safety",
            index === active ? "border-safety" : "border-line hover:border-ink",
          )}
        >
          {/* alt пустой: миниатюра дублирует основное фото, озвучивать её нечего. */}
          <Image src={assetUrl(src) ?? NO_IMAGE_SRC} alt="" fill sizes="120px" className="object-cover" />
        </button>
      ))}
    </div>
  );
}

/** Фото товара: крупный кадр открывается во весь экран, миниатюра встаёт на его место. */
export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  // Фото не загрузили — заглушка без галереи: открывать нечего.
  if (images.length === 0) {
    return (
      <div className="relative aspect-square w-full overflow-hidden border border-line">
        <Image
          src={NO_IMAGE_SRC}
          alt={name}
          fill
          sizes="(min-width: 1024px) 30vw, 100vw"
          className="object-cover"
          priority
        />
      </div>
    );
  }

  const current = assetUrl(images[active]) ?? NO_IMAGE_SRC;
  // Одно фото — ряд миниатюр повторял бы его самого.
  const showThumbs = images.length > 1;

  return (
    <div>
      <Dialog>
        <DialogTrigger
          aria-label="Открыть фото во весь экран"
          className="relative block aspect-square w-full cursor-zoom-in overflow-hidden border border-line"
        >
          <Image
            src={current}
            alt={name}
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="object-cover"
            priority
          />
        </DialogTrigger>

        {/* Высота от вьюпорта, а не квадрат: иначе на ноутбуке окно не влезает и кнопка закрытия уезжает. */}
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogTitle className="sr-only">{name}</DialogTitle>
          <div className="relative h-[60vh] w-full">
            {/* contain: в лайтбоксе важен весь кадр, а не заполнение рамки. */}
            <Image src={current} alt={name} fill sizes="(min-width: 768px) 42rem, 100vw" className="object-contain" />
          </div>
          {showThumbs && (
            <Thumbs images={images} active={active} onSelect={setActive} className="mx-auto max-w-sm" />
          )}
        </DialogContent>
      </Dialog>

      {showThumbs && <Thumbs images={images} active={active} onSelect={setActive} />}
    </div>
  );
}
