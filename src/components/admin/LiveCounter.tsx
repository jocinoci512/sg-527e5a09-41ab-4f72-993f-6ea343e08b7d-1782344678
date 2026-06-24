import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveCounterProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  pulse?: boolean;
}

export function LiveCounter({ title, value, icon: Icon, trend, pulse = false }: LiveCounterProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn("h-4 w-4 text-muted-foreground", pulse && "animate-pulse text-primary")} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={cn(
            "text-xs",
            trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          )}>
            {trend.value} from last week
          </p>
        )}
      </CardContent>
    </Card>
  );
}