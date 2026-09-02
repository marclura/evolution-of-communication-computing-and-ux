setTimeout(() => {

    let counter = 0;
    let intervalId;

    // Get elements with null checks
    const binaryDisplay = document.getElementById('byteCounterBinary');
    const decimalDisplay = document.getElementById('byteCounterDecimal');
    const octalDisplay = document.getElementById('byteCounterOctal');
    const hexDisplay = document.getElementById('byteCounterHex');
    const stepButton = document.getElementById('byteCounterStep');
    const autoButton = document.getElementById('byteCounterAuto');
    const resetButton = document.getElementById('byteCounterReset');

    // Only proceed if all required elements exist
    if (!binaryDisplay || !decimalDisplay || !octalDisplay || !hexDisplay ||
        !stepButton || !autoButton || !resetButton) {
        console.warn('Counter elements not found in DOM');
        return;
    }

    function updateDisplay() {
        binaryDisplay.textContent = counter.toString(2).padStart(8, '0');
        decimalDisplay.textContent = counter;
        octalDisplay.textContent = counter.toString(8);
        hexDisplay.textContent = counter.toString(16).padStart(2, '0').toUpperCase();
    }

    function increment() {
        counter = counter > 254 ? 0 : counter + 1;
        updateDisplay();
    }

    function toggleAuto() {
        if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        } else {
        intervalId = setInterval(increment, 500);
        }
    }

    function resetCounter() {
        clearInterval(intervalId);
        intervalId = null;
        counter = 0;
        updateDisplay();
    }

    // Set up event listeners
    stepButton.addEventListener('click', increment);
    autoButton.addEventListener('click', toggleAuto);
    resetButton.addEventListener('click', resetCounter);

    updateDisplay();
}, 2000);