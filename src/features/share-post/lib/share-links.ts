interface ShareTarget {
  /** Абсолютный URL статьи — берётся из window.location, а не из конфига (см. share-button.tsx). */
  url: string;
  title: string;
}

/**
 * Официальные веб-интенты «поделиться» для каждой сети.
 *
 * Instagram сюда не входит: платформа не поддерживает шаринг внешней ссылки через веб —
 * ни intent-URL, ни API для этого нет (в отличие от Telegram/WhatsApp/Viber). Вместо неё
 * share-button.tsx показывает обычную кнопку «Скопировать ссылку».
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
