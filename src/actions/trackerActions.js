// introducing axios
import axios from 'axios';
// const bind
export const FETCH_TRACKERS_BEGIN   = 'FETCH_TRACKERS_BEGIN';
export const FETCH_TRACKERS_SUCCESS = 'FETCH_TRACKERS_SUCCESS';
export const FETCH_TRACKERS_FAILURE = 'FETCH_TRACKERS_FAILURE';
export const CREATE_TRACKER_SUCCESS = 'CREATE_TRACKER_SUCCESS';
export const REMOVE_TRACKER_SUCCESS = 'REMOVE_TRACKER_SUCCESS';
// tracker url set
const trackerUrl = `https://trackers-db-1021.herokuapp.com/trackers`;

export const fetchTrackersBegin = () => ({
  type: FETCH_TRACKERS_BEGIN
});

export const fetchTrackersSuccess = trackers => ({
  type: FETCH_TRACKERS_SUCCESS,
  payload: { trackers }
});

export const createTrackerSuccess = tracker => ({
  type: CREATE_TRACKER_SUCCESS,
  payload: { tracker }
});

export const removeTrackersSuccess = trackerId => ({
  type: REMOVE_TRACKER_SUCCESS,
  payload: { trackerId }
})

export const fetchTrackersFailure = error => ({
  type: FETCH_TRACKERS_FAILURE,
  payload: { error }
});

// fetch trackers action
export function fetchTrackers() {
  return dispatch => {
    dispatch(fetchTrackersBegin());
    return fetch(trackerUrl)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchTrackersSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchTrackersFailure(error)));
  };
}

// post method to create trackers
export function createTrackers(trackerData) {
  console.log("track", trackerData);
  return dispatch => {
    dispatch(fetchTrackersBegin());
    return axios.post(trackerUrl, trackerData).then(resp => {
        dispatch(createTrackerSuccess(resp.data));
    }).catch(error => {
        dispatch(fetchTrackersFailure(error))
    });
  }
}

// delete request for remove trackers
export function deleteTracker(setId) {
  return dispatch => {
    dispatch(fetchTrackersBegin());
    axios.delete(`${trackerUrl}/${setId}/`)
    .then(resp => {
        let success = true;
        dispatch(removeTrackersSuccess(setId));
    }).catch(error => {
        dispatch(fetchTrackersFailure(error))
    });
  }
}

// HTTP errors handling since fetch won't.
export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}