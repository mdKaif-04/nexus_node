import { cert, initializeApp } from "firebase-admin";
import serviceAccount from "../nexus-node_firebase.json" with {type:"json"};

export const app =initializeApp({
  credential: cert(serviceAccount)
});
