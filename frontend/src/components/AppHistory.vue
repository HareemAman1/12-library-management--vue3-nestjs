<template>
  <div>
    <h2>My Issue History</h2>

    <!-- Search and Filter Section -->
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
      <!-- Search Bar -->
      <el-input
        v-model="searchQuery"
        :placeholder="`Search by ${selectedSearchField}`"
        style="width: 30%; border-bottom: 5px solid orange"
        clearable
      ></el-input>

      <!-- Dropdown for Selecting Search Field -->
      <el-select
        v-model="selectedSearchField"
        placeholder="Filter by"
        style="margin-left: 20px; width: 15%"
      >
        <el-option label="Book Name" value="book_name"></el-option>
        <el-option label="Status" value="status"></el-option>
      </el-select>
    </div>

    <div class="container">
      <el-table :data="filteredHistoryData" style="width: 60%" :row-class-name="tableRowClassName" :header-cell-style="headerCellStyle" class="custom-table">
        <el-table-column prop="id" label="ID" :header-cell-style="headerCellStyle"></el-table-column>
        <el-table-column prop="book_name" label="Book Name" :header-cell-style="headerCellStyle"></el-table-column>
        <el-table-column prop="issue_date" label="Issue Date" :header-cell-style="headerCellStyle"></el-table-column>
        <el-table-column prop="due_date" label="Due Date" :header-cell-style="headerCellStyle"></el-table-column>
        <el-table-column prop="status" label="Status" :header-cell-style="headerCellStyle"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import apiClient from '../axios';

export default {
  setup() {
    const historyData = ref([]);
    const searchQuery = ref('');
    const selectedSearchField = ref('book_name');

    onMounted(async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage
        if (!token) {
          throw new Error('No token found');
        }

        const response = await apiClient.get('/history', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        historyData.value = response.data;
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    });

    // Computed property for filtering history data
    const filteredHistoryData = computed(() => {
      return historyData.value.filter((record) => {
        const fieldValue = record[selectedSearchField.value]?.toLowerCase() || ''; // Add fallback for missing fields
        return fieldValue.includes(searchQuery.value.toLowerCase());
      });
    });

      // Table attributes for styling
  const tableRowClassName = ({ row, rowIndex }) => {
    return rowIndex % 2 === 0 ? 'even-row' : 'odd-row';
  };
  
  const headerCellStyle = () => ({
    fontWeight: 'bold',
    backgroundColor: '#01204E',
    color: 'white',
    textAlign: 'left',
  });
    return {
      historyData,
      searchQuery,
      selectedSearchField,
      filteredHistoryData,
      tableRowClassName,
      headerCellStyle
    };
  }
};
</script>

<style lang="scss" scoped>
$col1: #01204E;
$col2: #028391;
$col3: #FEAE6F;
$col4: #F6DCAC;
$col5: white;


  
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
  </style>
  