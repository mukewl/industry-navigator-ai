import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "src/components/brief/SustainabilityBrief.tsx");
const out = path.join(root, "src/data/briefData.ts");

const t = fs.readFileSync(src, "utf8");
const lines = t.split(/\r?\n/);
const header = `import {
  Truck,
  Zap,
  Globe,
  Thermometer,
  Recycle,
  Store,
  Laptop,
  Building2,
  Users,
  Leaf,
} from "lucide-react";

`;

const body = lines.slice(36, 450).join("\n").replace("const briefData", "export const briefData");
fs.writeFileSync(out, header + body, "utf8");
console.log("Wrote", out);
