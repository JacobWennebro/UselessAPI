import Express from 'express';
import fs from 'fs';
import path from 'path';

const app = Express();
const api = Express.Router();

(async () => {
    for(const route of fs.readdirSync(path.join(__dirname, "routes"))) {
    
        const RouteHandler = (await import(path.join(__dirname, `routes/${route}/router`))).default;
        api.use(`/${route}`, RouteHandler(Express.Router()));
    
    }
})();

app.use("/api", api);
app.listen(process.env.WEB_PORT);