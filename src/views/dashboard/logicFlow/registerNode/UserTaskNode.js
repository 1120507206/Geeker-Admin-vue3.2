// UserTaskNode.js
import { RectNode, RectNodeModel, h } from "@logicflow/core";
class UserTaskModel extends RectNodeModel {
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
class UserTaskView extends RectNode {
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
						d: "M512.7 812.4c-194 0-364.5-52.1-415.3-125.3V767c0 86.8 186.3 157.5 415.3 157.5S928 853.8 928 767v-80c-50.8 73.2-221.3 125.4-415.3 125.4z m0-170.7c-194 0-364.5-52.1-415.3-125.3v79.9c0 86.8 186.3 157.5 415.3 157.5S928 683.2 928 596.4v-79.9c-50.8 73.1-221.3 125.2-415.3 125.2z m0-170.6c-194 0-364.5-52.1-415.3-125.3v79.9c0 86.8 186.3 157.5 415.3 157.5S928 512.6 928 425.8v-79.9C877.2 419 706.7 471.1 512.7 471.1zM216.8 365.2c78.9 30.6 184 47.5 295.9 47.5 229 0 415.2-70.7 415.2-157.5S741.6 97.7 512.7 97.7 97.5 168.3 97.5 255.2c0 41 42.4 80.1 119.3 110z"
					})
				]
			)
		]);
	}
}

export default {
	type: "UserTask",
	view: UserTaskView,
	model: UserTaskModel
};
