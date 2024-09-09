<template>
  <h2>Edit Book Details</h2>
  <div class="container">
      <el-form :model="form" ref="editForm" label-width="120px">
        <el-form-item label="User ID">
          <el-input v-model="form.userid"></el-input>
        </el-form-item>
        <el-form-item label="Username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="Book Name">
          <el-input v-model="form.book_name"></el-input>
        </el-form-item>
        <el-form-item label="Issue Date">
          <el-date-picker 
            v-model="form.issue_date" 
            type="date" 
            placeholder="Select issue date"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="Due Date">
          <el-date-picker 
            v-model="form.due_date" 
            type="date" 
            placeholder="Select due date"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="form.status" placeholder="Select status">
            <el-option label="Pending" value="pending"></el-option>
            <el-option label="Cleared" value="cleared"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateDetails">Update</el-button>
          <el-button @click="back">Back</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import apiClient from '../axios';
  
  const route = useRoute();
  const router = useRouter();
  
  const form = ref({
    userid: '',
    username: '',
    book_name: '',
    issue_date: '',
    due_date: '',
    status: 'pending',
  });
  
  const fetchDetails = async () => {
  const token = localStorage.getItem('token'); // Retrieve the JWT token

  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    console.error('No token found in localStorage.');
  }

  try {
    const id = route.params.id;
    const response = await apiClient.get(`/details/${id}`);
    form.value = response.data;
  } catch (error) {
    console.error('Error fetching details:', error);
  }
};

const updateDetails = async () => {
  const token = localStorage.getItem('token'); // Retrieve the JWT token

  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    console.error('No token found in localStorage.');
  }

  try {
    const id = route.params.id;
    await apiClient.put(`/details/${id}`, form.value);
    alert('Details updated successfully');
    router.push('/details');
  } catch (error) {
    console.error('Error updating details:', error);
  }
};

const back = () => {
  router.push('/details');
};

  onMounted(() => {
    fetchDetails();
  });
  </script>
  
  <style lang="scss" scoped>
  $col1: #01204E;
  $col2: #028391;
  $col3: #FEAE6F;
  $col4: #F6DCAC;
  $col5: white;
  
  
  .el-input, .el-select, .el-date-picker{
        width: 100%;
        margin-bottom: 8px;
        border: 3px solid $col2;
        border-bottom: 5px solid $col1;
        border-radius: 5px;
  
    }
  .el-button {
    padding: 15px 40px;
    margin: 3px;
    font-weight: 900;
    background-color: $col2;
    color: $col5;
    border: 5px solid transparent;
  }
  
  .el-button:hover {
    color: $col1;
    background: transparent;
    border: 5px solid $col1;
    cursor: pointer;
  }
  </style>
  