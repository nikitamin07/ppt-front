import { notFound } from "next/navigation";
import { MapPinIcon, TruckIcon } from "lucide-react";
import { categoryPath, type CategoryListItem } from "@/entities/category";
import { getProductBySlug, getProducts, ProductGallery, ProductPriceBlock } from "@/entities/product";
import { CalcValueForm } from "@/features/calc-value";
import { OrderCallbackDialog } from "@/features/order-callback";
import { ApiError } from "@/shared/api";
import { CONTACTS } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { CornerFrame } from "@/shared/ui/corner-frame";
import { PhoneLink } from "@/shared/ui/phone-link";
import { Breadcrumbs } from "@/widgets/breadcrumbs";
import { CatalogGrid } from "@/widgets/catalog-grid";
import { ProductTabs } from "./product-tabs";

interface ProductDetailPageProps {
  /** Цепочка категорий товара — она же начало его адреса и хлебных крошек. */
  trail: CategoryListItem[];
  productSlug: string;
}

export async function ProductDetailPage({ trail, productSlug }: ProductDetailPageProps) {
  // Эндпоинт товара ждёт слаг прямой категории — это хвост цепочки.
  const categorySlug = trail[trail.length - 1].slug;

  const product = await getProductBySlug(categorySlug, productSlug).catch((error: unknown) => {
    if (error instanceof ApiError && error.status === 404) return null;
    // Обрыв сети или 500 — это не «товара нет»: молча подменять их на 404 нельзя.
    throw error;
  });

  if (!product) notFound();

  // related_product_ids сейчас всегда [] (фича не включена админом) — берём товары той же
  // категории вместо неё, это и есть «сопутствующие» в терминах доступных данных.
  const similarProducts = await getProducts({ category: categorySlug })
    .then((items) => items.filter((item) => item.slug !== product.slug).slice(0, 4))
    .catch(() => []);

  const effectivePrice = product.discount_price ?? product.price;
  // isCalculative считает бэкенд (настройка категории + вычислимость объёма) — своих условий
  // не добавляем. Ступенчатая цена исключена отдельно: там цена сама зависит от результата.
  const showCalculator = product.isCalculative && !product.is_volume_price;

  return (
    <>
      <Breadcrumbs
        labels={{
          ...Object.fromEntries(trail.map((item) => [item.slug, item.name])),
          [product.slug]: product.name,
        }}
      />

      <section className="container">
        {product.manufacturer ? (
          <p className="font-label text-sm text-muted-foreground">{product.manufacturer.name}</p>
        ) : null}
        <h1 className="mt-1 font-heading text-3xl font-semibold text-balance text-ink sm:text-4xl">
          {product.name}
        </h1>

        {/* Без калькулятора колонок две, но картинка сохраняет ту же ширину — треть ряда. */}
        <div className={cn("mt-8 grid gap-10", showCalculator ? "lg:grid-cols-3" : "lg:grid-cols-[1fr_2fr]")}>
          <ProductGallery images={product.image_urls} name={product.name} />

          <div>
            <ProductPriceBlock product={product} />
            <p className="flex items-start gap-3 my-4">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-safety" />
              Самовывоз: {CONTACTS.address}, {CONTACTS.workHours}
            </p>
            <p className="flex items-start gap-3">
              <TruckIcon className="mt-0.5 size-4 shrink-0 text-safety" />
              Доставка по Минску — от 50 ƃ, дальше цена зависит от расстояния — уточним по звонку.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <OrderCallbackDialog className="w-full px-5 py-3" />
              <PhoneLink phone={CONTACTS.phones[0]} className="justify-center text-sm" />
            </div>
          </div>

          {showCalculator && (
            <CalcValueForm
              price={effectivePrice}
              unit={product.price_unit}
              cubesPerPack={product.cubes_per_pack}
            />
          )}
        </div>
      </section>

      <ProductTabs attributes={product.attributes} description={product.description} />

      <CatalogGrid products={similarProducts} title="Похожие товары" viewAllHref={`/catalog/${categoryPath(trail)}`} />

      <section className="container">
        <div className="border-b border-line pb-5">
          <p className="eyebrow text-xs">Доставка и самовывоз</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-ink sm:text-3xl">Как забрать товар</h2>
        </div>

          <CornerFrame>
            <iframe
              title="ППТ.бел на карте Yandex"
              src="https://yandex.by/map-widget/v1/-/CCU74CcJ1C"
              allowFullScreen
              className="block h-64 w-full border border-line sm:h-full sm:min-h-72"
            />
          </CornerFrame>
      </section>
    </>
  );
}
