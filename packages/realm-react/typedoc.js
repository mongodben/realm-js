// typedoc.js
/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
  entryPoints: ["./src/index.tsx"],
  out: "doc",
  media: "media",
  sidebarLinks: {
    "Realm React Native SDK Documentation": "https://www.mongodb.com/docs/realm/sdk/react-native/",
    "Realm JavaScript Reference": "https://www.mongodb.com/docs/realm-sdks/js/latest/",
    "Github Repo": "https://github.com/realm/realm-js/tree/master/packages/realm-react",
  },
};
