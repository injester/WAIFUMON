import {
  Entity,
  engine,
  Transform,
  GltfContainer,
  AvatarAnchorPointType,
  AvatarAttach,
  Tween,
  TweenSequence,
  TweenLoop,
  EasingFunction
} from '@dcl/sdk/ecs';
import { Vector3 } from '@dcl/ecs-math';

let filePath = 'models/1.glb';
let fairy: Entity | null = null;

export function spawnPet(x: number, y: number, z: number, visibility: boolean): void {
  if (visibility && !fairy) {
    // Create parent entity
    const parentEntity = engine.addEntity();

    // Attach parent entity to player
    AvatarAttach.create(parentEntity, {
      anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG,
    });

    // Create the fairy entity
    fairy = engine.addEntity();
    GltfContainer.create(fairy, {
      src: filePath,
    });

    Transform.create(fairy, {
      scale: Vector3.create(2, 2, 2),
      position: Vector3.create(2, -2.0, -1),
      parent: parentEntity,
    });

    // Tween animation for the fairy entity

    Tween.create(fairy, {
      duration: 1400,
      easingFunction: EasingFunction.EF_EASESINE,
      currentTime: 0,
      playing: true,
      mode: Tween.Mode.Move({
        start: Vector3.create(0.4, -4.5, -0.6),
        end: Vector3.create(0.6, -3.8, -0.8),
      }),
    })
      

    // Tween sequence to loop the animation
    TweenSequence.create(fairy, { sequence: [], loop: TweenLoop.TL_YOYO });

  } else if (!visibility && fairy) {
    // Remove the fairy entity
    engine.removeEntity(fairy);
    fairy = null;
  }
}
