<template>
  <h2>Add a New Book</h2>
    <div class="container">
      <el-form :model="book" label-width="120px" @submit.prevent="submitForm">
        <el-form-item label="Book Name">
          <el-input v-model="book.book_name" placeholder="Enter book name"></el-input>
        </el-form-item>
  
        <el-form-item label="Author">
          <el-input v-model="book.author" placeholder="Enter author's name"></el-input>
        </el-form-item>
  
        <el-form-item label="Amount">
          <el-input v-model="book.amount" type="number" placeholder="Enter amount"></el-input>
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" @click="submitForm">Add Book</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import apiClient from '../axios'; // Ensure your Axios client is configured properly
  
  export default {
    setup() {
      const book = ref({
        book_name: '',
        author: '',
        amount: null,
      });
  
      const submitForm = async () => {
        try {
          // Send POST request to the NestJS backend
          const response = await apiClient.post('/books/add', {
            book_name: book.value.book_name,
            author: book.value.author,
            amount: book.value.amount,
          });
  
          // If the book is successfully added, you can reset the form or navigate
          console.log('Book added successfully:', response.data);
  
          // Optionally reset form
          book.value.book_name = '';
          book.value.author = '';
          book.value.amount = null;
  
          // Show success message (optional)
          alert('Book added successfully!');
        } catch (error) {
          console.error('Error adding book:', error);
          alert('There was an error adding the book.');
        }
      };
  
      return {
        book,
        submitForm,
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
  