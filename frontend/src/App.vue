<template>
  <div id="app">
    <nav>
      <el-menu :default-active="activeMenu" class="menu" mode="vertical">
        <template v-if="!isLoggedIn">
          <el-menu-item index="1" @click="navigateTo('/register')">Register</el-menu-item>
          <el-menu-item index="2" @click="navigateTo('/login')">Login</el-menu-item>
        </template>
        <template v-else>
          <template v-if="userRole === 'superuser'">
            <el-menu-item index="1" @click="navigateTo('/dashboard')">Dashboard</el-menu-item>
            <el-menu-item index="1" @click="navigateTo('/books/add')">Add Books</el-menu-item>
            <el-menu-item index="1" @click="navigateTo('/details')">Details</el-menu-item>
          </template>
          <el-menu-item index="2" @click="navigateTo('/books')">Books</el-menu-item>
          <el-menu-item index="2" @click="navigateTo('/history')">History</el-menu-item>
          <el-menu-item index="3" @click="logout">Logout</el-menu-item>
        </template>
      </el-menu>
    </nav>

    <el-main>
      <router-view />
    </el-main>
    <footer>&copy; All rights reserved</footer>

  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

export default {
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(false);
    const userRole = ref('');

    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const roles = localStorage.getItem('roles');
      if (token) {
        isLoggedIn.value = true;
        userRole.value = roles || '';
      } else {
        isLoggedIn.value = false;
        userRole.value = '';
      }
    };

    onMounted(() => {
      checkAuthStatus();
    });

    // Watch for changes in the route to update active menu item
    const activeMenu = computed(() => router.currentRoute.value.fullPath);

    const navigateTo = (path) => {
      router.push(path);
    };

    const logout = () => {
      // Clear localStorage and update auth state
      localStorage.removeItem('token');
      localStorage.removeItem('roles');
      checkAuthStatus(); // Update local state
      ElMessage.success('Logged out successfully');
      router.push('/login');
    };

    // Watch for changes in authentication state
    const authWatch = () => {
      router.afterEach(() => {
        checkAuthStatus(); // Update auth state on route change
      });
    };

    authWatch();

    return {
      isLoggedIn,
      userRole,
      navigateTo,
      logout,
      activeMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
$col1: #01204e;
$col2: #52d3d8;
$col3: #feae6f;
$col4: #f6dcac;
$col5: white;
$hover-bg: lighten($col1, 40%);
$active-bg: $col3;

#app {
  display: flex;
  min-height: 100vh;
  flex-direction: row;
}

nav {
  width: 220px;
  background: $col1;
  padding: 20px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  border-right: 5px dashed $col1;
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* subtle shadow for depth */
}

.el-menu {
  background-color: $col1;
  font-family: 'Poppins', sans-serif; /* modern font */
}

.el-menu-item {
  display: block;
  font-weight: 700;
  margin: 30px 20px;
  color: $col2;
  text-decoration: none;
  font-size: 1.2rem;
  border-radius: 8px;
  transition: background 0.3s, color 0.3s;
}

.el-menu-item:hover {
  color: $col3;
  background: $col1;
  padding-left: 10px; /* subtle shift for hover effect */
  text-decoration: underline;
}

// .el-menu-item:active {
//   font-weight: 800;
//   color: $col5;
//   background: $active-bg;
//   border-left: 5px solid $col2;
//   padding-left: 15px;
// }

main {
  margin-left: 220px;
  padding: 20px;
  flex: 1;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  background: $col2;
  border-top: 5px solid $col1;
  color: $col1;
  font-weight: 800;
  width: 100%;
  padding: 8px;
  padding-left: 200px;
  z-index: 9999;
}
</style>

