import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Nav from '../Nav'
import {
    AppBar, Toolbar
  } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search'
import { Button } from '@material-ui/core'
import logo from '../components/images/logo.png'

Enzyme.configure({adapter: new Adapter()})

describe("When Header renders",() => {
    it("displays a nav bar",() => {
        const nav = shallow(<Nav />)
        console.log(nav.debug())
        expect(nav.find(AppBar).length).toEqual(1)
        expect(nav.find(Toolbar).length).toEqual(1)
        expect(nav.contains(<SearchIcon />)).toEqual(true)
        expect(nav.find("img").prop("src")).toEqual(logo)
    })

    it("displays a links and button when logged in",() =>{
        const nav =shallow(<Nav loggedIn={true} />)
        expect(nav.contains(<a href='/petindex' className="nav-link">See All Listings</a>)).toEqual(true)
        expect(nav.contains(<a href='/petnew' className="nav-link">Create Listing</a>)).toEqual(true)
        expect(nav.contains(<a href='/aboutus' className="nav-link">About Us</a>)).toEqual(true)
        expect(nav.find(Button).length).toEqual(1)
    })
})