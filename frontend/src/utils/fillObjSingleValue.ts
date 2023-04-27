const fillObjSingleValue = (obj: { [key: string]: any }, value: any) => {
  const result = obj;
  
  for (let item in result) {
    result[item] = value;
  }
  return result;
};

export default fillObjSingleValue;
