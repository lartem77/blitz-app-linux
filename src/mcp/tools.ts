export interface BlitzTool {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, unknown>;
    required?: string[];
  };
}

export const blitzTools: BlitzTool[] = [
  {
    name: "release_readiness_check",
    description: "Summarize missing metadata, screenshots, IAP links, and review blockers.",
    inputSchema: {
      type: "object",
      properties: {
        appId: { type: "string", description: "App Store Connect app identifier." }
      },
      required: ["appId"]
    }
  },
  {
    name: "screenshots_plan_upload",
    description: "Plan screenshot upload slots for iPhone, iPad, and Mac display types.",
    inputSchema: {
      type: "object",
      properties: {
        locale: { type: "string", default: "en-US" },
        directory: { type: "string", description: "Local screenshot directory." }
      },
      required: ["directory"]
    }
  },
  {
    name: "iap_attach_to_version",
    description: "Attach ready in-app purchases or subscriptions to a version before review.",
    inputSchema: {
      type: "object",
      properties: {
        appId: { type: "string" },
        version: { type: "string" },
        productIds: { type: "array", items: { type: "string" } }
      },
      required: ["appId", "version", "productIds"]
    }
  },
  {
    name: "testflight_builds_list",
    description: "List candidate TestFlight builds for a release.",
    inputSchema: {
      type: "object",
      properties: {
        appId: { type: "string" }
      },
      required: ["appId"]
    }
  },
  {
    name: "review_submit_dry_run",
    description: "Validate whether a release appears ready for App Store review submission.",
    inputSchema: {
      type: "object",
      properties: {
        appId: { type: "string" },
        version: { type: "string" }
      },
      required: ["appId", "version"]
    }
  }
];
