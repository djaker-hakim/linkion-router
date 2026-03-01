

export const navigationTrait = {

    selector: '',

    getEl(){
        const el = document.createElement('div');
        document.querySelector(this.selector).replaceChildren(el);
        return el; 
    },
    // TODO in navigation file
    // replace(path, params){},     
    // href(uri){},                 // your existing one
    // setHash(hash){},             // update hash only

    to(pathname, queryParams = {}, hash = ''){
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
            console.log(route);
            linkion.render(
                route.component, 
                {
                    atts: route.atts
                }
            );
        }
    },


}

