export class MyService {
  private data: any;

  constructor() {
    this.data = { /* initial data */ };
  }

  getData() {
    return this.data;
  }

  updateData(newData: any) {
    this.data = newData;
  }
}