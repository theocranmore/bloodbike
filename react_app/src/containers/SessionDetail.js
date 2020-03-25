import React, {useEffect, useState} from 'react';
import '../App.css';
import 'typeface-roboto'
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {addTask, getAllTasks, SET_ACTIVE_TASK_UUID, setActiveTaskUUID, getSession, clearLoading} from '../redux/Actions'
import {connect} from "react-redux"
import {makeStyles} from "@material-ui/core/styles";
import TasksGrid from "../components/TasksGrid";
import {decodeUUID} from "../utilities";
import {useDispatch, useSelector} from "react-redux"
import {MainWindowContainer} from "../css/common";
import {
    useLocation,
} from "react-router-dom";
import {createLoadingSelector} from '../redux/selectors';
import TasksGridSkeleton from "../loadingComponents/TasksGridSkeleton";
import TasksTable from "../components/TasksTable";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function SessionDetail(props) {
    const loadingSelector = createLoadingSelector(['GET_TASKS', "GET_SESSION"]);
    const dispatch = useDispatch();
    const isFetching = useSelector(state => loadingSelector(state));
    const tasks = useSelector(state => state.tasks);
    const kanbanMode = useSelector(state => state.kanbanMode);
    //TODO: This could put data into title
    const session = useSelector(state => state.session);
    let session_uuid = decodeUUID(props.match.params.session_uuid_b62);
    //TODO: Maybe use this to show a particular task when navigating to the task URL directly
    //const activeTask = useSelector(state => state.sessionActiveTaskUUID);
    //dispatch(setActiveTaskUUID(props.match.params.task_uuid_b62));
    const theme = useTheme();
    const fullScreenModal = !useMediaQuery(theme.breakpoints.up('md'));


    function componentDidMount() {
        dispatch(getAllTasks(session_uuid));
        dispatch(getSession(session_uuid));
    }

    useEffect(componentDidMount, []);


    let location = useLocation();

    const classes = useStyles();

    if (isFetching) {
        return <TasksGridSkeleton count={4}/>
    } else if (kanbanMode) {
        return (
            <TasksGrid tasks={tasks}
                       location={location}
                       fullScreenModal={fullScreenModal}
                       onAddTaskClick={(task) => {
                           dispatch(addTask(task));
                       }}
                       sessionUUID={session_uuid}
                       modalView={"edit"}
            />

        )
    }
    else {
        return (
            <TasksTable tasks={tasks}
                       location={location}
                       fullScreenModal={fullScreenModal}
                       onAddTaskClick={(task) => {
                           dispatch(addTask(task));
                       }}
                       sessionUUID={session_uuid}
                       modalView={"edit"}
            />

        )

    }
}

export default SessionDetail;
