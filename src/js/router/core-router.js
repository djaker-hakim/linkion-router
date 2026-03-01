
export const coreRouterTrait = {

    origin: "",
    pathname: "",
    hash: "",          
    search: "",
    queryParams: {},
    href: "",

    readBaseUrl(){
        const loc = window.location;
        this.origin = loc.origin;
        this.pathname = loc.pathname;
        this.hash = loc.hash;
        this.search = loc.search;
        this.href = loc.href;
        this.queryParams = Object.fromEntries((new URLSearchParams(this.search)).entries());
    }
}