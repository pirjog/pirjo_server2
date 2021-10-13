const express = require("express");
const server = express();
server.use(express.json()); // middleware

const placesRouter = require("./routers/places");
server.use("/api/places", placesRouter);

const port = 3001; 
server.listen(port, (err) => {
    if (err) {
        console.log("Server failed to start!");
    } else {
        console.log("Server is running on port " + port);
    }
});
