// export default (context) => {
//     context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
//     console.log('context.userAgent:', context.userAgent)
// }

export default ({ app, route, redirect }) => {
    // console.log('app:', app)
    // console.log('route:', route)
    // console.log('route.path:', route.path)
    // console.log('route.fullPath:', route.fullPath)

    if (route.path === '/login' || route.path === '/register') {
    } else {
        const token = sessionStorage.getItem('token')
        if (!token) {
            // return app.router.push('/login') //这个可以前后退
            // return app.router.replace('/login') //这个可以前后退
            return redirect('/login')   //这个不能前后退
        }
    }
}
