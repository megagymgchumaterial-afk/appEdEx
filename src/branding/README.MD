# Branding

Esta carpeta concentra el branding visible y configurable de la aplicación.

La idea es que los textos, labels y nombres visibles relevantes no queden hardcodeados en cada pantalla, sino que se resuelvan desde una capa específica.

---

# Objetivo de esta carpeta
Separar el branding visible del dominio del producto.

Esto permite:
- cambiar naming visible sin tocar la lógica central
- personalizar la experiencia por usuario o por configuración
- evitar repetir textos duros por toda la UI
- no acoplar el dominio a términos de marca o rol

---

# Qué debería vivir acá
- tipos del branding configurable
- valores por defecto
- helpers para resolver branding
- hooks para consumir branding desde la UI
- textos visibles de secciones clave si se decide centralizarlos

---

# Qué no debería vivir acá
- lógica de rutina
- lógica de sesión
- progreso
- modelos del dominio
- acceso directo a localStorage del negocio

---

# Archivos previstos

## `types.ts`
Define la estructura del branding configurable.

## `defaults.ts`
Contiene los valores por defecto del branding.

## `resolverBranding.ts`
Funciones para obtener el branding final combinando defaults y overrides.

## `useBranding.ts`
Hook para consumir branding desde la UI.

## `index.ts`
Exports centralizados del módulo.

---

# Criterio de diseño
El branding debe resolver principalmente:
- nombres visibles del editor y executor
- nombres visibles de entidades si en el futuro se quisieran personalizar
- nombre del producto
- labels de navegación principales

No debería intentar modelar la lógica del producto.

---

# Estado inicial esperado
En la primera etapa del refactor, esta carpeta debe permitir:
1. definir un branding por defecto
2. exponer labels visibles básicos
3. evitar que las nuevas pantallas del editor sigan agregando strings hardcodeados innecesarios