// @see: https://stylelint.io

module.exports = {
	/* 继承某些已有的规则 */
	extends: [],
	overrides: [
		// 扫描 .vue/html 文件中的<style>标签内的样式
		{
			files: ["**/*.{vue,html}"],
			customSyntax: "postcss-html"
		}
	],
	/**
	 * null  => 关闭该规则
	 */
	rules: {}
};
