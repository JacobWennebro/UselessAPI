import Express from 'express';
import Cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import { off } from 'process';

const app = Express();
const api = Express.Router();

app.set("view engine", "ejs");

const dynamicDataPath = path.join(__dirname, "./data/dynamic");
if (!fs.existsSync(dynamicDataPath)) fs.mkdirSync(dynamicDataPath);


// API Web service
for (const route of fs.readdirSync(path.join(__dirname, "routes"))) {
    const RouteHandler = require(path.join(__dirname, `routes/${route}/router`)).default;
    api.use(`/${route}`, RouteHandler(Express.Router()));
}

// Cron jobs
for (const job of fs.readdirSync(path.join(__dirname, "cronjobs"))) {
    const CronJob = require(path.join(__dirname, `cronjobs/${job}`));
    Cron.schedule(CronJob.interval, CronJob.job);

    // Force run cronjob initially upon start
    CronJob.job();
}

app.use("/api", api);
app.get("/:page", (req, res) => res.redirect("/"));
app.use("/static", Express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
    const apiRoutes = fs.readdirSync(path.join(__dirname, "./routes"));
    res.render("index.ejs", {
        apiRoutes
    });
});

app.listen(process.env.WEB_PORT, () => {
    console.log(`Listening on port ${process.env.WEB_PORT}`);
});