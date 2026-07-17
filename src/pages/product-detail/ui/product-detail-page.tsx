import Image from "next/image";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/entities/category";
import { getProductBySlug, ProductPriceBlock, ProductSpecs } from "@/entities/product";
import { OrderCallbackDialog } from "@/features/order-callback";
import { ApiError, assetUrl, NO_IMAGE_SRC } from "@/shared/api";
import { CONTACTS } from "@/shared/config";
import { PhoneLink } from "@/shared/ui/phone-link";
import { Breadcrumbs } from "@/widgets/breadcrumbs";

interface ProductDetailPageProps {
  categorySlug: string;
  productSlug: string;
}

export async function ProductDetailPage({ categorySlug, productSlug }: ProductDetailPageProps) {
  // GET /products/{categorySlug}/{productSlug} само проверяет, что слаг категории — прямая
  // категория товара (а не любая, куда он входит через корень), и 404-ит на любое расхождение.
  const [product, category] = await Promise.all([
    getProductBySlug(categorySlug, productSlug).catch((error: unknown) => {
      if (error instanceof ApiError && error.status === 404) return null;
      // Обрыв сети или 500 — это не «товара нет»: молча подменять их на 404 нельзя.
      throw error;
    }),
    // Нужен только ради названия в хлебных крошках — если не найдётся, покажем сырой слаг.
    getCategoryBySlug(categorySlug).catch(() => null),
  ]);

  if (!product) notFound();

  const image = assetUrl(product.image_url) ?? NO_IMAGE_SRC;

  return (
    <>
      <Breadcrumbs
        labels={{
          ...(category ? { [category.slug]: category.name } : {}),
          [product.slug]: product.name,
        }}
      />

      <section className="container">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-square w-full overflow-hidden border border-line">
            <Image src={image} alt={product.name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
          </div>

          <div>
            {product.manufacturer ? (
              <p className="font-label text-sm text-muted-foreground">{product.manufacturer.name}</p>
            ) : null}
            <h1 className="mt-1 font-heading text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-6">
              <ProductPriceBlock product={product} />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <OrderCallbackDialog className="px-5 py-3" />
              <PhoneLink phone={CONTACTS.phones[0]} className="justify-center text-sm sm:justify-start" />
            </div>
          </div>
        </div>
      </section>

      {product.description ? (
        <section className="container">
          <h2 className="eyebrow text-xs">Описание</h2>
          {/* description — простой текст (не HTML), переносы строк сохраняет глобальный
              white-space: pre-line на body. */}
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink">{product.description}</p>
        </section>
      ) : null}

      <section className="container">
        <ProductSpecs attributes={product.attributes} />
      </section>

      {/* related_product_ids сейчас всегда [] (таблица пуста, фича не включена админом) —
          рендерить блок под пустой список незачем. */}
    </>
  );
}
