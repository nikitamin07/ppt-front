import { ProductAttributeValue } from "../model/types";

interface ProductSpecsProps {
  attributes: ProductAttributeValue[];
}

export function ProductSpecs({ attributes }: ProductSpecsProps) {
  if (!attributes || attributes.length === 0) return null;

  return (
    <div className="w-full rounded-xl border border-zinc-100 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
        Технические характеристики
      </h3>
      
      <div className="space-y-3">
        {attributes.map((attr) => (
          <div 
            key={attr.attribute_id} 
            className="flex flex-col sm:flex-row sm:items-baseline justify-between py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
          >
            {/* Левая часть — Название характеристики (Ключ) */}
            <span className="text-sm text-zinc-500 dark:text-zinc-400 sm:pr-4">
              {attr.name}
            </span>
            
            {/* Точки-заполнители для больших экранов (опционально, для красоты) */}
            <div className="hidden sm:block grow border-b border-dotted border-zinc-200 dark:border-zinc-700 mx-2" />
            
            {/* Правая часть — Индивидуальное значение товара */}
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-1 sm:mt-0 text-right">
              {attr.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
