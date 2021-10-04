import axios from 'axios';
import { JSDOM } from 'jsdom';
import NTIEmployee from '../classes/NTIEmployee';
import fs from 'fs';
import path from 'path';
import locations from '../data/ntischools.json';

export const interval = "0 0 * * sun";

export const job = async () => {

    const dataStore: NTIEmployee[] = [];

    for(const location of locations) {
        const html = await axios.get(`https://www.ntigymnasiet.se/${location}/kontakta-oss/`);
        const dom = new JSDOM(html.data).window.document;
    
        const employees = dom.querySelectorAll("article.pers-col");
    
        for(const employee of employees) {
            const job = (employee.querySelector("span.job-title") || {}).innerHTML;
            const name = (employee.querySelector("h3.pers-col-name") || {}).innerHTML;
            const image = employee.querySelector("img.personel-image");
            const email = (employee.querySelector("a.c-red") || {}).innerHTML;
            const phone = (employee.querySelector("span.p-large") || {}).innerHTML;

            if(!name || !job || !image) continue;
    
            const imageUrl = image.getAttribute("src") || "";
    
            dataStore.push(new NTIEmployee(name, {
                job,
                imageUrl,
                email,
                location,
                phone: phone ? phone.replace("Tel: ", "") : undefined
            }));
    
        }
    }

    fs.writeFileSync(path.join(__dirname, `../data/ntiemployees.json`), JSON.stringify(dataStore, null, 4));
    console.log("wrote to file");
}
