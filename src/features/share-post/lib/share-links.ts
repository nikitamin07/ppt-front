interface ShareTarget {
  /** Абсолютный URL статьи — берётся из window.location, а не из конфига (см. share-button.tsx). */
  url: string;
  title: string;
}

/**
 * Официальные веб-интенты «поделиться». Instagram не умеет шарить
 * внешние ссылки — вместо него кнопка «Скопировать ссылку».
 */
export function buildShareLinks({ url, title }: ShareTarget) {
  const encodedUrl = encodeURIComponent(url);
  const text = encodeURIComponent(`${title} ${url}`);

  return {
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(title)}`,
    whatsapp: `https://wa.me/?text=${text}`,
    viber: `viber://forward?text=${text}`,
  };
}
