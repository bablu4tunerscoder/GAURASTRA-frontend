import colorNamer from "color-namer";

export const printSingleClickVariantQRAsImage = async (
  variants = [],
  productName
) => {
  if (!variants.length) return;

  // Create a hidden canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Each label is exactly 2x2.5 inches
  const labelWidth = 2 * 96; // 2 inches at 96 DPI
  const labelHeight = 2.5 * 96; // 2.5 inches at 96 DPI

  // Calculate canvas size based on number of variants
  const cols = 3;
  const rows = Math.ceil(variants.length / cols);

  canvas.width = labelWidth * Math.min(cols, variants.length);
  canvas.height = labelHeight * rows;

  // Preload all QR code images
  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Important for CORS
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  };

  // Load all QR codes first
  const qrImages = await Promise.all(
    variants.map(variant => loadImage(variant.qrcode_url))
  );

  const drawLabels = (variantsToRender, qrImagesToRender) => {
    variantsToRender.forEach((variant, index) => {
      const lineGap = 3; // Equal gap between all lines
      const colorName = colorNamer(variant.color).basic[0]?.name || variant.color;
      const formattedColor = colorName.charAt(0).toUpperCase() + colorName.slice(1);
      const styleCode = variant.v_style_code || "KH-2174";

      // Label position calculations
      const labelWidth = 2 * 96; // 2 inches at 96 DPI
      const labelHeight = 2.5 * 96; // 2.5 inches at 96 DPI

      const col = index % 3;
      const row = Math.floor(index / 3);
      const xPos = col * labelWidth;
      const yPos = row * labelHeight;

      // Drawing label background
      ctx.fillStyle = "#fff";
      ctx.fillRect(xPos, yPos, labelWidth, labelHeight);

      // Draw border
      ctx.strokeStyle = "#e0e0e0";
      ctx.lineWidth = 1;
      ctx.strokeRect(xPos, yPos, labelWidth, labelHeight);

      // Draw text and information with smaller fonts
      const padding = 8;
      let currentY = yPos + 14;

      ctx.fillStyle = "#000";

      // Product name
      ctx.font = 'bold 11px Arial';
      ctx.fillText(`Product: ${productName || "Aarav Classic Kurta"}`, xPos + padding, currentY);
      currentY += 13 + lineGap;

      // Other info with smaller font
      ctx.font = '9px Arial';

      ctx.fillText(`Style: ${styleCode}`, xPos + padding, currentY);
      currentY += 11 + lineGap;

      ctx.fillText(`Color: ${formattedColor}`, xPos + padding, currentY);
      currentY += 11 + lineGap;

      ctx.fillText(`Fabric: ${variant.fabric?.trim() || "100% Cotton"}`, xPos + padding, currentY);
      currentY += 11 + lineGap;

      ctx.fillText(`Size: ${variant.size?.toUpperCase() || "N/A"}`, xPos + padding, currentY);
      currentY += 13 + lineGap;

      // Price section - MRP and price on same line
      ctx.font = 'bold 10px Arial';
      const mrpText = 'MRP: ';
      ctx.fillText(mrpText, xPos + padding, currentY);
      const mrpWidth = ctx.measureText(mrpText).width;

      // Price value on same line
      if (variant.discounted_price &&
        variant.discounted_price > 0 &&
        variant.actual_price !== variant.discounted_price) {
        // Strike-through original price
        ctx.font = '9px Arial';
        ctx.fillStyle = "#666";
        const originalPriceText = `₹${variant.actual_price}`;
        ctx.fillText(originalPriceText, xPos + padding + mrpWidth, currentY);
        const textWidth = ctx.measureText(originalPriceText).width;
        ctx.beginPath();
        ctx.moveTo(xPos + padding + mrpWidth, currentY - 3);
        ctx.lineTo(xPos + padding + mrpWidth + textWidth, currentY - 3);
        ctx.stroke();

        // Discounted price
        ctx.fillStyle = "#000";
        ctx.font = 'bold 10px Arial';
        ctx.fillText(`₹${variant.discounted_price}`, xPos + padding + mrpWidth + textWidth + 5, currentY);
      } else {
        ctx.font = 'bold 10px Arial';
        ctx.fillText(`₹${variant.actual_price}`, xPos + padding + mrpWidth, currentY);
      }
      currentY += 11 + lineGap;

      // Tax text
      ctx.font = '7px Arial';
      ctx.fillText('(Incl. taxes)', xPos + padding, currentY);

      // QR Code drawing - centered at bottom
      const qrSize = 105;
      const qrX = xPos + (labelWidth - qrSize) / 2;
      const qrY = yPos + labelHeight - qrSize - 5;

      if (qrImagesToRender[index]) {
        ctx.drawImage(qrImagesToRender[index], qrX, qrY, qrSize, qrSize);
      }
    });
  };

  // Draw all labels
  drawLabels(variants, qrImages);

  // Generate and download the image
  const imageUrl = canvas.toDataURL('image/png');

  const downloadLink = document.createElement('a');
  downloadLink.href = imageUrl;
  downloadLink.download = `${productName || "Product"}_labels.png`;
  downloadLink.click();
};