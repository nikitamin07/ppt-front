/**
 * Файлы лежат на бэкенде, уменьшенных вариантов нет — оптимизировать нечего.
 * Loader отдаёт src как есть, браузер идёт за картинкой напрямую.
 */
export default function imageLoader({ src }: { src: string }) {
  return src;
}
