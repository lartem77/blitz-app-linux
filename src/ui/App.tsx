import { blitzTools } from "../mcp/tools";
import { platformSummary } from "../services/platform";

const workflows = [
  {
    title: "Release readiness",
    status: "Foundation",
    detail: "Track metadata, builds, screenshots, IAP state, and review blockers before submission."
  },
  {
    title: "App Store Connect",
    status: "Planned",
    detail: "Linux-compatible API client layer will replace the macOS ASC auth bridge."
  },
  {
    title: "Screenshots",
    status: "Planned",
    detail: "Upload and assign prepared assets. Local iOS Simulator capture remains macOS-only."
  },
  {
    title: "MCP automation",
    status: "Scaffolded",
    detail: "Tool registry and stdio server are in place for agent-driven workflows."
  }
];

export function App() {
  const platform = platformSummary();

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="mark">B</div>
          <div>
            <h1>Blitz</h1>
            <p>Linux port</p>
          </div>
        </div>
        <nav>
          <a className="active" href="#dashboard">Dashboard</a>
          <a href="#workflows">Workflows</a>
          <a href="#mcp">MCP Tools</a>
          <a href="#migration">Migration</a>
        </nav>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">App Store Connect automation</p>
            <h2>Linux-first Blitz foundation</h2>
          </div>
          <div className={platform.isLinux ? "badge ok" : "badge warn"}>
            {platform.label}
          </div>
        </header>

        <section id="dashboard" className="summary-grid">
          {workflows.map((workflow) => (
            <article className="panel" key={workflow.title}>
              <div className="panel-header">
                <h3>{workflow.title}</h3>
                <span>{workflow.status}</span>
              </div>
              <p>{workflow.detail}</p>
            </article>
          ))}
        </section>

        <section id="mcp" className="wide-panel">
          <div className="section-heading">
            <h3>MCP Tool Surface</h3>
            <p>{blitzTools.length} tools defined for the initial Linux automation contract.</p>
          </div>
          <div className="tool-list">
            {blitzTools.map((tool) => (
              <div className="tool-row" key={tool.name}>
                <code>{tool.name}</code>
                <span>{tool.description}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="migration" className="wide-panel">
          <div className="section-heading">
            <h3>Porting Boundary</h3>
            <p>
              The macOS app depends on SwiftUI, AppKit, ScreenCaptureKit, Metal, AVFoundation, and
              Apple simulator tooling. This Linux repo starts from a Linux-compatible shell and
              keeps Apple-only features behind service contracts.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
