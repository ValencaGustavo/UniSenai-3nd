import {
  Activity,
  Anchor,
  Compass,
  Gauge,
  Layers3,
  Map,
  Plane,
  RadioTower,
  Route as RouteIcon,
  Satellite,
  ShieldCheck,
  Truck,
  Warehouse,
} from "lucide-react";
import { cn } from "../../lib/utils.js";

const VIEW = {
  width: 620,
  height: 620,
  padX: 40,
  padY: 30,
  lngMin: -75.3,
  lngMax: -33.5,
  latMin: -34.4,
  latMax: 5.8,
};

const BORDER = [
  [-53.374, -33.768], [-53.651, -33.202], [-53.21, -32.728],
  [-53.788, -32.047], [-54.572, -31.495], [-55.602, -30.854],
  [-55.973, -30.883], [-56.976, -30.11], [-57.625, -30.216],
  [-56.291, -28.853], [-55.162, -27.882], [-54.491, -27.475],
  [-53.649, -26.923], [-53.628, -26.125], [-54.13, -25.548],
  [-54.625, -25.739], [-54.429, -25.162], [-54.293, -24.571],
  [-54.293, -24.021], [-54.653, -23.84], [-55.028, -24.001],
  [-55.401, -23.957], [-55.518, -23.572], [-55.611, -22.656],
  [-55.798, -22.357], [-56.473, -22.086], [-56.882, -22.282],
  [-57.937, -22.09], [-57.871, -20.733], [-58.166, -20.177],
  [-57.854, -19.97], [-57.95, -19.4], [-57.676, -18.962],
  [-57.498, -18.174], [-57.735, -17.552], [-58.281, -17.272],
  [-58.388, -16.877], [-58.241, -16.3], [-60.158, -16.258],
  [-60.543, -15.094], [-60.251, -15.077], [-60.264, -14.646],
  [-60.459, -14.354], [-60.503, -13.776], [-61.084, -13.479],
  [-61.713, -13.489], [-62.127, -13.199], [-62.803, -13.001],
  [-63.196, -12.627], [-64.316, -12.462], [-65.402, -11.566],
  [-65.322, -10.896], [-65.445, -10.511], [-65.338, -9.762],
  [-66.647, -9.931], [-67.174, -10.307], [-68.048, -10.712],
  [-68.271, -11.015], [-68.786, -11.036], [-69.53, -10.952],
  [-70.094, -11.124], [-70.549, -11.009], [-70.482, -9.49],
  [-71.302, -10.079], [-72.185, -10.054], [-72.563, -9.52],
  [-73.227, -9.462], [-73.015, -9.033], [-73.571, -8.424],
  [-73.987, -7.524], [-73.723, -7.341], [-73.724, -6.919],
  [-73.12, -6.63], [-73.22, -6.089], [-72.965, -5.741],
  [-72.892, -5.275], [-71.748, -4.594], [-70.929, -4.402],
  [-70.795, -4.251], [-69.894, -4.298], [-69.444, -1.556],
  [-69.42, -1.123], [-69.577, -0.55], [-70.021, -0.185],
  [-70.016, 0.541], [-69.452, 0.706], [-69.252, 0.603],
  [-69.219, 0.986], [-69.805, 1.089], [-69.817, 1.715],
  [-67.869, 1.692], [-67.538, 2.037], [-67.26, 1.72],
  [-67.065, 1.13], [-66.876, 1.253], [-66.326, 0.724],
  [-65.548, 0.789], [-65.355, 1.095], [-64.611, 1.329],
  [-64.199, 1.493], [-64.083, 1.916], [-63.369, 2.201],
  [-63.423, 2.411], [-64.27, 2.497], [-64.409, 3.127],
  [-64.368, 3.797], [-64.816, 4.056], [-64.629, 4.148],
  [-63.888, 4.021], [-63.093, 3.771], [-62.805, 4.007],
  [-62.085, 4.162], [-60.967, 4.536], [-60.601, 4.918],
  [-60.734, 5.2], [-60.214, 5.244], [-59.981, 5.014],
  [-60.111, 4.575], [-59.767, 4.424], [-59.538, 3.959],
  [-59.815, 3.606], [-59.975, 2.755], [-59.719, 2.25],
  [-59.646, 1.787], [-59.031, 1.318], [-58.54, 1.268],
  [-58.429, 1.464], [-58.113, 1.507], [-57.661, 1.683],
  [-57.336, 1.949], [-56.783, 1.864], [-56.539, 1.9],
  [-55.996, 1.818], [-55.906, 2.022], [-56.073, 2.221],
  [-55.973, 2.51], [-55.57, 2.422], [-55.098, 2.524],
  [-54.525, 2.312], [-54.088, 2.106], [-53.779, 2.377],
  [-53.555, 2.335], [-53.418, 2.053], [-52.94, 2.125],
  [-52.556, 2.505], [-52.249, 3.241], [-51.658, 4.156],
  [-51.317, 4.203], [-51.07, 3.65], [-50.509, 1.902],
  [-49.974, 1.736], [-49.947, 1.046], [-50.699, 0.223],
  [-50.388, -0.078], [-48.621, -0.235], [-48.584, -1.238],
  [-47.825, -0.582], [-46.567, -0.941], [-44.906, -1.552],
  [-44.418, -2.138], [-44.582, -2.691], [-43.419, -2.383],
  [-41.473, -2.912], [-39.979, -2.873], [-38.5, -3.701],
  [-37.223, -4.821], [-36.453, -5.109], [-35.598, -5.15],
  [-35.235, -5.465], [-34.896, -6.738], [-34.73, -7.343],
  [-35.128, -8.996], [-35.637, -9.649], [-37.047, -11.041],
  [-37.684, -12.171], [-38.424, -13.038], [-38.674, -13.058],
  [-38.953, -13.793], [-38.882, -15.667], [-39.161, -17.208],
  [-39.267, -17.868], [-39.584, -18.262], [-39.761, -19.599],
  [-40.775, -20.905], [-40.945, -21.937], [-41.754, -22.371],
  [-41.988, -22.97], [-43.075, -22.968], [-44.648, -23.352],
  [-45.352, -23.797], [-46.472, -24.089], [-47.649, -24.885],
  [-48.495, -25.877], [-48.641, -26.624], [-48.475, -27.176],
  [-48.662, -28.186], [-48.888, -28.674], [-49.587, -29.224],
  [-50.697, -30.984], [-51.576, -31.778], [-52.256, -32.245],
  [-52.712, -33.197], [-53.374, -33.768],
];

