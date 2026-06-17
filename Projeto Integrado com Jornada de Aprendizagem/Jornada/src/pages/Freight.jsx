import { Calculator, Download, FileText, MapPinned, Route, TrendingDown } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import FreightCalculatorForm from "../components/freight/FreightCalculatorForm.jsx";
import CarrierComparison from "../components/freight/CarrierComparison.jsx";
import PageActionBar from "../components/ui/PageActionBar.jsx";
import MetricTile from "../components/ui/MetricTile.jsx";

export default function Freight() {
  return (
    <div className="app-page app-page--freight space-y-4">
      <section className="surface hero-panel relative overflow-hidden">
        <span aria-hidden className="aurora-gradient absolute inset-y-0 left-0 w-1.5" />
        <div className="grid gap-4 px-6 py-5 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-hazard)]">
              <MapPinned size={11} strokeWidth={2.25} />
              Função principal
            </p>
            <h1 className="mt-2 max-w-2xl font-display text-[30px] font-semibold leading-tight text-zinc-950">
              Calcular distância e frete sem fazer conta <span className="aurora-text">manual.</span>
            </h1>
            <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-zinc-600">
              O funcionário importa o PDF, confere cliente/origem/destino e o sistema calcula a distância da rota para estimar o frete.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
            <HeroStat label="Origem padrão" value="Londrina/PR" />
            <HeroStat label="Distância exemplo" value="389 km" />
            <HeroStat label="Frete estimado" value="R$ 142" />
          </div>
        </div>
      </section>

      <PageActionBar
        eyebrow="cálculo automático"
        title="Distância e frete"
        meta="Dados podem vir do PDF ou ser ajustados manualmente para conferência"
        icon={Calculator}
        actions={
          <Button variant="secondary" icon={Download} size="md">
            Exportar cálculo
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <MetricTile label="Cálculos hoje" value="42" icon={Calculator} tone="brand" meta="rotas" spark={[9, 16, 24, 33, 42]} />
        <MetricTile label="PDFs usados" value="31" icon={FileText} tone="hazard" meta="entrada" spark={[8, 13, 19, 24, 31]} />
        <MetricTile label="Tempo economizado" value="78" suffix="%" icon={TrendingDown} tone="good" meta="sem planilha" spark={[30, 42, 58, 66, 78]} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <FreightCalculatorForm />
        </div>
        <div className="space-y-4 lg:col-span-7">
          <CarrierComparison />
          <DistanceExplanation />
        </div>
      </div>
    </div>
  );
}

function HeroStat({ label, value }) {
  return (
    <div className="rounded-[4px] border border-zinc-200 bg-zinc-50 px-3 py-2">
      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500">{label}</p>
      <p className="mt-1 font-display text-[17px] font-semibold text-zinc-950">{value}</p>
    </div>
  );
}

function DistanceExplanation() {
  return (
    <section className="panel-enter surface">
      <header className="flex items-center gap-3 border-b border-hairline px-5 py-3">
        <span className="head-rule w-8" />
        <div>
          <h3 className="font-display text-[14px] font-semibold text-zinc-950">
            Como o cálculo fica simples
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
            PDF → rota → distância → frete
          </p>
        </div>
      </header>
      <div className="grid gap-px bg-zinc-200 sm:grid-cols-4">
        <Step icon={FileText} label="PDF" text="Documento enviado pelo funcionário." />
        <Step icon={MapPinned} label="Rota" text="Origem e destino são lidos." />
        <Step icon={Route} label="Distância" text="Quilometragem calculada." />
        <Step icon={Calculator} label="Frete" text="Valor estimado automaticamente." />
      </div>
    </section>
  );
}

function Step({ icon: Icon, label, text }) {
  return (
    <div className="bg-white px-4 py-3">
      <Icon size={15} strokeWidth={1.9} className="text-[color:var(--color-brand)]" />
      <p className="mt-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-zinc-500">{label}</p>
      <p className="mt-1 text-xs leading-relaxed text-zinc-600">{text}</p>
    </div>
  );
}
