<template>
  <div class="activity">
    <el-input
      type="textarea"
      :autosize="{ minRows: INPUT_MIN_ROW_SIZE }"
      :placeholder="ACTIVITY_PLACEHOLDER_TEXT"
      v-model="currentActivity">
    </el-input>
  </div>
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from 'vuex';

const INPUT_MIN_ROW_SIZE = 4;
const ACTIVITY_PLACEHOLDER_TEXT = 'Type your activity here';

export default {
  name: 'Activity',
  components: {},
  data() {
    return {
      INPUT_MIN_ROW_SIZE,
      ACTIVITY_PLACEHOLDER_TEXT,
    };
  },
  methods: {
    ...mapMutations(['SET_ACTIVITY']),
  },
  computed: {
    currentActivity: {
      get() {
        return this.activity;
      },
      set(value) {
        this.SET_ACTIVITY(value);
      },
    },
    ...mapGetters(['activity']),
  },
};
</script>
