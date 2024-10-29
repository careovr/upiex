function onScanSuccess(decodedText) {
    const upiData = parseUPIString(decodedText);
    localStorage.setItem('upiData', JSON.stringify(upiData));
    window.location.href = 'payment.html';
}

function parseUPIString(upiString) {
    const params = new URLSearchParams(upiString.replace('upi://pay?', ''));
    return {
        upiId: params.get('pa'),
        name: params.get('pn')
    };
}

const html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);

document.getElementById('qr-input-file').addEventListener('change', event => {
    const file = event.target.files[0];
    if (!file) {
        return;
    }
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCode.scanFile(file, true)
        .then(decodedText => {
            onScanSuccess(decodedText);
        })
        .catch(err => {
            console.error("Error scanning file:", err);
        });
});