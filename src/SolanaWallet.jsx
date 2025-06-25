import { useState } from "react"
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);
    const [keypairs, setKeypairs] = useState([]);
    const [showReceive, setShowReceive] = useState(null);

    async function handleSend(keypair, pubkey, idx) {
        const to = prompt("Enter recipient SOL address:");
        const amount = prompt("Enter amount in SOL:");
        if (!to || !amount) return;
        alert(`(Demo) Would send ${amount} SOL from ${pubkey.toBase58()} to ${to}.\n\nImplement actual sending logic here.`);
    }

    return (
        <section className="wallet-section">
            <h2>Solana Wallets</h2>
            <button
                onClick={async function() {
                    const seed = await mnemonicToSeed(mnemonic);
                    const path = `m/44'/501'/${currentIndex}'/0'`;
                    const derivedSeed = derivePath(path, seed.toString("hex")).key;
                    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
                    const keypair = Keypair.fromSecretKey(secret);
                    setCurrentIndex(currentIndex + 1);
                    setPublicKeys([...publicKeys, keypair.publicKey]);
                    setKeypairs([...keypairs, keypair]);
                }}
                disabled={!mnemonic}
            >
                Add Solana wallet
            </button>
            {publicKeys.length === 0 && <div className="wallet-address" style={{color: "#aaa"}}>No Solana wallets yet.</div>}
            {publicKeys.map((p, i) => (
                <div className="wallet-address" key={i} style={{minWidth: 0, wordBreak: "break-all"}}>
                    {p.toBase58()}
                    <div
                        style={{
                            marginTop: 4,
                            display: "flex",
                            gap: 8,
                            flexWrap: "nowrap",
                            justifyContent: "space-between"
                        }}
                    >
                        <button
                            style={{ flex: 1, fontSize: "0.92rem", padding: "4px 0", minWidth: 0 }}
                            onClick={() => handleSend(keypairs[i], p, i)}
                        >
                            Send
                        </button>
                        <button
                            style={{ flex: 1, fontSize: "0.92rem", padding: "4px 0", minWidth: 0 }}
                            onClick={() => setShowReceive(showReceive === i ? null : i)}
                        >
                            Receive
                        </button>
                    </div>
                    {showReceive === i && (
                        <div style={{marginTop: 6, fontSize: 13, color: "#222"}}>
                            <b>Receive Address:</b><br />
                            <span style={{fontFamily: "monospace"}}>{p.toBase58()}</span>
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
}