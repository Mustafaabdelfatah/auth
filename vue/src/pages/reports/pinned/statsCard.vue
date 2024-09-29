<template>
  <div class="mb-2">
    <v-row dense>
      <v-col cols="12">
        <v-card class="general-stats-card">
          <v-card-title>
            {{ $t("general.statistics") }}
          </v-card-title>
          <v-card-text>
            <v-row v-if="isLoading">
              <v-col v-for="num in 7" :key="num">
                <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col
                cols="6"
                md="2"
                lg="2"
                v-for="(card, key) in modCards"
                :key="key"
              >
                <div class="d-flex " :id="key">
                  <v-avatar
                    size="42"
                    class="me-3 v-avatar--variant-tonal "
                    :class="getColor(key)"
                    variant="tonal"
                  >
                    <component
                      :is="key"
                      v-if="isComponentRegistered(key)"
                    ></component>
                  </v-avatar>
                  <div class="d-flex flex-column">
                    <span class="text-h5 font-weight-medium">{{ card }}</span>
                    <span class=" text-caption">
                      {{ $t("general." + key) }}
                    </span>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import total from "@/assets/images/statsIcons/Total.svg";
import people from "@/assets/images/statsIcons/People.svg";
import jacket from "@/assets/images/statsIcons/jacket.svg";
import helmet from "@/assets/images/statsIcons/helmet.svg";
import gloves from "@/assets/images/statsIcons/gloves.svg";

export default {
  components: {
    total,
    protection_jacket: jacket,
    people_count: people,
    helmet,
    gloves
  },
  data() {
    return {
      isLoading: false,
      modCards: {
        total: 20,
        people_count: 5,
        helmet: 4,
        gloves: 6,
        protection_jacket: 5
      }
    };
  },
  created() {},
  mounted() {
    this.cardsData();
  },

  methods: {
    ...mapActions("events", ["getCards"]),
    isComponentRegistered(key) {
      return !!this.$options.components[key];
    },
    getColor(type) {
      const colors = {
        total: "primary--text",
        people_count: "red--text",
        helmet: "orange--text",
        gloves: "indigo--text",
        protection_jacket: "yellow--text text--darken-1"
      };
      return type in colors ? colors[type] : "primary--text";
    },
    cardsData(dateRange = {}) {
      this.isLoading = true;
      const { id } = this.$route.params;
      let data = {
        locationId: id,
        startDate: dateRange.startDate
          ? moment(dateRange.startDate).format("YYYY-MM-DD")
          : "",
        endDate: dateRange.endDate
          ? moment(dateRange.endDate).format("YYYY-MM-DD")
          : ""
      };
      this.getCards(data)
        .then(() => {
          this.isLoading = false;

          // if(itemsPerPage != -1) {
          //   this.items = this.events.data
          //   this.total = this.events.total
          //   this.numberOfPages = this.events.last_page
          // }else{
          //   this.items = this.events
          //   this.total = this.events.length
          //   this.numberOfPages = 1
          // }
        })
        .catch(() => {
          this.isLoading = false;
        });
    }
  },
  computed: {
    ...mapState("events", ["cards"])
  }
};
</script>

<style>
.general-stats-card .text-h6 {
  font-size: 1.25rem !important;
  line-height: 1.5rem;
  color: #4d4b55;
}

.general-stats-card .col-lg-2 {
  flex: 0 0 20%;
  max-width: 20%;
}
</style>
