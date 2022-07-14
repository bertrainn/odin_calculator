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

    updateDisplay() {
        this.current_txt.innerText = this.currentOperand
        this.previous_txt.innerText = this.previousOperand
    }
}


const number_btn = document.querySelectorAll('[data-number]')
const operation_btn = document.querySelectorAll('[data-operand]')
const equal_btn = document.querySelector('[data-equals]')
const delete_btn = document.querySelector('[data-delete]')
const allclear_btn = document.querySelector('[data-all-clear]')
const previous_txt = document.querySelector('[data-previous-operand]')
const current_txt = document.querySelector('[data-current-operand]')

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