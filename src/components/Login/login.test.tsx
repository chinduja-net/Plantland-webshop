 import { render, screen } from "@testing-library/react";
import Login from "./Login";
import userEvent from '@testing-library/user-event';
import {user} from '../../assets/users'
jest.spyOn(window, "alert").mockImplementation(() => {});
const mockedUsedNavigate = jest.fn();
const mockedLink = jest.fn()
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  Link : () => mockedLink
}));

describe('testing login component', () => {

  it('renders without crashing', ()=> {
    render (<Login />)
  })

  it('displays the input field with no input', () => {
    render (<Login />)

    const inputUserName = screen.getByPlaceholderText('username');
    expect(inputUserName).toBeEmptyDOMElement()
    const inputPassword = screen.getByPlaceholderText('password')
    expect(inputPassword).toBeEmptyDOMElement();

  })

  it('pass valid input for username and password', ()=> {
    render (<Login />)

    const inputUserName = screen.getByPlaceholderText('username');
    userEvent.type(inputUserName,'user')
    expect(inputUserName).toHaveValue('user')
    const inputPassword = screen.getByPlaceholderText('password')
    userEvent.type(inputPassword,'user123')
    expect(inputPassword).toHaveValue('user123')

  })

  it('compare credentials and allow login if matched', () => {
    render (<Login />)

    const inputUserName = screen.getByPlaceholderText('username');
    userEvent.type(inputUserName,'user')
    const inputPassword = screen.getByPlaceholderText('password')
    userEvent.type(inputPassword,'user123')

    const savedUserName = user[0].userName
    const savedPassword = user[0].passWord
    const loginButton = screen.getByText('SIGN IN')
    expect(inputUserName).toHaveValue(savedUserName)
    expect(inputPassword).toHaveValue(savedPassword)
    userEvent.click(loginButton)
    expect(inputUserName).toBeEmptyDOMElement()
    expect(inputPassword).toBeEmptyDOMElement();
   expect(mockedUsedNavigate).toHaveBeenCalledWith("/")
   
  })

  it('compare credentials and dont allow login if not matched', ()=> {
    
    render (<Login />)
    const inputUserName = screen.getByPlaceholderText('username');
    userEvent.type(inputUserName,'hyjkkk')
    const inputPassword = screen.getByPlaceholderText('password')
    userEvent.type(inputPassword,'l9806')
    const savedUserName = user[0].userName
    const savedPassword = user[0].passWord
    const loginButton = screen.getByText('SIGN IN')
    expect(inputUserName).not.toHaveValue(savedUserName)
    expect(inputPassword).not.toHaveValue(savedPassword)
    userEvent.click(loginButton)
    expect(window.alert).toHaveBeenCalledWith("login Failed")
    //screen.findByDisplayValue("login Failed")
    

  })
/* it('navigate to / when sign out button is clicked', () => {
  render (<Login />)
  const logoutButton = screen.getByText('SIGN OUT');
  userEvent.click(logoutButton)
  screen.findByDisplayValue("logged out successfully!")
 

}) */
}) 