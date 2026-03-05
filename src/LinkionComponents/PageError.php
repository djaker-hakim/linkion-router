<?php

namespace Linkion\Router\LinkionComponents;

use Closure;
use Illuminate\Contracts\View\View;
use Linkion\Core\LinkionComponent;


class PageError extends LinkionComponent
{
    public $ref = 'PageError';

    public $code;

    public $message;

    public function __construct($atts)
    {
        $this->code = $atts['code'] ?? 404;
        $this->message = $atts['message'] ?? "not_found";
    }

    /**
     * Get the view / contents that represent the linkion component.
     */
    public function render(): View|Closure|string
    {
        return $this->component('lnkn::components.page-error');
    }
}