/**
 * 简版 Vue Tooltip 组件
 * 参考 Ant Design Tooltip 样式
 * 使用 Vue 2.6.10 Options API
 */
Vue.component('v-tooltip', {
    template: '\
        <span class="v-tooltip-wrapper" \
              ref="trigger" \
              @mouseenter="onMouseEnter" \
              @mouseleave="onMouseLeave">\
            <slot></slot>\
            <transition name="v-tooltip-fade">\
                <div v-if="visible" \
                     ref="popup" \
                     class="v-tooltip" \
                     :style="popupStyle">\
                    <div class="v-tooltip-content">{{ content }}</div>\
                    <div class="v-tooltip-arrow" :style="arrowStyle"></div>\
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
            popupStyle: {},
            arrowStyle: {}
        };
    },
    methods: {
        onMouseEnter: function () {
            if (!this.content) return;
            this.visible = true;
            this.$nextTick(this.updatePosition);
        },
        onMouseLeave: function () {
            this.visible = false;
            this.popupStyle = {};
            this.arrowStyle = {};
        },
        updatePosition: function () {
            var trigger = this.$refs.trigger;
            var popup = this.$refs.popup;
            if (!trigger || !popup) return;

            var triggerRect = trigger.getBoundingClientRect();
            var popupRect = popup.getBoundingClientRect();
            var gap = 8; // 间距

            var style = {};
            var arrow = {};

            if (this.placement === 'top') {
                style.position = 'fixed';
                style.left = (triggerRect.left + triggerRect.width / 2 - popupRect.width / 2) + 'px';
                style.top = (triggerRect.top - popupRect.height - gap) + 'px';

                // 如果顶部超出视口，改为底部显示
                if (triggerRect.top - popupRect.height - gap < 0) {
                    style.top = (triggerRect.bottom + gap) + 'px';
                    arrow.position = 'absolute';
                    arrow.bottom = '100%';
                    arrow.left = '50%';
                    arrow.transform = 'translateX(-50%)';
                    arrow.borderBottomColor = 'rgba(0, 0, 0, 0.75)';
                    arrow.borderTopColor = 'transparent';
                } else {
                    arrow.position = 'absolute';
                    arrow.top = '100%';
                    arrow.left = '50%';
                    arrow.transform = 'translateX(-50%)';
                    arrow.borderTopColor = 'rgba(0, 0, 0, 0.75)';
                    arrow.borderBottomColor = 'transparent';
                }
            } else {
                style.position = 'fixed';
                style.left = (triggerRect.left + triggerRect.width / 2 - popupRect.width / 2) + 'px';
                style.top = (triggerRect.bottom + gap) + 'px';

                // 如果底部超出视口，改为顶部显示
                if (triggerRect.bottom + popupRect.height + gap > window.innerHeight) {
                    style.top = (triggerRect.top - popupRect.height - gap) + 'px';
                    arrow.position = 'absolute';
                    arrow.top = '100%';
                    arrow.left = '50%';
                    arrow.transform = 'translateX(-50%)';
                    arrow.borderTopColor = 'rgba(0, 0, 0, 0.75)';
                    arrow.borderBottomColor = 'transparent';
                } else {
                    arrow.position = 'absolute';
                    arrow.bottom = '100%';
                    arrow.left = '50%';
                    arrow.transform = 'translateX(-50%)';
                    arrow.borderBottomColor = 'rgba(0, 0, 0, 0.75)';
                    arrow.borderTopColor = 'transparent';
                }
            }

            // 水平方向超出视口处理
            var left = parseFloat(style.left);
            if (left < 0) {
                style.left = '0px';
            } else if (left + popupRect.width > window.innerWidth) {
                style.left = (window.innerWidth - popupRect.width) + 'px';
            }

            this.popupStyle = style;
            this.arrowStyle = arrow;
        }
    }
});
