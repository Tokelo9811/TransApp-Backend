export const supportedLanguages = [
  { code: "af", name: "Afrikaans" },
  { code: "zu", name: "Zulu" },
  { code: "xh", name: "Xhosa" },
  { code: "st", name: "Southern Sotho" },
  { code: "tn", name: "Tswana" },
  { code: "ve", name: "Venda" },
  { code: "ts", name: "Tsonga" },
  { code: "nr", name: "Ndebele" },
  { code: "ss", name: "Swati" },
  { code: "nso", name: "Northern Sotho" },
  { code: "en", name: "English" },
];

export const isSupportedLanguage = (langCode) => {
  return supportedLanguages.some((language) => language.code === langCode);
};
