// UserTaskNode.js
import { RectNode, RectNodeModel, h } from "@logicflow/core";
class DatasourceModel extends RectNodeModel {
	initNodeData(data) {
		// 初始化NodeModel时调用
		super.initNodeData(data);
		this.width = 50;
		this.height = 50;
		this.radius = 8;
		this.text.x = data.x;
		this.text.y = data.y + 50;
	}
}
class DatasourceView extends RectNode {
	getShape() {
		// 获取XxxNodeModel中定义的形状属性
		const { model } = this.props;
		const { x, y, width, height, radius } = model;
		// 获取XxxNodeModel中定义的样式属性
		const style = model.getNodeStyle();
		return h("g", {}, [
			h("rect", {
				...style,
				x: x - width / 2,
				y: y - height / 2,
				width,
				height,
				rx: radius,
				ry: radius
			}),
			h(
				"svg",
				{
					x: x - height / 2 + 8,
					y: y - height / 2 + 8,
					width: 36,
					height: 36,
					viewBox: "0 0 1028 1024"
				},
				[
					h("path", {
						fill: style.stroke,
						d: "M686.3 630.3V513.2c0-19.9-16.1-36-36-36s-36 16.1-36 36v101.1H136.7V136.7h477.6v98.8c0 19.9 16.1 36 36 36s36-16.1 36-36V120.7c0-30.9-25.1-56-56-56H120.7c-30.9 0-56 25.1-56 56v509.6c0 30.9 25.1 56 56 56h509.6c30.9 0 56-25.1 56-56z"
					}),
					h("path", {
						fill: style.stroke,
						d: "M903.8 337.8H394.2c-30.9 0-56 25.1-56 56v118c0 19.9 16.1 36 36 36s36-16.1 36-36v-102h477.6v477.6H410.2V784.6c0-19.9-16.1-36-36-36s-36 16.1-36 36v118.7c0 30.9 25.1 56 56 56h509.6c30.9 0 56-25.1 56-56V393.8c0-30.9-25.1-56-56-56z"
					})
				]
			)
		]);
	}
}
{
}
export default {
	type: "Datasource",
	view: DatasourceView,
	model: DatasourceModel
};
