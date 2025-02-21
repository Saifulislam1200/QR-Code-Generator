function liveUpdateQR() {
    let text = document.getElementById("textInput").value.trim();
    let qrContainer = document.getElementById("qrContainer");
    let downloadBtn = document.getElementById("downloadBtn");
    let copyBtn = document.getElementById("copyBtn");
    let colorDark = document.getElementById("colorDark").value;
    let colorLight = document.getElementById("colorLight").value;
    let qrSize = document.getElementById("qrSize").value;

    qrContainer.innerHTML = ""; // Clear previous QR code

    if (text === "") {
        return;
    }

    new QRCode(qrContainer, {
        text: text,
        width: parseInt(qrSize),
        height: parseInt(qrSize),
        colorDark: colorDark,
        colorLight: colorLight,
        correctLevel: QRCode.CorrectLevel.H
    });

    // Show buttons only when QR is generated
    downloadBtn.classList.remove("hidden");
    copyBtn.classList.remove("hidden");
}

function downloadQR() {
    let qrCanvas = document.querySelector("#qrContainer canvas");

    if (!qrCanvas) {
        showNotification("❌ Please enter text to generate a QR Code!", "red");
        return;
    }

    let qrImage = qrCanvas.toDataURL("image/png");
    let link = document.createElement("a");
    link.href = qrImage;
    link.download = "qrcode.png";
    link.click();
}

function copyQR() {
    let qrCanvas = document.querySelector("#qrContainer canvas");

    if (!qrCanvas) {
        showNotification("❌ Generate a QR Code first!", "red");
        return;
    }

    let qrImage = qrCanvas.toDataURL("image/png");
    navigator.clipboard.writeText(qrImage).then(() => {
        showNotification("✅ QR Code Link Copied!", "green");
    });
}

// Function to show notifications
function showNotification(message, color) {
    let notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.remove("hidden");
    notification.style.color = color;
    
    setTimeout(() => {
        notification.classList.add("hidden");
    }, 3000);
}