const CITIES = [
  { code: "LDB", name: "Londrina", state: "PR", lat: -23.3045, lng: -51.1696, hq: true, active: true },
  { code: "CWB", name: "Curitiba", state: "PR", lat: -25.4284, lng: -49.2733, active: true, volume: 9, labelDx: 15, labelDy: 23, showVolume: false, compact: true, hideLabel: true },
  { code: "MGF", name: "Maringa", state: "PR", lat: -23.4205, lng: -51.9333, active: true, volume: 6, labelDx: -39, labelDy: -16, anchor: "end", showVolume: false, compact: true },
  { code: "PGZ", name: "Ponta Grossa", state: "PR", lat: -25.0950, lng: -50.1619, active: true, volume: 8, labelDx: -32, labelDy: 15, anchor: "end", showVolume: false, compact: true, hideLabel: true },
  { code: "SAO", name: "Sao Paulo", state: "SP", lat: -23.5505, lng: -46.6333, active: false, labelDx: 15, labelDy: -12, compact: true },
  { code: "RIO", name: "Rio de Janeiro", state: "RJ", lat: -22.9068, lng: -43.1729, active: true, volume: 14, labelDx: 16, labelDy: 18, showVolume: false },
  { code: "BHZ", name: "Belo Horizonte", state: "MG", lat: -19.9167, lng: -43.9345, active: true, volume: 11, labelDx: 12, labelDy: -11 },
  { code: "BSB", name: "Brasilia", state: "DF", lat: -15.7939, lng: -47.8828, active: true, volume: 7, labelDx: 13, labelDy: -8 },
  { code: "SSA", name: "Salvador", state: "BA", lat: -12.9777, lng: -38.5016, active: true, volume: 18, alert: true, labelDx: -12, labelDy: -14, anchor: "end" },
  { code: "REC", name: "Recife", state: "PE", lat: -8.0476, lng: -34.8770, active: true, volume: 12, labelDx: -12, labelDy: -11, anchor: "end" },
  { code: "FOR", name: "Fortaleza", state: "CE", lat: -3.7319, lng: -38.5267, active: false, labelDx: 9, labelDy: -1 },
  { code: "BEL", name: "Belem", state: "PA", lat: -1.4558, lng: -48.4902, active: false, labelDx: 9, labelDy: -1 },
  { code: "MAO", name: "Manaus", state: "AM", lat: -3.1190, lng: -60.0217, active: false, labelDx: 9, labelDy: -1 },
  { code: "POA", name: "Porto Alegre", state: "RS", lat: -30.0346, lng: -51.2177, active: false, labelDx: 9, labelDy: 12 },
];

const HUBS = [
  { code: "STS", label: "Santos", lat: -23.9608, lng: -46.3336, type: "port", value: "19", labelDx: 10, labelDy: 8 },
  { code: "ITJ", label: "Itajai", lat: -26.9101, lng: -48.6705, type: "port", value: "11", labelDx: 10, labelDy: 9 },
  { code: "LDB-AIR", label: "Aeroporto LDB", lat: -23.3336, lng: -51.1301, type: "air", value: "08", hideLabel: true },
  { code: "CNF", label: "Confins", lat: -19.6338, lng: -43.9689, type: "air", value: "06", labelDx: 10, labelDy: -9 },
  { code: "GYN", label: "Goiania", lat: -16.6869, lng: -49.2648, type: "hub", value: "07", labelDx: 10, labelDy: -8 },
  { code: "SSA-CD", label: "Crossdock", lat: -12.87, lng: -38.58, type: "hub", value: "14", labelDx: 10, labelDy: 9 },
];

const ROUTES = [
  { from: "LDB", to: "CWB", progress: 0.62, state: "ok", vehicle: "TRK-418", eta: "1h42", bend: -30, badgeDx: -83, badgeDy: 16, compact: true, hideBadge: true },
  { from: "LDB", to: "SSA", progress: 0.41, state: "alarm", vehicle: "TRK-902", eta: "9h18", bend: 44, badgeDx: 16, badgeDy: -50 },
  { from: "LDB", to: "RIO", progress: 0.58, state: "ok", vehicle: "TRK-177", eta: "3h05", bend: 18, badgeDx: 18, badgeDy: 10, compact: true },
  { from: "LDB", to: "BHZ", progress: 0.35, state: "ok", vehicle: "TRK-612", eta: "4h20", bend: -20, badgeDx: -76, badgeDy: -42, compact: true },
];

