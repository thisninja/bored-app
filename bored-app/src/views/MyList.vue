<template>
  <div class="my-list">
   <el-table
      :data="activitiesList"
      :empty-text="NO_ACTIVITIES_TITLE"
      height="350"
      >
    <el-table-column
      type="selection"
      width="40">
    </el-table-column>
    <el-table-column
      type="index">
    </el-table-column>
    <el-table-column
      min-width="120px"
      prop="name"
      :label="ACTIVITY">
    </el-table-column>
    <el-table-column
      align="center"
      prop="participants"
      :label="PARTICIPANTS">
    </el-table-column>
    </el-table-column>
    <el-table-column
      align="center"
      prop="budget"
      :label="BUDGET">
        <template slot-scope="scope">
            {{ isExpensive(activitiesList[scope.$index].budget) }}
        </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>

const NO_ACTIVITIES_TITLE = 'No activities';

import { mapGetters } from 'vuex';
import isExpensive from '../helpers/helper';
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
      NO_ACTIVITIES_TITLE,
      ACTIVITY,
      PARTICIPANTS,
      BUDGET,
    };
  },
  methods: {
    isExpensive,
  },
  computed: {
    ...mapGetters(['activitiesList']),
  },
};
</script>
