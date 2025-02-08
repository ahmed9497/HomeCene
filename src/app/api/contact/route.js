
import nodemailer from "nodemailer";

export async function POST(req, res) {

    const { name, message, email } = await req.json();

    if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: "All fields are required" }), { status: 500 });
    }

    try {

        // Send the contact info via email
        const transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: "info@homecene.com",
            to: "info@homecene.com",
            replyTo: email,
            subject: "New Contact Form Submission",
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <h2>Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
        });
        return new Response(JSON.stringify({ message: "Email sent successfully!" }), { status: 200 });


    } catch (error) {
        console.log(error, "****");
        return new Response(JSON.stringify({ error: "Failed to sent email!" }), { status: 500 });
    }

}
