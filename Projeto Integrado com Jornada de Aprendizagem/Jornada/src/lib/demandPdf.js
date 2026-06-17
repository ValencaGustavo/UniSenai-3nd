import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { formatBRL, formatNumber } from "./utils.js";

const BRAND = {
  navy: [13, 30, 53],
  blue: [31, 79, 143],
  red: [225, 37, 46],
  muted: [105, 113, 128],
  line: [222, 226, 232],
};

function formatDateTime(value) {
  if (!value) return "Demanda ativa";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function money(value) {
  return formatBRL(Number(value) || 0);
}

function safe(value, fallback = "-") {
  return value || fallback;
}

function demandTotals(orders) {
  return orders.reduce(
    (total, order) => ({
      value: total.value + (Number(order.valor) || 0),
      weight: total.weight + (Number(order.peso) || 0),
      volumes: total.volumes + (Number(order.volumes) || 0),
    }),
    { value: 0, weight: 0, volumes: 0 }
  );
}

function fileNameFromDemand(id) {
  return `romaneio-demanda-${id}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
}

function addPageFooter(doc) {
  const pageCount = doc.internal.getNumberOfPages();

  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...BRAND.muted);
    doc.text(
      `FastAriam - Romaneio de Demanda - pagina ${page}/${pageCount}`,
      40,
      820
    );
  }
}

function ensureSpace(doc, y, needed = 120) {
  if (y + needed < 790) return y;
  doc.addPage();
  return 48;
}

export function exportDemandRomaneio(demand) {
  const orders = Array.isArray(demand?.orders) ? demand.orders : [];
  const totals = demandTotals(orders);
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 40;
  const demandId = demand?.id || "DEM-ATIVA";
  const closedAt = demand?.finalizedAt || demand?.createdAt;

  doc.setFillColor(...BRAND.navy);
  doc.rect(0, 0, 595, 92, "F");
  doc.setFillColor(...BRAND.red);
  doc.rect(margin, 82, 96, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("FastAriam", margin, 38);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(198, 209, 224);
  doc.text("Romaneio de Demanda - documento operacional", margin, 56);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text(demandId, 595 - margin, 38, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(198, 209, 224);
  doc.text(`Origem operacional: ${demand?.origin || "Londrina/PR"}`, 595 - margin, 56, {
    align: "right",
  });

  autoTable(doc, {
    startY: 112,
    theme: "plain",
    margin: { left: margin, right: margin },
    body: [
      ["Fechamento", formatDateTime(closedAt), "Pedidos", String(orders.length)],
      ["Valor total", money(totals.value), "Peso total", `${formatNumber(totals.weight)} kg`],
      ["Volumes", formatNumber(totals.volumes), "Tipo", "Romaneio operacional"],
    ],
    styles: {
      font: "helvetica",
      fontSize: 9,
      cellPadding: { top: 6, right: 8, bottom: 6, left: 8 },
      lineColor: BRAND.line,
      lineWidth: 0.5,
    },
    columnStyles: {
      0: { textColor: BRAND.muted, fontStyle: "bold" },
      2: { textColor: BRAND.muted, fontStyle: "bold" },
    },
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 18,
    head: [["Pedido", "Cliente", "Rota", "Status", "Valor"]],
    body: orders.map((order) => [
      safe(order.id),
      safe(order.cliente),
      `${safe(order.origem)} > ${safe(order.destino)}`,
      safe(order.status),
      money(order.valor),
    ]),
    margin: { left: margin, right: margin },
    styles: {
      font: "helvetica",
      fontSize: 8,
      cellPadding: 6,
      lineColor: BRAND.line,
      lineWidth: 0.5,
      overflow: "linebreak",
    },
    headStyles: {
      fillColor: BRAND.navy,
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      0: { cellWidth: 70, fontStyle: "bold" },
      1: { cellWidth: 130 },
      2: { cellWidth: 145 },
      3: { cellWidth: 100 },
      4: { cellWidth: 58, halign: "right" },
    },
  });

  let y = doc.lastAutoTable.finalY + 26;

  orders.forEach((order, index) => {
    y = ensureSpace(doc, y, 160);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...BRAND.navy);
    doc.text(`${index + 1}. ${safe(order.id)} - ${safe(order.cliente)}`, margin, y);

    doc.setDrawColor(...BRAND.red);
    doc.line(margin, y + 7, margin + 62, y + 7);

    autoTable(doc, {
      startY: y + 14,
      theme: "plain",
      margin: { left: margin, right: margin },
      body: [
        ["CNPJ", safe(order.cnpj), "NF-e", safe(order.nfe)],
        ["Pagamento", safe(order.pagamento), "Status", safe(order.status)],
        ["Peso", `${formatNumber(Number(order.peso) || 0)} kg`, "Volumes", formatNumber(Number(order.volumes) || 0)],
        ["Transportadora", safe(order.transportadora), "Previsao", safe(order.previsao)],
        ["Rota", `${safe(order.origem)} > ${safe(order.destino)}`, "Rodovia", safe(order.rodovia)],
        ["Contato", safe(order.contato), "Telefone", safe(order.telefone)],
        ["Operacao", safe(order.tipoOperacao), "Prioridade", safe(order.prioridade)],
        [
          "Cotacao",
          order.cotacaoSelecionada
            ? `${safe(order.cotacaoSelecionada.nome)} - ${money(order.cotacaoSelecionada.valor)}`
            : "-",
          "Prazo",
          order.cotacaoSelecionada
            ? `${safe(order.cotacaoSelecionada.prazoDias)} dia(s)`
            : "-",
        ],
        ["Obs.", safe(order.observacoes).slice(0, 90), "Cliente", safe(order.tipoCliente)],
      ],
      styles: {
        font: "helvetica",
        fontSize: 8,
        cellPadding: { top: 4, right: 6, bottom: 4, left: 6 },
        lineColor: BRAND.line,
        lineWidth: 0.5,
      },
      columnStyles: {
        0: { textColor: BRAND.muted, fontStyle: "bold", cellWidth: 72 },
        1: { cellWidth: 170 },
        2: { textColor: BRAND.muted, fontStyle: "bold", cellWidth: 74 },
      },
    });

    y = doc.lastAutoTable.finalY + 8;

    const items = Array.isArray(order.itens) ? order.itens : [];
    if (items.length) {
      autoTable(doc, {
        startY: y,
        head: [["SKU", "Item", "Qtd.", "Peso", "Valor"]],
        body: items.map((item) => [
          safe(item.sku),
          safe(item.descricao),
          formatNumber(Number(item.qtd) || 0),
          item.pesoTotal
            ? `${formatNumber(Number(item.pesoTotal) || 0)} kg`
            : "-",
          item.valorTotal ? money(item.valorTotal) : "-",
        ]),
        margin: { left: margin, right: margin },
        styles: {
          font: "helvetica",
          fontSize: 8,
          cellPadding: 5,
          lineColor: BRAND.line,
          lineWidth: 0.5,
        },
        headStyles: {
          fillColor: BRAND.blue,
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        columnStyles: {
          0: { cellWidth: 82, fontStyle: "bold" },
          2: { cellWidth: 45, halign: "right" },
          3: { cellWidth: 58, halign: "right" },
          4: { cellWidth: 62, halign: "right" },
        },
      });

      y = doc.lastAutoTable.finalY + 18;
    } else {
      y += 18;
    }
  });

  addPageFooter(doc);
  doc.save(`${fileNameFromDemand(demandId)}.pdf`);
}
