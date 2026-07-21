// Значения точные, без округления: округляем только при выводе, иначе
// округлённый объём даёт лишнюю упаковку на ровных значениях.

// Площадь стены (м2) по высоте и ширине в метрах.
export function calculateArea(heightM: number, widthM: number): number {
  if (heightM <= 0 || widthM <= 0) return 0;
  return heightM * widthM;
}

// Расчет требуемого объема материала (м3) по площади (м2) и толщине слоя (мм).
// Актуально для утеплителей (пенопласт, минвата), которые продаются в м3.
export function calculateVolume(areaM2: number, thicknessMm: number): number {
  if (areaM2 <= 0 || thicknessMm <= 0) return 0;
  return areaM2 * (thicknessMm / 1000);
}

// Количество упаковок под нужный объем: неполную упаковку не продают, поэтому вверх.
// Эпсилон гасит погрешность double — без него ровно две упаковки дают ceil(2.0000000000000004) = 3.
export function calculatePacks(volumeM3: number, cubesPerPack: number): number {
  if (volumeM3 <= 0 || cubesPerPack <= 0) return 0;
  return Math.ceil(volumeM3 / cubesPerPack - 1e-9);
}

// Стоимость: количество (кубы или упаковки) на цену за ту же единицу.
export function calculateCost(quantity: number, pricePerUnit: number): number {
  return Math.round(quantity * pricePerUnit);
}
