import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PROJECT_GALLERY_ITEMS,
  MIN_ZOOM,
  MAX_ZOOM,
  getNextGalleryIndex,
  getPrevGalleryIndex,
  clampZoomLevel,
} from './gallery';

test('PROJECT_GALLERY_ITEMS includes all 4 uploaded construction photos', () => {
  assert.equal(PROJECT_GALLERY_ITEMS.length, 4);
  const paths = PROJECT_GALLERY_ITEMS.map((item) => item.image);
  assert.deepEqual(paths, [
    '/assets/aistudio/Screenshot_20261117-155021_2_3992c63a.jpg',
    '/assets/aistudio/Screenshot_20261117-155045_2_89436275.jpg',
    '/assets/aistudio/Screenshot_20261117-154948_2_77c29c24.jpg',
    '/assets/aistudio/Screenshot_20261117-155056_2_cace0065.jpg',
  ]);
});

test('getNextGalleryIndex wraps smoothly at boundaries', () => {
  assert.equal(getNextGalleryIndex(0, 4), 1);
  assert.equal(getNextGalleryIndex(3, 4), 0);
  assert.equal(getNextGalleryIndex(0, 0), 0);
});

test('getPrevGalleryIndex wraps smoothly at boundaries', () => {
  assert.equal(getPrevGalleryIndex(2, 4), 1);
  assert.equal(getPrevGalleryIndex(0, 4), 3);
  assert.equal(getPrevGalleryIndex(0, 0), 0);
});

test('clampZoomLevel bounds zoom between MIN_ZOOM and MAX_ZOOM', () => {
  assert.equal(clampZoomLevel(0.25), MIN_ZOOM);
  assert.equal(clampZoomLevel(1.5), 1.5);
  assert.equal(clampZoomLevel(4), MAX_ZOOM);
});
