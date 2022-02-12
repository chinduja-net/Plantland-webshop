import {render,screen} from '@testing-library/react'
import Nav from './TopNav'
const mockedNavigator = jest.fn();
const mockedLink = jest.fn();

jest.mock("react-router-dom", () => ({
    useNavigate: () => mockedNavigator,
    Link: () => mockedLink
  }));

describe('testing nav component', () => {

it('renders nav component without crashing', ()=> {

  render (<Nav />)
})

})