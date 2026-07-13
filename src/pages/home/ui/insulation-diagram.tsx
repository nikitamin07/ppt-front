const LAYERS = [
  { x: 10, width: 34, fill: "var(--color-line)", label: "Стена", hatch: true },
  { x: 44, width: 58, fill: "var(--color-safety)", label: "Утеплитель", hatch: false },
  { x: 102, width: 14, fill: "var(--color-line)", label: "Штукатурка", hatch: true },
] as const;

//  Схема разреза стены со слоями утепления — чертёжный визуал
export function InsulationDiagram() {
  return (
    <svg viewBox="-20 -14 170 240" className="h-full w-full" aria-hidden>
      <defs>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-ink)" strokeOpacity="0.15" strokeWidth="1.5" />
        </pattern>
      </defs>

      {/* Слои стены. Красим не по порядку: утеплитель (оранжевый) рисуем последним,
          чтобы его обводка легла поверх соседних слоёв на стыках, а не пряталась под ними. */}
      {[LAYERS[0], LAYERS[2], LAYERS[1]].map((layer) => (
        <g key={layer.label} data-diagram-layer style={{ transformOrigin: `${layer.x}px 20px` }}>
          <rect
            x={layer.x}
            y="20"
            width={layer.width}
            height="140"
            fill={layer.hatch ? "url(#hatch)" : layer.fill}
            fillOpacity={layer.hatch ? 1 : 0.18}
            stroke={layer.fill}
            strokeWidth="2"
          />
        </g>
      ))}

      {/* Подписи слоёв */}
      {LAYERS.map((layer, i) => (
        <g key={`label-${layer.label}`} data-diagram-label>
          <line
            x1={layer.x + layer.width / 2}
            y1="160"
            x2={layer.x + layer.width / 2}
            y2={176 + i * 16}
            stroke={layer.hatch ? "var(--color-ink)" : "var(--color-safety)"}
            strokeOpacity={layer.hatch ? "0.3" : "0.7"}
            strokeWidth="1"
          />
          <text
            x={layer.x + layer.width / 2}
            y={184 + i * 16}
            textAnchor="middle"
            className="font-label"
            fontSize="8"
            fill={layer.hatch ? "var(--color-ink)" : "var(--color-safety)"}
            opacity={layer.hatch ? "0.7" : "0.9"}
          >
            {layer.label}
          </text>
        </g>
      ))}

      <g data-diagram-dimension>
        <line x1="44" y1="8" x2="102" y2="8" stroke="var(--color-safety)" strokeWidth="1.5" />
        <line x1="44" y1="4" x2="44" y2="12" stroke="var(--color-safety)" strokeWidth="1.5" />
        <line x1="102" y1="4" x2="102" y2="12" stroke="var(--color-safety)" strokeWidth="1.5" />
        <text x="73" y="3" textAnchor="middle" className="font-label" fontSize="9" fontWeight="600" fill="var(--color-safety)">
          100 мм
        </text>
      </g>
    </svg>
  );
}
