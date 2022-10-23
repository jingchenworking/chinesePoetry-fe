<template>
  <div>
    <el-popover trigger="manual" v-model="visible" popper-class="multiple-search-select-popper">
      <div
        class="multiple-search-select el-select"
        :id="selectId"
        slot="reference"
        @click="visible = !visible"
      >
        <div class="el-select__tags">
          <span>
            <span
              v-for="(item, index) in selectedList"
              :key="index + '-selectedList'"
              class="el-tag el-tag--info el-tag--small el-tag--light"
            >
              <span class="el-select__tags-text">{{ item.label }}</span>
              <i @click="selectItem(item)" class="el-tag__close el-icon-close"></i>
            </span>
          </span>
        </div>
        <div class="el-input el-input--suffix" :class="{ 'is-focus': selecting }">
          <input
            tabindex="-1"
            type="text"
            readonly="readonly"
            autocomplete="off"
            :placeholder="selectedList.length == 0 ? '支持模糊搜索，多选，取消功能' : ''"
            class="el-input__inner select-input"
            :id="selectId + 'Input'"
            style="height: 40px"
          />
          <span
            class="el-input__suffix"
            @mouseover="handleHoverIcon(true)"
            @mouseleave="handleHoverIcon(false)"
            ><span class="el-input__suffix-inner"
              ><i
                v-show="!showEmptyIcon"
                :class="{
                  'is-reverse': visible,
                  'el-select__caret el-input__icon el-icon-arrow-up': true,
                }"
              ></i>
              <i
                v-show="selectedList.length != 0 && showEmptyIcon"
                @click="empty"
                class="el-select__caret el-input__icon el-icon-circle-close"
              ></i></span
          ></span>
        </div>
      </div>

      <div class="search-ul-wrap">
        <div class="el-input el-input--suffix">
          <input
            v-model="searchValue"
            type="text"
            autocomplete="off"
            placeholder="搜索"
            class="el-input__inner"
          />
          <i
            v-show="searchValue !== ''"
            @click="searchValue = ''"
            class="el-select__caret el-input__icon el-icon-circle-close close-icon"
          ></i>
        </div>
        <div class="el-scrollbar">
          <div class="el-select-dropdown__wrap el-scrollbar__wrap">
            <ul class="el-scrollbar__view el-select-dropdown__list">
              <!---->
              <li
                :class="{
                  'el-select-dropdown__item': true,
                  selected: values.indexOf(item.value) != -1,
                }"
                v-for="(item, index) in optionList"
                @click="selectItem(item)"
                :key="index + '-optionList'"
              >
                <span>{{ item.label }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>


<script>
export default {
  name: 'MultipleSearchSelect',
  props: {
    //   已选项，[{label:'',value:''}]
    selected: {
      type: Array,
      default: () => [],
    },
    // 选项，[{label:'',value:''}]
    options: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    visible: false, //下拉展示隐藏状态
    showEmptyIcon: false, //清空选择图标的展示隐藏状态
    selectedList: [], //本组件的已选项
    optionList: [], //本组件的选项
    searchValue: '', //搜索文本
    values: [], //纯数组:已选
    selectId: Math.ceil(Math.random() * 10000), //本组件唯一ID
    selecting: false, //正在选择状态
  }),
  watch: {
    //  TODO 监听搜索，展示符合条件的选项
    searchValue(val) {
      let arr = []
      this.options.map((item) => {
        if (item.label.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) != -1 || val == '') {
          arr.push(item)
        }
      })
      this.optionList = arr
    },
    selected(val) {
      this.selectedList = val
    },
    // 根据已选，筛选纯数组
    selectedList(val) {
      this.values = val.map((item) => {
        return item.value
      })
    },
  },
  mounted() {
    const t = this
    // props给data
    this.selectedList = this.selected
    this.optionList = this.options

    // 外部点击事件
    const dropdown = document.getElementById(this.selectId)
    document.addEventListener('click', function (event) {
      var target = event.target
      if (!dropdown || !dropdown.childNodes) return
      if (target === dropdown.children || dropdown.contains(target)) {
        return
      }
      t.visible = false
      document.getElementById(t.selectId + 'Input') &&
        document.getElementById(t.selectId + 'Input').blur()
      t.selecting = false
    })
    //TODO @XY 下拉器宽度
    // console.log(document.getElementById(t.selectId + 'Input').offsetWidth)
  },
  methods: {
    handleHoverIcon(sign) {
      this.showEmptyIcon = sign ? this.selectedList.length != 0 : sign
      if (!this.visible) {
        document.getElementById(this.selectId + 'Input').blur()
        this.selecting = false
      }
    },
    //全部清空
    empty() {
      this.selectedList.splice(0, this.selectedList.length)
    },
    // 选单个
    selectItem(selectedItem) {
      document.getElementById(this.selectId + 'Input').focus()
      this.selecting = true
      //   改变已选数组
      if (this.values.indexOf(selectedItem.value) === -1) {
        this.selectedList.push(selectedItem)
      } else {
        this.selectedList.splice(this.values.indexOf(selectedItem.value), 1)
      }
      //如果是搜索后点击，则触发清空搜索，节省用户操作（参照element的交互）
      if (this.searchValue != '') this.searchValue = ''
    },
  },
}
</script>

