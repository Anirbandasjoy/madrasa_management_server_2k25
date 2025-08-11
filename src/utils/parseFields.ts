export function parseFields(
  fieldsStr?: string,
  ignoreStr?: string,
  alwaysIgnore: string[] = ['password']
): string {
  const fields = fieldsStr
    ? fieldsStr
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean)
    : null;

  const ignores = ignoreStr
    ? ignoreStr
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean)
    : [];

  alwaysIgnore.forEach((field) => {
    if (!ignores.includes(field)) {
      ignores.push(field);
    }
  });

  if (fields && fields.length > 0) {
    const included = fields.filter((f) => !alwaysIgnore.includes(f));
    return included.join(' ');
  } else if (ignores.length > 0) {
    return ignores.map((f) => '-' + f).join(' ');
  }

  return alwaysIgnore.map((f) => '-' + f).join(' ');
}