const STATE_LINES = [
  [[-54.6, -24.0], [-52.2, -24.2], [-50.1, -24.7], [-48.6, -25.2], [-47.6, -25.5]],
  [[-53.8, -22.7], [-51.0, -22.9], [-48.8, -23.3], [-46.6, -23.7], [-44.8, -23.9]],
  [[-49.8, -17.5], [-48.4, -19.2], [-46.5, -20.8], [-44.1, -21.6], [-42.2, -22.1]],
  [[-50.0, -15.5], [-48.0, -15.9], [-46.8, -16.8], [-45.2, -18.4], [-44.0, -19.6]],
  [[-56.5, -29.1], [-53.5, -28.7], [-51.4, -28.3], [-49.2, -27.6]],
  [[-61.2, -12.5], [-57.5, -13.2], [-54.2, -14.0], [-50.0, -15.5]],
];

const RODOVIAS = [
  { code: "BR-369", label: "Londrina-Apucarana", veiculos: 22, capacity: 0.54, alerts: 0 },
  { code: "BR-376", label: "Norte do Parana", veiculos: 34, capacity: 0.72, alerts: 1 },
  { code: "BR-116", label: "Eixo Sul-Sudeste", veiculos: 47, capacity: 0.82, alerts: 2 },
  { code: "BR-101", label: "Litoral", veiculos: 31, capacity: 0.61, alerts: 0 },
  { code: "BR-040", label: "Rio-Brasilia", veiculos: 18, capacity: 0.45, alerts: 0 },
];

const MAP_STATUS = [
  { icon: Satellite, label: "Link sat", value: "99.98%" },
  { icon: RadioTower, label: "Ping", value: "214ms" },
  { icon: ShieldCheck, label: "SLA", value: "97.4%" },
];

function project(lng, lat) {
  const x = VIEW.padX + ((lng - VIEW.lngMin) / (VIEW.lngMax - VIEW.lngMin)) * (VIEW.width - VIEW.padX * 2);
  const y = VIEW.padY + ((VIEW.latMax - lat) / (VIEW.latMax - VIEW.latMin)) * (VIEW.height - VIEW.padY * 2);
  return [Number(x.toFixed(2)), Number(y.toFixed(2))];
}

