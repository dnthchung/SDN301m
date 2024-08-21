// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// declare const module: any;

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(9999);

//   if (module.hot) {
//     module.hot.accept();
//     module.hot.dispose(() => app.close());
//   }
// }
// bootstrap();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import mongoose from "mongoose";

declare const module: any;

async function bootstrap() {
  try {
    // Create the NestJS application
    const app = await NestFactory.create(AppModule);

    // Start listening on port 9999
    await app.listen(9999, () => {
      console.log("Application is running on http://localhost:9999");
    });

    // Check the MongoDB connection status
    mongoose.connection.once("open", () => {
      console.log("Connected to the database successfully!");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Database connection error:", err);
    });

    // Hot Module Replacement (for development)
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (error) {
    console.error("Error starting the application:", error);
  }
}

bootstrap();
