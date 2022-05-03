<template>
  <div>
    <div class="left" @click="goBack">
      <img src="~assets/images/211686_white_arrow_icon.png" alt="" />
    </div>
    <Navbar>
      <template #default>會員列表</template>
    </Navbar>
    <div class="manage-userlist mx-auto">
      <table class="col-11 ms-4">
        <thead>
          <tr class="">
            <th class="col-2">ID</th>
            <th class="col-3">帳號名稱</th>
            <th class="col-5">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td class="abtn col-10">
              <button
                class="btn btn-success col-6 mx-auto"
                @click="itemClick(item.id)"
              >
                編輯
              </button>
              <button
                class="btn btn-danger col-6 mx-auto"
                @click="onDelete(item.id)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import { reactive, toRefs, onMounted} from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { getUserList, deleteUser } from "@/../public/network/surperuser";
export default {
  name: "userlist",
  components: { Navbar },
  setup() {
    const router = useRouter();
    const showUser = reactive({
      list: [],
    });
    const init = () => {
      getUserList().then((res) => {
        return (showUser.list = res.data);
      });
    };
    onMounted(() => {
      init();
    });

    const onDelete = (id) => {
      deleteUser(id).then((res) => {
        if (res.status == 401) {
          return Toast.fail("刪除失敗");
        } else if (res.status == 204) {
          Toast.success("刪除成功");
          init();
        }
      });
    };
    const goBack = () => {
      router.go(-1);
    };
    return {
      ...toRefs(showUser),
      onDelete,
      init,
      goBack,
      itemClick: (id) => {
        return router.push({ path: `/editUser/${id}` });
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.manage-userlist {
  margin-top: 60px;
  margin-bottom: 60px;
  max-width: 800px;
  table {
    td {
      border: 1px solid rgb(162, 162, 162);
    }
    thead {
      text-align: left;
    }
    tbody {
      tr {
        text-align: left;
        td {
          padding-left: 10px;
        }
      }
      .abtn {
        display: flex;
        flex-wrap: wrap;
        button {
          margin: 10px;
          max-width: 200px;
        }
      }
    }
  }
}
</style>