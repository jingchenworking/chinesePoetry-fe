<template>

<section id="search-content" class="container">
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">

        <div id="app" class="input-group-append">      
            <input type="text" class="form-control" placeholder="Search by title"
              v-model="title"/>             
            <select v-model="selected">
            <option disabled value="">Please select one</option>
            <option>Title</option>
            <option>Author</option>
            <option>Content</option>
          </select>
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>


<el-divider></el-divider>



<div v-if="tutorials.length">
  <!-- <div v-for="(item, index) in paginatedData" :key="index">
      {{index}} is {{item}} -->

  <!-- </div> -->
    <button @click="backPage">prev</button>
    <button
      v-for="item in Math.ceil(allData.length / perPage)"
      :key="item"
      @click="() => goToPage(item)"
    >
      {{ item }}
    </button>

            


  <button @click="nextPage">next</button>

  <el-table
      :data="paginatedData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        label="Title"
        width="180">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <el-table :data="scope.row.sources">
              <el-table-column width="150" property="titleSource" label="Title" />
              <el-table-column width="100" property="title" label="Anthology" />
              <el-table-column width="100" property="edition" label="Edition" />
              <el-table-column width="100" property="creationYear" label="Year" />
              <el-table-column width="300" property="source" label="Source" />
            </el-table>            
            <template #reference>
                <el-tag>{{ scope.row.title }}</el-tag>
            </template>

          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="author"
        label="Author"
        width="180">
      </el-table-column>
      <el-table-column
        label="Dynasty">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>name: {{ scope.row.dynasty }}</div>
              <div>address: {{ scope.row.dynasty }}</div>
            </template>
            <template #reference>
              <el-tag>{{ scope.row.dynasty }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
    </el-table>


</div>

    <!-- <div class="col-md-6">
      <div v-if="currentTutorial.length">
        <h4>Poem</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Author:</strong></label> {{ currentTutorial.author }}
        </div>
        <div>
          <label><strong>dynasty:</strong></label> {{ currentTutorial.dynasty}}
        </div>
        <div>
          <label><strong>ID:</strong></label> {{ currentTutorial.id}}
        </div>

      </div>
    </div> -->

            <!-- <router-link :to="'/poem/' + currentTutorial.id" class="badge badge-warning">Details</router-link> -->

  </div>
  </section>
</template>



<script>
// import { createApp } from 'vue';
// import App from '../App.vue';
// import Dropdown from 'vue-simple-search-dropdown';
// createApp(App).component(Row.name,Row);


// import handlePagination from "../handlePagination";
// import { ref, computed } from "vue";
import { computed } from "vue";
import TutorialDataService from "../services/DataService";


export default {
  
  
  name: "PoemSearch",
  setup() {
    
      

      // const data = Array.from(Array(24).keys()).map((item) => {
      //   return { index: item, value: `this_${item}` };
      // });

      // const perPage = 10;

      // const paginatedData = computed(() =>
      //   data.slice((page.value - 1) * perPage, page.value * perPage)
      // );

      // const nextPage = () => {
      //   if (page.value !== Math.ceil(data.length / perPage)) {
      //     page.value += 1;
      //   }
      // };

      // const backPage = () => {
      //   if (page.value !== 1) {
      //     page.value -= 1;
      //   }
      // };

      // const goToPage = (numPage) => {
      //   page.value = numPage;
      // };

      // return { data, paginatedData, perPage, page, nextPage, backPage, goToPage };
  },

  





  data() {
    return {

      selected: "",
      tutorials: [],
      page: {value: 1},   
      // nextPage : 1,
      // backPage : 1,
      perPage: 15,
      paginatedData: [],
      allData: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
      totalPages: 0,
      showDetailModal: false,
      currentItem:{sources:''}
    };
  },
  methods: {
    showModal(item){
      this.showDetailModal = true;
      this.currentItem=item
    },
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },
    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = tutorial ? index : -1;
    },

    nextPage(){
        // debugger;
        // debugger;
        console.log(this.allData)
        console.log(this.allData.length)

        // if (this.page.value !== Math.ceil(this.allData.length / this.perPage)) 
        if (this.page.value !== this.totalPages) 
        {
          this.page.value += 1;
        }
    },

    backPage() {
        if (this.page.value !== 1) {
          this.page.value -= 1;
        }
    },

    goToPage(numPage) {
        this.page.value = numPage;
    },

    
    searchTitle() {

/*
      this.tutorials = 
      [
    {
        "id": "100001",
        "title": "擊壤歌;康衢老人擊壤歌",
        "titleSource": "CSTGSX-GSY-GSJ-RTXGS-GSSX;GTSHJ",
        "sources": [
            {
                "titleSource": "擊壤歌",
                "id": "CSTGSX",
                "title": "采菽堂古詩選",
                "edition": "中國基本古籍庫：清刻本",
                "creationYear": "1655;1674",
                "source": "基本古籍庫"
            },
            {
                "titleSource": "擊壤歌",
                "id": "GSY",
                "title": "古詩源",
                "edition": "中華書局1963年版",
                "creationYear": "",
                "source": "理工大學online電子版"
            },
            {
                "titleSource": "擊壤歌",
                "id": "GSJ",
                "title": "古詩紀",
                "edition": "明萬曆刻本",
                "creationYear": "1513;1558",
                "source": "中國基本古籍庫"
            },
            {
                "titleSource": "康衢老人擊壤歌",
                "id": "GTSHJ",
                "title": "古唐詩合解",
                "edition": "光緒壬辰年江西兩儀堂",
                "creationYear": "1732",
                "source": "早稻田大學PDF：www.wul.waseda.ac.jp/kotenseki"
            }
        ],
        "style": "四言雜謠",
        "author": "不詳;堯時老人",
        "authorSource": null,
        "dynasty": "古逸;唐詩",
        "dynastySource": null,
        "remarks": null
    }
];
      /*
      [
    {
        "id": "100071",
        "isPost": "Y",
        "title": "管子;管子引古語",
        "sources": [
            {
              "titleSource":"管子",
              "id": "GSY",
              "title":"古詩紀",
              "edition":"明萬曆刻本",
              "creation_year":"1513",
              "source":"中國基本古籍庫"
            },
            {
              "titleSource":"管子引古語",
              "id": "CSTGSX",
              "title":"采菽堂古詩選",
              "edition":"中國基本古籍庫：清刻本",
              "creation_year":"1655;1674",
              "source":"基本古籍庫"
            }
        ],
        "style": "四言",
        "styleSource": "",
        "author": "不詳",
        "authorSource": "",
        "dynasty": "古逸;周詩",
        "dynastySource": "GSY-CSTGSX-GSJ;GSSX",
        "remarks": "古諺（《采菽堂古詩選》）"
    },
    {
        "id": "100075",
        "isPost": "Y",
        "title": "孔子家語（相馬以輿）;家語引古語",
        "sources": [
            {
              "titleSource":"管子",
              "id": "GSY",
              "title":"古詩紀",
              "edition":"明萬曆刻本",
              "creation_year":"1513",
              "source":"中國基本古籍庫"
            },
            {
              "titleSource":"管子引古語",
              "id": "CSTGSX",
              "title":"采菽堂古詩選",
              "edition":"中國基本古籍庫：清刻本",
              "creation_year":"1655;1674",
              "source":"基本古籍庫"
            }
        ],
        "style": "四言",
        "styleSource": "",
        "author": "不詳",
        "authorSource": "",
        "dynasty": "古逸;周詩",
        "dynastySource": "GSY-CSTGSX-GSJ;GSSX",
        "remarks": "古諺（《采菽堂古詩選》）"
    },
    {
        "id": "100083",
        "isPost": "Y",
        "title": "列女傳引古語",
        "titleSource": "GSY-GSJ",
        "style": "雜言",
        "styleSource": "",
        "author": "不詳",
        "authorSource": "",
        "dynasty": "古逸",
        "dynastySource": "GSY-GSJ",
        "remarks": ""
    },
    {
        "id": "100085",
        "isPost": "Y",
        "title": "劉向別錄引古語",
        "titleSource": "GSY-CSTGSX-GSJ-GSSX",
        "style": "雜言",
        "styleSource": "",
        "author": "不詳",
        "authorSource": "",
        "dynasty": "古逸;周詩",
        "dynastySource": "GSY-CSTGSX-GSJ;GSSX",
        "remarks": "古諺（《采菽堂古詩選》）"
    },
    {
        "id": "100087",
        "isPost": "Y",
        "title": "風俗通（狐欲渡河）;風俗通四則;應劭風俗通引古語二首",
        "titleSource": "GSY-;CSTGSX-GSJ;GSSX",
        "style": "四言",
        "styleSource": "",
        "author": "不詳",
        "authorSource": "",
        "dynasty": "古逸;周詩",
        "dynastySource": "GSY-CSTGSX-GSJ;GSSX",
        "remarks": "古諺（《采菽堂古詩選》）"
    },
    {
        "id": "100089",
        "isPost": "Y",
        "title": "牟子引古諺",
        "titleSource": "GSY-CSTGSX-GSJ-GSSX",
        "style": "雜言",
        "styleSource": "",
        "author": "不詳",
        "authorSource": "",
        "dynasty": "古逸;周詩",
        "dynastySource": "GSY-CSTGSX-GSJ;GSSX",
        "remarks": "古諺（《采菽堂古詩選》）"
    },
    {
        "id": "100090",
        "isPost": "Y",
        "title": "易緯引古詩;易緯引古語二首;易緯引古諺",
        "titleSource": "GSY-;GSSX-GSJ;CSTGSX",
        "style": "四言",
        "styleSource": "",
        "author": "不詳",
        "authorSource": "",
        "dynasty": "古逸;周詩",
        "dynastySource": "GSY-CSTGSX-GSJ;GSSX",
        "remarks": "古諺（《采菽堂古詩選》）"
    },
    {
        "id": "100095",
        "isPost": "Y",
        "title": "文選註引古諺",
        "titleSource": "GSY-CSTGSX-GSJ",
        "style": "四言",
        "styleSource": "",
        "author": "不詳",
        "authorSource": "",
        "dynasty": "古逸",
        "dynastySource": "GSY-CSTGSX-GSJ",
        "remarks": "古諺（《采菽堂古詩選》）"
    },
    {
        "id": "100099",
        "isPost": "Y",
        "title": "古諺古語;古諺三首",
        "titleSource": "GSY-CSTGSX-GSJ;GSSX",
        "style": "雜言",
        "styleSource": "",
        "author": "不詳",
        "authorSource": "",
        "dynasty": "古逸;周詩",
        "dynastySource": "GSY-CSTGSX-GSJ;GSSX",
        "remarks": "古諺（《采菽堂古詩選》）"
    },
    {
        "id": "100126",
        "isPost": "Y",
        "title": "古歌銅雀辭;古歌銅雀詞",
        "titleSource": "CSTGSX-GSJ;HSYZ",
        "style": "雜言",
        "styleSource": "",
        "author": "不詳",
        "authorSource": "",
        "dynasty": "古逸;漢",
        "dynastySource": "CSTGSX-GSJ;HSYZ",
        "remarks": "漢歌辭（《采菽堂古詩選》）；樂府歌辭·雜歌謠辭·歌辭（《漢詩音註》）；拾遺（《古詩紀》）"
    },
    {
        "id": "100265",
        "isPost": "Y",
        "title": "皋魚引古語",
        "titleSource": "CSTGSX-GSJ",
        "style": "四言",
        "styleSource": "",
        "author": "不詳",
        "authorSource": "",
        "dynasty": "古逸",
        "dynastySource": "CSTGSX-GSJ",
        "remarks": "古諺（《采菽堂古詩選》）"
    },
    {
        "id": "100266",
        "isPost": "Y",
        "title": "鄒子引古語",
        "titleSource": "CSTGSX-GSJ-GSSX",
        "style": "四言",
        "styleSource": "",
        "author": "不詳",
        "authorSource": "",
        "dynasty": "古逸;周詩",
        "dynastySource": "CSTGSX-GSJ;GSSX",
        "remarks": "古諺（《采菽堂古詩選》）"
    },
    {
        "id": "100274",
        "isPost": "Y",
        "title": "劉子引古諺",
        "titleSource": "CSTGSX-GSJ",
        "style": "五言",
        "styleSource": "",
        "author": "不詳",
        "authorSource": "",
        "dynasty": "古逸",
        "dynastySource": "CSTGSX-GSJ",
        "remarks": "古諺（《采菽堂古詩選》）"
    },
    {
        "id": "100275",
        "isPost": "Y",
        "title": "韓嬰詩傳引古語",
        "titleSource": "CSTGSX-GSJ",
        "style": "四言",
        "styleSource": "",
        "author": "不詳",
        "authorSource": "",
        "dynasty": "古逸",
        "dynastySource": "CSTGSX-GSJ",
        "remarks": "古諺（《采菽堂古詩選》）"
    },
    {
        "id": "100277",
        "isPost": "Y",
        "title": "汜勝之書引古語",
        "titleSource": "CSTGSX-GSJ",
        "style": "四言",
        "styleSource": "",
        "author": "不詳",
        "authorSource": "",
        "dynasty": "古逸",
        "dynastySource": "CSTGSX-GSJ",
        "remarks": "古諺（《采菽堂古詩選》）"
    },
    {
        "id": "100503",
        "isPost": "Y",
        "title": "魯定公記載古語",
        "titleSource": "GSJ",
        "style": "",
        "styleSource": "",
        "author": "無名氏",
        "authorSource": "",
        "dynasty": "古逸",
        "dynastySource": "GSJ",
        "remarks": ""
    },
    {
        "id": "100504",
        "isPost": "Y",
        "title": "魯仲連引古諺",
        "titleSource": "GSJ",
        "style": "",
        "styleSource": "",
        "author": "無名氏",
        "authorSource": "",
        "dynasty": "古逸",
        "dynastySource": "GSJ",
        "remarks": ""
    },
    {
        "id": "100515",
        "isPost": "Y",
        "title": "師春引古語",
        "titleSource": "GSJ",
        "style": "",
        "styleSource": "",
        "author": "無名氏",
        "authorSource": "",
        "dynasty": "古逸",
        "dynastySource": "GSJ",
        "remarks": ""
    },
    {
        "id": "100559",
        "isPost": "Y",
        "title": "與蘇武詩三首;李陵與蘇武詩三首;李陵與蘇武二首;古詩三首",
        "titleSource": "CSTGSX-HSYZ-LCXSDL-GSY-GSJ-SJGX-GSPX-BTSX-RTXGS-LCSYX-GSSX;SBXJ-GSL;GTSHJ;RCSX",
        "style": "五言",
        "styleSource": "",
        "author": "李陵",
        "authorSource": "",
        "dynasty": "漢",
        "dynastySource": "CSTGSX-HSYZ-LCXSDL-GSY-LCSYX-SJGX-GSJ-GSPX-BTSX-RCSX-GTSHJ-GSL-RTXGS-SBXJ-GSSX",
        "remarks": ""
    },
    {
        "id": "100562",
        "isPost": "Y",
        "title": "歌（歸空城兮）;歌二首（王歌、華容夫人歌《漢詩音註》、《古詩紀》）",
        "titleSource": "CSTGSX-HSYZ-YFGX-GSY-GSJ-BTSX-GSL;",
        "style": "雜言",
        "styleSource": "",
        "author": "燕刺王旦;劉旦",
        "authorSource": ";BTSX",
        "dynasty": "漢",
        "dynastySource": "CSTGSX-HSYZ-YFGX-GSY-GSJ-BTSX-GSL",
        "remarks": "（《漢詩音註》）歌二首其一；歌詩（《樂府廣序》）"
    },
    {
        "id": "100575",
        "isPost": "Y",
        "title": "飲馬長城窟行（青青河邊草）;古辭四首其一",
        "titleSource": "CSTGSX-HSYZ-GSY-LCSYX-SJGX-GSJ-GSPX-BTSX-YFYH-RCSX-GTSHJ-RTXGS-SBXJ;LCXSDL",
        "style": "五言",
        "styleSource": "",
        "author": "蔡邑;不詳",
        "authorSource": ";LCXSDL-YFYH",
        "dynasty": "漢",
        "dynastySource": "CSTGSX-HSYZ-LCXSDL-GSY-LCSYX-SJGX-GSJ-GSPX-BTSX-YFYH-RCSX-GTSHJ-RTXGS-SBXJ",
        "remarks": "古樂府歌行（《古詩評選》）；樂府古辭箋其七（《詩比興箋》）；漢樂府琴調曲（《古唐詩合解》、《樂府廣序》）"
    },
    {
        "id": "100583",
        "isPost": "Y",
        "title": "古怨歌",
        "titleSource": "CSTGSX-HSYZ-YFGX-GSY-GSJ-BTSX-GTSHJ-GSL-GSSX",
        "style": "四言;雜言",
        "styleSource": ";BTSX",
        "author": "竇玄妻;竇元妻",
        "authorSource": "GSY-GSSX-BTSX;CSTGSX",
        "dynasty": "漢;後漢",
        "dynastySource": "CSTGSX-HSYZ-YFGX-GSY-GSJ-BTSX-GTSHJ-GSL;GSSX",
        "remarks": "雜曲古歌（《古唐詩合解》）；歌詩（《樂府廣序》）"
    }
];
*/

      TutorialDataService.findByTitle(this.selected, this.title)
        .then(response => {
          this.tutorials = response.data;
          this.setActiveTutorial(null);
          console.log(response.data);
          this.allData = Array.from(Array(this.tutorials.length).keys()).map((item) => {
            return { index: item, value: this.tutorials[item] };
          });
          
          
          this.totalPages = Math.ceil(this.tutorials.length / this.perPage);
          // Array.from(Array(24).keys()).map((item) => {
          //   return { index: item, value: `this_${item}` };
          // });

          // this.perPage = 10;

          this.paginatedData = computed(() =>
            this.tutorials.slice((this.page.value - 1) * this.perPage, this.page.value * this.perPage)
          );

        })
        .catch(e => {
          console.log(e);
        });



    

    }
  },
  mounted() {
    this.retrieveTutorials();
  }
};







</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.container {
  /* vertical-align: middle; */
  /* position: fixed;
  top: 30%; */
  /* left: 50%; */
  /* transform: translate(-50%, -50%); */
}

.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
 .pagination-container {
    /* display: flex; */
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }
  .active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
  }
  .active-page:hover {
    background-color: #2988c8;
  }
.modal {
  width: 300px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
}
</style>