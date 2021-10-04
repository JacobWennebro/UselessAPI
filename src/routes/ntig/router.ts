import { Router } from "express";
import NTISchools from '../../data/ntischools.json';

export default (Router: Router) => {

    Router.get("/:path", async (req, res) => {
        const source = (await import("../../data/ntiemployees.json")).default;
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