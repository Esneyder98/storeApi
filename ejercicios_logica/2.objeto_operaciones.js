class MyArray {
  constructor(string) {
    this.string = string;
  }

  // Verifica si la cadena cumple con el formato de una operación válida
  operation() {
    const operationRegex = /^(\([-+\/*\d\s.]+\)|-?\d+(\.\d+)?)(\s*[\+\-\*\/]\s*(\([-+\/*\d\s.]+\)|-?\d+(\.\d+)?))*$/;
    return operationRegex.test(this.string);
  }

  // Calcula el resultado de la operación
  compute() {
    if (!this.operation()) {
      return false;
    }

    try {
      const sanitizedString = this.string.replace(/\s/g, '');
      const result = this.evaluateExpression(sanitizedString);
      return result;
    } catch (error) {
      return false;
    }
  }

  // Evalúa una expresión matemática y devuelve su resultado
  evaluateExpression(expression) {
    // Resuelve todas las expresiones entre paréntesis
    while (expression.includes('(')) {
      expression = expression.replace(/\(([^\(\)]+)\)/g, (match, innerExpression) => {
        const innerResult = this.evaluateExpression(innerExpression);
        return innerResult.toString();
      });
    }

    // Evalúa las operaciones de multiplicación y división
    expression = this.evaluateParentheses(expression);
    expression = this.evaluateMultiplicationDivision(expression);

    // Evalúa las operaciones de suma y resta
    expression = this.evaluateAdditionSubtraction(expression);

    return expression;
  }

  // Resuelve las expresiones entre paréntesis
  evaluateParentheses(expression) {
    const parenthesesRegex = /\(([^\(\)]+)\)/;
    while (expression.match(parenthesesRegex)) {
      expression = expression.replace(parenthesesRegex, (match, innerExpression) => {
        const innerResult = this.evaluateExpression(innerExpression);
        return innerResult.toString();
      });
    }

    return expression;
  }

  // Resuelve las operaciones de multiplicación y división
  evaluateMultiplicationDivision(expression) {
    const multiplicationDivisionRegex = /-?\d+(\.\d+)?\s*[\*\/]\s*-?\d+(\.\d+)?/;
    while (expression.match(multiplicationDivisionRegex)) {
      expression = expression.replace(multiplicationDivisionRegex, (match) => {
        const result = this.calculateExpression(match);
        return result.toString();
      });
    }

    return expression;
  }

  // Resuelve las operaciones de suma y resta
  evaluateAdditionSubtraction(expression) {
    const additionSubtractionRegex = /-?\d+(\.\d+)?\s*[\+\-]\s*-?\d+(\.\d+)?/;
    while (expression.match(additionSubtractionRegex)) {
      expression = expression.replace(additionSubtractionRegex, (match) => {
        const result = this.calculateExpression(match);
        return result.toString();
      });
    }

    return expression;
  }

  // Calcula el resultado de una expresión matemática simple
  calculateExpression(expression) {
    const multiplicationDivisionRegex = /-?\d+(\.\d+)?\s*[\*\/]\s*-?\d+(\.\d+)?/;
    while (expression.match(multiplicationDivisionRegex)) {
      expression = expression.replace(multiplicationDivisionRegex, (match) => {
        const result = this.calculateMultiplicationDivision(match);
        return result.toString();
      });
    }

    const additionSubtractionRegex = /-?\d+(\.\d+)?\s*[\+\-]\s*-?\d+(\.\d+)?/;
    while (expression.match(additionSubtractionRegex)) {
      expression = expression.replace(additionSubtractionRegex, (match) => {
        const result = this.calculateAdditionSubtraction(match);
        return result.toString();
      });
    }

    return expression;
  }

  // Calcula el resultado de una operación de multiplicación o división
  calculateMultiplicationDivision(expression) {
    const operators = expression.match(/[\*\/]/g);
    const operands = expression.split(/[\*\/]/).map(parseFloat);

    let result = operands[0];
    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      const operand = operands[i + 1];

      switch (operator) {
        case '*':
          result *= operand;
          break;
        case '/':
          if (operand === 0) {
            throw new Error('Division by zero');
          }
          result /= operand;
          break;
        default:
          throw new Error('Invalid operator');
      }
    }

    return result;
  }

  // Calcula el resultado de una operación de suma o resta
  calculateAdditionSubtraction(expression) {
    const operators = expression.match(/[\+\-]/g);
    const operands = expression.split(/[\+\-]/).map(parseFloat);

    let result = operands[0];
    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      const operand = operands[i + 1];

      switch (operator) {
        case '+':
          result += operand;
          break;
        case '-':
          result -= operand;
          break;
        default:
          throw new Error('Invalid operator');
      }
    }

    return result;
  }
}

// Ejemplos prueba
const a = "Hello world";
const b = "2 + 10 / 2 - 20";
const c = "(2 + 10) / 2 - 20";
const d = "(2 + 10 / 2 - 20";


console.log(new MyArray(a).operation()); // false
console.log(new MyArray(b).operation()); // true
console.log(new MyArray(c).operation()); // true
console.log(new MyArray(d).operation()); // false


console.log(new MyArray(a).compute()); // false
console.log(new MyArray(b).compute()); // -13
console.log(new MyArray(c).compute()); // -14
console.log(new MyArray(d).compute()); // false
