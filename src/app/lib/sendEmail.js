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
           Items: ${orderDetails.items.items.map(item => item.title).join(', ')}\n\n
           We will notify you once your order is shipped.\n\n
           Thank you for shopping with us!`,
    html: `
      <p>Thank you for your order! We're excited to inform you that your order with ID #HC_${orderDetails.id} has been successfully placed.</p>
      <p><strong>Order Details:</strong></p>
      <ul>
        <li>Total: $${orderDetails.total}</li>
        <li>Items: ${orderDetails.items.items.map(item => item.title).join(', ')}</li>
      </ul>
      <p>We will notify you once your order is shipped.</p>
      <p>Thank you for shopping with us!</p>
    `,
  };

  try {
    // Send the email
    await transporter.sendMail(msg);
    console.log('Confirmation email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
export async function sendOrderEmailToAdmins(orderDetails) {
  const msg = {
    from: `HomeCene <${process.env.EMAIL_USERNAME}>`,  // Sender email (this should be your email)
    to: ['ahmedkhalil9497@gmail.com','khurramkhalil276@gmail.com','namrah.khalil1234@gmail.com'],         // Recipient email (customer's email)
    subject: `Alhamdulilah Order Received - Order #HC_${orderDetails.id}`,
    text: `Order with ID #HC_${orderDetails.id} has been successfully placed and payment received.\n\n
           Order Details:\n
           Total: $${orderDetails.total}\n
           Items: ${orderDetails.items.items.map(item => item.title).join(', ')}\n\n
           `,
    html: `
      <p>We got the Order</p>
    `,
  };

  try {
    // Send the email
    await transporter.sendMail(msg);
    console.log('Confirmation email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
