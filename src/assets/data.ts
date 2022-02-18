import {Props} from '../assets/props'
import Aloe from './Images/Aloe.jpg'
import Pothos from './Images/Pothos.jpg'
import AloeVera from './Images/AloeVera.jpg'
import Monstera from './Images/Monstera.jpg'
import Fiddle from './Images/Fiddle.jpg'
import Rubber from './Images/Rubber.jpg'

const productsData : Props[] = [{
  id: '1',
  name: 'Aloe Vera',
  image:Aloe,
  price:129,
  quantity:10,
  itemsLeft:10,
  inCart: false,
  itemsInCart:0
},{
  id:'2',
  name:'Pothos',
  image:Pothos,
  price:99,
  quantity:10,
  itemsLeft:10,
  inCart: false,
  itemsInCart:0

},{
id:'3',
name:'Aloe Vera',
image:AloeVera,
price:119,
quantity:10,
itemsLeft:10,
inCart: false,
itemsInCart:0
},{
  id:'4',
  name:'Monstera',
  image:Monstera,
  price:149,
  quantity:10,
  itemsLeft:10,
  inCart: false,
  itemsInCart:0
},{
  id:'5',
  name:'Fiddle leaf',
  image:Fiddle,
  price:89,
  quantity:10,
  itemsLeft:10,
  inCart: false,
  itemsInCart:0
},{
  id:'6',
  name:'Rubber plant',
  image:Rubber,
  price:109,
  quantity:10,
  itemsLeft:10,
  inCart: false,
  itemsInCart:0
}]


export default productsData;