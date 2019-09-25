<template>
  <div class="my-list">
   <el-table
      :data="activitiesList"
      empty-text="No activities"
      style="width: 100%"
      >
    <el-table-column
      type="index">
    </el-table-column>
    <el-table-column
      min-width="150px"
      prop="name"
      :label="ACTIVITY">
    </el-table-column>
    <el-table-column
      align="center"
      prop="participants"
      :label="PARTICIPANTS">
    </el-table-column>
    <el-table-column
      align="center"
      prop="budget"
      :label="BUDGET">
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  ACTIVITY,
  PARTICIPANTS,
  BUDGET,
} from '../constants';


export default {
  name: 'MyList',
  components: {},
  data() {
    return {
      ACTIVITY,
      PARTICIPANTS,
      BUDGET,
    };
  },
  computed: {
    ...mapGetters(['activitiesList']),
  },
};
</script>
