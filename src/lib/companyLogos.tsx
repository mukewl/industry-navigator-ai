import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
  "Renault":           "renault.com",
  "Carrefour":         "carrefour.com",
  "Stellantis":        "stellantis.com",
  "TotalEnergies":     "totalenergies.com",
  "Saint-Gobain":      "saint-gobain.com",
  "Schneider Electric":"se.com",
  "Veolia":            "veolia.com",
  "Air France-KLM":    "airfranceklm.com",
  "Danone":            "danone.com",
  "L'Oréal":           "loreal.com",
};

export function clearbitLogoUrl(domain: string): string {
  return `https://logo.clearbit.com/${domain}`;
}

interface CompanyLogoProps {
  domain: string | undefined;
  name: string;
  /** Tailwind size classes, e.g. "h-5 w-5". Defaults to h-6 w-6. */
  className?: string;
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

export function CompanyLogo({ domain, name, className }: CompanyLogoProps) {
  return (
    <Avatar className={cn("rounded-md bg-white shadow-none", className)}>
      {domain && (
        <AvatarImage
          src={clearbitLogoUrl(domain)}
          alt={`${name} logo`}
          className="object-contain p-0.5"
        />
      )}
      <AvatarFallback className="rounded-md bg-primary/10 text-primary text-[0.625rem] font-semibold">
        {companyInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
