export interface Props{
  id : string,
  name: string,
  image:string,
  price:number,
  quantity:number,
  inCart:boolean,
  itemsLeft:number,
  itemsInCart:number
}

export interface PropsCart{
  id : string,
  name: string,
  image:string,
  price:number,
  inCart:boolean,
  itemsLeft:number,
  itemsInCart:number
}


export interface PropsUser{
  id:string,
  userName : string,
  passWord:string,
  address:string,
  cart:object[],
  role:string
}