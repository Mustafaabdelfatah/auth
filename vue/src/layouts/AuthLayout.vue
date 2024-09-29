<template>
  <div class="mainbody">
    <div class="backgreen">

      <div class="movie">
        <img width="700" height="600" :src="'/images/movie.gif'"/>
      </div>
      <div class="words">
        <div style="width: 500px;position: relative;bottom: 100px;">
          <p style="font-size: 20px;font-weight: 500;color: white;text-align: center;">التحلــيـــــل النصــــي
            المــدعوم بالذكـــــــاء الاصطنـــــــــاعي
          </p>
          <p style="font-size: 30px;font-weight: 700;color: white;text-align: center;line-height: 34px;">افتح نافذة
            للفهم العميق والاكتشاف</p>
        </div>
      </div>


    </div>
    <v-sheet
      class="layout-side"
    >

      <div class="centerlize">
        <slot></slot>

        <!--      <div class="overline mt-4">{{ product.name }} - {{ product.version }}</div>-->

      </div>

    </v-sheet>


  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed: {
    ...mapState("app", ["product"]),
    ...mapState("app", {
      websiteLoginIcon: state => {
        if (!state.websiteLoginIcon) {
          return "/images/irrigation.png";
        }
        return state.websiteLoginIcon;
      }
    })
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.words {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

}

.movie {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  position: relative !important;
  bottom: 30px !important;
}

.mainbody {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layout-side {
  width: 42%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFF !important;

}

.centerlize {
  width: 95%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

}

.backgreen {
  width: 58%;
  height: 100%;
  background: url(../../public/images/Background.png), lightgray 50% / cover no-repeat;

}

@media screen and (max-width: 540px) {
  * {
    margin: 0;
    padding: 0;

  }

  .backgreen img {
    /* width: 90% !important;
    height: auto;
    margin: auto !important; */
    display: none;
  }

  .mainbody {
    display: block !important;
    text-align: center !important;
  }

  .layout-side {
    width: 100%;
    display: block !important;
    height: 435px;
    text-align: center !important;
    margin: auto !important;
  }

  .centerlize {
    width: 100%;
    display: block !important;
    text-align: center !important;
    margin-right: 30px !important;

  }

  .backgreen {
    /* display: block !important;
    height: 400px !important;
    width: 100% !important;
    text-align: center !important; */
    display: none;
  }


}


@media screen and (max-width: 912px) {
  * {
    margin: 0;
    padding: 0;

  }

  .words {
    /* display: flex;justify-content: center;align-items: center;margin-top: 0; */
    display: none;
  }

  .movie {
    /* display: flex;justify-content: center;align-items: center;margin-bottom: 0; */
    display: none;
  }

  .mainbody {
    display: block !important;
    background-color: #fff !important;

  }

  .layout-side {
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
    height: 400px !important;
    margin-top: 100px !important;
    background-color: #fff !important;

  }

  .centerlize {

    /* width: 100% !important;
    display: block !important;
    height: 100% !important; */
    background-color: #fff !important;
    display: flex !important;
    justify-content: center !important;
    width: 80% !important;
    margin-right: 60px;
  }

  .backgreen {
    /* display: block !important;
    height: 700px !important;
    width: 100% !important;
    text-align: center !important; */
    display: none;
  }


}

@media screen and (max-width: 820px) {
  * {
    margin: 0;
    padding: 0;

  }

  .words {
    /* display: flex;justify-content: center;align-items: center;margin-top: 0; */
    display: none;
  }

  .movie {
    /* display: flex;justify-content: center;align-items: center;margin-bottom: 0; */
    display: none;
  }

  .mainbody {
    display: block !important;
    background-color: #fff !important;

  }

  .layout-side {
    width: 100% !important;
    display: flex !important;
    height: 400px !important;
    margin-top: 100px !important;
    background-color: #fff !important;

  }

  .centerlize {

    width: 100% !important;
    display: block !important;
    height: 100% !important;
    background-color: #fff !important;

  }

  .backgreen {
    /* display: block !important;
    height: 700px !important;
    width: 100% !important;
    text-align: center !important; */
    display: none;
  }

}
</style>
