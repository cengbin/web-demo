<template>
  <div class="login">
    <div class="center">
      <h1>注册</h1>
      <form>
        <div class="form-item">
          <label>Nickname</label>
          <input type="text" required placeholder="Enter your nickname">
        </div>
        <div class="form-item">
          <label>Username</label>
          <input type="text" required placeholder="Enter your username">
        </div>
        <div class="form-item">
          <label>Password</label>
          <input type="password" required placeholder="Enter your password">
        </div>
        <div class="form-item">
          <label>Confirm Password</label>
          <input type="password" required placeholder="Confirm your password">
        </div>
        <input type="button" value="注册"/>
        <div class="signup-link">
          Already have an account?
          <router-link to="/login">Login</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  /**
   * 参考：
   *
   * 视频教学 https://www.youtube.com/watch?v=U69WL9jInW0
   * 登陆页源码 https://www.codinglabweb.com/2020/12/animated-login-form-using-html-css.html
   * 注册页源码 https://www.codinglabweb.com/2021/01/responsive-registration-form-in-html-css.html
   *
   * */
  export default {
    name: "index"
  }
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #71b7e6, #9b59b6);

    .center {
      width: 400px;
      background-color: #fff;
      padding: 25px 30px 0;
      border-radius: 10px;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);

      h1 {
        position: relative;
        font-size: 25px;
        font-weight: 500;

        &:before {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 3px;
          width: 30px;
          border-radius: 5px;
          background: linear-gradient(135deg, #71b7e6, #9b59b6);
        }
      }

      form {
        margin: 20px 0 12px 0;
        box-sizing: border-box;

        .form-item {
          margin-bottom: 15px;

          label {
            display: block;
            font-weight: 500;
            margin-bottom: 5px;
          }

          input {
            height: 45px;
            width: 100%;
            outline: none;
            font-size: 16px;
            border-radius: 5px;
            padding-left: 15px;
            border: 1px solid #ccc;
            border-bottom-width: 2px;
            transition: all 0.3s ease;

            &:focus,
            &:valid {
              border-color: #9b59b6;
            }
          }
        }

        input[type=button] {
          width: 100%;
          height: 50px;
          border: 1px solid;
          background: #71b7e6;
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
            color: #71b7e6;
            text-decoration: none;
          }
        }
      }
    }
  }
</style>
