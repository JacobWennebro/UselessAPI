import Express from 'express';
import Cron from 'node-cron';
import fs from 'fs';
import path from 'path';

const app = Express();
const api = Express.Router();

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
app.listen(process.env.WEB_PORT);