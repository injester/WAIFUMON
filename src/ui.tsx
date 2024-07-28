import { ReactEcs, ReactEcsRenderer, UiEntity, Button } from '@dcl/sdk/react-ecs';
import { spawnPet } from './factory';

// Load images
const btnImage = 'assets/ui/btn.png';
const btn2Image = 'assets/ui/btn2.png';

export function main() {
  setupUi();
}

let pet = false;

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent);
}

const uiComponent = () => (
  <UiEntity
  uiTransform={{
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    positionType: 'absolute',
  }}
  >
    {!pet && (
      <Button
        uiTransform={{
          width: '194px',
          height: '56px',
          positionType: 'absolute',
          position: {
            bottom: 10,
            right: 10,},
        }}
        value=""
        onMouseDown={() => {
          spawnPet(0, 0, 0, true);
          pet = true;
        }}
        uiBackground={{
          texture: { src: btnImage }
        }}
      />
    )}
    {pet && (
      <Button
        uiTransform={{
          width: '194px',
          height: '56px',
          positionType: 'absolute',
          position: {
          bottom: 10,
          right: 10,},
        }}
        value=""
        onMouseDown={() => {
          pet = false;
          spawnPet(0, 0, 0, false);
        }}
        uiBackground={{
          texture: { src: btn2Image }
        }}
      />
    )}
  </UiEntity>
);

setupUi();
