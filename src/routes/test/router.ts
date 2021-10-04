import { Router } from "express";
import Hej from "./hej";

export default (Router: Router) => {

    Router.get("/hej", Hej);

    return Router;

}