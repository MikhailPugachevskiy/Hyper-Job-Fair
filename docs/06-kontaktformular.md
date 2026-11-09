# 6. Kontaktformular: Kontrollierte Eingaben und Events

Das Kontaktformular auf der Seite `Contact.jsx` ist ein klassisches Beispiel für eine **kontrollierte Komponente** (*controlled component*). Das bedeutet: Der Wert jedes Eingabefeldes wird von React (bzw. vom State) verwaltet, nicht vom Browser selbst.

Dieses Kapitel zeigt dir, wie man Formulare in React baut, wie man auf Änderungen in Echtzeit reagiert und wie man das standardmäßige Neuladen der Seite beim Absenden verhindert.

---

## Die Idee: Kontrollierte Eingaben

In normalem HTML hat ein `<input>`-Feld seinen Wert selbst. Man kann ihn mit `document.getElementById('name').value` auslesen. In React machen wir das anders:

- Der Wert des Feldes wird aus dem **State** gelesen (`value={form.name}`).
- Wenn der Nutzer tippt, wird der State aktualisiert (`onChange={handleChange}`).
- React zeichnet das Feld mit dem neuen Wert neu.

Das klingt umständlich, hat aber einen großen Vorteil: Der State ist immer die einzige „Wahrheit“. Wir können den Wert jederzeit programmatisch ändern (z. B. beim Zurücksetzen des Formulars).

---

## Datei: `src/pages/Contact.jsx`

```jsx
  1 | import { useState } from 'react'
  2 | import './Contact.css'
  3 |
  4 | function Contact() {
  5 |     const [form, setForm] = useState({ name: '', email: '', message: '' })
  6 |     const [sent, setSent] = useState(false)
  7 |
  8 |     const handleChange = (e) => {
  9 |         setForm({ ...form, [e.target.name]: e.target.value })
 10 |     }
 11 |
 12 |     const handleSubmit = (e) => {
 13 |         e.preventDefault()
 14 |         // Hier könnte ein API-Call stehen – wir simulieren nur.
 15 |         setSent(true)
 16 |         setTimeout(() => setSent(false), 4000)
 17 |     }
 18 |
 19 |     return (
 20 |         <div className="contact">
 21 |             <h1>Kontakt</h1>
 22 |             <p className="sub">
 23 |                 Du hast Fragen, Ideen oder möchtest mit uns kooperieren? Schreib uns!
 24 |             </p>
 25 |
 26 |             <div className="contact-grid">
 27 |                 <div className="contact-info">
 28 |                     <div className="card">
 29 |                         <h3>📧 E-Mail</h3>
 30 |                         <p>team@hyperjobfair.de</p>
 31 |                     </div>
 32 |                     <div className="card">
 33 |                         <h3>📍 Standort</h3>
 34 |                         <p>Köln, Deutschland (virtuell überall erreichbar)</p>
 35 |                     </div>
 36 |                     <div className="card">
 37 |                         <h3>🌐 Social Media</h3>
 38 |                         <p>#HyperJobFair – folge uns auf LinkedIn und Instagram!</p>
 39 |                     </div>
 40 |                 </div>
 41 |
 42 |                 <div className="contact-form">
 43 |                     {sent ? (
 44 |                         <div className="success-message">
 45 |                             ✅ Vielen Dank! Wir melden uns bei dir.
 46 |                         </div>
 47 |                     ) : (
 48 |                         <form onSubmit={handleSubmit}>
 49 |                             <label htmlFor="name">Dein Name</label>
 50 |                             <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
 51 |
 52 |                             <label htmlFor="email">Deine E-Mail</label>
 53 |                             <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
 54 |
 55 |                             <label htmlFor="message">Nachricht</label>
 56 |                             <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange} required></textarea>
 57 |
 58 |                             <button type="submit">Absenden</button>
 59 |                         </form>
 60 |                     )}
 61 |                 </div>
 62 |             </div>
 63 |         </div>
 64 |     )
 65 | }
 66 |
 67 | export default Contact
```

### Zeile für Zeile

