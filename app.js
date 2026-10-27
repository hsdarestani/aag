'use strict';

/**
 * Öffentlich verifizierte Geschäftsdaten.
 * Vor Übergabe der NFC-Karten die gewünschte persönliche Durchwahl,
 * eventuelle persönliche E-Mail-Adresse und Domain mit Ashkan abstimmen.
 */
const profile = Object.freeze({
  fullName: 'Ashkan Asadian Ghahferokhi',
  firstName: 'Ashkan Asadian',
  lastName: 'Ghahferokhi',
  title: 'Gründer und Geschäftsführer',
  organization: 'A+ Solution GmbH',
  officePhone: '+496921000418',
  mobilePhone: '+491727779721',
  email: '', // Bitte erst nach Bestätigung einer persönlichen E-Mail befüllen.
  address: 'Europa-Allee 57',
  city: 'Frankfurt am Main',
  postalCode: '60327',
  country: 'Deutschland',
  websites: ['https://aplus-solution.de/', 'https://a-esthetic.de/']
});

const toast = document.getElementById('toast');
const dialog = document.getElementById('qr-dialog');
const qrTarget = document.getElementById('qr-render');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let toastTimer;

function profileLink() {
  // Pages subpaths and a future custom domain both work without changes.
  if (location.protocol === 'file:') return 'https://hsdarestani.github.io/aag/';
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

function escapeVCard(value) {
  return String(value || '')
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');
}

function buildVCard() {
  const items = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:' + escapeVCard(profile.lastName) + ';' + escapeVCard(profile.firstName) + ';;;',
    'FN:' + escapeVCard(profile.fullName),
    'ORG:' + escapeVCard(profile.organization),
    'TITLE:' + escapeVCard(profile.title),
    'TEL;TYPE=WORK,VOICE:' + profile.officePhone,
    'TEL;TYPE=CELL:' + profile.mobilePhone,
    'ADR;TYPE=WORK:;;' + escapeVCard(profile.address) + ';' + escapeVCard(profile.city) + ';;' + escapeVCard(profile.postalCode) + ';' + escapeVCard(profile.country),
    'URL:' + profileLink(),
    ...profile.websites.map(url => 'URL:' + url)
  ];
  if (profile.email) items.push('EMAIL;TYPE=WORK:' + escapeVCard(profile.email));
  items.push('END:VCARD');
  // RFC 2425 line endings for vCard compatibility.
  return items.join('\r\n') + '\r\n';
}

function saveContact() {
  try {
    const blob = new Blob([buildVCard()], { type: 'text/vcard;charset=utf-8' });
    const address = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = address;
    link.download = 'Ashkan-Asadian.vcf';
    link.style.display = 'none';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(address), 1500);
    notice('Kontaktdatei wird heruntergeladen.');
  } catch (error) {
    notice('Kontakt konnte nicht gespeichert werden.');
  }
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
      if (!document.execCommand('copy')) throw new Error('Copy not supported');
      field.remove();
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
  if (action === 'save') saveContact();
  if (action === 'share') shareProfile();
  if (action === 'copy') copyLink();
  if (action === 'qr') showQR();
});

document.getElementById('qr-close')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

document.getElementById('year').textContent = new Date().getFullYear();

const header = document.getElementById('site-header');
const progress = document.getElementById('progress');
let scrollQueued = false;
function syncScrollState() {
  scrollQueued = false;
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 24);
  const available = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = (available > 0 ? Math.min(100, y / available * 100) : 0) + '%';
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) {
    scrollQueued = true;
    requestAnimationFrame(syncScrollState);
  }
}, { passive: true });
window.addEventListener('resize', syncScrollState, { passive: true });
syncScrollState();

// Progressive enhancement: all content is revealed if animation is unsupported.
const reveals = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      self.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -35px 0px', threshold: .04 });
  reveals.forEach(node => observer.observe(node));
} else {
  reveals.forEach(node => node.classList.add('is-visible'));
}

// Deliberately subtle movement only for fine pointer devices.
const card = document.getElementById('foil-card');
const art = document.querySelector('.hero-art');
if (card && art && window.matchMedia('(pointer: fine)').matches && !reducedMotion.matches) {
  art.addEventListener('pointermove', event => {
    const r = art.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width - .5;
    const y = (event.clientY - r.top) / r.height - .5;
    card.style.transform = 'rotateY(' + (-8 + x * 9) + 'deg) rotateX(' + (-y * 7) + 'deg) rotateZ(4deg)';
  }, { passive: true });
  art.addEventListener('pointerleave', () => {
    card.style.transform = '';
  }, { passive: true });
}