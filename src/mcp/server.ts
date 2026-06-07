import process from "node:process";
import { blitzTools } from "./tools";

type JsonRpcRequest = {
  id?: string | number;
  method?: string;
  params?: unknown;
};

function respond(id: JsonRpcRequest["id"], result: unknown): void {
  process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id, result })}\n`);
}

function respondError(id: JsonRpcRequest["id"], code: number, message: string): void {
  process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } })}\n`);
}

function handleRequest(request: JsonRpcRequest): void {
  switch (request.method) {
    case "initialize":
      respond(request.id, {
        protocolVersion: "2024-11-05",
        serverInfo: { name: "blitz-linux-mcp", version: "0.1.0" },
        capabilities: { tools: {} }
      });
      return;
    case "tools/list":
      respond(request.id, { tools: blitzTools });
      return;
    case "tools/call":
      respond(request.id, {
        content: [
          {
            type: "text",
            text: "Blitz Linux MCP scaffold received the tool call. Execution adapters are not wired yet."
          }
        ]
      });
      return;
    default:
      respondError(request.id, -32601, `Unsupported method: ${request.method ?? "unknown"}`);
  }
}

let buffer = "";

process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;

  for (;;) {
    const newlineIndex = buffer.indexOf("\n");
    if (newlineIndex === -1) {
      break;
    }

    const line = buffer.slice(0, newlineIndex).trim();
    buffer = buffer.slice(newlineIndex + 1);

    if (!line) {
      continue;
    }

    try {
      handleRequest(JSON.parse(line) as JsonRpcRequest);
    } catch (error) {
      respondError(undefined, -32700, error instanceof Error ? error.message : "Invalid JSON");
    }
  }
});
