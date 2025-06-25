import { useState } from 'react'
import './App.css'
import { generateMnemonic } from 'bip39'
import { SolanaWallet } from './SolanaWallet'
import { EthWallet } from './EthWallet'

function App() {
  const [mnemonic, setMnemonic] = useState("")
  const [showMnemonic, setShowMnemonic] = useState(false)

  return (
    <div className="app-container">
      <h1>Multi-Chain Web3 Wallet </h1>
      <label>Seed Phrase</label>
      <button
        onClick={async function() {
          const mn = await generateMnemonic();
          setMnemonic(mn)
          setShowMnemonic(false)
        }}
      >
        Create Seed Phrase
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <input
          type={showMnemonic ? "text" : "password"}
          value={mnemonic}
          readOnly
          placeholder="Your seed phrase will appear here"
          style={{ flex: 1 }}
        />
        <button
          type="button"
          onClick={() => setShowMnemonic(s => !s)}
          disabled={!mnemonic}
          style={{ minWidth: 80 }}
        >
          {showMnemonic ? "Hide" : "Show"}
        </button>
      </div>
      <div className="wallets-row">
        <EthWallet mnemonic={mnemonic} />
        <SolanaWallet mnemonic={mnemonic} />
      </div>
    </div>
  )
}

export default App
