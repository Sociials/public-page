/**
 * Bump patch version in package.json, commit, and tag v{version}.
 * Used by the pre-push git hook (or run manually: npm run release).
 *
 * Set SKIP_RELEASE=1 to skip (e.g. docs-only push).
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkgPath = path.join(pkgRoot, "package.json");

const run = (cmd) => execSync(cmd, { cwd: pkgRoot, stdio: "inherit" });

const bumpPatch = (version) => {
  const parts = version.split(".").map((n) => Number.parseInt(n, 10));
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    throw new Error(`Invalid semver: ${version}`);
  }
  parts[2] += 1;
  return parts.join(".");
};

if (process.env.SKIP_RELEASE === "1") {
  console.log("[public-page] SKIP_RELEASE=1 — release bump skipped");
  process.exit(0);
}

const dirty = execSync("git status --porcelain", { cwd: pkgRoot, encoding: "utf8" }).trim();
if (dirty) {
  console.error("[public-page] Working tree not clean — commit or stash before release bump.");
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const nextVersion = bumpPatch(pkg.version);
pkg.version = nextVersion;
fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

run("git add package.json");
run(`git commit -m "chore(release): v${nextVersion}"`);
run(`git tag v${nextVersion}`);

console.log(`[public-page] Released v${nextVersion} — use github:Sociials/public-page#v${nextVersion} in client/frontend`);
