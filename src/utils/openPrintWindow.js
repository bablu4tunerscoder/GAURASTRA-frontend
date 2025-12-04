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
        margin: 0;
        padding: 0;
        background: url('${baseUrl}/assets/invoicebg.png') no-repeat center center/cover;
        font-family: Arial, sans-serif;
        color: white;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        color-adjust: exact;
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
      }

      .wrapper {
        padding: 24px;
        padding-bottom: 80px;
        max-width: 768px;
        margin: auto;
      }

      .flex { display: flex; }
      .justify-between { justify-content: space-between; }
      .justify-end { justify-content: flex-end; }
      .justify-center { justify-content: center; }
      .text-right { text-align: right; }
      .text-center { text-align: center; }
      .rounded { border-radius: 8px; }
      .rounded-full { border-radius: 9999px; }
      .rounded-sm { border-radius: 4px; }
      .overflow-hidden { overflow: hidden; }
      .gap-3 { gap: 12px; }
      .gap-4 { gap: 16px; }
      .space-y-1 > * + * { margin-top: 4px; }
      .space-y-2 > * + * { margin-top: 8px; }
      .space-y-3 > * + * { margin-top: 12px; }
      .mb-6 { margin-bottom: 24px; }
      .mb-8 { margin-bottom: 32px; }
      .mb-2 { margin-bottom: 8px; }
      .pb-10 { padding-bottom: 40px; }

      .logo-container {
        width: 96px;
        height: 96px;
        overflow: hidden;
        border-radius: 50%;
      }

      .logo-container img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }

      .invoice-title {
        font-size: 28px;
        font-weight: bold;
        color: #FACC15;
        margin: 0;
      }

      .text-sm {
        font-size: 14px;
      }

      .text-lg {
        font-size: 18px;
      }

      .text-gray-300 {
        color: #d1d5db;
      }

      .text-gray-400 {
        color: #9ca3af;
      }

      .grid-cols-2 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }

      .info-box {
        background: #505050;
        border-radius: 8px;
        padding: 16px;
      }

      .info-box h3 {
        font-size: 18px;
        font-weight: 600;
        color: #FACC15;
        margin: 0 0 4px 0;
      }

      .info-box p {
        margin: 4px 0;
      }

      .font-semibold {
        font-weight: 600;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        margin-bottom: 24px;
      }

      th {
        background: #FACC15 !important;
        color: black !important;
        padding: 12px;
        text-align: left;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      td {
        padding: 12px;
      }

      tbody tr:nth-child(odd) {
        background: #505050 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      tbody tr:nth-child(even) {
        background: transparent !important;
      }

      .total-box {
        background: #FACC15 !important;
        color: black !important;
        padding: 8px 24px;
        border-radius: 4px;
        font-size: 18px;
        font-weight: 600;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .terms {
        margin-top: 12px;
      }

      .terms h3 {
        font-size: 18px;
        margin-bottom: 8px;
        font-weight: 600;
      }

      .terms p {
        font-size: 14px;
        line-height: 1.6;
      }

      .footer {
        text-align: center;
        padding-bottom: 40px;
        position: relative;
      }

      .thank-img {
        position: absolute;
        bottom: -400px;
        z-index: -1;
        right: 32px;
        height: 128px;
      }

      @media print {
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

    <div class="wrapper">

      <!-- Header -->
      <div class="flex justify-between mb-6">
        
        <div class="logo-container">
          <img src="${baseUrl}/assets/logo.png" alt="Logo" />
        </div>

        <div class="text-right space-y-1">
          <h1 class="invoice-title">INVOICE</h1>

          <p class="text-sm">
            <span class="text-gray-300">Date :</span> 
            ${new Date(bill.createdAt).toLocaleDateString()}
          </p>

          <p class="text-sm">
            <span class="text-gray-300">Invoice no :</span> 
            ${bill.billing_id}
          </p>
        </div>

      </div>

      <!-- Bill To & Payable To -->
      <div class="grid-cols-2 gap-4 mb-6">

        <!-- Bill To -->
        <div class="info-box space-y-1">
          <h3>Bill to:</h3>

          <p class="font-semibold">${bill.user_info.full_name}</p>
          <p class="text-sm">${bill.user_info.phone}</p>
          <p class="text-sm">${bill.address.address_line1}</p>
          <p class="text-sm">${bill.address.city}</p>
          <p class="text-sm">${bill.address.state}</p>
        </div>

        <!-- Payable To -->
        <div class="info-box space-y-1">
          <h3>Payable to:</h3>

          <p class="font-semibold">Gaurastra</p>
          <p class="text-sm">+91 9522474600</p>
          <p class="text-sm">Indore, MP</p>
        </div>

      </div>

      <!-- Product Table -->
      <table>
        <thead>
          <tr>
            <th style="width:50px;">No</th>
            <th>Items</th>
            <th style="width:80px; text-align:center;">QTY</th>
            <th style="width:120px; text-align:right;">Price</th>
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

      <!-- Total -->
      <div class="flex justify-end mb-8">
        <div class="space-y-3">
          <div class="total-box">
            Total : ₹${bill.total_amount}
          </div>

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

      <!-- Footer -->
      <div class="footer">
        <div class="flex justify-center gap-3 text-sm text-gray-300">
          <span>📞 +91-9522474600</span>
          <span>🌐 www.Gaurastra.com</span>
        </div>

        <p class="text-sm text-gray-400">📍 1701, New Dwarkapuri Indore</p>

        <img src="${baseUrl}/assets/thank-you.png" class="thank-img" alt="Thank You" />
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