// src/utils/triggerWishlistHearts.js
export function triggerWishlistHearts(event) {
  const btn = event.currentTarget; // the button clicked
  const rect = btn.getBoundingClientRect();

  for (let i = 0; i < 6; i++) {
    const heart = document.createElement("span");
    heart.textContent = "❤️";
    heart.className = "wishlist-heart";

    // random start position around the button
    heart.style.left = rect.left + rect.width / 2 + (Math.random() * 40 - 20) + "px";
    heart.style.top = rect.top + rect.height / 2 + "px";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1500); // clean up
  }
}
