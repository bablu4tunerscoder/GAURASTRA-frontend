import colorNamer from "color-namer";

export const printSingleClickVariantQR = (
  variants = [],
  productName
) => {
  if (!variants.length) return;

  const printWindow = window.open("", "_blank", "width=800,height=600");

  let pagesHTML = "";

  // 🔹 6 labels per page
  for (let i = 0; i < variants.length; i += 12) {
    const pageVariants = variants.slice(i, i + 12);

    const labelsHTML = pageVariants
      .map((variant) => {
        const colorName =
          colorNamer(variant.color).basic[0]?.name || variant.color;

        const formattedColor =
          colorName.charAt(0).toUpperCase() + colorName.slice(1);

        const styleCode = variant.v_style_code || "KH-2174";

        return `
          <div class="container">
            <div class="content">

              <div class="product-name">
                <span class="label">Product:</span> ${productName || "Aarav Classic Kurta"
          }
              </div>

              <div class="info-line">
                <span class="label">Style:</span> ${styleCode}
              </div>

              <div class="info-line">
                <span class="label">Color:</span> ${formattedColor}
              </div>

              <div class="info-line">
                <span class="label">Fabric:</span> ${variant.fabric?.trim() || "100% Cotton"
          }
              </div>

              <div class="info-line">
                <span class="label">Size:</span> ${variant.size?.toUpperCase() || "N/A"
          }
              </div>

              <div class="price-section">
                <span class="label">MRP:</span>
                ${variant.discounted_price &&
            variant.discounted_price > 0 &&
            variant.actual_price !== variant.discounted_price
            ? `<span class="original-price">₹${variant.actual_price}</span>
                       ₹${variant.discounted_price}`
            : `₹${variant.actual_price}`
          }
                <span class="tax-text">(Incl. taxes)</span>
              </div>

              <div class="qr-section">
                <div class="qr-code">
                  <img src="${variant.qrcode_url}" alt="QR Code" />
                </div>
              </div>

            </div>
          </div>
        `;
      })
      .join("");

    pagesHTML += `
      <div class="page">
        ${labelsHTML}
      </div>
    `;
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Print Variant QR</title>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #fff;
}

/* 🔒 ORIGINAL SINGLE LABEL DESIGN — NO CHANGE */
.container {
  width: 2in;
  height: 2.5in;
  padding: 0.08in;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.content {
  color: #000;
  width: 100%;
}

.info-line {
  font-size: 14px;
  font-weight: 300;
  line-height: 1.2;
}

.label {
  font-weight: 600;
}

.product-name {
  font-size: 16px;
  text-transform: capitalize;
  font-weight: 400;
  margin-bottom: 2px;
}

.price-section {
  font-size: 16px;
  font-weight: 400;
  margin-top: 2px;
}

.original-price {
  text-decoration: line-through;
  opacity: 0.7;
  margin-right: 4px;
}

.tax-text {
  font-size: 10px;
}

.qr-section {
  display: flex;
  justify-content: center;
  margin-top: 4px;
}

.qr-code {
  width: 1.1in;
  height: 1.1in;
  padding: 1px;
  background: #fff;
}

.qr-code img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* ✅ ONLY PAGE LAYOUT CHANGE (2 × 3 = 6 labels) */
.page {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 2in);   
  grid-template-rows: repeat(4, 2.5in);   
  gap: 6mm;
  justify-content: center;
  align-content: center;
  page-break-after: always;
}

@media print {
  @page {
    size: A4;
    margin: 10mm;
  }

  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
</head>

<body>
${pagesHTML}

<script>
  window.onload = () => window.print();
  window.onafterprint = () => window.close();
</script>
</body>
</html>
`;

  printWindow.document.write(html);
  printWindow.document.close();
};
