<template>
	<div class="table-box">
		<div class="card table-search" v-show="isShowSearch">
			<el-form ref="formRef" :model="searchParam" :inline="true" label-width="100px">
				<el-form-item label="用户姓名 :">
					<el-input v-model="searchParam.username" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item label="性别 :">
					<el-select v-model="searchParam.gender" placeholder="请选择" clearable>
						<el-option v-for="item in genderType" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="身份证号 :">
					<el-input v-model="searchParam.idCard" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<el-form-item label="邮箱 :">
					<el-input v-model="searchParam.email" placeholder="请输入" clearable></el-input>
				</el-form-item>
				<div class="more-item" v-show="searchShow">
					<el-form-item label="创建时间 :">
						<el-date-picker
							v-model="searchParam.createTime"
							type="datetimerange"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							value-format="YYYY-MM-DD HH:mm:ss"
						/>
					</el-form-item>
				</div>
			</el-form>
			<!-- <div class="search-operation">
				<el-button type="primary" :icon="Search" @click="search">搜索</el-button>
				<el-button :icon="Delete" @click="reset">重置</el-button>
				<el-button type="primary" link class="search-isOpen" @click="searchShow = !searchShow">
					{{ searchShow ? "合并" : "展开" }}
					<el-icon class="el-icon--right">
						<component :is="searchShow ? ArrowUp : ArrowDown"></component>
					</el-icon>
				</el-button>
			</div> -->
		</div>
	</div>
</template>
<script setup lang="ts" name="userTable">
import { ref, reactive } from "vue";
import { genderType } from "@/utils/serviceDict";
import { useTable } from "@/hooks/useTable";
import { getUserList } from "@/api/modules/user";
// 是否展示搜索模块
const isShowSearch = ref(true);

// 是否展示更多搜索内容
const searchShow = ref(false);
// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({
	type: 1
});
// 表格 hooks
const { searchParam } = useTable(getUserList, initParam);
</script>
