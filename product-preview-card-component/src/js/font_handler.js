if ("fonts" in document) {
  let M_regular = new FontFace(
    "Monserrat",
    "url(fonts/montserrat-v25-latin-500.woff2) format('woff2'), url(fonts/montserrat-v25-latin-500.woff) format('woff')"
  );
  let M_bold = new FontFace(
    "Monserrat",
    "url(fonts/montserrat-v25-latin-700.woff2) format('woff2'), url(fonts/montserrat-v25-latin-700.woff) format('woff')",
    { weight: "700" }
  );
  let F_bold = new FontFace(
    "Fraunces",
    "url(fonts/fraunces-v24-latin-700.woff2) format('woff2'), url(fonts/fraunces-v24-latin-700.woff) format('woff')",
    { weight: "700" }
  );

  Promise.all([M_regular.load(), M_bold.load(), F_bold.load()]).then(function (
    fonts
  ) {
    fonts.forEach(function (font) {
      document.fonts.add(font);
    });
  });
}

if (!("fonts" in document) && "head" in document) {
  // Awkwardly dump the second stage @font-face blocks in the head
  let style = document.createElement("style");
  // Note: Edge supports WOFF2
  style.innerHTML =
    "@font-face { font-family: Monserrat; src: url(fonts/montserrat-v25-latin-500.woff2) format('woff2'), url(fonts/montserrat-v25-latin-500.woff) format('woff'); } @font-face { font-family: Monserrat; font-weight: 700; src: url(fonts/montserrat-v25-latin-500.woff2) format('woff2'), url(fonts/montserrat-v25-latin-500.woff) format('woff'); } @font-face { font-family: Fraunces; font-weight: 700; src: url(fonts/fraunces-v24-latin-700.woff2) format('woff2'), url(fonts/fraunces-v24-latin-700.woff) format('woff'); }";
  document.head.appendChild(style);
}
