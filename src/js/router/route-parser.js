

export const routeParser = {

    component: null,
    params: {},
    allParams: {},
    route: {},

    readUrl(){
        this.readBaseUrl();
        this.route = this.checkRoutes();
        if(this.route){
            this.params = this.getParamsFromRoute(this.route.path, this.pathname);
            this.allParams = {
                ...this.params,
                ...this.queryParams
            }
        }
    },

    checkRoutes(){
        for(route of this.component.routes){
            if(this.matchRoute(route)) return route;
        }
        return null;
    },

    matchRoute(route){
        if(!route.path) return null; // to avoid custom error routes
        if(route.path == this.pathname) return route;
        if(this.getParamsFromRoute(route.path, this.pathname)) return route;
        return null;
    },

    getParamsFromRoute(pattern, path){
        // Convert pattern to regex
        // Escape special regex characters except ':'
        const paramNames = [];
        
        // Extract parameter names
        const regexPattern = pattern
            .replace(/\//g, '\\/') // Escape slashes
            .replace(/:(\w+)/g, (_, paramName) => {
            paramNames.push(paramName);
            return '([^/]+)'; // Match any characters except slash
            });
        
        // Create regex with start and end anchors
        const regex = new RegExp(`^${regexPattern}$`);
        
        // Try to match the path
        const match = path.match(regex);
            if (!match) return null; // No match

        const params = {};
        paramNames.forEach((name, index) => {
            params[name] = match[index + 1];
        });
        return params
    },

    getRouteByName(name){
        let [route] = this.component.routes.filter((r) => {
            return r.name == name;
        });
        return route;
    },
        



}