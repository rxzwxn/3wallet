import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet, ethers } from "ethers";

export const EthWallet = ({ mnemonic }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [showReceive, setShowReceive] = useState(null);

    async function handleSend(address, privateKey) {
        const to = prompt("Enter recipient address:");
        const amount = prompt("Enter amount in ETH:");
        if (!to || !amount) return;
        alert(`(Demo) Would send ${amount} ETH from ${address} to ${to}.\n\nImplement actual sending logic here.`);
        // In production, use ethers.js to send transaction with privateKey
    }

    return (
        <section className="wallet-section">
            <h2>Ethereum Wallets</h2>
            <button
                onClick={async function() {
                    const seed = await mnemonicToSeed(mnemonic);
                    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
                    const hdNode = HDNodeWallet.fromSeed(seed);
                    const child = hdNode.derivePath(derivationPath);
                    const privateKey = child.privateKey;
                    const wallet = new Wallet(privateKey);
                    setCurrentIndex(currentIndex + 1);
                    setAddresses([...addresses, { address: wallet.address, privateKey }]);
                }}
                disabled={!mnemonic}
            >
                Add ETH wallet
            </button>
            {addresses.length === 0 && <div className="wallet-address" style={{color: "#aaa"}}>No ETH wallets yet.</div>}
            {addresses.map((w, index) => (
                <div className="wallet-address" key={index}>
                    {w.address}
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
                            onClick={() => handleSend(w.address, w.privateKey)}
                        >
                            Send
                        </button>
                        <button
                            style={{ flex: 1, fontSize: "0.92rem", padding: "4px 0", minWidth: 0 }}
                            onClick={() => setShowReceive(showReceive === index ? null : index)}
                        >
                            Receive
                        </button>
                    </div>
                    {showReceive === index && (
                        <div style={{marginTop: 6, fontSize: 13, color: "#222"}}>
                            <b>Receive Address:</b><br />
                            <span style={{fontFamily: "monospace"}}>{w.address}</span>
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
};