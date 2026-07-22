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
        <p className="mt-4 max-w-5xl text-base leading-relaxed text-muted-foreground">
          Утеплители и материалы для отделки со склада в Минске: пенопласт ППТ марок 15, 20 и 25,
          экструдированный пенополистирол (XPS), минеральная и каменная вата, полистиролбетонные блоки и
          плиты, сухие строительные смеси, клеи, штукатурки и грунтовки. Всё, чем дом утепляют снаружи и
          внутри: фасад, стены, полы, кровля, фундамент и цоколь.
        </p>
        <p className="mt-4 max-w-5xl text-base leading-relaxed text-muted-foreground">
          Цена на пенопласт и XPS указана за кубометр, на смеси и грунтовки — за упаковку. Самовывоз со
          склада на Кнорина, 50А. Доставка по Минску — от 50 ƃ, по области и Беларуси цена зависит от
          расстояния. Поможем подобрать марку под нагрузку и рассчитать объём — закажите звонок.
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
