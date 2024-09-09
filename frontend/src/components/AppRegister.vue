<template>
  <div class="register-container">
    <h2>Register</h2>
    <el-form
      ref="registerForm"
      :model="form"
      :rules="rules"
      label-width="120px"
      class="register-form"
    >
    <div class="container">
      <el-form-item label="Username" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="registerUser">Register</el-button>
      </el-form-item>
    </div>
    </el-form>
    <p v-if="message" :class="alertType">{{ message }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../axios';
import { ElMessage } from 'element-plus';

export default {
  setup() {
    const form = ref({
      username: '',
      email: '',
      password: '',
    });
    const message = ref('');
    const alertType = ref('');
    const registerForm = ref(null); // Create a ref for the form
    const router = useRouter();

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
        { min: 3, message: 'Password must be at least 3 characters', trigger: 'blur' },
      ],
    };

    const registerUser = async () => {
      if (registerForm.value) {
        registerForm.value.validate(async (valid) => {
          if (valid) {
            try {
              const response = await apiClient.post('/auth/register', {
                username: form.value.username,
                email: form.value.email,
                password: form.value.password,
              });
              message.value = 'Registration successful!';
              alertType.value = 'success';
              console.log('User registered:', response.data);

              // Redirect to /login after successful registration
              setTimeout(() => {
                router.push('/login');
              }, 1000);
            } catch (error) {
              message.value = 'Registration failed. Please try again.';
              alertType.value = 'error';
              console.error('Error registering user:', error.response ? error.response.data : error.message);
            }
          } else {
            console.log('Error! The form is invalid.');
          }
        });
      }
    };

    return {
      form,
      message,
      alertType,
      rules,
      registerUser,
      registerForm, // Expose the form ref
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


.el-input{
      width: 350px;
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
