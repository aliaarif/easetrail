<script setup>
</script>
<template>
  <div>
    <DefaultNav :firstParam="useRouter()"/>
    <main>
    <div class="site-inner">
      <div class="container wrapper">
       <slot />
      </div>
    </div>
  </main>


    <Footer />
  </div>
</template>
<style>
.wrapper{
  padding: 0 10px 0 10px;
}

.grid-item {
    align-items: center;
    background-color: #fdfdfd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    text-align: center;
    text-decoration: none;
}

.inside-container {
       padding: 3rem 3rem;
           background-color: #fa69001a;
    border-radius: 10px;
   margin: 40px 0px;
}

.stack {
    background-color: transparent;
    border: 2px solid #fa6900;
    border-radius: 50px;
    color: #fa6900;
    text-align: center;
}

.et-heading p {
    margin-bottom: 30px;
}

/*Global Footer*/
.site-footer {
    padding: 3rem 1.5rem 3rem;
    background-color: #fcfcfc;
}

.footer-nav .menu {
    display: flex;
    margin: 20px 0px 20px 0px;
}

.footer-menu.menu li {
  margin: 0px 20px 0px 0px;
}


.site-info {
    text-align: center;
}
/*Global Footer END*/

.page-entter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-entter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.icon{
  color: hsl(171, 100%, 41%);
}
</style>
