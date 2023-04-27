const ObjValueNotEmpty = (obj: { [key: string]: any }) => {
  const values = Object.values(obj);

  for (let item of values) {
    if (!item) return false;
  }

  return true;
};

export default ObjValueNotEmpty;
