<template>
	<div class="table-box">
		<div class="card table-search">
			<el-form ref="formRef" :model="searchParam" :inline="true" label-width="100px">
				<el-form-item label="用户姓名 :">
					<el-input v-model="searchParam.name" placeholder="请输入" clearable></el-input>
				</el-form-item>
			</el-form>
			<div class="search-operation">
				<el-button type="primary" :icon="Search" @click="search">搜索</el-button>
				<el-button :icon="Delete" @click="reset">重置</el-button>
				<el-button :icon="Delete" @click="addUser">新增</el-button>
			</div>
		</div>
		<div class="card table-box">
			<div class="table-header"></div>
			<el-table height="575" :data="tableData" :border="true">
				<el-table-column prop="name" label="用户姓名" show-overflow-tooltip></el-table-column>
				<el-table-column prop="age" label="用户年龄" show-overflow-tooltip></el-table-column>
				<el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
				<el-table-column prop="info" label="备注" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" fixed="right" width="330" v-slot="scope">
					<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
					<el-button type="primary" link :icon="EditPen" @click="showCode()">代码设置</el-button>
					<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
				</el-table-column>
			</el-table>
			<el-pagination
				:currentPage="pageable.pageNum"
				:page-size="pageable.pageSize"
				:page-sizes="[10, 25, 50, 100]"
				background
				layout="total, sizes, prev, pager, next, jumper"
				:total="pageable.total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			></el-pagination>
		</div>
		<!-- 新增编辑弹窗 -->
		<el-drawer :title="drawerTitle" v-model="drawerVisible" size="50%" direction="rtl">
			<el-form ref="formRef" :model="form" label-width="100px">
				<el-form-item label="用户姓名" prop="name">
					<el-input v-model="form.name" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item label="用户年龄" prop="age">
					<el-input v-model="form.age" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="form.address" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="info">
					<el-input v-model="form.info" placeholder="请输入" clearable></el-input>
				</el-form-item>
			</el-form>
			<div class="drawer-footer">
				<el-button type="primary" @click="submitForm">提交</el-button>
				<el-button @click="drawerVisible = false">取消</el-button>
			</div>
		</el-drawer>
		<codeGeneratorTableConfigForm ref="codeGeneratorTableConfigFormRef" />
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useTable } from "@/hooks/useTable";
import codeGeneratorTableConfigForm from "./components/form/code-generator-table-config-form.vue";
import { Delete, Search, EditPen } from "@element-plus/icons-vue";
import { useHandleData } from "@/hooks/useHandleData";
import { ElMessage } from "element-plus";
import { getTaskList, deleteTask, addTask, editTask } from "@/api/modules/task";
// 表格 hooks
const { tableData, pageable, searchParam, getTableList, search, reset, handleSizeChange, handleCurrentChange } =
	useTable(getTaskList);

// 删除用户信息
const deleteAccount = async (params: any) => {
	await useHandleData(deleteTask, { id: [params.id] }, `删除【${params.name}】用户`);
	getTableList();
};
const drawerTitle = ref("新增");
const addUser = () => {
	console.log("新增");
	drawerTitle.value = "新增";
	resetForm();
	drawerVisible.value = true;
};
//-----------------代码生成器相关-----------------
const codeGeneratorTableConfigFormRef = ref();
const showCode = () => {
	codeGeneratorTableConfigFormRef.value.showModel();
};

//---基本弹窗相关---------
const drawerVisible = ref(false);
const form = reactive({
	name: "",
	age: "",
	address: "",
	info: ""
});
const submitForm = () => {
	console.log(form);
	drawerVisible.value = false;
	if (drawerTitle.value == "新增") {
		poastAddTask();
	} else {
		editeditTask();
	}
};
const poastAddTask = async () => {
	await addTask(form);
	ElMessage.success("新增成功");
	getTableList();
};
const openDrawer = (title: string, row: any) => {
	drawerTitle.value = title;
	drawerVisible.value = true;
	form.name = row.name;
	form.age = row.age;
	form.address = row.address;
	form.info = row.info;
	form.id = row.id;
	// editeditTask()
};
const editeditTask = async () => {
	await editTask(form);
	ElMessage.success("编辑成功");
	getTableList();
};
const resetForm = () => {
	form.name = "";
	form.age = "";
	form.address = "";
	form.info = "";
	delete form.id;
};
</script>

<style lang="scss" scoped></style>
