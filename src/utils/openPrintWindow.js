export const openPrintWindow = (bill) => {
  const printWindow = window.open("", "_blank", "width=1000,height=900");

  const html = `
    <html>
    <head>
      <title>Print Bill</title>
      <style>
        body {
          width: 58mm;
          font-family: "Courier New", monospace;
          font-size: 12px;
          padding: 5px;
        }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .item-row {
          display: flex;
          justify-content: space-between;
          margin: 2px 0;
        }
        hr {
          border-top: 1px dashed #000;
          margin: 5px 0;
        }
      </style>
    </head>

    <body>
      <div class="center bold">My Offline Store</div>
      <div class="center">GSTIN: 09XXXXXXX</div>
      <hr />

      <p><b>Bill ID:</b> ${bill.billing_id}</p>
      <p><b>Date:</b> ${new Date(bill.createdAt).toLocaleString()}</p>
      <hr />

      <div class="bold">Items</div>
      
      ${bill.items
        .map(
          (it) => `
            <div class="item-row">
              <span>${it.title} (x${it.quantity})</span>
              <span>₹${it.line_total}</span>
            </div>
          `
        )
        .join("")}

      <hr />

      <div class="item-row bold">
        <span>Subtotal:</span>
        <span>₹${bill.subtotal}</span>
      </div>

      <div class="item-row">
        <span>Tax:</span>
        <span>₹${bill.tax}</span>
      </div>

      <div class="item-row bold">
        <span>Total Amount:</span>
        <span>₹${bill.total_amount}</span>
      </div>

      <hr />
      <div class="center">Thank you for shopping!</div>
      <div class="center">Visit Again 💛</div>

      <script>
        window.onload = () => {
          window.print();
          window.close();
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
};
