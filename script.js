document.addEventListener('DOMContentLoaded', () => {

    // Feature 1: Map Pulse Simulation
    const mapContainer = document.getElementById('map-container');
    const MAX_POINTS = 8;

    function createPulsePoint() {
        if (!mapContainer) return;

        const point = document.createElement('div');
        // Randomize type: 70% chance of Red (Crowded) for "City Pulse", 30% Green
        const isCrowded = Math.random() > 0.4;
        point.classList.add('pulse-point', isCrowded ? 'red' : 'green');

        // Random Position within container (avoiding extreme edges)
        const top = 10 + Math.random() * 80;
        const left = 10 + Math.random() * 80;

        point.style.top = `${top}%`;
        point.style.left = `${left}%`;

        mapContainer.appendChild(point);

        // Remove after animation cycle to keep DOM clean
        setTimeout(() => {
            point.remove();
        }, 4000); // 2 cycles of 2s animation
    }

    // Start simulation loop
    setInterval(createPulsePoint, 1500);
    // Initial batch
    createPulsePoint(); createPulsePoint();

    // Feature 2: Crowdsourcing Voting
    const voteButtons = document.querySelectorAll('.vote-btn');
    const feedback = document.getElementById('vote-feedback');

    voteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Visual feedback
            voteButtons.forEach(b => b.style.opacity = '0.5'); // Dim all
            e.currentTarget.style.opacity = '1'; // Highlight selected

            // Show feedback text
            feedback.classList.add('visible');
            feedback.textContent = `Voto registado: ${e.currentTarget.innerText.trim()}`;

            // Simulate Data Update on Map (Add a point immediately based on vote)
            const vibe = e.currentTarget.dataset.vibe;
            addInstantPoint(vibe);

            // Reset after delay
            setTimeout(() => {
                feedback.classList.remove('visible');
                voteButtons.forEach(b => b.style.opacity = '1');
            }, 2000);
        });
    });

    function addInstantPoint(vibe) {
        const point = document.createElement('div');
        let colorClass = 'green';
        if (vibe === 'busy') colorClass = 'red'; // Treat busy as red for visual impact
        if (vibe === 'intense') colorClass = 'red';

        point.classList.add('pulse-point', colorClass);
        point.style.top = '50%';
        point.style.left = '50%';
        point.style.zIndex = '10'; // visible on top

        mapContainer.appendChild(point);
        setTimeout(() => point.remove(), 2000);
    }

    // Feature 3: SOS Bar Close
    const sosBar = document.getElementById('sos-bar');
    const sosClose = document.querySelector('.sos-close');

    if (sosClose) {
        sosClose.addEventListener('click', () => {
            sosBar.style.display = 'none';
        });
    }

    // Feature 4: Traffic Light Simulation (Optional Logic)
    // Toggles active light every 5 seconds for demo purposes
    const lights = document.querySelectorAll('.traffic-light .light');
    const statusText = document.querySelector('.traffic-status strong');
    let lightIndex = 1; // Start at Yellow (1)

    // Simple rotation: Green(2) -> Yellow(1) -> Red(0) -> Green(2)
    // Actually standard traffic: Green -> Yellow -> Red -> Green

    // For this UI we want to show it static, but we can animate it slowly
    /* 
    const states = [
        { idx: 0, text: 'Congestionado' },
        { idx: 1, text: 'Moderado' },
        { idx: 2, text: 'Fluido' }
    ];
    
    setInterval(() => {
        lights.forEach(l => l.classList.remove('active'));
        lightIndex = (lightIndex + 1) % 3;
        lights[lightIndex].classList.add('active');
        
        // Update color of text to match
        const activeColor = getComputedStyle(lights[lightIndex]).backgroundColor;
        statusText.style.color = activeColor;
        statusText.innerText = states.find(s => s.idx === lightIndex).text;
    }, 5000);
    */
});
