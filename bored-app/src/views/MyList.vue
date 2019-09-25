<template>
  <div class="my-list">
   <el-table
      class="my-list__table"
      :data="activitiesList"
      :empty-text="NO_ACTIVITIES_TITLE"
      max-height="250"
      @selection-change="handleSelectionChange"
      >
    <el-table-column
      type="selection"
      width="40"
      >
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
    <el-table-column
      align="center"
      prop="budget"
      :label="BUDGET">
        <template slot-scope="scope">
            {{ isExpensive(activitiesList[scope.$index].budget) }}
        </template>
    </el-table-column>
    </el-table>
    <el-button
      class="full-width my-list__button"
      type="danger"
      :disabled="!activitiesList.length"
      @click="CLEAR_ACTIVITIES(selected)"
    >
      {{ selected.length ? CLEAR_SELECTED_TEXT : CLEAR_ALL_TEXT }}
    </el-button>
  </div>
</template>

<script>

import {
  mapGetters,
  mapMutations,
} from 'vuex';
import isExpensive from '../helpers/helper';
import {
  ACTIVITY,
  PARTICIPANTS,
  BUDGET,
} from '../constants';

const NO_ACTIVITIES_TITLE = 'No activities';
const CLEAR_ALL_TEXT = 'Clear all';
const CLEAR_SELECTED_TEXT = 'Clear selected';

export default {
  name: 'MyList',
  components: {},
  data() {
    return {
      selected: [],
      NO_ACTIVITIES_TITLE,
      CLEAR_ALL_TEXT,
      CLEAR_SELECTED_TEXT,
      ACTIVITY,
      PARTICIPANTS,
      BUDGET,
    };
  },
  methods: {
    ...mapMutations(['CLEAR_ACTIVITIES']),
    handleSelectionChange(value) {
      this.selected = value;
    },
    isExpensive,
  },
  computed: {
    ...mapGetters(['activitiesList']),
  },
};
</script>

<style lang="scss" scoped>
.my-list /deep/ {
  .el-table td {
    padding: 2px 0;
  }

  .el-table th {
    padding: 5px 0;
  }
}

.my-list {
  &__table {
    margin-bottom: 32px;
  }

  &__button {
    margin: 0;
  }
}
</style>
