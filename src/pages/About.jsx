import './About.css'

function About() {
    return (
        <div className="about">
            <h1>Über Hyper Job Fair</h1>
            <p className="intro">
                Wir revolutionieren die klassische Jobmesse mit einem hyper-personalisierten Ansatz.
                Basierend auf dem <strong>5I's-Modell</strong> schaffen wir eine Plattform, die
                Studierende und Arbeitgeber optimal zusammenbringt.
            </p>

            <section className="five-is">
                <h2>Die 5 I's der Hyper-Personalization</h2>
                <div className="is-grid">
                    <div className="is-card">
                        <span className="icon">🔍</span>
                        <h3>Identification</h3>
                        <p>Erfassung von Profildaten (LinkedIn, Orientierungstest) – die Basis für personalisierte Empfehlungen.</p>
                    </div>
                    <div className="is-card">
                        <span className="icon">🎯</span>
                        <h3>Individualization</h3>
                        <p>Matching-Algorithmus und individuelle Feedbackschleifen – jedes Erlebnis ist einzigartig.</p>
                    </div>
                    <div className="is-card">
                        <span className="icon">💬</span>
                        <h3>Interaction</h3>
                        <p>Chat, Social Contests, Live-Polls – echte Begegnungen digital und vor Ort.</p>
                    </div>
                    <div className="is-card">
                        <span className="icon">🔗</span>
                        <h3>Integration</h3>
                        <p>Nahtlose Einbindung in den gesamten Customer Journey – von der Vorbereitung bis zum Follow-up.</p>
                    </div>
                    <div className="is-card">
                        <span className="icon">🛡️</span>
                        <h3>Integrity</h3>
                        <p>GDPR-konform, transparente Datenverarbeitung und vollständige Kontrolle für die Nutzer.</p>
                    </div>
                </div>
            </section>

            <section className="target">
                <h2>Unsere Zielgruppen</h2>
                <div className="target-grid">
                    <div className="card">
                        <h3>🎓 Studierende &amp; Absolventen</h3>
                        <p>Unter 30 Jahren, aus aller Welt, auf der Suche nach dem ersten Job oder Praktikum.</p>
                    </div>
                    <div className="card">
                        <h3>🏢 Unternehmen</h3>
                        <p>Die passenden Talente finden – effizient, datenbasiert und mit echtem menschlichen Kontakt.</p>
                    </div>
                </div>
                <p className="cluster-hint">
                    <strong>3 Cluster</strong> wurden identifiziert: <em>The Networkers</em> (21,5 %),
                    <em>Involved</em> (47 %) und <em>I don't care</em> (31,4 %). Wir fokussieren die Involved und Networkers.
                </p>
            </section>

            <section className="value">
                <h2>Unsere Versprechen</h2>
                <ul>
                    <li><strong>💸 Cheap:</strong> Bezahlung nur bei erfolgreicher Vermittlung – für Studierende kostenfrei.</li>
                    <li><strong>⚡ Flawless:</strong> Reibungslose Prozesse, digitale Wartelisten, Orientierungstests.</li>
                    <li><strong>🔒 Secure:</strong> Höchste Datenschutzstandards (GDPR) – jederzeit löschbare Daten.</li>
                </ul>
            </section>
        </div>
    )
}

export default About