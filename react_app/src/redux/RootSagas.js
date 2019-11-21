import {watchGetSessions, watchPostNewSession} from "./SessionSagas"
import {watchPostNewTask, watchGetTasks, watchUpdateTask, watchGetMyTasks} from "./TaskSagas"
import {watchGetDeliverables, watchPostNewDeliverable, watchUpdateDeliverable} from "./DeliverableSagas"

import { all, call } from 'redux-saga/effects'

export default function* rootSaga() {
    yield all([
        call(watchPostNewSession),
        call(watchPostNewTask),
        call(watchGetSessions),
        call(watchGetTasks),
        call(watchUpdateTask),
        call(watchGetMyTasks),
        call(watchGetDeliverables),
        call(watchPostNewDeliverable),
        call(watchUpdateDeliverable)
    ])
}
