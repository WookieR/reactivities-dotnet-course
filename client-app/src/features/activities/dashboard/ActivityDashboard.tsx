import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import ActivityList from './ActivityList';
import ActivityStore from '../../../app/stores/activityStore'
import { LoadingComponents } from '../../../app/layout/LoadingComponents';

const ActivityDashboard: React.FC = () => {

    const activityStore = useContext(ActivityStore);

    useEffect(() => {
      activityStore.loadActivities();
    }, [activityStore])
  
    if(activityStore.loadingInitial) return <LoadingComponents content="Loading activities..." />
    
    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityList />
            </GridColumn>
            <GridColumn width={6}>
                <h2>Activity Filters</h2>
            </GridColumn>
        </Grid>
        
    )
}

export default observer(ActivityDashboard);