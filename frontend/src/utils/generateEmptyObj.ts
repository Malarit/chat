/**
 * @param keys from obj takes obj.values()
 */
const generateEmptyObj = (
  keys: string[] | { [key: string]: string },
  value: any
) => {
  return Array.isArray(keys)
    ? getObj(keys, value)
    : getObj(Object.values(keys), value);
};

function getObj(keys: string[], value: any) {
  const obj = new Object() as { [key: string]: any };

  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = value;
  }

  return obj;
}

export default generateEmptyObj;
