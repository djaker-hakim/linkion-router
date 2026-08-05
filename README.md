# Linkion Router

**Linkion Router** is a lightweight, framework-agnostic Single Page Application (SPA) router for JavaScript and TypeScript, designed to work seamlessly with the **Linkion** ecosystem.

Unlike routers that are tightly coupled to a specific frontend framework, Linkion Router provides a flexible routing engine that works directly with **vanilla JavaScript** and **TypeScript**. This allows you to build applications using your preferred UI approach while maintaining complete control over navigation, route resolution, rendering, and application flow.

Built to integrate natively with the **Linkion Laravel backend**, Linkion Router simplifies communication between the client and server by supporting features such as authentication state checking, SPA fallback routing, and server-driven route data. Whether you're building a small application or a large-scale SPA, Linkion Router provides the tools needed to create a fast, predictable, and framework-independent routing experience.

## Key Features

- 🚀 **Framework-agnostic core** — No dependency on React, Vue, Angular, or any other UI library.
- 🔗 **Native Linkion integration** — Works seamlessly with Linkion-powered Laravel applications, including authentication (`router.auth.check`) and SPA fallback handling.
- ⚡ **Component preloading** — Preload route components before navigation for faster page transitions.
- 🛡️ **Navigation guards** — Protect routes using a familiar `next()`-based guard system with complete `to` and `from` route objects.
- 📈 **Built-in navigation progress bar** — Display loading progress with a customizable three-layer progress indicator (track, bar, and shimmer) through the `useNavigationProgress` hook.
- 🌐 **Rich URL utilities** — Easily access `host`, `pathname`, `hash`, `search`, `queryParams`, `params`, and other URL information through a consistent API.

Linkion Router is designed to remain minimal, extensible, and framework-independent while providing first-class integration with the Linkion backend ecosystem.


# Getting Started

This guide will help you install and configure **Linkion Router** in your Laravel application.

## Requirements

Before installing Linkion Router, ensure your project meets the following requirements:

- **PHP** 8.2 or later
- **Laravel** 12.x
- **Linkion** 1.0

## Installation

Install the package using Composer:

```bash
composer require djaker-hakim/linkion-router
```

# Setup

After installing Linkion Router, you'll need to generate your application router and include the required scripts in your application's layout.

## 1. Generate the Application Router

Create your router Component by running the following Artisan command:

```bash
php artisan make:linkion-router AppRouter
```

This command generates an `AppRouter` component that serves as the entry point for your application's routing configuration.

```php
<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Linkion\Core\LinkionComponent;
use Linkion\Router\Core\LinkionRouter;
use Linkion\Router\Core\ResolveRoute;

class AppRouter extends LinkionComponent implements LinkionRouter
{
    use ResolveRoute;

    public $routes;

    /**
     * Whether route components should be cached.
     */
    public $componentCached = false;

    /**
     * Frontend reference name.
     */
    public $ref = 'AppRouter';

    /**
     * Create a new router instance.
     */
    public function __construct(Request $request)
    {
        $this->init($request);
    }

    /**
     * Register application routes.
     */
    public function getRoutes(): array
    {
        return $this->routes = [
            // [
            //     'path' => '/home',
            //     'name' => 'home',
            //     'component' => 'home',
            //     'atts' => [
            //         'ref' => 'home',
            //     ],
            // ],
        ];
    }

    /**
     * Render the router component.
     */
    public function render(): View|Closure|string
    {
        return $this->component('components.app-router');
    }
}
```

and a view look's like this

```html
@lnknComponent
    <script @lnknAsset>
        let router = {};

        function routerInstance() {
            return new Router(linkion.AppRouter, '#app');
        }
    </script>

    <div id="app">
        <x-dynamic-component
            :$component
            :$atts
            :$params
            :$queryParams
        />
    </div>

    <script @lnknScript>
        document.addEventListener('linkion:ready', () => {
            router = routerInstance();
            router.start();

            //
        });
    </script>
@endlnknComponent
```

