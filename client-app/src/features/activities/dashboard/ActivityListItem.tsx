import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

export const ActivityListItem: React.FC<{ activity: IActivity }> = ({activity}) => {

    //const activityStore = useContext(ActivityStore);
    //const { activitiesByDate, deleteActivity, submitting, target } = activityStore;

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item key={activity.id}>
                        <Item.Image size="tiny" circular src="/assets/user.png" />
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>

                            <Item.Meta>{activity.date}</Item.Meta>

                            <Item.Description>
                                Hosted by bob
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock' /> {activity.date}
                <Icon name='marker' /> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                Attendees goes here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View" color="blue"></Button>
            </Segment>
        </Segment.Group>
        
    )
}
