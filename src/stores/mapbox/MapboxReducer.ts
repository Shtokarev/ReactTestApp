import { MapboxAction } from './MapboxAction';
import { MapboxS3Creds } from './MapboxTypes';

export interface MapboxState {
  s3Credentials: MapboxS3Creds | null;
}

const initialState: MapboxState = {
  s3Credentials: null,
};

export function mapboxReducer(
  state: MapboxState = initialState,
  action: MapboxAction
): MapboxState {
  switch (action.type) {
    case 'MAPBOX_SET_S3_CRED':
      return {
        ...state,
        s3Credentials: action.payload,
      };

    default:
      return state;
  }
}
