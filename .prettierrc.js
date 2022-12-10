module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  tabWidth: 2,
  endOfLine: 'lf',
  importOrder: [
    "^react(-dom)?$",
    "^@angular/",
    "^vue$",
    "^node:",
    "<THIRD_PARTY_MODULES>",
    "^@(?!src)",
    "^@src",
    "^[.](?!.*\.css$)",
    ".css$",

  ],
  importOrderSeparation: true,
};
