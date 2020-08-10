import {
  FETCH_TRACKERS_BEGIN,
  FETCH_TRACKERS_SUCCESS,
  FETCH_TRACKERS_FAILURE,
  CREATE_TRACKER_SUCCESS,
  REMOVE_TRACKER_SUCCESS
} from '../actions/trackerActions';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function productReducer(state = initialState, action) {
  switch(action.type) {
    case CREATE_TRACKER_SUCCESS:
      // create trackers action payload store
      // mark the spinner as false as we got `tracker items`
      let items = state.items;
      items.push(action.payload.tracker);
      return {
        ...state,
        loading: false,
        items,
        error: null
      };
      
    case FETCH_TRACKERS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something later on as usecase
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_TRACKERS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.trackers,
        error: null
      };

    case REMOVE_TRACKER_SUCCESS:
      // set loading "false".
      // update the trackers item store
      let updatedItems = state.items.filter(item => {
        return item.id !== action.payload.trackerId
      });
      return {
        ...state,
        items: updatedItems,
        loading: false,
        error: null
      };

    case FETCH_TRACKERS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, hence, set `tracker items` empty.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      // default case in a reducer
      return state;
  }
}