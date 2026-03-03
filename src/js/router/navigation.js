

export const navigationTrait = {

    selector: '',

    getEl(){
        const el = document.createElement('div');
        document.querySelector(this.selector).replaceChildren(el);
        return el; 
    },

    start(){
        this.readUrl();
        this.preload();
        window.addEventListener('popstate', () => {
            router.reload();
        });
    },
    // TODO in navigation file
    // replace(path, params){},     
    // href(uri){},                 // your existing one
    // setHash(hash){},             // update hash only

    to(pathOrName, allParams = {}, hash = ''){
        let pathname = pathOrName;
        const {params, queryParams} = allParams;
        route = this.getRouteByName(pathOrName);
        if(route){
            pathname = route.path;
            if(params) pathname = this.setParams(route.path, params);
        } 
        url = new URL(location);
        url.pathname = pathname;
        url.search = this.setSearchParams(queryParams);
        this.setHref(url);
    },

    
    forward(){
        history.forward();
    },

    back(){
        history.back();
    },

    go(delta){
        history.go(delta);
    },

    getRouteByName(name){
        let [route] = this.component.routes.filter((r) => {
            return r.name == name;
        });
        return route;
    },

    // TODO set url params for route nameing
    setParams(pattern, params){
        if(pattern.indexOf(':') == -1) return pattern;
        let path = pattern;
        for(let key of Object.keys(params)){
            path = path.replace(':' + key, params[key]);
        }
        return path;
    },

    setSearchParams(queryParams){
        const searchParams = new URLSearchParams();
        for (const key in queryParams) {
            searchParams.set(key, params[key]);
        }
        return searchParams.toString();
    },

    setHref(link){

        // change the href
        history.pushState({}, "",link);

        // navigate to destination
        this.reload();
    },

    reload(){
        this.readUrl();
        linkion.render(
            this.route.component,
            {
                atts: this.route.atts, 
                params: this.params, 
                queryParams: this.queryParams 
            },
            this.getEl());
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

