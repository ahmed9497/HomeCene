
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import nodemailer from "nodemailer";

import * as admin from "firebase-admin";
import { error } from "console";


// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(
            JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)
        ),
    });
}

const db = admin.firestore();

export async function POST(req, res) {

    const { email } = await req.json();

    if (!email) {
        return new Response(JSON.stringify({ error: "Email is required" }), { status: 500 });
    }

    try {

        const user = await admin.auth().getUserByEmail(email);
        console.log(user,"----")
        const userDoc = await db.collection("users").doc(user.uid).get();

        if (!userDoc.exists) {
            return new Response(JSON.stringify({ error: "Email not exist. Create your order first" }), { status: 500 });
        }


            const code = Math.floor(100000 + Math.random() * 900000); 
        console.log(code ,"******code ********")
            // Store the code in Firestore
            await db.collection("loginCodes").doc(email).set({
                code,
                expiresAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            // Send the code via email
            // const transporter = nodemailer.createTransport({
            //     host: "smtp.hostinger.com",
            //     port: 465,
            //     secure: true,
            //     auth: {
            //         user: process.env.EMAIL_USERNAME,
            //         pass: process.env.EMAIL_PASSWORD,
            //     },
            // });

            // await transporter.sendMail({
            //     from: `HomeCene <${process.env.EMAIL_USERNAME}>`,
            //     to: email,
            //     subject: "Your HomeCene Login Code",
            //     text: `Your login code is: ${code}`,
            // });
            return new Response(JSON.stringify({ message: "Code sent over email" }), { status: 200 });
        
        
    } catch (error) {
        // console.error(error?.errorInfo,"****");
        if(error?.errorInfo.code ==='auth/user-not-found'){
            return new Response(JSON.stringify({ error: "Email not exist. Create your order first" }), { status: 500 });
        }
        else{
            return new Response(JSON.stringify({ error: "Failed to send code" }), { status: 500 });
        }
    }

}
