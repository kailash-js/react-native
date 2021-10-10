/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const exclusionList = require('metro-config/src/defaults/exclusionList');

module.exports = {
  resolver: {
    blacklistRE: exclusionList([
      /packages\/react-native-bases\/dist\/.*/,
      /packages\/react-native-motion-layers\/dist\/.*/,
      /packages\/react-native-uikit\/dist\/.*/,
      /packages\/react-native-keyboard\/dist\/.*/,
      /packages\/foundation\/dist\/.*/,
      /packages\/motion-layers\/dist\/.*/,
      /packages\/motion-ui\/dist\/.*/,
      /packages\/keyboard\/dist\/.*/,
    ]),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
