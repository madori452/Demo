
<template>
    <div class="msg-div">
        <p class="msg-title">{{data.title}}</p>
    </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style>
.msg-div {
    min-width: 200px;
    padding: 0px;
    background-color: #fff;
    padding-bottom: 5px;
  }
.msg-title {
    margin: 0;
    padding-left: 5px;
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    color: #fff;
}
</style>
