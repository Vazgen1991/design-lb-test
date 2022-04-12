<template>

  <main>

    <div class="container m-t-50">

      <section>
        <nav class="breadcrumb-nav">
          <ul class="breadcrumb flex">
            <li class="breadcrumb-item" v-for="(item,index) in breadcrumbs" :key="index">
              <breadcrumb-link :name="item.name" :href="item.href"/>
            </li>
          </ul>
        </nav>
      </section>

      <section>

        <div class="title-area">
          <h1>Строительство саун</h1>
          <ul class="option-list flex m-t-25">
            <li class="option-item" v-for="(item,index) in optionButtonsList" :key="index">
              <option-button :label='item.label'/>
            </li>
          </ul>
        </div>

        <div class="sort-area flex align-center justify-between">
          <ul class="category flex align-center">

            <li class="category-item m-r-25"
                v-for="(item,index) in sorted"
                :key="index"
            >
              <sorted-link
                  :link="item"
                  :idx="index"
                  :sorted="sortItems"
                  :active="item.active"
              />
            </li>

          </ul>
          <div class="category-mobile">
            <button class="category-mobile-btn" @click="isMobileCategory =! isMobileCategory">
              <i class="icon-filter"></i>
              Сначала новые
            </button>
            <ul class="category-mobile-list" v-if="isMobileCategory">
              <li class="category-mobile-items flex align-center justify-between active">Новые <i
                  class="icon-check"></i></li>
              <li class="category-mobile-items">Популярные</li>
              <li class="category-mobile-items">Подороже</li>
              <li class="category-mobile-items">Большой объём</li>
              <li class="category-mobile-items">Меньший объём</li>
            </ul>
          </div>

          <a class="filter-dropdown flex align-center"
             :class="{'open-filter':isFiltered}"
             @click="isFiltered =!isFiltered">
            <span class="icon-filter-mobile m-r-10"></span>
            {{ isFiltered ? 'Скрыть фильтр' : 'Показать фильтр' }}
          </a>
          <a class="mobile-filter-dropdown flex align-center"
             :class="{'open-mobile-filter':isFiltered}"
             @click="isFiltered =!isFiltered"
          >

            <span class="icon-filter-mobile m-r-5 m-t-5"></span>
            {{ isFiltered ? 'Скрыть фильтр' : 'фильтр' }}
          </a>

        </div>

        <div class="flex justify-between" :class="{'full-content':!isFiltered}">
          <div class="spa-list">
            <span class="new">NEW</span>
            <div v-for="(info,index) in spaInfo" :key="index">
              <div class="spa-item"
              >
                <VueSlickCarousel
                    :slidesToShow="1"
                    :arrows="false"
                    :dots="true"
                >
                  <div class="img-block" v-for="(image,imageIndex) in info.image" :key="imageIndex">
                    <slider-image
                        :images="image"
                    />
                    <slider-content
                        :infoList='info'
                        :addLike="addLike"
                        :idx="index"
                    />
                  </div>
                </VueSlickCarousel>

                <div class="mobile-pd">
                  <p class="spa-title">{{ info.title }}</p>
                  <p class="spa-address">{{ info.address }}</p>
                  <p class="spa-address">{{ info.addressTitle }}</p>
                </div>

              </div>
            </div>

          </div>


          <div class="category-select-list" v-if="isFiltered" :class="{'open-mobile-filter':isFiltered}">
            <ul class="category-header ">
              <li class="category-header-item flex justify-between">
                <h3>Фильтр</h3>
                <button class="category-close-btn" @click="isFiltered =false"><i class="icon-close"></i></button>
              </li>

            </ul>

            <div class="select-content" v-for="(category,index) in categories" :key="index">
              <li class="select-btn flex align-center justify-between" v-if="category.title === 'Парогенератор'">
                {{ category.title }}
                <label class="switch">
                  <input type="checkbox">
                  <span class="slider round"></span>
                </label>
              </li>

              <category-button
                  :categories="category"
                  :openCategory="openSelectItem"
                  :idx="index"
                  :isOpen='category.openSelect'
              />

              <div v-show="category.openSelect">
                <div v-if="category.isSearchBlock === true">
                  <input type="text"
                         class="custom-text-input"
                         placeholder="Найти"
                         v-model="searchTxt"
                         @input="filteredItems"
                  >
                </div>
                <ul class="select-scroll-content"
                    :class="{'show-active':showAllContent && category.label.length>5}"
                >
                  <li class="select-item"
                      v-for="(item,itemIndex) in category.label"
                      :key="itemIndex"
                  >
                    <input type="checkbox"
                           class="custom-checkbox"
                           :id="item.name"
                           :name="item.name"
                           v-model="item.value"
                           @change="checkedItems(index,item.value)"
                    >
                    <label :for="item.name">{{ item.name }}</label>
                  </li>

                </ul>
                <button class="show-all-items m-t-15 m-b-20"
                        v-if="category.label.length > 5"
                        @click="showAllContent =! showAllContent"
                >
                  {{ !showAllContent ? 'Закрыть' : 'Посмотреть все' }}
                </button>
              </div>
            </div>
            <button class="m-t-35 reset-filter-btn">Очистить фильтр</button>


          </div>
          <button class="btn filled primary font-bd m-t-40 m-b-25 sign-btn show-page" @click="showPage()">Показать еще
          </button>
          <ul class="paginate m-t-25">
            <li class="paginate-item active">1</li>
            <li class="paginate-item">2</li>
            <li class="paginate-item">3</li>
            <li class="paginate-item">4</li>
            <li class="paginate-item">5</li>
            <li class="paginate-item">6</li>
            <li class="paginate-item">...</li>
            <li class="paginate-item">99</li>
            <li class="paginate-item">100</li>
          </ul>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import {BreadcrumbLink, OptionButton, SliderImage, SortedLink} from '@/elements'
