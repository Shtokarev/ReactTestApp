import {
  BaseActionType,
  generateActionCreator,
  generateSimpleActionCreator,
} from '../common/base.actions';
import { MapboxS3Creds } from './MapboxTypes'

// GetMapboxS3CredsAction
export type GetMapboxS3CredsAction = BaseActionType<'MAPBOX_GET_S3_CRED'>;
export const getMapboxS3Creds = generateSimpleActionCreator<
  'MAPBOX_GET_S3_CRED'
>('MAPBOX_GET_S3_CRED');

// SetMapboxS3CredsAction
export type SetMapboxS3CredsAction = BaseActionType<
  'MAPBOX_SET_S3_CRED',
  MapboxS3Creds
>;
export const setMapboxS3Creds = generateActionCreator<
  'MAPBOX_SET_S3_CRED',
  MapboxS3Creds
>('MAPBOX_SET_S3_CRED');

// UploadMapboxTilesetAction
export interface UploadMapboxTilesetPayload {
  tilesetName: string;
  file: string | any;
}
export type UploadMapboxTilesetAction = BaseActionType<
  'MAPBOX_UPLOAD_TILESET',
  UploadMapboxTilesetPayload
>;
export const uploadMapboxTileset = generateActionCreator<
  'MAPBOX_UPLOAD_TILESET',
  UploadMapboxTilesetPayload
>('MAPBOX_UPLOAD_TILESET');

export type MapboxActionType =
  | 'MAPBOX_GET_S3_CRED'
  | 'MAPBOX_SET_S3_CRED'
  | 'MAPBOX_UPLOAD_TILESET';

export type MapboxAction =
  | GetMapboxS3CredsAction
  | SetMapboxS3CredsAction
  | UploadMapboxTilesetAction;
