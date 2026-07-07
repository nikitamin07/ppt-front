// Расчет требуемого объема материала (м3) по площади (м2) и толщине слоя (мм).
// Актуально для утеплителей (пенопласт, минвата), которые в старом каталоге продаются в м3.
export function calculateVolume(areaM2: number, thicknessMm: number): number {
  if (areaM2 <= 0 || thicknessMm <= 0) return 0;
  return Math.round(areaM2 * (thicknessMm / 1000) * 100) / 100;
}

// Стоимость исходя из объема и цены за м3.
export function calculateCost(volumeM3: number, pricePerM3: number): number {
  return Math.round(volumeM3 * pricePerM3);
}
