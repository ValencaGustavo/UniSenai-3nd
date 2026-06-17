import { useMemo, useState } from "react";
import OrdersToolbar from "../components/orders/OrdersToolbar.jsx";
import OrdersTable from "../components/orders/OrdersTable.jsx";
import OrderDetailsDrawer from "../components/orders/OrderDetailsDrawer.jsx";
import DemandPanel from "../components/orders/DemandPanel.jsx";
import { orders } from "../data/mockData.js";
import PageActionBar from "../components/ui/PageActionBar.jsx";
import MetricTile from "../components/ui/MetricTile.jsx";
import { AlertTriangle, ClipboardList, PackageCheck, Truck } from "lucide-react";
import { useNewOrder } from "../components/orders/NewOrderContext.jsx";

const PAGE_SIZE = 6;

export default function Orders() {
  const { createdOrders, addOrdersToDemand } = useNewOrder();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [carrier, setCarrier] = useState("all");
  const [period, setPeriod] = useState("30");
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [drawerOrder, setDrawerOrder] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...createdOrders, ...orders].filter((o) => {
      if (status !== "all" && o.status !== status) return false;
      if (carrier !== "all" && o.transportadora !== carrier) return false;
      if (!q) return true;
      return (
        o.id.toLowerCase().includes(q) ||
        o.cliente.toLowerCase().includes(q) ||
        o.cnpj.includes(q) ||
        o.nfe.toLowerCase().includes(q)
      );
    });
  }, [createdOrders, query, status, carrier]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const selectedOrders = useMemo(
    () => filtered.filter((order) => selected.has(order.id)),
    [filtered, selected]
  );

  const toggleRow = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleAll = () => {
    const allCurrentSelected = paginated.every((r) => selected.has(r.id));
    setSelected((prev) => {
      const next = new Set(prev);
      paginated.forEach((r) =>
        allCurrentSelected ? next.delete(r.id) : next.add(r.id)
      );
      return next;
    });
  };

  const summary = useMemo(() => {
    const total = filtered.length;
    const valorTotal = filtered.reduce((sum, o) => sum + o.valor, 0);
    const transito = filtered.filter((o) => o.status === "Em trânsito").length;
    const ocorrencias = filtered.filter((o) => o.status === "Com ocorrência").length;
    return { total, valorTotal, transito, ocorrencias };
  }, [filtered]);

  const handleAddSelectedToDemand = () => {
    addOrdersToDemand(selectedOrders);
    setSelected(new Set());
  };

  return (
    <div className="app-page app-page--orders space-y-4">
      
      <PageHeader summary={summary} />

      <OrdersToolbar
        query={query}
        onQuery={(v) => {
          setQuery(v);
          setPage(1);
        }}
        status={status}
        onStatus={(v) => {
          setStatus(v);
          setPage(1);
        }}
        carrier={carrier}
        onCarrier={(v) => {
          setCarrier(v);
          setPage(1);
        }}
        period={period}
        onPeriod={setPeriod}
        selectedCount={selected.size}
        onClearSelection={() => setSelected(new Set())}
        onAddSelectedToDemand={handleAddSelectedToDemand}
        total={filtered.length}
      />

      <DemandPanel />

      <OrdersTable
        rows={paginated}
        selected={selected}
        onToggleRow={toggleRow}
        onToggleAll={toggleAll}
        onRowClick={(o) => setDrawerOrder(o)}
        page={page}
        pageSize={PAGE_SIZE}
        totalRows={filtered.length}
        onPageChange={setPage}
      />

      <OrderDetailsDrawer
        order={drawerOrder}
        onClose={() => setDrawerOrder(null)}
      />
    </div>
  );
}

function PageHeader({ summary }) {
  return (
    <>
      <PageActionBar
        eyebrow="controle de pedidos"
        title="Esteira operacional"
        meta={`Visão consolidada · ${summary.total} pedidos no período · origem central Londrina/PR`}
        icon={ClipboardList}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MetricTile label="Pedidos filtrados" value={summary.total} icon={PackageCheck} tone="brand" meta="período" spark={[4, 5, 6, 7, summary.total]} />
        <MetricTile label="Em trânsito" value={summary.transito} icon={Truck} tone="good" meta="live" spark={[1, 1, 2, 2, summary.transito]} />
        <MetricTile label="Ocorrências" value={summary.ocorrencias} icon={AlertTriangle} tone="hazard" meta="atenção" spark={[0, 1, 1, 2, summary.ocorrencias]} />
      </div>
    </>
  );
}
