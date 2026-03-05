

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
        url.hash = hash
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

    setHash(hash){
        location.hash = hash;
    },

    setHref(link){

        // change the href
        history.pushState({}, "",link);

        // navigate to destination
        this.reload();
    },

    

}

