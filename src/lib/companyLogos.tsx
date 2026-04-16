import { useState } from "react";
import { cn } from "@/lib/utils";

/** briefData key → Clearbit domain */
export const COMPANY_DOMAINS: Record<string, string> = {
  renault:           "renault.com",
  carrefour:         "carrefour.com",
  stellantis:        "stellantis.com",
  totalenergies:     "totalenergies.com",
  saintgobain:       "saint-gobain.com",
  schneiderelectric: "se.com",
  veolia:            "veolia.com",
  airfranceklm:      "airfranceklm.com",
  danone:            "danone.com",
  loreal:            "loreal.com",
};

/** Company display name → Clearbit domain (for places that only have the name string) */
export const COMPANY_NAME_TO_DOMAIN: Record<string, string> = {
  "Renault":            "renault.com",
  "Carrefour":          "carrefour.com",
  "Stellantis":         "stellantis.com",
  "TotalEnergies":      "totalenergies.com",
  "Saint-Gobain":       "saint-gobain.com",
  "Schneider Electric": "se.com",
  "Veolia":             "veolia.com",
  "Air France-KLM":     "airfranceklm.com",
  "Danone":             "danone.com",
  "L'Oréal":            "loreal.com",
};

export function clearbitLogoUrl(domain: string): string {
  return `https://logo.clearbit.com/${domain}`;
}

function companyInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

interface CompanyLogoProps {
  domain: string | undefined;
  name: string;
  /** Tailwind size + any extra classes, e.g. "h-5 w-5 shrink-0" */
  className?: string;
}

/**
 * Shows initials immediately, then fades the Clearbit logo on top once it loads.
 * If the logo fails or is unavailable, initials remain visible.
 */
export function CompanyLogo({ domain, name, className }: CompanyLogoProps) {
  const [logoVisible, setLogoVisible] = useState(false);
  const initials = companyInitials(name);

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-md bg-primary/10",
        className
      )}
      aria-label={name}
    >
      {/* Initials — always rendered, visible whenever logo isn't */}
      <span className="absolute inset-0 flex items-center justify-center text-[0.625rem] font-semibold text-primary">
        {initials}
      </span>

      {/* Logo — layered on top, fades in once loaded */}
      {domain && (
        <img
          src={clearbitLogoUrl(domain)}
          alt=""
          aria-hidden
          className={cn(
            "absolute inset-0 h-full w-full object-contain bg-white p-[2px] transition-opacity duration-300",
            logoVisible ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setLogoVisible(true)}
        />
      )}
    </div>
  );
}