<style scoped lang="less">
.multiple-search-select {
  .el-select__tags {
    flex-wrap: nowrap;
  }
  .el-input__inner {
    padding-right: 5px;
    cursor: pointer;
    .el-select__caret {
      float: right;
      color: #c0c4cc;
      font-size: 14px;
      -webkit-transition: -webkit-transform 0.3s;
      transition: -webkit-transform 0.3s;
      -o-transition: transform 0.3s;
      transition: transform 0.3s;
      transition: transform 0.3s, -webkit-transform 0.3s;
      transition: transform 0.3s, -webkit-transform 0.3s;
      -webkit-transform: rotateZ(180deg);
      -ms-transform: rotate(180deg);
      transform: rotateZ(180deg);
      cursor: pointer;
    }
  }
  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: #f5f7fa;
    color: #606266;
  }
}
.search-ul-wrap {
  .el-input__inner {
    margin-left: 8px;
    margin-right: 8px;
    width: 94%;
  }
}
.selected {
  color: #409eff;
  &:after {
    position: absolute;
    right: 20px;
    font-family: element-icons;
    content: '\E6DA';
    font-size: 12px;
    font-weight: 700;
    -webkit-font-smoothing: antialiased;
  }
}
.el-tag.el-tag--info {
  margin-right: 2px;
  float: left;
}
.close-icon {
  position: absolute;
  right: 10px;
  top: 0;
  color: #c0c4cc;
  cursor: pointer;
}
// 隐藏两个之后的所有Tag，并在第三个Tag之前展示...
/deep/ .el-tag.el-tag--info:nth-child(n + 3) {
  width: 0;
  padding: 0;
  height: 0;
  margin: 0;
  color: rgba(255, 255, 255, 0);
  border-color: unset;
  background: none;
  i {
    display: none;
  }
}
/deep/ .el-tag.el-tag--info:nth-child(3) {
  position: relative;
  &:before {
    content: '...';
    position: absolute;
    left: 4px;
    top: -12px;
    width: 26px;
    height: 24px;
    padding: 0 8px;
    line-height: 22px;
    font-size: 12px;
    background-color: #f4f4f5;
    color: #909399;
    box-sizing: border-box;
    border: 1px solid #e9e9eb;
    border-radius: 4px;
  }
}

&::-webkit-scrollbar-track-piece {
  background: unset;
}
&::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
&::-webkit-scrollbar-thumb {
  transition: 0.3s background-color;
  background-color: rgba(144, 147, 153, 0.3);
  border-radius: 20px;
  width: 6px;
  height: 6px;
}
</style>
