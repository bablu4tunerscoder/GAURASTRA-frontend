export const openPrintWindow = (bill) => {
  const printWindow = window.open("", "_blank", "width=1200,height=900");
  const baseUrl = window.location.origin;

  const html = `
  <html>
  <head>
    <title>Invoice</title>

    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        background: url('${baseUrl}/assets/invoicebg.png') center/cover no-repeat;
        font-family: Arial, sans-serif;
        color: white;
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
        width: 96px;
        height: 96px;
        border-radius: 50%;
        overflow: hidden;
      }

      .logo-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .invoice-title {
        font-size: 32px;
        color: #FACC15;
        font-weight: bold;
      }

      .text-sm { font-size: 14px; }
      .text-right { text-align: right; }
      .text-gray-300 { color: #d1d5db; }
      .text-gray-400 { color: #9ca3af; }

      /* GRID BOXES */
      .grid-2 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-bottom: 24px;
      }

      .info-box {
        background: #505050;
        padding: 16px;
        border-radius: 8px;
      }

      .info-title {
        font-size: 18px;
        color: #FACC15;
        font-weight: bold;
        margin-bottom: 6px;
      }

      .font-semibold { font-weight: 600; }

      /* TABLE */
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
      }

      th {
        background: #FACC15 !important;
        color: black !important;
        padding: 12px;
        text-align: left;
      }

      td {
        padding: 12px;
      }

      tbody tr:nth-child(odd) {
        background: #505050 !important;
      }

      tbody tr:nth-child(even) {
        background: transparent !important;
      }

      /* TOTAL */
      .total-wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-top: 24px;
      }

      .total-box {
        background: #FACC15;
        color: black;
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
      }

      .terms p {
        font-size: 14px;
        line-height: 1.5;
      }

      /* FOOTER */
      .footer {
        text-align: center;
        padding-bottom: 120px;
        position: relative;
      }

      .thank-img {
        position: absolute;
        bottom: 20px;
        right: 20px;
        height: 130px;
        z-index: -1;
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
            <img src="${baseUrl}/assets/logo.png" alt="Logo" />
          </div>

          <div class="text-right">
            <h1 class="invoice-title">INVOICE</h1>
            <p class="text-sm"><span class="text-gray-300">Date :</span> ${new Date(bill.createdAt).toLocaleDateString()}</p>
            <p class="text-sm"><span class="text-gray-300">Invoice no :</span> ${bill.billing_id}</p>
          </div>
        </div>

        <!-- GRID SECTION -->
        <div class="grid-2">

          <div class="info-box">
            <h3 class="info-title">Bill to:</h3>
            <p class="font-semibold">${bill.user_info.full_name}</p>
            <p class="text-sm">${bill.user_info.phone}</p>
            <p class="text-sm">${bill.address.address_line1}</p>
            <p class="text-sm">${bill.address.city}</p>
            <p class="text-sm">${bill.address.state}</p>
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
          📞 +91-9522474600 &nbsp;&nbsp; | &nbsp;&nbsp; 🌐 www.Gaurastra.com
        </div>
        <p class="text-sm text-gray-400">📍 1701, New Dwarkapuri Indore</p>

        <img src="${baseUrl}/assets/thank-you.png" class="thank-img" />
      </div>

    </div>

    <script>
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
    </script>

  </body>
  </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
};
