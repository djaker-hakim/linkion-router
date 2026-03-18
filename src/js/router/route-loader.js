import { Route } from "./route";


export const routeLoader = {

    start(){
        this.readUrl();
        this.preload();
        window.addEventListener('popstate', () => {
            this.pathname + this.search == location.pathname + location.search ?
            this.hash = location.hash :
            this.reload();
        });
    },

    reload(){
        const from = new Route(this);
        
        this.readUrl();

        const to = new Route(this);

        // run guards before navigating
        if(!this.runGuards('before-navigation', to, from)){
            this.runGuards('cancel-navigation', to, from);
            return;
        }

        if(this.route){
            linkion.render(
                this.route.component,
                {
                    atts: this.route.atts, 
                    params: this.params, 
                    queryParams: this.queryParams 
                },
                this.getEl()).then(() => {
                    this.runGuards('after-navigation', to, from);
                });
        }else {
            let component = "page-error";
            let atts = {
                code: 404,
                message: "NOT_FOUND"
            };
            const route = this.getRouteByName('404-page');
            if(route){
                component = route.component;
                atts = route.atts
            }
            linkion.render(component, {atts}, this.getEl());
        }
    },

  

    preload(){
        let routes = [];
        this.component.routes.forEach(route => {
            route.preload ? routes.push(route) : '';
        });
        if(routes.length == 0 && this.component.routes.length < 5) routes = this.component.routes;
        for(let route of routes){
            linkion.render(
                route.component, 
                {
                    atts: route.atts
                }
            );
        }
    },
}
