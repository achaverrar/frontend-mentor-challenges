const image = document.querySelector(".card__image");
const imageContainer = document.querySelector(".card__image-container");

image.addEventListener("error", function () {
  this.src = "images/broken_image.png";
  this.onerror = null;
  this.alt = "Sorry, we couldn't find the image of the product 😥";
  imageContainer.ariaHidden = false;
});
