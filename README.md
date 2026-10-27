# Ashkan Asadian — digitale Visitenkarte

Premium-One-Page-Profil für Ashkan Asadian Ghahferokhi, A+ Solution GmbH und A+ Esthetic.

## Live schalten (GitHub Pages)

1. Repository **Settings → Pages** öffnen.
2. Unter **Build and deployment** als Source **Deploy from a branch** wählen.
3. Branch **main**, Ordner **/(root)**, danach **Save**.
4. Die Website ist nach erfolgreicher Veröffentlichung unter **https://hsdarestani.github.io/aag/** erreichbar.
5. Auf einem iPhone und Android-Gerät prüfen: „Kontakt speichern“, Telefon, WhatsApp, „Profil teilen“, QR.

## NFC-Karten beschreiben

- **Empfehlung:** Vorher eine dauerhafte, eigene Domain/Subdomain festlegen (z. B. `ashkan.aplus-solution.de`), damit später kein Neubeschreiben aller NFC-Karten nötig wird.
- In der NFC-App **NFC Tools**: **Write → Add a record → URL/URI**; vollständige HTTPS-URL eingeben, dann **Write** und Karte berühren.
- Vorhandene NFC-Tags nur überschreiben, wenn sie nicht gesperrt und technisch kompatibel sind. Auf alten Karten gespeicherte andere Datensätze bei Bedarf vorher entfernen.
- Die Karte benötigt kein dynamisches Profil auf dem NFC-Chip; sie speichert ausschließlich den permanenten Link.

## Personalisieren

- Personenname, Telefon und Links in `app.js` im Objekt `profile` ändern.
- Das aktuelle Design verwendet bewusst ein grafisches Monogramm statt eines künstlich erzeugten Porträts. Ein echtes Foto kann später ergänzt werden.
- Geschäftliche Kontaktkanäle stammen von der öffentlich zugänglichen Unternehmensseite. Vor Übergabe der NFC-Karten mit Ashkan abgleichen.
- Die Buttons erzeugen die vCard direkt im Browser, keine Datenübertragung an einen eigenen Server.
- QR-Code wird im Browser erzeugt (QR-Code-JS per CDN); bei Netzwerkfehlern bleibt Teilen/Kopieren verfügbar.
- Fußzeilen-Links zu Impressum und Datenschutz führen aktuell zu A+ Solution. Vor produktiver Nutzung prüfen, ob die Angaben den Betreiber dieser persönlichen Profilseite rechtlich korrekt abdecken.

## Technik

Reine HTML/CSS/JavaScript-Seite ohne Build-System oder Datenbank. GitHub Pages, Cloudflare Pages und andere statische Hosting-Dienste werden unterstützt.

Dateien: `index.html`, `styles.css`, `app.js`, `favicon.svg`.