import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "http";

let server: Server;


async function main() {
    try {
      await mongoose.connect(config.database_url as string);
      console.log('database connection success');
      server = app.listen(config.port, () => {
        console.log(`Example app listening on port ${config.port}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  main();



  //asynchronous code error
  process.on('unhandledRejection', (err)=>{
    console.log(`❤❤ unahandledRejection is detected , shutting down ...`, err);
    if(server){
      server.close(()=>{
        process.exit(1);
      })
    }
    process.exit(1)
  })



  //synchronous code error--process immediately off
  process.on('uncaughtException', () => {
    console.log(`😛😛 uncaughtException is detected , shutting down ...`);
    process.exit(1);
  });


 