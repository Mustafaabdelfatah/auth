<script>
import * as docx from "docx-preview";
// import { mapActions, mapState } from "vuex";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      breadcrumbs: [
        {
          text: this.$t("menu.files"),
          disabled: false,
          href: "#"
        }
      ],
      tab: null,
      analyizedData: {
        id_number: "24",
        full_name: "Shay Hassan Mo Ahmed",
        first_name: "shady ",
        second_name: "hassan",
        third_name: "mo",
        fourh_name: "ahmed",
        email: "salama@s.com",
        phone: "811 677 9317",
        gender: "male",
        socialStatus: "single",
        age: "2008-08-05",
        address: "Debitis modi excepte",
        nationality: "أرمينيا",
        city: "Ad-Dilam",
        summary: "A results-driven and experienced HR",
        education: {
          degree: "Bachelor’s Degree in Human Resources",
          university: "King Abdulaziz University",
          graduated_at: "2024-08-13",
          gpa: 3.5,
          gpa_from: "4 / 5 / 100"
        },
        skills: [
          "Html5",
          "Css3",
          "Javascript",
          "Bootstrap",
          "React",
          "Vue",
          "Vux",
          "Nuxt3"
        ],
        work_experience: [
          {
            organization_name: "Zain - Telecommunication, KSA",
            start_date: "2024-08-13",
            end_date: "2024-09-13",
            Position: "Customer Service"
          },
          {
            organization_name: "Mobily - Telecommunication, KSA",
            start_date: "2024-08-13",
            end_date: "2024-09-13",
            Position: "Customer Service"
          }
        ],
        "certifications or trainning-courses": [
          {
            name: "Wakeb",
            address: "Egypt",
            start_date: "2024-08-13",
            end_date: "2024-09-13"
          },
          {
            name: "Wakeb",
            address: "Egypt",
            start_date: "2024-08-13",
            end_date: "2024-09-13"
          }
        ],
        languages: [
          {
            name: "Arabic",
            proficiency: "Native"
          },
          {
            name: "English",
            proficiency: "Fluent"
          }
        ]
      },
      headingArray: [
        "heading1",
        "heading2",
        "heading3",
        "heading4",
        "heading5"
      ],
      infoArray: [docx, docx, docx, docx, docx],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  computed: {
    ...mapState("app", ["pageTitle", "pageDesc"])
  },
  methods: {
    ...mapActions("app", ["setBreadCrumb"])
  },
  created() {
    this.setBreadCrumb({
      breadcrumbs: this.breadcrumbs,
      pageTitle: this.$t("menu.personalFile")
      // pageDesc: this.$t("files.pageDesc")
    });
    this.fetchFiles();
  }
};
</script>

