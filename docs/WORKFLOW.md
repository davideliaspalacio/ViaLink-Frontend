# Vialink · Workflow + Estado de implementación

> Mapeo entre el PDF de diseño "Vialink · Primer set de pantallas" y la implementación actual del repo.
>
> **PDF visual completo**: [`docs/Vialink-Workflow.pdf`](Vialink-Workflow.pdf)
> **Repo**: `transportCol-frontend` · **Branch**: `main` · **Stack**: Expo SDK 54 + React 19 + RN 0.81 + NativeWind v4

## Cómo correr y probar

```bash
npm install
npm run start          # arranca Metro
# luego: i (iOS Simulator) · a (Android) · w (web) · escanear QR (Expo Go)
```

Anchor: `(onboarding)`. Al primer arranque entra al pager de bienvenida, después al mapa con tab bar.

---

## Sección A · Visual System (foundation)

**Estado: ✅ Tokens + componentes globales completos**

| Token / componente | Archivo | Notas |
|---|---|---|
| Paleta light + dark | `src/shared/theme/colors.ts` | brand `#1E5EFF`, accent `#FF6B35`, success `#00875A`, warning `#C77700`, danger `#DA1E28` |
| Spacing 4pt scale | `src/shared/theme/spacing.ts` | xxs..giant + radius + sizes |
| Tipografía SF Pro | `src/shared/theme/typography.ts` | largeTitle 34, title1 28, title2 22, headline 17/600 |
| Animations + haptics | `src/shared/theme/animations.ts`, `haptics.ts` | productHaptics presets |
| `<BusPill>` | `src/shared/components/BusPill.tsx` | sm 32×20 / md 48×26 / lg 50×24 |
| `<IconCircle>` | `src/shared/components/IconCircle.tsx` | sm 32 / md 40 / lg 56 / xl 96 · 6 tonos × 4 backgrounds |
| `<PrimaryButton>` | `src/shared/components/PrimaryButton.tsx` | 50pt + scale 0.98 + haptic |
| `<TintedButton>` | `src/shared/components/TintedButton.tsx` | secundario brand 12% bg |
| `<TextButton>` | `src/shared/components/TextButton.tsx` | text-only brand |
| `<EtaPrediction>` (US-018) | `src/shared/components/EtaPrediction.tsx` | 3 niveles + tooltip + live adjust pill |

---

## Sección B · Onboarding & Acceso (Sprint 1, US-001 a US-005, US-025/026)

**Estado: ✅ P1–P4 implementadas · ⏳ login real diferido a Sprint 5**

| Pantalla | US | Implementación | Ruta |
|---|---|---|---|
| P1 · Bienvenida | US-001 | `OnboardingPager.tsx` slide 1 | `/(onboarding)/index` |
| P2 · Tiempo real | US-001 | `OnboardingPager.tsx` slide 2 | (mismo) |
| P3 · Cobertura | US-001 | `OnboardingPager.tsx` slide 3 | (mismo) |
| P4 · Priming ubicación | US-002 | `LocationPriming.tsx` | `/(onboarding)/permission` |

Archivos clave:
- `src/features/onboarding/screens/OnboardingPager.tsx`
- `src/features/onboarding/screens/LocationPriming.tsx`
- `src/features/onboarding/components/OnboardingHero.tsx` (3 PNG en `assets/images/onboarding[1-3].png`)
- `app/(onboarding)/_layout.tsx`

**TODO**: integrar `expo-location` real (hoy `handlePermit` solo navega).

---

## Sección C · Mapa principal (Sprint 2, US-007)

**Estado: ✅ P5 con bottom sheet + 2 FABs**

| Pantalla / patrón | US | Implementación |
|---|---|---|
| P5 Mapa raíz · sheet `.medium` | US-007 | `src/features/map/screens/MapScreen.tsx` |
| Tab bar 4 tabs blur | US-007 | `app/(tabs)/_layout.tsx` |
| FAB Centrar (3 estados) | US-008 | `src/features/map/components/CenterMapFAB.tsx` |
| FAB Reportar incidencia | US-019 | `src/features/map/components/ReportFAB.tsx` |

Componentes auxiliares: `MapPlaceholder.tsx` (grid stub), `SearchBar.tsx`, `NearbyStopRow.tsx`.

**TODO**: reemplazar `MapPlaceholder` con `react-native-maps` real; animar bottom de los FABs según `useAnimatedReaction` del bottom sheet.

