import * as THREE from 'three';

export interface OctreeItem {
  id: string;
  box: THREE.Box3;
  object: THREE.Object3D;
}

export class SpatialOctreeNode {
  bounds: THREE.Box3;
  items: OctreeItem[] = [];
  children: SpatialOctreeNode[] = [];
  maxItemsPerNode: number;
  maxDepth: number;
  depth: number;

  constructor(bounds: THREE.Box3, depth = 0, maxDepth = 4, maxItemsPerNode = 8) {
    this.bounds = bounds;
    this.depth = depth;
    this.maxDepth = maxDepth;
    this.maxItemsPerNode = maxItemsPerNode;
  }

  subdivide(): void {
    if (this.children.length > 0) return;

    const min = this.bounds.min;
    const max = this.bounds.max;
    const mid = new THREE.Vector3().addVectors(min, max).multiplyScalar(0.5);

    const boxes: THREE.Box3[] = [
      new THREE.Box3(new THREE.Vector3(min.x, min.y, min.z), new THREE.Vector3(mid.x, mid.y, mid.z)),
      new THREE.Box3(new THREE.Vector3(mid.x, min.y, min.z), new THREE.Vector3(max.x, mid.y, mid.z)),
      new THREE.Box3(new THREE.Vector3(min.x, mid.y, min.z), new THREE.Vector3(mid.x, max.y, mid.z)),
      new THREE.Box3(new THREE.Vector3(mid.x, mid.y, min.z), new THREE.Vector3(max.x, max.y, mid.z)),
      new THREE.Box3(new THREE.Vector3(min.x, min.y, mid.z), new THREE.Vector3(mid.x, mid.y, max.z)),
      new THREE.Box3(new THREE.Vector3(mid.x, min.y, mid.z), new THREE.Vector3(max.x, mid.y, max.z)),
      new THREE.Box3(new THREE.Vector3(min.x, mid.y, mid.z), new THREE.Vector3(mid.x, max.y, max.z)),
      new THREE.Box3(new THREE.Vector3(mid.x, mid.y, mid.z), new THREE.Vector3(max.x, max.y, max.z)),
    ];

    this.children = boxes.map((box) => new SpatialOctreeNode(box, this.depth + 1, this.maxDepth, this.maxItemsPerNode));

    // Re-distribute existing items to children if possible
    const existing = [...this.items];
    this.items = [];
    existing.forEach((item) => this.insert(item));
  }

  insert(item: OctreeItem): boolean {
    if (!this.bounds.intersectsBox(item.box)) return false;

    if (this.children.length === 0 && this.items.length < this.maxItemsPerNode) {
      this.items.push(item);
      return true;
    }

    if (this.depth < this.maxDepth) {
      if (this.children.length === 0) {
        this.subdivide();
      }

      let insertedInChild = false;
      for (const child of this.children) {
        if (child.insert(item)) {
          insertedInChild = true;
        }
      }
      if (insertedInChild) return true;
    }

    this.items.push(item);
    return true;
  }

  getIntersectingItems(frustum: THREE.Frustum, result: Set<OctreeItem>): void {
    if (!frustum.intersectsBox(this.bounds)) return;

    for (const item of this.items) {
      if (frustum.intersectsBox(item.box)) {
        result.add(item);
      }
    }

    for (const child of this.children) {
      child.getIntersectingItems(frustum, result);
    }
  }
}
