"use client";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { ToolUIPart } from "ai";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  CircleIcon,
  ClockIcon,
  SearchIcon,
  XCircleIcon,
} from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { isValidElement } from "react";
import { CodeBlock } from "./code-block";

export type ToolProps = ComponentProps<typeof Collapsible>;

export const Tool = ({ className, ...props }: ToolProps) => (
  <Collapsible
    className={cn(
      "not-prose mb-2 w-full rounded-lg border border-border/50 bg-muted/30 transition-colors hover:border-border",
      className
    )}
    {...props}
  />
);

export type ToolHeaderProps = {
  title?: string;
  type: ToolUIPart["type"];
  state: ToolUIPart["state"];
  className?: string;
};

// Spanish labels for tool states
const getStatusBadge = (status: ToolUIPart["state"]) => {
  const labels: Record<ToolUIPart["state"], string> = {
    "input-streaming": "Preparando",
    "input-available": "Ejecutando",
    "approval-requested": "Esperando",
    "approval-responded": "Respondido",
    "output-available": "Listo",
    "output-error": "Error",
    "output-denied": "Denegado",
  };

  const variants: Record<ToolUIPart["state"], { icon: ReactNode; className: string }> = {
    "input-streaming": {
      icon: <CircleIcon className="size-3 animate-pulse" />,
      className: "bg-muted text-muted-foreground",
    },
    "input-available": {
      icon: <ClockIcon className="size-3 animate-spin" />,
      className: "bg-primary/20 text-primary-foreground dark:text-primary",
    },
    "approval-requested": {
      icon: <ClockIcon className="size-3" />,
      className: "bg-amber-500/20 text-amber-700 dark:text-amber-400",
    },
    "approval-responded": {
      icon: <CheckCircleIcon className="size-3" />,
      className: "bg-blue-500/20 text-blue-700 dark:text-blue-400",
    },
    "output-available": {
      icon: <CheckCircleIcon className="size-3" />,
      className: "bg-primary/20 text-primary-foreground dark:text-primary",
    },
    "output-error": {
      icon: <XCircleIcon className="size-3" />,
      className: "bg-destructive/20 text-destructive",
    },
    "output-denied": {
      icon: <XCircleIcon className="size-3" />,
      className: "bg-orange-500/20 text-orange-700 dark:text-orange-400",
    },
  };

  const variant = variants[status];

  return (
    <Badge
      className={cn(
        "gap-1 rounded-full px-2 py-0.5 text-xs font-medium border-0",
        variant.className
      )}
      variant="secondary"
    >
      {variant.icon}
      {labels[status]}
    </Badge>
  );
};

export const ToolHeader = ({
  className,
  title,
  type,
  state,
  ...props
}: ToolHeaderProps) => (
  <CollapsibleTrigger
    className={cn(
      "group flex w-full items-center justify-between gap-3 p-3 text-left transition-colors hover:bg-muted/50 rounded-lg min-h-[44px]",
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-2 min-w-0">
      <div className="shrink-0 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
        <SearchIcon className="size-3.5 text-primary" />
      </div>
      <span className="font-medium text-sm truncate">
        {title ?? type.split("-").slice(1).join("-")}
      </span>
      {getStatusBadge(state)}
    </div>
    <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
  </CollapsibleTrigger>
);

export type ToolContentProps = ComponentProps<typeof CollapsibleContent>;

export const ToolContent = ({ className, ...props }: ToolContentProps) => (
  <CollapsibleContent
    className={cn(
      "overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  />
);

export type ToolInputProps = ComponentProps<"div"> & {
  input: ToolUIPart["input"];
};

export const ToolInput = ({ className, input, ...props }: ToolInputProps) => (
  <div className={cn("space-y-2 overflow-hidden px-4 pb-2", className)} {...props}>
    <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
      Parametros
    </h4>
    <div className="rounded-md bg-muted/50 overflow-hidden">
      <CodeBlock code={JSON.stringify(input, null, 2)} language="json" />
    </div>
  </div>
);

export type ToolOutputProps = ComponentProps<"div"> & {
  output: ToolUIPart["output"];
  errorText: ToolUIPart["errorText"];
};

export const ToolOutput = ({
  className,
  output,
  errorText,
  ...props
}: ToolOutputProps) => {
  if (!(output || errorText)) {
    return null;
  }

  let Output = <div>{output as ReactNode}</div>;

  if (typeof output === "object" && !isValidElement(output)) {
    Output = (
      <CodeBlock code={JSON.stringify(output, null, 2)} language="json" />
    );
  } else if (typeof output === "string") {
    Output = <CodeBlock code={output} language="json" />;
  }

  return (
    <div className={cn("space-y-2 px-4 pb-4", className)} {...props}>
      <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        {errorText ? "Error" : "Resultado"}
      </h4>
      <div
        className={cn(
          "overflow-x-auto rounded-md text-xs [&_table]:w-full",
          errorText
            ? "bg-destructive/10 text-destructive p-3"
            : "bg-muted/50"
        )}
      >
        {errorText && <div className="font-medium">{errorText}</div>}
        {!errorText && Output}
      </div>
    </div>
  );
};
