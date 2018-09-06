const regProducer = (): RegExp =>
  /^<([a-z]+)([^>]*?)(\/?>|(>([\s\S]*?)<\/\1>))$/i;
export default function matchEl(
  input: string
): {
  tag: string;
  attributes: string;
  innerHTML: string;
} | null {
  const result = input.match(regProducer());
  if (!result) {
    return null;
  }
  return {
    tag: result[1],
    attributes: result[2] || "",
    innerHTML: result[5] || ""
  };
}