---

## Sección D · Exploración del mapa (Sprint 2, US-014, US-015)

**Estado: ✅ P11 + P12 implementadas**

| Pantalla | US | Implementación | Ruta |
|---|---|---|---|
| P11 Detalle de paradero | US-014 | `src/features/stops/screens/StopDetail.tsx` | `/stop/[id]` (modal) |
| Fila de ruta · 4 estados ETA | US-014 | `src/features/stops/components/RouteRow.tsx` | (componente) |
| P12 Detalle de ruta de bus | US-015 | `src/features/routes/screens/RouteDetail.tsx` | `/route/[id]` (push) |

Estados de fila implementados:
- **normal** ≥1 min · `title2 brand 28pt` + "luego X min" tertiary
- **arriving** <1 min · pill accent `#FF6B35` con `bg ${accent}26`
- **at_stop** · success green + dot pulsante
- **far** · subhead text-tertiary "Próximo en ~25 min"

P12 incluye 5 tipos de paradero en timeline: `terminal_inicio`, `intermedio`, `bus_aqui`, `terminal_destino`, `usuario`.

---

## Sección E · Planificación de viaje (Sprint 3, US-008 a US-012)

**Estado: ✅ Todos los flujos implementados**

| Pantalla | US | Implementación | Ruta |
|---|---|---|---|
| P6 Search activo + P7 resultados | US-008/009 | `src/features/search/screens/SearchScreen.tsx` | `/(tabs)/search` |
| Quick cards Casa/Trabajo/Agregar | US-008 | `src/features/search/components/QuickShortcut.tsx` | (componente) |
| Filas resultado + reciente | US-009 | `src/features/search/components/DestinationRow.tsx` | `ResultRow` + `RecentRow` |
| P8 Resultados de ruta | US-010 | `src/features/planning/screens/RouteOptions.tsx` | `/route-options` |
| P9 Detalle de ruta seleccionada | US-011 | `src/features/planning/screens/SelectedRoute.tsx` | `/route-detail` |
| P17 Asistente IA conversacional | US-012 | `src/features/assistant/screens/AssistantSheet.tsx` | `/assistant` (modal) |

Estados del Asistente IA implementados: **idle** (4 sugerencias) · **loading** (skeleton) · **respuesta** (markdown + card de ruta + Ver opciones más) · **ambiguo** (chips de re-formulación).

Anti-patterns aplicados en Buscar: NO modal/sheet · NO categorías generales · NO autocomplete inline · NO pin en mapa.

---

## Sección F · Viaje en vivo (Sprint 4, US-016, US-017)

**Estado: ✅ P10 ActiveTrip implementado · 🚧 Live Activity stub**

| Pantalla | US | Implementación |
|---|---|---|
| P10 Viaje activo (focus mode) | US-016 | `src/features/trip/screens/ActiveTrip.tsx` (`/active-trip`) |
| Live Activity Dynamic Island | US-017 | **Pendiente** — requiere `ActivityKit` Swift + módulo nativo Expo config plugin |

P10 implementa: tiempo restante 48pt brand · próximo paradero card · paraderos restantes con timeline · CTAs Compartir/Cancelar.

---

## Sección G · Acciones contextuales (Sprint 5, US-013, US-019, US-020, US-025/026)

**Estado: ✅ 4 modales implementados**

| Modal | US | Implementación | Ruta | Trigger |
|---|---|---|---|---|
| Modal Login Apple/Google | US-025/026 | `src/features/auth/screens/LoginSheet.tsx` | `/login?context=…` | bookmark/share/report sin sesión |
| Modal Reportar incidencia | US-019 | `src/features/reports/screens/ReportSheet.tsx` | `/report` | tap FAB en mapa |
| Modal Compartir viaje | US-020 | `src/features/trip/screens/ShareTripSheet.tsx` | `/share-trip` | desde P10 ActiveTrip |
| Modal Guardar destino | US-013 | `src/features/destinations/screens/SaveDestinationModal.tsx` | `/save-destination` | tap bookmark en P11 |

Reportar: grid 2×3 con tonos warning/danger semánticos · auto-cierre 1.8s tras checkmark.
Login: copy contextual (3 variantes según `?context=bookmark|share|report`).
Guardar destino: 4 categorías predefinidas + "Otro" con etiqueta personalizada + confirmación checkmark.

