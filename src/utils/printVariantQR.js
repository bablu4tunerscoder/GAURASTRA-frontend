import colorNamer from 'color-namer';

export const printVariantQR = (variant, productName) => {


  const printWindow = window.open("", "_blank", "width=800,height=600");

  // Get the color name using color-namer
  const colorName = colorNamer(variant.color).basic[0]?.name || variant.color;
  const styleCode = variant.v_style_code;
  // Capitalize first letter of color name
  const formattedColor = colorName.charAt(0).toUpperCase() + colorName.slice(1);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Print QR Code</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          /* ADJUST BASE FONT SIZE HERE - All text will scale proportionally */
          font-size: 16px;
          
          width: 100vw;
          height: 100vh;
          margin: 0;
          overflow: hidden;
          font-family: 'Arial', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .container {
          /* Container will auto-size based on background image dimensions */
          max-width: 90vw;
          max-height: 90vh;
          background-image: url('https://res.cloudinary.com/dtug6rmfb/image/upload/v1767336787/offline/images/1767336786313-563275.webp');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1.5em;
          position: relative;
        }
        
        /* This will be set by JavaScript after image loads */
        .container.loaded {
          width: var(--img-width);
          height: var(--img-height);
        }
        
        .content {
          color: white;
          width: 100%;
        }
        
        .product-name {
          margin-top: 2em;
          font-size: 1.3em;
          font-weight: 300;
          text-align: left;
        }
        
        .info-line {
          font-size: 1.25em;
          font-weight: 300;
          letter-spacing: 0.075em;
          text-align: left;
        }
        
        .label {
          font-weight: 400;
        }
        
        .qr-section {
          margin-top: 1em;
          text-align: center;
        }
        
        .qr-code {
          width: 12.75em;
          height: 12.75em;
          background: white;
          padding: 0.5em;
          margin-top: 2em;
          display: inline-block;
          border-radius: 0.25em;
        }
        
        .qr-code img {
          width: 100%;
          height: 100%;
          display: block;
        }
        
        .price-section {
          font-size: 1.25em;
          font-weight: 300;
          letter-spacing: 0.075em;
          text-align: left;
        }
        
        .original-price {
          text-decoration: line-through;
          opacity: 0.7;
        }
        
        .discounted-price {
          font-weight: 400;
        }
        
        .tax-text {
          font-size: 0.75em;
        }
        
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .container {
            page-break-after: avoid;
          }
          
          @page {
            size: A4 portrait;
            margin: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="container" id="container">
        <div class="content">
          <div class="product-name">
            <span class="label">Product Name:</span> ${productName || 'Aarav Classic Kurta'}
          </div>
          
          <div class="info-line">
            <span class="label">Style Code:</span> ${styleCode || 'KH-2174'}
          </div>
          
          <div class="info-line">
            <span class="label">Color:</span> ${formattedColor}
          </div>
          
          <div class="info-line">
            <span class="label">Fabric:</span> 100% Cotton
          </div>
          
          <div class="info-line">
            <span class="label">Size:</span> ${variant.size.toUpperCase()}
          </div>
          
          <div class="price-section">
            <span class="label">MRP:</span> 
              ${variant.discounted_price &&
      variant.discounted_price > 0 &&
      variant.actual_price !== variant.discounted_price
      ? `<span class="original-price">₹${variant.actual_price}</span>
                  <span class="discounted-price">₹${variant.discounted_price}</span>`
      : `₹${variant.actual_price}`}
            <span class="tax-text">(Incl. of all taxes)</span>
          </div>
          
          <div class="qr-section">
            <div class="qr-code">
              <img src="${variant.qrcode_url}" alt="QR Code" />
            </div>
          </div>
          
          
        </div>
      </div>
      
       <script>
  const bgImage = new Image();
  bgImage.src =
    "https://res.cloudinary.com/dtug6rmfb/image/upload/v1767336787/offline/images/1767336786313-563275.webp";

  bgImage.onload = function () {
    const container = document.getElementById("container");

    const imgWidth = bgImage.width;
    const imgHeight = bgImage.height;
    const aspectRatio = imgWidth / imgHeight;

    // Viewport constraints
    const minWidth = window.innerWidth * 0.6; // ✅ 70vw
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.9;

    let finalWidth = minWidth;
    let finalHeight = finalWidth / aspectRatio;

    // If height exceeds viewport, scale down by height
    if (finalHeight > maxHeight) {
      finalHeight = maxHeight;
      finalWidth = finalHeight * aspectRatio;
    }

    // If width exceeds max width, scale down
    if (finalWidth > maxWidth) {
      finalWidth = maxWidth;
      finalHeight = finalWidth / aspectRatio;
    }

    // 🔒 Enforce minimum width AGAIN (important)
    if (finalWidth < minWidth) {
      finalWidth = minWidth;
      finalHeight = finalWidth / aspectRatio;
    }

    container.style.setProperty("--img-width", finalWidth + "px");
    container.style.setProperty("--img-height", finalHeight + "px");
    container.classList.add("loaded");

    setTimeout(() => window.print(), 0);
  };

  bgImage.onerror = function () {
    setTimeout(() => window.print(), 500);
  };

  window.onafterprint = function () {
    window.close();
  };
</script>


    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
};