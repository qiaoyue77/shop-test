import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import { Swipe, SwipeItem,Lazyload ,Badge ,Sidebar, SidebarItem,Collapse, CollapseItem ,Tab, Tabs,Card  ,Image as VanImage,Tag,Button,Form ,Field,
    Checkbox, CheckboxGroup,Stepper,SwipeCell,SubmitBar,ContactCard  ,AddressList ,AddressEdit   } from 'vant';

createApp(App)
    .use(Swipe).use(SwipeItem).use(Lazyload ).use(Badge ).use(Sidebar).use(SidebarItem).use(Collapse).use(CollapseItem).use(Form ).use(Field )
    .use(Tab).use(Tabs).use(Card ).use(VanImage).use(Tag).use(Button).use(Checkbox).use(CheckboxGroup).use(ContactCard )
    .use(Stepper ).use(SwipeCell ).use(SubmitBar ).use(AddressEdit ).use(AddressList)
    .use(store).use(router).mount('#app')
