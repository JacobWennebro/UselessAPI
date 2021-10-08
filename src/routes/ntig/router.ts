import { Router } from "express";
import NTISchools from '../../data/ntischools.json';
import fs from 'fs';
import { join } from 'path';
import showdown from 'showdown';

export default (Router: Router) => {

    const Converter = new showdown.Converter();

    Router.get("/", (req, res) => {
        res.render("docs.ejs", {
            html: Converter.makeHtml(fs.readFileSync(join(__dirname, "../../markdown/nti.md")).toString()),
            description: "An API retrieving all personnel working at NTI Gymnasiet-schools all across Sweden."
        });
    });

    Router.get("/:path", async (req, res) => {
        const sourcePath = join(__dirname, "../../data/dynamic/ntiemployees.json");

        if(!fs.existsSync(sourcePath)) return res.json({
            error: true,
            message: `Internal server error`,
            response: null
        });

        const source = (await import(sourcePath)).default;
        const path = req.params.path.toLowerCase();

        let data = {
            error: true,
            message: `Invalid endpoint - /${path}`,
            response: null
        };

        if(NTISchools.includes(path) || path === "all") {
            data.response = (path === "all") ? source : source.filter(e => e.location === path);
            data.error = false;
            data.message = `Found ${data.response?.length} records of NTI employees indexing ${path}`;
        }

        res.json(data);
    
    });

    return Router;

}