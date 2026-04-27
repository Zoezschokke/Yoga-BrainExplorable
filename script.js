const slider = document.getElementById('lab-slider');
const pfc = document.getElementById('pfc-node');
const amy = document.getElementById('amy-node');
const path = document.getElementById('neural-connection');
const mass = document.getElementById('brain-mass');
const insula = document.getElementById('insula-node');
const statusText = document.getElementById('status-text');
const betaPath = document.getElementById('beta-wave');
const alphaPath = document.getElementById('alpha-wave');
const thetaPath = document.getElementById('theta-wave');

const stages = [
    { pfcOp: 0.3, pfcR: 10, amyR: 14, amyCol: '#ef4444', massW: 5, massCol: '#e2e8f0', insulaOp: 0.1, pathW: 1, msg: "Baseline: Low Focus", bA: 2, bF: 0.6, aA: 2, aF: 0.2, tA: 1, tF: 0.05 },
    { pfcOp: 0.6, pfcR: 13, amyR: 11, amyCol: '#f87171', massW: 10, massCol: '#cbd5e1', insulaOp: 0.4, pathW: 4, msg: "6 Weeks: Rising Focus", bA: 5, bF: 0.6, aA: 6, aF: 0.2, tA: 3, tF: 0.08 },
    { pfcOp: 0.8, pfcR: 17, amyR: 8, amyCol: '#fb923c', massW: 16, massCol: '#185FA5', insulaOp: 0.7, pathW: 8, msg: "6 Months: Sustained Attention", bA: 8, bF: 0.6, aA: 10, aF: 0.2, tA: 6, tF: 0.1 },
    { pfcOp: 1.0, pfcR: 22, amyR: 5, amyCol: '#10b981', massW: 24, massCol: '#185FA5', insulaOp: 1.0, pathW: 12, msg: "6+ Years: Peak Flow", bA: 12, bF: 0.6, aA: 12, aF: 0.2, tA: 10, tF: 0.12 }
];

let phase = 0;
function generateWavePath(amp, freq, currentPhase) {
    let d = "M 0 15 ";
    for (let x = 0; x <= 300; x += 2) {
        let y = 15 + amp * Math.sin((x + currentPhase) * freq);
        d += `L ${x} ${y} `;
    }
    return d;
}

function animate() {
    const val = stages[slider.value];
    betaPath.setAttribute('d', generateWavePath(val.bA, val.bF, phase));
    alphaPath.setAttribute('d', generateWavePath(val.aA, val.aF, phase));
    thetaPath.setAttribute('d', generateWavePath(val.tA, val.tF, phase));
    phase += 2;
    requestAnimationFrame(animate);
}

function updateUI() {
    const val = stages[slider.value];
    pfc.setAttribute('opacity', val.pfcOp);
    pfc.setAttribute('r', val.pfcR);
    amy.setAttribute('r', val.amyR);
    amy.setAttribute('fill', val.amyCol);
    path.setAttribute('stroke-width', val.pathW);
    path.setAttribute('stroke', slider.value > 1 ? '#185FA5' : '#cbd5e1');
    mass.setAttribute('stroke-width', val.massW);
    mass.setAttribute('stroke', val.massCol);
    insula.setAttribute('opacity', val.insulaOp);
    insula.setAttribute('r', 4 + (slider.value * 4));
    statusText.innerText = val.msg;
}

slider.addEventListener('input', updateUI);
updateUI();
animate();