// BROKEN IMAGE HANDLER
/* If the link to the image of the product is broken, 
  uses the alt text of the image as a warning by:
  - Changing the alt text
  - Making it accessible to assistive devices
*/
const image = document.querySelector(".card__image");
const imageServer = document.querySelector("#image-server");

image.addEventListener("error", function () {
  if (!imageServer.ariaHidden) return;
  this.onerror = null;
  this.alt = "Sorry, we couldn't find the image of the product 😥";
  imageServer.ariaHidden = false;
});
