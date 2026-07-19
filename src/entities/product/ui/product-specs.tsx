import { ProductAttributeValue } from "../model/types";

interface ProductSpecsProps {
  attributes: ProductAttributeValue[];
}

export function ProductSpecs({ attributes }: ProductSpecsProps) {
  if (!attributes || attributes.length === 0) return null;

  return (
    <div className="w-full border border-line bg-card p-6">
      <h3 className="mb-4 font-heading text-lg font-semibold text-ink">
        Технические характеристики
      </h3>

      <div className="space-y-3">
        {attributes.map((attr) => (
          <div
            key={attr.attribute_id}
            className="flex flex-col justify-between border-b border-line py-2 last:border-0 sm:flex-row sm:items-baseline"
          >
            {/* Левая часть — Название характеристики (Ключ) */}
            <span className="text-sm text-muted-foreground sm:pr-4">
              {attr.name}
            </span>

            {/* Точки-заполнители для больших экранов (опционально, для красоты) */}
            <div className="mx-2 hidden grow border-b border-dotted border-line sm:block" />

            {/* Значение — доверенный HTML из админки (бывает «15 кг/м<sup>3</sup>»),
                рендерим как разметку, не текстом. */}
            <span
              className="mt-1 text-right text-sm font-semibold tabular-nums text-ink sm:mt-0"
              dangerouslySetInnerHTML={{ __html: attr.value }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
