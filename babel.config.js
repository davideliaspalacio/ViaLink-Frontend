module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
          },
        },
      ],
      // IMPORTANTE: react-native-worklets/plugin debe ir AL FINAL del array.
      // Reanimated 4 + worklets 0.5+ usa el plugin de worklets en lugar de
      // react-native-reanimated/plugin (deprecado en RN 4). Si en runtime hay
      // errores de "Reanimated plugin not found", probar fallback a
      // 'react-native-reanimated/plugin'.
      'react-native-worklets/plugin',
    ],
  };
};
