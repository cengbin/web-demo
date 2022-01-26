<template>
  <li :class="['element-item',{'element-root':model.root}]">
    <div :class="['element-content',{'drag-enter':dragEnter,'drag-start':dragStart,'drag':drag}]" ref="content"
         :draggable="!model.root?true:false"
         @dragenter="dragEnterListener"
         @dragleave="dragLeaveListener"

         @drop="dropListener"

         @dragstart="dragStartListener"
         @drag="dragListener"
         @dragend="dragEndListener"
         @dragover="dragOverListener">
      <span class="btn-folder" v-if="isFolder" @click="model.open = !model.open">[{{model.open?'-':'+'}}]</span><!--
      --><span class="begin-tag">&lt;{{model.name}}&gt;</span><!--
      --><span v-if="!hasChildren">&lt;/{{model.name}}&gt;</span>
      <span v-else v-show="!model.open">...&lt;/{{model.name}}&gt;</span>
    </div>
    <ul class="element-list" v-show="model.open" v-if="isFolder">
      <element-item v-for="(element,idx) in model.children"
                    :model="element"
                    :key="idx">
      </element-item>
      <li><span class="add-next-sibling" @click="onClickAdd">+</span></li>
    </ul>
    <span class="end-tag" v-show="model.open" v-if="hasChildren">&lt;/{{model.name}}&gt;</span>
  </li>
</template>

<script>
  export default {
    name: 'element-item',
    props: {
      model: Object
    },
    data () {
      return {
        dragEnter: false,
        dragStart: false,
        drag: false
      }
    },
    computed: {
      isFolder: function () {
        return this.model.children && this.model.children.length
      },
      hasChildren () {
        return this.isFolder
      }
    },
    methods: {
      // 检测目标元素是否是: 根元素或目标元素是当前元素的子元素
      checkIllegal () {
        let currentModel = window.dragComponent.model
        let targetModel = this.model
        let parentModel = targetModel.parent

        if (targetModel.root || !parentModel) {
          return true
        }

        if (currentModel) {
          let bo = false
          while (parentModel) {
            if (parentModel === currentModel) {
              parentModel = null
              bo = true
            } else {
              parentModel = parentModel.parent
            }
          }
          return bo
        }

        return false
      },
      // 当拖动的元素或选择文本拖入有效的放置目标时，目标元素会触发此事件。
      dragEnterListener (event) {
        // console.log('dragenter :', this.model.name, event)
        this.dragEnter = true

        if (this.checkIllegal()) {
          this.dragEnter = false
        }
      },
      // 当拖动的元素或文本选择离开有效的放置目标时，会触发此事件。
      dragLeaveListener (event) {
        // console.log('dragleave :', this.model.name, event)
        this.dragEnter = false
      },
      // 当在有效放置目标上放置元素或选择文本时触发此事件。
      dropListener (event) {
        console.log('drop :', this.model.name, event)
        // let target = event.target
        // console.log(this, target)

        this.dragEnter = false

        if (!this.checkIllegal()) {
          let currentModel = window.dragComponent.model
          let targetModel = this.model
          // let parentModel = targetModel.parent

          if (currentModel && targetModel) {
            let cmp = currentModel.parent
            if (cmp) {
              let index = cmp.children.indexOf(currentModel)
              cmp.children.splice(index, 1)
              // console.log(cmp, index)
            }

            let tmp = targetModel.parent
            if (tmp) {
              let index = tmp.children.indexOf(targetModel)
              tmp.children.splice(++index, 0, currentModel)
              currentModel.parent = tmp
              // console.log(tmp, index)
            }
          }
        }
      },

      dragStartListener (event) {
        console.log('dragstart:', this.model.name)
        this.dragStart = true

        window.dragComponent = this
      },
      dragListener (event) {
        console.log('drag:', this.model.name)
        this.drag = true
      },
      dragEndListener (event) {
        // console.log('dragend :', event)
        console.log('dragend:', this.model.name)
        this.dragStart = false
        this.drag = false
      },

      // 当元素或者选择的文本被拖拽到一个有效的放置目标上时，触发 dragover 事件(每几百毫秒触发一次)。
      dragOverListener (event) {
        // console.log(event)
        // 阻止默认动作
        event.preventDefault()
      },
      onClickAdd () {
        this.model.children.push({
          name: 'div' + parseInt(Math.random() * 1000),
          parent: this.model
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .element-item {
    .element-content {
      font-size: 14px;
      transition: background-color 0.5s;
      &:hover {
        background-color: #ccc;

        .add-child {
          display: inline-block;
        }
      }

      .btn-folder {
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
