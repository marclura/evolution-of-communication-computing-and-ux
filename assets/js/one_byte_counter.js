setTimeout(() => {

    let counter = 0;
    let intervalId;

    // Get elements with null checks
    const binaryDisplay = document.getElementById('byteCounterBinary');
    const ternaryDisplay = document.getElementById('byteCounterTernary');
    const decimalDisplay = document.getElementById('byteCounterDecimal');
    const octalDisplay = document.getElementById('byteCounterOctal');
    const hexDisplay = document.getElementById('byteCounterHex');
    const romanDisplay = document.getElementById('byteCounterRoman');
    const stepButton = document.getElementById('byteCounterStep');
    const autoButton = document.getElementById('byteCounterAuto');
    const resetButton = document.getElementById('byteCounterReset');

    // Only proceed if all required elements exist
    if (!binaryDisplay || !ternaryDisplay || !decimalDisplay || !octalDisplay || !hexDisplay || !romanDisplay ||
        !stepButton || !autoButton || !resetButton) {
        console.warn('Counter elements not found in DOM');
        return;
    }

    // Convert number to Roman numerals
    function toRoman(num) {
        if (num === 0) return '0';
        const romanNumerals = [
            { value: 100, symbol: 'C' },
            { value: 90, symbol: 'XC' },
            { value: 50, symbol: 'L' },
            { value: 40, symbol: 'XL' },
            { value: 10, symbol: 'X' },
            { value: 9, symbol: 'IX' },
            { value: 5, symbol: 'V' },
            { value: 4, symbol: 'IV' },
            { value: 1, symbol: 'I' }
        ];
        let result = '';
        for (let i = 0; i < romanNumerals.length; i++) {
            while (num >= romanNumerals[i].value) {
                result += romanNumerals[i].symbol;
                num -= romanNumerals[i].value;
            }
        }
        return result;
    }

    function updateDisplay() {
        binaryDisplay.textContent = counter.toString(2);
        ternaryDisplay.textContent = counter.toString(3);
        decimalDisplay.textContent = counter;
        octalDisplay.textContent = counter.toString(8);
        hexDisplay.textContent = counter.toString(16).toUpperCase();
        romanDisplay.textContent = toRoman(counter);
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
        intervalId = setInterval(increment, 2000);
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