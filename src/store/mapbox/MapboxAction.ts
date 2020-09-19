import {
  BaseActionType,
  generateActionCreator,
  generateSimpleActionCreator,
} from "../common/base.actions";
import { MapboxS3Creds } from "./MapboxTypes";

// GetMapboxS3CredsAction
export type GetMapboxS3CredsAction = BaseActionType<"MAPBOX_GET_S3_CRED">;
export const getMapboxS3Creds = generateSimpleActionCreator<
  "MAPBOX_GET_S3_CRED"
>("MAPBOX_GET_S3_CRED");

// SetMapboxS3CredsAction
export type SetMapboxS3CredsAction = BaseActionType<
  "MAPBOX_SET_S3_CRED",
  MapboxS3Creds
>;
export const setMapboxS3Creds = generateActionCreator<
  "MAPBOX_SET_S3_CRED",
  MapboxS3Creds
>("MAPBOX_SET_S3_CRED");

export type MapboxActionType = "MAPBOX_GET_S3_CRED" | "MAPBOX_SET_S3_CRED";

export type MapboxAction = GetMapboxS3CredsAction | SetMapboxS3CredsAction;
