const objFilledSingleValue = (obj: { [key: string]: any }, value: any) => {
  const values = Object.values(obj);

  for (let item of values) {
    if (item !== value) return false;
  }

  return true;
};

export default objFilledSingleValue;
