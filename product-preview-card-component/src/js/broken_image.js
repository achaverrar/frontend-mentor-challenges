const image = document.querySelector(".card__image");
const imageContainer = document.querySelector(".card__image-container");

image.addEventListener("error", function () {
  if (!imageContainer.ariaHidden) return;
  this.onerror = null;
  this.alt = "Sorry, we couldn't find the image of the product 😥";
  imageContainer.ariaHidden = false;
});
