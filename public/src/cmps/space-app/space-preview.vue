<template>
  <section class="space-preview">
    <router-link :to="'/space/' + space._id">
      <!-- <div class="block">
    
    <el-carousel height="314px"  class="img-container" :autoplay="false">
      <el-carousel-item  v-for="img in imgsForDisplay" :key="img">
                <img  :src="`${img}`" />

      </el-carousel-item>
    </el-carousel>
  </div> -->

      <!-- <i class=el-icon-collection-tag></i> -->

      <!-- <?xml version='1.0' encoding='UTF-8'?> -->
      <!-- <svg
        @click.prevent="like"
        class="svg"
        v-bind:class="{liked:isLiked}"
        width="20px"
        height="20px"
        viewBox="0.0025 0.0025 32 32"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g transform="translate(0.0025, 0.0025)">
          <g transform="matrix(1.3333, 0, 0, 1.3333, 0, 0)">
            <g transform="translate(-0.0025, -0.0025)">
              <g transform="matrix(0.75, 0, 0, 0.75, 0, 0)">
                <g transform="translate(0, 0)">
                  <g transform="matrix(1.3333, 0, 0, 1.3333, 0, 0)">
                    <g
                      id="Layer_1"
                      transform="translate(-4, -4)"
                      style="enable-background: new 0 0 32 32"
                    >
                      <g id="Favorites_1_">
                        <path
                          d="M28, 11C28, 7.1 25.1, 4 21.5, 4C19.1, 4 17.1, 5.4 16, 7.4C14.9, 5.4 12.8, 4 10.5, 4C6.9, 4 4, 7.1 4, 11C4, 11 4, 11.2 4, 11.2C4, 16.1 8.1, 20.2 14.3, 26.3L16, 28L17.7, 26.3C23.9, 20.2 28, 16.1 28, 11.2C28, 11.2 28, 11 28, 11z"
                          stroke="white"
                          stroke-width="2px"
                          fill="black"
                          fill-opacity="50%"
                          class="Yellow"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg> -->

      <!-- <div class="buttons">
        <button @click.prevent="prevPic">
          <i class="el-icon-arrow-left"></i>
        </button>
        <button @click.prevent="nextPic">
          <i class="el-icon-arrow-right"></i>
        </button>
      </div> -->

      <svg
        @click.prevent="like"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        :style="{
          fill: likeColor,
          height: '25px',
          width: '25px',
          stroke: 'rgb(255, 255, 255)',
          'stroke-Width': 2,
        }"
      >
        <path
          d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"
        ></path>
      </svg>
      <!-- <svg
      
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style="
          display: block;
          fill: rgb(255, 56, 92);
          height: 16px;
          width: 16px;
          stroke: rgb(255, 56, 92);
          stroke-width: 2;
          overflow: visible;
        "
      >
        <path
          d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"
        ></path>
      </svg> -->

      <!-- <div class="img-container">
        <img :src="`${imgForDisplay}`" />
      </div> -->
      <carousel>
        <carousel-slide
          v-for="(slide, idx) in slides"
          :key="idx"
          class="carousel-slider"
        >
          <img :src="slide" :alt="slide" />
        </carousel-slide>
      </carousel>

      <div class="name-price flex">
        <!-- <div>{{ space.name }}</div> -->
        <div>
          {{ space.loc.address }}
          <!-- ,{{ space.loc.country }} -->
        </div>
        <div>{{ priceToShow }} / night</div>
      </div>
      <div class="distance">{{ distance }} kilometers away</div>
      <!-- <div class="distance">{{ distance }} miles away</div> -->
      <!-- <div class="distance">{{distanceToShow}} Kilometers away</div> -->
      <!-- <div class="like" @click="like"></div> -->

      <!-- <hr/>
        {{space}} -->
    </router-link>
  </section>
</template>

<script>
import carousel from './carousel';
import carouselSlide from './carouselSlide';
export default {
  name: '',
  props: ['space'], //TODO convert to object
  data() {
    return {
      picIdx: 0,
      isLiked: false,
      distance: 0,
      likeColor: 'rgba(0, 0, 0, 0.5)',
      // likeColor: 'rgb(255, 56, 92)'

      slides: this.space.imgUrls,
    };
  },
  methods: {
    like() {
      this.isLiked = !this.isLiked;
      if (this.isLiked) this.likeColor = 'rgb(255, 56, 92)';
      else this.likeColor = 'rgba(0, 0, 0, 0.5)';
      this.$emit('liked', this.space._id);
      // this.svgcolor();
    },
    prevPic() {
      if (this.picIdx === 0) this.picIdx = this.space.imgUrls.length - 1;
      else this.picIdx--;
    },
    nextPic() {
      if (this.picIdx === this.space.imgUrls.length - 1) this.picIdx = 0;
      else this.picIdx++;
    },
  },
  computed: {
    // svgcolor() {
    //   return {
    //     // fill: this.isLiked ? "red" : "black",
    //     fill:  "red",
    //   };
    // },
    imgForDisplay() {
      return this.space.imgUrls[this.picIdx];
    },
    imgsForDisplay() {
      return this.space.imgUrls;
    },
    distanceToShow() {
      return navigator.geolocation.getCurrentPosition(
        (position) => {
          //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
          const Lat1 = position.coords.latitude;
          const Lat2 = this.space.loc.lat;
          const Lon1 = position.coords.longitude;
          const Lon2 = this.space.loc.lng;

          // console.log(Lat1, Lat2, Lon1, Lon2);

          let R = 6371; // km
          let dLat = ((Lat2 - Lat1) * Math.PI) / 180;
          let dLon = ((Lon2 - Lon1) * Math.PI) / 180;
          let lat1 = (Lat1 * Math.PI) / 180;
          let lat2 = (Lat2 * Math.PI) / 180;

          let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) *
              Math.sin(dLon / 2) *
              Math.cos(lat1) *
              Math.cos(lat2);
          let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          let d = R * c;
          // console.log(d);

          // this.distance = (Math.sqrt((position.coords.latitude - this.space.loc.lat)**2+(position.coords.longitude-this.space.loc.lng)**2))
          // d = d * 6371;
          this.distance = d.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });
        },
        (err) => {
          console.log(err);
        }
      );
      // return
      // navigator.geolocation.getCurrentPosition(sucssessCb,errorCb)
    },
    priceToShow() {
      return this.space.price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        // useGrouping:true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },
  },
  components: {
    carouselSlide,
    carousel,
  },
  created() {
    this.distanceToShow;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>

<!--
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
-->

<style>
.app {
  display: flex;
  justify-content: center;
}
.carousel {
  border-radius: 12px;
  /* height: 100%; */

  /* position: relative;
  overflow: hidden;
  width:100%;
  height: 227px; */
  /* z-index: 10; */
  /* margin-bottom: 10px; */
}
.carousel-slider {
  /* border-radius: 12px; */
  /* position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0; */
}
.carousel-slider img {
  /* border-radius: 12px; */

  /* width: 100%; */
  object-fit: cover;
  height: 100%;
}
</style>