function pathFromCoords(coords) {
  return coords.map(([lng, lat], index) => {
    const [x, y] = project(lng, lat);
    return `${index === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ") + " Z";
}

function polylinePath(coords) {
  return coords.map(([lng, lat], index) => {
    const [x, y] = project(lng, lat);
    return `${index === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");
}

function city(code) {
  return CITIES.find((item) => item.code === code);
}

function routePath(route) {
  const from = city(route.from);
  const to = city(route.to);
  const [x1, y1] = project(from.lng, from.lat);
  const [x2, y2] = project(to.lng, to.lat);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.max(1, Math.hypot(dx, dy));
  const cx = mx + (-dy / length) * route.bend;
  const cy = my + (dx / length) * route.bend;
  return { d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, from: [x1, y1], control: [cx, cy], to: [x2, y2] };
}

function pointOnQuadratic([x1, y1], [cx, cy], [x2, y2], t) {
  const x = (1 - t) ** 2 * x1 + 2 * (1 - t) * t * cx + t ** 2 * x2;
  const y = (1 - t) ** 2 * y1 + 2 * (1 - t) * t * cy + t ** 2 * y2;
  return [x, y];
}

const BRAZIL_PATH = pathFromCoords(BORDER);

export default function BrasilGrid() {
  return (
    <section className="brazil-map-panel panel-enter surface relative overflow-hidden border border-white/70 bg-white">
      <header className="relative z-10 flex flex-col gap-3 border-b border-hairline bg-white/94 px-5 py-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <span className="head-rule w-8" />
          <div>
            <h2 className="font-display text-[15px] font-semibold text-zinc-950">
              Malha Nacional
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
              [ HQ Londrina/PR · {ROUTES.length} rotas ativas · pontos fixos por coordenada · sat. live ]
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="hidden items-center gap-2 lg:flex">
            {MAP_STATUS.map((item) => (
              <HeaderMetric key={item.label} {...item} />
            ))}
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-[5px] border border-zinc-200 bg-white px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-700 shadow-[0_1px_0_0_rgb(10_10_10_/_0.03)] hover:bg-zinc-50">
            <Layers3 size={13} strokeWidth={1.8} />
            Camadas
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-[5px] border border-zinc-200 bg-white px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-700 shadow-[0_1px_0_0_rgb(10_10_10_/_0.03)] hover:bg-zinc-50">
            <Map size={13} strokeWidth={1.8} />
            Mapa
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-[5px] border border-[color:var(--color-brand-deep)] bg-[color:var(--color-brand)] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white">
            <Activity size={13} strokeWidth={2} />
            Live
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.45fr)_minmax(330px,0.75fr)]">
        <RealBrazilMap />
        <HighwayTelemetry />
      </div>
    </section>
  );
}

function HeaderMetric({ icon: Icon, label, value }) {
  return (
    <div className="inline-flex items-center gap-2 border-l border-zinc-200 pl-3">
      <span className="grid h-6 w-6 place-items-center rounded-[5px] border border-zinc-200 bg-zinc-50 text-[color:var(--color-brand)]">
        <Icon size={13} strokeWidth={1.8} />
      </span>
      <span className="leading-none">
        <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-400">
          {label}
        </span>
        <span className="mt-1 block font-mono text-[11px] font-semibold tabular-nums text-zinc-900">
          {value}
        </span>
      </span>
    </div>
  );
}

function RealBrazilMap() {
  return (
    <div className="relative min-h-[620px] overflow-hidden bg-[#e7f0fa] p-3 sm:p-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 62% 34%, rgb(255 255 255 / 0.84), transparent 22rem), radial-gradient(circle at 54% 73%, rgb(31 79 143 / 0.10), transparent 18rem), linear-gradient(135deg, #f6fbff 0%, #e6f0fb 46%, #dfeaf6 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(31 79 143 / 0.06) 1px, transparent 1px), linear-gradient(0deg, rgb(31 79 143 / 0.055) 1px, transparent 1px), radial-gradient(circle at 1px 1px, rgb(31 79 143 / 0.13) 1px, transparent 0)",
          backgroundSize: "56px 56px, 56px 56px, 12px 12px",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white/50 to-transparent" />
      <MapLiveDock />
      <LayerDock />
      <div className="absolute right-5 top-5 z-20 flex items-start gap-3">
        <CompassRose />
        <div className="hidden flex-col items-end font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500 sm:flex">
          <span>FRAME · 0002.1426</span>
          <span className="flex items-center gap-1 text-[color:var(--color-hazard)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-hazard)]" />
            REC
          </span>
        </div>
      </div>
      <MapInsetZoom />

      <svg viewBox={`0 0 ${VIEW.width} ${VIEW.height}`} className="relative z-[1] h-[610px] w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="real-land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fffdf6" />
            <stop offset="55%" stopColor="#f7f0df" />
            <stop offset="100%" stopColor="#eef6f2" />
          </linearGradient>
          <radialGradient id="land-depth" cx="54%" cy="68%" r="78%">
            <stop offset="0%" stopColor="#d7282f" stopOpacity="0.13" />
            <stop offset="42%" stopColor="#f4c26a" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#1f4f8f" stopOpacity="0.08" />
          </radialGradient>
          <pattern id="terrain-lines" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(-14)">
            <path d="M 0 17 L 18 17" stroke="rgb(31 79 143 / 0.18)" strokeWidth="0.45" />
          </pattern>
          <radialGradient id="hq-halo">
            <stop offset="0%" stopColor="#d7282f" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#d7282f" stopOpacity="0" />
          </radialGradient>
          <filter id="map-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="14" stdDeviation="12" floodOpacity="0.16" floodColor="#1f4f8f" />
            <feDropShadow dx="0" dy="1" stdDeviation="0.8" floodOpacity="0.18" floodColor="#0f172a" />
          </filter>
          <clipPath id="real-brazil-clip">
            <path d={BRAZIL_PATH} />
          </clipPath>
        </defs>

        <Graticule />
        <text x="444" y="354" fill="rgb(31 41 55 / 0.30)" fontFamily="JetBrains Mono, monospace" fontSize="12" fontStyle="italic" letterSpacing="0.16em">
          OCEANO ATLÂNTICO
        </text>
        <text x="126" y="524" fill="rgb(31 41 55 / 0.24)" fontFamily="JetBrains Mono, monospace" fontSize="9" fontStyle="italic" letterSpacing="0.16em">
          ARG · PAR · URU
        </text>

        <path d={BRAZIL_PATH} fill="none" stroke="rgb(31 79 143 / 0.12)" strokeWidth="12" opacity="0.95" />
        <path d={BRAZIL_PATH} fill="none" stroke="rgb(255 255 255 / 0.72)" strokeWidth="5" opacity="0.72" />
        <path d={BRAZIL_PATH} fill="url(#real-land)" stroke="rgb(15 23 42 / 0.55)" strokeWidth="1.1" filter="url(#map-shadow)" />
        <path d={BRAZIL_PATH} fill="url(#land-depth)" opacity="0.62" />
        <path d={BRAZIL_PATH} fill="none" stroke="rgb(255 255 255 / 0.82)" strokeWidth="2" />

        <g clipPath="url(#real-brazil-clip)">
          <rect x="0" y="0" width={VIEW.width} height={VIEW.height} fill="url(#terrain-lines)" opacity="0.32" />
          <path d="M 168 315 C 232 285 313 287 392 320" fill="none" stroke="rgb(31 79 143 / 0.12)" strokeWidth="1.1" strokeDasharray="3 7" />
          <path d="M 198 356 C 276 333 365 337 445 380" fill="none" stroke="rgb(31 79 143 / 0.10)" strokeWidth="1.1" strokeDasharray="3 7" />
          <path d="M 248 406 C 315 385 398 398 477 448" fill="none" stroke="rgb(31 79 143 / 0.09)" strokeWidth="1" strokeDasharray="3 7" />
          <HeatPath from="LDB" to="SSA" width={36} color="#d7282f" opacity={0.10} bend={44} />
          <HeatPath from="LDB" to="RIO" width={30} color="#1f4f8f" opacity={0.08} bend={18} />
          <HeatPath from="LDB" to="CWB" width={24} color="#16a34a" opacity={0.08} bend={-30} />
          {STATE_LINES.map((coords, index) => (
            <path key={index} d={polylinePath(coords)} fill="none" stroke="rgb(31 41 55 / 0.22)" strokeWidth="0.8" strokeDasharray="4 5" />
          ))}
        </g>

        {ROUTES.map((route) => (
          <RouteLine key={`${route.from}-${route.to}`} route={route} />
        ))}
        {HUBS.map((hub) => (
          <HubPoint key={hub.code} hub={hub} />
        ))}
        {CITIES.map((item) => (
          item.hq ? <HQPoint key={item.code} item={item} /> : <CityPoint key={item.code} item={item} />
        ))}

        <ScaleBar />
      </svg>
    </div>
  );
}

function Graticule() {
  const latLines = [-30, -20, -10, 0];
  const lngLines = [-72, -60, -48, -36];
  return (
    <g>
      {latLines.map((lat) => {
        const [, y] = project(VIEW.lngMin, lat);
        return (
          <g key={lat}>
            <line x1="0" y1={y} x2={VIEW.width} y2={y} stroke="rgb(31 79 143 / 0.12)" strokeDasharray="3 6" />
            <text x="8" y={y - 4} fill="rgb(31 79 143 / 0.50)" fontFamily="JetBrains Mono, monospace" fontSize="9">
              {lat}°
            </text>
          </g>
        );
      })}
      {lngLines.map((lng) => {
        const [x] = project(lng, VIEW.latMin);
        return (
          <g key={lng}>
            <line x1={x} y1="0" x2={x} y2={VIEW.height} stroke="rgb(31 79 143 / 0.10)" strokeDasharray="3 6" />
            <text x={x + 4} y={VIEW.height - 8} fill="rgb(31 79 143 / 0.50)" fontFamily="JetBrains Mono, monospace" fontSize="9">
              {Math.abs(lng)}°W
            </text>
          </g>
        );
      })}
    </g>
  );
}

function HeatPath({ from, to, width, color, opacity, bend }) {
  const route = routePath({ from, to, bend });
  return <path d={route.d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" opacity={opacity} />;
}

function RouteLine({ route }) {
  const data = routePath(route);
  const [vx, vy] = pointOnQuadratic(data.from, data.control, data.to, route.progress);
  const color = route.state === "alarm" ? "#d7282f" : "#1f4f8f";
  const badgeX = vx + (route.badgeDx ?? 9);
  const badgeY = vy + (route.badgeDy ?? -26);
  return (
    <g>
      <path d={data.d} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" opacity="0.10" />
      <path d={data.d} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="8 6" className="route-flow" />
      <g transform={`translate(${vx}, ${vy})`}>
        <circle r="8" fill={color} opacity="0.18" />
        <rect x="-5" y="-5" width="10" height="10" rx="2" fill={color} stroke="#fff" strokeWidth="1.3" />
      </g>
      {!route.hideBadge && <RouteBadge x={badgeX} y={badgeY} route={route} color={color} compact={route.compact} />}
    </g>
  );
}

function CityPoint({ item }) {
  const [x, y] = project(item.lng, item.lat);
  const labelAnchor = item.anchor ?? (x > 470 ? "end" : "start");
  const labelX = item.labelDx ?? (x > 470 ? -9 : 9);
  const labelY = item.labelDy ?? -2;
  const fontSize = item.compact ? 8.3 : 9.5;
  const showVolume = item.volume && item.showVolume !== false;
  return (
    <g transform={`translate(${x}, ${y})`}>
      {item.alert && <circle r="30" fill="#d7282f" opacity="0.12" />}
      {item.active && <circle r={item.compact ? 9 : 11} fill="none" stroke="#1f4f8f" strokeWidth="1" opacity="0.42" />}
      <circle r={item.active ? (item.compact ? 3.6 : 4.2) : 2.5} fill={item.active ? "#1f4f8f" : "#71717a"} stroke="#fff" strokeWidth="1.2" />
      {!item.hideLabel && (
        <>
          <line x1={labelX > 0 ? 5 : -5} y1={labelY > 0 ? 4 : -4} x2={labelX + (labelAnchor === "end" ? 5 : -5)} y2={labelY - 3} stroke="rgb(15 23 42 / 0.18)" strokeWidth="0.8" />
          <text x={labelX} y={labelY} textAnchor={labelAnchor} fill={item.active ? "#111827" : "#52525b"} fontFamily="JetBrains Mono, monospace" fontSize={fontSize} fontWeight={item.active ? "800" : "600"}>
            {item.code}
          </text>
          {showVolume && (
            <g transform={`translate(${labelX}, ${labelY + 10})`}>
              <rect x={labelAnchor === "end" ? -22 : 0} y="-7" width="22" height="11" rx="2" fill="#fff" stroke="#1f4f8f" strokeWidth="0.8" />
              <text x={labelAnchor === "end" ? -11 : 11} y="1" textAnchor="middle" fill="#1f4f8f" fontFamily="JetBrains Mono, monospace" fontSize="7" fontWeight="800">
                {item.volume}
              </text>
            </g>
          )}
        </>
      )}
    </g>
  );
}

function HQPoint({ item }) {
  const [x, y] = project(item.lng, item.lat);
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r="46" fill="url(#hq-halo)" />
      <circle r="16" fill="#d7282f" opacity="0.16" />
      <path d="M 0 -9 L 2.6 -2.8 L 9 -2.8 L 3.8 1.3 L 5.7 8 L 0 4 L -5.7 8 L -3.8 1.3 L -9 -2.8 L -2.6 -2.8 Z" fill="#d7282f" stroke="#9f1b22" strokeWidth="0.8" />
      <circle r="2.2" fill="#fff" />
      <g transform="translate(13, -22)">
        <rect x="0" y="0" width="78" height="22" rx="4" fill="#d7282f" stroke="#9f1b22" strokeWidth="0.8" />
        <text x="39" y="14" textAnchor="middle" fill="#fff" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="800" letterSpacing="0.12em">
          HQ · LDB
        </text>
      </g>
      <text x="-12" y="22" textAnchor="end" fill="#0a0a0a" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="800">
        Londrina/PR
      </text>
    </g>
  );
}

function HubPoint({ hub }) {
  const [x, y] = project(hub.lng, hub.lat);
  const palette = {
    port: { fill: "#0f766e", label: Anchor },
    air: { fill: "#1f4f8f", label: Plane },
    hub: { fill: "#18181b", label: Warehouse },
  }[hub.type];
  const Icon = palette.label;
  const labelX = hub.labelDx ?? 10;
  const labelY = hub.labelDy ?? -3;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r="12" fill={palette.fill} opacity="0.13" />
      <rect x="-7" y="-7" width="14" height="14" rx="3" fill={palette.fill} stroke="#fff" strokeWidth="1.1" />
      <foreignObject x="-6" y="-6" width="12" height="12">
        <div className="flex h-3 w-3 items-center justify-center text-white">
          <Icon size={10} strokeWidth={2} />
        </div>
      </foreignObject>
      {!hub.hideLabel && (
        <>
          <text x={labelX} y={labelY} fill={palette.fill} fontFamily="JetBrains Mono, monospace" fontSize="7.5" fontWeight="800">
            {hub.code}
          </text>
          <text x={labelX} y={labelY + 9} fill="#52525b" fontFamily="JetBrains Mono, monospace" fontSize="6.5">
            {hub.value} ops
          </text>
        </>
      )}
    </g>
  );
}

