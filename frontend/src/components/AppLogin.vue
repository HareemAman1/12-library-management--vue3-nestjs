<template>
  <div class="login-container">
    <h2>Login</h2>
    <el-form
      :model="form"
      :rules="rules"
      ref="loginForm"
      label-width="120px"
      class="form-container"
    >
    <div class="container">
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" placeholder="Enter email"></el-input>
      </el-form-item>

      <el-form-item label="Password" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="Enter password"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="loginUser">Login</el-button>
      </el-form-item>

      <el-alert
        v-if="message"
        title="Welcome"
        :type="alertType"
        show-icon
      ></el-alert>
    </div>
    </el-form>
  </div>
</template>
  
  <script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import apiClient from "../axios";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const form = ref({
      email: "",
      password: "",
    });
    const message = ref("");
    const alertType = ref("");
    const loginForm = ref(null);
    const router = useRouter();

    const rules = {
      email: [
        { required: true, message: "Email is required", trigger: "blur" },
        {
          type: "email",
          message: "Please input a valid email",
          trigger: "blur",
        },
      ],
      password: [
        { required: true, message: "Password is required", trigger: "blur" },
      ],
    };

    const loginUser = async () => {
      if (loginForm.value) {
        loginForm.value.validate(async (valid) => {
          if (valid) {
            try {
              const response = await apiClient.post("/auth/login", {
                email: form.value.email,
                password: form.value.password,
              });
              const { token, user } = response.data;

              // Store token and user roles in localStorage
              localStorage.setItem("token", token);
              localStorage.setItem("roles", user.roles);
              localStorage.setItem("username", user.username);
              localStorage.setItem("id", user.id);

              // Redirect based on roles
              if (user.roles === "superuser") {
                router.push("/dashboard");
              } else if (user.roles === "user") {
                router.push("/books");
              }
            } catch (error) {
              message.value = "Login failed. Please try again.";
              alertType.value = "error";
              console.error(
                "Error logging in:",
                error.response ? error.response.data : error.message
              );
            }
          }
        });
      }
    };

    return {
      form,
      message,
      alertType,
      rules,
      loginUser,
      loginForm, // Expose the form ref
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