### How It Works

- `@lnknComponent` marks the file as a Linkion component.
- `routerInstance()` creates a new JavaScript `Router` instance using the backend `AppRouter` component and mounts it to the `#app` element.
- The `<div id="app">` element acts as the rendering container for all routed components.
- `<x-dynamic-component>` renders the component resolved by the router along with its attributes, route parameters, and query parameters.
- When the `linkion:ready` event is fired, the router is created and started by calling:

```javascript
router = routerInstance();
router.start();
```

---

## 2. Include the Required Scripts

Add the Linkion and Linkion Router scripts to the `<head>` section of your main layout.

```html
<x-linkion::scripts defer />
<x-lnkn::router-script />
```

> **Note**
>
> The `<x-linkion::scripts />` component loads the Linkion client runtime.  
> The `<x-lnkn::router-script />` component loads the Linkion Router client.

---

## 3. Mount the Router

Render your router component inside the `<body>` of your application.

```html
<x-app-router ref="appRouter" />
```

---

## Example Layout

A minimal application layout may look like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <x-linkion::scripts :alpine="true" defer />
    <x-lnkn::router-script />

    <style>
        html {
            scroll-behavior: smooth;
        }
    </style>

    <title>My Application</title>
</head>
<body>

    <x-app-router ref="appRouter" />

