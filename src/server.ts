import app from "./app";
import AppDataSource from "./data-source";

(async () => {

  const PORT = process.env.PORT

  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  app.listen(PORT, () => {
    console.log(`Servidor executando in port ${PORT}`);
  });
})();