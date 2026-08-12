

export const navigationTrait = {

    selector: '',

    getEl(){
        const el = document.createElement('div');
        document.querySelector(this.selector).replaceChildren(el);
        return el; 
    },


    to(pathOrName, allParams, hash){
        this.setHref(this.buildUrl(pathOrName, allParams, hash));
    },

    redirectTo(pathOrName, allParams = {}, hash = ''){
        this.redirect(this.buildUrl(pathOrName, allParams, hash));
    },

    buildUrl(pathOrName, allParams = {}, hash = ''){
        let pathname = pathOrName;
        const {params, queryParams} = allParams;
        route = this.getRouteByName(pathOrName);
        if(route){
            pathname = route.path;
            if(params) pathname = this.setParams(route.path, params);
        } 
        const url = new URL(location);
        url.pathname = pathname;
        url.search = this.setSearchParams(queryParams);
        url.hash = hash
        return url;
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
            searchParams.set(key, queryParams[key]);
        }
        return searchParams.toString();
    },

    setHash(hash){
        location.hash = hash;
    },

    redirect(link){
        // change the href
        history.replaceState({}, "",link);

        // navigate to destination
        this.reload();
    },

    setHref(link){

        // change the href
        history.pushState({}, "",link);

        // navigate to destination
        this.reload();
    },

    

}

