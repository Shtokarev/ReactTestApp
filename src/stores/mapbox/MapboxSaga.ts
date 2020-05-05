
import { call, put, takeEvery } from 'redux-saga/effects';

import { setAuthLoading } from '../index';
import { MapboxAction, MapboxActionType, UploadMapboxTilesetAction, } from './MapboxAction';
import { uploadTileset, listUploads } from '../../api/mapboxApi';

// const getMapbox = (state: AppState) => state.mapbox;
// const getS3Credentials = (state: AppState) => state.mapbox.s3Credentials;

function* uploadMapboxTilesetHandler(action: UploadMapboxTilesetAction) {
  yield put(setAuthLoading({ loading: true }));

  try {
    yield call(listUploads);
    const response = yield call(
      uploadTileset,
      action.payload.tilesetName,
      action.payload.file,
    )
    console.log(response);
    debugger;

  } catch (error) {
    console.log(error)
    debugger;
  }
  yield put(setAuthLoading({ loading: false }));
}

function handle<T extends MapboxAction>(
  type: MapboxActionType,
  handler: (action: T) => void
) {
  return takeEvery(type, handler);
}

export default function* authSaga() {
  yield handle('MAPBOX_UPLOAD_TILESET', uploadMapboxTilesetHandler);
}
