import { Request, Response } from "express";

type headers = { [key: string]: string | number | readonly string[] };
type newObj = { name: string; value: string | number | readonly string[] };

class Cors {
  private headers: headers;

  constructor(headers: headers) {
    this.headers = headers;
  }

  private toArr() {
    let obj: newObj[] = [];

    for (let item in this.headers) {
      obj.push({
        name: item,
        value: this.headers[item],
      });
    }

    return obj;
  }

  setHeader() {
    return (req: Request<any>, res: Response<any>, next: Function) => {
      this.toArr().map((obj) => res.setHeader(obj.name, obj.value));
      next();
    };
  }
}

export default Cors;
