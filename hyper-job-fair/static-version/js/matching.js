// Fiktive Jobangebote
const jobOffers = [
    {
        id: 1,
        company: 'FoodCorp Europe',
        title: 'Junior Brand Manager',
        description: 'Verantwortung für die Entwicklung einer bekannten Marke im FMCG-Bereich. Teamarbeit, Kreativität und strategisches Denken gefragt.',
        tags: ['Marketing', 'FMCG', '1-2 Jahre Erfahrung'],
        match: 92
    },
    {
        id: 2,
        company: 'TechStart GmbH',
        title: 'Frontend Developer (React)',
        description: 'Gestalte die nächste Generation unserer SaaS-Plattform. Arbeite mit einem agilen Team und modernsten Technologien.',
        tags: ['React', 'TypeScript', 'Remote möglich'],
        match: 78
    },
    {
        id: 3,
        company: 'GreenEnergy AG',
        title: 'Projektmanager Nachhaltigkeit',
        description: 'Leite Projekte im Bereich erneuerbare Energien. Koordiniere internationale Teams und treibe die Energiewende voran.',
        tags: ['Projektmanagement', 'Englisch', 'Reisebereitschaft'],
        match: 65
    },
    {
        id: 4,
        company: 'DigitalHealth Solutions',
        title: 'Data Analyst',
        description: 'Analysiere Gesundheitsdaten, entwickle Dashboards und unterstütze Ärzte bei der Entscheidungsfindung.',
        tags: ['Python', 'SQL', 'Gesundheitswesen'],
        match: 85
    },
    {
        id: 5,
        company: 'EduFuture',
        title: 'Learning & Development Specialist',
        description: 'Gestalte innovative Lernangebote für junge Talente. Arbeite mit Universitäten und Unternehmen zusammen.',
        tags: ['Bildung', 'Didaktik', 'Kreativität'],
        match: 70
    }
];

let currentIndex = 0;
let matches = [];
let noMatches = [];

function renderJob() {
    const card = document.getElementById('jobCard');
    const progress = document.getElementById('progress');

    if (currentIndex >= jobOffers.length) {
        showResults();
        return;
    }

    const job = jobOffers[currentIndex];

    card.innerHTML = `
        <div class="job-header">
            <span class="company">${job.company}</span>
            <span class="match-badge">${job.match}% Match</span>
        </div>
        <h3>${job.title}</h3>
        <p>${job.description}</p>
        <div class="tags">
            ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
    `;

    progress.textContent = `${currentIndex + 1} von ${jobOffers.length} Angeboten`;
}

function handleSwipe(direction) {
    if (currentIndex >= jobOffers.length) return;

    const currentJob = jobOffers[currentIndex];

    if (direction === 'right') {
        matches.push(currentJob);
    } else {
        noMatches.push(currentJob);
    }

    currentIndex++;
    renderJob();
}

function showResults() {
    document.getElementById('matchingApp').style.display = 'none';
    const container = document.getElementById('resultContainer');
    container.style.display = 'block';

    container.innerHTML = `
        <div class="result-card">
            <h2>✅ Demo abgeschlossen!</h2>
            <p>Du hast <strong>${matches.length}</strong> von ${jobOffers.length} Angeboten nach rechts geswiped.</p>
            <div class="result-lists">
                <div>
                    <h3>Deine Matches</h3>
                    <ul>
                        ${matches.length > 0 ?
            matches.map(job => `<li>${job.company} – ${job.title} (Match ${job.match}%)</li>`).join('') :
            '<li>Keine Matches – vielleicht beim nächsten Mal?</li>'
        }
                    </ul>
                </div>
                <div>
                    <h3>Übergangen</h3>
                    <ul>
                        ${noMatches.length > 0 ?
            noMatches.map(job => `<li>${job.company} – ${job.title}</li>`).join('') :
            '<li>Du hast alle interessant gefunden!</li>'
        }
                    </ul>
                </div>
            </div>
            <button onclick="resetDemo()">Demo neu starten</button>
        </div>
    `;
}

function resetDemo() {
    currentIndex = 0;
    matches = [];
    noMatches = [];
    document.getElementById('matchingApp').style.display = 'block';
    document.getElementById('resultContainer').style.display = 'none';
    renderJob();
}

// Beim Laden der Seite starten
document.addEventListener('DOMContentLoaded', renderJob);