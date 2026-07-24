interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Микроразметка schema.org. Рендерится на сервере, поэтому её видит краулер. */
export function JsonLd({ data }: JsonLdProps) {
  // Экранируем «<»: строка вида «</script>» в данных иначе закрыла бы тег.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
