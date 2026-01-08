export const openPrintWindow = (bill) => {
  const printWindow = window.open("", "_blank", "width=1200,height=900");
  const baseUrl = window.location.origin;

  // console.log(baseUrl)

  const html = `
  <html>
  <head>
    <title>Invoice</title>

    <style>
    @font-face {
  font-family: "Momo Signature";
  src: url("/fonts/cursive-font.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        background: white;
        font-family: Arial, sans-serif;
        color: #1f2937;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      @page {
        margin: 0;
        size: A4;
      }

      .container {
        width: 100%;
        max-width: 900px;
        min-height: 100vh;
        margin: auto;
        padding: 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
      }

      /* TOP SECTION */
      .top-section {
        width: 100%;
      }

      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;
        align-items: center;
      }

      .logo-wrapper {
        height: 64px;
        }

      .logo-wrapper img {
        width: auto;
        height: 100%;
        object-fit: cover;
        filter: grayscale(100%);
      }

      .invoice-title {
        font-size: 32px;
        color: #374151;
        font-weight: bold;
      }

      .text-sm { font-size: 14px; }
      .text-right { text-align: right; }
      .text-gray-500 { color: #6b7280; }
      .text-gray-600 { color: #4b5563; }

      /* GRID BOXES */
      .grid-2 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-bottom: 24px;
      }

      .info-box {
        background: #f3f4f6;
        padding: 16px;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
      }

      .info-title {
        font-size: 18px;
        color: #1f2937;
        font-weight: bold;
        margin-bottom: 6px;
      }

      .font-semibold { font-weight: 600; }

      /* TABLE */
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        border: 1px solid #e5e7eb;
      }

      th {
        background: #e5e7eb !important;
        color: #1f2937 !important;
        padding: 12px;
        text-align: left;
        font-weight: bold;
      }

      td {
        padding: 12px;
        border-bottom: 1px solid #f3f4f6;
      }

      tbody tr:nth-child(odd) {
        background: #f9fafb !important;
      }

      tbody tr:nth-child(even) {
        background: white !important;
      }

      /* TOTAL */
      .total-wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-top: 24px;
      }

      .total-box {
        background: #1f2937;
        color: white;
        padding: 10px 24px;
        border-radius: 4px;
        font-size: 18px;
        font-weight: bold;
        width: fit-content;
      }

      .terms {
        margin-top: 16px;
      }

      .terms h3 {
        font-size: 18px;
        margin-bottom: 8px;
        font-weight: bold;
        color: #1f2937;
      }

      .terms p {
        font-size: 14px;
        line-height: 1.5;
        color: #4b5563;
      }

      /* FOOTER */
      .footer {
        text-align: center;
        padding-bottom: 120px;
        position: relative;
        color: #6b7280;
      }

      .thank-text {
          position: absolute;
          bottom: 50px;
          font-size: 4em;
          right: 20px;
          z-index: -1;
          font-family: "Momo Signature", cursive;
          rotate: -30deg;
          opacity: 0.6;
        }


      /* Force print backgrounds */
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        @page {
          margin: 0;
          size: A4;
        }

        body {
          margin: 0;
          padding: 0;
        }
      }
    </style>
  </head>

  <body>
    <div class="container">

      <!-- TOP AREA -->
      <div class="top-section">

        <div class="header">
          <div class="logo-wrapper">
            <img src="${baseUrl}/assets/logo-black-text.svg" alt="Logo" />
          </div>

          <div class="text-right">
            <h1 class="invoice-title">INVOICE</h1>
            <p class="text-sm"><span class="text-gray-600">Date :</span> ${new Date(bill.createdAt).toLocaleDateString()}</p>
            <p class="text-sm"><span class="text-gray-600">Invoice no :</span> ${bill.billing_id}</p>
          </div>
        </div>

        <!-- GRID SECTION -->
        <div class="grid-2">

          <div class="info-box">
            <h3 class="info-title">Bill to:</h3>
            <p class="font-semibold">${bill.user_info.full_name}</p>
            <p class="text-sm">${bill.user_info.phone}</p>
            <p class="text-sm">
              ${[
      bill.address.address_line1,
      bill.address.city,
      bill.address.state
    ]
      .filter(Boolean)
      .join(", ")
    }
            </p>
            <p class="text-sm"><span class="text-gray-600">Payment :</span> ${bill.payment_method}</p>

          </div>

          <div class="info-box">
            <h3 class="info-title">Payable to:</h3>
            <p class="font-semibold">Gaurastra</p>
            <p class="text-sm">+91 9522474600</p>
            <p class="text-sm">Indore, MP</p>
          </div>

        </div>

        <!-- PRODUCT TABLE -->
        <table>
          <thead>
            <tr>
              <th style="width:50px;">No</th>
              <th>Items</th>
              <th style="width:80px; text-align:center">QTY</th>
              <th style="width:120px; text-align:right">Price</th>
            </tr>
          </thead>

          <tbody>
            ${bill.items
      .map(
        (item, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td>${item.title}</td>
                  <td style="text-align:center;">${item.quantity}</td>
                  <td style="text-align:right;">₹${item.line_total}</td>
                </tr>`
      )
      .join("")}
          </tbody>
        </table>

        <!-- TOTAL -->
        <div class="total-wrapper">
          <div>
            <div class="total-box">Total : ₹${bill.total_amount}</div>

            <div class="terms">
              <h3>Terms Conditions</h3>
              <p>
                No Return, <br />
                No Exchange, <br />
                No Guarantee.
              </p>
            </div>
          </div>
        </div>

      </div>

      <!-- FOOTER -->
      <div class="footer">
        <div class="text-sm">
          📞 +91-9522474600 &nbsp;&nbsp; | &nbsp;&nbsp; 🌐 www.gaurastra.com
        </div>
        <p class="text-sm text-gray-500">📍 726, Usha Nagar Ganesh Dwar Near La Cup Bashi, Indore</p>
        
        <p class="thank-text">Thank you</p>
      </div>

    </div>

    

    <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 500);
        };
        
        window.onafterprint = function() {
          window.close();
        };
      </script>

  </body>
  </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
};
// previous script
{/* <script>
      window.onload = () => {
        // Wait for images to load before printing
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        
        if (images.length === 0) {
          setTimeout(() => {
            window.print();
            window.close();
          }, 500);
          return;
        }

        images.forEach(img => {
          if (img.complete) {
            loadedImages++;
          } else {
            img.onload = () => {
              loadedImages++;
              if (loadedImages === images.length) {
                setTimeout(() => {
                  window.print();
                  window.close();
                }, 500);
              }
            };
            img.onerror = () => {
              loadedImages++;
              if (loadedImages === images.length) {
                setTimeout(() => {
                  window.print();
                  window.close();
                }, 500);
              }
            };
          }
        });

        if (loadedImages === images.length) {
          setTimeout(() => {
            window.print();
            window.close();
          }, 500);
        }
      };
    </script> */}