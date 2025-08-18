import { contador } from "@app/Contador";

class ProgramRunner {
  run() {
    for (let i = 0; i < 12; i++) {
      try {
        contador.incrementar();
      } catch (e) {
        const error = e as Error;
        console.error(error.message);
      }
    }
  }
}

new ProgramRunner().run();
