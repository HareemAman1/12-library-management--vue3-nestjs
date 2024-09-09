<template>
  <div>
    <h2>Issue Book Details</h2>
    <!-- PIE CHART -->
    <div
      id="user-status-chart"
      style="width: 400px; height: 400px; margin: 0 auto"
    ></div>

    <!-- SEARCH BAR -->
    <div
      class="search-container"
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        "
    >
      <el-input
        v-model="searchQuery"
        :placeholder="`Search by ${selectedSearchField}`"
        style="width: 30%; border-bottom: 5px solid orange"
      ></el-input>

      <el-select
        v-model="selectedSearchField"
        placeholder="Filter by"
        style="margin-left: 20px; width: 15%"
      >
        <el-option label="Name" value="username"></el-option>
        <el-option label="Book Name" value="book_name"></el-option>
        <el-option label="Status" value="status"></el-option>
      </el-select>
    </div>

    <!-- Table -->
    <div class="details-container">
    <el-table :data="filteredData"  style="width: 60%"
        :row-class-name="tableRowClassName"
        :header-cell-style="headerCellStyle"
        class="custom-table">
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="userid" label="User ID"></el-table-column>
      <el-table-column prop="username" label="Username"></el-table-column>
      <el-table-column prop="book_name" label="Book Name"></el-table-column>
      <el-table-column prop="issue_date" label="Issue Date"></el-table-column>
      <el-table-column prop="due_date" label="Due Date"></el-table-column>
      <el-table-column prop="status" label="Status"></el-table-column>
      <el-table-column label="Actions" align="right">
        <template #default="scope">
          <el-button
            type="success"
            :icon="Edit"
            circle
            class="update"
            @click="editUser(scope.row.id)"
          >
          </el-button>
          <!-- <el-button
            type="danger"
            :icon="Delete"
            circle
            class="delete"
            @click="deleteUser(scope.row.id)"
          >
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import apiClient from '../axios'; // Adjust the path as needed
import { useRoute, useRouter } from 'vue-router';
import * as echarts from 'echarts';
import { Delete, Edit } from '@element-plus/icons-vue';

const data = ref([]);
const chart = ref(null);
const route = useRoute();
const router = useRouter();
const searchQuery = ref('');
const selectedSearchField = ref('username');

const initChart = () => {
  const chartDom = document.getElementById('user-status-chart');
  if (chartDom) {
    chart.value = echarts.init(chartDom);
    const option = {
      title: {
        text: 'User Status Distribution',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '10%',
        left: 'center',
      },
      series: [
        {
          name: 'User Status',
          type: 'pie',
          radius: ['25%', '50%'],
          data: [], // Initial empty data
          emphasis: {
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
            label: {
              show: true,
              fontSize: 15,
              fontWeight: 'bold',
            },
          },
        },
      ],
    };
    chart.value.setOption(option);
  } else {
    console.error('Chart DOM element not found.');
  }
};

const updateChart = () => {
  if (chart.value) {
    const clearedUsers = data.value.filter(user => user.status === 'cleared').length;
    const pendingUsers = data.value.filter(user => user.status === 'pending').length;

    const updatedData = [
      { value: clearedUsers, name: 'Cleared' },
      { value: pendingUsers, name: 'Pending' },
    ];

    chart.value.setOption({
      series: [
        {
          data: updatedData,
        },
      ],
    });
  } else {
    console.error('Chart not initialized.');
  }
};

const fetchData = async () => {
  const token = localStorage.getItem('token'); // Retrieve the JWT token

  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    console.error('No token found in localStorage.');
  }

  try {
    const response = await apiClient.get('/details');
    data.value = response.data;
    updateChart(); // Update the chart with fetched data
  } catch (error) {
    console.error('Error fetching issue book details:', error);
  }
};

const deleteUser = async (id) => {
  const token = localStorage.getItem('token'); // Retrieve the JWT token

  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    console.error('No token found in localStorage.');
  }

  try {
    await apiClient.delete(`/details/${id}`);
    fetchData(); // Refresh the data after deletion
  } catch (error) {
    console.error('Error deleting issue book:', error);
  }
};

const editUser = (id) => {
  router.push(`/details/${id}`);
};


// Computed property for filtered data
const filteredData = computed(() => {
  if (!searchQuery.value) {
    return data.value;
  }
  return data.value.filter((item) =>
    item[selectedSearchField.value]
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

onMounted(() => {
  initChart();
  fetchData();
});
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

.details-container {
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