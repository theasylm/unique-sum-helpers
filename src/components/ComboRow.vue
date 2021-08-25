<template>
  <tr v-bind:class="{removed: removed}">
    <td class="col-2" v-bind:class="{hidetotal: hideTotal}"><span class="combo-total">{{total}}</span></td>
    <td class="col"><span class="combo">{{combo}}</span></td>
    <td class="col-1 remove-icon"><i v-on:click="toggleRemoved" :data-combo="combo" class="bi" v-bind:class="plusOrMinus"></i></td>
  </tr>
</template>

<script>
  import * as helperUtils from '../lib/helperUtils.js'
  import $ from 'jquery'
  export default {
    props: ['combo'],
    data: function(){
      return {
        removed: false
      }
    },
    computed: {
      hideTotal: function() {
        return this.$parent.total != 0
      },
      total: function(){
        return helperUtils.sumOfDigits(this.combo)
      },
      plusOrMinus: function() {
        return {
          "bi-dash-circle": !this.removed,
          "bi-plus-circle": this.removed
        }
      },
    },
    methods: {
      toggleRemoved: function(e) {
        this.$parent.toggleCombo($(e.target).data('combo'))
        this.removed = !this.removed;
      }
    }
  }
</script>

<style>
  .removed {
    color: #999 !important;
  }
  i {
    color: black;
    cursor: pointer;
    margin-left: 0.60rem;
  }
  .combo-total {
    font-weight:  bold;
  }
  .remove-icon {
    text-align:  right;
  }
  .hidetotal {
    display: none;
  }
</style>