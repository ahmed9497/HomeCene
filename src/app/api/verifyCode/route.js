
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { signInWithCustomToken } from "firebase/auth";

import * as admin from "firebase-admin";


// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)
    ),
  });
}

const db = admin.firestore();


// console.log("Admin Auth Initialized:", admin.auth());
export async function POST(req,res) {

    const { email, code } =await req.json();

    if (!email || !code) {

      return new Response(JSON.stringify({ error: "Email and code are required" }), { status: 500 });
    }

    try {
      const docRef = db.collection("loginCodes").doc(email);
      const docSnap = await docRef.get();
     
      if (!docSnap.exists) {

        return new Response(JSON.stringify({ error: "Invalid email or code" }), { status: 404 });
      }

      const data = docSnap.data();
      const isCodeValid = data.code === parseInt(code);

      if (!isCodeValid) {

        return new Response(JSON.stringify({ error: "Invalid code" }), { status: 400 });

      }

      
      const currentTime = new Date().getTime();
      const expiresAt = data.expiresAt.toMillis();
      if (currentTime > expiresAt + 5 * 60 * 1000) {
        return new Response(JSON.stringify({ error: "Code has expired" }), { status: 400 });
      }


      const user = await admin.auth().getUserByEmail(email);
       
      const customToken = await admin.auth().createCustomToken(user.uid);

      // Delete the code after successful login
      const delDoc = db.collection("loginCodes").doc(email);
      console.log(delDoc,"-----dele");
      await delDoc.delete()
      //  deleteDoc(delDoc.);
      // await deleteDoc(doc(db, "loginCodes", email));


      return new Response(JSON.stringify({ token: customToken }), { status: 200 });

    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: "Verification failed" }), { status: 500 });
    }
  
}
