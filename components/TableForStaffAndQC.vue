<script setup>
import { useDropdownStore } from "@/stores/dropdown";
import { useItemStore } from "@/stores/item";
const dropdownStore = useDropdownStore();
const itemStore = useItemStore();

import { useAuthStore } from "@/stores/auth";
import { useAuthDataStore } from "@/stores/auth-data";

const authStore = useAuthStore();
const authDataStore = useAuthDataStore();


const { searchTerms, title, module, setDynamicTitle, setCities2,  edit, setModule, setAction, setEdit, td, rows, search, item, setItem, pageNo, setPageNo, setPageLimit, pageLimit, showDateTime } = useCommon()
const changeStatus = (mod, col, val, update) => {
    const { data:res } = useFetch(`/api/save/status?mod=${mod}&col=${col}&val=${val}&update=${update}`, { method: 'post' })
}
const deleteItem = (mod, id) => {
  const { data:res } = useFetch(`/api/save/delete?mod=${mod}&id=${id}`, { method: 'post' })
  // rows.value = rows.value.filter(item => item._id !== index)
  const childElement = document.querySelector('#ID'+id)
  const grandparentElement = childElement.parentNode.parentNode
  grandparentElement.remove()
}
const changeFormValues = async (item) => {
    setItem(item)
    setAction('add-edit')
    setEdit(true)  
  if (module.value == 'localities') {
    dropdownStore.dropdown.locality = item.name
  } else if (module.value == 'businesses') {
    const { data: cities3 } = await useAsyncData('cities3',
    () => {
        return $fetch(`/api/cities?state=${item.business_state}`, {
            method: 'get'
        })
    },
    )
    setCities2(cities3.value)
  }else {
    dropdownStore.dropdown.city = item.name
  }
}
const loadCount = (mod, countTerm) => {
    const { data:res } =  useFetch(`/api/count?mod=${mod}&countTerm=${countTerm}`, {
        method: 'get'
    })
    return res.value
}
const pagePlus = () => {
    setPageNo(pageNo + 1)
}
const pageMinus = () => {
    setPageNo(pageNo - 1)
}
const changePageLimit = (event) => {
    setPageLimit(event.target.value)
    setModule(module.value)
}
const fetchedCities = ref([])
const fetchedLocalities = ref([])
// if (module.value == 'localities') {
  const { data: states } = await useAsyncData('states',
    () => {
        return $fetch(`/api/states`, {
            method: 'get'
        })
    },
  )
  const { data: cities } = await useAsyncData('cities',
      () => {
          return $fetch(`/api/cities?state=${itemStore.item.state}`, {
              method: 'get'
          })
      },
  )
  fetchedCities.value = cities.value
  // const { data: localities } = await useAsyncData('localities',
  //     () => {
  //         return $fetch(`/api/localities?city=${itemStore.item.city}`, {
  //             method: 'get'
  //         })
  //     },
  // )
  // fetchedLocalities.value = localities.value
  const loadCities = async (val) => {
    const { data: cities } = await useAsyncData('cities',
      () => {
          return $fetch(`/api/cities?state=${val}`, {
              method: 'get'
          })
      },
    )
    fetchedCities.value = cities.value
  }
// }

