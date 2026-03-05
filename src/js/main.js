
import { coreRouterTrait } from "./router/core-router";
import { routeParser } from "./router/route-parser";
import { navigationTrait } from "./router/navigation";
import { routeLoader } from "./router/route-loader";

class Router {
    static traits = [
        coreRouterTrait,
        routeParser,
        navigationTrait,
        routeLoader
    ];

    static register(...traits){
        this.constructor.traits.push(...traits);
    }
    // linkion Router class builder
    constructor(lnkn, selector){
        Object.assign(this, ...this.constructor.traits);
        this.component = lnkn;
        this.selector = selector;
        // init 
    }
}

window.Router = Router;


