<template>
  <el-select @change="setGuests" multiple v-model="value" placeholder="Select">
    <el-option
      v-for="item in guests"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      <div style=" display:flex; justify-content: space-between">
      <!-- <div><span style="float: left">{{ item.label }}</span><div> -->
      <div><span>{{ item.label }}</span></div>
      <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
      <div><span><input @chang.prevent="" type="number" style="width:30px"></span></div>
      </div>
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        guests: [{
          value: `Adults`,
          label: 'Adults'
        }, {
          value: 'Children',
          label: 'Children'
        }, {
          value: 'Infants',
          label: 'Infants'
        },
        ],
        value: ''
      }
    },methods:{

        setGuests:{
    
        }
    }
  }
</script>