import KanbanColumn from "./KanbanColumn.jsx";
import { kanbanColumns } from "../../data/mockData.js";

export default function KanbanBoard() {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-3 min-h-[560px]">
        {kanbanColumns.map((col) => (
          <KanbanColumn key={col.id} column={col} />
        ))}
      </div>
    </div>
  );
}
