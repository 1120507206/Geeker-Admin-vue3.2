// @see: http://eslint.cn

module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true
	},
	/* 指定如何解析语法 */
	parser: "vue-eslint-parser",
	/* 优先级低于 parse 的语法解析配置 */
	parserOptions: {
		parser: "@typescript-eslint/parser",
		ecmaVersion: 2020,
		sourceType: "module",
		jsxPragma: "React",
		ecmaFeatures: {
			jsx: true
		}
	},
	/* 继承某些已有的规则 */
	// extends: ["plugin:vue/vue3-recommended", "plugin:@typescript-eslint/recommended"],
	/*
	 * "off" 或 0    ==>  关闭规则
	 * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
	 * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
	 */
	rules: {
		"linebreak-style": [0, "error", "windows"]
		// eslint (http://eslint.cn/docs/rules)
	}
};
