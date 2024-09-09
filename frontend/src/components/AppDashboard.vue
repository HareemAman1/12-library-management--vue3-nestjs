<template>
  <div>
    <h2>Dashboard</h2>
    <p>Welcome to the dashboard, {{ username }}</p>

    <!-- SEARCH BAR -->
    <div
      class="search-container"
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        margin-top: 20px;
      "
    >
      <el-input
        v-model="searchQuery"
        :placeholder="`Search by ${selectedSearchField}`"
        style="width: 30%; border-bottom: 5px solid orange"
      ></el-input>

      <el-select
        v-model="selectedSearchField"
        placeholder="Search by"
        style="margin-left: 20px; width: 10%"
      >
        <el-option label="Username" value="username"></el-option>
        <el-option label="Email" value="email"></el-option>
      </el-select>
    </div>

    <!-- USERS TABLE -->
     <div class="dashboard-container">
    <el-table :data="filteredUsers" style="width: 60%"
        :row-class-name="tableRowClassName"
        :header-cell-style="headerCellStyle"
        class="custom-table">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="username" label="Username"></el-table-column>
      <el-table-column prop="email" label="Email"></el-table-column>
      <el-table-column prop="password" label="Password"></el-table-column>
      <el-table-column prop="roles" label="Roles"></el-table-column>
      <el-table-column label="Actions" align="center">
        <template #default="scope">
          <el-button
            type="success"
            :icon="Edit"
            circle
            class="update"
            @click="editUser(scope.row.id)"
          >
          </el-button>
          <el-button
            type="danger"
            :icon="Delete"
            circle
            class="delete"
            @click="deleteUser(scope.row.id)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../axios'; // Ensure your axios client is configured
import { Delete, Edit } from "@element-plus/icons-vue";

export default {
  setup() {
    const users = ref([]);
    const username = ref('');
    const searchQuery = ref('');
    const selectedSearchField = ref('username');
    const router = useRouter();

    onMounted(async () => {
      username.value = localStorage.getItem('username') || 'Guest';
      const token = localStorage.getItem('token');
      
      if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        console.error('No token found in localStorage.');
      }

      await fetchUsers();
    });

    const fetchUsers = async () => {
      try {
        const response = await apiClient.get('/dashboard');
        users.value = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const deleteUser = async (id) => {
      try {
        await apiClient.delete(`/dashboard/${id}`);
        users.value = users.value.filter(user => user.id !== id);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };

    const editUser = (id) => {
      router.push(`/dashboard/${id}`);
    };

    const filteredUsers = computed(() => {
      if (!searchQuery.value) {
        return users.value;
      }
      return users.value.filter((user) =>
        user[selectedSearchField.value]
          .toString()
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
      );
    });

    // TABLE ATTRIBUTES
    const tableRowClassName = ({ row, rowIndex }) => {
      return rowIndex % 2 === 0 ? "even-row" : "odd-row";
    };

    const headerCellStyle = () => {
      return {
        fontWeight: 'bold',
        backgroundColor: '#01204E',
        color: 'white',
        textAlign: 'left',
      };
    };

    return {
      users,
      username,
      searchQuery,
      selectedSearchField,
      filteredUsers,
      Delete,
      Edit,
      deleteUser,
      editUser,
      tableRowClassName,
      headerCellStyle
    };
  },
};
</script>


<style lang="scss" scoped>
$col1: #01204E;
$col2: #028391;
$col3: #FEAE6F;
$col4: #F6DCAC;
$col5: white;

p {
  font-family: cursive;
  font-weight: 900;
  font-size: 2.2rem;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
  height: 50vh;
}

.custom-table {
    border: 3px solid $col5;
  }
  
  ::v-deep .el-table .odd-row {
    background-color: $col3;
    color: black;
  }
  
  ::v-deep .el-table .even-row {
    background-color: $col5;
    color: black;

  }
.el-button {
  margin: 0 5px;
}

.update {
  font-weight: 900;
  font-size: 1.2rem;
  color: $col5;
  background: green;
  border: solid green;
}

.update:hover {
  color: green;
  background: transparent;
}

.delete {
  font-weight: 800;
  font-size: 1.2rem;
  color: $col5;
  background: crimson;
  border: solid crimson;
}

.delete:hover {
  color: crimson;
  background: transparent;
}
</style>