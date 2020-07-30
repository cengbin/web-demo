Vue.component('item', {
  template: `
  <li class="item">
    <div class="dropzone" draggable="true" 
      ref="drop">
         <!--ondragstart="event.dataTransfer.setData('text/plain',null)">-->
      <span>{{index}}&lt;{{model.name}}&gt;</span>
      <span v-if="!hasChildren" @click="addChildren">+</span>
      <span v-if="isFolder" v-on:click="toggle">[{{open?'-':'+'}}]</span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <item v-for="(item, index) in model.children" :key="index" :index="index"  v-bind:model="item"></item>
      <li v-if="isAdd" class="add" v-on:click="addChild2"><span>+</span></li>
    </ul>
  </li>`,
  props: {
    model: Object,
    index: Number
  },
  data() {
    return {
      open: true
    }
  },
  computed: {
    hasChildren: function () {
      return this.model['children'] && this.model['children'].length > 0;
    },
    isFolder: function () {
      return this.model.children && this.model.children.length;
    },
    isAdd: function () {
      return this.model.name !== 'html'
    }
  },
  methods: {
    getComponent() {
      return this;
    },
    onDragListener() {
      // console.log('drag')
    },
    onDragStartListener(event) {
      // console.log('dragstart')
      dragged = event.target;
      event.target.style.opacity = .5;
    },
    onDragEndListener() {
      // console.log('dragend')
      event.target.style.opacity = "";
    },
    onDragOverListener(event) {
      event.preventDefault();
      // console.log('dragover', event)
    },
    toggle: function () {
      this.open = !this.open;
    },
    addChildren: function () {
      if (!this.model.hasOwnProperty('children')) this.$set(this.model, 'children', [])

      this.model.children.push({
        name: 'div'
      })
    },
    addChild2: function () {
      this.model.children.push({
        name: 'div'
      })
    }
  },
  created: function () {
    // console.log('created:', this.model.children);
  },
  mounted() {
    this.$refs.drop.component = this;
    // console.log('this.$refs:', this.$refs.drop.component )
  }
});