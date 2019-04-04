import { fstat } from "fs";
import { callbackify } from "util";

class Store {
  constructor(rootDirectory){
    this.rootDirectory = rootDirectory;
  }
  // create(obj, cb){
  //   creat uuid
  //   fstat.write
  //   callbackify(err, obj w id)
  // }
}
