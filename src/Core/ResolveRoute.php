<?php

namespace Linkion\Router\Core;

use Illuminate\Http\Request;

trait ResolveRoute {


    public $component;
    public $atts;
    public $params;
    public $queryParams;

    protected function init(Request $request){

        $parser = new RouteParser($request->getPathInfo(), $this->getRoutes());
        
        $route = $parser->getRoute();
        if($route){

            $this->component = $route['component'];
            $this->atts = $route['atts'];
            $this->params = $parser->getParams();
            $this->queryParams = $request->query();
        
        }else {
            $this->component = 'page-error';
            $this->atts = [
                'code' => 404,
                'message' => "NOT_FOUND"
            ];
            $this->params = [];
            $this->queryParams = [];
            $route = $parser->getRouteByName("404-page");
            if($route){
                $this->component = $route['component'];
                $this->atts = $route['atts'] ?? [];
            }     
        }
    }

}