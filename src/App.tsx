import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const smokeLayerRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const particle1Ref = useRef<HTMLDivElement>(null)
  const particle2Ref = useRef<HTMLDivElement>(null)
  const particle3Ref = useRef<HTMLDivElement>(null)
  const particle4Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smoke particles drift upward idly
      gsap.to(particle1Ref.current, {
        y: -60, x: 30, opacity: 0.6, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut',
      })
      gsap.to(particle2Ref.current, {
        y: -80, x: -40, opacity: 0.5, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1,
      })
      gsap.to(particle3Ref.current, {
        y: -50, x: 20, opacity: 0.4, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2,
      })
      gsap.to(particle4Ref.current, {
        y: -70, x: -25, opacity: 0.55, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5,
      })

      // Main scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1.2,
          pin: true,
        },
      })

      // Phase 1: smoke dissipates, hero text fades out
      tl.to(smokeLayerRef.current, {
        opacity: 0,
        filter: 'blur(60px)',
        scale: 1.15,
        duration: 1,
        ease: 'power2.in',
      })
      tl.to(heroTextRef.current, {
        opacity: 0,
        y: -40,
        filter: 'blur(8px)',
        duration: 0.6,
        ease: 'power2.in',
      }, '<0.2')

      // Phase 2: form materializes
      tl.fromTo(formRef.current,
        { opacity: 0, filter: 'blur(20px)', y: 30, scale: 0.97 },
        { opacity: 1, filter: 'blur(0px)', y: 0, scale: 1, duration: 1.2, ease: 'power2.out' },
        '-=0.1'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Scroll spacer so ScrollTrigger has room */}
      <div style={{ height: '300vh' }} className="smoke-container">
        <div
          ref={containerRef}
          className="fixed inset-0 w-screen overflow-hidden smoke-container"
          style={{ height: '100vh' }}
        >
          {/* Background gradient — warm paper */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f7f4ef] via-[#ede9e2] to-[#e4dfd7]" />

          {/* Smoke particles */}
          <div
            ref={particle1Ref}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 480, height: 480,
              top: '10%', left: '5%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(240,237,232,0) 70%)',
              filter: 'blur(40px)',
              opacity: 0.7,
            }}
          />
          <div
            ref={particle2Ref}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 600, height: 600,
              bottom: '5%', right: '8%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(240,237,232,0) 70%)',
              filter: 'blur(50px)',
              opacity: 0.65,
            }}
          />
          <div
            ref={particle3Ref}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 380, height: 380,
              top: '40%', right: '20%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.75) 0%, rgba(240,237,232,0) 70%)',
              filter: 'blur(35px)',
              opacity: 0.6,
            }}
          />
          <div
            ref={particle4Ref}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 520, height: 520,
              top: '20%', left: '35%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(240,237,232,0) 68%)',
              filter: 'blur(45px)',
              opacity: 0.55,
            }}
          />

          {/* Smoke overlay layer (fades as scroll progresses) */}
          <div
            ref={smokeLayerRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 70% at 50% 45%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 55%, transparent 100%)',
            }}
          />

          {/* Hero text */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex items-center justify-center px-16"
            style={{ zIndex: 10 }}
          >
            <h1
              className="text-center text-black leading-tight select-none"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 6vw, 6rem)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                maxWidth: '18ch',
                textShadow: '0 2px 24px rgba(0,0,0,0.08)',
              }}
            >
              Você conhece a personalidade da sua empresa?
            </h1>
          </div>

          {/* Ghostly form */}
          <div
            ref={formRef}
            className="absolute inset-0 flex items-center justify-center px-8"
            style={{ zIndex: 20, opacity: 0, filter: 'blur(20px)' }}
          >
            <div
              className="w-full max-w-lg"
              style={{
                background: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(24px) saturate(140%)',
                WebkitBackdropFilter: 'blur(24px) saturate(140%)',
                border: '1px solid rgba(255,255,255,0.55)',
                borderRadius: '1.5rem',
                boxShadow: '0 8px 64px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.8) inset',
                padding: '3rem 3.5rem',
              }}
            >
              <p
                className="text-black/40 uppercase tracking-[0.22em] text-xs mb-2"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
              >
                Identidade corporativa
              </p>
              <h2
                className="text-black mb-8 leading-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.9rem',
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                }}
              >
                Conheça sua essência
              </h2>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-black/50 text-xs uppercase tracking-widest"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                  >
                    Nome da Empresa
                  </label>
                  <input
                    type="text"
                    placeholder="Ex.: Acme Soluções"
                    className="w-full outline-none text-black placeholder-black/25 transition-all duration-300"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      fontWeight: 400,
                      background: 'rgba(255,255,255,0.35)',
                      border: '1px solid rgba(0,0,0,0.12)',
                      borderRadius: '0.75rem',
                      padding: '0.85rem 1.1rem',
                      backdropFilter: 'blur(8px)',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.6)'
                      e.currentTarget.style.border = '1px solid rgba(0,0,0,0.25)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.05)'
                    }}
                    onBlur={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.35)'
                      e.currentTarget.style.border = '1px solid rgba(0,0,0,0.12)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-black/50 text-xs uppercase tracking-widest"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                  >
                    CNPJ
                  </label>
                  <input
                    type="text"
                    placeholder="00.000.000/0000-00"
                    maxLength={18}
                    className="w-full outline-none text-black placeholder-black/25 transition-all duration-300"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      fontWeight: 400,
                      background: 'rgba(255,255,255,0.35)',
                      border: '1px solid rgba(0,0,0,0.12)',
                      borderRadius: '0.75rem',
                      padding: '0.85rem 1.1rem',
                      backdropFilter: 'blur(8px)',
                      letterSpacing: '0.04em',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.6)'
                      e.currentTarget.style.border = '1px solid rgba(0,0,0,0.25)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.05)'
                    }}
                    onBlur={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.35)'
                      e.currentTarget.style.border = '1px solid rgba(0,0,0,0.12)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    onChange={e => {
                      const raw = e.target.value.replace(/\D/g, '').slice(0, 14)
                      let formatted = raw
                      if (raw.length > 2) formatted = raw.slice(0,2) + '.' + raw.slice(2)
                      if (raw.length > 5) formatted = formatted.slice(0,6) + '.' + formatted.slice(6)
                      if (raw.length > 8) formatted = formatted.slice(0,10) + '/' + formatted.slice(10)
                      if (raw.length > 12) formatted = formatted.slice(0,15) + '-' + formatted.slice(15)
                      e.target.value = formatted
                    }}
                  />
                </div>

                <button
                  className="w-full mt-2 text-white transition-all duration-300 active:scale-[0.98]"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    letterSpacing: '0.03em',
                    background: 'rgba(0,0,0,0.85)',
                    border: '1px solid rgba(0,0,0,0.9)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(0,0,0,1)'
                    e.currentTarget.style.boxShadow = '0 6px 32px rgba(0,0,0,0.28)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(0,0,0,0.85)'
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)'
                  }}
                >
                  Conheça agora
                </button>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ zIndex: 30 }}
            ref={el => {
              if (el) {
                gsap.to(el, { opacity: 0, y: 8, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' })
              }
            }}
          >
            <span className="text-black/30 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-body)' }}>
              Role para descobrir
            </span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect x="0.75" y="0.75" width="14.5" height="22.5" rx="7.25" stroke="black" strokeOpacity="0.2" strokeWidth="1.5"/>
              <circle cx="8" cy="7" r="2" fill="black" fillOpacity="0.25"/>
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