function RouteBadge({ x, y, route, color, compact = false }) {
  const width = compact ? 56 : 64;
  const height = compact ? 23 : 27;
  const fontSize = compact ? 7 : 8;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width={width} height={height} rx="4" fill="rgb(255 255 255 / 0.96)" stroke={color} strokeWidth="1" />
      <rect x="1" y="1" width="7" height={height - 2} rx="3" fill={color} />
      <text x="13" y={compact ? 10 : 11} fill="#0a0a0a" fontFamily="JetBrains Mono, monospace" fontSize={fontSize} fontWeight="800">
        {route.vehicle}
      </text>
      <text x="13" y={compact ? 19 : 21} fill={color} fontFamily="JetBrains Mono, monospace" fontSize={fontSize} fontWeight="800">
        ETA {route.eta}
      </text>
    </g>
  );
}

function ScaleBar() {
  return (
    <g transform="translate(110, 570)">
      <text x="0" y="-9" fill="#52525b" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="0.15em">
        ESCALA
      </text>
      <rect x="0" y="0" width="28" height="5" fill="#0a0a0a" />
      <rect x="28" y="0" width="28" height="5" fill="#fff" stroke="#0a0a0a" strokeWidth="0.5" />
      <rect x="56" y="0" width="28" height="5" fill="#0a0a0a" />
      <text x="0" y="18" fill="#0a0a0a" fontFamily="JetBrains Mono, monospace" fontSize="8" fontWeight="700">0</text>
      <text x="42" y="18" textAnchor="middle" fill="#0a0a0a" fontFamily="JetBrains Mono, monospace" fontSize="8">250</text>
      <text x="84" y="18" textAnchor="end" fill="#0a0a0a" fontFamily="JetBrains Mono, monospace" fontSize="8" fontWeight="700">500 KM</text>
    </g>
  );
}

