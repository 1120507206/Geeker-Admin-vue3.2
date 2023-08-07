<template>
	<el-dialog v-model="dialogVisible" title="代码配置" width="70%">
		<el-tabs v-model="activeName" class="demo-tabs">
			<el-tab-pane label="字段列表" name="first">
				<codeGeneratorTableConfigFormTableField ref="fieldRef" />
			</el-tab-pane>
			<el-tab-pane label="Config" name="second">Config</el-tab-pane>
			<!-- <el-tab-pane label="Role" name="third">Role</el-tab-pane>
			<el-tab-pane label="Task" name="fourth">Task</el-tab-pane> -->
		</el-tabs>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogVisible = false"> 确定 </el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import CodeGeneratorTableConfigFormField from "./code-generator-table-config-form-field.vue";
import codeGeneratorTableConfigFormTableField from "./code-generator-table-config-form-table-field.vue";
const dialogVisible = ref(false);
const showModel = () => {
	dialogVisible.value = true;
};

const activeName = ref("first");
defineExpose({
	showModel
});
</script>

<style lang="scss" scoped></style>
