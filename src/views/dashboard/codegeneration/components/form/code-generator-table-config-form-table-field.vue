<template>
	<el-table :data="tableData" style="width: 100%">
		<el-table-column type="index" width="80" />
		<el-table-column v-for="item in columns" :key="item.title" :prop="item.dataIndex" :label="item.title" :width="item.width">
			<template #default="scope">
				<el-checkbox v-model="scope.row.showFlag" v-if="item.dataIndex == 'showFlag'" size="large" />
				<el-input v-model="scope.row.label" v-if="item.dataIndex == 'label'" />
				<el-input v-model="scope.row.fieldName" v-if="item.dataIndex == 'fieldName'" />
				<el-input v-model="scope.row.width" v-if="item.dataIndex == 'width'" />
				<el-switch
					v-model="scope.row.ellipsisFlag"
					size="large"
					v-if="item.dataIndex == 'ellipsisFlag'"
					active-text="自动省略"
					inactive-text="换行展示"
				/>
			</template>
			<!-- <template #default="scope" v-if="item.dataIndex == 'label'">
				<el-input v-model="scope.row.label" />
			</template> -->
		</el-table-column>
	</el-table>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
//------------------------ 表格渲染 ---------------------
const columns = ref([
	// {
	// 	title: '序号',
	// 	type: 'index',
	// 	width: 80,
	// },
	{
		title: "列名",
		dataIndex: "columnName",
		// width: 120,
		ellipsis: true
	},
	{
		title: "列描述",
		dataIndex: "columnComment",
		width: 120,
		ellipsis: true
	},
	{
		title: "显示",
		dataIndex: "showFlag",
		width: 80
	},
	{
		title: "字段名词",
		dataIndex: "label",
		width: 120
	},
	{
		title: "字段命名",
		dataIndex: "fieldName"
		// width: 120,
	},

	{
		title: "宽度",
		dataIndex: "width",
		width: 120
	},
	{
		title: "ellipsis",
		dataIndex: "ellipsisFlag",
		width: 160
	}
]);
const tableData = ref([
	{
		columnName: "category_id",
		label: "分类id",
		fieldName: "categoryId",
		showFlag: true,
		width: null,
		ellipsisFlag: true
	},
	{
		columnName: "category_name",
		label: "分类名称",
		fieldName: "categoryName",
		showFlag: true,
		width: null,
		ellipsisFlag: true
	},
	{
		columnName: "category_type",
		label: "分类类型",
		fieldName: "categoryType",
		showFlag: true,
		width: null,
		ellipsisFlag: true
	},
	{
		columnName: "parent_id",
		label: "父级id",
		fieldName: "parentId",
		showFlag: true,
		width: null,
		ellipsisFlag: true
	},
	{
		columnName: "sort",
		label: "排序",
		fieldName: "sort",
		showFlag: true,
		width: null,
		ellipsisFlag: true
	},
	{
		columnName: "disabled_flag",
		label: "是否禁用",
		fieldName: "disabledFlag",
		showFlag: true,
		width: null,
		ellipsisFlag: true
	},
	{
		columnName: "deleted_flag",
		label: "是否删除",
		fieldName: "deletedFlag",
		showFlag: true,
		width: null,
		ellipsisFlag: true
	},
	{
		columnName: "remark",
		label: "备注",
		fieldName: "remark",
		showFlag: true,
		width: null,
		ellipsisFlag: true
	},
	{
		columnName: "update_time",
		label: "更新时间",
		fieldName: "updateTime",
		showFlag: false,
		width: null,
		ellipsisFlag: true
	},
	{
		columnName: "create_time",
		label: "创建时间",
		fieldName: "createTime",
		showFlag: false,
		width: null,
		ellipsisFlag: true
	}
]);
</script>

<style lang="scss" scoped></style>
