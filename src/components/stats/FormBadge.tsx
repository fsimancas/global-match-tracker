import { cn } from "@/lib/utils";

const FormBadge = ({ form }: { form: string }) => (
  <div className="flex gap-0.5">
    {form.split("").map((r, i) => (
      <span
        key={i}
        className={cn(
          "w-5 h-5 rounded-sm flex items-center justify-center text-[10px] font-mono font-bold",
          r === "W" && "bg-success/20 text-success",
          r === "D" && "bg-warning/20 text-warning",
          r === "L" && "bg-destructive/20 text-destructive"
        )}
      >
        {r}
      </span>
    ))}
  </div>
);

export default FormBadge;
