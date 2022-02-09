import { PropsUser } from "./props";

export const user: PropsUser[] = [
  {
    id: "1",
    userName: "user",
    passWord: "user123",
    name: "Sara",
    address: "långgatan Gothenburg, 417 21",
    cart   :[],
    role: "user",
  }
];



interface adminProps{
  userName : string,
  passWord : string,
  name :string,
  role : string,
}

export const admin : adminProps = {
  userName : "admin",
  passWord : "admin123",
  name :"administrator",
  role : "admin"
}