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