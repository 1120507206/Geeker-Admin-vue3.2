<template>
	<div class="">
		<div class="container" id="graph" ref="containerRef"></div>
	</div>
	<el-drawer v-model="drawer" title="标题" :direction="direction">
		<span> 这里写业务逻辑</span>
	</el-drawer>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";
import LogicFlow from "@logicflow/core";
// import UserTask from "./UserTaskNode.js";
import { UserTask, Datasource } from "./registerNode";
import { DndPanel, SelectionSelect, Menu } from "@logicflow/extension";
// 贝塞尔曲线
// document.querySelector('#graph')
LogicFlow.use(DndPanel);
LogicFlow.use(SelectionSelect);
LogicFlow.use(Menu);
let containerRef = ref();
let lf: any = null;

const patternItems = [
	//左侧菜单配置项

	{
		label: "选区",
		icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAOVJREFUOBGtVMENwzAIjKP++2026ETdpv10iy7WFbqFyyW6GBywLCv5gI+Dw2Bluj1znuSjhb99Gkn6QILDY2imo60p8nsnc9bEo3+QJ+AKHfMdZHnl78wyTnyHZD53Zzx73MRSgYvnqgCUHj6gwdck7Zsp1VOrz0Uz8NbKunzAW+Gu4fYW28bUYutYlzSa7B84Fh7d1kjLwhcSdYAYrdkMQVpsBr5XgDGuXwQfQr0y9zwLda+DUYXLaGKdd2ZTtvbolaO87pdo24hP7ov16N0zArH1ur3iwJpXxm+v7oAJNR4JEP8DoAuSFEkYH7cAAAAASUVORK5CYII=",
		callback: () => {
			lf.extension.selectionSelect.openSelectionSelect();
			lf.once("selection:selected", () => {
				lf.extension.selectionSelect.closeSelectionSelect();
			});
		}
	},
	{
		type: "UserTask",
		text: "文本编辑",
		label: "输入数据源",
		icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAm1JREFUWEfV10uoTWEUB/DfnVFehQExwsCjvPIakaIMRIqUFCIpykCZKBOlDBgoRRKKgQFRkolX8sgjIkoGQp5RHpnSuq2tfXf7nHPdzu1k1de3O/vb3399//Vf61unS4etq8P4/hsHJmEeJmI0RpXmIPE93pXmp7iFF60YbsbARixO4DGtNmrw/hVu4wqO1q2pc2AFtmFBH0EbfXYNB3G2vKDqwNZc1GbsHtttKrNRdSBiN7k/0fESEwqMqgNX+4H66nmaOjACn/uZgaYhCOwB2I8tbXakVyKMEKxKFtZiaT+k4ZnE6D5fVQO/cS8ZuIBfyUI7CtESrMfKMm7VgU8YmaBvcB43cSOr3L9EZVgKeiECfHx+/BXDG2XBAWxvgPIYEce3+FYasXxIaQzF/CbZtA87GzkQv+/JShibttO+Z5Hb1awSbsCxvHSiHIcI+3oPFDhxH1xK8OdYh+ONGAgRHsLepDrWzcDc0m1Y3IR17BQ34hNcxwPEc9jApH53MxGGA2FfcBInELGvs7IjBXDduilYnWNcLvgr/moWnMPyyi5B2zPEPXEfH5qIMAQY2pmGqTnHc9nuJqPdv1UdGIvDmTbtFGCxV2hhRx6o1oGZGbc1mQlz2uRFnDp6gVOIohaM1joQGtiMI/l+EYpRpbKVb3dwMYtYFLKwqIJRihtqoBDh5RTh6RJKpGN4PzjHoJxjyQ/8zDmeQ/nRJxa2rCTEHqFv1ZCE6B4hhPgwwxMArWx6pm/MszGr9EHTfqA3LdlHvC6N2DvYiREiblW4WvYDHW1Ky9R2rC2vi287+oFa3fw3f81aqb7P7zvOwB+xg5QhSCp0cgAAAABJRU5ErkJggg=="
	},
	{
		type: "Datasource",
		label: "关联",
		icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAa9JREFUWEftVzFOw0AQnPUXKJCAko4HIKhCSQEVSLlzCiJ6xA8gHSUSEhUIityeheiQQKIJFREPSIMogWd4kVGCDDi5iy8oKODSO+MZz+2tfYQxXzRmfXwY0FrvA9gAsBBo6jSKooNms/nk85y8gRcAMz4kF4aIdowxRy5cVs8bkOxGmqYrPsQiDBHtEVEFQIOZs0SdV6GBJEnunMwCgFKq9bcNaK3PAGwBqDPzuU+Ko14CBWDaWnvoI963Ccv2gK9oHjdUAnEcr4rIYhmhHKdDRG1jzPNQCSillojoPlC8R79i5vWhDHQn5Z6IlNqiPeXuNgUzv6fvvQR5A9baUsOqWq1WoihqZcKTaaA7ByppmsZJknzrl6AEumQD4JaZ60XN6BrFQQZ8un8yDIxomxV+jl1LcAJg2ydqF0ZElq217a+4gQZqtdq8iGSjdsolMKhORA/GmJsizEADIaK+3GADSqldInpk5mtf0TwuyMCPj2LXG/0byCcgIg1XYv3qfb+GrgdqrTcBXLhwnvVXZp799D/gIsZxPCcixwDWXFhHvQPgsndw+T2H08C3Kk1/AzfFbDDUuHpTAAAAAElFTkSuQmCC",
		className: "important-node"
	}
	// {
	// 	type: 'rect',
	// 	label: '系统任务',
	// 	icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==',
	// 	className: 'import_icon'
	// },
	// {
	// 	type: 'diamond',
	// 	label: '条件判断',
	// 	icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=',
	// },
	// {
	// 	type: 'circle',
	// 	text: '结束',
	// 	label: '结束节点',
	// 	icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAA1BJREFUOBFtVE1IVUEYPXOf+tq40Y3vPcmFIdSjIorWoRG0ERWUgnb5FwVhYQSl72oUoZAboxKNFtWiwKRN0M+jpfSzqJAQclHo001tKkjl3emc8V69igP3znzfnO/M9zcDcKT67azmjYWTwl9Vn7Vumeqzj1DVb6cleQY4oAVnIOPb+mKAGxQmKI5CWNJ2aLPatxWa3aB9K7/fB+/Z0jUF6TmMlFLQqrkECWQzOZxYGjTlOl8eeKaIY5yHnFn486xBustDjWT6dG7pmjHOJd+33t0iitTPkK6tEvjxq4h2MozQ6WFSX/LkDUGfFwfhEZj1Auz/U4pyAi5Sznd7uKzznXeVHlI/Aywmk6j7fsUsEuCGADrWARXXwjxWQsUbIupDHJI7kF5dRktg0eN81IbiZXiTESic50iwS+t1oJgL83jAiBupLDCQqwziaWSoAFSeIR3P5Xv5az00wyIn35QRYTwdSYbz8pH8fxUUAtxnFvYmEmgI0wYXUXcCCSpeEVpXlsRhBnCEATxWylL9+EKCAYhe1NGstUa6356kS9NVvt3DU2fd+Wtbm/+lSbylJqsqkSm9CRhvoJVlvKPvF1RKY/FcPn5j4UfIMLn8D4UYb54BNsilTDXKnF4CfTobA0FpoW/LSp306wkXM+XaOJhZaFkcNM82ASNAWMrhrUbRfmyeI1FvRBTpN06WKxa9BK0o2E4Pd3zfBBEwPsv9sQBnmLVbLEIZ/Xe9LYwJu/Er17W6HYVBc7vmuk0xUQ+pqxdom5Fnp55SiytXLPYoMXNM4u4SNSCFWnrVIzKG3EGyMXo6n/BQOe+bX3FClY4PwydVhthOZ9NnS+ntiLh0fxtlUJHAuGaFoVmttpVMeum0p3WEXbcll94l1wM/gZ0Ccczop77VvN2I7TlsZCsuXf1WHvWEhjO8DPtyOVg2/mvK9QqboEth+7pD6NUQC1HN/TwvydGBARi9MZSzLE4b8Ru3XhX2PBxf8E1er2A6516o0w4sIA+lwURhAON82Kwe2iDAC1Watq4XHaGQ7skLcFOtI5lDxuM2gZe6WFIotPAhbaeYlU4to5cuarF1QrcZ/lwrLaCJl66JBocYZnrNlvm2+MBCTmUymPrYZVbjdlr/BxlMjmNmNI3SAAAAAElFTkSuQmCC',
	// }
];

const init = () => {
	//初始化
	lf = new LogicFlow({
		container: containerRef.value,
		grid: true,
		edgeType: "bezier"
	});
	lf.register(UserTask);
	lf.register(Datasource);
	lf.extension.dndPanel.setPatternItems(patternItems);
	lf.on("node:click", (data: any) => {
		//节点单击事件
		drawer.value = true;
		console.log("节点单击 :>> ", data);
	});
	lf.render();
};

const drawer = ref(false);
const direction = ref("btt");

onMounted(() => {
	init();
});
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 600px;
	min-height: 600px;
}
.test-box {
	display: flex;
	justify-content: space-between;
	width: 600px;
	margin-top: 20px;
	.item {
		flex: 1; // text-align: center;

		// flex: 1
	}
}
</style>
