// State management
const state = {
    currentGroup: 'Kids',
    counts: {
        'Kids': 0,
        'Teens': 0,
        'Campus': 0,
        'YWAs': 0,
        'Family': 0
    }
};

// DOM elements
const counterValue = document.getElementById('counterValue');
const counterGroup = document.getElementById('counterGroup');
const btnIncrement = document.getElementById('btnIncrement');
const btnDecrement = document.getElementById('btnDecrement');
const btnCopy = document.getElementById('btnCopy');
const summaryList = document.getElementById('summaryList');
const summaryTotal = document.getElementById('summaryTotal');
const toast = document.getElementById('toast');
const ageButtons = document.querySelectorAll('.age-btn');

// Initialize app
function init() {
    loadFromLocalStorage();
    updateDisplay();
    renderSummary();
    attachEventListeners();

    // Lock orientation to portrait (best effort)
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('portrait').catch(() => {
            // Orientation lock not supported or failed
            console.log('Orientation lock not supported');
        });
    }
}

// Load data from localStorage
function loadFromLocalStorage() {
    const saved = localStorage.getItem('attendanceCounter');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            state.counts = data.counts || state.counts;
            state.currentGroup = data.currentGroup || state.currentGroup;
        } catch (e) {
            console.error('Error loading from localStorage:', e);
        }
    }
}

// Save data to localStorage
function saveToLocalStorage() {
    try {
        localStorage.setItem('attendanceCounter', JSON.stringify(state));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

// Update counter display
function updateDisplay() {
    counterValue.textContent = state.counts[state.currentGroup];
    counterGroup.textContent = state.currentGroup;

    // Update active age button
    ageButtons.forEach(btn => {
        if (btn.dataset.group === state.currentGroup) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Render summary list
function renderSummary() {
    summaryList.innerHTML = '';
    let total = 0;

    Object.entries(state.counts).forEach(([group, count]) => {
        total += count;

        const item = document.createElement('div');
        item.className = 'summary-item';
        item.innerHTML = `
            <span class="summary-item-label">${group}</span>
            <span class="summary-item-value">${count}</span>
        `;
        summaryList.appendChild(item);
    });

    summaryTotal.textContent = `Total: ${total}`;
}

// Debounce timer for localStorage saves
let saveTimer = null;

// Debounced save to localStorage
function debouncedSave() {
    if (saveTimer) {
        clearTimeout(saveTimer);
    }
    saveTimer = setTimeout(() => {
        saveToLocalStorage();
    }, 100); // Save after 100ms of no activity
}

// Increment counter
function increment() {
    state.counts[state.currentGroup]++;

    // Trigger pulse animation (non-blocking)
    counterValue.classList.remove('pulse');
    // Force reflow to restart animation
    void counterValue.offsetWidth;
    counterValue.classList.add('pulse');

    // Update display immediately
    requestAnimationFrame(() => {
        updateDisplay();
        renderSummary();
    });

    // Debounce save to avoid blocking on rapid clicks
    debouncedSave();
}

// Decrement counter
function decrement() {
    if (state.counts[state.currentGroup] > 0) {
        state.counts[state.currentGroup]--;

        // Trigger pulse animation (non-blocking)
        counterValue.classList.remove('pulse');
        // Force reflow to restart animation
        void counterValue.offsetWidth;
        counterValue.classList.add('pulse');

        // Update display immediately
        requestAnimationFrame(() => {
            updateDisplay();
            renderSummary();
        });

        // Debounce save to avoid blocking on rapid clicks
        debouncedSave();
    }
}

// Change age group
function changeGroup(group) {
    state.currentGroup = group;
    updateDisplay();
    saveToLocalStorage();
}

// Copy to clipboard
async function copyToClipboard() {
    let total = 0;
    let text = 'Attendance Count:\n\n';

    Object.entries(state.counts).forEach(([group, count]) => {
        total += count;
        text += `${group}: ${count}\n`;
    });

    text += `\nTotal: ${total}`;

    try {
        // Try modern clipboard API first
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }

        showToast();
    } catch (err) {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard. Please try again.');
    }
}

// Show toast notification
function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Attach event listeners
function attachEventListeners() {
    btnIncrement.addEventListener('click', increment);
    btnDecrement.addEventListener('click', decrement);
    btnCopy.addEventListener('click', copyToClipboard);

    ageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            changeGroup(btn.dataset.group);
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === '+' || e.key === '=') {
            increment();
        } else if (e.key === '-' || e.key === '_') {
            decrement();
        } else if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            copyToClipboard();
        }
    });

    // Prevent double-tap zoom on buttons
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
