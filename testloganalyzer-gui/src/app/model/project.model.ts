export class Project {
  id: number;

  assigned_ids: number[];
  name: string;
  num_execs: number;
  recently_deleted: number;

  constructor() {
    this.assigned_ids = [];
    this.name = '';
    this.num_execs = 0;
    this.recently_deleted = -1;
  }

  body() {
    const object = {
      id: this.id,
      'assigned_ids': this.assigned_ids,
      name: this.name,
      'num_execs': this.num_execs,
      'recently_deleted': this.recently_deleted
    };
    return JSON.stringify(object);
  }
}
