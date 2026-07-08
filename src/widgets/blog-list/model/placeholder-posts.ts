import type { Post } from "@/entities/post";

// Временные данные-заглушки. Удалить, когда блог начнет получать посты из /api/posts.
export const PLACEHOLDER_POSTS: Post[] = [
  {
    id: 1,
    slug: "kak-vybrat-utepliteli",
    title: "Как выбрать утеплитель для фасада: пенопласт или минвата",
    excerpt: "Сравниваем теплопроводность, паропроницаемость и группу горючести — что подойдет именно для вашего фасада.",
    content: "",
    cover_image_url: null,
    published_at: "2026-06-18",
    tag_ids: [],
  },
  {
    id: 2,
    slug: "raschet-tolshiny-teploizolyacii",
    title: "Расчет толщины теплоизоляции по нормам РБ",
    excerpt: "Пошаговая методика расчета толщины утеплителя для стен, кровли и пола по СНБ.",
    content: "",
    cover_image_url: null,
    published_at: "2026-06-05",
    tag_ids: [],
  },
  {
    id: 3,
    slug: "montazh-ppt-svoimi-rukami",
    title: "Монтаж пенопласта ППТ своими руками: пошаговая инструкция",
    excerpt: "От подготовки основания до финишной штукатурки — разбираем весь процесс утепления фасада.",
    content: "",
    cover_image_url: null,
    published_at: "2026-05-22",
    tag_ids: [],
  },
];