- **Z. 1** Importiert `useState`.
- **Z. 5** Der State `form`. Er ist ein Objekt mit drei Feldern (`name`, `email`, `message`), die alle als leerer String starten. Dieses eine Objekt verwaltet also alle drei Eingabefelder gleichzeitig.
- **Z. 6** Der State `sent`. Er merkt sich, ob das Formular erfolgreich abgeschickt wurde (um die Erfolgsmeldung anzuzeigen).
- **Z. 8–10** Die Funktion `handleChange`. Sie wird bei jeder Eingabe in jedem Feld aufgerufen.
- **Z. 9** Das ist die wichtigste Zeile in diesem Kapitel: `setForm({ ...form, [e.target.name]: e.target.value })`.
  - `...form`: kopiert alle bisherigen Werte aus dem State (also auch die anderen beiden Felder, die der Nutzer gerade nicht ändert).
  - `[e.target.name]`: der Name des Feldes, das gerade geändert wurde (z. B. `"name"`, `"email"` oder `"message"`). Das ist ein berechneter Eigenschaftsname (*computed property name*). Wenn der Nutzer z. B. in das Namensfeld tippt, wird daraus `name:`.
  - `e.target.value`: der neue Wert, den der Nutzer gerade eingegeben hat.
  - Ergebnis: ein neues Form-Objekt, bei dem nur das geänderte Feld aktualisiert wurde, die anderen bleiben gleich.
- **Z. 12–17** Die Funktion `handleSubmit`. Sie wird aufgerufen, wenn das Formular abgeschickt wird.
- **Z. 13** `e.preventDefault()`: Das ist entscheidend! Normalerweise würde ein HTML-Formular beim Absenden die Seite neu laden (und die Daten an eine URL schicken). Da wir aber eine Single Page Application (SPA) sind, wollen wir das nicht. `preventDefault()` verhindert das Standardverhalten des Browsers.
- **Z. 14** Ein Kommentar im Code: Hier würde in einer echten Anwendung ein API-Call stehen. In der Demo wird das Absenden nur simuliert, es werden keine Daten verschickt.
- **Z. 15** Setzt `sent` auf `true`. Dadurch wird sofort die Erfolgsmeldung angezeigt (siehe Z. 43).
- **Z. 16** `setTimeout`: Nach 4000 Millisekunden (4 Sekunden) wird `sent` wieder auf `false` gesetzt. Das Formular wird erneut angezeigt.
- **Z. 28–39** Drei Info-Karten mit der globalen Klasse `.card` (E-Mail, Standort, Social Media). Sie sind rein statischer Inhalt.
- **Z. 43** Bedingtes Rendern: `sent ? ( ... ) : ( ... )`. Wenn `sent` den Wert `true` hat, wird die Erfolgsmeldung angezeigt. Andernfalls (`:`) wird das Formular angezeigt.
- **Z. 48** `<form onSubmit={handleSubmit}>`: Das `onSubmit`-Event wird ausgelöst, wenn das Formular abgeschickt wird (durch Klick auf den Button oder durch Drücken der Enter-Taste).
- **Z. 49** `<label htmlFor="name">`: Das Attribut `htmlFor` ist die React-Version von `for`. Es verknüpft das Label mit dem Eingabefeld, das die `id="name"` hat. Dadurch kann der Nutzer auf das Label klicken, um das Feld zu fokussieren. Das ist wichtig für die Barrierefreiheit.
- **Z. 50** Das Eingabefeld für den Namen:
  - `type="text"`: ein normales Textfeld.
  - `id="name"`: die ID (für das Label).
  - `name="name"`: der Name (wichtig für `e.target.name` in `handleChange`).
  - `value={form.name}`: der Wert kommt aus dem State.
  - `onChange={handleChange}`: bei jeder Eingabe wird der State aktualisiert.
  - `required`: HTML5-Validierung (der Nutzer kann das Feld nicht leer lassen).
- **Z. 53** Das E-Mail-Feld. `type="email"` sorgt dafür, dass der Browser die Eingabe auf ein gültiges E-Mail-Format prüft.
- **Z. 56** Das Textfeld für die Nachricht. In HTML steht der Inhalt eines `<textarea>` zwischen den Tags. In React wird er dagegen, genau wie bei `<input>`, über `value` und `onChange` gesteuert.
- **Z. 58** Der Absende-Button. `type="submit"` ist wichtig, damit er das `onSubmit`-Event des Formulars auslöst.

> **Hinweis:** Nach dem Absenden bleiben die eingegebenen Werte im State `form` erhalten. Wenn das Formular nach 4 Sekunden wieder erscheint, sind die Felder noch gefüllt. Für ein echtes Zurücksetzen könnte man in `handleSubmit` zusätzlich `setForm({ name: '', email: '', message: '' })` aufrufen (siehe Aufgabe 5).

