<template>
  <div class="books-container">
    <h1>Books</h1>
    <p>Welcome, {{ username }}</p>

    <div class="search-container" style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px; margin-top: 20px;">
      <el-input v-model="searchQuery" :placeholder="`Search by ${selectedSearchField}`" style="width: 30%; border-bottom: 5px solid orange;"></el-input>
      <el-select v-model="selectedSearchField" placeholder="Filter by" style="margin-left: 20px; width: 15%;">
        <el-option label="Book Name" value="book_name"></el-option>
        <el-option label="Author" value="author"></el-option>
      </el-select>
    </div>

    <div class="book-list">
      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="book-card"
        :body-style="{ padding: '20px' }"
      >
        <div class="book-info">
          <h3 class="book-name">{{ book.book_name }}</h3>
          <h4 class="book-author">By: {{ book.author }}</h4>
          <h5 class="book-amount">Amount: {{ book.amount }}</h5>
          <el-button :disabled="book.amount === 0" type="primary" @click="getBook(book.id, book.book_name)">Get it</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../axios';

export default {
  setup() {
    const books = ref([]);
    const searchQuery = ref('');
    const selectedSearchField = ref('book_name');
    const username = ref('');
    const router = useRouter();

    onMounted(async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No token found in localStorage.');
        }

        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await apiClient.get('/books');
        books.value = response.data;

        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          username.value = storedUsername;
        } else {
          console.error('No username found in localStorage.');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    });

    const getBook = (bookId, bookName) => {
      router.push(`/issue/${bookId}/${encodeURIComponent(bookName)}`);
    };

    const filteredBooks = computed(() => {
      return books.value.filter((book) => {
        const fieldValue = book[selectedSearchField.value].toLowerCase();
        return fieldValue.includes(searchQuery.value.toLowerCase());
      });
    });

    return {
      books,
      searchQuery,
      selectedSearchField,
      username,
      getBook,
      filteredBooks,
    };
  },
};
</script>


<style lang="scss" scoped>
$col1: #01204e;
$col2: #028391;
$col3: #feae6f;
$col4: #f6dcac;
$col5: white;

$col6: #6C0345;
$col7: #f77e28;
$col8: #F7C566;
$col9: #FFF8DC;

.book-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -10px; // Adjusts for the margin of the book cards
}

.book-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ddd;
  background: $col6;
  padding: 20px;
  margin: 10px; // Adjust as needed
  width: calc(25% - 20px); // 25% width minus margins for 4 items per row
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow: hidden;
  height: 300px; // Adjust height as needed
  border-radius: 10px;
}

.book-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  text-align: left;
}

.book-name {
  font-size: 1.2rem;
  margin-bottom: auto; // Pushes book name to the top
  color: $col7;
  text-align: center;
}

.book-author {
  font-size: 1rem;
  margin: 10px 0; // Centered vertically
  color: $col5;
  text-align: center;
}

.book-amount {
  font-size: 0.9rem;
  margin-top: auto; // Pushes amount to the bottom
  text-align: center;
  color: $col9;
  margin-bottom: 10px;
}

.el-button {
  align-self: center;
  margin-top: 15px;
  padding: 8px 12px;
  background-color: $col8;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.el-button:hover {
  background-color: $col2;
}

</style>
