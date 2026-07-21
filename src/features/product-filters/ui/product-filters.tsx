"use client";

import { useState } from "react";
import { SlidersHorizontalIcon, XIcon } from "lucide-react";
import type { Manufacturer } from "@/entities/manufacturer";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogClose, DialogPanel, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { useFilterParams } from "../model/use-filter-params";
import { FilterFields } from "./filter-fields";

interface ProductFiltersProps {
  manufacturers: Manufacturer[];
  /** Есть ли что сбрасывать — считается на сервере по адресу страницы. */
  active: boolean;
  className?: string;
}

function ResetButton({ active, onReset }: { active: boolean; onReset: () => void }) {
  if (!active) return null;

  return (
    <button
      type="button"
      onClick={onReset}
      className="font-label text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-safety hover:underline"
    >
      Сбросить
    </button>
  );
}

export function ProductFilters({ manufacturers, active, className }: ProductFiltersProps) {
  const { reset } = useFilterParams();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Десктоп: липкий сайдбар. */}
      <aside className={cn("hidden lg:block", className)}>
        <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
          <h2 className="eyebrow text-xs">Фильтры</h2>
          <ResetButton active={active} onReset={reset} />
        </div>
        <div className="mt-6">
          <FilterFields manufacturers={manufacturers} />
        </div>
      </aside>

      {/* Мобильные: панель занимает пол-экрана, поэтому прячем её за кнопку. */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button variant="ink" className={cn("w-full py-2.5 lg:hidden", className)}>
              <SlidersHorizontalIcon className="size-4" />
              Фильтры{active && " · включены"}
            </Button>
          }
        />
        <DialogPanel className="lg:hidden py-5">
          <div className="flex items-center justify-between gap-4 px-5 border-b border-white/15 pb-4">
            <DialogTitle className="font-heading text-lg font-semibold text-paper">Фильтры</DialogTitle>
            <DialogClose aria-label="Закрыть фильтры" className="text-paper">
              <XIcon className="size-5" />
            </DialogClose>
          </div>

          {/* Панель тёмная — поля внутри инвертируем точечно, а не плодим вторую тему. */}
          <div className="mt-6 px-5 flex-1 overflow-y-auto text-paper [&_.text-ink]:text-paper [&_legend]:text-safety">
            <FilterFields manufacturers={manufacturers} />
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 px-5 border-t border-white/15 pt-4">
            <ResetButton active={active} onReset={reset} />
            <DialogClose
              render={
                <Button variant="safety" className="px-5 py-2.5 w-full">
                  Показать товары
                </Button>
              }
            />
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
