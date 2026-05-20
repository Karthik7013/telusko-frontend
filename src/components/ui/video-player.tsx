import { useCallback, useEffect, useRef, useState } from "react"
import {
  Play, Pause, RotateCcw, RotateCw,
  Volume2, Volume1, VolumeX, Maximize, Minimize, Loader2, AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

function formatTime(seconds: number) {
  if (!isFinite(seconds)) return "0:00"
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const ss = String(s).padStart(2, "0")
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${ss}`
  return `${m}:${ss}`
}

interface VideoPlayerProps {
  src?: string
  poster?: string
  className?: string
}

export function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isPiP, setIsPiP] = useState(false)

  const startHideTimer = useCallback(() => {
    clearTimeout(hideTimerRef.current)
    if (playing) {
      hideTimerRef.current = setTimeout(() => {
        if (!isDragging) setShowControls(false)
      }, 3000)
    }
  }, [playing, isDragging])

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true)
    startHideTimer()
  }, [startHideTimer])

  useEffect(() => {
    return () => clearTimeout(hideTimerRef.current)
  }, [])

  useEffect(() => {
    if (playing) startHideTimer()
    else setShowControls(true)
  }, [playing, startHideTimer])

   useEffect(() => {
     const el = containerRef.current
     if (!el) return
     const handler = () => setIsFullscreen(!!document.fullscreenElement)
     document.addEventListener("fullscreenchange", handler)
     return () => document.removeEventListener("fullscreenchange", handler)
   }, [])

   // Picture-in-Picture
   useEffect(() => {
     const video = videoRef.current
     if (!video) return

     const handleEnterPiP = () => setIsPiP(true)
     const handleLeavePiP = () => setIsPiP(false)

     video.addEventListener("enterpictureinpicture", handleEnterPiP)
     video.addEventListener("leavepictureinpicture", handleLeavePiP)

     return () => {
       video.removeEventListener("enterpictureinpicture", handleEnterPiP)
       video.removeEventListener("leavepictureinpicture", handleLeavePiP)
     }
   }, [])

    const togglePiP = useCallback(async () => {
      const video = videoRef.current
      if (!video) return

      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture()
          setIsPiP(false)
        } else if (video !== document.pictureInPictureElement) {
          await video.requestPictureInPicture()
          setIsPiP(true)
        }
      } catch (error) {
        console.error("Failed to toggle Picture-in-Picture:", error)
      }
    }, [])

   const togglePlay = useCallback(() => {
     const video = videoRef.current
     if (!video) return
     if (video.paused) {
       video.play()
       setPlaying(true)
       setHasPlayed(true)
     } else {
       video.pause()
       setPlaying(false)
     }
   }, [])

   const toggleFullscreen = useCallback(() => {
     const el = containerRef.current
     if (!el) return
     if (document.fullscreenElement) {
       document.exitFullscreen()
     } else {
       el.requestFullscreen()
     }
   }, [])

   const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
     const video = videoRef.current
     if (!video) return

     switch (e.key) {
       case " ":
         e.preventDefault()
         togglePlay()
         break
       case "ArrowLeft":
         e.preventDefault()
         video.currentTime = Math.max(0, video.currentTime - 5)
         break
       case "ArrowRight":
         e.preventDefault()
         video.currentTime = Math.min(video.duration || 0, video.currentTime + 5)
         break
       case "f":
       case "F":
         e.preventDefault()
         toggleFullscreen()
         break
       case "m":
       case "M":
         e.preventDefault()
         video.muted = !video.muted
         setMuted(video.muted)
         break
     }
   }, [togglePlay, toggleFullscreen])

  const seek = useCallback((seconds: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + seconds))
  }, [])

  const handleVolumeChange = useCallback((value: number) => {
    const video = videoRef.current
    if (!video) return
    video.volume = value
    video.muted = value === 0
    setVolume(value)
    setMuted(value === 0)
  }, [])

  const handleMuteToggle = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }, [])

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    video.currentTime = x * duration
  }, [duration])

  const handleProgressDrag = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const video = videoRef.current
    if (!video || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    video.currentTime = x * duration
  }, [isDragging, duration])

  useEffect(() => {
    if (!isDragging) return
    const handleUp = () => setIsDragging(false)
    window.addEventListener("mouseup", handleUp)
    return () => window.removeEventListener("mouseup", handleUp)
  }, [isDragging])

   const [buffered, setBuffered] = useState(0)
   const [progress, setProgress] = useState(0)

   useEffect(() => {
     const video = videoRef.current
     if (!video) return

     const updateBuffered = () => {
       if (video.buffered.length) {
         setBuffered(video.buffered.end(video.buffered.length - 1) / (video.duration || 1))
       } else {
         setBuffered(0)
       }
     }

     const updateProgress = () => {
       setProgress(duration > 0 ? currentTime / duration : 0)
     }

     video.addEventListener('progress', updateBuffered)
     video.addEventListener('timeupdate', updateProgress)

     // Initial update
     updateBuffered()
     updateProgress()

     return () => {
       video.removeEventListener('progress', updateBuffered)
       video.removeEventListener('timeupdate', updateProgress)
     }
   }, [currentTime, duration])

  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2

  return (
    <div
      ref={containerRef}
      className={cn("relative bg-black overflow-hidden select-none", className)}
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => playing && setShowControls(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="application"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        playsInline
        preload="metadata"
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
        onPlaying={() => { setIsLoading(false); setPlaying(true) }}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onError={() => setError("Unable to load video")}
        onEnded={() => { setPlaying(false); setShowControls(true) }}
        onClick={togglePlay}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
          <Loader2 className="size-10 text-white animate-spin" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 gap-2 pointer-events-none">
          <AlertCircle className="size-8 text-destructive" />
          <p className="text-sm text-white/80">{error}</p>
        </div>
      )}

      {!hasPlayed && !error && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer group/play"
          onClick={togglePlay}
        >
          <div className="size-14 md:size-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-200 group-hover/play:bg-primary/80 group-hover/play:scale-105">
            <Play className="size-6 md:size-7 text-white fill-white ml-0.5" />
          </div>
        </div>
      )}

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-8 pb-2 px-2 md:px-3 transition-opacity duration-300",
          showControls || !playing ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
         <div className="flex items-center gap-1 md:gap-1.5">
           <ControlButton onClick={togglePlay} label={playing ? "Pause" : "Play"}>
             {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
           </ControlButton>

           <ControlButton onClick={() => seek(-10)} label="Rewind 10 seconds">
             <RotateCcw className="size-3.5" />
           </ControlButton>

           <ControlButton onClick={() => seek(10)} label="Forward 10 seconds">
             <RotateCw className="size-3.5" />
           </ControlButton>
           
           <ControlButton onClick={togglePiP} label={isPiP ? "Exit Picture-in-Picture" : "Picture-in-Picture"}>
             {!isPiP ? (
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h3.5a2.5 2.5 0 012.5 2.5V16a1 1 0 01-1 1H9a1 1 0 01-1-1v-3.5a1 1 0 011-1H6a2.5 2.5 0 01-2.5-2.5V12a2.5 2.5 0 012.5-2.5h3.5zm9 0h3.5a2.5 2.5 0 012.5 2.5V16a1 1 0 01-1 1h-3.5a1 1 0 01-1-1v-3.5a1 1 0 011-1H15a2.5 2.5 0 012.5-2.5V12a2.5 2.5 0 012.5-2.5h3.5z" />
               </svg>
             ) : (
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m0-3-3 3M3 3h4l2.636 2.636a1.5 1.5 0 002.122-.774H18a1.5 1.5 0 000-3H5.136a1.5 1.5 0 00-1.11.37L3 7.863V3z" />
               </svg>
             )}
           </ControlButton>

          <div
            className="flex-1 h-5 flex items-center cursor-pointer group/progress relative mx-1"
            onMouseDown={(e) => { setIsDragging(true); handleProgressClick(e) }}
            onMouseMove={handleProgressDrag}
            onClick={handleProgressClick}
          >
            <div className="w-full h-1 bg-white/20 rounded-full relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
                style={{ width: `${buffered * 100}%` }}
              />
              <div
                className="absolute inset-y-0 left-0 bg-primary rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full bg-white shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity"
                style={{ left: `calc(${progress * 100}% - 6px)` }}
              />
            </div>
          </div>

          <span className="text-[11px] md:text-xs tabular-nums font-mono text-white/70 shrink-0 min-w-[72px] text-center">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <ControlButton onClick={handleMuteToggle} label={muted ? "Unmute" : "Mute"}>
            <VolumeIcon className="size-4" />
          </ControlButton>

          <div className="hidden md:flex items-center w-14 h-5 cursor-pointer group/vol relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = (e.clientX - rect.left) / rect.width
              handleVolumeChange(Math.max(0, Math.min(1, x)))
            }}
          >
            <div className="w-full h-1 bg-white/20 rounded-full relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-white/70 rounded-full"
                style={{ width: `${muted ? 0 : volume * 100}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full bg-white opacity-0 group-hover/vol:opacity-100 transition-opacity"
                style={{ left: `calc(${muted ? 0 : volume * 100}% - 6px)` }}
              />
            </div>
          </div>

          <ControlButton onClick={toggleFullscreen} label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
            {isFullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
          </ControlButton>
        </div>
      </div>
    </div>
  )
}

function ControlButton({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick() }}
      className="size-8 flex items-center justify-center rounded-md text-white hover:bg-white/10 transition-colors shrink-0"
      aria-label={label}
    >
      {children}
    </button>
  )
}

export const Demo = VideoPlayer
