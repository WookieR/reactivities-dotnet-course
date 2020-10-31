import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore';
import { Link } from 'react-router-dom';

const ActivityList: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const { activitiesByDate, deleteActivity, submitting, target } = activityStore;

    return (
        <Segment clearing>
            <Item.Group divided>
                {
                    activitiesByDate.map( activity => (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as='a'>{activity.title}</Item.Header>

                                <Item.Meta>{activity.date}</Item.Meta>

                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>{activity.city}, {activity.venue}</div>
                                </Item.Description>

                                <Item.Extra>
                                    <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View" color="blue"></Button>
                                    <Button onClick={ (e) => deleteActivity( activity.id, e)} floated="right" content="Delete" color="red" loading={target === activity.id && submitting} name={activity.id}></Button>
                                    <Label basic content={activity.category}></Label>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))
                }
                
            </Item.Group>
        </Segment>
        
    )
}

export default observer(ActivityList);
