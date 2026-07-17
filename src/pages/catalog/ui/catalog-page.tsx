import { getCategoryTree } from "@/entities/category";
import { Breadcrumbs } from "@/widgets/breadcrumbs";
import { CategoryTree } from "@/widgets/category-tree";

export async function CatalogPage() {
  const categories = await getCategoryTree();

  return (
    <>
      <Breadcrumbs />
      <section className="container">
        <h1 className="font-heading text-4xl font-semibold text-ink sm:text-5xl">Каталог</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Утеплители, полистиролбетон, сухие смеси и грунтовки — со склада в Минске. Откройте категорию
          целиком или переходите сразу в нужную подкатегорию.
        </p>
      </section>

      <section className="container mt-8 sm:mt-12">
        {categories.length > 0 ? (
          <CategoryTree categories={categories} />
        ) : (
          <p className="border border-line bg-card p-6 text-sm text-muted-foreground">
            Категории пока не заведены.
          </p>
        )}
      </section>
    </>
  );
}