function MapLiveDock() {
  const totalVehicles = RODOVIAS.reduce((sum, item) => sum + item.veiculos, 0);
  return (
    <div className="absolute left-5 top-5 z-20 hidden w-[228px] overflow-hidden rounded-[8px] border border-white/75 bg-white/84 shadow-[0_18px_40px_-24px_rgb(15_23_42_/_0.65)] backdrop-blur-md md:block">
      <div className="flex items-center justify-between border-b border-white/70 bg-zinc-950 px-3 py-2 text-white">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em]">
          <span className="live-dot" />
          Torre nacional
        </span>
        <span className="font-mono text-[10px] tabular-nums text-zinc-300">31 sats</span>
      </div>
      <div className="grid grid-cols-3 divide-x divide-zinc-200/80">
        <DockMetric label="Frota" value={totalVehicles} />
        <DockMetric label="ETA médio" value="5h12" />
        <DockMetric label="Risco" value="B2" tone="alarm" />
      </div>
      <div className="border-t border-zinc-200/80 px-3 py-2">
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-500">
          <span>Capacidade troncal</span>
          <span className="tabular-nums text-zinc-800">82%</span>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-zinc-200">
          <span className="block h-full w-[82%] bg-[color:var(--color-brand)]" />
        </div>
      </div>
    </div>
  );
}

function DockMetric({ label, value, tone = "brand" }) {
  return (
    <div className="px-3 py-2">
      <span className="block font-mono text-[8px] uppercase tracking-[0.12em] text-zinc-400">
        {label}
      </span>
      <span className={cn("mt-1 block font-mono text-[13px] font-bold tabular-nums", tone === "alarm" ? "text-[color:var(--color-hazard)]" : "text-zinc-950")}>
        {value}
      </span>
    </div>
  );
}

function LayerDock() {
  const items = [
    { icon: Compass, label: "Coordenadas" },
    { icon: RouteIcon, label: "Rotas" },
    { icon: Truck, label: "Frota" },
    { icon: Gauge, label: "Uso" },
  ];
  return (
    <div className="absolute left-5 top-64 z-20 hidden overflow-hidden rounded-[8px] border border-white/70 bg-white/82 p-1 shadow-[0_12px_30px_-22px_rgb(15_23_42_/_0.55)] backdrop-blur-md sm:block">
      {items.map(({ icon: Icon, label }) => (
        <button key={label} className="grid h-10 w-10 place-items-center rounded-[6px] text-zinc-600 transition hover:bg-white hover:text-[color:var(--color-brand)]" title={label} aria-label={label}>
          <Icon size={15} strokeWidth={1.8} />
        </button>
      ))}
    </div>
  );
}

