class Calculator {
    constructor(previous_txt, current_txt) {
        this.previous_txt = previous_txt;
        this.current_txt = current_txt;
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined;
    }

    delete () {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay
        
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.current_txt.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null) {
            this.previous_txt.innerText = `${this.previousOperand} ${this.operation}`
        }
        else {
            this.previous_txt.innerText = ''
        }
    }
}


const number_btn = document.querySelectorAll('[data-number]')
const operation_btn = document.querySelectorAll('[data-operand]')
const equal_btn = document.querySelector('[data-equals]')
const delete_btn = document.querySelector('[data-delete]')
const allclear_btn = document.querySelector('[data-all-clear]')
const previous_txt = document.querySelector('[data-previous-operand]')
const current_txt = document.querySelector('[data-current-operand]')
const lightmode_btn = document.getElementById('light_btn')

let darkMode = localStorage.getItem("darkMode")

const calculator = new Calculator(previous_txt, current_txt)

number_btn.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()  
    })
})

operation_btn.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()  
    })
})

equal_btn.addEventListener ('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allclear_btn.addEventListener ('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

delete_btn.addEventListener ('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

const enableDarkMode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem("darkMode", "enabled")
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem("darkMode", "null")
}

lightmode_btn.addEventListener('click', () => {
    darkMode = localStorage.getItem("darkMode")
    if(darkMode !== "enabled") {
        enableDarkMode(darkMode)
    }
    else {
        disableDarkMode(darkMode)
    }
})