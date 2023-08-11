const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

app.use(express.json());

const path = require("path");
const dbpath = path.join(__dirname, "moviesData.db");

db = null;
const iniiatializeDBandSerer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("sucess");
    });
  } catch (error) {
    console.log(`DB ERROR ${error.message}`);
    process.exit(1);
  }
};
iniiatializeDBandSerer();

app.get("/movies/", async (request, response) => {
  const query = `
    SELECT * FROM movie;`;
  const movieList = await db.all(query);
  response.send(movieList);
});

app.post("/movies/", async (request, response) => {
  details = request.body;
  const { directorId, movieName, leadActor } = details;
  const query = `
    insert into movie (director_id,movie_name,lead_actor) values (${directorId},'${movieName}','${leadActor}');`;
  const movieList = await db.run(query);
  response.send("Movie Sucessfully Added");
});
