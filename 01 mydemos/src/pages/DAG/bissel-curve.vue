<template>
  <svg :width="width" :height="height">
    <path :d="d"
          stroke="black"
          stroke-width="2"
          fill="none"/>
  </svg>
</template>

<script>
  export default {
    name: "bissel-curve",
    props: ['width', 'height'],
    data() {
      return {
        // width: 200,
        // height: 200
      }
    },
    computed: {
      d() {
        // return `M 0,0 C 50,0 50,100 ${this.width - 2},${this.height - 2}`
        // return `M 0,0 L 100,100`

        const startX = 2, startY = this.height - 2, endX = this.width - 2, endY = 2;
        // return `M ${startX},${startY} L ${endX},${endY}`

        const yOffset = Math.abs(endY - startY) / 2;
        const centerY = endY < startY ? endY + yOffset : endY - yOffset;

        const xOffset = Math.abs(endX - startX) / 2;
        const centerX = endX < startX ? endX + xOffset : endX - xOffset;

        return `M ${startX},${startY} C ${centerX},${startY} ${centerX},${endY} ${endX},${endY}`;
      }
    }
  }
</script>

<style scoped>

</style>
