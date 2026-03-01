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
        $this->component = $parser->getRoute()['component'];
        $this->atts = $parser->getRoute()['atts'];
        $this->params = $parser->getParams();
        $this->queryParams = $request->query();

    }
}