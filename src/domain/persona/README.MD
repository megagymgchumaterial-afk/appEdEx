import { DEFAULT_BRANDING } from "./defaults";
import { resolveBranding } from "./resolverBranding";
import type { AppBranding } from "./types";

/**
 * Hook base de branding.
 *
 * En esta primera etapa devuelve el branding resuelto a partir
 * de los defaults del sistema.
 *
 * Más adelante este hook puede:
 * - leer branding persistido del usuario/editor
 * - leer branding por contexto/tenant
 * - exponer acciones para actualizar branding
 */
export function useBranding(
  overrides?: Partial<AppBranding>
): AppBranding {
  return resolveBranding(overrides);
}

/**
 * Helper opcional para consumir directamente el branding default
 * sin pasar overrides.
 */
export function useDefaultBranding(): AppBranding {
  return DEFAULT_BRANDING;
}