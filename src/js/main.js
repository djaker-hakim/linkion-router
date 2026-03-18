
import { coreRouterTrait } from "./router/core-router";
import { routeParser } from "./router/route-parser";
import { navigationTrait } from "./router/navigation";
import { routeLoader } from "./router/route-loader";
import { guards } from "./router/guards";

class Router {
    static traits = [
        coreRouterTrait,
        routeParser,
        navigationTrait,
        routeLoader,
        guards
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


