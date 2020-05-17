var dragged;

window.onload = function () {
  new Vue({
    el: '#app',
    mounted() {
      document.oncontextmenu = new Function('event.returnValue=false;'); //禁止右键
      document.onselectstart = new Function('event.returnValue=false;'); //禁止选中


      // 可拖动的目标元素会触发事件
      // document.addEventListener("drag", function (event) {
      //   console.log('drag')
      // }, false);
      //
      document.addEventListener("dragstart", function (event) {
        // console.log('dragstart', event.target, event.target['component'])
        // 保存拖动元素的引用(ref.)
        dragged = event.target;
        // 使其半透明
        event.target.style.opacity = .5;
      }, false);

      document.addEventListener("dragend", function (event) {
        console.log('dragend')
        // 重置透明度
        event.target.style.opacity = "";
      }, false);

      // 放下目标节点时触发事件
      document.addEventListener("dragover", function (event) {
        // console.log('dragover')
        // 阻止默认动作
        event.preventDefault();
      }, false);


      // 当拖动的元素或选择文本输入有效的放置目标时，会触发此事件。
      document.addEventListener("dragenter", function (event) {
        // console.log('输入有效的放置目标时，会触发此事件。');

        // 当可拖动的元素进入可放置的目标高亮目标节点
        if (event.target.className.indexOf('dropzone') !== -1 && dragged !== event.target) {
          // console.log('dragenter:', event.target);
          event.target.style.background = "purple";
        }
      }, false);

      // 当拖动的元素或文本选择离开有效的放置目标时，会触发此事件。
      document.addEventListener("dragleave", function (event) {
        // console.log('离开有效的放置目标时，会触发此事件。')

        // 当拖动元素离开可放置目标节点，重置其背景
        if (event.target.className.indexOf('dropzone') !== -1) {
          // console.log('dragleave:', event.target);
          event.target.style.background = "";
        }
      }, false);

      // 当在有效放置目标上放置元素或选择文本时触发此事件。
      document.addEventListener("drop", function (event) {
        // console.log('drop', event.target.className == "dropzone", dragged !== event.target)
        // 阻止默认动作（如打开一些元素的链接）
        event.preventDefault();

        // 移动拖动的元素到所选择的放置目标节点
        if (event.target.className == "dropzone" && dragged !== event.target) {
          // console.log('移动拖动的元素到所选择的放置目标节点')
          let target = event.target
          target.style.background = "";

          let draggedComponent = dragged['component'];
          let targetComponent = target['component'];

          console.log('draggedComponent', draggedComponent.model);
          console.log('targetComponent:', targetComponent.model);

          draggedComponent.model.parent.children.splice(draggedComponent.index, 1)

          // 文件夹
          if (targetComponent.isFolder) {
            targetComponent.model.children.unshift(draggedComponent.model)

            draggedComponent.model.parent = targetComponent.model
          } else {
            targetComponent.model.parent.children.splice(targetComponent.index, 0, draggedComponent.model)

            draggedComponent.model.paren = targetComponent.model
          }

          // dragged.parentNode.removeChild(dragged);
          // event.target.appendChild(dragged);
        }

      }, false);
    }
  })
}