---

## Warum ist das „kontrolliert“?

Das Formular heißt „kontrolliert“, weil React die volle Kontrolle über den Wert hat. Der Browser speichert den Wert nicht selbst, sondern fragt bei jedem Tastendruck React: „Was soll ich anzeigen?“ Und React antwortet mit dem Wert aus dem State.

Der Datenfluss sieht so aus:

1. Der Nutzer tippt ein „M“.
2. Der Browser löst `onChange` aus.
3. `handleChange` wird aufgerufen und aktualisiert den State (`setForm`).
4. React zeichnet die Komponente neu.
5. Das Eingabefeld zeigt jetzt den neuen Wert aus dem State an.

Das macht den Code vorhersehbar und testbar.

---

## Typische Fragen

**Warum verwenden wir nicht einfach `useRef` für die Formularfelder?**
Mit `useRef` (unkontrollierte Komponenten) würde der Browser den Wert selbst verwalten, und wir würden ihn erst beim Absenden auslesen. Das ist manchmal einfacher, aber es macht es schwieriger, den Wert während der Eingabe zu validieren oder zu ändern. Für ein einfaches Formular ist beides okay, aber „kontrolliert“ ist der React-Standard und zeigt, dass man das Konzept verstanden hat.

**Was ist `e.target`?**
`e` ist das Event-Objekt. `e.target` ist das Element, das das Event ausgelöst hat (also das Eingabefeld). `e.target.name` und `e.target.value` sind Eigenschaften dieses Elements.

**Was ist ein „berechneter Eigenschaftsname“ (`[e.target.name]`)?**
Wenn man in einem Objekt einen Schlüssel dynamisch setzen möchte, verwendet man eckige Klammern. `{ [key]: value }` erstellt ein Objekt mit dem Schlüssel, der in der Variablen `key` steht. In unserem Fall ist der Schlüssel der Name des Feldes (`"name"`, `"email"` oder `"message"`).

**Warum wird `setTimeout` verwendet und nicht eine Animation?**
`setTimeout` ist eine einfache Möglichkeit, eine Aktion nach einer bestimmten Zeit auszuführen. In einer echten Anwendung würde man hier wahrscheinlich eine API-Anfrage schicken und dann die Antwort abwarten. Für die Demo simulieren wir das mit `setTimeout`.

**Warum wird das Formular komplett ausgeblendet (`sent ? ... : ...`) und nicht nur die Erfolgsmeldung eingeblendet?**
Das ist eine Design-Entscheidung. Wenn die Erfolgsmeldung erscheint, ist das Formular nicht mehr nötig (der Nutzer hat es ja abgeschickt). Durch das bedingte Rendern wird das Formular aus dem DOM entfernt, was die Seite aufgeräumter macht.

---

## Mach es selbst

1. Füge ein viertes Eingabefeld hinzu (z. B. „Betreff“). Vergiss nicht, es zum `useState`-Objekt hinzuzufügen (`subject: ''`) und ins Formular einzubauen (`name="subject"`).
2. Ändere die Zeit in `setTimeout` (Z. 16) von `4000` auf `10000` (10 Sekunden). Was passiert?
3. Entferne testweise `e.preventDefault()` (Z. 13). Was passiert beim Absenden? (Die Seite lädt neu: Du siehst kurz ein Flackern, und der State wird zurückgesetzt.)
4. Überlege: Was passiert, wenn du `value={form.name}` entfernst, aber `onChange` behältst? (Das Feld wird zu einem *unkontrollierten* Feld: Der Nutzer kann ganz normal tippen, und `handleChange` aktualisiert den State trotzdem. Das Feld wird aber nicht mehr vom State gesteuert, etwa beim Zurücksetzen. Umgekehrt, also `value` ohne `onChange`, wäre das Feld für den Nutzer schreibgeschützt, und React würde eine Warnung ausgeben. Deshalb gehören `value` und `onChange` bei kontrollierten Feldern immer zusammen.)
5. Ergänze in `handleSubmit` die Zeile `setForm({ name: '', email: '', message: '' })`. Was siehst du, wenn das Formular nach der Erfolgsmeldung wieder erscheint? (Die Felder sind jetzt leer, weil der State die einzige „Wahrheit“ ist.)
