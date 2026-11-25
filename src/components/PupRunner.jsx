import React, { useEffect, useRef, useCallback } from 'react';
import PupBuddy from './PupBuddy';
import {
  ANCHOR,
  scanStops,
  evaluatePosition,
  updateScreenStops,
  getSafeRect,
  PupController,
  BASE_POSES
} from './pupMotionEngine';

const PAW_PATH =
  "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

const checkMobile = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 767px), (pointer: coarse) and (max-height: 519px)').matches;

export default function PupRunner() {
  const layerRef = useRef(null);
  const actorRef = useRef(null);
  const bodyRef = useRef(null);
  const svgRef = useRef(null);
  const bubbleRef = useRef(null);
  const bubbleAtRef = useRef(null);
  const printsRef = useRef(null);
  const controllerRef = useRef(null);

  const bubbleTimer = useRef(null);
  const lookTargetRef = useRef(null);

  const say = useCallback((text, duration = 1.6) => {
    const bubbleEl = bubbleRef.current;
    const bubbleAtEl = bubbleAtRef.current;
    const controller = controllerRef.current;
    if (!bubbleEl || !bubbleAtEl) return;

    bubbleEl.textContent = text;
    bubbleEl.dataset.show = 'true';

    if (controller) {
      const scale = controller.svg?.getBoundingClientRect()?.width
        ? controller.svg.getBoundingClientRect().width / 300
        : 1;
      const bx = (controller.facingDir > 0 ? 214 : 300 - 214) * scale;
      bubbleAtEl.style.transform = `translate(${bx.toFixed(1)}px, ${(30 * scale).toFixed(1)}px)`;
    }

    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => {
      if (bubbleRef.current) {
        bubbleRef.current.dataset.show = 'false';
      }
    }, duration * 1000);
  }, []);

  const handlePupClick = () => {
    const controller = controllerRef.current;
    if (!controller) return;

    const time = performance.now() / 1000;
    const barks = ['woof!', 'wheee!', 'boing!', 'yip!', 'hello!'];
    const pick = barks[Math.floor(Math.random() * barks.length)];

    controller.hop(1.3);
    controller.woof(time);
    say(pick, 1.4);
  };

  const handlePointerEnter = () => {
    const controller = controllerRef.current;
    if (controller) {
      controller.petting(true);
      controller.wag(1);
    }
  };

  const handlePointerLeave = () => {
    const controller = controllerRef.current;
    if (controller) {
      controller.petting(false);
      controller.wag(0.7);
    }
  };

  useEffect(() => {
    const layerEl = layerRef.current;
    const actorEl = actorRef.current;
    const bodyEl = bodyRef.current;
    const svgEl = svgRef.current;
    const printsEl = printsRef.current;
    if (!layerEl || !actorEl || !bodyEl || !svgEl || !printsEl) return;

    const isMobile = checkMobile();
    let data = scanStops(isMobile);
    if (!data || data.stops.length < 2) return;

    // Set document pup state: 'lane' on mobile (<768px), 'live' on desktop
    document.documentElement.dataset.pup = data.lane ? 'lane' : 'live';

    const pawPool = Array.from(printsEl.querySelectorAll('svg'));
    let pawIndex = 0;
    let lastStepStop = -1;
    let lastStepIndex = -1;

    const initialMeta = data.meta[0];
    const controller = new PupController(svgEl, initialMeta.pose, initialMeta.facing);
    controllerRef.current = controller;

    let animFrame = null;
    let lastTime = performance.now() / 1000;
    let lastScrollY = window.scrollY;
    let lastScrollMoveTime = lastTime;
    let lastDockedIndex = -1;
    let lastPos = null;
    let lastHallX = null;

    // Initial positioning
    updateScreenStops(data);
    const initialSafe = getSafeRect(data);
    const initialPos = evaluatePosition(data.stops, data.holds, window.scrollY, initialSafe, data.blend);
    const initFromStop = data.stops[initialPos.k];
    const initToStop = initialPos.t > 0 ? data.stops[initialPos.k + 1] : initFromStop;
    const initIsLaneScreen = Boolean(
      data.lane &&
      initFromStop?.track?.kind === 'screen' &&
      initToStop?.track?.kind === 'screen'
    );
    layerEl.dataset.anchor = initIsLaneScreen ? 'bottom' : 'top';
    const initEv = initIsLaneScreen ? layerEl.getBoundingClientRect().top : 0;

    actorEl.style.transform = `translate3d(${(initialPos.x - ANCHOR.x * initialPos.s).toFixed(2)}px, ${(initialPos.y - ANCHOR.y * initialPos.s - initEv).toFixed(2)}px, 0)`;
    bodyEl.style.transform = `scale(${initialPos.s.toFixed(4)})`;
    layerEl.dataset.front = String(initialPos.front);
    layerEl.hidden = false;

    // Greeting peekaboo on landing at the top of the page
    if (window.scrollY < 60 && initialMeta.act === 'peekaboo') {
      const introTimer = setTimeout(() => {
        controller.jolt(1.2);
        say('peekaboo!', 1.6);
      }, 700);

      var clearIntroTimer = () => clearTimeout(introTimer);
    }

    // Main 60fps physics & motion loop
    const tick = () => {
      animFrame = requestAnimationFrame(tick);
      const now = performance.now() / 1000;
      const dt = Math.min(0.05, now - lastTime);
      lastTime = now;

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (Math.abs(scrollDelta) > 0.5) {
        lastScrollMoveTime = now;
      }

      updateScreenStops(data);
      const safe = getSafeRect(data);
      const pos = evaluatePosition(data.stops, data.holds, currentScrollY, safe, data.blend);
      const isDocked = pos.t === 0;
      const stopIdx = pos.k;
      const mainTop = data.mainTop || document.querySelector('main')?.offsetTop || 0;

      const fromStop = data.stops[pos.k];
      const toStop = pos.t > 0 ? data.stops[pos.k + 1] : fromStop;
      const isLaneScreen = Boolean(
        data.lane &&
        fromStop?.track?.kind === 'screen' &&
        toStop?.track?.kind === 'screen'
      );

      layerEl.dataset.anchor = isLaneScreen ? 'bottom' : 'top';
      const ev = isLaneScreen ? layerEl.getBoundingClientRect().top : 0;

      if (isDocked) {
        if (lastDockedIndex !== stopIdx) {
          lastDockedIndex = stopIdx;
          const currentMeta = data.meta[stopIdx];
          controller.reset();
          controller.setPose(currentMeta.pose);
          controller.face(currentMeta.facing, 0.14);
          controller.stride(0);
          controller.wag(currentMeta.act === 'basket' ? 0.3 : 0.7);

          if (currentMeta.act === 'basket') {
            controller.jolt(0.4);
          }
        }

        const currentMeta = data.meta[stopIdx];

        // Scene 2 Meet Showroom treadmill walking
        if (currentMeta.act === 'treadmill' || currentMeta.trackEl) {
          const trackEl = currentMeta.trackEl || document.querySelector('.tp-meet__track');
          if (trackEl) {
            const trackLeft = trackEl.getBoundingClientRect().left;
            const diffX = lastHallX === null ? 0 : trackLeft - lastHallX;
            lastHallX = trackLeft;

            controller.walkedTo(-trackLeft / Math.max(0.05, pos.s));
            if (Math.abs(diffX) > 0.15) {
              controller.setPose('walk');
              controller.stride(1);
              controller.face(diffX < 0 ? 1 : -1, 0.16);
            } else {
              controller.setPose('stand');
              controller.stride(0);
            }
          }
        } else if (currentMeta.act === 'tilt') {
          // Scene 7 Questions curious head tilt
          const tiltSin = Math.sin(0.9 * now);
          controller.cock(tiltSin > 0.35 ? 13 : (tiltSin < -0.35 ? -10 : 0));
        }
      } else {
        // Traveling along cubic bezier path between stops
        lastDockedIndex = -1;
        lastHallX = null;

        if (pos.airborne) {
          controller.setPose('hop');
          controller.stride(0);
        } else {
          controller.setPose('walk');
          controller.stride(1);
        }

        controller.walkedTo(pos.walked / Math.max(0.05, pos.s));

        // Turn head & body towards travel heading
        if (lastPos) {
          const dx = pos.x - lastPos.x;
          const dy = pos.y - lastPos.y;
          if (Math.abs(dx) > 0.6 && Math.abs(dx) > 0.35 * Math.abs(dy)) {
            controller.face(dx > 0 ? 1 : -1, 0.16);
          }
        }

        // Paw print stamping along the ground (desktop mode only)
        if (!data.lane) {
          const step = Math.floor(pos.walked / (34 * pos.s));
          if (pos.k === lastStepStop && step !== lastStepIndex && !pos.airborne && lastPos && pawPool.length > 0) {
            const n = 1 & step;
            const legX = n ? 186 : 110;
            const r = pos.x - ANCHOR.x * pos.s;
            const i = pos.y - ANCHOR.y * pos.s;
            const footX = r + (controller.facingDir > 0 ? legX : 300 - legX) * pos.s;
            const footY = i + 226 * pos.s + currentScrollY - mainTop + (n ? -4 : 4) * pos.s;
            const angle = Math.atan2(pos.y - lastPos.y + scrollDelta, pos.x - lastPos.x) + Math.PI / 2;
            const size = 14 * Math.max(0.75, 1.5 * pos.s);

            const pawSvg = pawPool[pawIndex % pawPool.length];
            pawIndex++;

            pawSvg.style.transform = `translate(${(footX - size / 2).toFixed(1)}px, ${(footY - size / 2).toFixed(1)}px) rotate(${angle.toFixed(3)}rad)`;
            pawSvg.style.width = pawSvg.style.height = `${size.toFixed(1)}px`;
            pawSvg.animate(
              [
                { opacity: 0 },
                { opacity: 0.45, offset: 0.08 },
                { opacity: 0.45, offset: 0.5 },
                { opacity: 0 }
              ],
              { duration: 2600, easing: 'ease-out' }
            );
          }
          lastStepStop = pos.k;
          lastStepIndex = step;
        }
      }

      lastPos = { x: pos.x, y: pos.y };

      // Update Scene attributes
      data.meta.forEach((m, idx) => {
        if (m.scene) {
          m.scene.dataset.here = String(isDocked && idx === stopIdx);
          m.scene.dataset.visited = String(idx <= stopIdx || (idx === stopIdx + 1 && pos.t > 0.92));
        }
      });

      // Update Actor DOM position
      actorEl.style.transform = `translate3d(${(pos.x - ANCHOR.x * pos.s).toFixed(2)}px, ${(pos.y - ANCHOR.y * pos.s - ev).toFixed(2)}px, 0)`;
      bodyEl.style.transform = `scale(${pos.s.toFixed(4)})`;
      layerEl.dataset.front = String(pos.front);
      actorEl.dataset.holding = String(isDocked);

      // Bubble position if visible
      const bubbleEl = bubbleRef.current;
      const bubbleAtEl = bubbleAtRef.current;
      if (bubbleEl && bubbleAtEl && bubbleEl.dataset.show === 'true') {
        const bx = (controller.facingDir > 0 ? 214 : 300 - 214) * pos.s;
        bubbleAtEl.style.transform = `translate(${bx.toFixed(1)}px, ${(30 * pos.s).toFixed(1)}px)`;
      }

      // Cursor gaze tracking
      const look = lookTargetRef.current;
      if (look && now - look.t < 2.5) {
        controller.lookAt(look);
      } else {
        controller.lookAt(null);
      }

      // Tick skeletal springs, ear bounce, blinking, tail wag
      controller.tick(dt, now);
    };

    animFrame = requestAnimationFrame(tick);

    // Re-scan stops on resize or document layout change
    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const isMob = checkMobile();
        const nextData = scanStops(isMob);
        if (nextData && nextData.stops.length >= 2) {
          data = nextData;
          document.documentElement.dataset.pup = data.lane ? 'lane' : 'live';
        }
      }, 120);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.body);

    // Track mouse cursor for live puppy gaze
    const handlePointerMove = (e) => {
      lookTargetRef.current = {
        x: e.clientX,
        y: e.clientY,
        t: performance.now() / 1000
      };
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Custom speech cue event listener
    const handleCue = (e) => {
      if (e.detail?.say) {
        say(e.detail.say, e.detail.secs || 1.6);
      }
    };
    window.addEventListener('pup:cue', handleCue);

    return () => {
      delete document.documentElement.dataset.pup;
      if (clearIntroTimer) clearIntroTimer();
      clearTimeout(resizeTimer);
      clearTimeout(bubbleTimer.current);
      if (animFrame) cancelAnimationFrame(animFrame);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pup:cue', handleCue);
    };
  }, [say]);

  return (
    <>
      {/* 24 Paw prints pre-rendered pool */}
      <div ref={printsRef} aria-hidden="true" className="pup-prints">
        {Array.from({ length: 24 }, (_, i) => (
          <svg key={i} viewBox="0 0 64 64">
            <path d={PAW_PATH} />
          </svg>
        ))}
      </div>

      {/* Single Live Mascot Actor Layer */}
      <div
        ref={layerRef}
        aria-hidden="true"
        className="pup-layer"
        data-front="true"
        hidden
      >
        <div
          ref={actorRef}
          className="pup-actor"
          onClick={handlePupClick}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          <div ref={bodyRef} className="pup-actor__body">
            <PupBuddy svgRef={svgRef} pose="peek" />
          </div>

          <span ref={bubbleAtRef} className="pup-bubble-at">
            <span ref={bubbleRef} className="pup-bubble" data-show="false" />
          </span>
        </div>
      </div>
    </>
  );
}
