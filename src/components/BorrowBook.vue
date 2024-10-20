<template>
  <div class="borrow-books-container">
    <h1>Borrow Books</h1>

    <!-- Show book list in a table -->
    <div v-if="books.length > 0" class="book-list">
      <table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book, index) in books" :key="index">
            <td>{{ book.book.name }}</td>
            <td>
              <span :class="['status', book.status.toLowerCase()]">{{ book.status }}</span>
            </td>
            <td>
              <!-- Borrow button for available books -->
              <button v-if="book.status === 'AVAILABLE'" @click="borrowBook(book.inventoryId)" class="action-btn borrow-btn">
                Borrow
              </button>
              <!-- Return button for borrowed books if can return -->
              <button v-if="book.status === 'BORROWED' && book.canReturn" @click="returnBook(book.inventoryId)" class="action-btn return-btn">
                Return
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Display message box -->
    <div v-if="message" :class="['message-box', messageType]">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [],
      message: '',
      userId: null,
      messageType: ''
    };
  },
  methods: {
    async getBooks() {
      try {
        const userId = this.userId || localStorage.getItem('userId');
        if (!userId) {
          this.message = 'User is not logged in.';
          this.messageType = 'error';
          return;
        }

        const response = await this.$http.get(`/borrow/books?userId=${userId}`);
        this.books = response.data;
      } catch (error) {
        console.error('Error fetching books:', error);
        this.message = 'Failed to fetch books.';
        this.messageType = 'error';
      }
    },
    async borrowBook(inventoryId) {
      try {
        const userId = this.userId || localStorage.getItem('userId');
        if (!userId) {
          this.message = 'User is not logged in.';
          this.messageType = 'error';
          return;
        }

        await this.$http.post(`/borrow/borrow?userId=${userId}&inventoryId=${inventoryId}`);
        this.message = 'Book borrowed successfully!';
        this.messageType = 'success';
        this.getBooks();
      } catch (error) {
        this.message = 'Borrow failed: ' + error.response.data.message;
        this.messageType = 'error';
      }
    },
    async returnBook(inventoryId) {
      try {
        const userId = this.userId || localStorage.getItem('userId');
        if (!userId) {
          this.message = 'User is not logged in.';
          this.messageType = 'error';
          return;
        }

        await this.$http.post(`/borrow/return?userId=${userId}&inventoryId=${inventoryId}`);
        this.message = 'Book returned successfully!';
        this.messageType = 'success';
        this.getBooks();
      } catch (error) {
        this.message = 'Return failed: ' + error.response.data.message;
        this.messageType = 'error';
      }
    }
  },
  created() {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      this.message = 'User is not logged in.';
      this.messageType = 'error';
      return;
    }
    this.getBooks();
  }
};
</script>

<style scoped>
/* Main container for borrow books */
.borrow-books-container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

/* Table styling for book list */
.book-list table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.book-list th, .book-list td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.book-list th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.book-list td {
  background-color: #fff;
}

/* Styling for action buttons */
.action-btn {
  padding: 8px 15px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.borrow-btn {
  background-color: #4CAF50;
  color: white;
}

.borrow-btn:hover {
  background-color: #45a049;
}

.return-btn {
  background-color: #f44336;
  color: white;
}

.return-btn:hover {
  background-color: #d32f2f;
}

/* Status label styling */
.status {
  font-weight: bold;
  padding: 5px;
  border-radius: 3px;
}

.available {
  background-color: #4caf50;
  color: white;
}

.borrowed {
  background-color: #f44336;
  color: white;
}

.maintenance {
  background-color: #ff9800;
  color: white;
}

.lost {
  background-color: #9e9e9e;
  color: white;
}

/* Message box styling */
.message-box {
  padding: 15px;
  margin-top: 20px;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  transition: all 0.3s ease;
}

/* Success message styling */
.success {
  background-color: #4caf50;
  color: white;
  border: 1px solid #388e3c;
}

/* Error message styling */
.error {
  background-color: #f44336;
  color: white;
  border: 1px solid #d32f2f;
}

/* Optional: For fading effect */
.message-box-enter-active, .message-box-leave-active {
  transition: opacity 1s;
}
.message-box-enter, .message-box-leave-to /* .message-box-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>

