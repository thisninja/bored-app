<template>
  <div class="activity">
    <div class="activity__info">
      <h2 class="activity__label">
        {{ ACTIVITY_LABEL }}
      </h2>
      <div class="activity__content">
        <el-input
          class="activity__editor"
          type="textarea"
          :rows="INPUT_ROW_SIZE"
          resize="none"
          :placeholder="ACTIVITY_PLACEHOLDER_TEXT"
          v-model="currentActivity">
        </el-input>
      </div>
      <el-button
        :disabled="!currentActivity"
        class="activity__button"
        type="danger"
        @click="handleSaveActivity"
        >
        {{ SAVE_FOR_LATER_TEXT }}
      </el-button>
    </div>
    <div class="activity__details">
      <h2 class="activity__detail-label">
        {{ ACTIVITY_DETAILS }}
      </h2>
      <div class="activity__content">
        <div class="activity__filter">
          <span class="activity__input-label">
            {{ TYPE_LABEL_TEXT }}
          </span>
          <el-select v-model="type" clearable placeholder="Select">
            <el-option
              v-for="(item, index) in types"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="activity__filter">
          <span class="activity__input-label">
            {{ PARTICIPANTS }}
          </span>
          <el-input-number
            v-model="participants"
            :min="MIN_PARTICIPANTS_NUMBER"
            :max="MAX_PARTICIPANTS_NUMBER"
          >
          </el-input-number>
        </div>
        <div class="activity__filter">
          <span class="activity__input-label">
            {{ BUDGET }}
          </span>
          <el-switch
            v-model="lowBudget"
            active-text="expensive"
            inactive-text="cheap">
          </el-switch>
        </div>
      </div>
      <el-button
        class="activity__button"
        type="primary"
        @click="handleHitMeButton"
        >
        {{ HIT_ME_BUTTON_TEXT }}
      </el-button>
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from 'vuex';

import {
  PARTICIPANTS,
  BUDGET,
} from '../constants';

const ACTIVITY_LABEL = 'You should:';
const INPUT_ROW_SIZE = 4;
const SAVE_FOR_LATER_TEXT = 'Save for later';
const ACTIVITY_PLACEHOLDER_TEXT = 'Type your activity here';
const ACTIVITY_DETAILS = 'Activity Details:';
const HIT_ME_BUTTON_TEXT = 'Hit me with another one';
const TYPE_LABEL_TEXT = 'Type';
const MIN_PARTICIPANTS_NUMBER = 1;
const MAX_PARTICIPANTS_NUMBER = 9999999;

export default {
  name: 'Activity',
  components: {},
  data() {
    return {
      type: '',
      lowBudget: false,
      participants: 1,
      BUDGET,
      PARTICIPANTS,
      MIN_PARTICIPANTS_NUMBER,
      MAX_PARTICIPANTS_NUMBER,
      ACTIVITY_LABEL,
      ACTIVITY_DETAILS,
      SAVE_FOR_LATER_TEXT,
      INPUT_ROW_SIZE,
      ACTIVITY_PLACEHOLDER_TEXT,
      HIT_ME_BUTTON_TEXT,
      TYPE_LABEL_TEXT,
      types: ['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork'],
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
        participants: 4,
        budget: 'cheap',
      });
      this.SET_ACTIVITY('');
    },
    handleHitMeButton() {
      // @TODO:
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
@import '../assets/scss/_variables.scss';

.activity {
  &__info,
  &__details {
    display: inline-block;
  }

  &__content {
    height: 200px;
  }

  &__details {
    width: 40%;
  }

  &__info {
    width: 55%;
    margin-right: 5%;
  }

  &__editor {
    font-size: 28px;
  }

  &__filter {
    margin: 5px 0;
  }

  &__input-label {
    color: $grey-100;
  }

  &__button {
    margin-top: 10px;
    width: 100%;
  }
}

.el-select-dropdown__item {
  text-transform: capitalize;
}

</style>
