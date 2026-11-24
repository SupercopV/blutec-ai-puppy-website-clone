import React, { useEffect, useState, useRef } from 'react';
import PupBuddy from './PupBuddy';

export default function PupRunner() {
  const [active, setActive] = useState(false);
  const [actorState, setActorState] = useState({
    x: 0,
    y: 0,
    pose: 'peek',
    facing: 'right',
    isRunning: false,
    behind: true,
    bubble: ''
  });
  const [pawPrints, setPawPrints] = useState([]);

  const stopsRef = useRef([]);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);
  const animFrame = useRef(null);
  const lastPrintTime = useRef(0);

  // Update stop positions on resize, font loading, or DOM changes
  const updateStops = () => {
    const stopEls = document.querySelectorAll('.pup-stop');
    if (!stopEls || stopEls.length === 0) return;

    const scrollY = window.scrollY;
    stopsRef.current = Array.from(stopEls).map((el, idx) => {
      const rect = el.getBoundingClientRect();
      const pose = el.dataset.pose || 'sit';
      const facing = el.dataset.facing || 'right';
      const act = el.dataset.act || '';
      const behind = el.dataset.behind === 'true';
      return {
        idx,
        el,
        x: rect.left + rect.width / 2,
        y: rect.top + scrollY + rect.height / 2,
        pose,
        facing,
        act,
        behind
      };
    });

    if (stopsRef.current.length > 0 && !active) {
      setActive(true);
    }
  };

  useEffect(() => {
    // Set document attribute so all static scene puppies are hidden on the home page
    document.documentElement.dataset.pup = 'active';

    updateStops();
    const timer1 = setTimeout(updateStops, 200);
    const timer2 = setTimeout(updateStops, 700);

    const onResize = () => updateStops();
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);

    const handleScroll = () => {
      if (animFrame.current) return;

      animFrame.current = requestAnimationFrame(() => {
        animFrame.current = null;
        const currentY = window.scrollY;
        const viewportCenter = currentY + window.innerHeight * 0.55;
        const stops = stopsRef.current;
        if (stops.length === 0) return;

        // Find closest stops
        let currentStop = stops[0];
        let nextStop = stops[0];
        let progress = 0;

        for (let i = 0; i < stops.length - 1; i++) {
          if (viewportCenter >= stops[i].y && viewportCenter <= stops[i + 1].y) {
            currentStop = stops[i];
            nextStop = stops[i + 1];
            const distance = nextStop.y - currentStop.y;
            progress = distance > 0 ? (viewportCenter - currentStop.y) / distance : 0;
            break;
          } else if (viewportCenter < stops[0].y) {
            currentStop = stops[0];
            nextStop = stops[0];
            progress = 0;
          } else if (viewportCenter > stops[stops.length - 1].y) {
            currentStop = stops[stops.length - 1];
            nextStop = stops[stops.length - 1];
            progress = 1;
          }
        }

        // Interpolate position
        const targetX = currentStop.x + (nextStop.x - currentStop.x) * progress;
        const targetY = currentStop.y + (nextStop.y - currentStop.y) * progress - currentY;

        const isMoving = Math.abs(currentY - lastScrollY.current) > 3;
        const movingDown = currentY > lastScrollY.current;
        lastScrollY.current = currentY;

        // Determine pose, facing, and behind-layer state
        let activePose = currentStop.pose;
        let activeFacing = currentStop.facing;
        let isBehind = false;
        let bubble = '';

        if (isMoving && currentStop !== nextStop && progress > 0.08 && progress < 0.92) {
          activePose = 'sit';
          activeFacing = targetX < window.innerWidth * 0.5 ? 'right' : 'left';
          isBehind = false;
        } else {
          // Docked at a stop
          if (progress <= 0.1) {
            activePose = currentStop.pose;
            activeFacing = currentStop.facing;
            isBehind = currentStop.behind;
            if (currentStop.idx === 0) bubble = 'peekaboo!';
          } else if (progress >= 0.9) {
            activePose = nextStop.pose;
            activeFacing = nextStop.facing;
            isBehind = nextStop.behind;
          }
        }

        setActorState({
          x: targetX,
          y: targetY,
          pose: activePose,
          facing: activeFacing,
          behind: isBehind,
          isRunning: isMoving && currentStop !== nextStop,
          bubble
        });

        // Add paw print trails when running
        const now = Date.now();
        if (isMoving && now - lastPrintTime.current > 260) {
          lastPrintTime.current = now;
          setPawPrints((prev) => [
            ...prev.slice(-18),
            {
              id: now,
              x: targetX - 8 + (Math.random() * 16 - 8),
              y: currentY + targetY + 50,
              angle: movingDown ? 15 : -15
            }
          ]);
        }

        // Reset running state after scroll stops
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          setActorState((prev) => ({
            ...prev,
            isRunning: false
          }));
        }, 150);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Listen for custom cues
    const handleCue = (e) => {
      if (e.detail?.say) {
        setActorState((prev) => ({ ...prev, bubble: e.detail.say }));
        setTimeout(() => {
          setActorState((prev) => ({ ...prev, bubble: '' }));
        }, (e.detail.secs || 1.5) * 1000);
      }
    };
    window.addEventListener('pup:cue', handleCue);

    return () => {
      delete document.documentElement.dataset.pup;
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(scrollTimeout.current);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pup:cue', handleCue);
    };
  }, [active]);

  const handlePupClick = () => {
    const reactions = ['woof!', '❤️', '🐾', 'yip!'];
    const randomSay = reactions[Math.floor(Math.random() * reactions.length)];
    setActorState((prev) => ({ ...prev, bubble: randomSay }));
    setTimeout(() => {
      setActorState((prev) => ({ ...prev, bubble: '' }));
    }, 1800);
  };

  return (
    <>
      {/* Paw prints trail left on the page */}
      <div className="pup-prints pointer-events-none" aria-hidden="true">
        {pawPrints.map((p) => (
          <svg
            key={p.id}
            viewBox="0 0 64 64"
            className="absolute transition-opacity duration-1000 ease-out"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: '18px',
              height: '18px',
              fill: 'var(--color-toffee)',
              opacity: 0.35,
              transform: `translate(-50%, -50%) rotate(${p.angle}deg)`
            }}
          >
            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
          </svg>
        ))}
      </div>

      {/* Single Floating Mascot Actor Layer */}
      {active && (
        <div
          className="pup-layer pointer-events-none"
          data-front={actorState.behind ? 'false' : 'true'}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: actorState.behind ? 15 : 35,
            contain: 'layout paint style',
            overflow: 'hidden'
          }}
        >
          <div
            className="pup-actor pointer-events-auto cursor-pointer"
            onClick={handlePupClick}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translate3d(${actorState.x - 75}px, ${actorState.y - 70}px, 0)`,
              transition: actorState.isRunning ? 'none' : 'transform 0.4s var(--ease-pounce)',
              willChange: 'transform'
            }}
          >
            <div
              className={`pup-actor__body ${actorState.isRunning ? 'animate-bounce' : ''}`}
              style={{ width: '150px', height: '120px' }}
            >
              <PupBuddy
                pose={actorState.pose}
                facing={actorState.facing}
                className="w-full h-full"
              />
            </div>

            {/* Speech bubble */}
            <span
              className="pup-bubble-at"
              style={{
                position: 'absolute',
                top: '-18px',
                left: actorState.facing === 'left' ? '15px' : '90px'
              }}
            >
              <span
                className="pup-bubble"
                data-show={actorState.bubble ? 'true' : 'false'}
              >
                {actorState.bubble}
              </span>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
