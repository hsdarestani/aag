'use strict';

// No analytics, remote QR requests or browser storage.
document.getElementById('utilities').hidden = false;
const toast = document.getElementById('toast');
const dialog = document.getElementById('qr-dialog');
const qrTarget = document.getElementById('qr-render');

let toastTimer;

function profileLink() {
  // Pages subpaths and a future custom domain both work without changes.
  const url = new URL(location.href);
  url.search = '';
  url.hash = '';
  return url.href;
}

function notice(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3400);
}

async function copyLink() {
  const text = profileLink();
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.append(field);
      field.select();
      try {
        if (!document.execCommand('copy')) throw new Error('Copy not supported');
      } finally { field.remove(); }
    }
    notice('Profil-Link kopiert.');
  } catch (error) {
    // Make manual copying possible if Clipboard is restricted.
    window.prompt('Profil-Link kopieren:', text);
  }
}

async function shareProfile() {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Ashkan Asadian — Digitale Visitenkarte',
        text: 'Ashkan Asadian | A+ Solution & A+ Esthetic',
        url: profileLink()
      });
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }
  await copyLink();
}

function showQR() {
  if (!dialog || !qrTarget) return;
  qrTarget.replaceChildren();
  if (typeof window.QRCode === 'function') {
    new window.QRCode(qrTarget, {
      text: profileLink(),
      width: 208,
      height: 208,
      colorDark: '#171a18',
      colorLight: '#ffffff',
      correctLevel: window.QRCode.CorrectLevel.M
    });
    const qrImage = qrTarget.querySelector('img');
    if (qrImage) qrImage.alt = 'QR-Code zum Ashkan-Profil';
  } else {
    qrTarget.textContent = 'QR-Code derzeit nicht verfügbar. Den Profil-Link kannst du unten kopieren.';
    qrTarget.style.padding = '12px';
  }
  if (!dialog.open) dialog.showModal();
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action = button.dataset.action;
  if (action === 'share') shareProfile();
  if (action === 'copy') copyLink();
  if (action === 'qr') showQR();
});

document.getElementById('qr-close')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', event => {
  const r = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close();
});
