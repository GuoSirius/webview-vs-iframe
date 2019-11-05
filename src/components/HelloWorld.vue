<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <webview
      id="aoWebview"
      src="http://mozilla.github.io/pdf.js/web/viewer.html"
      style="display:inline-flex; width:480px; height:300px"
    />

    <iframe
      id="aoIframeLocal"
      src="http://mozilla.github.io/pdf.js/web/viewer.html"
      style="display:inline-flex; width:480px; height:300px"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
