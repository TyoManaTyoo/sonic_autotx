const {
  Connection,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  Keypair,
} = require('@solana/web3.js');
const fs = require('fs');
const colors = require('colors');
const base58 = require('bs58');

// url testnet
const DEVNET_URL = 'https://devnet.sonic.game/';
const connection = new Connection(DEVNET_URL, 'confirmed');

// Fungsi untuk mengirim SOL
async function sendSol(fromKeypair, toPublicKey, amount) {
  try {
    // Mendapatkan blockhash terbaru
    const { blockhash } = await connection.getLatestBlockhash();

    // Membuat transaksi
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toPublicKey,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    // Mengatur blockhash terbaru untuk transaksi
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromKeypair.publicKey; // Mengatur fee payer

    // Mengirim transaksi dan menunggu konfirmasi
    const signature = await sendAndConfirmTransaction(connection, transaction, [fromKeypair]);
    console.log(colors.green('Transaksi di Konfirmasi:'), signature);
  } catch (error) {
    console.error(colors.red('Error saat mengirim SOL:'), error);
    
    // mencoba kirim ulang transaksi jika expired
    if (error.message.includes('block height exceeded')) {
      console.log(colors.yellow('Mencoba untuk mengulangi transaksi...'));
      return sendSol(fromKeypair, toPublicKey, amount); // Mengulangi pengiriman
    }
  }
}

// Fungsi untuk menghasilkan alamat random
function generateRandomAddresses(count) {
  return Array.from({ length: count }, () =>
    Keypair.generate().publicKey.toString()
  );
}

// Fungsi untuk mendapatkan Keypair dari private key
function getKeypairFromPrivateKey(privateKeyBase58) {
  const privateKeyBytes = base58.decode(privateKeyBase58);
  const keypair = Keypair.fromSecretKey(privateKeyBytes);
  return keypair;
}

// Fungsi untuk menampilkan header
function displayHeader() {
  console.log(colors.magenta('--- Solana Transaction Script ---'));
}

// IIFE untuk menjalankan script
(async () => {
  displayHeader();

  const method = '1'; // Menggunakan metode private key
  let seedPhrasesOrKeys;

  // Membaca file privateKeys.json untuk mendapatkan private keys
  if (method === '1') {
    seedPhrasesOrKeys = JSON.parse(fs.readFileSync('privateKeys.json', 'utf-8'));
    if (!Array.isArray(seedPhrasesOrKeys) || seedPhrasesOrKeys.length === 0) {
      throw new Error(colors.red('privateKeys.json is not set correctly or is empty'));
    }
  } else {
    throw new Error(colors.red('Invalid input method selected'));
  }

  const addressCount = 130; // Jumlah alamat yang ingin dibuat

  // Validasi jumlah alamat
  if (isNaN(addressCount) || addressCount <= 0) {
    throw new Error(colors.red('Invalid number of addresses specified'));
  }

  // Membuat alamat random
  const randomAddresses = generateRandomAddresses(addressCount);

  console.log(colors.blue(`Generated ${addressCount} random addresses:`), randomAddresses);

  const amountToSend = 0.001; // Jumlah SOL yang akan dikirimkan

  // Melakukan iterasi terhadap private keys
  for (const [index, seedOrKey] of seedPhrasesOrKeys.entries()) {
    let fromKeypair = getKeypairFromPrivateKey(seedOrKey);

    console.log(colors.yellow(`Kirim SOL Ke Wallet ${index + 1}: ${fromKeypair.publicKey.toString()}`));

    // Melakukan iterasi terhadap alamat random
    for (const address of randomAddresses) {
      const toPublicKey = new PublicKey(address);
      try {
        // Mengirim SOL ke alamat tujuan
        await sendSol(fromKeypair, toPublicKey, amountToSend);
        console.log(colors.green(`Sukses ${amountToSend} SOL to ${address}`));
      } catch (error) {
        console.error(colors.red(`Failed to send SOL to ${address}:`), error);
      }
    }
  }
})();