const loadLocalities = async (val) => {
  const { data: localities } = await useAsyncData('localities',
    () => {
        return $fetch(`/api/localities?city=${val}`, {
            method: 'get'
        })
    },
  )
  fetchedLocalities.value = localities.value
}
</script>
<template>
    <section v-if="module != 'localities'">
        <div class="field has-addons">
            <p class="control">
                <span class="select">
                    <select @change="changePageLimit">
                        <option value="15">Show 10 </option>
                        <option value="30">Show 20 </option>
                        <option value="50">Show 50 </option>
                        <option value="100">Show 100 </option>
                    </select>
                </span>
            </p>
            <p class="control is-expanded">
                <input type="text" placeholder="Search" class="input" v-model="searchTerms" @input="filterSearch">
            </p>
        </div>
        <div class="table-container x-overflow-hidden">
        
            <table class="table is-small is-bordered is-striped is-hoverable is-fullwidth">
                <thead>
                    <th v-for="(item,index) in td" :key="index"  >
                       <span :class="{'is-pulled-right': item == 'Action'}" >{{ title(item) }}</span> 
                    </th>
                </thead>
                <tbody>
                    <tr v-for="(item1, index) in rows" :key="index" v-show="authDataStore.authData.role == 'User' && item1.created_by == authDataStore.authData.email">
                        <td v-for="item2 in td" :key="item2">

                           

                            <div v-if="module == 'businesses'">
                                <span v-if="item2 == 'id'">{{ item1._id.substr(16) }}</span>
                                {{ item2 == 'Name' ? item1.business_name : '' }}
                                {{ item2 == 'Category' ? item1.business_category : '' }}
                                {{ item2 == 'City' ? item1.business_city : '' }}
                                {{ item2 == 'Content By' ? item1.updated_by : '' }}
                                {{ item2 == 'Approved By' ? item1.approved_by : '' }}
                                <span v-if="item2 == 'Date'">
                                    <div class="block">
                                        <span class="tag is-primary is-small ml-1">
                                            {{ showDateTime(item1.createdAt) }} 
                                        </span>
                                        <!-- <br>
                                        <span class="tag is-danger is-small ml-1">
                                            {{ showDateTime(item1.updatedAt) }} 
                                        </span> -->
                                    </div>
                                </span>
                            </div>


                              
                            <span v-if="item2 == 'Status'">
                              <div class="block">
                                  <span class="tag is-primary is-small ml-1">
                                      {{ item1.status }} 
                                  </span>
                              </div>
                            </span>
                           
                           
                           

                            <button class=" button is-small is-pulled-right ml-1" v-if="item2 == 'Action'" @click="deleteItem(module, item1._id)" :id="'ID'+item1._id">
                                <span class=" icon is-small">
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </span>
                            </button>

                            <button class=" button is-small is-pulled-right mr-1" v-if="item2 == 'Action'" @click="changeFormValues(item1), setDynamicTitle('Edit ' + title(module))">
                                <span class=" icon is-small">
                                    <i class="fas fa-edit"></i>
                                </span>
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>
            <nav class="pagination is-small" role="navigation" aria-label="pagination">
              <a class="pagination-previous" @click="pagePlus">Previous</a>
              <a class="pagination-next" @click="pageMinus">Next page</a>
              <ul class="pagination-list">
                  <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
                  <li><span class="pagination-ellipsis">&hellip;</span></li>
                  <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
                  <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
                  <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
                  <li><span class="pagination-ellipsis">&hellip;</span></li>
                  <li><a class="pagination-link" aria-label="Goto page 86">86</a></li>
              </ul>
            </nav>
        </div>
    </section>
