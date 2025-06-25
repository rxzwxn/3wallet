# 3Wallet

A minimal multi-chain web3 wallet demo built with React, supporting both Ethereum and Solana wallets.  
Generate a seed phrase, create wallets, and view/send/receive addresses—all in a clean, modern UI.

## Features

- Generate and hide/show a BIP39 seed phrase
- Create multiple Ethereum and Solana wallets from the same seed
- View wallet addresses
- Demo "Send" and "Receive" actions for each wallet

## Getting Started

1. **Install dependencies:**
   ```
   npm install
   ```

2. **Run the app:**
   ```
   npm run dev
   ```

3. **Open in your browser:**  
   Visit [http://localhost:port](http://localhost:port) to see the app in action.

## Tech Stack

- React
- Vite
- bip39, ethers, @solana/web3.js

## Notes

- This is a demo. The "Send" feature only shows a prompt/alert and does not broadcast real transactions.
- For educational and testing purposes only.

---
## License
MIT