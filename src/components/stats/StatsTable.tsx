import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface Column<T> {
  key: string;
  label: string;
  render?: (row: T, index?: number) => React.ReactNode;
  align?: "left" | "center" | "right";
  highlight?: boolean;
}

interface StatsTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

function StatsTable<T extends Record<string, any>>({ data, columns, className }: StatsTableProps<T>) {
  return (
    <div className={cn("rounded-lg border border-border overflow-hidden bg-card", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/60 hover:bg-secondary/60 border-border">
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={cn(
                  "text-[10px] font-mono uppercase tracking-wider text-muted-foreground h-8 px-2 first:pl-3",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center"
                )}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <TableRow
              key={i}
              className={cn(
                "border-border/40 hover:bg-secondary/20 transition-colors cursor-pointer",
                i % 2 === 0 ? "bg-card" : "bg-card/80"
              )}
            >
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  className={cn(
                    "text-[12px] font-mono px-2 py-1.5 first:pl-3",
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center",
                    col.highlight && "text-foreground font-semibold"
                  )}
                >
                  {col.render ? col.render(row, i) : row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default StatsTable;
