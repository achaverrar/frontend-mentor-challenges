const image = document.querySelector(".card__image");
const bridgeToImage = document.querySelector(".card__bridge-to-image");

image.addEventListener("error", function () {
  if (!bridgeToImage.ariaHidden) return;
  this.onerror = null;
  this.alt = "Sorry, we couldn't find the image of the product 😥";
  bridgeToImage.ariaHidden = false;
});
