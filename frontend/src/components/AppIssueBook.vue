<template>
    <div class="container">
      <h2>Issue Book</h2>
      <el-form :model="form" ref="issueForm" label-width="120px" class="form-container">
        <el-form-item label="User ID">
          <el-input v-model="form.userid" disabled></el-input>
        </el-form-item>
  
        <el-form-item label="Username">
          <el-input v-model="form.username" disabled></el-input>
        </el-form-item>
  
        <el-form-item label="Book Name">
          <el-input v-model="form.book_name" disabled></el-input>
        </el-form-item>
  
        <el-form-item label="Issue Date">
          <el-input v-model="form.issue_date" disabled></el-input>
        </el-form-item>
  
        <el-form-item label="Due Date">
          <el-input v-model="form.due_date" disabled></el-input>
        </el-form-item>
  
        <el-form-item label="Status">
          <el-input v-model="form.status" disabled></el-input>
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" @click="submitForm">Submit</el-button>
          <el-button type="info" @click="back">Back</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import apiClient from '../axios'; // Adjust the path as needed
  
  export default {
    setup() {
      const form = ref({
        userid: '',
        username: '',
        book_name: '',
        issue_date: '',
        due_date: '',
        status: 'pending'
      });
  
      const router = useRouter();
      const route = useRoute();
  
      onMounted(() => {
      // Retrieve user data from localStorage
      const storedUserId = localStorage.getItem('id');
      const storedUsername = localStorage.getItem('username');
      const bookid = route.params.id;
      const book_name = decodeURIComponent(route.params.book_name); // Ensure book_name is decoded
  
      // Set prefilled fields
      form.value.userid = storedUserId || '';
      form.value.username = storedUsername || '';
      form.value.book_name = book_name || '';
      
      const today = new Date();
      form.value.issue_date = today.toISOString().split('T')[0]; // YYYY-MM-DD format
  
      const due_date = new Date(today);
      due_date.setMonth(due_date.getMonth() + 1);
      form.value.due_date = due_date.toISOString().split('T')[0]; // YYYY-MM-DD format
  
      form.value.status = 'pending';
    });

    const submitForm = async () => {
      const token = localStorage.getItem('token'); // Retrieve the JWT token

      if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        console.error('No token found in localStorage.');
        return;
      }

      try {
        await apiClient.post(`/issue/${route.params.id}`, form.value); 
        router.push('/history');
      } catch (error) {
        console.error('Error submitting issue:', error);
      }
    };

    const back = () => {
      router.push('/books');
    };
      return {
        form,
        submitForm,
        back
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
  
  .form-item .el-form-item__label {
    color: black; /* Change label color to black */
  }
  
  .el-input{
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
  
  