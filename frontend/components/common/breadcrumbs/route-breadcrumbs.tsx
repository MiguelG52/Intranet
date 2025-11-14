"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  baseLabel?: string;
  baseHref?: string;
  /**
   * Si se establece, y la ruta comienza con este prefijo (sin slash inicial),
   * se omitirá ese primer segmento de los breadcrumbs. Ej: "admin".
   */
  omitFirstSegmentIf?: string;
  /** Mapa para traducir segmentos a etiquetas legibles */
  labelMap?: Record<string, string>;
};

const DEFAULT_LABELS: Record<string, string> = {
  home: "Inicio",
  profile: "Perfil",
  settings: "Configuración",
  beneficios: "Beneficios",
  directorio: "Directorio",
  "tiempo-libre": "Tiempo Libre",
  cursos: "Cursos",
  encuestas: "Encuestas",
  documentos: "Documentos",
  dashboard: "Dashboard",
  users: "Usuarios",
  admin: "Admin",
};

function toTitleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function RouteBreadcrumbs({
  baseLabel,
  baseHref = "/",
  omitFirstSegmentIf,
  labelMap = {},
}: Props) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const items = [...segments];
  if (omitFirstSegmentIf && items[0] === omitFirstSegmentIf) {
    items.shift();
  }

  const mapLabel = (segment: string) =>
    labelMap[segment] || DEFAULT_LABELS[segment] || toTitleCase(segment);

  let hrefAccumulator = baseHref.replace(/\/$/, "");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {baseLabel && (
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href={baseHref}>{baseLabel}</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {baseLabel && items.length > 0 && (
          <BreadcrumbSeparator className="hidden md:block text-primary" />
        )}

        {items.map((seg, idx) => {
          const currentHref = `${hrefAccumulator}/${seg}`;
          hrefAccumulator = currentHref;
          const isLast = idx === items.length - 1;
          const label = mapLabel(seg);
          return (
            <React.Fragment key={currentHref}>
              {!isLast ? (
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={currentHref}>{label}</BreadcrumbLink>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
              {!isLast && (
                <BreadcrumbSeparator className="hidden md:block text-primary" />
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default RouteBreadcrumbs;
