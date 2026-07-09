/**
 * 简版 Vue Tooltip 组件
 * 参考 Ant Design Tooltip 样式
 * 使用 Vue 2.6.10 Options API
 */
Vue.component('v-tooltip', {
    template: '\
        <span class="v-tooltip-wrapper" \
              @mouseenter="onMouseEnter" \
              @mouseleave="onMouseLeave">\
            <slot></slot>\
            <transition name="v-tooltip-fade">\
                <div v-show="visible" \
                     ref="popup" \
                     class="v-tooltip" \
                     :class="placementClass" \
                     :style="popupStyle">\
                    <div class="v-tooltip-content">{{ content }}</div>\
                    <div class="v-tooltip-arrow"></div>\
                </div>\
            </transition>\
        </span>',
    props: {
        content: {
            type: String,
            default: ''
        },
        placement: {
            type: String,
            default: 'top'
        }
    },
    data: function () {
        return {
            visible: false,
            popupStyle: {}
        };
    },
    computed: {
        placementClass: function () {
            return 'v-tooltip-' + this.placement;
        }
    },
    methods: {
        onMouseEnter: function () {
            if (!this.content) return;
            this.visible = true;
            this.$nextTick(this.updatePosition);
        },
        onMouseLeave: function () {
            // this.visible = false;
        },
        updatePosition: function () {
            var popup = this.$refs.popup;
            if (!popup) return;

            var rect = popup.getBoundingClientRect();
            var style = {};

            // 检查是否超出视口，自动调整位置
            if (this.placement === 'top' && rect.top < 0) {
                style.bottom = 'auto';
                style.top = '100%';
                style.marginTop = '8px';
                style.marginBottom = '0';
            }

            if (this.placement === 'bottom' && rect.bottom > window.innerHeight) {
                style.top = 'auto';
                style.bottom = '100%';
                style.marginBottom = '8px';
                style.marginTop = '0';
            }

            this.popupStyle = style;
        }
    }
});
