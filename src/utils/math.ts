export function degToRad(degrees: number) {
  return degrees * (Math.PI / 180);
}

export function sin(degrees: number, fixedDigits = 3) {
  const result = Math.sin(degToRad(degrees));

  return parseFloat(result.toFixed(fixedDigits));
}

export function cos(degrees: number, fixedDigits = 3) {
  const result = Math.cos(degToRad(degrees));

  return parseFloat(result.toFixed(fixedDigits));
}

export function polarToCartesian(degrees: number, radius: number) {
  const x = cos(degrees) * radius,
    y = sin(degrees) * radius;

  return { x, y };
}
