
import React, { useState, useEffect } from "react";
import DayView from "../../components/DayView";
import { connect } from "react-redux";
import { getEvents, getEventsByAuthor } from "../../actions/eventActions";

import moment from "moment"


const DayViewPage = ({
    isAuthenticated,
    getEventsByAuthor,
    getEvents,
    match,
    events
 }) => {
    useEffect(() => {
       isAuthenticated ? getEvents() : getEventsByAuthor(match.params.author);
    }, [isAuthenticated, getEvents, getEventsByAuthor, match]);
 
    return <DayView events={events} key={events}/>;
 };
 
 const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    events: state.event.events
 });
 
 
 
 export default connect(
    mapStateToProps,
    { getEventsByAuthor, getEvents }
 )(DayViewPage);