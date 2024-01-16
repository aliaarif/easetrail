 
<script setup>
const { item } = useCommon()
const props = defineProps({
    lat: String,
    long: String,
    // latlongData:String
    
})

// setItem(props.latlongData)

const url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
const attribution = '<a href="#">Go to Full Map</a>'
const zoom = 10
const  center = {
  lat: props.lat,
  lng: props.long,
}
const bounds = null
const regioncenter =  [props.lat, props.long]
const  address = {
  long: '',
  display: '',
}
const  polyline = {
  color: 'red',
  latlngs: [],
}
const centerupdated = (event) => {
  center.lat = event.lat
  center.lng = event.lng
  regioncenter = []
  item.business_latitude = event.lat
  item.business_longitude = event.lng
}

// const handleclick = (event) => {
//   console.log(event.latlng.lat)
//   regioncenter = []
//   regioncenter = [event.latlng.lat, event.latlng.lng]
// }
  </script>
  
<template>
      <div style="height: 120px; width: 100%">
      <client-only>

      <!-- {{ center }} -->
        <l-map
          ref="mymap"
          :zoom="zoom"
          :center="center"
          @update:center="centerupdated"
       
        >
          <l-marker :lat-lng="regioncenter">
            <l-popup>lokasi outlet</l-popup>
          </l-marker>
          <l-polyline
            :lat-lngs="polyline.latlngs"
            :color="polyline.color"
          ></l-polyline>
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        </l-map>
      </client-only>
    </div>
</template>
 
  

  