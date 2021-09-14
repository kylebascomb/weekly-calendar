import {
    RESET_EVENT,
    CREATE_EVENT,
    GET_EVENT,
    GET_EVENTS,
    UPDATE_EVENT,
    DELETE_EVENT,
    TOGGLE_EVENTS_LOADING,
    TOGGLE_EVENT_LOADING
 } from "../actions/types";
 
 const initialState = {
    event: {},
    events: [],
    eventLoading: false,
    eventsLoading: false
 };
 
 export default function(state = initialState, action) {
    switch (action.type) {
       case CREATE_EVENT:
          return {
             ...state,
             events: [...state.events, action.payload]
          };
       case GET_EVENTS:
          return {
             ...state,
             event: {},
             events: [...action.payload]
          };
       case GET_EVENT:
          return {
             ...state,
             event: { ...action.payload[0] }
          };
       case UPDATE_EVENT:
          const events = state.events.filter(
             event => event._id !== action.payload._id
          );
          return {
             ...state,
             event: {},
             events: [...events, action.payload]
          };
       case DELETE_EVENT:
          return {
             ...state,
             events: state.events.filter(event => event._id !== action.payload)
          };
       case TOGGLE_EVENT_LOADING:
          return {
             ...state,
             eventLoading: !state.eventLoading
          };
       case TOGGLE_EVENTS_LOADING:
          return {
             ...state,
             eventsLoading: !state.eventsLoading
          };
       case RESET_EVENT:
          return initialState;
       default:
          return state;
    }
 }