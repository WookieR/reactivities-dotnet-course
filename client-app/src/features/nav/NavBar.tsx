import { observer } from 'mobx-react-lite';
import React from 'react'
import {  NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'

const NavBar: React.FC = () => {
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to="/">
                    <img src="./assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to="/activities"/>
                <Menu.Item>
                    <Button as={NavLink} to="create-activity" positive content="Create activity"/>
                </Menu.Item>
            </Container>
            
        </Menu>
    )
}

export default observer(NavBar);
