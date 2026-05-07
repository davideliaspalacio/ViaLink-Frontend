# TODO — Limpieza pendiente del proyecto

## Componentes del template Expo a eliminar (después de migrar pantallas a Vialink)
- [ ] components/external-link.tsx
- [ ] components/haptic-tab.tsx
- [ ] components/hello-wave.tsx
- [ ] components/parallax-scroll-view.tsx
- [ ] components/themed-text.tsx
- [ ] components/themed-view.tsx
- [ ] components/ui/icon-symbol.* (todas las variantes: .tsx, .ios.tsx)
- [ ] components/ui/collapsible.tsx

## Hooks legacy del template
- [ ] hooks/use-color-scheme.ts
- [ ] hooks/use-color-scheme.web.ts
- [ ] hooks/use-theme-color.ts

## Otros
- [ ] constants/theme.ts (sistema de colores antiguo del template)
- [ ] Pantalla(s) de demo del template en app/(tabs)/ (si existen)

## Cuándo limpiar
Después de que TODAS las pantallas del MVP de Vialink (US-001 a US-026)
estén implementadas con el nuevo design system y se haya verificado que
nada del proyecto importa los archivos viejos.

## Comando de búsqueda para verificar antes de borrar:
```bash
grep -r "themed-text\|themed-view\|hello-wave\|parallax-scroll\|haptic-tab\|external-link\|use-color-scheme\|use-theme-color\|constants/theme" app/ components/ hooks/
```

## Nota — coexistencia intencional de hooks
Mientras esta limpieza no se ejecute, los hooks camelCase de Vialink
(`hooks/useColorScheme.ts`, `hooks/useTheme.ts`) coexisten con los hooks
kebab-case del template (`hooks/use-color-scheme.ts`,
`hooks/use-color-scheme.web.ts`, `hooks/use-theme-color.ts`).
NO consolidar, NO unificar — son consumidos por sistemas distintos
(Vialink design system vs componentes template) hasta que el template se
elimine en bloque.
