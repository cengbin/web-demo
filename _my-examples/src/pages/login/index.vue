<template>
  <div class="login">
    <div class="center">
      <h1>欢迎</h1>
      <form>
        <div class="form-item">
          <input type="text" required>
          <label>Username</label>
          <p></p>
        </div>
        <div class="form-item">
          <input type="password" required>
          <label>Password</label>
          <p></p>
        </div>
        <div class="forgot">Forgot Password?</div>
        <input type="button" value="登陆"/>
        <div class="signup-link">
          not a member?
          <router-link to="/registration">Signup</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  /**
   * 参考
   *
   * 视频教学 https://www.youtube.com/watch?v=eeHqZeJ9Vqc
   * 源码链接1 https://www.codingnepalweb.com/
   * 源码链接2 https://drive.google.com/file/d/1BGxMrj7umpStrk-g_H1A_LJ0ovlKNJoo/view
   * */
  export default {
    name: "index",
  }
</script>

<style lang="scss" scoped>
  .login {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(120deg, #2980b9, #8e44ad);

    .center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      background: white;
      border-radius: 10px;
      box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.05);

      h1 {
        text-align: center;
        padding: 20px 0;
        border-bottom: 1px solid silver;
      }

      form {
        padding: 0 40px;
        box-sizing: border-box;

        .form-item {
          position: relative;
          border-bottom: 2px solid #adadad;
          margin: 30px 0;

          input {
            width: 100%;
            padding: 0 5px;
            height: 40px;
            font-size: 16px;
            border: none;
            background: none;
            outline: none;

            &:focus,
            &:valid {

              ~ label {
                top: -5px;
                color: #2691d9;
              }

              ~ p {
                width: 100%;
              }
            }
          }

          label {
            position: absolute;
            top: 50%;
            left: 5px;
            color: #adadad;
            transform: translateY(-50%);
            font-size: 16px;
            pointer-events: none;
            transition: all 0.5s ease-in-out;
          }

          p {
            position: absolute;
            top: 40px;
            left: 0;
            width: 0%;
            height: 2px;
            background: #2691d9;
            transition: .5s;
          }
        }

        .forgot {
          margin: -5px 0 20px 5px;
          color: #a6a6a6;
          cursor: pointer;
        }

        input[type=button] {
          width: 100%;
          height: 50px;
          border: 1px solid;
          background: #2691d9;
          border-radius: 25px;
          font-size: 18px;
          color: #e9f4fb;
          font-weight: 700;
          cursor: pointer;
          outline: none;
        }

        .signup-link {
          margin: 30px 0;
          text-align: center;
          font-size: 16px;
          color: #666666;

          a {
            color: #2691d9;
            text-decoration: none;
          }
        }
      }
    }
  }
</style>
