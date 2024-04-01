export function formatRoutes(routes, permissions) {
  console.log("格式化路由前，原始路由:", routes, "当前用户权限:", permissions);
  const formattedRoutes = filterNavRoutes(filterPermissionRoutes(routes, permissions));
  console.log("格式化路由后，过滤应用:", formattedRoutes);
  return formattedRoutes;
}

export function filterPermissionRoutes(routes, permissions) {

  console.log("过滤前的路由:", routes);
  console.log("用户的权限:", permissions);



  const filterRoutes = []
  routes.forEach((data) => {
    const route = { ...data }
    const notPermission = !route.meta || !route.meta.permission
    const hasPermission = !notPermission && route.meta.permission.split(',').some((item) => {
      return permissions.includes(item);
    });
    const passPermission = notPermission || hasPermission
    let hasPath = true
    if (route.children) {

      console.log(`处理子路由前: ${route.path}`);


      route.children = filterPermissionRoutes(data.children, permissions)

      console.log(`处理子路由后: ${route.path}, 子路由:`, route.children);

      if (route.children.length === 0) {
        hasPath = false
      }
    }
    if (passPermission && hasPath) {
      filterRoutes.push(route)
    }
  })


  console.log("过滤后的路由:", filterRoutes);


  return filterRoutes
}

export function filterNavRoutes(routes) {

  console.log("导航过滤前的路由:", routes);

  let result = []
  routes.forEach((data) => {
    if (data.meta && data.meta.nav) {
      let item = {
        name: data.name,
        meta: data.meta
      }
      if (data.children) {
        item.children = filterNavRoutes(data.children)
      }
      result.push(item)
    } else if (data.children) {
      filterNavRoutes(data.children).forEach((item) => {
        result.push(item)
      })
    }
  })

  console.log("导航过滤后的路由:", result);

  return result
}
