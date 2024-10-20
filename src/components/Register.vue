<template>
  <div class="register-container">
    <h1>Register</h1>

    <!-- Registration Form -->
    <form @submit.prevent="register" class="register-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" v-model="userName" required class="input-field" placeholder="Enter your username">
      </div>
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input type="text" v-model="phoneNumber" required class="input-field" placeholder="Enter your phone number">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" required class="input-field" placeholder="Enter your password">
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" v-model="confirmPassword" required class="input-field" placeholder="Confirm your password">
      </div>
      <button type="submit" class="submit-btn">Register</button>
    </form>

    <!-- Error Message Box -->
    <div v-if="errorMessage" class="message-box error">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserRegisterForm',
  data() {
    return {
      userName: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      try {
        const response = await this.$http.post('/users/register', {
          userName: this.userName,
          phoneNumber: this.phoneNumber,
          passwordHash: this.password
        });
        console.log('Registration successful', response.data);
        
        // Register successful, redirect to login page
        this.$router.push({ name: 'Login' });
      } catch (error) {
        // Handle error response from backend
        if (error.response && error.response.data && error.response.data.message) {
            this.errorMessage = 'Registration failed: ' + error.response.data.message;
        } else {
            this.errorMessage = 'Registration failed due to an unknown error.';
        }
      }
    }
  }
};
</script>

<style scoped>
/* Main container styling */
.register-container {
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}

h1 {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

/* Form styling */
.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.label {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.input-field {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 5px;
  box-sizing: border-box;
}

.input-field:focus {
  border-color: #4CAF50;
  outline: none;
}

/* Submit button styling */
.submit-btn {
  padding: 14px 0;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #45a049;
}

.submit-btn:focus {
  outline: none;
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

/* Error message styling */
.message-box.error {
  background-color: #f44336;
  color: white;
  border: 1px solid #d32f2f;
}

.message-box-enter-active, .message-box-leave-active {
  transition: opacity 1s;
}

.message-box-enter, .message-box-leave-to /* .message-box-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
