<template>
  <div>
    <div class="artical">
      <h3>工具介绍：</h3>
      <p>本工具可以将宽高像素相同的逐帧图一键生成为连续帧的雪碧图（如果宽高不相同，将会以第一张图的宽高像素作为基准）</p>
      <h3>使用说明：</h3>
      <p>在输入框中分别输入单张图片的宽高像素，将已经命名规范的逐帧图一次全部上传（再次上传会覆盖之前上传的内容）。点击生成图片，右键保存图片即可！</p>
    </div>
    <div class="canvas-container">
      <canvas id="canvas" class="canvas" width="300" height="300"></canvas>
      <div>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Content',

  data() {
    return {
    };
  },

  computed: {
    singleWidth() {
      return false;
    },

    singleHeight() {
      return false;
    },
  },

  props: {
    urls: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },

    pixel: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
  },

  methods: {
    draw() {
      const canvas = this.$el.getElementById('canvas');
      const ctx = canvas.getContext('2d');

      ctx.drawImage();
    },
  },
};
</script>

<style>
  .artical{

    h3{
      font-size: 20px;
      color: #000;
    }
  }

  .canvas-container{

    .canvas{
      box-shadow: 0 0 1px #000 inset;
    }
  }
</style>
