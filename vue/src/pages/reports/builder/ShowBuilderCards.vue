<template>
  <div class="mb-2">
    <v-row dense>
      <v-col cols="12">
        <v-card class="general-stats-card">
          <v-card-title>
            {{ $t("general.statistics") }}
          </v-card-title>
          <v-card-text>
            <!-- <v-row v-if="loading">
              <v-col v-for="num in 7" :key="num">
                <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
              </v-col>
            </v-row> -->
            <v-row>
              <v-col
                cols="6"
                md="2"
                lg="2"
                v-for="(card, key) in cards"
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
                      :is="key === 'count' ? 'total' : key"
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
import total from "@/assets/images/statsIcons/Total.svg";
import people from "@/assets/images/statsIcons/People.svg";
import jacket from "@/assets/images/statsIcons/jacket.svg";
import helmet from "@/assets/images/statsIcons/helmet.svg";
import gloves from "@/assets/images/statsIcons/gloves.svg";
import smoke from "@/assets/images/statsIcons/Smoke.svg";
import leakage from "@/assets/images/statsIcons/Leakage.svg";
import waste from "@/assets/images/statsIcons/waste.svg";

export default {
  components: {
    total,
    protection_jacket: jacket,
    people_count: people,
    helmet,
    gloves,
    pollution: smoke,
    leakage,
    throwing_waste: waste
  },
  name: "ShowBuilderCards",
  props: {
    cards: Object,
    // loading: {
    //   type: Boolean,
    //   default: true
    // },
    outlined: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    isComponentRegistered(key) {
      const type = key === "count" ? "total" : key;
      return !!this.$options.components[type];
    },
    getColor(type) {
      const colors = {
        total: "primary--text",
        throwing_waste: "red--text",
        pollution: "orange--text",
        people_count: "indigo--text",
        protection_jacket: "yellow--text text--darken-1",
      };
      return type in colors ? colors[type] : "primary--text";
    }
  }
};
</script>

<style>
.general-stats-card .text-h6 {
  font-size: 1.25rem !important;
  line-height: 1.5rem;
  color: #4d4b55;
}

.v-avatar--variant-tonal::before {
  background-color: currentColor;
  bottom: 0;
  content: "";
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  opacity: 0.22;
}

.v-avatar--variant-tonal .v-icon {
  color: inherit;
}
.v-avatar--variant-tonal svg {
  width: 30px;
  height: 30px;
}
.v-application .text-caption {
  font-family: "Cairo", sans-serif !important;
}
</style>
