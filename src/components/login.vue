<template>
  <div class="login_container">
    <div class="login_box">
      <!-- login -->
      <div class="avatar_box">
        <img src="../assets/login1.jpeg" alt="" />
      </div>

      <!-- 表单 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            placeholder="账号"
            v-model="loginForm.username"
            prefix-icon="el-icon-search"
            ref="mark"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            v-model="loginForm.password"
            prefix-icon="el-icon-search"
            type="password"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" round @click="login">登陆</el-button>
          <el-button type="info" round @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$refs.mark.focus();
  },
  data() {
    return {
      //数据绑定
      loginForm: {
        username: "",
        password: "",
      },

      //表单验证
      loginFormRules: {
        username: [
          { required: true, message: "请输入登陆名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登陆密码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //重置
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    //登陆
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);

        if (res.meta.status !== 200) return this.$message.error("登陆失败");
        this.$message.success("登陆成功");

        //保存token
        window.sessionStorage.setItem("token", res.data.token);
        //编程式导航跳转
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang = 'less' scoped>
.login_container {
  background: url("../assets/banner.jpeg") no-repeat center;
  background-size: cover;
  height: 100%;
  .login_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 540px;
    height: 325px;
    background-color: rgba(134, 134, 134, 0.7);
    border-radius: 5px;
  }
}

.avatar_box {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 130px;
  width: 130px;
  border: 1px solid #ccc;
  border-radius: 50%;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
    animation: move 15s linear infinite;
  }

  @keyframes move {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}

.login_form {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  .btns {
    display: flex;
    justify-content: center;
  }
}
</style>