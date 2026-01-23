// State management
const state = {
    currentGroup: 'Kids',
    counts: {
        'Kids': 0,
        'Teens': 0,
        'Campus': 0,
        'YWAs': 0,
        'Adult': 0
    }
};

// DOM elements
const counterValue = document.getElementById('counterValue');
const btnIncrement = document.getElementById('btnIncrement');
const btnDecrement = document.getElementById('btnDecrement');
const btnCopy = document.getElementById('btnCopy');
const btnReset = document.getElementById('btnReset');
const summaryList = document.getElementById('summaryList');
const summaryTotal = document.getElementById('summaryTotal');
const toast = document.getElementById('toast');
const ageButtons = document.querySelectorAll('.age-btn');
const globalCountDisplay = document.getElementById('globalCount');

// Modal elements
const confirmModal = document.getElementById('confirmModal');
const btnModalCancel = document.getElementById('btnModalCancel');
const btnModalConfirm = document.getElementById('btnModalConfirm');

// Global Counter Config
const GLOBAL_COUNTER_API = 'https://api.counterapi.dev/v1';
const NAMESPACE = 'attendance-counter-app';
const KEY = 'global-people-counted';

// Initialize app
function init() {
    loadFromLocalStorage();
    updateDisplay();
    renderSummary();
    attachEventListeners();
    if (globalCountDisplay) {
        fetchGlobalCount(); // Fetch initial global count
    }

    // Lock orientation to portrait (best effort)
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('portrait').catch(() => {
            // Orientation lock not supported or failed
            console.log('Orientation lock not supported');
        });
    }
}

// Fetch Global Count
async function fetchGlobalCount() {
    try {
        const response = await fetch(`${GLOBAL_COUNTER_API}/${NAMESPACE}/${KEY}/`);
        const data = await response.json();
        if (data && data.count !== undefined) {
            updateGlobalCountDisplay(data.count);
        }
    } catch (error) {
        console.error('Error fetching global count:', error);
        if (globalCountDisplay) {
            globalCountDisplay.textContent = 'Unavailable';
        }
    }
}

// Increment Global Count (Fire and forget)
function incrementGlobalCount() {
    fetch(`${GLOBAL_COUNTER_API}/${NAMESPACE}/${KEY}/up`)
        .then(response => response.json())
        .then(data => {
            if (data && data.count !== undefined) {
                updateGlobalCountDisplay(data.count);
            }
        })
        .catch(error => console.error('Error incrementing global count:', error));
}

// Update Global Count Display with animation
function updateGlobalCountDisplay(count) {
    if (!globalCountDisplay) return;
    const formattedCount = new Intl.NumberFormat().format(count);
    globalCountDisplay.textContent = formattedCount;

    // Subtle pulse animation
    globalCountDisplay.style.transform = 'scale(1.1)';
    globalCountDisplay.style.color = 'var(--accent-secondary)';
    setTimeout(() => {
        globalCountDisplay.style.transform = 'scale(1)';
        globalCountDisplay.style.color = 'var(--primary)';
    }, 200);
}

