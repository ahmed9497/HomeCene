// utils/sendEmail.js

import nodemailer from 'nodemailer';

// Create a reusable transporter object using your SMTP configuration
const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function sendConfirmationEmail(orderDetails) {
  const msg = {
    from: `HomeCene <${process.env.EMAIL_USERNAME}>`,  // Sender email (this should be your email)
    to: orderDetails.email,         // Recipient email (customer's email)
    subject: `Order Confirmation - Order #HC_${orderDetails.id}`,
    text: `Thank you for your order! We're excited to inform you that your order with ID #HC_${orderDetails.id} has been successfully placed.\n\n
           Order Details:\n
           Total: $${orderDetails.total}\n
           Items: ${orderDetails.orderDetails.map(item => item.title).join(', ')}\n\n
           We will notify you once your order is shipped.\n\n
           Thank you for shopping with us!`,
    html: `
     <html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f7fc;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }
    .header {
      background-color: #0a5d5d;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
      color: #333333;
    }
    .content p {
      line-height: 1.6;
      font-size: 16px;
    }
    .order-details {
      margin-top: 20px;
      border-top: 1px solid #eeeeee;
      padding-top: 15px;
    }
    .order-details ul {
      list-style-type: none;
      padding: 0;
    }
    .order-details li {
      padding: 8px 0;
      border-bottom: 1px solid #eeeeee;
      display: flex;
      align-items: center;
    }
    .order-details li:last-child {
      border-bottom: none;
    }
    .order-details img {
      width: 50px;
      height: 50px;
      margin-right: 15px;
      border-radius: 5px;
    }
    .total {
      font-weight: bold;
      color: #2ecc71;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 14px;
      color: #777777;
    }
    a {
      color: #3498db;
      text-decoration: none;
    }
    @media (max-width: 600px) {
      .container {
        width: 100% !important;
        padding: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Order Confirmation - Order #HC_${orderDetails.id}
    </div>

    <div class="content">
      <p>Dear ${orderDetails.name},</p>
      <p>Thank you for your order! We're excited to inform you that your order with ID <strong>#HC_${orderDetails.id}</strong> has been successfully placed.</p>

      <div class="order-details">
        <h3>Order Details:</h3>
        <ul>
          <li><strong>Total:</strong> ${orderDetails.total} Aed </li>
          <li><strong>Shipping:</strong> ${orderDetails?.shippingFee||"0"} Aed </li>
          <li><strong>Items:</strong></li>
          ${orderDetails.orderDetails.map(item => `
            <li>
              <img src="${item.images}" alt="${item.title}" />
              <div>
                <strong>${item.title}</strong><br/>
                <small>Color: ${item.color}</small><br/>
                <small>Size: ${item.size}</small><br/>
                <small>Quantity: ${item.quantity}</small><br/>
                <small>Price: $${(item.unit_amount / 100).toFixed(2)} Aed </small>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>

      <p>We will notify you once your order is shipped. If you have any questions, feel free to reach out to our support team.</p>
      <p>Thank you for shopping with us!</p>
    </div>

    <div class="footer">
      <p>If you did not make this order, please <a href="mailto:support@homecene.com">contact support</a>.</p>
    </div>
  </div>
</body>
</html>
    `,
  };

  try {
    // Send the email
    await transporter.sendMail(msg);
    console.log('Confirmation email sent successfully.');
  } catch (error) {
    console.log('Error sending email:', error);
  }
}
export async function sendOrderEmailToAdmins(orderDetails) {
  const msg = {
    from: `HomeCene <${process.env.EMAIL_USERNAME}>`,  // Sender email (this should be your email)
    to: ['ahmedkhalil9497@gmail.com'], //'khurramkhalil276@gmail.com','namrah.khalil1234@gmail.com'         // Recipient email (customer's email)
    subject: `Alhamdulilah Order Received - Order #HC_${orderDetails.id}`,
    text: `Order with ID #HC_${orderDetails.id} has been successfully placed and payment received.\n\n
           Order Details:\n
           Total: $${orderDetails.total}\n
           Items: ${orderDetails.orderDetails.map(item => item.title).join(', ')}\n\n
           `,
           html: `
           <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f7fc;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          .header {
            background-color: #0a5d5d;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            border-radius: 8px 8px 0 0;
          }
          .content {
            padding: 20px;
            color: #333333;
          }
          .content p {
            line-height: 1.6;
            font-size: 16px;
          }
          .order-details {
            margin-top: 20px;
            border-top: 1px solid #eeeeee;
            padding-top: 15px;
          }
          .order-details ul {
            list-style-type: none;
            padding: 0;
          }
          .order-details li {
            padding: 8px 0;
            border-bottom: 1px solid #eeeeee;
            display: flex;
            align-items: center;
          }
          .order-details li:last-child {
            border-bottom: none;
          }
          .order-details img {
            width: 50px;
            height: 50px;
            margin-right: 15px;
            border-radius: 5px;
          }
          .total {
            font-weight: bold;
            color: #2ecc71;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #777777;
          }
          a {
            color: #3498db;
            text-decoration: none;
          }
          @media (max-width: 600px) {
            .container {
              width: 100% !important;
              padding: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
           Alhamdulilah Order Received - Order #HC_${orderDetails.id}
          </div>
      
          <div class="content">
            <p>Dear Admins</p>
            <p>We have received order with ID <strong>#HC_${orderDetails.id}</strong> </p>
             <p>From:<strong>${orderDetails.name}</strong> </p>
            <div class="order-details">
              <h3>Order Details:</h3>
              <ul>
                <li><strong>Total:</strong> ${orderDetails.total} Aed </li>
                 <li><strong>Shipping:</strong> ${orderDetails?.shippingFee||"0"} Aed </li>
                <li><strong>Items:</strong></li>
                ${orderDetails.orderDetails.map(item => `
                  <li>
                    <img src="${item.images}" alt="${item.title}" />
                    <div>
                      <strong>${item.title}</strong><br/>
                      <small>Color: ${item.color}</small><br/>
                      <small>Size: ${item.size}</small><br/>
                      <small>Quantity: ${item.quantity}</small><br/>
                      <small>Price: $${(item.unit_amount / 100).toFixed(2)} Aed </small>
                    </div>
                  </li>
                `).join('')}
              </ul>
            </div>
      
            <p>We will notify you once your order is shipped. If you have any questions, feel free to reach out to our support team.</p>
            <p>Thank you for shopping with us!</p>
          </div>
      
          <div class="footer">
            <p>If you did not make this order, please <a href="mailto:support@homecene.com">contact support</a>.</p>
          </div>
        </div>
      </body>
      </html>
          `,
  };

  try {
    // Send the email
    await transporter.sendMail(msg);
    console.log('Confirmation email sent successfully.');
  } catch (error) {
    console.log('Error sending email:', error);
  }
}
