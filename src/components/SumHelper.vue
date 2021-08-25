<template>
  <div class="sum-helper" :id="helper.id">
    <b-icon icon="x-square" v-on:click="removeHelper" class="remove-helper"></b-icon>
    <div class="sum-helper-wrapper">
      <div>
        <label class="helper-label" :for="inputId('size')">Size:</label>
        <input type="number"
               :id="inputId('size')"
               v-model="size"
               v-on:input="updateHelper"
               v-on:click="(e) => e.target.select()" />
      </div>
      <div>
        <label class="helper-label" :for="inputId('total')">Total:</label>
        <input type="number"
               :id="inputId('total')"
               v-model="total"
               v-on:input="updateHelper"
               v-on:click="(e) => e.target.select()" />
      </div>
      <hr/>
      <div>
        <label class="helper-label" :for="inputId('included')">Included:</label>
        <input type="text"
               :id="inputId('included')"
               v-model="included"
               v-on:input="updateHelper" />
      </div>
      <div>
        <label class="helper-label" :for="inputId('excluded')">Excluded:</label>
        <input type="text"
               :id="inputId('excluded')"
               v-model="excluded"
               v-on:input="updateHelper" />
      </div>
      <hr/>
      <div>
        <label class="helper-label" :for="inputId('min-size')">Min Size:</label>
        <input type="number"
               :id="inputId('min-size')"
               v-model="minSize"
               v-on:input="updateHelper"
               v-on:click="(e) => e.target.select()"
               v-bind:disabled="sizeDisabled" />
      </div>
      <div>
        <label class="helper-label" :for="inputId('max-size')">Max Size:</label>
        <input type="number"
               :id="inputId('max-size')"
               v-model="maxSize"
               v-on:input="updateHelper"
               v-on:click="(e) => e.target.select()"
               v-bind:disabled="sizeDisabled" />
      </div>
      <hr/>
      <div>
        <label class="helper-label" :for="inputId('min-total')">Min Total:</label>
        <input type="number"
               :id="inputId('min-total')"
               v-model="minTotal"
               v-on:input="updateHelper"
               v-on:click="(e) => e.target.select()"
               v-bind:disabled="totalDisabled" />
      </div>
      <div>
        <label class="helper-label" :for="inputId('max-total')">Max Total:</label>
        <input type="number"
               :id="inputId('max-total')"
               v-model="maxTotal"
               v-on:input="updateHelper"
               v-on:click="(e) => e.target.select()"
               v-bind:disabled="totalDisabled" />
      </div>
      <hr/>
      <div>
        <span class="hidden-field-label">Missing:</span> <span v-bind:class="{hidden: hideMissingField}" class="hidden-field">{{missing}}</span>
        <i v-on:click="toggleMissing" class="bi" v-bind:class="missingEye"></i>
      </div>
      <div>
        <span class="hidden-field-label">Required:</span> <span v-bind:class="{hidden: hideRequiredField}" class="hidden-field">{{required}}</span>
        <i v-on:click="toggleRequired" class="bi" v-bind:class="requiredEye"></i>
      </div>
      <div>
        <span class="hidden-field-label">Sum info:</span> <span v-bind:class="{hidden: hideSumField}" class="hidden-field">Min: {{minMaxSum.min}}; Max: {{minMaxSum.max}}</span>
        <i v-on:click="toggleSumInfo" class="bi" v-bind:class="sumEye"></i>
      </div>
      <div>
        <span class="hidden-field-label">Length info:</span> <span v-bind:class="{hidden: hideLengthField}" class="hidden-field">Min: {{minMaxLength.min}}; Max: {{minMaxLength.max}}</span>
        <i v-on:click="toggleLength" class="bi" v-bind:class="lengthEye"></i>
      </div>
      <div>Possibilities: {{possibilities}}</div>
    </div>
    <table class="table table-striped">
      <tbody>
        <combo-row
          v-for="combo in combos"
          v-bind:combo="combo"
          v-bind:key="combo"
          ></combo-row>
      </tbody>
    </table>
    <textarea v-model="notes" class="form-control"></textarea>
  </div>
