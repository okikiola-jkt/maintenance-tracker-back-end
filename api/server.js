const express = require("express");
const maintenanceTrackerRoutes = require("./src/admin/routes");

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.use("/api/v1/maintenanceTracker", maintenanceTrackerRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));