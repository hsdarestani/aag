# Ashkan Asadian Ghahferokhi — digitale Visitenkarte

Deutschsprachiges Profil mit dunklem Editorial-Einstieg, warmer Papierfläche und kontrastierender Typografie mit drei Bereichen, lokalem QR-Code und einer ohne JavaScript verfügbaren vCard. Keine externen Schriftarten, Tracker oder Laufzeit-Abhängigkeiten außer der bereits vorhandenen lokalen QR-Bibliothek (MIT).

## Cloudflare Pages

Repository `hsdarestani/aag`, Produktionsbranch `main` verbinden.

- Framework: **None**
- Build command: **python3 build.py**
- Build output directory: **dist**
- Root directory: leer / Repository-Wurzel
- Optional: `SITE_URL` auf die endgültige HTTPS-Adresse setzen, insbesondere bei eigener Domain. Andernfalls verwendet der Build `CF_PAGES_URL` für Canonical und Open Graph URL.

`dist` enthält ausschließlich die öffentlichen Dateien. `_headers` setzt Sicherheitsheader und den vCard-Dateityp. QR und Teilen verwenden die tatsächlich aufgerufene Adresse ohne Query/Fragment. Keine erfundene Produktionsdomain ist hinterlegt.

Nach dem ersten Deployment die tatsächliche URL, vCard, QR und Kontakte auf iPhone Safari und Android Chrome prüfen. Erst danach den permanenten Link auf NFC-Karten schreiben. Dieses Repository enthält keine Cloudflare-Zugangsdaten.

## Verifizierte Daten und offene Abnahme

Stand: 27.10.2026. Geschäftliche Telefonnummern, E-Mail und Anschrift stammen aus https://aplus-solution.de/impressum/ und https://aplus-solution.de/datenschutz/. Telefonnummern: +49 69 21000418 und +49 172 7779721; E-Mail: info@aplus-solution.de. Anschrift: Carl-Sonnenschein Straße 57, 65936 Frankfurt am Main. Die frühere Europa-Allee-Adresse wurde entfernt. Dies sind **Unternehmenskontakte**, keine behauptete persönliche Durchwahl. WhatsApp-Ziel aus dem bestehenden Repository beibehalten; Erreichbarkeit des Kontos nicht durch eine Nachricht geprüft.

Name und Gründer-Titel aus dem Auftrag; Geschäftsführerrolle auch in beiden Unternehmensimpressen genannt. Kein verifiziertes Porträt und keine persönliche E-Mail verfügbar; deshalb keine erfundenen Angaben.

Rechtliches vor Veröffentlichung: § 5 DDG geprüft (https://www.gesetze-im-internet.de/ddg/__5.html). Vorhandener Betreiberbezug auf A+ Solution und Impressum-Link beibehalten. Die separate Datenschutzerklärung beschreibt die vorgesehene Cloudflare-Pages-Auslieferung und tatsächlich verwendete Seitenfunktionen. Betreiber muss bestätigen, dass A+ Solution diese persönliche Seite verantwortet und die Impressumsangaben sie abdecken. Cloudflare-Vertrag, tatsächliche Protokollierung/Aufbewahrung, internationale Übermittlungsgrundlage und etwaige zusätzliche Kontofunktionen müssen mit der finalen Hosting-Konfiguration abgeglichen werden. Keine abgeschlossene rechtliche Freigabe behauptet.

## Entwickeln und prüfen

```sh
python3 build.py
python3 tests/check.py
node --check app.js
```

Kontaktdaten in `index.html`, `Ashkan-Asadian.vcf` und `datenschutz.html` konsistent halten. Der Build benötigt nur Python 3. Die vCard nutzt UTF-8, CRLF und Faltung bei maximal 75 Bytes pro Zeile.

Browserprüfung in Chromium: Desktop sowie eingebettete Viewports 320×568, 390×844, 430×932. Kein horizontaler Überlauf; Kontakt-speichern-Button bei allen drei Breiten oberhalb 385px. QR-Dialog und Link-kopieren/Teilen-Fallback geprüft. Kein physisches iPhone/Android-Gerät verfügbar; native Kontakte-App und natives Share Sheet sind noch nicht gerätegeprüft.
