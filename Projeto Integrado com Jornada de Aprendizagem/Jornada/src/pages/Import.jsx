import { Download, FileText, MapPinned, ScanText, UsersRound } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import DropZone from "../components/import/DropZone.jsx";
import RecentUploads from "../components/import/RecentUploads.jsx";
import ValidationDetails from "../components/import/ValidationDetails.jsx";
import PageActionBar from "../components/ui/PageActionBar.jsx";
import MetricTile from "../components/ui/MetricTile.jsx";

export default function Import() {
  return (
    <div className="app-page app-page--import space-y-4">
      <PageActionBar
        eyebrow="entrada principal"
        title="Importar PDF e gerar cadastro"
        meta="O funcionário joga o PDF aqui · cliente e dados são extraídos automaticamente"
        icon={ScanText}
        actions={
          <Button variant="secondary" icon={Download} size="md">
            Exportar PDF
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MetricTile
          label="PDFs processados"
          value="31"
          icon={FileText}
          tone="hazard"
          meta="hoje"
          spark={[8, 13, 19, 24, 31]}
        />
        <MetricTile
          label="Clientes gerados"
          value="28"
          icon={UsersRound}
          tone="good"
          meta="auto"
          spark={[6, 11, 17, 23, 28]}
        />
        <MetricTile
          label="Rotas identificadas"
          value="42"
          icon={MapPinned}
          tone="brand"
          meta="distância"
          spark={[9, 16, 24, 33, 42]}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <DropZone />
        </div>
        <div className="lg:col-span-7">
          <RecentUploads />
        </div>
      </div>

      <ValidationDetails />
    </div>
  );
}
