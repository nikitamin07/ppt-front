import { notFound } from "next/navigation";
import { MapPinIcon, TruckIcon } from "lucide-react";
import { categoryPath, type CategoryListItem } from "@/entities/category";
import { getProductBySlug, getProducts, ProductGallery, ProductPriceBlock } from "@/entities/product";
import { CalcValueForm } from "@/features/calc-value";
import { OrderCallbackDialog } from "@/features/order-callback";
import { ApiError, assetUrl } from "@/shared/api";
import { CONTACTS } from "@/shared/config";
import { absoluteUrl, breadcrumbJsonLd } from "@/shared/lib/seo";
import { cn } from "@/shared/lib/utils";
import { JsonLd } from "@/shared/ui/json-ld";
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

  // Оба запроса зависят только от адреса, поэтому идут разом: карточка товара —
  // самый долгий запрос на сайте, ждать за ним ещё один незачем.
  const [product, similarProducts] = await Promise.all([
    getProductBySlug(categorySlug, productSlug).catch((error: unknown) => {
      if (error instanceof ApiError && error.status === 404) return null;
      // Обрыв сети или 500 — это не «товара нет»: молча подменять их на 404 нельзя.
      throw error;
    }),
    // related_product_ids сейчас всегда [] (фича не включена админом) — берём товары той же
    // категории вместо неё, это и есть «сопутствующие» в терминах доступных данных.
    // Отсеиваем по слагу из адреса: он тождественно равен слагу найденного товара.
    getProducts({ category: categorySlug })
      .then((items) => items.filter((item) => item.slug !== productSlug).slice(0, 4))
      .catch(() => []),
  ]);

  if (!product) notFound();

  const effectivePrice = product.discount_price ?? product.price;
  // isCalculative считает бэкенд — своих условий не добавляем. Ступенчатая цена исключена
  // отдельно: там цена сама зависит от результата. null в итоге — калькулятора нет.
  const calcThickness = product.isCalculative && !product.is_volume_price ? product.thickness : null;
  const showCalculator = calcThickness !== null;

  const productUrl = `/catalog/${categoryPath(trail)}/${product.slug}`;
  const productImages = product.image_urls
    .map((image) => assetUrl(image))
    .filter((image): image is string => image !== null);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description || product.name,
          url: absoluteUrl(productUrl),
          ...(productImages.length > 0 && { image: productImages }),
          ...(product.manufacturer && { brand: { "@type": "Brand", name: product.manufacturer.name } }),
          offers: {
            "@type": "Offer",
            // Цена уже в рублях: пересчёт из копеек делает бэкенд.
            price: effectivePrice,
            priceCurrency: "BYN",
            availability: "https://schema.org/InStock",
            url: absoluteUrl(productUrl),
          },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Каталог", path: "/catalog" },
          ...trail.map((item, i) => ({
            name: item.name,
            path: `/catalog/${categoryPath(trail.slice(0, i + 1))}`,
          })),
          { name: product.name, path: productUrl },
        ])}
      />

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

        {/* До lg — две колонки: фото и цена в ряд, калькулятор переносится ниже.
            Без калькулятора картинка на lg сохраняет ту же ширину — треть ряда. */}
        <div
          className={cn(
            "mt-8 grid gap-10 md:grid-cols-2",
            showCalculator ? "lg:grid-cols-3" : "lg:grid-cols-[1fr_2fr]",
          )}
        >
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

          {calcThickness !== null && (
            <CalcValueForm
              price={effectivePrice}
              unit={product.price_unit}
              cubesPerPack={product.cubes_per_pack}
              thickness={calcThickness}
            />
          )}
        </div>
      </section>

      <ProductTabs attributes={product.attributes} description={product.description} />

      <CatalogGrid products={similarProducts} title="Похожие товары" viewAllHref={`/catalog/${categoryPath(trail)}`} />
    </>
  );
}
