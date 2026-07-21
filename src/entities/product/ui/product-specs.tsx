import { ProductAttributeValue } from "../model/types";

interface ProductSpecsProps {
  attributes: ProductAttributeValue[];
}

export function ProductSpecs({ attributes }: ProductSpecsProps) {
  if (!attributes || attributes.length === 0) return null;

  return (
    // Рамку и заголовок задаёт вызывающий: на странице товара это вкладка «Характеристики».
    <div className="space-y-3">
      {attributes.map((attr) => (
        <div
          key={attr.attribute_id}
          className="flex items-baseline justify-between border-b border-line py-2 last:border-0"
        >
          <span className="text-sm text-muted-foreground">{attr.name}</span>
          <div className="mx-2 min-w-6 grow border-b border-dotted border-line" />
          <span
            className="whitespace-nowrap text-right text-sm font-semibold tabular-nums text-ink"
            dangerouslySetInnerHTML={{ __html: attr.value }}
          />
        </div>
      ))}
    </div>
  );
}
