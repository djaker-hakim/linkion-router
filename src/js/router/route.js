
export class Route {

    constructor(router){
        
        // based information
        this.origin = router.origin;
        this.pathname = router.pathname;
        this.search = router.search;
        this.hash = router.hash;
        this.href = router.href;

        //  parameters
        this.params = router.params
        this.queryParams = router.queryParams
        this.allParams = router.allParams

        // source route
        this.route = router.route;

    }

}