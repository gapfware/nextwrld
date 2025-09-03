import { RESPONSIVE_WIDTH } from './config.js';

gsap.registerPlugin(ScrollTrigger);

gsap.to('.reveal-up', {
    opacity: 0,
    y: '100%',
});

gsap.to('#dashboard', {
    boxShadow: '0px 15px 25px -5px #7e22ceaa',
    duration: 0.3,
    scrollTrigger: {
        trigger: '#hero-section',
        start: '60% 60%',
        end: '80% 80%',
    }
});

gsap.to('#dashboard', {
    scale: 1,
    translateY: 0,
    rotateX: '0deg',
    scrollTrigger: {
        trigger: '#hero-section',
        start: window.innerWidth > RESPONSIVE_WIDTH ? 'top 95%' : 'top 70%',
        end: 'bottom bottom',
        scrub: 1,
    }
});

const sections = gsap.utils.toArray('section');

sections.forEach((sec) => {
    const revealUptimeline = gsap.timeline({paused: true, 
                                            scrollTrigger: {
                                                            trigger: sec,
                                                            start: '10% 80%',
                                                            end: '20% 90%',
                                                        }});
    revealUptimeline.to(sec.querySelectorAll('.reveal-up'), {
        opacity: 1,
        duration: 0.8,
        y: '0%',
        stagger: 0.2,
    });
});
