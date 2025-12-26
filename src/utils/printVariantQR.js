export const printVariantQR = (variant) => {
    console.log(variant)
    const printWindow = window.open("", "_blank", "width=400,height=500");

    const price = variant.discounted_price
        ? `₹${variant.discounted_price} (Discounted)`
        : `₹${variant.actual_price}`;

    const html = `
        <html>
        <head>
            <title>Print QR</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 20px;
                }
                .qr-box {
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    display: inline-block;
                }
                img {
                    width: 200px;
                    height: auto;
                }
                h3 {
                    margin-top: 12px;
                    font-size: 16px;
                }
                .price {
                    margin-top: 10px;
                    font-size: 18px;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="qr-box">
                <img src="${variant.qrcode_url}" alt="QR Code" />

                <h3>Color: ${variant.color}</h3>
                <h3>Size: ${variant.size}</h3>

                <div class="price">${price}</div>
            </div>

            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(() => window.close(), 500);
                }
            <\/script>
        </body>
        </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
};
