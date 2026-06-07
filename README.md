# Blitz for Linux

Linux-only desktop port foundation for Blitz, based on the macOS Blitz product direction.

Blitz helps AI agents drive App Store Connect workflows: release preparation, screenshots, in-app purchases, TestFlight metadata, and review submission. The original macOS app is a SwiftUI application with deep Apple platform integrations. This repository starts a Linux-native implementation using Electron, React, and TypeScript.

## Status

This is an initial Linux port foundation, not a full feature parity release.

Implemented:

- Linux-only Electron desktop shell
- React workflow dashboard for App Store Connect tasks
- Local preload API for platform/version checks
- MCP stdio server scaffold with Blitz tool definitions
- Migration notes for the macOS-only subsystems

Not implemented yet:

- App Store Connect authentication bridge
- Screenshot upload execution
- TestFlight/build management execution
- iOS Simulator control, because Apple's simulator is macOS-only
- Production signing/installer configuration

## Requirements

- Ubuntu 22.04+, Debian 12+, Fedora 39+, or another modern Linux desktop
- Node.js 20+
- npm 10+

## Development

```bash
npm install
npm run dev
```

## Build Linux App

```bash
npm run build
npm run dist:linux
```

Artifacts are written to `dist/`.

## MCP Server

The MCP server scaffold can be started with:

```bash
npm run mcp
```

It currently exposes tool metadata and placeholder execution results so the Linux app and agent integration can be developed without macOS-only dependencies.

## Porting Approach

The macOS repository is Swift Package Manager based and links to macOS frameworks such as AppKit, ScreenCaptureKit, Metal, MetalKit, CoreMedia, AVFoundation, and WebKit. Those cannot be compiled on Linux.

This Linux port uses a platform-neutral TypeScript core and Linux-compatible desktop shell. Apple-only operations should move behind service interfaces so Linux can support remote/cloud-backed App Store Connect automation while macOS keeps direct local integrations where appropriate.

See [docs/MIGRATION.md](docs/MIGRATION.md) for the subsystem mapping.
