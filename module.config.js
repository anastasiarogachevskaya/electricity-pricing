module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    enableBabelRCLookup: false,
    enableBabelRuntime: false,
  },
  resolver: {
    sourceExts: ['jsx', 'js', 'ts', 'tsx'], // Add any other extensions you're using
  },
  jsEngine: 'hermes', // Change this to 'jsc' for JavaScriptCore engine
};
