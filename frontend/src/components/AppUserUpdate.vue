<template>
  <h2>Edit User</h2>
    <div class="container">
      <el-form :model="form" :rules="rules" ref="editForm" label-width="120px" class="form-container">
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" placeholder="Enter username"></el-input>
        </el-form-item>
  
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="Enter email"></el-input>
        </el-form-item>
  
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="form.password" placeholder="Enter password"></el-input>
        </el-form-item>
  
        <el-form-item label="Roles" prop="roles">
          <el-input v-model="form.roles" placeholder="Enter roles" disabled></el-input>
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" @click="updateUser">Update</el-button>
          <el-button type="info" @click="back">Back</el-button>
        </el-form-item>
  
        <el-alert v-if="message" title="Done" :type="alertType" show-icon></el-alert>
      </el-form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import apiClient from '../axios'; 
  
  export default {
    setup() {
      const route = useRoute();
      const router = useRouter();
      const form = ref({
        username: '',
        email: '',
        password: '',
        roles: ''
      });
      const message = ref('');
      const alertType = ref('');
  
      const rules = {
        username: [
          { required: true, message: 'Username is required', trigger: 'blur' },
        ],
        email: [
          { required: true, message: 'Email is required', trigger: 'blur' },
          { type: 'email', message: 'Please input a valid email', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Password is required', trigger: 'blur' },
        ],
        roles: [
          { required: true, message: 'Roles are required', trigger: 'blur' },
        ],
      };
  
      onMounted(async () => {
        const token = localStorage.getItem('token'); // Retrieve the JWT token
  
        if (token) {
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          console.error('No token found in localStorage.');
        }
  
        const userId = route.params.id;
        try {
          const response = await apiClient.get(`/dashboard/${userId}`);
          form.value = response.data;
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      });
  
      const updateUser = async () => {
        const token = localStorage.getItem('token'); // Retrieve the JWT token
  
        if (token) {
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          console.error('No token found in localStorage.');
        }
  
        try {
          await apiClient.put(`/dashboard/${form.value.id}`, form.value);
          message.value = 'User updated successfully!';
          alertType.value = 'success';
          setTimeout(() => {
            router.push('/dashboard');
          }, 1000);
        } catch (error) {
          message.value = 'Update failed. Please try again.';
          alertType.value = 'error';
          console.error('Error updating user:', error);
        }
      };
  
      const back = () => {
        router.push('/dashboard');
      };
  
      return {
        form,
        rules,
        updateUser,
        message,
        alertType,
        back
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