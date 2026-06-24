import type { AppBranding } from "./types.ts";
import { DEFAULT_BRANDING } from "./defaults.ts";

/**
 * DeepPartial simple para permitir overrides parciales del branding
 * sin obligar a declarar toda la estructura completa.
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/**
 * Merge profundo simple para branding.
 * No busca ser una utilidad genérica universal; está pensado
 * específicamente para combinar defaults + overrides del branding.
 */
function mergeDeep<T extends Record<string, unknown>>(
  base: T,
  override?: DeepPartial<T>
): T {
  if (!override) return base;

  const result: Record<string, unknown> = { ...base };

  for (const key of Object.keys(override) as Array<keyof T>) {
    const overrideValue = override[key];
    const baseValue = base[key];

    if (overrideValue === undefined) continue;

    const bothAreObjects =
      typeof baseValue === "object" &&
      baseValue !== null &&
      typeof overrideValue === "object" &&
      overrideValue !== null &&
      !Array.isArray(baseValue) &&
      !Array.isArray(overrideValue);

    if (bothAreObjects) {
      result[key as string] = mergeDeep(
        baseValue as Record<string, unknown>,
        overrideValue as Record<string, unknown>
      );
    } else {
      result[key as string] = overrideValue;
    }
  }

  return result as T;
}

/**
 * Devuelve el branding final combinando:
 * - branding por defecto del sistema
 * - branding parcial personalizado (si existe)
 */
export function resolveBranding(
  overrides?: DeepPartial<AppBranding>
): AppBranding {
  return mergeDeep(DEFAULT_BRANDING, overrides);
}