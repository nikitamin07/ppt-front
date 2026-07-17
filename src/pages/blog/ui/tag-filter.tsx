import { TagBadge, type Tag } from "@/entities/tag";

interface TagFilterProps {
  tags: Tag[];
  activeSlug?: string;
}

export function TagFilter({ tags, activeSlug }: TagFilterProps) {
  return (
    <aside>
      <h2 className="eyebrow text-xs">Темы</h2>
      <nav className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:items-start">
        {/* Сброс фильтра — тот же бейдж, ведущий на общий список. */}
        <TagBadge
          tag={{ id: 0, slug: "", name: "Все статьи" }}
          href="/poleznaya-informatsiya"
          active={!activeSlug}
        />
        {tags.map((tag) => (
          <TagBadge key={tag.id} tag={tag} active={tag.slug === activeSlug} />
        ))}
      </nav>
    </aside>
  );
}
