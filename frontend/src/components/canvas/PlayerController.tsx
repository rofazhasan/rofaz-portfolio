import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody, CapsuleCollider, RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { useGameStore } from '@/store/useGameStore';
import { audioManager } from '@/audio/AudioManager';

interface PlayerControllerProps {
  initialPos?: [number, number, number];
}

export const PlayerController: React.FC<PlayerControllerProps> = ({
  initialPos = [0, 1, 35],
}) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const avatarGroupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Group>(null);
  const backpackRef = useRef<THREE.Mesh>(null);

  const { camera } = useThree();

  // Store bindings
  const setPlayerPos = useGameStore((s) => s.setPlayerPos);
  const setPlayerRotation = useGameStore((s) => s.setPlayerRotation);
  const setPlayerState = useGameStore((s) => s.setPlayerState);
  const teleportTarget = useGameStore((s) => s.teleportTarget);
  const clearTeleport = useGameStore((s) => s.clearTeleport);
  const activeModal = useGameStore((s) => s.activeModal);
  const openModal = useGameStore((s) => s.openModal);

  // Key states & camera orbit parameters
  const keys = useRef<{ [key: string]: boolean }>({});
  const mouseLook = useRef({ x: 0, y: 0, distance: 8, height: 3.5 });
  const isGroundedRef = useRef(true);
  const footstepTimer = useRef(0);

  // Movement speed constants
  const walkSpeed = 7;
  const runSpeed = 12;
  const jumpForce = 8;

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModal) return; // Disable movement during modal overlays
      keys.current[e.code] = true;

      // Jump
      if (e.code === 'Space' && isGroundedRef.current && rigidBodyRef.current) {
        rigidBodyRef.current.applyImpulse({ x: 0, y: jumpForce, z: 0 }, true);
        isGroundedRef.current = false;
        audioManager.playJump();
        useGameStore.getState().setPlayerState('jumping');
      }

      // Interact Key 'E'
      if (e.code === 'KeyE') {
        audioManager.playUIClick();
        useGameStore.getState().showToast('Interaction Activated', 'Searching nearby interactive exhibits...', 'info');
      }

      // Emotes (1: Wave, 2: Think, 3: Celebrate)
      if (e.code === 'Digit1') {
        useGameStore.getState().setPlayerState('waving');
        audioManager.playUIClick();
      }
      if (e.code === 'Digit2') {
        useGameStore.getState().setPlayerState('thinking');
        audioManager.playUIClick();
      }
      if (e.code === 'Digit3') {
        useGameStore.getState().setPlayerState('celebrating');
        audioManager.playAchievement();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };

    const handleWheel = (e: WheelEvent) => {
      mouseLook.current.distance = THREE.MathUtils.clamp(
        mouseLook.current.distance + e.deltaY * 0.005,
        4,
        18
      );
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeModal, openModal]);

  // Mouse Look Orbit
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement) {
        mouseLook.current.x -= e.movementX * 0.003;
        mouseLook.current.y = THREE.MathUtils.clamp(
          mouseLook.current.y - e.movementY * 0.003,
          -0.4,
          0.8
        );
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle Teleportation
  useEffect(() => {
    if (teleportTarget && rigidBodyRef.current) {
      rigidBodyRef.current.setTranslation(
        { x: teleportTarget[0], y: teleportTarget[1] + 1, z: teleportTarget[2] },
        true
      );
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      clearTeleport();
    }
  }, [teleportTarget, clearTeleport]);

  // Animation & Physics Frame Loop
  useFrame((state, delta) => {
    if (!rigidBodyRef.current) return;

    const currentPos = rigidBodyRef.current.translation();
    setPlayerPos([currentPos.x, currentPos.y, currentPos.z]);

    // Ground check via linvel y velocity and height
    const linvel = rigidBodyRef.current.linvel();
    const grounded = Math.abs(linvel.y) < 0.25 || currentPos.y <= 1.2;
    isGroundedRef.current = grounded;

    // Movement Direction Calculation
    const moveDir = new THREE.Vector3(0, 0, 0);
    const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      mouseLook.current.x
    );
    const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      mouseLook.current.x
    );

    if (keys.current['KeyW'] || keys.current['ArrowUp']) moveDir.add(forward);
    if (keys.current['KeyS'] || keys.current['ArrowDown']) moveDir.sub(forward);
    if (keys.current['KeyA'] || keys.current['ArrowLeft']) moveDir.sub(right);
    if (keys.current['KeyD'] || keys.current['ArrowRight']) moveDir.add(right);

    const isMoving = moveDir.lengthSq() > 0.01;
    const isSprinting = keys.current['ShiftLeft'] || keys.current['ShiftRight'];
    const isCrouching = keys.current['KeyC'];

    let speed = isSprinting ? runSpeed : walkSpeed;
    if (isCrouching) speed *= 0.5;

    // Apply linvel velocity
    if (isMoving) {
      moveDir.normalize();
      rigidBodyRef.current.setLinvel(
        { x: moveDir.x * speed, y: linvel.y, z: moveDir.z * speed },
        true
      );

      // Rotate avatar to face movement direction
      const angle = Math.atan2(moveDir.x, moveDir.z);
      if (avatarGroupRef.current) {
        avatarGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          avatarGroupRef.current.rotation.y,
          angle,
          delta * 12
        );
        setPlayerRotation(angle);
      }

      // Footstep sound & limb swing animation
      footstepTimer.current += delta * (isSprinting ? 15 : 9);
      const limbSwing = Math.sin(footstepTimer.current) * 0.65;
      if (leftLegRef.current) leftLegRef.current.rotation.x = limbSwing;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -limbSwing;
      if (leftArmRef.current) leftArmRef.current.rotation.x = -limbSwing * 0.7;
      if (rightArmRef.current) rightArmRef.current.rotation.x = limbSwing * 0.7;

      if (Math.sin(footstepTimer.current) > 0.95) {
        audioManager.playFootstep(currentPos.y > 2 ? 'wood' : 'concrete');
      }

      setPlayerState(isSprinting ? 'running' : 'walking');
    } else {
      // Idle state friction dampen
      rigidBodyRef.current.setLinvel({ x: linvel.x * 0.8, y: linvel.y, z: linvel.z * 0.8 }, true);

      // Reset limbs to idle breathing
      const breath = Math.sin(state.clock.elapsedTime * 2.2) * 0.05;
      if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, delta * 10);
      if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, delta * 10);
      if (leftArmRef.current) leftArmRef.current.rotation.x = breath;
      if (rightArmRef.current) rightArmRef.current.rotation.x = -breath;
      if (headRef.current) headRef.current.position.y = 1.35 + breath * 0.3;

      if (grounded) setPlayerState('idle');
    }

    // Third-person Follow Camera Math
    const idealCamOffset = new THREE.Vector3(
      Math.sin(mouseLook.current.x) * mouseLook.current.distance,
      mouseLook.current.height + Math.sin(mouseLook.current.y) * 3,
      Math.cos(mouseLook.current.x) * mouseLook.current.distance
    );

    // Camera sway while sprinting
    if (isSprinting && isMoving) {
      idealCamOffset.x += Math.sin(state.clock.elapsedTime * 16) * 0.06;
      idealCamOffset.y += Math.cos(state.clock.elapsedTime * 16) * 0.06;
    }

    const camTarget = new THREE.Vector3(currentPos.x, currentPos.y + 1.6, currentPos.z);
    const desiredCamPos = camTarget.clone().add(idealCamOffset);

    // Smooth lerp camera
    camera.position.lerp(desiredCamPos, delta * 9);
    camera.lookAt(camTarget);
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      position={initialPos}
      enabledRotations={[false, false, false]}
      friction={0.2}
      restitution={0}
    >
      <CapsuleCollider args={[0.6, 0.4]} position={[0, 0.9, 0]} />

      {/* Stylized Character Mesh (Rafiu Avatar) */}
      <group ref={avatarGroupRef} position={[0, 0, 0]}>
        {/* Head */}
        <group ref={headRef} position={[0, 1.35, 0]}>
          {/* Main Head Box */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.42, 0.42, 0.42]} />
            <meshStandardMaterial color="#fcd34d" roughness={0.3} />
          </mesh>
          {/* Hair (Futuristic Pixar Cut) */}
          <mesh position={[0, 0.18, -0.02]} castShadow>
            <boxGeometry args={[0.46, 0.16, 0.46]} />
            <meshStandardMaterial color="#1e1b4b" roughness={0.5} />
          </mesh>
          {/* Eyes */}
          <mesh position={[0.1, 0.04, 0.22]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#0f172a" />
          </mesh>
          <mesh position={[-0.1, 0.04, 0.22]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#0f172a" />
          </mesh>
          {/* Glowing VR/Tech Glasses */}
          <mesh position={[0, 0.05, 0.22]}>
            <boxGeometry args={[0.32, 0.08, 0.04]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.8} />
          </mesh>
        </group>

        {/* Torso Hoodie */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.65, 0.32]} />
          <meshStandardMaterial color="#2563eb" roughness={0.4} />
        </mesh>

        {/* Backpack */}
        <mesh ref={backpackRef} position={[0, 0.78, -0.22]} castShadow>
          <boxGeometry args={[0.38, 0.45, 0.18]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </mesh>

        {/* Left Arm */}
        <mesh ref={leftArmRef} position={[-0.32, 0.75, 0]} castShadow>
          <boxGeometry args={[0.14, 0.55, 0.14]} />
          <meshStandardMaterial color="#1d4ed8" />
        </mesh>

        {/* Right Arm */}
        <mesh ref={rightArmRef} position={[0.32, 0.75, 0]} castShadow>
          <boxGeometry args={[0.14, 0.55, 0.14]} />
          <meshStandardMaterial color="#1d4ed8" />
        </mesh>

        {/* Left Leg */}
        <mesh ref={leftLegRef} position={[-0.14, 0.25, 0]} castShadow>
          <boxGeometry args={[0.16, 0.55, 0.16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>

        {/* Right Leg */}
        <mesh ref={rightLegRef} position={[0.14, 0.25, 0]} castShadow>
          <boxGeometry args={[0.16, 0.55, 0.16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>
    </RigidBody>
  );
};
