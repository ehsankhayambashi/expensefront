export function buttonDisable(...params: any[]): boolean {
  return !params.every((param) => param !== "" && param != undefined);
}
