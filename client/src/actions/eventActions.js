
import axios from "axios";
import {
   CREATE_EVENT,
   GET_EVENT,
   GET_EVENTS,
   UPDATE_EVENT,
   DELETE_EVENT,
   TOGGLE_EVENTS_LOADING,
   TOGGLE_EVENT_LOADING,
   RESET_EVENT
} from "./types";

import { setErrors, clearErrors } from "./errorActions";

export const createEvent = (eventData, history) => dispatch => {
   dispatch(toggleEventLoading());
   axios
      .post("http://localhost:9000/events/create", eventData)
      .then(res => {
         dispatch({
            type: CREATE_EVENT,
            payload: res.data
         });
         dispatch(toggleEventLoading());
         history.push("/calendar");
      })
      .catch(err => {
         dispatch(setErrors(err.response.data));
         dispatch(toggleEventLoading());
      });
};

export const getEventtByID = id => dispatch => {
   dispatch(toggleEventLoading());
   axios
      .get(`http://localhost:9000/events/event/${id}`)
      .then(res => {
         dispatch({
            type: GET_EVENT,
            payload: res.data
         });
         dispatch(clearErrors());
         dispatch(toggleEventLoading());
      })

      .catch(err => {
         dispatch(setErrors(err.response.data));
         dispatch(toggleEventLoading());
      });
};

export const getEventsByAuthor = author => dispatch => {
   dispatch(toggleEventsLoading());
   axios
      .get(`http://localhost:9000/events/author/${author}`)
      .then(res => {
         dispatch({
            type: GET_EVENTS,
            payload: res.data
         });
         dispatch(toggleEventsLoading());
      })
      .catch(err => {
         dispatch(setErrors(err.response.data));
         dispatch(toggleEventsLoading());
      });
};

export const getEvents = () => dispatch => {
   dispatch(toggleEventsLoading());
   axios
      .get(`http://localhost:9000/events/`)
      .then(res => {
         dispatch({
            type: GET_EVENTS,
            payload: res.data
         });
         dispatch(clearErrors());
         dispatch(toggleEventsLoading());
      })
      .catch(err => {
         dispatch(setErrors(err.response.data));
         dispatch(toggleEventsLoading());
      });
};

export const updateEvent = (id, eventData, history) => dispatch => {
   dispatch(toggleEventLoading());
   axios
      .put(`http://localhost:9000/events/event/update/${id}`, eventData)
      .then(res => {
         dispatch({
            type: UPDATE_EVENT,
            payload: res.data
         });
         dispatch(toggleEventLoading());
         history.push('/calendar');
      })
      .catch(err => {
         dispatch(setErrors(err.response.data));
         dispatch(toggleEventLoading());
      });
};

export const deleteEvent = (id, history) => dispatch => {
   dispatch(toggleEventLoading());
   axios
      .delete(`http://localhost:9000/events/event/delete/${id}`)
      .then(res => {
         dispatch({
            type: DELETE_EVENT,
            payload: id
         });
         dispatch(toggleEventLoading());
      })
      .catch(err => {
         dispatch(setErrors(err.response.data));
         dispatch(toggleEventLoading());
      });
};

export const resetEvent = () => {
   return {
      type: RESET_EVENT
   };
};

export const toggleEventLoading = () => {
   return {
      type: TOGGLE_EVENT_LOADING
   };
};

export const toggleEventsLoading = () => {
   return {
      type: TOGGLE_EVENTS_LOADING
   };
};
