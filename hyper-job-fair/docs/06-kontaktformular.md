# 6. Kontaktformular: Kontrollierte Eingaben und Events

Das Kontaktformular auf der Seite `Contact.jsx` ist ein klassisches Beispiel für eine **kontrollierte Komponente** (*controlled component*). Das bedeutet: Der Wert jedes Eingabefeldes wird von React (bzw. vom State) verwaltet, nicht vom Browser selbst.

Dieses Kapitel zeigt dir, wie man Formulare in React baut, wie man auf Änderungen in Echtzeit reagiert und wie man das standardmäßige Neuladen der Seite beim Absenden verhindert.

---

## Die Idee: Kontrollierte Eingaben

In normalem HTML hat ein `<input>`-Feld seinen Wert selbst. Man kann ihn mit `document.getElementById('name').value` auslesen. In React machen wir das anders: 

- Der Wert des Feldes wird aus dem **State** gelesen (`value={form.name}`).
- Wenn der Nutzer tippt, wird der State aktualisiert (`onChange={handleChange}`).
- React zeichnet das Feld mit dem neuen Wert neu.

Das klingt umständlich, hat aber einen großen Vorteil: Der State ist immer die einzige „Wahrheit". Wir können den Wert jederzeit programmatisch ändern (z.B. beim Zurücksetzen des Formulars).

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
 14 |         setSent(true)
 15 |         setTimeout(() => setSent(false), 4000)
 16 |     }
 17 |
 18 |     return (
 19 |         <div className="contact">
 20 |             <h1>Kontakt</h1>
 21 |             <p className="sub">
 22 |                 Du hast Fragen, Ideen oder möchtest mit uns kooperieren? Schreib uns!
 23 |             </p>
 24 |
 25 |             <div className="contact-grid">
 26 |                 <div className="contact-info">
 27 |                     {/* ... Info-Karten ... */}
 28 |                 </div>
 29 |
 30 |                 <div className="contact-form">
 31 |                     {sent ? (
 32 |                         <div className="success-message">
 33 |                             ✅ Vielen Dank! Wir melden uns bei dir.
 34 |                         </div>
 35 |                     ) : (
 36 |                         <form onSubmit={handleSubmit}>
 37 |                             <label htmlFor="name">Dein Name</label>
 38 |                             <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
 39 |
 40 |                             <label htmlFor="email">Deine E-Mail</label>
 41 |                             <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
 42 |
 43 |                             <label htmlFor="message">Nachricht</label>
 44 |                             <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange} required></textarea>
 45 |
 46 |                             <button type="submit">Absenden</button>
 47 |                         </form>
 48 |                     )}
 49 |                 </div>
 50 |             </div>
 51 |         </div>
 52 |     )
 53 | }
 54 |
 55 | export default Contact


Z. 1 Importiert useState.

Z. 5 Der State form. Er ist ein Objekt mit drei Feldern (name, email, message), die alle als leerer String starten. Dieses eine Objekt verwaltet also alle drei Eingabefelder gleichzeitig.

Z. 6 Der State sent. Er merkt sich, ob das Formular erfolgreich abgeschickt wurde (um die Erfolgsmeldung anzuzeigen).

Z. 8–10 Die Funktion handleChange. Sie wird bei jeder Eingabe in jedem Feld aufgerufen.

Z. 9 Das ist die wichtigste Zeile in diesem Kapitel: setForm({ ...form, [e.target.name]: e.target.value }).

    ...form: Kopiert alle bisherigen Werte aus dem State (also die anderen beiden Felder, die der Nutzer noch nicht geändert hat).

    [e.target.name]: Der Name des Feldes, das gerade geändert wurde (z.B. "name", "email" oder "message"). Das ist ein berechneter Eigenschaftsname (computed property name). Wenn der Nutzer z.B. in das Namensfeld tippt, wird daraus name:.

    e.target.value: Der neue Wert, den der Nutzer gerade eingegeben hat.

    Ergebnis: Ein neues Form-Objekt, bei dem nur das geänderte Feld aktualisiert wurde, die anderen bleiben gleich.

Z. 12–16 Die Funktion handleSubmit. Sie wird aufgerufen, wenn der Nutzer auf „Absenden" klickt.

Z. 13 e.preventDefault(): Das ist entscheidend! Normalerweise würde ein HTML-Formular beim Absenden die Seite neu laden (und an eine URL schicken). Da wir aber eine Single Page Application (SPA) sind, wollen wir das nicht. preventDefault() verhindert das Standardverhalten des Browsers.

Z. 14 Setzt sent auf true. Dadurch wird sofort die Erfolgsmeldung angezeigt (siehe Z. 31).

Z. 15 setTimeout: Nach 4000 Millisekunden (4 Sekunden) wird sent wieder auf false gesetzt. Das Formular wird erneut angezeigt.

Z. 31 Bedingtes Rendern: sent ? ( ... ) : ( ... ). Wenn sent true ist, wird die Erfolgsmeldung angezeigt. Andernfalls (:) wird das Formular angezeigt.

