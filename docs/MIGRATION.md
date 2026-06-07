# Migration Notes

Source reviewed: `blitzdotdev/blitz-mac` at commit `f039dd6`.

## Why this is not a direct source copy

The macOS app is a Swift Package Manager project with a SwiftUI executable target. It declares macOS 14+ and links Apple frameworks that are not available on Linux:

- AppKit
- ScreenCaptureKit
- Metal
- MetalKit
- CoreMedia
- CoreMediaIO
- AVFoundation
- WebKit

It also controls the iOS Simulator through macOS developer tooling. That part has no local Linux equivalent.

## Linux Port Strategy

Use Linux-compatible TypeScript services behind explicit interfaces:

- UI shell: Electron + React
- Local automation: Node child processes and POSIX shell integration where needed
- App Store Connect: API-backed service, not macOS keychain/session bridge
- MCP: stdio server in TypeScript
- Simulator features: remote macOS runner or cloud build device integration

## Subsystem Mapping

| macOS subsystem | Linux direction |
| --- | --- |
| SwiftUI views | React views |
| AppKit windowing and menus | Electron BrowserWindow/menu |
| ScreenCaptureKit simulator stream | Remote capture service or prepared screenshot import |
| Metal renderer | Browser canvas/WebGL only where needed |
| macOS terminal host | POSIX shell and Linux terminal integration |
| ASC auth bridge | App Store Connect API key/session service |
| MCP Swift server | TypeScript stdio MCP server |
| `.app`/`.pkg` bundle scripts | `electron-builder` AppImage, deb, and tar.gz artifacts |

## First Implementation Milestones

1. Wire App Store Connect API key storage and validation.
2. Implement `release_readiness_check` against real ASC data.
3. Add screenshot directory scanning and dimension validation.
4. Implement screenshot upload with dry-run output.
5. Add TestFlight build listing.
6. Add review submission dry-run and guarded execution.
7. Add Linux signing and release workflow.

## Non-Goals

Local iOS Simulator boot, touch, and screen capture are not Linux-local goals. They require macOS. Linux should either import assets prepared elsewhere or talk to a remote macOS runner.
