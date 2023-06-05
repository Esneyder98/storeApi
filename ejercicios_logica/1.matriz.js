class MyMatrix {
  constructor(matrix) {
    this.matrix = matrix;
  }

  dimension() {
    try {
      const calculateDimension = (arr) => {
        // Si no es un array, la dimensión es 0
        if (!Array.isArray(arr)) {
          return 0;
        }
        // Inicializamos en 1 para considerar la dimensión actual
        let maxDepth = 1;

        arr.forEach((item) => {
          // Calcula la dimensión de cada elemento interno
          const depth = 1 + calculateDimension(item);
          // Actualiza la mayor dimensión encontrada
          maxDepth = Math.max(maxDepth, depth);
        });

        return maxDepth;
      };

      return calculateDimension(this.matrix);
    } catch (error) {
      console.console.log("error: " + error.message);
    }
  }

  straight() {
    try {
      const dimensions = [];

      // Función recursiva para verificar las dimensiones del arreglo o matriz
      const checkDimensions = (arr, depth) => {
        // Si el elemento es un arreglo
        if (Array.isArray(arr)) {
          // Si la dimensión actual no ha sido registrada
          if (!dimensions[depth]) {
            // Se registra el tamaño de la dimensión actual
            dimensions[depth] = arr.length;
            // Si el tamaño de la dimensión actual no coincide con el tamaño anterior, retorna false
          } else if (dimensions[depth] !== arr.length) {
            return false;
          }
          // Verifica las dimensiones de cada elemento del arreglo
          return arr.every((item) => checkDimensions(item, depth + 1));
        }
        // Si el elemento no es un arreglo, retorna true
        return true;
      };
      // Llama a la función de verificación de dimensiones comenzando desde la profundidad 0
      return checkDimensions(this.matrix, 0);
    } catch (error) {
      console.console.log("error: " + error.message);
    }
  }

  compute() {
    try {
      let sum = 0;

      const calculateSum = (arr) => {
        arr.forEach((item) => {
          // Si el item es un array, llama recursivamente a la función para sumar los elementos internos
          if (Array.isArray(item)) {
            calculateSum(item);
          } else {
            // Si el item es un número, lo suma al total
            sum += item;
          }
        });
      };
      // Ejecutamos a la función para calcular la suma de todos los números en la matriz
      calculateSum(this.matrix);
      return sum;
    } catch (error) {
      console.console.log("error: " + error.message);
    }
  }
}
// Ejemplos de uso
const a = [1, 2];
const b = [
  [1, 2],
  [2, 4],
];
const c = [
  [1, 2],
  [2, 4],
  [2, 4],
];
const d = [
  [
    [3, 4],
    [6, 5],
  ],
];
const e = [
  [[1, 2, 3]],
  [
    [5, 6, 7],
    [5, 4, 3],
  ],
  [
    [3, 5, 6],
    [4, 8, 3],
    [2, 3],
  ],
];
const f = [
  [
    [1, 2, 3],
    [2, 3, 4],
  ],
  [
    [5, 6, 7],
    [5, 4, 3],
  ],
  [
    [3, 5, 6],
    [4, 8, 3],
  ],
];

console.log(new MyMatrix(a).dimension()); // 1
console.log(new MyMatrix(b).dimension()); // 2
console.log(new MyMatrix(c).dimension()); // 2
console.log(new MyMatrix(d).dimension()); // 3
console.log(new MyMatrix(e).dimension()); // 3
console.log(new MyMatrix(f).dimension()); // 3

console.log(new MyMatrix(a).straight()); // true
console.log(new MyMatrix(b).straight()); // true
console.log(new MyMatrix(c).straight()); // true
console.log(new MyMatrix(d).straight()); // true
console.log(new MyMatrix(e).straight()); // false
console.log(new MyMatrix(f).straight()); // true

console.log(new MyMatrix(a).compute()); // 3
console.log(new MyMatrix(b).compute()); // 9
console.log(new MyMatrix(c).compute()); // 15
console.log(new MyMatrix(d).compute()); // 18
console.log(new MyMatrix(e).compute()); // 70
// al sumar manualmente los valores nos da como resultado 74 no 66 como se observa en el enunciado
console.log(new MyMatrix(f).compute()); // 74
