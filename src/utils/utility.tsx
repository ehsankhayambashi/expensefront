export function buttonDisable(...params: any[]): boolean {
  console.log(params);
  return !params.every((param) => param !== "" && param != undefined);
}
