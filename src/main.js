import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
    Swipe,
    SwipeItem,
    Lazyload,
    Badge,
    Sidebar,
    SidebarItem,
    Collapse,
    CollapseItem,
    Tab,
    Tabs,
    Card,
    Image as VanImage,
    Tag,
    Button,
    Form,
    Field,
    CellGroup,
    Checkbox,
    CheckboxGroup ,
    SwipeCell ,
    Stepper ,
    SubmitBar ,
    AddressEdit ,
    AddressList ,
    Locale ,
    Popup ,
    DropdownMenu, 
    DropdownItem,

} from 'vant';
import zhTW from 'vant/es/locale/lang/zh-TW';//將vant簡體字轉繁體
Locale.use('zh-TW', zhTW);
createApp(App)
    .use(store)
    .use(router)
    .use(Swipe)
    .use(SwipeItem)
    .use(Lazyload, {
        loading: require('./assets/images/image.png')

    })
    .use(Sidebar)
    .use(Badge)
    .use(SidebarItem)
    .use(Collapse)
    .use(CollapseItem)
    .use(Tab)
    .use(Tabs)
    .use(Card)
    .use(VanImage)
    .use(Tag)
    .use(Button)
    .use(Form)
    .use(Field)
    .use(CellGroup)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(SwipeCell)
    .use(Stepper)
    .use(SubmitBar)
    .use(AddressList)
    .use(AddressEdit)
    .use(Locale)
    .use(Popup)
    .use(DropdownMenu)
    .use(DropdownItem)
    .mount('#app')