// Load data from localStorage
function loadFromLocalStorage() {
    const saved = localStorage.getItem('attendanceCounter');
    if (saved) {
        try {
            const data = JSON.parse(saved);

            // Migration: Port 'Family' counts to 'Adult' if they exist
            if (data.counts && data.counts.Family !== undefined) {
                data.counts.Adult = (data.counts.Adult || 0) + data.counts.Family;
                delete data.counts.Family;
            }
            if (data.currentGroup === 'Family') {
                data.currentGroup = 'Adult';
            }

            state.counts = { ...state.counts, ...data.counts };
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

    // Update active age button
    ageButtons.forEach(btn => {
        if (btn.dataset.group === state.currentGroup) {
            btn.classList.add('active');
            // Scroll active button into view if needed
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
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
            <div class="summary-item-content">
                <span class="summary-item-value">${count}</span>
                <button class="btn-copy-individual" data-group="${group}" title="Copy ${group} count" aria-label="Copy ${group} count">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
            </div>
        `;
        summaryList.appendChild(item);
    });

    // Add event listeners to individual copy buttons
    const individualCopyBtns = summaryList.querySelectorAll('.btn-copy-individual');
    individualCopyBtns.forEach(btn => {
        const handler = (e) => {
            if (e.type === 'touchstart') e.preventDefault();
            copyIndividualToClipboard(btn.dataset.group);
        };

        btn.addEventListener('click', handler);
        btn.addEventListener('touchstart', handler, { passive: false });
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

    // Tactile feedback on mobile
    if ('vibrate' in navigator) {
        navigator.vibrate(15);
    }

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

    // Increment global count (background)
    incrementGlobalCount();
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

// Modal Logic
function openResetModal() {
    confirmModal.classList.add('show');
}

function closeResetModal() {
    confirmModal.classList.remove('show');
}

function confirmReset() {
    Object.keys(state.counts).forEach(key => {
        state.counts[key] = 0;
    });
    updateDisplay();
    renderSummary();
    saveToLocalStorage();
    closeResetModal();
}

// Format date as "D MMMM YYYY" (e.g., "2 December 2025")
function getFormattedDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

// Copy to clipboard
async function copyToClipboard() {
    let total = 0;
    const dateHeader = getFormattedDate();
    let text = `${dateHeader}\n\nAttendance Count:\n\n`;

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

// Copy individual group to clipboard
async function copyIndividualToClipboard(group) {
    const count = state.counts[group];
    const text = `${group}: ${count}`;

    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
        showToast(`Copied ${group} count!`);
    } catch (err) {
        console.error('Failed to copy individual:', err);
    }
}

// Show toast notification
function showToast(message = 'Copied to clipboard!') {
    const toastText = toast.querySelector('span');
    if (toastText) toastText.textContent = message;

    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Attach event listeners
function attachEventListeners() {
    // Use touchstart for mobile, click for desktop
    // This eliminates the 300ms delay on mobile devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        // Mobile: use touchstart for instant response
        btnIncrement.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent click event from firing
            increment();
        }, { passive: false });

        btnDecrement.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent click event from firing
            decrement();
        }, { passive: false });

        btnCopy.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent click event from firing
            copyToClipboard();
        }, { passive: false });

        btnReset.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent click event from firing
            openResetModal();
        }, { passive: false });

        ageButtons.forEach(btn => {
            btn.addEventListener('touchstart', (e) => {
                // Prevent default to stop mouse emulation (double firing)
                if (e.cancelable) e.preventDefault();
                changeGroup(btn.dataset.group);
            }, { passive: false });
        });

        // Modal buttons (touch)
        btnModalCancel.addEventListener('touchstart', (e) => {
            e.preventDefault();
            closeResetModal();
        }, { passive: false });

        btnModalConfirm.addEventListener('touchstart', (e) => {
            e.preventDefault();
            confirmReset();
        }, { passive: false });

    } else {
        // Desktop: use click events
        btnIncrement.addEventListener('click', increment);
        btnDecrement.addEventListener('click', decrement);
        btnCopy.addEventListener('click', copyToClipboard);
        btnReset.addEventListener('click', openResetModal);

        ageButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                changeGroup(btn.dataset.group);
            });
        });

        // Modal buttons (click)
        btnModalCancel.addEventListener('click', closeResetModal);
        btnModalConfirm.addEventListener('click', confirmReset);
    }

    // Close modal when clicking outside
    confirmModal.addEventListener('click', (e) => {
        if (e.target === confirmModal) {
            closeResetModal();
        }
    });

    // Keyboard shortcuts (desktop only)
    document.addEventListener('keydown', (e) => {
        if (e.key === '+' || e.key === '=') {
            increment();
        } else if (e.key === '-' || e.key === '_') {
            decrement();
        } else if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            copyToClipboard();
        } else if (e.key === 'Escape') {
            closeResetModal();
        }
    });
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
