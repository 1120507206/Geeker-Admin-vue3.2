<template>
	<div class="">测试页</div>
				<div @click="bit">
					{{ msg }}
				</div>
				<h1 v-if="isShow"> 显示 </h1>
				<div v-for="item in arr" :key="item">
					姓名：{{ item.name }} 年龄11：{{ item.age }}
				</div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const msg = ref('hello world')
const isShow = ref(true)
const arr = [
	{
		name: '张三',
		age: 18
	},
	{
		name: '李四',
		age: 20
	},
	{
		name: '王五',
		age: 20
	}

]

const bit = () => {
	console.log('bit')
	isShow.value = !isShow.value


}
</script>

<style lang="scss" scoped></style>
