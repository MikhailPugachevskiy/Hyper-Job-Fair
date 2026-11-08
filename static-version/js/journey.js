const phaseData = {
    before: {
        title: 'Vor der Messe – Perfekt vorbereitet',
        items: [
            '<strong>LinkedIn-Import</strong> – Profil automatisch übertragen',
            '<strong>Orientierungstest</strong> – Unternehmen laden Tests hoch, du bekommst bessere Matches',
            '<strong>Matching-Algorithmus</strong> – Wie Tinder: swipen, matchen, chatten',
            '<strong>Chat mit Recruitern</strong> – Fragen klären, Termine vereinbaren'
        ],
        example: 'Beispiel: Bob, Absolvent, lädt sein LinkedIn-Profil hoch und matched mit 5 Unternehmen.'
    },
    during: {
        title: 'Während der Messe – Effizient und interaktiv',
        items: [
            '<strong>ScanYourTicket</strong> – digitaler Einlass',
            '<strong>Interaktive Karte</strong> – finde die Stände deiner Matches',
            '<strong>Digitale Wartelisten</strong> – keine langen Schlangen',
            '<strong>Social Contests</strong> – z.B. „Wie verbesserst du das Arbeitsklima?“ – mit Preisen',
            '<strong>Live-Polls</strong> – direktes Feedback per App'
        ],
        example: 'Beispiel: Bob scannt sein Ticket, geht direkt zu seinen Matches und hat ein erfolgreiches Interview.'
    },
    after: {
        title: 'Nach der Messe – Nachhaltige Bindung',
        items: [
            '<strong>Individuelles Feedback</strong> – von Recruitern zu Stärken und Entwicklungspunkten',
            '<strong>Newsletter</strong> – relevante Job-Updates und Events',
            '<strong>Bewertungssystem</strong> – teile deine Erfahrungen mit der Community',
            '<strong>Datenkontrolle</strong> – jederzeit löschbar (GDPR)'
        ],
        example: 'Beispiel: Bob erhält detailliertes Feedback, verbessert seine Soft Skills und bekommt den Job!'
    }
};

let currentPhase = 'before';

function renderPhase(phase) {
    const data = phaseData[phase];
    const container = document.getElementById('phaseContent');

    container.innerHTML = `
        <h2>${data.title}</h2>
        <ul>
            ${data.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <div class="example">${data.example}</div>
    `;
}

function setActiveTab(phase) {
    const buttons = document.querySelectorAll('.phase-tabs button');
    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.phase === phase);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    renderPhase('before');

    const buttons = document.querySelectorAll('.phase-tabs button');
    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            const phase = this.dataset.phase;
            currentPhase = phase;
            renderPhase(phase);
            setActiveTab(phase);
        });
    });
});