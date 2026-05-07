import { Platform, View, useWindowDimensions } from 'react-native';

// Wrapper que solo en web (≥768pt) encuadra la app dentro de un marco
// estilo iPhone 15 (393×852pt) centrado sobre un backdrop oscuro.
// En nativo o en viewport móvil renderiza children directo sin overhead.

interface WebPhoneFrameProps {
  children: React.ReactNode;
}

export function WebPhoneFrame({ children }: WebPhoneFrameProps) {
  const { width } = useWindowDimensions();
  const desktop = Platform.OS === 'web' && width >= 768;

  if (!desktop) {
    return <>{children}</>;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0E0F12',
      }}
    >
      {/* Bezel exterior */}
      <View
        // @ts-expect-error — boxShadow es válido en RNW
        style={{
          width: 405,
          height: 'min(864px, calc(100vh - 24px))',
          maxHeight: 864,
          borderRadius: 56,
          backgroundColor: '#1C1D20',
          padding: 6,
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.55)',
        }}
      >
        {/* Pantalla del teléfono */}
        <View
          style={{
            flex: 1,
            borderRadius: 50,
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            position: 'relative',
          }}
        >
          {children}

          {/* Dynamic Island simulada */}
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 12,
              left: '50%',
              marginLeft: -60,
              width: 120,
              height: 32,
              borderRadius: 16,
              backgroundColor: '#000',
              zIndex: 9999,
            }}
          />
        </View>
      </View>
    </View>
  );
}