<template>
  <div class="w-100 analyzed__container">
    <div class="d-flex justify-space-between align-center">
      <div class="page_info">
        <h2 class="mb-2">{{ pageTitle }}</h2>
        <!-- <p>{{ pageDesc }}</p> -->
      </div>
    </div>
    <v-card class="h-100">
      <v-toolbar color="white" dark flat>
        <template v-slot:extension>
          <v-tabs v-model="tab" align-with-title>
            <v-tabs-slider color="var(--v-primary-base)"></v-tabs-slider>
            <v-tab>
              <v-icon class="pe-1" color="var(--v-primary-base)"
                >mdi-account-circle</v-icon
              >

              {{ $t("analyzed.basicsInformation") }}</v-tab
            >
            <v-tab>
              <v-icon class="pe-1" color="var(--v-primary-base)"
                >mdi-pencil-circle</v-icon
              >

              {{ $t("analyzed.skills") }}</v-tab
            >
            <v-tab>
              <v-icon class="pe-1" color="var(--v-primary-base)"
                >mdi-brain</v-icon
              >

              {{ $t("analyzed.work_experience") }}</v-tab
            >
            <v-tab>
              <v-icon class="pe-1" color="var(--v-primary-base)"
                >mdi-certificate</v-icon
              >
              {{ $t("analyzed.certifications_or_trainning_courses") }}</v-tab
            >
            <v-tab>
              <v-icon class="pe-1" color="var(--v-primary-base)"
                >mdi-earth</v-icon
              >
              {{ $t("analyzed.languages") }}</v-tab
            >
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tab" class="mt-4 px-14 tabs__content">
        <v-tab-item class="tabs__content__info">
          <ul>
            <li>
              {{ $t("analyzed.fullName") }}
            </li>
            <li>{{ analyizedData.full_name }}</li>
          </ul>
          <ul class="d-flex">
            <li>
              {{ $t("analyzed.email") }}
            </li>
            <li>{{ analyizedData.email }}</li>
          </ul>
          <ul class="d-flex">
            <li>
              {{ $t("analyzed.gender") }}
            </li>
            <li>{{ analyizedData.gender }}</li>
          </ul>
          <ul class="d-flex">
            <li>
              {{ $t("analyzed.age") }}
            </li>
            <li>{{ analyizedData.age }}</li>
          </ul>
          <ul class="d-flex">
            <li>
              {{ $t("analyzed.address") }}
            </li>
            <li>{{ analyizedData.address }}</li>
          </ul>
          <ul class="d-flex">
            <li>
              {{ $t("analyzed.nationality") }}
            </li>
            <li>{{ analyizedData.nationality }}</li>
          </ul>
          <ul class="d-flex">
            <li>
              {{ $t("analyzed.city") }}
            </li>
            <li>{{ analyizedData.city }}</li>
          </ul>
          <ul class="d-flex">
            <li>
              <v-icon color="var(--v-primary-base)">mdi-asterisk</v-icon>
              {{ $t("analyzed.summary") }}
            </li>
            <li>{{ analyizedData.summary }}</li>
          </ul>
        </v-tab-item>
        <v-tab-item class="tabs__content__skills">
          <ul>
            <li v-for="item in analyizedData.skills" :key="item">
              <v-icon
                class="tabs__content__skills__icon"
                color="var(--v-primary-base)"
                >mdi-check-circle</v-icon
              >

              <span>{{ item }}</span>
            </li>
          </ul>
        </v-tab-item>
        <v-tab-item>
          <ul class="d-flex">
            <li>
              {{ $t("analyzed.degrees") }}
            </li>
            <li>{{ analyizedData.education.degree }}</li>
          </ul>
          <ul class="d-flex">
            <li>
              {{ $t("analyzed.university") }}
            </li>
            <li>{{ analyizedData.education.university }}</li>
          </ul>
          <ul class="d-flex">
            <li>
              {{ $t("analyzed.graduated_at") }}
            </li>
            <li>{{ analyizedData.education.graduated_at }}</li>
          </ul>
          <ul class="d-flex">
            <li>
              {{ $t("analyzed.gpa") }}
            </li>
            <li>{{ analyizedData.education.gpa }}</li>
          </ul>
          <ul class="d-flex">
            <li>
              {{ $t("analyzed.gpa_from") }}
            </li>
            <li>{{ analyizedData.education.gpa_from }}</li>
          </ul>
        </v-tab-item>

        <v-tab-item>
          <div>
            <v-container>
              <v-row>
                <v-col
                  cols="6"
                  v-for="item in analyizedData.work_experience"
                  :key="item.organization_name"
                >
                  <ul>
                    <li>
                      {{ $t("analyzed.organization_name") }}
                    </li>
                    <li>{{ item.organization_name }}</li>
                  </ul>
                  <ul>
                    <li>
                      {{ $t("analyzed.start_date") }}
                    </li>
                    <li>{{ item.start_date }}</li>
                  </ul>
                  <ul>
                    <li>
                      {{ $t("analyzed.end_date") }}
                    </li>
                    <li>{{ item.end_date }}</li>
                  </ul>
                  <ul>
                    <li>
                      {{ $t("analyzed.Position") }}
                    </li>
                    <li>{{ item.Position }}</li>
                  </ul>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-tab-item>

        <v-tab-item>
          <div>
            <v-container>
              <v-row>
                <v-col
                  cols="6"
                  v-for="item in analyizedData[
                    'certifications or trainning-courses'
                  ]"
                  :key="item"
                >
                  <ul>
                    <li>
                      {{ $t("analyzed.name") }}
                    </li>
                    <li>{{ item.name }}</li>
                  </ul>
                  <ul>
                    <li>
                      {{ $t("analyzed.address") }}
                    </li>
                    <li>{{ item.address }}</li>
                  </ul>
                  <ul>
                    <li>
                      {{ $t("analyzed.start_date") }}
                    </li>
                    <li>{{ item.start_date }}</li>
                  </ul>
                  <ul>
                    <li>
                      {{ $t("analyzed.end_date") }}
                    </li>
                    <li>{{ item.end_date }}</li>
                  </ul>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-tab-item>
        <!-- start Language tabs -->
        <v-tab-item>
          <div>
            <v-container>
              <v-row>
                <v-col
                  cols="6"
                  v-for="item in analyizedData.languages"
                  :key="item"
                >
                  <ul>
                    <li>
                      {{ $t("analyzed.langName") }}
                    </li>
                    <li>{{ item.name }}</li>
                  </ul>
                  <ul>
                    <li>
                      {{ $t("analyzed.proficiency") }}
                    </li>
                    <li>{{ item.proficiency }}</li>
                  </ul>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-tab-item>
        <!-- end Language tabs -->
      </v-tabs-items>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.analyzed__container {
  .v-tabs-items {
    min-height: 300px !important;
  }
}

.tabs__content {
  ul {
    display: flex;
    li {
      list-style-type: none;
      margin-block-end: 12px;
      &:first-of-type {
        min-width: 140px;
        color: #687588;
        font-weight: 500;
      }
      &:last-of-type {
        color: #111827;
        font-weight: 600;
      }
    }
  }
  &__skills {
    ul {
      display: grid;
      max-width: 300px;
      grid-template-columns: 1fr 1fr;
      li {
        color: #111827 !important;
        font-weight: 600 !important;
        .tabs__content__skills__icon {
          padding-inline: 7px;
        }
      }
    }
  }
}
.v-tab {
  padding: 0px 35px !important;
  color: #344054 !important;
  border-color: transparent !important;
}
.v-tab--active {
  color: var(--v-primary-base);
}
.v-tabs-slider-wrapper {
  display: none !important;
  height: unset !important;
  left: 0 !important;
  width: 0 !important;
}
.v-slide-group__content {
  justify-content: center !important;
}
</style>