Z. 36 <form onSubmit={handleSubmit}>: Das onSubmit-Event wird ausgelöst, wenn das Formular abgeschickt wird (durch Klick auf den Button oder durch Drücken der Enter-Taste).

Z. 37 <label htmlFor="name">: Das htmlFor-Attribut ist die React-Version von for. Es verknüpft das Label mit dem Eingabefeld, das die id="name" hat. Dadurch kann der Nutzer auf das Label klicken, um das Feld zu fokussieren. Das ist wichtig für Barrierefreiheit.

Z. 38 Das Eingabefeld für den Namen:

    type="text": Ein normales Textfeld.

    id="name": Die ID (für das Label).

    name="name": Der Name (wichtig für e.target.name in handleChange).

    value={form.name}: Der Wert kommt aus dem State.

    onChange={handleChange}: Bei jeder Eingabe wird der State aktualisiert.

    required: HTML5-Validierung (der Nutzer kann das Feld nicht leer lassen).

Z. 41 Das E-Mail-Feld. type="email" sorgt dafür, dass der Browser die Eingabe auf ein gültiges E-Mail-Format prüft.

Z. 44 Das Textfeld für die Nachricht. <textarea> hat in React kein value-Attribut im HTML-Sinne, sondern wird ebenfalls über value und onChange gesteuert.

Z. 46 Der Absende-Button. type="submit" ist wichtig, damit er das onSubmit-Event des Formulars auslöst.


Warum ist das „kontrolliert"?

Das Formular heißt „kontrolliert", weil React die volle Kontrolle über den Wert hat. Der Browser speichert den Wert nicht selbst, sondern fragt bei jedem Tastendruck React: „Was soll ich anzeigen?" Und React antwortet mit dem Wert aus dem State.

Der Datenfluss sieht so aus:

    Nutzer tippt ein „M".

    Browser löst onChange aus.

    handleChange wird aufgerufen und aktualisiert den State (setForm).

    React zeichnet die Komponente neu.

    Das Eingabefeld zeigt jetzt den neuen Wert aus dem State an.

Es macht den Code vorhersehbar und testbar.


Typische Fragen

    Warum verwenden wir nicht einfach useRef für die Formularfelder? Mit useRef (uncontrolled components) würde der Browser den Wert selbst verwalten und wir würden ihn erst beim Absenden auslesen. Das ist manchmal einfacher, aber es macht es schwieriger, den Wert während der Eingabe zu validieren oder zu ändern. Für ein einfaches Formular ist beides okay, aber „kontrolliert" ist der React-Standard und zeigt, dass man das Konzept verstanden hat.

    Was ist e.target? e ist das Event-Objekt. e.target ist das Element, das das Event ausgelöst hat (also das Eingabefeld). e.target.name und e.target.value sind die Eigenschaften dieses Elements.

    Was ist ein „berechneter Eigenschaftsname" ([e.target.name])? Wenn man in einem Objekt einen Schlüssel dynamisch setzen möchte, verwendet man eckige Klammern. { [key]: value } erstellt ein Objekt mit dem Schlüssel, der in der Variablen key steht. In unserem Fall ist der Schlüssel der Name des Feldes ("name", "email" oder "message").

    Warum wird setTimeout verwendet und nicht eine Animation? setTimeout ist eine einfache Möglichkeit, eine Aktion nach einer bestimmten Zeit auszuführen. In einer echten Anwendung würde man hier wahrscheinlich eine API-Anfrage schicken und dann die Antwort abwarten. Für die Demo simulieren wir das mit setTimeout.

    Warum wird das Formular komplett ausgeblendet (sent ? ... : ...) und nicht nur die Erfolgsmeldung eingeblendet? Das ist eine Design-Entscheidung. Wenn die Erfolgsmeldung erscheint, ist das Formular nicht mehr nötig (der Nutzer hat es ja abgeschickt). Durch das bedingte Rendern wird das Formular aus dem DOM entfernt, was die Seite aufgeräumter macht.

Mach es selbst

    Füge ein viertes Eingabefeld hinzu (z.B. „Betreff"). Vergiss nicht, es zum useState-Objekt hinzuzufügen (subject: '') und ins Formular einzubauen (name="subject").

    Ändere die Zeit in setTimeout von 4000 auf 10000 (10 Sekunden). Was passiert?

    Entferne testweise e.preventDefault() aus handleSubmit. Was passiert beim Absenden? (Die Seite lädt neu – du siehst kurz ein Flackern, und der State wird zurückgesetzt.)

    Überlege: Was passiert, wenn du value={form.name} entfernst, aber onChange behältst? (Das Feld würde zwar den State aktualisieren, aber der angezeigte Wert würde sich nicht ändern – das Feld wäre „read-only" für den Nutzer, aber der State würde sich ändern. Das ist ein häufiger Fehler und zeigt, warum value und onChange immer zusammen gehören.)