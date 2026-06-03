import type { ReactNode } from "react";

type TwoPanelShellProps = {
  left: ReactNode;
  right: ReactNode;
  expanded?: boolean;
};

export function TwoPanelShell({ left, right, expanded = false }: TwoPanelShellProps) {
  return (
    <main className="viewport">
      <div className="terminal-shell" data-expanded={expanded}>
        <div className="left-panel">{left}</div>
        <div className="divider" aria-hidden="true" />
        <div className="right-panel">{right}</div>
      </div>
    </main>
  );
}
