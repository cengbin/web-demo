<template>
  <div class="page4">
    <ul style="color:rgba(200,200,200,0.5);">
      <li>无限嵌套数据本地实时搜索</li>
      <li>模糊/精确搜索</li>
      <li>高亮显示</li>
    </ul>
    <div>
      <div class="head">
        <input v-model="searchKeyword" placeholder="请输入搜素关键字">
        <span @click="onClickKeyword">a</span>
        <span @click="onClickKeyword">ab</span>
        <span @click="onClickKeyword">abc</span>
        <span @click="onClickKeyword">管理</span>
        <span @click="onClickClear">清空</span>
      </div>

      <input type="radio" id="one" value="One" v-model="searchType">
      <label for="one">模糊搜索</label>
      <input type="radio" id="two" value="Two" v-model="searchType">
      <label for="two">精确搜索</label>

      <p v-if="searchResult">总共搜索到 <span style="color:red;">{{searchResult.length}}</span> 条数据</p>
    </div>

    <TreeList :model="showMenuData"></TreeList>
  </div>
</template>

<script>
import TreeList from './TreeList'

import data from './data'

export default {
  name: 'page4',
  components: {
    TreeList
  },
  data() {
    return {
      searchKeyword: '',
      searchType: 'One',
      searchResult: null,
      allMenuData: data.data,
      showMenuData: data.data
    }
  },
  watch: {
    searchKeyword(newVal, oldVal) {
      this.onChange()
    },
    searchType(newVal, oldVal) {
      console.log(newVal)
      this.onChange()
    }
  },
  methods: {
    onClickKeyword(event) {
      this.searchKeyword = event.target.innerText
    },
    onClickClear() {
      this.searchKeyword = ''
      this.showMenuData = this.allMenuData
      this.searchResult = null
    },
    onChange() {
      console.log(this.searchKeyword)
      let val = this.searchKeyword
      if (!val) return

      let arr = []
      let fun = (item) => {
        let res = (this.searchType === 'One'
          ? fuzzySearch(item.name, val)
          : preciseSearch(item.name, val))
        // console.log(res)
        res && arr.push({
          name: res
        })
      }

      dfs(this.allMenuData, fun)

      this.searchResult = this.showMenuData = arr
    }
  },
  mounted() {}
}

function dfs(obj, fun) {
  if (Array.isArray(obj)) {
    obj && obj.forEach(ele => dfs(ele, fun))
  } else {
    fun(obj)
    obj.children && obj.children.forEach(ele => dfs(ele, fun))
  }
}

// 模糊搜索
function fuzzySearch(template, searchStr) {
  // let re = `(${searchStr.split('').join('|')})`
  // console.log(re)

  let pattern = new RegExp(searchStr, 'gi')
  let match = []
  let pointer = 0

  let html = ''

  while((match = pattern.exec(template)) !== null) {
    // console.log("match:", match)
    // console.log("下一次匹配开始的位置:", pointer)
    // console.log("匹配到的开始位置:", match.index)
    // console.log("匹配开始 - 匹配到之间的字符串:", template.slice(pointer, match.index))
    // console.log("匹配到的字符串:", match[0])

    html += template.slice(pointer, match.index)
    html += "<span class='red'>" + match[0] + '</span>'

    pointer = match.index + match[0].length
    // console.log(pointer)
    // console.log('\n')
  }

  if (!pointer) return false

  html += template.slice(pointer)

  return html
}

// 精确搜索
function preciseSearch(template, searchStr) {
  return (template.length === searchStr.length && template === searchStr) ? `<span class="red">${template}</span>` : false
}

// 防抖
// function debounce (fn, interval) {
//   let num = null
//   return function () {
//     if (num) clearTimeout(num)
//
//     num = setTimeout(fn, interval)
//   }
// }
</script>

<style lang="stylus">
.page4 {
  .head {
    span {
      cursor: pointer;
      background-color: rgba(204, 204, 204, 0.8);
      border-radius: 5px;
      padding: 0 4px;
      color: white;
      font-size: 14px;
    }
  }

  span.red {
    color: red;
    /*font-size: 24px;*/
  }
}
</style>
