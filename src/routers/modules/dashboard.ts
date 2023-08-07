import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

// dashboard 模块
const dashboardRouter: Array<RouteRecordRaw> = [
	{
		path: "/dashboard",
		component: Layout,
		redirect: "/dashboard/dataVisualize",
		meta: {
			title: "Dashboard"
		},
		children: [
			{
				path: "/dashboard/test",
				name: "test",
				component: () => import("@/views/dashboard/test/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "测试页",
					key: "test"
				}
			},
			{
				path: "/dashboard/codegeneration",
				name: "codegeneration",
				component: () => import("@/views/dashboard/codegeneration/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "代码生成",
					key: "codegeneration"
				}
			},
			{
				path: "/dashboard/dataVisualize",
				name: "dataVisualize",
				component: () => import("@/views/dashboard/dataVisualize/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "数据可视化",
					key: "dataVisualize"
				}
			},
			// {
			// 	path: "/dashboard/svgEdit",
			// 	name: "svgEdit",
			// 	component: () => import("@/views/dashboard/svgEdit/index.vue"),
			// 	meta: {
			// 		keepAlive: true,
			// 		requiresAuth: true,
			// 		title: "svg编辑器",
			// 		key: "svgEdit"
			// 	}
			// },
			{
				path: "/dashboard/logicFlow",
				name: "logicFlow",
				component: () => import("@/views/dashboard/logicFlow/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "流程图",
					key: "logicFlow"
				}
			},
			{
				path: "/dashboard/embedded",
				name: "embedded",
				component: () => import("@/views/dashboard/embedded/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "内嵌页面",
					key: "embedded"
				}
			}
		]
	}
];

export default dashboardRouter;
