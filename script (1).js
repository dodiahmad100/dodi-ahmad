const connectBtn = document.getElementById('connectBtn');
const statusEl = document.getElementById('status');
const addressEl = document.getElementById('address');
const networkEl = document.getElementById('network');
const balanceEl = document.getElementById('balance');

const AVALANCHE_FUJI_CHAIN_ID = "0xa869";

function formatAvaxBalance(balanceWei) {
    const balance = BigInt(balanceWei);
    return (Number(balance) / 1e18).toFixed(4);
}

async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        alert("Core Wallet Tidak Terdeteksi. Silahkan Install Core Wallet.");
        return;
    }

    try {
        statusEl.textContent = 'Menghubungkan...';

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        addressEl.textContent = account;

        const chainId = await window.ethereum.request({ method: 'eth_chainId' });

        if (chainId === AVALANCHE_FUJI_CHAIN_ID) {
            networkEl.textContent = 'Avalanche Fuji Testnet';
            statusEl.textContent = '✅ Avalanche Fuji';
            statusEl.style.color = '#4cd132';

            const balanceWei = await window.ethereum.request({
                method: 'eth_getBalance',
                params: [account, 'latest'],
            });

            balanceEl.textContent = formatAvaxBalance(balanceWei);
        } else {
            networkEl.textContent = 'Wrong Network';
            statusEl.textContent = '❌ Wrong Network';
            statusEl.style.color = '#fbc531';
            balanceEl.textContent = '-';
        }
    } catch (error) {
        console.error(error);
        statusEl.textContent = 'Connection Failed';
    }
}

connectBtn.addEventListener('click', connectWallet);