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
          <el-select
            v-model="currentType"
            placeholder="Select"
            size="mini"
            >
            <el-option
              v-for="(item, index) in TYPES"
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
            size="mini"
            v-model="currentParticipants"
            :min="MIN_PARTICIPANTS_NUMBER"
            :max="MAX_PARTICIPANTS_NUMBER"
          >
          </el-input-number>
        </div>
        <div class="activity__filter">
          <span class="activity__input-label">
            {{ BUDGET }}
          </span>
          <div class="activity__budget">
          <el-slider
            v-model="currentBudget"
            :marks="marks">
          </el-slider>
          </div>
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
  mapActions,
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
const TYPES = ['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork'];

export default {
  name: 'Activity',
  components: {},
  data() {
    return {
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
      TYPES,
      marks: {
        0: {
          style: {
            marginLeft: '15px',
          },
          label: 'cheap',
        },
        100: {
          style: {
            paddingRight: '60px',
          },
          label: 'expensive',
        },
      },
    };
  },
  methods: {
    ...mapMutations([
      'SET_BUDGET',
      'SET_TYPE',
      'SET_ACTIVITY',
      'SET_PARTICIPANTS',
      'SAVE_ACTIVITY_TO_LIST',
    ]),
    ...mapActions(['fetchActivity']),
    handleSaveActivity() {
      this.SAVE_ACTIVITY_TO_LIST({
        uid: `${Math.round(Math.random() * 100)}_${Date.now()}`,
        name: this.currentActivity,
        participants: this.currentParticipants,
        budget: this.currentBudget,
      });
      this.SET_ACTIVITY('');
    },
    handleHitMeButton() {
      this.fetchActivity();
    },
  },
  computed: {
    currentBudget: {
      get() {
        return this.budget;
      },
      set(value) {
        this.SET_BUDGET(value);
      },
    },
    currentType: {
      get() {
        return this.type;
      },
      set(value) {
        this.SET_TYPE(value);
      },
    },
    currentActivity: {
      get() {
        return this.activity;
      },
      set(value) {
        this.SET_ACTIVITY(value);
      },
    },
    currentParticipants: {
      get() {
        return this.participants;
      },
      set(value) {
        this.SET_PARTICIPANTS(value);
      },
    },
    ...mapGetters([
      'activity',
      'participants',
      'budget',
      'type',
    ]),
  },
};
</script>

<style lang="scss" scoped>

.activity /deep/ {
  .el-select-dropdown__item {
    text-transform: capitalize;
  }

  .el-slider__stop {
    background-color: unset;
  }

  .el-select,
  .el-input-number {
    margin-top: 2px;
  }

  .el-slider__runway {
    margin: 16px 5px;
    width: 94%;

    .el-slider__button {
      width: 8px;
      height: 8px;
    }
  }
}

.activity {
  &__info,
  &__details {
    display: inline-block;
  }

  &__content {
    height: 200px;

    .activity__filter:last-child .activity__input-label {
      position: relative;
      top: 5px;
    }
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
    font-size: 12px;
    color: $grey-100;
  }

  &__button {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
