<!--
 * @Author: XDTEAM
 * @Date: 2025-03-20 21:58:17
 * @LastEditTime: 2025-03-22 21:26:54
 * @LastEditors: XDTEAM
 * @Description: 
-->
<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { RoleFormProps } from "../utils/types";

const props = withDefaults(defineProps<RoleFormProps>(), {
  formInline: () => ({
    username: "",
    roleOptions: [],
    ids: []
  })
});

const newFormInline = ref(props.formInline);
</script>

<template>
  <el-form :model="newFormInline">
    <el-row :gutter="30">
      <re-col>
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="newFormInline.username" disabled />
        </el-form-item>
      </re-col>

      <re-col>
        <el-form-item label="角色列表" prop="ids">
          <el-select
            v-model="newFormInline.ids"
            placeholder="请选择"
            class="w-full"
            clearable
            multiple
          >
            <el-option
              v-for="(item, index) in newFormInline.roleOptions"
              :key="index"
              :value="item.id"
              :label="item.name"
            >
              {{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
