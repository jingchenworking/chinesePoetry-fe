<template>

  
<section id="welcome-content" class="container">

  <div v-for="item in paginatedData" :key="item.index">{{ item.value }}</div>
    <button @click="backPage">prev</button>
    <button
      v-for="item in Math.ceil(data.length / perPage)"
      :key="item"
      @click="() => goToPage(item)"
    >
      {{ item }}
    </button>
  <button @click="nextPage">next</button>
  

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
          <!-- <span>Selected: {{ selected }}</span> -->

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
 <el-table
    :data="tutorials"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="title"
      label="Title"
      width="180">
    </el-table-column>
    <el-table-column
      prop="author"
      label="Author"
      width="180">
    </el-table-column>
    <el-table-column
      prop="dynasty"
      label="Dynasty">
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



import TutorialDataService from "../services/DataService";
export default {
  name: "PoemSearch",
  data() {
    return {
      selected: "",

      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
      tableData2: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
    };
  },
  methods: {
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

    
    searchTitle() {

      TutorialDataService.findByTitle(this.selected, this.title)
        .then(response => {
          this.tutorials = response.data;
          this.setActiveTutorial(null);
          console.log(response.data);
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
  vertical-align: middle;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
 .pagination-container {
    display: flex;
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
</style>