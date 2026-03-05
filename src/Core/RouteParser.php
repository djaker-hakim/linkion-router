<?php

namespace Linkion\Router\Core;

class RouteParser {

protected $routes;

protected $pathname;

protected $route;
protected $params = [];

public function __construct($pathname, $routes)
{
    $this->routes = $routes;
    $this->pathname = $pathname;
    $this->route = $this->checkRoutes();
    if($this->route) $this->params = $this->getParamsFromRoute($this->route['path'], $this->pathname);
}

public function getRoute(): array|null{
    return $this->route;
}

public function getRouteByName(string $name): ?array{
    foreach($this->routes as $route){
        if(!isset($route['name'])) continue;
        if($route['name'] == $name) return $route;
    }
    return null;
}

public function getParams(): array{
    return $this->params;
}

protected function checkRoutes(): array|null{
    foreach($this->routes as $route){
        if($this->matchRoute($route)) return $route;
    }
    return null;
}


protected function matchRoute(array $route): ?array{
    if(!isset($route['path'])) return null;
    if($route['path'] == $this->pathname) return $route;
    if($this->getParamsFromRoute($route['path'], $this->pathname)) return $route;
    return null;
}

protected function getParamsFromRoute(string $pattern, string $path): array|null {
    $paramNames = [];

    // Escape slashes and replace :param with capture groups
    $regexPattern = preg_replace_callback(
        '/:(\w+)/',
        function ($matches) use (&$paramNames) {
            $paramNames[] = $matches[1];
            return '([^/]+)';
        },
        str_replace('/', '\\/', $pattern)
    );
    

    
    // Match the path against the pattern
    // Use # as delimiter to avoid conflicts with slashes
    if (!preg_match('#^' . $regexPattern . '$#', $path, $matches)) {
        return null;
    }
    
    // Map param names to matched values
    $params = [];
    foreach ($paramNames as $index => $name) {
        $params[$name] = $matches[$index + 1];
    }

    return $params;
}
}