<template>

  <header class="header">
    <div class="container flex align-center">
      <logo-element/>

      <nav class="nav">
        <ul class="navbar-nav flex">
          <li class="nav-item" v-for="(item,index) in HeaderMenu" :key="index">
            <nav-link :name='item.name' :active='item.active' :href='item.href'/>
          </li>
          <li class="nav-item flex align-center"> Еще<i class="icon-down m-l-5"></i></li>
        </ul>
      </nav>

      <nav class="nav nav-rs" :class="{'open-nav':isOpen}">
        <ul class="navbar-nav flex flex-direction">
          <li class="nav-item-rs"><a href="#" class="nav-link">Сауны</a><i class="icon-down m-l-5"></i></li>
          <li class="nav-item-rs"><a href="#" class="nav-link">Бани</a><i class="icon-down m-l-5"></i></li>
          <li class="nav-item-rs"><a href="#" class="nav-link">Хаммамы</a><i class="icon-down m-l-5"></i></li>
          <li class="nav-item-rs"><a href="#" class="nav-link">Бассейны</a><i class="icon-down m-l-5"></i></li>
          <li class="nav-item-rs"><a href="#" class="nav-link">SPA-комплексы</a><i class="icon-down m-l-5"></i></li>
          <li class="nav-item-rs"><a href="#" class="nav-link">Камины</a><i class="icon-down m-l-5"></i></li>
          <li class="nav-item-rs">Еще разделы <i class="icon-down m-l-5"></i></li>

        </ul>
      </nav>

      <ul class="order-block flex align-center">
        <button class="order-btn m-r-20"><i class="icon-notification"></i></button>
        <button class="order-btn m-r-25"><i class="icon-stroke"></i></button>
        <li class="order-item mobile-none m-r-25">
          <button class="btn btn-lg outline order-btn">Заказать проект</button>
        </li>
        <li class="order-item mobile-none" >
          <button class="btn btn-sm filled primary font-bd">Войти</button>
        </li>
        <span class="icon-burger mobile-filter-icon" v-if="!isOpen" @click="showNav"></span>
        <span class="icon-close mobile-filter-icon close-icon-rs" v-else @click="showNav"></span>

      </ul>

    </div>

  </header>

</template>

<script>
import {NavLink,LogoElement} from '@/elements';

export default {
  name: "HeaderComponent",
  components: {
    NavLink,
    LogoElement
  },

  data:() => ({
    selected: '',
    isOpen: false,
    HeaderMenu: [
      { name: "Сауны", active: true, href: '#'},
      { name: "Бани", href: '#'},
      { name: "Хаммамы", href: '#'},
      { name: "Бассейны", href: '#'},
      { name: "SPA-комплексы", href: '#'},
      { name: "Камины", href: '#'}
    ]
  }),
  methods: {
    showNav() {
      console.log(this.isOpen);
      this.isOpen =! this.isOpen

    }
  }
}
</script>

<style lang="scss">



</style>