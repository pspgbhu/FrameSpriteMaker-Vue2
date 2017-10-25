<!--
输出：
1 文件的url列表
2 创建的Image集合
2 新设置的像素参数

TODO:

 -->

<template lang="html">
  <div>
    <div class="sidebar shadow">

      <div>
        <label for="upImg" class="sidebar-btn">
          上传图片
          <input id="upImg" type="file" multiple @change="_uploadImg"/>
        </label>
      </div>

      <div v-if="informations.length > 0" class="sidebar-infor">
        <div v-for="item in informations">
          {{ item }}
        </div>
      </div>

      <div v-show="settings_show" class="settings">
        <div class="settings-item">
          <label>宽度：</label>
          <input v-model="width" min="0" type="number" placeholder="不填写则取默认值" /> px
        </div>

        <div class="settings-item">
          <label>高度：</label>
          <input v-model="height" min="0" type="number" placeholder="不填写则取默认值" /> px
        </div>
        <p class="tip">注：此为单张图片的宽高</p>
      </div>

      <div v-show="settings_show" class="settings">
        <div class="settings-item">
          <label>每行最大图片个数：</label>
          <input class="settings-line" v-model="line_num" type="number" placeholder="不填写则取默认值" :disabled="checked" /> 个
        </div>

        <div class="settings-item checkbox">
          <input id="singlerow" type="checkbox" v-model="checked" />
          <label>单行模式</label>
        </div>

        <p class="tip">注：图片个数超过该数量时，多出的图片将会折至第二行。开启单行模式时，会忽略每行最大图片数，将所有图片都生成在一行上</p>

      </div>

      <div v-show="settings_show">
        <div class="sidebar-btn" @click="_emitChange">
          生成图片
        </div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Sidebar',

  data() {
    return {
      informations: [],
      files: [],
      urls: [],
      settings_show: false,
      value: '',
      width: 0,
      height: 0,
      line_num: 10,
      checked: false,
    };
  },

  watch: {
    urls(val) {

      this.settings_show = true;

      this.files = this._creatImageDom(val);
      this.informations = this._checkInfors(this.files);

      this.files[0].onload = () => {
        const pixel = this._getPixel(this.files[0]);

        this.width = pixel.width;
        this.height = pixel.height;
      };
    },
  },

  methods: {
    _uploadImg(e) {

      const files = e.target.files;
      const filesArr = [];
      const urlList = [];

      if (files.length === 0) {
        return;
      }

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        files[i].index = /\d+/.exec(file.name);
        filesArr.push(file);
      }

      const sortedList = this._quickSort(filesArr);

      for (const v of sortedList) {
        const src = window.URL.createObjectURL(v);
        urlList.push(src);
      }

      this.urls = urlList;
    },

    _creatImageDom(urls) {
      const arr = [];

      urls.forEach((inval, index) => {
        arr[index] = new Image();
        arr[index].src = inval;
      });

      return arr;
    },

    _checkInfors(files) {
      const arr = [];
      files.forEach((inval, index) => {

        const img = inval;
        img.onload = () => {
          if ((inval.naturalWidth !== files[0].naturalWidth) ||
            (inval.naturalHeight !== files[0].naturalHeight)) {

            arr.push(`请检查第${index + 1}张图片像素是否一致！`);
          }
        };
      });

      return arr;
    },

    _getPixel(file) {
      const obj = {
        width: file.naturalWidth,
        height: file.naturalHeight,
      };

      return obj;
    },

    _emitChange() {
      const obj = {
        pixel: {
          width: this.width,
          height: this.height,
        },
        files: this.files,
        line: this.line_num,
        checked: this.checked,
      };

      this.$emit('change', obj);
    },

    _quickSort(arr) {
      if (arr.length <= 1) {
        return arr;
      }
      const pivotIndex = Math.floor(arr.length / 2);
      const pivot = arr.splice(pivotIndex, 1)[0];
      const left = [];
      const right = [];
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].index < pivot.index) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }
      return this._quickSort(left).concat([pivot], this._quickSort(right));
    },
  },
};
</script>

<style lang="">
  .sidebar{
    display: flex;
    border: 1px solid #aaa;
    border-radius: 5px;
    min-height: 300px;
    flex-direction: column;
    background-color: #fff;
    min-width: 100px;

    > div{
      padding: 20px;
      transition: height .5s ease-in;

      ~ div{
        border-top: 1px dashed #aaa;
      }

      .sidebar-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        border-radius: 5px;
        background-color: #09c;
        color: #fff;
        cursor: pointer;

        input{
          display: none;
        }
      }
    }

    .sidebar-infor{
      line-height: 20px;

      > div + div{
        margin-top: 10px;
      }
    }

    .settings {

      .settings-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        + .settings-item{
          margin-top: 20px;
        }

        label {
          flex: none;
        }

        input {
          flex: 1;
          display: block;
          padding: 5px 10px;
          border: 1px solid #aaa;
          background-color: #e9e9e9;
          border-radius: 4px;
          width: 40px;
        }

        &.checkbox{
          input {
            flex: none;
          }
        }

        .settings-line[disabled] {
          opacity: .5;
        }
      }
      .tip{
        margin-top: 10px;
      }
    }
  }
</style>
