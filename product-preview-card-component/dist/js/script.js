if ("fonts" in document) {
  var regular = new FontFace(
    "Rubik",
    "url(Rubik-Regular-hint-all.woff2) format('woff2'), url(Rubik-Regular-hint-all.woff) format('woff')"
  );
  var bold = new FontFace(
    "Rubik",
    "url(Rubik-Bold-hint-all.woff2) format('woff2'), url(Rubik-Bold-hint-all.woff) format('woff')",
    { weight: "700" }
  );

  Promise.all([bold.load(), regular.load()]).then(function (fonts) {
    fonts.forEach(function (font) {
      document.fonts.add(font);
    });
  });
}

if (!("fonts" in document) && "head" in document) {
  // Awkwardly dump the second stage @font-face blocks in the head
  var style = document.createElement("style");
  // Note: Edge supports WOFF2
  style.innerHTML =
    "@font-face { font-family: Rubik; src: url(/rubik/Rubik-Regular-hint-all.woff2) format('woff2'), url(/rubik/Rubik-Regular-hint-all.woff) format('woff'); } @font-face { font-family: Rubik; font-weight: 700; src: url(/rubik/Rubik-Bold-hint-all.woff2) format('woff2'), url(/rubik/Rubik-Bold-hint-all.woff) format('woff'); }";
  document.head.appendChild(style);
}