function CompassRose() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" className="drop-shadow-sm">
      <circle cx="21" cy="21" r="18" fill="#ffffff" stroke="#1f4f8f" strokeWidth="0.8" />
      <circle cx="21" cy="21" r="13" fill="none" stroke="#1f4f8f" strokeWidth="0.45" strokeDasharray="1 2" opacity="0.55" />
      <path d="M21 3 L24 21 L21 17 L18 21 Z" fill="#d7282f" />
      <path d="M21 39 L24 21 L21 25 L18 21 Z" fill="#1f4f8f" />
      <path d="M39 21 L21 24 L25 21 L21 18 Z" fill="#71717a" />
      <path d="M3 21 L21 24 L17 21 L21 18 Z" fill="#71717a" />
      <text x="21" y="10" textAnchor="middle" fill="#d7282f" fontFamily="Bricolage Grotesque, sans-serif" fontSize="8" fontWeight="800">N</text>
      <text x="21" y="37" textAnchor="middle" fill="#1f4f8f" fontFamily="Bricolage Grotesque, sans-serif" fontSize="7" fontWeight="700">S</text>
      <text x="35" y="23" textAnchor="middle" fill="#52525b" fontFamily="Bricolage Grotesque, sans-serif" fontSize="7" fontWeight="700">L</text>
      <text x="7" y="23" textAnchor="middle" fill="#52525b" fontFamily="Bricolage Grotesque, sans-serif" fontSize="7" fontWeight="700">O</text>
      <circle cx="21" cy="21" r="1.8" fill="#1f4f8f" />
    </svg>
  );
}

