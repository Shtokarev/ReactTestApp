import AWS from 'aws-sdk';
import fs from 'fs';
import mbxClient from '@mapbox/mapbox-sdk';
// import mbxStyles from '@mapbox/mapbox-sdk/services/styles';
// import mbxTilesets from '@mapbox/mapbox-sdk/services/tilesets';
import mbxUploads from '@mapbox/mapbox-sdk/services/uploads';

const accessToken = process.env.REACT_APP_MAPBOX_API_TOKEN || "";
const username = process.env.REACT_APP_MAPBOX_USERNAME || "";

const baseClient = mbxClient({ accessToken });
// const stylesService = mbxStyles(baseClient);
// const tilesetsService = mbxTilesets(baseClient);
const uploadsService = mbxUploads(baseClient);

export const getCredentials = () => {
  return uploadsService
    .createUploadCredentials()
    .send()
    .then(response => response.body);
}

export const listUploads = () => {
  return uploadsService.listUploads({})
    .send()
    .then(response => {
      // const uploads = response.body;
      console.log(response.body)
    });
}

export const putFileOnS3 = (credentials: any) => {
  const s3 = new AWS.S3({
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken,
    region: 'us-east-1'
  });

  return s3.putObject({
    Bucket: credentials.bucket,
    Key: credentials.key,
    Body: fs.createReadStream('/path/to/file.mbtiles')
  }).promise();
};

export async function uploadTileset(tilesetName: string, file: any) {
  try {
    const credentials: any = await new Promise((resolve, reject) =>
      uploadsService
        .createUploadCredentials()
        .send()
        .then(response => resolve(response.body))
        .catch(error => reject(error)));

    console.log(credentials)
    debugger;

    const s3 = new AWS.S3({
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken,
      region: 'us-east-1'
    });

    const result = await s3.putObject({
      Bucket: credentials.bucket,
      Key: credentials.key,
      Body: file[0],
    }).promise();

    console.log(result)
    debugger;

    const result2 = await new Promise((resolve, reject) =>
      uploadsService
        .createUpload({
          mapId: `${username}.${tilesetName}`,
          url: credentials.url
        })
        .send()
        .then(response => resolve(response.body))
        .catch(error => reject(error)));

    console.log(result2)
    debugger;

  } catch (error) {
    console.log(error.message);
    debugger;
  }
}