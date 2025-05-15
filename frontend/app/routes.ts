import {type RouteConfig, route, layout} from "@react-router/dev/routes";

export default [
    route('','routes/root/log-in.tsx'),
    route('register','routes/root/register.tsx'),
    route('home','routes/home.tsx'),

    // Admin Layout and routes
    layout("routes/admin/admin-layout.tsx", [
        route('dashboard', 'routes/admin/dashboard.tsx'),
        route('all-users', 'routes/admin/all-users.tsx'),
        route('all-product', 'routes/admin/all-product.tsx'),
        route('all-categories', 'routes/admin/all-categories.tsx'),
        route('product/create', 'routes/admin/create-product.tsx'),
        route('category/create', 'routes/admin/create-category.tsx'),
        route("/product/:productId", "routes/admin/product-detail.tsx")
    ]),

    // Customer Layout and routes
    layout("routes/customer/customer-layout.tsx", [
        route('user-dashboard', 'routes/customer/user-dashboard.tsx'),
    ]),
]   satisfies RouteConfig;