function MapInsetZoom() {
  const nodes = [
    { code: "MGF", x: 52, y: 43, tone: "blue" },
    { code: "LDB", x: 94, y: 54, tone: "hq" },
    { code: "PGZ", x: 85, y: 95, tone: "blue" },
    { code: "CWB", x: 122, y: 115, tone: "green" },
    { code: "SAO", x: 171, y: 74, tone: "dark" },
    { code: "RIO", x: 202, y: 92, tone: "blue" },
  ];
  const color = {
    blue: "#1f4f8f",
    green: "#0f766e",
    dark: "#18181b",
    hq: "#d7282f",
  };

  return (
    <div className="absolute bottom-5 right-5 z-20 hidden w-[252px] overflow-hidden rounded-[8px] border border-white/75 bg-white/86 shadow-[0_18px_42px_-24px_rgb(15_23_42_/_0.66)] backdrop-blur-md lg:block">
      <div className="flex items-center justify-between border-b border-white/80 bg-zinc-950 px-3 py-2 text-white">
        <span className="font-mono text-[9px] uppercase tracking-[0.15em]">Zoom HQ Londrina</span>
        <span className="font-mono text-[9px] text-zinc-400">PR/SP/RJ</span>
      </div>
      <svg viewBox="0 0 230 142" className="h-[142px] w-full bg-[linear-gradient(135deg,rgb(248_250_252),rgb(239_246_255))]">
        <path d="M 94 54 C 106 68 111 88 122 115" fill="none" stroke="#16a34a" strokeWidth="7" strokeLinecap="round" opacity="0.10" />
        <path d="M 94 54 C 117 44 145 48 171 74" fill="none" stroke="#1f4f8f" strokeWidth="7" strokeLinecap="round" opacity="0.09" />
        <path d="M 94 54 C 135 36 184 43 202 92" fill="none" stroke="#1f4f8f" strokeWidth="7" strokeLinecap="round" opacity="0.08" />
        <path d="M 94 54 C 106 68 111 88 122 115" fill="none" stroke="#16a34a" strokeWidth="1.7" strokeDasharray="6 5" className="route-flow" />
        <path d="M 94 54 C 117 44 145 48 171 74" fill="none" stroke="#1f4f8f" strokeWidth="1.7" strokeDasharray="6 5" className="route-flow" />
        <path d="M 94 54 C 135 36 184 43 202 92" fill="none" stroke="#1f4f8f" strokeWidth="1.7" strokeDasharray="6 5" className="route-flow" />
        <path d="M 34 22 C 72 4 130 10 183 31 C 211 47 218 78 204 107 C 189 137 141 139 95 126 C 52 115 22 88 23 58 C 23 41 27 30 34 22 Z" fill="rgb(255 253 246 / 0.86)" stroke="rgb(31 79 143 / 0.18)" strokeWidth="1" />
        {nodes.map((node) => (
          <g key={node.code} transform={`translate(${node.x}, ${node.y})`}>
            {node.tone === "hq" && <circle r="23" fill="#d7282f" opacity="0.11" />}
            <circle r={node.tone === "hq" ? 4.8 : 3.5} fill={color[node.tone]} stroke="#fff" strokeWidth="1.2" />
            <text x={node.x > 145 ? -8 : 8} y={node.y > 100 ? 4 : -6} textAnchor={node.x > 145 ? "end" : "start"} fill="#111827" fontFamily="JetBrains Mono, monospace" fontSize="8" fontWeight="800">
              {node.code}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function HighwayTelemetry() {
  const totalVehicles = RODOVIAS.reduce((s, r) => s + r.veiculos, 0);
  const avgCapacity = Math.round((RODOVIAS.reduce((s, r) => s + r.capacity, 0) / RODOVIAS.length) * 100);
  const totalAlerts = RODOVIAS.reduce((s, r) => s + r.alerts, 0);

  return (
    <div className="border-t border-hairline bg-white/94 xl:border-l xl:border-t-0">
      <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
        <p className="eyebrow">Telemetria · BRs principais</p>
        <p className="font-mono text-[10px] tabular-nums text-zinc-500">
          {totalVehicles} veículos · {RODOVIAS.length} vias
        </p>
      </div>

      <div className="border-b border-hairline bg-zinc-950 px-4 py-3 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-400">
              Fluxo troncal
            </p>
            <p className="mt-1 font-display text-[24px] font-semibold leading-none">
              {totalVehicles}
              <span className="ml-2 font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-zinc-400">
                ativos
              </span>
            </p>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-[6px] border border-white/10 bg-white/8 text-white">
            <Truck size={17} strokeWidth={1.8} />
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-3">
          <TelemetryStat icon={Gauge} label="Uso" value={`${avgCapacity}%`} />
          <TelemetryStat icon={RouteIcon} label="Rotas" value={ROUTES.length} />
          <TelemetryStat icon={Activity} label="Alertas" value={totalAlerts} tone="alarm" />
        </div>
      </div>

      <div className="space-y-3.5 px-4 py-3">
        {RODOVIAS.map((r) => <HighwayRow key={r.code} r={r} />)}
      </div>

      <div className="mx-4 mb-4 mt-2 overflow-hidden rounded-[7px] border border-zinc-200 bg-zinc-50/70 shadow-[0_1px_0_0_rgb(10_10_10_/_0.03)]">
        <div className="flex items-center justify-between border-b border-hairline px-3 py-1.5">
          <p className="eyebrow">CTe Scanner</p>
          <span className="flex items-center gap-1.5 font-mono text-[10px] tabular-nums text-zinc-600">
            <span className="live-dot" />
            <span>12.847 / dia</span>
          </span>
        </div>
        <CteScanner />
      </div>
    </div>
  );
}

function TelemetryStat({ icon: Icon, label, value, tone = "default" }) {
  return (
    <div className="px-2 first:pl-0 last:pr-0">
      <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-zinc-500">
        <Icon size={11} strokeWidth={1.8} />
        {label}
      </span>
      <span className={cn("mt-1 block font-mono text-[13px] font-bold tabular-nums", tone === "alarm" ? "text-[color:var(--color-hazard-soft)]" : "text-white")}>
        {value}
      </span>
    </div>
  );
}

function HighwayRow({ r }) {
  const seed = r.code.charCodeAt(3) + r.code.charCodeAt(5);
  const trucks = Array.from({ length: Math.min(r.veiculos, 28) }, (_, i) => ({
    t: ((seed * (i + 7)) % 97) / 97,
    alert: i < r.alerts,
  }));
  const capPercent = Math.round(r.capacity * 100);
  const capColor = capPercent > 75 ? "#d7282f" : capPercent > 60 ? "#ea7c2c" : "#16a34a";
  return (
    <div>
      <div className="flex items-baseline justify-between text-[11px]">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[11px] font-semibold tracking-[0.04em] text-zinc-950">{r.code}</span>
          <span className="text-[10px] text-zinc-500">{r.label}</span>
        </div>
        <div className="flex items-center gap-2 font-mono tabular-nums">
          {r.alerts > 0 && (
            <span className="rounded-[3px] bg-[color:var(--color-crit)]/[0.10] px-1 text-[9px] font-bold uppercase tracking-wider text-[color:var(--color-crit)]">
              {r.alerts} alerta{r.alerts > 1 ? "s" : ""}
            </span>
          )}
          <span className="rounded-[3px] px-1 text-[10px]" style={{ background: `${capColor}1A`, color: capColor }}>
            {capPercent}%
          </span>
          <span className="text-zinc-700">{r.veiculos}</span>
        </div>
      </div>
      <div className="relative mt-1.5 h-5">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-zinc-200" />
        <div className="absolute top-1/2 h-[2px] -translate-y-1/2" style={{ width: `${capPercent}%`, background: capColor, boxShadow: `0 0 6px ${capColor}80` }} />
        {trucks.map((t, i) => (
          <span key={i} className={cn("absolute top-1/2 h-2 w-[3px] -translate-y-1/2", t.alert ? "bg-[color:var(--color-crit)]" : "bg-zinc-900")} style={{ left: `${t.t * 100}%` }} />
        ))}
      </div>
    </div>
  );
}

function CteScanner() {
  const bars = Array.from({ length: 64 }, (_, i) => ({ h: 14 + ((i * 73) % 5), w: ((i * 31) % 4) + 1 }));
  return (
    <div className="relative h-12 overflow-hidden bg-white px-3 py-2 font-mono text-[10px] leading-tight text-zinc-500">
      <div className="flex items-center justify-between">
        <span className="tabular-nums text-zinc-700">35·24·06·12345678</span>
        <span className="rounded-[3px] border border-zinc-200 px-1 text-[9px] font-semibold uppercase tracking-wider">LDB→PR</span>
      </div>
      <div className="mt-1 flex gap-[1.5px]">
        {bars.map((b, i) => <span key={i} className="bg-zinc-900" style={{ width: b.w, height: b.h }} />)}
      </div>
      <span aria-hidden className="pointer-events-none absolute inset-x-0 h-[1.5px] bg-[color:var(--color-hazard)]" style={{ top: 0, animation: "sweep 2.4s ease-in-out infinite", boxShadow: "0 0 10px 2px rgba(215,40,47,0.65), 0 0 20px 4px rgba(215,40,47,0.30)" }} />
    </div>
  );
}
