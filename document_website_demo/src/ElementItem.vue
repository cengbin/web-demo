<template>
  <li :class="['element-item']">
    <div :class="['element-content',('type'+(model.type?model.type:2))]">
      <span :class="['name']" @click="onClickName">{{model.name}}</span><!--
      --><span class="btn-folder" v-if="isFolder" @click="model.open = !model.open">[{{model.open?'-':'+'}}]</span>
    </div>
    <ul class="element-list" v-show="model.open" v-if="isFolder">
      <element-item v-for="(element,idx) in model.children"
                    :model="element"
                    :key="idx">
      </element-item>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'element-item',
    props: {
      model: Object
    },
    data () {
      return {}
    },
    computed: {
      isFolder: function () {
        return this.model.children && this.model.children.length
      },
      hasChildren () {
        return this.isFolder
      }
    },
    created () {
      // console.log(this.model)
    },
    methods: {
      onClickName () {
        let iframe = document.getElementById('riframe')
        // console.log(iframe, iframe.contentWindow)
        let {link, type} = this.model
        if (link && type === 3) {
          iframe.src = './static/markdown2html.html'
          iframe.onload = () => {
            iframe.contentWindow.postMessage({
              link: window.location.origin + this.model.link
            }, window.location.origin)
          }
        } else if (link && type === 5) {
          iframe.src = link
        }
      }
    }
  }
</script>

<style lang="stylus">
  li.element-item {
    list-style-type: none;
    margin: 1px 0;

    &:first-child {
      .type1 {
        padding-top: 0px !important;
        border-top: 0 !important;
      }
    }

    .element-content {
      font-size: 15px;
      line-height: 26px;
      transition: background-color 0.5s;
      color: var(--text-color);

      &.type2,
      &.type3 {
        &:hover {
          background-color: #e5e5e5;

          .add-child {
            display: inline-block;
          }
        }
      }

      &.type1 {
        margin: 16px 0;
        padding-top: 12px;
        border-top: var(--border-style);
        font-size: 18px;
        color: rgb(4, 158, 244);
      }
      &.type2 {
        color: rgb(158, 158, 158);
      }
      &.type3 {
        color: rgb(68, 68, 68);
      }

      .name {
        cursor: pointer;
        display: inline-block;
      }

      .btn-folder {
        cursor: pointer;
        font-size: 12px;
      }
    }

    .begin-tag,
    .end-tag {
      font-size: 14px;
    }

    .drag-enter {
      color: red;
      background-color: #eee;
    }
    .drag-start {
      opacity: 0.5;
    }
    .add-child {
      display: none;
    }
    .add-next-sibling {
      cursor: pointer;
    }
  }
</style>