</template>

<script>
  import * as helperUtils from '../lib/helperUtils.js'
  import ComboRow from './ComboRow.vue'
  export default {
    props:['helper'],
    data: function() {
      return {
        hideMissingField: true,
        hideRequiredField: true,
        hideLengthField: true,
        hideSumField: true,
        size: 0,
        total: 0,
        notes: '',
        included: '',
        excluded: '',
        minSize: 0,
        maxSize: 0,
        minTotal: 0,
        maxTotal: 0,
        combos: [],
        activeCombos: []
      }
    },
    computed: {
      possibilities: function() { return this.activeCombos.length },
      required: function() {
        if ( this.activeCombos.length == 0 ){
          return ''
        }
        let r = []
        var longest = this.activeCombos.reduce(
            function (a, b) {
                return a.length > b.length ? a : b;
            }
        );
        for (let x=0; x < longest.length; x++){
          let notFound = false
          for (let y=0; y < this.activeCombos.length; y++){
            if ( this.activeCombos[y].indexOf(longest[x]) < 0 ){
              notFound = true
              break
            }
          }
          if (!notFound) {
            r.push(longest[x])
          }
        }
        return r.join(',')
      },
      missing: function() {
        if (this.activeCombos.length == 0){
          return [1,2,3,4,5,6,7,8,9].join(',')
        }
        let m = []
        for (let x=1;x < 10; x++){
          const found = this.activeCombos.some(combo => String(combo).includes(x));
          if ( !found ){
            m.push(x)
          }
        }
        return m.join(',')
      },
      minMaxLength: function() {
        if (this.activeCombos.length == 0){
          return {"min":0,"max":0}
        }
        let min, max;
        min = max = this.activeCombos[0].length
        for (var x=1; x < this.activeCombos.length; x++){
          if ( this.activeCombos[x].length < min ){
            min = this.activeCombos[x].length
          }
          if ( this.activeCombos[x].length > max ){
            max = this.activeCombos[x].length
          }
        }
        return {"min": min, "max": max}
      },
      minMaxSum: function() {
        if (this.activeCombos.length == 0){
          return {"min":0,"max":0}
        }
        let min, max;
        min = max = helperUtils.sumOfDigits(this.activeCombos[0])
        for (var x=1; x < this.activeCombos.length; x++){
          let sum = helperUtils.sumOfDigits(this.activeCombos[x])
          if ( sum < min ){
            min = sum
          }
          if ( sum > max ){
            max = sum
          }
        }
        return {"min": min, "max": max}
      },
      sizeDisabled: function(){
        return this.size != '' && helperUtils.cleanZeroes(this.size) != '0'
      },
      totalDisabled: function(){
        return this.total != '' && helperUtils.cleanZeroes(this.total )!= '0'
      },
      missingEye: function(){
        return {
          "bi-eye": this.hideMissingField,
          "bi-eye-slash": !this.hideMissingField
        }
      },
      requiredEye: function(){
        return {
          "bi-eye": this.hideRequiredField,
          "bi-eye-slash": !this.hideRequiredField
        }
      },
      lengthEye: function(){
        return {
          "bi-eye": this.hideLengthField,
          "bi-eye-slash": !this.hideLengthField
        }
      },
      sumEye: function(){
        return {
          "bi-eye": this.hideSumField,
          "bi-eye-slash": !this.hideSumField
        }
      }
    },
    methods: {
      removeHelper: function() {
        this.$parent.removeHelper(this.helper.id)
      },
      updateHelper: function() {
        this.cleanInput();
        this.combos = [...helperUtils.getCombos({size: this.size,total: this.total,included: this.included,excluded: this.excluded,minSize: this.minSize,maxSize: this.maxSize,minTotal: this.minTotal,maxTotal: this.maxTotal})]
        this.activeCombos = [...helperUtils.getCombos({size: this.size,total:this.total,included:this.included,excluded:this.excluded,minSize:this.minSize,maxSize:this.maxSize,minTotal:this.minTotal,maxTotal:this.maxTotal})]
      },
      inputId: function(input){
        return input + '-' + this.helper.id
      },
      cleanInput: function() {
        this.size = helperUtils.cleanZeroes(this.size)
        this.total = helperUtils.cleanZeroes(this.total)
        this.minSize = helperUtils.cleanZeroes(this.minSize)
        this.minTotal = helperUtils.cleanZeroes(this.minTotal)
        this.maxSize = helperUtils.cleanZeroes(this.maxSize)
        this.maxTotal = helperUtils.cleanZeroes(this.maxTotal)
        this.cleanIncludedExcluded()
      },
      cleanIncludedExcluded: function() {
        let digits = this.included.split("")
        this.included = digits.filter((digit) => digit.match(/[1-9]/)).join("")
        this.included = this.included.split('').filter((v, i, a) => a.indexOf(v) === i).sort().join('')
        digits = this.excluded.split('')
        this.excluded = digits.filter((digit) => digit.match(/[1-9]/)).join('')
        this.excluded = this.excluded.split('').filter((v, i, a) => a.indexOf(v) === i).sort().join('')
      },
      toggleCombo: function(combo){
        combo = "" + combo
        let index = this.activeCombos.indexOf(combo)
        if ( index > -1 ){
          this.activeCombos.splice(index,1)
        } else {
          this.activeCombos.push(combo)
        }
      },
      showSize: function(){
        if (this.size != 0){
          return {display: 'block'}
        } else {
          return { display: 'none'}
        }
      },
      showTotal: function(){
        if (this.total != 0){
          return {display: 'block'}
        } else {
          return { display: 'none'}
        }
      },
      showIncluded: function(){
        if (this.included.length == 0)
          return {display: 'none'}
        return {display: 'block'}
      },
      showExcluded: function() {
        if (this.excluded.length == 0)
          return {display: 'none'}
        return {display: 'block'}
      },
      showMissing: function() {
        if (this.missing.length == 0)
          return {display: 'none'}
        return {display: 'block'}
      },
      showRequired: function() {
        if (this.required.length == 0)
          return {display: 'none'}
        return {display: 'block'}
      },
      toggleMissing: function(){
        this.hideMissingField = !this.hideMissingField
      },
      toggleRequired: function(){
        this.hideRequiredField = !this.hideRequiredField
      },
      showLength: function() {
        if (this.size == 0)
          return {display: 'block'}
        return {display: 'none'}
      },
      toggleLength: function(){
        this.hideLengthField = !this.hideLengthField
      },
      showSumInfo: function() {
        if (this.total == 0)
          return {display: 'block'}
        return {display: 'none'}
      },
      toggleSumInfo: function(){
        this.hideSumField = !this.hideSumField
      }
    },
    components: {
      ComboRow
    }
  }
</script>

<style>
  .remove-helper {
    float: right;
    margin-right: 5px;
    margin-top: 5px;
  }
  .sum-helper {
    margin-bottom: .75em;
    margin-right: .75em;
    padding: 0 !important;
    height: max-content !important;
    background-color: lightgrey;
    width: 20rem;
  }
  .sum-helper-wrapper {
    padding: 5px;
  }
  #sum-form .row {
    margin-bottom: 10px !important;
  }
  input {
    padding-left: 5px;
    width: 12rem;
  }
  hr {
    margin: .3rem !important;
  }
  #sum-form > div > div  {
    text-align: right;
  }
  .hidden {
    color: #666;
    background-color: #666;
  }
  .hidden:before {
    content: "\200D";
    display:inline;
   }
  .hidden-field {
    width: 12rem;
    display: inline-block;
  }
  .hidden-field-label, .helper-label {
    width: 5.5rem;
    display: inline-block;
    margin-bottom: 0;
  }
  .table th, .table td {
    padding: .25rem !important;
  }
  .sum-helper-wrapper input {
    margin-left: .25rem;
  }

</style>