</body>
</html>
```

Once your router is mounted, you're ready to define your application's routes.



# Defining Routes

All application routes are registered inside the `getRoutes()` method of your `AppRouter` component.

The method returns an array of route definitions, where each route describes how a URL should be matched and which component should be rendered.

```php
public function getRoutes(): array
{
    return $this->routes = [
        [
            'path' => '/home',
            'name' => 'home',
            'component' => 'home',
            'atts' => [
                'ref' => 'ho'
            ]
        ],
        [
            'path' => '/about',
            'name' => 'about',
            'component' => 'about',
            'atts' => [
                'ref' => 'ab'
            ]
        ],
        [
            'path' => '/counter/:count',
            'name' => 'counter',
            'component' => 'counter',
            'atts' => [
                'ref' => 'counter1'
            ]
        ]
    ];
}
```

## Route Structure

A route is defined as an associative array containing one or more configuration options.

| Option | Required | Description |
|---------|:--------:|-------------|
| `path` | ✅ | The URL pattern that should match the route. |
| `name` | ✅ | A unique name used to identify the route. |
| `component` | ✅ | The Linkion component that will be rendered when the route matches. |
| `atts` | ❌ | Attributes passed to the rendered component. |

---

## Static Routes

Static routes match an exact URL.

```php
[
    'path' => '/home',
    'name' => 'home',
    'component' => 'home',
]
```

Navigating to:

```text
/home
```

renders the `home` component.

Another example:

```php
[
    'path' => '/about',
    'name' => 'about',
    'component' => 'about',
]
```

matches:

```text
/about
```

---

## Dynamic Route Parameters

Route parameters allow parts of the URL to become dynamic.

```php
[
    'path' => '/counter/:count',
    'name' => 'counter',
    'component' => 'counter',
]
```

The `:count` segment is treated as a route parameter.

For example:

```text
/counter/5
```

or

```text
/counter/100
```

will both match the route.

The router extracts the value and makes it available as a route parameter.

---

## Component Attributes

The optional `atts` array contains attributes that are passed directly to the rendered Linkion component.

```php
[
    'path' => '/home',
    'component' => 'home',
    'atts' => [
        'ref' => 'ho'
    ]
]
```

These attributes behave exactly as if they were written on the Linkion component itself.

---

## Route Order

Routes are evaluated from top to bottom.

Always place more specific routes before more general ones to ensure the correct route is matched.

---

## 404 (Not Found) Route

You can define a fallback component that is rendered when no route matches.

```php
[
    'component' => 'not-found-page',
    'name' => '404-page',
    'atts' => []
]
```

Unlike normal routes, a fallback route does not require a `path` but name must be `404-page`. It is used only when every other route fails to match.

---

## Example

```php
public function getRoutes(): array
{
    return [
        [
            'path' => '/',
            'name' => 'home',
            'component' => 'home',
        ],
        [
            'path' => '/about',
            'name' => 'about',
            'component' => 'about',
        ],
        [
            'path' => '/users/:id',
            'name' => 'user-profile',
            'component' => 'user-profile',
        ],
    ];
}
```

This configuration creates three routes:

- `/`
- `/about`
- `/users/{id}`

where `{id}` is a dynamic route parameter.

## Route Preloading

Linkion Router can preload route components to improve navigation performance in **Client-Side Rendering (CSR)** mode.

By default, the router automatically preloads the **first five routes** defined in the `getRoutes()` method. This helps reduce the loading time when users navigate to the most commonly accessed pages.

### Explicit Preloading

You can override this behavior and specify exactly which routes should be preloaded by adding the `preload` option to a route definition.

```php
[
    'path' => '/home',
    'name' => 'home',
    'component' => 'home',
    'preload' => true,
    'atts' => [
        'ref' => 'ho'
    ]
]
```

When `preload` is set to `true`, the route's component is loaded during the router's initialization instead of waiting for the user to navigate to it.

### When to Use Preloading

Preloading is recommended for:

- Landing pages
- Frequently visited pages
- Dashboard views
- Components that are likely to be opened immediately after the application loads

Avoid preloading components that are rarely visited or particularly large, as this may increase the application's initial loading time.

### Example

```php
public function getRoutes(): array
{
    return [
        [
            'path' => '/',
            'name' => 'home',
            'component' => 'home',
            'preload' => true,
        ],
        [
            'path' => '/dashboard',
            'name' => 'dashboard',
            'component' => 'dashboard',
            'preload' => true,
        ],
        [
            'path' => '/settings',
            'name' => 'settings',
            'component' => 'settings',
        ],
    ];
}
```

In this example:

- The **Home** and **Dashboard** components are preloaded when the router starts.
- The **Settings** component is loaded only when the user navigates to `/settings`.


# The Router Object

The `router` object is available on the frontend after the router has been initialized.

It provides methods for navigating between pages, interacting with the browser history, and performing redirects.

## `router.to()`

Navigate to a route by its **path** or **name**.

```javascript
router.to(pathOrName, allParams, hash)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `pathOrName` | `string` | The route path (e.g. `/home`) or the route name (e.g. `home`). |
| `allParams` | `object` | Contains route parameters (`params`) and query string parameters (`queryParams`). |
| `hash` | `string` | Optional URL hash (e.g. `#section` or `#information`). |

### Dynamic Route Parameters

For a route such as:

```php
[
    'path' => '/users/:id',
    'name' => 'user-profile',
    'component' => 'user-profile',
]
```

You can navigate using:

```javascript
router.to('/users/:id', {
    params: {
        id: 1
    }
});
```

or by route name:

```javascript
router.to('user-profile', {
    params: {
        id: 1
    }
});
```

This generates:

```text
/users/1
```

### Query Parameters

You can also include query string parameters.

```javascript
router.to('/home', {
    queryParams: {
        page: 2,
        search: 'Linkion'
    }
});
```

Result:

```text
/home?page=2&search=Linkion
```

### Route Parameters and Query Parameters

Both can be used together.

```javascript
router.to('/users/:id', {
    params: {
        id: 5
    },
    queryParams: {
        tab: 'profile'
    }
});
```

Result:

```text
/users/5?tab=profile
```

### Hash Fragments

The third argument adds a URL hash.

```javascript
router.to('/home', {}, '#information');
```

Result:

```text
/home#information
```

You can combine route parameters, query parameters, and a hash.

```javascript
router.to('/users/:id', {
    params: {
        id: 10
    },
    queryParams: {
        tab: 'settings'
    }
}, '#security');
```

Result:

