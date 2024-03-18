const ClassifyIndex = () => 
    import(/* webpackChunkName: "inspiration" */ '@/views/Inspiration/classifyIndex.vue')

export default [
    {
        path: '/inspiration',
        name: 'Inspiration',
        redirect: { name: 'ClassifyIndex' },
        meta: {
            permission: 'inspiration-manager',
            nav: {
                icon: 'icon-file',
                title: '灵感库设置'
            },
            breadcrumb: {
                name: '灵感库',
                path: '/inspiration'
            }
        },
        children: [
            {
                path: 'classify',
                name: 'ClassifyIndex',
                component: ClassifyIndex,
                meta: {
                    permission: 'inspiration-manager',
                    nav: {
                        title: '类目列表'
                    },
                    breadcrumb: {
                        name: '类目列表',
                        path: '/inspiration/classify'
                    }
                },
            }
        ]
    }
]