import colorNamer from "color-namer";

export const printSingleClickVariantQRAsImage = async (
  variants = [],
  productName
) => {
  if (!variants.length) return;

  /* ================= USER INPUT ================= */
  const DPI = 96;

  const inputWidth = prompt("Enter label WIDTH in inches", "2");
  const inputHeight = prompt("Enter label HEIGHT in inches", "2.5");

  if (!inputWidth || !inputHeight) return;

  const LABEL_WIDTH = parseFloat(inputWidth) * DPI;
  const LABEL_HEIGHT = parseFloat(inputHeight) * DPI;

  if (isNaN(LABEL_WIDTH) || isNaN(LABEL_HEIGHT)) {
    alert("Invalid size");
    return;
  }

  /* ===== BASE SIZE (FOR SCALING) ===== */
  const BASE_WIDTH = 2 * DPI;
  const BASE_HEIGHT = 2.5 * DPI;

  const scaleX = LABEL_WIDTH / BASE_WIDTH;
  const scaleY = LABEL_HEIGHT / BASE_HEIGHT;

  // slightly bigger text
  const FONT_SCALE = Math.min(scaleX, scaleY) * 1.2;
  /* ================================== */

  // Create canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const cols = 3;
  const rows = Math.ceil(variants.length / cols);

  canvas.width = LABEL_WIDTH * Math.min(cols, variants.length);
  canvas.height = LABEL_HEIGHT * rows;

  /* ================= LOAD QR IMAGES ================= */
  const loadImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });

  const qrImages = await Promise.all(
    variants.map((variant) => loadImage(variant.qrcode_url))
  );
  /* ================================================= */

  const drawLabels = (variantsToRender, qrImagesToRender) => {
    variantsToRender.forEach((variant, index) => {
      const lineGap = 3 * FONT_SCALE;

      const colorName =
        colorNamer(variant.color).basic[0]?.name || variant.color;
      const formattedColor =
        colorName.charAt(0).toUpperCase() + colorName.slice(1);
      const styleCode = variant.v_style_code || "KH-2174";

      const labelWidth = LABEL_WIDTH;
      const labelHeight = LABEL_HEIGHT;

      const col = index % cols;
      const row = Math.floor(index / cols);
      const xPos = col * labelWidth;
      const yPos = row * labelHeight;

      /* ============ BACKGROUND & BORDER ============ */
      ctx.fillStyle = "#fff";
      ctx.fillRect(xPos, yPos, labelWidth, labelHeight);

      ctx.strokeStyle = "#e0e0e0";
      ctx.lineWidth = 1;
      ctx.strokeRect(xPos, yPos, labelWidth, labelHeight);
      /* ============================================ */

      const padding = 8 * FONT_SCALE;
      let currentY = yPos + 16 * FONT_SCALE;

      ctx.fillStyle = "#000";

      /* ================ TEXT ================= */
      ctx.font = `bold ${Math.round(12 * FONT_SCALE)}px Arial`;
      ctx.fillText(
        `Product: ${productName || "Aarav Classic Kurta"}`,
        xPos + padding,
        currentY
      );
      currentY += (14 * FONT_SCALE) + lineGap;

      ctx.font = `${Math.round(10 * FONT_SCALE)}px Arial`;
      ctx.fillText(`Style: ${styleCode}`, xPos + padding, currentY);
      currentY += (12 * FONT_SCALE) + lineGap;

      ctx.fillText(`Color: ${formattedColor}`, xPos + padding, currentY);
      currentY += (12 * FONT_SCALE) + lineGap;

      ctx.fillText(
        `Fabric: ${variant.fabric?.trim() || "100% Cotton"}`,
        xPos + padding,
        currentY
      );
      currentY += (12 * FONT_SCALE) + lineGap;

      ctx.fillText(
        `Size: ${variant.size?.toUpperCase() || "N/A"}`,
        xPos + padding,
        currentY
      );
      currentY += (14 * FONT_SCALE) + lineGap;

      /* ============== PRICE ================= */
      ctx.font = `bold ${Math.round(11 * FONT_SCALE)}px Arial`;
      const mrpText = "MRP: ";
      ctx.fillText(mrpText, xPos + padding, currentY);
      const mrpWidth = ctx.measureText(mrpText).width;

      let priceEndX;

      if (
        variant.discounted_price &&
        variant.discounted_price > 0 &&
        variant.actual_price !== variant.discounted_price
      ) {
        ctx.font = `${Math.round(10 * FONT_SCALE)}px Arial`;
        ctx.fillStyle = "#666";
        const originalPriceText = `₹${variant.actual_price}`;
        ctx.fillText(
          originalPriceText,
          xPos + padding + mrpWidth,
          currentY
        );

        const originalWidth =
          ctx.measureText(originalPriceText).width;

        ctx.beginPath();
        ctx.moveTo(
          xPos + padding + mrpWidth,
          currentY - 3 * FONT_SCALE
        );
        ctx.lineTo(
          xPos + padding + mrpWidth + originalWidth,
          currentY - 3 * FONT_SCALE
        );
        ctx.stroke();

        ctx.fillStyle = "#000";
        ctx.font = `bold ${Math.round(11 * FONT_SCALE)}px Arial`;
        const discountedText = `₹${variant.discounted_price}`;
        ctx.fillText(
          discountedText,
          xPos +
            padding +
            mrpWidth +
            originalWidth +
            6 * FONT_SCALE,
          currentY
        );

        priceEndX =
          xPos +
          padding +
          mrpWidth +
          originalWidth +
          6 * FONT_SCALE +
          ctx.measureText(discountedText).width;
      } else {
        ctx.font = `bold ${Math.round(11 * FONT_SCALE)}px Arial`;
        const priceText = `₹${variant.actual_price}`;
        ctx.fillText(
          priceText,
          xPos + padding + mrpWidth,
          currentY
        );

        priceEndX =
          xPos +
          padding +
          mrpWidth +
          ctx.measureText(priceText).width;
      }

      /* 👉 Incl. taxes RIGHT SIDE */
      ctx.font = `${Math.round(8 * FONT_SCALE)}px Arial`;
      ctx.fillStyle = "#000";
      ctx.fillText(
        "(Incl. taxes)",
        priceEndX + 8 * FONT_SCALE,
        currentY
      );

      currentY += (14 * FONT_SCALE) + lineGap;
      /* ====================================== */

      /* =============== QR CODE =============== */
      const qrSize = Math.min(labelWidth, labelHeight) * 0.5;
      const qrX = xPos + (labelWidth - qrSize) / 2;
      const qrY =
        yPos + labelHeight - qrSize - 6 * FONT_SCALE;

      if (qrImagesToRender[index]) {
        ctx.drawImage(
          qrImagesToRender[index],
          qrX,
          qrY,
          qrSize,
          qrSize
        );
      }
      /* ====================================== */
    });
  };

  drawLabels(variants, qrImages);

  /* ================= DOWNLOAD ================= */
  const imageUrl = canvas.toDataURL("image/png");
  const downloadLink = document.createElement("a");
  downloadLink.href = imageUrl;
  downloadLink.download = `${productName || "Product"}_labels.png`;
  downloadLink.click();
};