```text
/users/10?tab=settings#security
```

---

## `router.setHref()`

Navigate by providing a complete URL.

```javascript
router.setHref(url)
```

Unlike `router.to()`, this method does not build the URL for you. You are responsible for supplying the complete URL, including any route parameters, query string, and hash.

```javascript
router.setHref('/users/5?tab=profile#security');
```

---

## Browser History

Linkion Router provides wrappers around the browser's History API.

### `router.forward()`

Moves forward one page in the browser history.

```javascript
router.forward();
```

Equivalent to:

```javascript
history.forward();
```

---

### `router.back()`

Moves back one page in the browser history.

```javascript
router.back();
```

Equivalent to:

```javascript
history.back();
```

---

### `router.go()`

Moves forward or backward by a specific number of entries.

```javascript
router.go(1);
```

```javascript
router.go(-1);
```

Equivalent to:

```javascript
history.go();
```

---

## Redirects

Redirect methods replace the current page instead of creating a new history entry.

### `router.redirectTo()`

Redirect to a route using the same syntax as `router.to()`.

```javascript
router.redirectTo(pathOrName, allParams, hash);
```

Example:

```javascript
router.redirectTo('home');

router.redirectTo('/users/:id', {
    params: {
        id: 3
    }
});
```

---

### `router.redirect()`

Redirect using a complete URL.

```javascript
router.redirect(url);
```

Example:

```javascript
router.redirect('/login?expired=true');
```

This method behaves like `router.setHref()`, except it performs a redirect instead of a standard navigation.

---

## Summary

| Method | Description |
|---------|-------------|
| `router.to()` | Navigate to a route by path or name. |
| `router.setHref()` | Navigate using a complete URL. |
| `router.back()` | Navigate to the previous history entry. |
| `router.forward()` | Navigate to the next history entry. |
| `router.go()` | Move through the history stack by a specified number of entries. |
| `router.redirectTo()` | Redirect to a route by path or name. |
| `router.redirect()` | Redirect using a complete URL. |


# Navigation Guards

Linkion Router provides a navigation guard system that allows you to intercept, cancel, or react to route navigation on the frontend.

Guards are registered as navigation hooks and can be used for authentication, authorization, analytics, logging, confirmation dialogs, and other navigation-related logic.

## Available Hooks

Linkion Router supports three navigation events:

| Event | Description |
|--------|-------------|
| `before-navigation` | Fired before navigation begins. Can prevent navigation. |
| `cancel-navigation` | Fired after a navigation has been cancelled. |
| `after-navigation` | Fired after the new page has been successfully loaded. |

---

## Registering a Guard

Use `router.addGuard()` to register a navigation hook.

```javascript
const id = router.addGuard(event, callback);
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `event` | The navigation hook (`before-navigation`, `cancel-navigation`, or `after-navigation`). |
| `callback` | The function executed when the event occurs. |

The method returns a unique guard ID that can later be used to remove the guard.

---

## Removing a Guard

To unregister a guard, pass its ID to `removeGuard()`.

```javascript
router.removeGuard(id);
```

---

## Guard Arguments

Every navigation callback receives the following arguments:

```javascript
(to, from, next)
```

| Argument | Description |
|----------|-------------|
| `to` | The destination route. |
| `from` | The current route being left. |
| `next` | Continues the navigation when called. |

---

## `before-navigation`

This hook executes **before** a route change.

It can decide whether navigation should continue or be cancelled.

To continue navigation, return `next()`.

```javascript
router.addGuard('before-navigation', (to, from, next) => {
    return next();
});
```

To cancel navigation, simply return `false`.

```javascript
router.addGuard('before-navigation', (to, from, next) => {
    if (!isAuthenticated()) {
        return false;
    }

    return next();
});
```

This is useful for:

- Authentication checks
- Authorization
- Unsaved form confirmation
- Validation before leaving a page

---

## `cancel-navigation`

This hook is triggered whenever navigation has been cancelled.

It receives the same arguments as `before-navigation`.

```javascript
router.addGuard('cancel-navigation', (to, from, next) => {
    console.log('Navigation cancelled.');
});
```

Typical use cases include:

- Displaying a notification
- Showing a login modal
- Logging cancelled navigations
- Restoring UI state

---

## `after-navigation`

This hook runs after the destination page has been successfully loaded.

```javascript
router.addGuard('after-navigation', (to, from, next) => {
    console.log('Navigation complete.');
});
```

Common use cases include:

- Sending analytics events
- Updating the document title
- Initializing page-specific JavaScript
- Restoring scroll position
- Tracking page views

---

## Example

```javascript
const guardId = router.addGuard('before-navigation', (to, from, next) => {

    if (!user.loggedIn) {
        return false;
    }

    next();

});