import SliderContent from "@/elements/SliderContent";
import CategoryButton from "@/elements/CategoryButton";


export default {
  name: "MainContent",
  components: {
    CategoryButton,
    SliderContent,
    VueSlickCarousel,
    BreadcrumbLink,
    OptionButton,
    SliderImage,
    SortedLink


  },
  data: () => ({
    isMobileCategory: false,
    isFiltered: false,
    isMobileFiltered: false,
    isLike: false,
    showAllContent: true,
    searchTxt: '',
    breadcrumbs: [
      {name: "Печи", href: '#'},
      {name: "Электрические", href: '#'},
      {name: "Harvia", href: '#'},
    ],
    optionButtonsList: [
      {label: "Для квартиры",},
      {label: "Для дачи",},
      {label: "Для бизнеса",},
      {label: "Дизайнерские",},
      {label: "Недорогие",},
      {label: "до 40 м2",},
    ],
    sorted: [
      {name: 'Сначала популярные', active: true},
      {name: 'Новизна', active: false},
      {name: 'Цена', active: false}
    ],
    spanMore:[
      {
        isActive: false,
        id: 20,
        price: 678,
        title: 'Сауна • 34 м2 • IKI • амбарная доска',
        address: 'Москва, квартира',
        addressTitle: 'Контакт Плюс',
        image: [
          require('../assets/images/image-29.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: false,
        id: 21,
        price: 309,
        commentCount: 2,
        likeCount: 134,
        title: 'Сауна • 11 м2 • Helo Pikkutonttu',
        address: 'КП «Нахабино Кантри», дом',
        addressTitle: '95 градусов',
        image: [
          require('../assets/images/image-40.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: false,
        id: 22,
        price: 89,
        title: 'Сауна • 4 м2 • Tylo Compact',
        address: 'Москва, квартира',
        addressTitle: '95 градусов',
        image: [
          require('../assets/images/image-49.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: false,
        id: 23,
        price: 456,
        commentCount: 2,
        likeCount: 134,
        title: 'SPA-зона • 2000 м2 • Klafs',
        address: 'ASPA',
        image: [
          require('../assets/images/image-28.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },


      {
        isActive: false,
        id: 24,
        price: 900,
        commentCount: 1,
        likeCount: 256,
        title: 'Травяная сауна • 34 м2 • Lang Sauna-Therm',
        address: 'Москва, Termoland',
        addressTitle: 'Контакт Плюс',
        image: [
          require('../assets/images/image-44.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: false,
        id: 25,
        price: 566,
        likeCount: 1,
        title: 'Гималайская сауна • 65 м2 • IKI Pro',
        address: 'Москва, Termoland',
        addressTitle: 'Контакт Плюс',
        image: [
          require('../assets/images/image-37.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: false,
        id: 26,
        price: 900,
        commentCount: 2,
        likeCount: 134,
        title: 'Сауна • 65 м2 • Helo Saunatonttu • от 1 400 000 ₽',
        address: 'Москва, Termoland',
        addressTitle: 'Контакт Плюс',
        image: [
          require('../assets/images/image-38.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: false,
        id: 27,
        price: 555,
        title: 'Нефритовая сауна, 65 м2, IKI',
        address: 'Москва, Termoland',
        addressTitle: 'Контакт Плюс',
        image: [
          require('../assets/images/image-39.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },


      {
        isActive: false,
        id: 28,
        price: 444,
        title: 'Сауна • 34 м2 • IKI • амбарная доска',
        address: 'Москва, квартира',
        addressTitle: 'Контакт Плюс',
        image: [
          require('../assets/images/image-29.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: false,
        id: 29,
        price: 988,
        commentCount: 2,
        likeCount: 134,
        title: 'Сауна • 11 м2 • Helo Pikkutonttu',
        address: 'КП «Нахабино Кантри», дом ',
        addressTitle: '95 градусов',
        image: [
          require('../assets/images/image-40.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: false,
        id: 30,
        price: 333,
        title: 'Сауна • 4 м2 • Tylo Compact',
        address: 'Москва, квартира',
        addressTitle: '95 градусов',
        image: [
          require('../assets/images/image-49.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: false,
        id: 31,
        price: 555,
        commentCount: 2,
        likeCount: 134,
        title: 'SPA-зона • 2000 м2 • Klafs',
        address: 'ASPA',
        image: [
          require('../assets/images/image-28.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },


      {
        isActive: false,
        id: 32,
        price: 9999,

        title: 'Сауна • 34 м2 • EOS',
        commentCount: 1,
        likeCount: 256,
        address: 'Москва, квартира',
        addressTitle: 'Твой пар',
        image: [
          require('../assets/images/image-20.png'),
          require('../assets/images/image-24.png'),
          require('../assets/images/image-4.png'),
          require('../assets/images/image-28.png'),
        ],

      },
      {
        isActive: false,
        id: 33,
        price: 767,

        likeCount: 1,
        title: 'Сауна • 65 м2 • Harvia',
        address: 'Королев, дом',
        addressTitle: '95 градусов',
        image: [
          require('../assets/images/image-24.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-40.png'),
          require('../assets/images/image-28.png'),
        ],
      },
      {
        isActive: false,
        id: 34,
        price: 666,

        title: 'Сауна • 65 м2 • Harvia • от 1 400 000 ₽',
        address: 'Москва, квартира',
        addressTitle: '95 градусов',
        image: [
          require('../assets/images/image-4.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: false,
        id: 35,
        price: 777,

        likeCount: 39,
        title: 'Сауна, 65 м2, Harvia Cillindro',
        address: 'Москва, квартира',
        addressTitle: 'Контакт Плюс',
        image: [
          require('../assets/images/image-28.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },

      {
        isActive: false,
        id: 36,
        price: 322,
        commentCount: 1,
        likeCount: 256,
        title: 'Травяная сауна • 34 м2 • Lang Sauna-Therm',
        address: 'Москва, Termoland',
        addressTitle: 'Контакт Плюс',
        image: [
          require('../assets/images/image-44.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: false,
        id: 37,
        price: 5454,
        likeCount: 1,
        title: 'Гималайская сауна • 65 м2 • IKI Pro',
        address: 'Москва, Termoland',
        addressTitle: 'Контакт Плюс',
        image: [
          require('../assets/images/image-37.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: false,
        id: 38,
        price: 3232,
        commentCount: 2,
        likeCount: 134,
        title: 'Сауна • 65 м2 • Helo Saunatonttu • от 1 400 000 ₽',
        address: 'Москва, Termoland',
        addressTitle: 'Контакт Плюс',
        image: [
          require('../assets/images/image-38.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: false,
        id: 39,
        price: 908,
        title: 'Нефритовая сауна, 65 м2, IKI',
        address: 'Москва, Termoland',
        addressTitle: 'Контакт Плюс',
        image: [
          require('../assets/images/image-39.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },

    ],
    spaInfo: [

      {
        isActive: true,
        id: 0,
        title: 'Сауна • 34 м2 • EOS',
        commentCount: 1,
        likeCount: 256,
        price: 200,
        address: 'Москва, квартира',
        addressTitle: ' 95 градусов',
        image: [
          require('../assets/images/image-20.png'),
          require('../assets/images/image-24.png'),
          require('../assets/images/image-4.png'),
          require('../assets/images/image-28.png'),
        ],

      },
      {
        isActive: true,
        id: 1,
        likeCount: 1,
        price: 1000000,
        title: 'Сауна • 65 м2 • Harvia',
        address: 'Королев, дом ',
        addressTitle: '95 градусов',
        image: [
          require('../assets/images/image-24.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-40.png'),
          require('../assets/images/image-28.png'),
        ],
      },
      {
        isActive: true,
        id: 2,
        price: 823,
        title: 'Сауна • 65 м2 • Harvia • от 1 400 000 ₽',
        address: 'Москва, квартира',
        addressTitle: '95 градусов',
        image: [
          require('../assets/images/image-4.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: true,
        id: 3,
        price: 23,
        likeCount: 39,
        title: 'Сауна, 65 м2, Harvia Cillindro',
        address: 'Москва, квартира',
        addressTitle: 'Контакт Плюс',

        image: [
          require('../assets/images/image-28.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },


      {
        isActive: true,
        id: 4,
        title: 'Сауна • 34 м2 • IKI • амбарная доска',
        address: 'Москва, квартира',
        addressTitle: 'Контакт Плюс',
        price: 123,
        image: [
          require('../assets/images/image-29.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: true,
        id: 5,
        commentCount: 2,
        likeCount: 134,
        price: 426,
        title: 'Сауна • 11 м2 • Helo Pikkutonttu',
        address: 'КП «Нахабино Кантри», дом',
        addressTitle: '95 градусов',
        image: [
          require('../assets/images/image-40.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: true,
        id: 6,
        price: 123,
        title: 'SPA-зона • 2000 м2 • Klafs',
        address: 'Москва, Barvikha Hotel & SPA ',
        addressTitle: 'ASPA',
        image: [
          require('../assets/images/image-30.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: true,
        id: 7,
        price: 523,
        commentCount: 2,
        likeCount: 134,
        title: 'SPA-зона • 2000 м2 • Klafs',
        address: 'ASPA',
        image: [
          require('../assets/images/image-28.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },

      {
        isActive: true,
        id: 8,
        commentCount: 1,
        likeCount: 256,
        price: 123,
        title: 'Травяная сауна • 34 м2 • Lang Sauna-Therm',
        address: 'Москва, Termoland',
        addressTitle: ' Контакт Плюс',
        image: [
          require('../assets/images/image-44.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: true,
        id: 9,
        likeCount: 1,
        price: 723,
        title: 'Гималайская сауна • 65 м2 • IKI Pro',
        address: 'Москва, Termoland',
        addressTitle: ' Контакт Плюс',
        image: [
          require('../assets/images/image-37.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: true,
        id: 10,
        price: 432,
        commentCount: 2,
        likeCount: 134,
        title: 'Сауна • 65 м2 • Helo Saunatonttu • от 1 400 000 ₽',
        address: 'Москва, Termoland',
        addressTitle: ' Контакт Плюс',
        image: [
          require('../assets/images/image-38.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: true,
        id: 11,
        price: 503,
        title: 'Нефритовая сауна, 65 м2, IKI',
        address: 'Москва, Termoland',
        addressTitle: ' Контакт Плюс',
        image: [
          require('../assets/images/image-39.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },


      {
        isActive: true,
        id: 12,
        price: 773,
        title: 'Сауна • 34 м2 • IKI • амбарная доска',
        address: 'Москва, квартира',
        addressTitle: ' Контакт Плюс',
        image: [
          require('../assets/images/image-29.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: true,
        id: 13,
        price: 773,
        commentCount: 2,
        likeCount: 134,
        title: 'Сауна • 11 м2 • Helo Pikkutonttu',
        address: 'КП «Нахабино Кантри», дом',
        addressTitle: '95 градусов',
        image: [
          require('../assets/images/image-40.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: true,
        id: 14,
        price: 777,
        title: 'Сауна • 4 м2 • Tylo Compact',
        address: 'Москва, квартира',
        addressTitle: '95 градусов',
        image: [
          require('../assets/images/image-49.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: true,
        id: 15,
        commentCount: 2,
        price: 456,
        likeCount: 134,
        title: 'SPA-зона • 2000 м2 • Klafs',
        address: 'ASPA',
        image: [
          require('../assets/images/image-28.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: true,
        id: 16,
        price: '734',
        commentCount: 1,
        likeCount: 256,
        title: 'Травяная сауна • 34 м2 • Lang Sauna-Therm',
        address: 'Москва, Termoland',
        addressTitle: 'Контакт Плюс',
        image: [
          require('../assets/images/image-44.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: true,
        id: 17,
        price: 1356,
        likeCount: 1,
        title: 'Гималайская сауна • 65 м2 • IKI Pro',
        address: 'Москва, Termoland',
        addressTitle: 'Контакт Плюс',
        image: [
          require('../assets/images/image-37.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: true,
        id: 18,
        price: 1656,
        commentCount: 2,
        likeCount: 134,
        title: 'Сауна • 65 м2 • Helo Saunatonttu • от 1 400 000 ₽',
        address: 'Москва, Termoland',
        addressTitle: 'Контакт Плюс',
        image: [
          require('../assets/images/image-38.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },
      {
        isActive: true,
        id: 19,
        price: 567,
        title: 'Нефритовая сауна, 65 м2, IKI',
        address: 'Москва, Termoland',
        addressTitle: 'Контакт Плюс',
        image: [
          require('../assets/images/image-39.png'),
          require('../assets/images/image-30.png'),
          require('../assets/images/image-20.png'),
          require('../assets/images/image-37.png'),
        ],
      },




    ],


    categories: [
      {
        checkedCount: 0,
        isSearchBlock: true,
        title: 'Компания',
        openSelect: true,
        label: [
          {name: '95 градусов', value: false},
          {name: 'Контакт Плюс', value: false},
          {name: 'Твой пар', value: false},
          {name: '3D-сауна', value: false},
          {name: 'IKI', value: false},
          {name: '2D-сауна', value: false},
          {name: '7D-сауна', value: false},
          {name: '9D-сауна', value: false},
          {name: '95-градусов', value: false},
          {name: 'Контакт-Плюс', value: false},

        ]
      },
      {
        checkedCount: 0,
        openSelect: true,
        title: 'Цена',
        isSearchBlock: false,

        label: [
          {name: 'до 10 000 ₽', value: false},
          {name: '10 001 – 30 000 ₽', value: false},
          {name: '30 001 – 50 000 ₽', value: false},
          {name: '50 000 ₽ и более', value: false},
        ]
      },
      {
        checkedCount: 0,
        openSelect: true,
        title: 'Объем',
        isSearchBlock: false,
        isDisabled: true,
        label: [
          {name: 'до 20 кВт', value: false},
          {name: '10–20 кВт', value: false},
          {name: '20–30 кВт ', value: false},
          {name: '30 кВт и более ', value: false},
        ]
      },
      {
        openSelect: false,
        title: 'Объем парной',
        label: [
          {name: 'до 20 кВт'},
          {name: '10–20 кВт'},
          {name: '20–30 кВт '},
          {name: '30 кВт и более '},
        ]
      },
      {
        openSelect: false,
        title: 'Парогенератор',
        label: []


      },
      {
        openSelect: false,
        title: 'Управление',
        label: []


      },
      {
        openSelect: false,
        title: 'Установка',
        label: [],


      },
    ]

  }),

  methods: {
    addLike(item) {
      this.isLike = true;
      if (this.isLike === true) {
        this.spaInfo[item].likeCount += 1;

      } else {
        this.spaInfo[item].likeCount -= 1;
      }
    },
    openSelectItem(item) {
      this.categories[item].openSelect = !this.categories[item].openSelect;

    },
    checkedItems(item, value) {
      if (value === true) {
        this.categories[item].checkedCount += 1;
      } else {
        this.categories[item].checkedCount -= 1;
      }


    },
    sortItems(itemName) {
      switch (itemName) {
        case 'Сначала популярные':

          this.spaInfo.sort((a, b) => a.id - b.id);
          break;

        case 'Новизна':
          this.spaInfo.sort((a, b) => a.likeCount - b.likeCount);
          break;
        case 'Цена':
          this.spaInfo.sort((a, b) => a.price - b.price);
          break;
      }


    },
    showPage() {
      for(let i=0;i<this.spanMore.length;i++) {
        this.spaInfo.push(this.spanMore[i])
      }
    },
    filteredItems() {
      let arr = this.categories[0].label

      return arr.filter(item => {
        return item.name.toLowerCase().includes(this.searchTxt.toLowerCase())
      })

    },
  },

  computed: {}

}
</script>

<style lang="scss">


</style>