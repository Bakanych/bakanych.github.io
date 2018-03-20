var selectButtonStyles = {
  "none": "check_box_outline_blank",
  "all": "check_box",
  "some": "indeterminate_check_box"
}

faker.locale = "en";

var itemsArray = [];
for (var i = 0; i < 100; i++) {
  var item = {
    id: i,
    checked: false,
    name: faker.name.findName(),
    subject: faker.lorem.sentence(),
  };
  itemsArray.push(item)
};


Vue.component('list-item', {
  props: ['item'],
  template: `
  <tr>
    <td>
      <input :id="item.id" type="checkbox" v-model="item.checked" class="filled-in">
      <label :for="item.id">{{ item.name }}</label></td>
    <td>{{item.subject}}</td>
  </tr>`
})

var app = new Vue({
  el: '#app',

  data: {
    items: itemsArray,
    size: 10,
    pageNumber: 0
  },

  computed: {
    paginatedData: function () {
      if (this.pageNumber == this.pageCount) { this.pageNumber--}
      const
        start = this.pageNumber * this.size,
        end = start + this.size;
      return this.items.slice(start, end);
    },
    checkedData() {
      return this.paginatedData.filter((item) => { return item.checked == true });
    },
    pageCount() {
      let l = this.items.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    selectButtonStyle() {
      var count = this.checkedData.length;
      if (count == 0) {
        return selectButtonStyles.none
      } else if (count == this.paginatedData.length) {
        return selectButtonStyles.all
      } else {
        return selectButtonStyles.some
      }
    },
  },

  methods: {
    prevPage() {
      if (this.pageNumber == 0)
        return;
      this.pageNumber--;
    },
    nextPage() {
      if (this.pageNumber >= this.pageCount - 1)
        return;
      this.pageNumber++
    },
    selectAll() {
      this.paginatedData.forEach(item => {
        item.checked = true
      });
    },
    selectNone() {
      this.paginatedData.forEach(item => {
        item.checked = false
      });
    },


    addItem() {
      this.items.push({
        id: this.items.length + 1,
        checked: false,
        name: faker.name.findName(),
        subject: faker.lorem.sentence()
      });
    },

    deleteItems() {
      this.checkedData
        .forEach((item) => { this.items.splice(this.items.indexOf(item), 1) })
    },
  }
});