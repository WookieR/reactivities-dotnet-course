import { observable, action, makeObservable, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import Activities from "../api/agent";
import { IActivity } from '../models/activity';

configure({enforceActions: "always"});

class activityStore{

    constructor() {
        makeObservable(this);
    }

    @observable activityRegistry = new Map();
    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate(){
        return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()))
    }

    groupActivitiesByDate(activities: IActivity[]){
        const sortedActivities = activities.sort((a, b) => a.date!.getTime() - b.date!.getTime());
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date!.toISOString().split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities
        }, {} as {[key: string]: IActivity[]}))
    }


    @action loadActivities = async() => {
        this.loadingInitial = true;

        try{
            const activities = await Activities.list();

            runInAction(() => {
                activities.forEach((activity) => {
                    activity.date = new Date(activity.date!);
                    this.activityRegistry.set(activity.id, activity);
                });
    
                this.loadingInitial = false;
            })
            

        }catch (error){
            runInAction( () => {
                this.loadingInitial = false;
                console.log(error);
            })
            
        }
    }

    @action loadActivity = async(id: string) => {
        let activity = this.getActivity(id);

        if(activity) {
            this.activity = activity;
        } else {
            this.loadingInitial = true;
            try{
                activity = await Activities.details(id);
                runInAction(() => {
                    activity.date = new Date(activity.date);
                    this.activity = activity;
                    this.loadingInitial = false;
                });
            }catch (error) {
                runInAction(() => {
                    this.loadingInitial = false;
                })
            }
        }

    }

    @action clearActivity = () => {
        this.activity = null;
    }

    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    @action createActivity = async(activity: IActivity) => {
        this.submitting = true;
        try{
            await Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.submitting = false;
            })
            
        }catch (error){
            runInAction(() => {
                this.submitting = false;
                console.log(error);
            });
        }
    }

    @action editActivity = async(activity: IActivity) => {
        this.submitting = true;

        try{
            await Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
                this.submitting = false;
            })
            
        } catch(error) {
            runInAction(() => {
                this.submitting = false;
                console.log(error);
            })
            
        }
    }

    @action deleteActivity = async(id: string, event: SyntheticEvent<HTMLButtonElement>) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try{
            await Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            })
            
        } catch (error){
            runInAction(() => {
                this.submitting = false;
                this.target = '';
                console.log(error);
            })
            
        }
    }

}

export default createContext(new activityStore())