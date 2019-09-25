<template>
  <div class="my-list">
   <el-table
      :data="activitiesList"
      style="width: 100%">
    <el-table-column
      type="index">
    </el-table-column>
      <el-table-column
        prop="name"
        :label="ACTIVITY">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  ACTIVITY,
} from '../constants';


export default {
  name: 'MyList',
  components: {},
  data() {
    return {
      ACTIVITY,
    };
  },
  computed: {
    ...mapGetters(['activitiesList']),
  },
};
</script>