---

## Sección H · Cuenta & Configuración (Sprint 5–6, US-021 a US-024)

**Estado: ✅ Tab Saved + Tab Profile implementados (mock data)**

| Pantalla | US | Implementación |
|---|---|---|
| P15 Tab Saved (paraderos + rutas) | US-022 | `src/features/saved/screens/SavedScreen.tsx` |
| P16 Tab Perfil (guest + logueado) | US-023/024 | `src/features/profile/screens/ProfileScreen.tsx` |

Saved: segmented control Paraderos/Rutas · paraderos con BusPill primaria + ETA · rutas con estado operando/baja/sin servicio.
Profile: condicional `MOCK_LOGGED_IN` (hoy `false` → CTA login) + secciones Configuración + Acerca de.

**TODO**: persistir guardados con `expo-sqlite` o `MMKV`; reemplazar mock por session real.

---

## Mapa de rutas de expo-router

```
app/
├── _layout.tsx                    # Stack root con todos los modales/screens
├── (onboarding)/
│   ├── _layout.tsx
│   ├── index.tsx                  → OnboardingPager
│   └── permission.tsx             → LocationPriming
├── (tabs)/
│   ├── _layout.tsx                # 4 tabs blur
│   ├── index.tsx                  → MapScreen
│   ├── search.tsx                 → SearchScreen
│   ├── saved.tsx                  → SavedScreen
│   └── profile.tsx                → ProfileScreen
├── stop/[id].tsx                  → StopDetail (modal)
├── route/[id].tsx                 → RouteDetail (push)
├── route-options.tsx              → RouteOptions (P8)
├── route-detail.tsx               → SelectedRoute (P9)
├── active-trip.tsx                → ActiveTrip (P10)
├── share-trip.tsx                 → ShareTripSheet (modal)
├── assistant.tsx                  → AssistantSheet (modal)
├── login.tsx                      → LoginSheet (modal)
├── report.tsx                     → ReportSheet (modal)
└── save-destination.tsx           → SaveDestinationModal (transparent modal)
```

---

## Patrones transversales

### US-018 · Predicción IA · 3 niveles de confianza

Componente: `src/shared/components/EtaPrediction.tsx` · exportado en `@/shared`.

```tsx
<EtaPrediction minutes={4} confidence="alta" />              // "4 min" bold brand
<EtaPrediction minutes={6} confidence="media" />             // "~6 min" tilde tSecondary
<EtaPrediction minutes={9} confidence="baja" />              // "9 min" + label "est."
<EtaPrediction minutes={12} confidence="alta" hero />        // 48pt para F.2
<EtaPrediction minutes={7} confidence="alta" liveAdjust={3}/>// con pill +3 min accent
```

Reglas: tooltip aparece solo en niveles `media` y `baja` al tap. Alta NO es tappable. Ajuste en vivo dispara pill 36×16pt accent FF6B35 con borde 1pt cuando `>2 min` de delta.

### Quirk NativeWind v4 jsx-runtime + Pressable

Documentado en `src/features/search/components/DestinationRow.tsx`:
> El `flexDirection: 'row'` se ignora si se aplica directo al `Pressable.style` función. Workaround: layout en un `View` interno + Pressable usa `children-as-function` para el estado pressed.

```tsx
<Pressable onPress={...} style={{ borderRadius, overflow: 'hidden' }}>
  {({ pressed }) => (
    <View style={{ flexDirection: 'row', backgroundColor: pressed ? raised : transparent }}>
      {children}
    </View>
  )}
</Pressable>
```

---

## Pendiente para siguiente sprint

- **react-native-maps** real: reemplaza todos los `MapPlaceholder`/`MapStub`
- **expo-location**: permiso real + tracking continuo
- **Live Activity (US-017)**: `ActivityKit` Swift + Expo config plugin nativo
- **Persistencia**: `expo-sqlite` o `MMKV` para Saved + Recientes + categorías Guardar
- **Auth real**: Apple Sign-In + Google Sign-In SDK
- **Backend ETAs**: API GraphQL/REST con WebSocket para actualizaciones en vivo
- **Animaciones reanimated**: pulse en onboarding slide 2, halo en estado "Llegando", count animation en US-018
- **Sistema de reportes**: backend + validación cruzada por proximidad
- **Dark mode**: validar contraste de cada pantalla en simulador con `expo start --ios`
