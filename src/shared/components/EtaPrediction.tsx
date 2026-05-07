import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { typography } from '../theme';

// US-018 · Patrón Predicción IA · 3 niveles de confianza.
// Niveles:
//   alta  → "4 min" (Title 2 22pt Bold brand)
//   media → "~6 min" (tilde Title 2 Regular tSecondary + número Bold brand)
//   baja  → "9 min" + label "est." (Caption 12pt tTertiary)
// Tooltip solo aparece en niveles media y baja al tap. Alta NO es tappable.
// Ajuste en vivo: pill 36×16pt accent al cambiar >2 min.
// Hero variant (F.2 viaje activo) usa mismas reglas pero números 48pt + tilde 36pt.

export type EtaConfidence = 'alta' | 'media' | 'baja';

interface EtaPredictionProps {
  minutes: number;
  confidence: EtaConfidence;
  hero?: boolean;
  liveAdjust?: number; // diff en minutos vs predicción anterior
  reason?: string; // copy del tooltip
}

const REASONS: Record<EtaConfidence, string> = {
  alta: '',
  media: 'Estimación basada en horario · El bus reportó última posición hace más de 60 segundos',
  baja: 'Datos limitados de esta ruta',
};

export function EtaPrediction({
  minutes,
  confidence,
  hero,
  liveAdjust,
  reason,
}: EtaPredictionProps) {
  const theme = useTheme();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tappable = confidence !== 'alta';

  const numberSize = hero ? 48 : 22;
  const tildeSize = hero ? 36 : 22;
  const labelStyle = hero ? typography.title3 : typography.caption1;

  const renderNumber = () => {
    if (confidence === 'alta') {
      return (
        <Text
          style={{
            fontSize: numberSize,
            fontWeight: '700',
            color: theme.colors.brand,
            fontVariant: ['tabular-nums'],
            lineHeight: numberSize * 1.05,
          }}
        >
          {minutes} min
        </Text>
      );
    }
    if (confidence === 'media') {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text
            style={{
              fontSize: tildeSize,
              fontWeight: '400',
              color: theme.colors.textSecondary,
              lineHeight: tildeSize * 1.05,
            }}
          >
            ~
          </Text>
          <Text
            style={{
              fontSize: numberSize,
              fontWeight: '700',
              color: theme.colors.brand,
              fontVariant: ['tabular-nums'],
              lineHeight: numberSize * 1.05,
            }}
          >
            {minutes} min
          </Text>
        </View>
      );
    }
    // baja
    return (
      <View style={{ alignItems: 'flex-end' }}>
        <Text
          style={{
            fontSize: numberSize,
            fontWeight: '700',
            color: theme.colors.brand,
            fontVariant: ['tabular-nums'],
            lineHeight: numberSize * 1.05,
          }}
        >
          {minutes} min
        </Text>
        <Text style={[labelStyle, { color: theme.colors.textTertiary }]}>
          est.
        </Text>
      </View>
    );
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {liveAdjust && Math.abs(liveAdjust) >= 1 ? (
          <LiveAdjustPill diff={liveAdjust} />
        ) : null}

        {tappable ? (
          <Pressable
            onPress={() => setTooltipOpen((v) => !v)}
            hitSlop={6}
          >
            {renderNumber()}
          </Pressable>
        ) : (
          renderNumber()
        )}
      </View>

      {tooltipOpen && tappable && (
        <View
          style={{
            position: 'absolute',
            top: hero ? 60 : 28,
            right: 0,
            maxWidth: 240,
            padding: 10,
            borderRadius: 12,
            backgroundColor: theme.colors.surfaceElevated,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 2 },
            elevation: 4,
            zIndex: 20,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6 }}>
            <Ionicons
              name={confidence === 'media' ? 'time-outline' : 'information-circle-outline'}
              size={12}
              color={theme.colors.textSecondary}
            />
            <Text
              style={[
                typography.caption1,
                { color: theme.colors.textSecondary, flex: 1 },
              ]}
            >
              {reason ?? REASONS[confidence]}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

function LiveAdjustPill({ diff }: { diff: number }) {
  const theme = useTheme();
  const sign = diff > 0 ? '+' : '';
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        paddingHorizontal: 8,
        height: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.accent,
        backgroundColor: `${theme.colors.accent}26`,
      }}
    >
      <Ionicons
        name={diff > 0 ? 'arrow-up' : 'arrow-down'}
        size={10}
        color={theme.colors.accent}
      />
      <Text
        style={{
          color: theme.colors.accent,
          fontSize: 11,
          fontWeight: '600',
          fontVariant: ['tabular-nums'],
        }}
      >
        {sign}
        {diff} min
      </Text>
    </View>
  );
}
