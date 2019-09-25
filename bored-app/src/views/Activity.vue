<template>
  <div class="activity">
    <el-input
      type="textarea"
      :autosize="{ minRows: INPUT_MIN_ROW_SIZE }"
      :placeholder="ACTIVITY_PLACEHOLDER_TEXT"
      v-model="currentActivity">
    </el-input>
    <el-button
      class="activity__button"
      type="danger"
      @click="handleSaveActivity"
      >
      {{ SAVE_FOR_LATER_TEXT }}
    </el-button>
  </div>
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from 'vuex';

const INPUT_MIN_ROW_SIZE = 4;
const SAVE_FOR_LATER_TEXT = 'Save for later';
const ACTIVITY_PLACEHOLDER_TEXT = 'Type your activity here';

export default {
  name: 'Activity',
  components: {},
  data() {
    return {
      SAVE_FOR_LATER_TEXT,
      INPUT_MIN_ROW_SIZE,
      ACTIVITY_PLACEHOLDER_TEXT,
    };
  },
  methods: {
    ...mapMutations([
      'SET_ACTIVITY',
      'SAVE_ACTIVITY_TO_LIST',
    ]),
    handleSaveActivity() {
      this.SAVE_ACTIVITY_TO_LIST({
        name: this.currentActivity,
      });
      this.SET_ACTIVITY('');
    },
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

<style lang="scss" scoped>

.activity__button {
  width: 100%;
}

</style>
