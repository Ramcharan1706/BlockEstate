import { getAccessToken } from "./auth.js";
import { fetchUserDocuments } from "./api.js";
import { createAsset, optInAsset, transferAsset } from "./algorand.js";
import dotenv from "dotenv";
import algosdk from "algosdk";
dotenv.config();

const buyerAddr = process.env.BUYER_ADDRESS!;
const buyerKey = algosdk.mnemonicToSecretKey(process.env.BUYER_PRIVATE_KEY!).sk;

const sellerAddr = process.env.SELLER_ADDRESS!;
const sellerKey = algosdk.mnemonicToSecretKey(process.env.SELLER_PRIVATE_KEY!).sk;

async function main() {
  const token = await getAccessToken();
  if (!token) return;

  const documents = await fetchUserDocuments(token);
  if (!documents) return;

  for (const doc of documents) {
    const assetId = await createAsset(doc.hash, buyerAddr, buyerKey);
    if (!assetId) continue;

    await optInAsset(assetId, buyerAddr, buyerKey);

    const success = await transferAsset(assetId, sellerAddr, buyerAddr, sellerKey);
    console.log(success ? `✅ Transferred asset ${assetId}` : `❌ Failed to transfer asset`);
  }
}

main();
