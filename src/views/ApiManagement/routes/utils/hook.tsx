import editForm from "../form.vue";
import { message } from "@/utils/message";
import {
  getApiRoutes,
  UpdateApi,
  DataSyncApi
} from "@/api/apiCtrl/ApiManagement";
import type { FormItemProps } from "../utils/types";
import { ElMessageBox } from "element-plus";
import { addDialog } from "@/components/ReDialog";
import { usePublicHooks } from "../../hooks";
import { reactive, ref, onMounted, h, toRaw } from "vue";
import { useBasicLayout } from "@/hooks/useBasicLayout";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import EditPen from "@iconify-icons/ep/edit-pen";

const { isMobile } = useBasicLayout();

const switchLoadMap = ref({});

export function useDept() {
  const form = reactive({
    summary: "",
    enable: undefined,
    free: undefined,
    pageSize: 10,
    currentPage: 1
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const { switchStyle } = usePublicHooks();
  const indexMethod = (index: number) => {
    return (form.currentPage - 1) * form.pageSize + index + 1;
  };
  const columns: TableColumnList = [
    {
      label: "序号",
      type: "index",
      index: indexMethod,
      minWidth: 50
    },
    {
      label: "-",
      prop: "today_call",
      hide: true
    },
    {
      label: "-",
      prop: "total_call",
      hide: true
    },
    {
      label: "-",
      prop: "total_call_limit",
      hide: true
    },
    {
      label: "-",
      prop: "daily_call_limit",
      hide: true
    },
    {
      label: "函数名称",
      prop: "funcName",
      hide: true
    },

    {
      label: "API名称",
      prop: "summary",
      width: 200,
      align: "left",
      cellRenderer: ({ row }) => {
        return row.summary || row.name ? (
          <span>{row.summary || row.name}</span>
        ) : (
          ""
        );
      }
    },
    {
      label: "状态",
      minWidth: 80,
      cellRenderer: scope => {
        return scope.row.hasOwnProperty("enable") ? (
          <el-switch
            size={scope.props.size === "small" ? "small" : "default"}
            loading={switchLoadMap.value[scope.index]?.loading}
            v-model={scope.row.enable}
            active-value={true}
            inactive-value={false}
            active-text="已激活"
            inactive-text="已停用"
            inline-prompt
            style={switchStyle.value}
            onChange={() => onChange(scope as any, "enable")}
          />
        ) : (
          ""
        );
      }
    },
    {
      label: "路径",
      prop: "route",
      minWidth: 120,
      cellRenderer: ({ row }) => {
        return row.path ? (
          <el-tag type="primary" effect="dark">
            {row.path}
          </el-tag>
        ) : (
          ""
        );
      }
    },
    {
      label: "请求方式",
      prop: "methods",
      minWidth: 80,
      cellRenderer: ({ row }) => {
        return row.methods ? (
          <el-tag
            type={row.methods[0] === "GET" ? "success" : "danger"}
            effect="dark"
          >
            {row.methods}
          </el-tag>
        ) : (
          ""
        );
      }
    },
    {
      label: "是否免费",
      minWidth: 80,
      cellRenderer: scope => {
        return scope.row.hasOwnProperty("free") ? (
          <el-switch
            size={scope.props.size === "small" ? "small" : "default"}
            loading={switchLoadMap.value[scope.index]?.loading}
            v-model={scope.row.free}
            active-value={true}
            inactive-value={false}
            active-text="免费"
            inactive-text="收费"
            inline-prompt
            style={switchStyle.value}
            onChange={() => onChange(scope as any, "free")}
          />
        ) : (
          ""
        );
      }
    },
    {
      label: "消耗点数",
      prop: "points",
      minWidth: 80
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation",
      cellRenderer: ({ row }) => {
        return row.path ? (
          <div>
            <el-button
              class="reset-margin"
              link
              type="primary"
              icon={useRenderIcon(EditPen)}
              onClick={() => openDialog("修改", row)}
            >
              修改
            </el-button>
          </div>
        ) : (
          ""
        );
      }
    }
  ];
  function onChange({ row, index }, field) {
    // 根据字段类型动态生成提示信息
    const action = row[field]
      ? field === "enable"
        ? "启用"
        : "免费"
      : field === "enable"
        ? "停用"
        : "收费";
    const fieldName = field === "enable" ? "启用状态" : "收费状态";

    ElMessageBox.confirm(
      `确认要<strong>${action}</strong><strong style='color:var(--el-color-primary)'>${row.summary}</strong>这个API吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(() => {
        // 设置加载状态
        switchLoadMap.value[index] = Object.assign(
          {},
          switchLoadMap.value[index],
          {
            loading: true
          }
        );

        // 构造请求数据
        const post_data = {
          [field]: row[field]
        };

        // 调用更新接口
        UpdateApi(row.funcName, post_data).then(res => {
          if (res.code === 200) {
            setTimeout(() => {
              // 更新加载状态
              switchLoadMap.value[index] = Object.assign(
                {},
                switchLoadMap.value[index],
                {
                  loading: false
                }
              );
              message(
                `已成功将API<strong>${row.summary}</strong>的${fieldName}修改为<strong>${action}</strong>`,
                {
                  type: "success",
                  dangerouslyUseHTMLString: true
                }
              );
            }, 200);
          } else {
            message(`操作失败，${res.message}`, { type: "error" });
          }
        });
      })
      .catch(() => {
        // 恢复原状态
        row[field] = !row[field];
      });
  }
  function openDialog(title = "编辑", row?: FormItemProps) {
    addDialog({
      title: `${title}API`,
      props: {
        formInline: {
          path: row?.path ?? "",
          funcName: row?.funcName ?? "",
          total_call: row?.total_call ?? 0,
          today_call: row?.today_call ?? 0,
          summary: row?.summary ?? "",
          methods: row?.methods ?? [],
          points: row?.points ?? 0,
          category: row?.category ?? "",
          daily_call_limit: row?.daily_call_limit ?? 0,
          total_call_limit: row?.total_call_limit ?? 0,
          free: row?.free ?? true,
          enable: row?.enable ?? true
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      fullscreen: isMobile.value ? true : false,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef, formInline: null }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了API为${curData.funcName}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            if (title === "编辑") {
              UpdateApi(row?.funcName, curData).then(async res => {
                if (res.code === 200) {
                  await chores();
                } else {
                  message(`操作失败，${res.message}`, { type: "error" });
                }
              });
            }
          }
        });
      }
    });
  }

  function resetForm(formEl) {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  }
  async function DataSync() {
    // 同步数据
    DataSyncApi().then(async res => {
      if (res.code === 200) {
        message(`数据同步完成`, { type: "success" });
      } else {
        message(`操作失败，${res.message}`, { type: "error" });
      }
    });
  }
  async function onSearch() {
    loading.value = true;
    const { data } = await getApiRoutes(toRaw(form));
    let newData = data;

    dataList.value = newData;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    openDialog,
    DataSync,
    columns,
    dataList,
    isMobile,
    onSearch,
    resetForm
  };
}
