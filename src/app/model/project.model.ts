export class Project {
  id: number;
  name: string;
  num_execs: number;

  constructor() {
    this.name = '';
    this.num_execs = 1;
  }

  body() {
    const object = {
      id: this.id,
      name: this.name,
      'num_execs': this.num_execs
    };
    return JSON.stringify(object);
  }
}
