import * as functions from 'firebase-functions';

import { Storage } from '@google-cloud/storage';
const gcs = new Storage();

import { tmpdir } from 'os';
import { join, dirname } from 'path';

import * as sharp from 'sharp';
import * as fs from 'fs-extra';

export const compressPhoto = functions.storage
  .object()
  .onFinalize(async (object, event) => {
    const bucket = gcs.bucket(object.bucket);
    const filePath = object.name;
    const fileName = filePath.split('/').pop();
    const bucketDir = dirname(filePath);

    const workingDir = join(tmpdir(), 'c0mpre$$ed');
    const tmpFilePath = join(workingDir, 'source.png');

    // We only want to compress if the request included a desire quality so we gather that here
    const imageQuality = object.metadata ? object.metadata.quality : null;
    console.log('event', event);
    // bail if there isn't a quality passed from req or if the file has already been created or it's not an image
    if ( !imageQuality || fileName.includes('c0mpre$$ed@') || !object.contentType.includes('image')) {
      console.log('exiting function');
      return false;
    }
    object.metadata.location = 'some new location';
    console.log('metadata', object.metadata);

    // 1. Ensure c0mpre$$ed dir exists
    await fs.ensureDir(workingDir);

    // 2. Download Source File
    await bucket.file(filePath).download({
      destination: tmpFilePath
    });

    // 3. Resize the images and define an array of upload promises
    const sizes = [+imageQuality];

    const uploadPromises = sizes.map(async size => {
      const compressedFileName = `c0mpre$$ed@${size}_${fileName}`;
      const compressedFilePath = join(workingDir, compressedFileName);

      // Resize source image
      await sharp(tmpFilePath)
        .resize(size, size, { fit: 'contain'})
        // TODO: just send to origin file path here?
        .toFile(compressedFilePath);

      // Upload to GCS
      return bucket.upload(compressedFilePath, {
        destination: join(bucketDir, compressedFileName)
      });
    });

    // 4. Run the upload operations
    await Promise.all(uploadPromises);
    // 5. Cleanup remove the tmp/compressedFiles from the filesystem
    fs.remove(workingDir);
    return {data: "hello operator"};
  });