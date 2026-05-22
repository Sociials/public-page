import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const hooksDir = path.join(pkgRoot, ".git", "hooks");
const hookPath = path.join(hooksDir, "pre-push");
const sourceHook = path.join(path.dirname(fileURLToPath(import.meta.url)), "pre-push");

if (!fs.existsSync(path.join(pkgRoot, ".git"))) {
  process.exit(0);
}

fs.mkdirSync(hooksDir, { recursive: true });
fs.copyFileSync(sourceHook, hookPath);
fs.chmodSync(hookPath, 0o755);
console.log("[public-page] Installed pre-push hook (auto patch bump + tag on push)");