router.addGuard('cancel-navigation', (to, from) => {
    console.log(`Navigation to "${to.name}" was cancelled.`);
});

router.addGuard('after-navigation', (to, from) => {
    console.log(`Current route: ${to.path}`);
});
```

Later, if the guard is no longer needed:

```javascript
router.removeGuard(guardId);
```

---

## Summary

| Hook | When it Runs | Can Cancel Navigation |
|------|--------------|:---------------------:|
| `before-navigation` | Before navigation starts | ✅ Yes (`return false`) |
| `cancel-navigation` | After navigation has been cancelled | ❌ No |
| `after-navigation` | After the destination page has loaded | ❌ No |

# Backend Route Protection

> **Important**
>
> Frontend navigation guards are useful for controlling the user experience, but **they are not a security mechanism**. Since they execute in the browser, they can be bypassed by users or malicious scripts.
>
> To properly protect your application, sensitive pages and actions should always be secured on the **backend**.

Linkion Router integrates seamlessly with **Linkion Components**, allowing you to use Laravel middleware to protect routed components.

## Protecting a Component

Apply middleware directly in the component's constructor.

```php
use Linkion\Component;

class Dashboard extends Component
{
    public function __construct()
    {
        $this->middleware('auth');
    }
}
```

In this example, the `Dashboard` component is protected by Laravel's `auth` middleware. Any attempt to access the component without being authenticated will be handled by the middleware before the component is rendered.

## Why Use Backend Middleware?

Even if you have a frontend guard like this:

```javascript
router.addGuard('before-navigation', (to, from, next) => {

    if (!user.loggedIn) {
        return false;
    }

    next();

});
```

the user could still bypass this logic by:

- Modifying JavaScript in the browser
- Disabling the guard
- Making direct HTTP requests
- Calling your backend endpoints manually

Frontend guards improve the user experience by preventing unnecessary navigation, but they **cannot enforce security**.

## The Recommended Approach

For the best user experience **and** proper security, use both frontend guards and backend middleware together.

- **Frontend guards** provide instant feedback, confirmation dialogs, loading states, and client-side navigation control.
- **Backend middleware** enforces authentication, authorization, and access control on the server.

This layered approach ensures that even if the frontend is bypassed, your application's protected resources remain secure.

## Learn More

For more information about using middleware with Linkion Components, see the [Linkion Middleware](https://github.com/djaker-hakim/linkion#middleware) documentation.

# Conclusion

Congratulations! 🎉 You now have everything you need to start building single-page applications with **Linkion Router**.

Throughout this guide, you've learned how to:

- Install Linkion Router
- Configure the application router
- Register and render routes
- Navigate programmatically using the `router` object
- Improve performance with route preloading
- Control navigation with frontend guards
- Secure your application using backend middleware

Linkion Router is designed to provide a simple, lightweight, and framework-agnostic routing experience while integrating seamlessly with the Linkion. Whether you're building a small application or a large-scale SPA, it gives you full control over routing without locking you into a specific frontend framework.

As your application grows, you can continue to leverage Linkion Router's flexibility to organize routes, optimize navigation, and build responsive, secure user experiences.

Happy coding! 🚀