</template>
<style>
.switch {
  position: relative;
  margin-bottom: 1rem;
  outline: 0;
  user-select: none;
  font-size: 1rem;
  min-height: 2rem;
  height: 2rem;
}
.switch input {
  position: absolute;
  margin-bottom: 0;
  opacity: 0;
}
.switch input:checked ~ label {
  background: #00d1b2;
}
.switch input:checked ~ label::before {
  left: 2.25rem;
}
.switch label {
  position: relative;
  display: block;
  width: 4rem;
  height: 2rem;
  border-radius: 3px;
  background: #b5b5b5;
  transition: all 0.25s ease-out;
  line-height: 2rem;
  cursor: pointer;
}
input + .switch label {
  margin: 0;
}
.switch label::after {
  position: absolute;
  content: attr(data-label);
  left: 4.5rem;
  width: 100%;
}
.switch label::before {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  transform: translate3d(0, 0, 0);
  border-radius: 3px;
  background: white;
  transition: all 0.25s ease-out;
  content: "";
}
.switch input:checked ~ label::before {
  left: 2.25rem;
}
.switch.is-small {
  font-size: 0.75rem;
  min-height: 1.5rem;
  height: 1.5rem;
}
.switch.is-small input:checked ~ label {
  background: #00d1b2;
}
.switch.is-small input:checked ~ label::before {
  left: 1.75rem;
}
.switch.is-small label {
  position: relative;
  display: block;
  width: 3rem;
  height: 1.5rem;
  border-radius: 3px;
  background: #b5b5b5;
  transition: all 0.25s ease-out;
  line-height: 1.5rem;
  cursor: pointer;
}
input + .switch.is-small label {
  margin: 0;
}
.switch.is-small label::after {
  position: absolute;
  content: attr(data-label);
  left: 3.375rem;
  width: 100%;
}
.switch.is-small label::before {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  display: block;
  width: 1rem;
  height: 1rem;
  transform: translate3d(0, 0, 0);
  border-radius: 3px;
  background: white;
  transition: all 0.25s ease-out;
  content: "";
}
.switch.is-small input:checked ~ label::before {
  left: 1.75rem;
}
.switch.is-medium {
  font-size: 1.25rem;
  min-height: 2.5rem;
  height: 2.5rem;
}
.switch.is-medium input:checked ~ label {
  background: #00d1b2;
}
.switch.is-medium input:checked ~ label::before {
  left: 2.75rem;
}
.switch.is-medium label {
  position: relative;
  display: block;
  width: 5rem;
  height: 2.5rem;
  border-radius: 3px;
  background: #b5b5b5;
  transition: all 0.25s ease-out;
  line-height: 2.5rem;
  cursor: pointer;
}
input + .switch.is-medium label {
  margin: 0;
}
.switch.is-medium label::after {
  position: absolute;
  content: attr(data-label);
  left: 5.625rem;
  width: 100%;
}
.switch.is-medium label::before {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  display: block;
  width: 2rem;
  height: 2rem;
  transform: translate3d(0, 0, 0);
  border-radius: 3px;
  background: white;
  transition: all 0.25s ease-out;
  content: "";
}
.switch.is-medium input:checked ~ label::before {
  left: 2.75rem;
}
.switch.is-large {
  font-size: 1.5rem;
  min-height: 3rem;
  height: 3rem;
}
.switch.is-large input:checked ~ label {
  background: #00d1b2;
}
.switch.is-large input:checked ~ label::before {
  left: 3.25rem;
}
.switch.is-large label {
  position: relative;
  display: block;
  width: 6rem;
  height: 3rem;
  border-radius: 3px;
  background: #b5b5b5;
  transition: all 0.25s ease-out;
  line-height: 3rem;
  cursor: pointer;
}
input + .switch.is-large label {
  margin: 0;
}
.switch.is-large label::after {
  position: absolute;
  content: attr(data-label);
  left: 6.75rem;
  width: 100%;
}
.switch.is-large label::before {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  transform: translate3d(0, 0, 0);
  border-radius: 3px;
  background: white;
  transition: all 0.25s ease-out;
  content: "";
}
.switch.is-large input:checked ~ label::before {
  left: 3.25rem;
}

.x-overflow-hidden {
  overflow-x: hidden;
}
.y-overflow-hidden {
  overflow-y: hidden;
}

.is-state-custom{
  width:15% !important
}
.is-city-custom{
  width:25% !important
}

.is-locality-custom{
  width:60% !important
}
.custom-line-height {
  height: 35px;  /* Adjust this value to your preference */
}
.dirty{
    border: 1px solid #f14668;
}
.good{
    border: 1px solid #00c4a7;
}
.icon-dirty{
    color: #f14668;;
}

.icon-good{
    color: #00c4a7;
}
.text-dirty{
    color: #f14668;
}
.text-good{
    color: #00c4a7;
}
</style>
