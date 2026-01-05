export const evaluateExpression = (expr, isRadians = true) => {
  // Replace display symbols with JavaScript operators
  let expression = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, Math.PI.toString())
    .replace(/e/g, Math.E.toString());

  // Handle trigonometric functions with angle mode conversion
  expression = expression.replace(/sin\(/g, isRadians ? 'Math.sin(' : `Math.sin(${Math.PI}/180*`);
  expression = expression.replace(/cos\(/g, isRadians ? 'Math.cos(' : `Math.cos(${Math.PI}/180*`);
  expression = expression.replace(/tan\(/g, isRadians ? 'Math.tan(' : `Math.tan(${Math.PI}/180*`);
  expression = expression.replace(/sin⁻¹\(/g, isRadians ? 'Math.asin(' : `180/${Math.PI}*Math.asin(`);
  expression = expression.replace(/cos⁻¹\(/g, isRadians ? 'Math.acos(' : `180/${Math.PI}*Math.acos(`);
  expression = expression.replace(/tan⁻¹\(/g, isRadians ? 'Math.atan(' : `180/${Math.PI}*Math.atan(`);

  // Handle other functions
  expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');
  expression = expression.replace(/log\(/g, 'Math.log10(');
  expression = expression.replace(/ln\(/g, 'Math.log(');
  expression = expression.replace(/\^/g, '**');
  
  // Handle factorial
  expression = expression.replace(/factorial\((\d+)\)/g, (match, num) => {
    let n = parseInt(num);
    if (n < 0) throw new Error('Invalid factorial');
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result.toString();
  });

  // Handle percentage
  expression = expression.replace(/(\d+(?:\.\d+)?)%/g, (match, num) => {
    return (parseFloat(num) / 100).toString();
  });

  // Add missing closing parentheses for functions
  const openParens = (expression.match(/\(/g) || []).length;
  const closeParens = (expression.match(/\)/g) || []).length;
  if (openParens > closeParens) {
    expression += ')'.repeat(openParens - closeParens);
  }

  // Evaluate the expression
  try {
    // Use Function constructor for safe evaluation
    const result = Function('"use strict"; return (' + expression + ')')();
    
    if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
      return result;
    } else {
      throw new Error('Invalid result');
    }
  } catch (error) {
    console.error('Evaluation error:', error);
    throw new Error('Invalid expression');
  }
};

export const formatDisplay = (number) => {
  if (typeof number !== 'number') return number.toString();
  
  // Handle very small numbers
  if (Math.abs(number) < 1e-10 && number !== 0) {
    return '0';
  }
  
  // Handle very large or very small numbers with scientific notation
  if (Math.abs(number) > 1e12 || (Math.abs(number) < 1e-6 && number !== 0)) {
    return number.toExponential(10).replace(/(\.\d*?[1-9])0+e/, '$1e').replace(/(\.\d*?)0+$/, '$1');
  }
  
  // Format regular numbers
  let str = number.toString();
  
  // Remove unnecessary trailing zeros after decimal
  if (str.includes('.')) {
    str = str.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.$/, '');
  }
  
  // Limit to 12 digits for display
  if (str.length > 12) {
    if (str.includes('.')) {
      const [integer, decimal] = str.split('.');
      if (integer.length >= 12) {
        return parseFloat(number).toExponential(8);
      } else {
        const allowedDecimal = 12 - integer.length - 1;
        return parseFloat(number).toFixed(Math.min(allowedDecimal, 8));
      }
    } else {
      return parseFloat(number).toExponential(8);
    }
  }
  
  return str;
};