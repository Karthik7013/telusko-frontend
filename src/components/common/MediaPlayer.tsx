// import { VideoPlayer, VideoPlayerControlBar, VideoPlayerMuteButton, VideoPlayerPlayButton, VideoPlayerSeekBackwardButton, VideoPlayerSeekForwardButton, VideoPlayerTimeDisplay, VideoPlayerTimeRange, VideoPlayerVolumeRange } from "@/components/ui/video-player";
// import { cn } from "@/lib/utils";
// import type { ComponentProps } from "react";

// /**
//  * Comprehensive MediaPlayer component with full customization through props
//  * Supports video/audio playback with extensive configuration options
//  */

// // ============ Types ============

// export type MediaPlayerSize = "sm" | "md" | "lg" | "xl" | "full";
// export type MediaPlayerLayout = "horizontal" | "vertical" | "minimal";

// export interface ControlConfig {
//   /** Show/hide the play/pause button */
//   play?: boolean;
//   /** Show/hide the mute button */
//   mute?: boolean;
//   /** Show/hide the volume slider */
//   volume?: boolean;
//   /** Show/hide the time display */
//   timeDisplay?: boolean;
//   /** Show/hide the time range/progress bar */
//   timeRange?: boolean;
//   /** Show/hide the seek backward button */
//   seekBackward?: boolean;
//   /** Show/hide the seek forward button */
//   seekForward?: boolean;
//   /** Show/hide the fullscreen button (if available) */
//   fullscreen?: boolean;
//   /** Show/hide the playback rate control */
//   playbackRate?: boolean;
//   /** Show/hide the picture-in-picture button */
//   pip?: boolean;
// }

// export interface MediaPlayerProps {
//   // ============ Media Source ============
//   /** Video/audio source URL */
//   src: string;
//   /** Poster image URL for video */
//   poster?: string;
//   /** Type of media (auto-detected if not provided) */
//   type?: "video" | "audio";
//   /** Media title for accessibility */
//   title?: string;
//   /** Media description for accessibility */
//   description?: string;

//   // ============ Playback Behavior ============
//   /** Autoplay when component mounts */
//   autoplay?: boolean;
//   /** Loop the media continuously */
//   loop?: boolean;
//   /** Mute on start */
//   muted?: boolean;
//   /** Initial volume (0-1) */
//   volume?: number;
//   /** Initial playback rate (0.25-4) */
//   playbackRate?: number;
//   /** Preload behavior */
//   preload?: "none" | "metadata" | "auto";
//   /** Disable native controls (default: true) */
//   disableNativeControls?: boolean;
//   /** Controls list attribute (e.g., "nodownload") */
//   controlsList?: string;

//   // ============ Styling ============
//   /** Size variant */
//   size?: MediaPlayerSize;
//   /** Layout variant */
//   layout?: MediaPlayerLayout;
//   /** Custom className for the container */
//   className?: string;
//   /** Custom className for the video element */
//   videoClassName?: string;
//   /** Custom className for the control bar */
//   controlBarClassName?: string;
//   /** Aspect ratio (e.g., "16/9", "4/3", "auto") */
//   aspectRatio?: string;
//   /** Rounded corners */
//   rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
//   /** Shadow depth */
//   shadow?: "none" | "sm" | "md" | "lg" | "xl";

//   // ============ Controls Configuration ============
//   /** Individual control visibility configuration */
//   controls?: ControlConfig;
//   /** Show all controls by default */
//   showAllControls?: boolean;
//   /** Hide all controls */
//   hideControls?: boolean;
//   /** Custom control order (array of control names) */
//   controlOrder?: Array<keyof ControlConfig>;

//   // ============ Seek Configuration ============
//   /** Seek backward amount in seconds (default: 10) */
//   seekBackwardAmount?: number;
//   /** Seek forward amount in seconds (default: 10) */
//   seekForwardAmount?: number;

//   // ============ Responsive ============
//   /** Hide controls on mobile */
//   hideControlsOnMobile?: boolean;
//   /** Show minimal controls on mobile */
//   minimalControlsOnMobile?: boolean;
//   /** Custom breakpoint for responsive behavior */
//   mobileBreakpoint?: string;

//   // ============ Events ============
//   /** Called when playback starts */
//   onPlay?: () => void;
//   /** Called when playback pauses */
//   onPause?: () => void;
//   /** Called when playback ends */
//   onEnded?: () => void;
//   /** Called on time update */
//   onTimeUpdate?: (currentTime: number, duration: number) => void;
//   /** Called on volume change */
//   onVolumeChange?: (volume: number, muted: boolean) => void;
//   /** Called on error */
//   onError?: (error: Error) => void;
//   /** Called when ready to play */
//   onReady?: () => void;
//   /** Called on fullscreen change */
//   onFullscreenChange?: (isFullscreen: boolean) => void;

//   // ============ Accessibility ============
//   /** ARIA label for the player */
//   ariaLabel?: string;
//   /** ARIA describedby */
//   ariaDescribedBy?: string;
//   /** Keyboard navigation enabled */
//   keyboardNavigation?: boolean;

//   // ============ Advanced ============
//   /** Custom media attributes */
//   mediaAttributes?: ComponentProps<"video">;
//   /** Custom control bar attributes */
//   controlBarAttributes?: ComponentProps<"div">;
//   /** Enable picture-in-picture */
//   enablePip?: boolean;
//   /** Custom styling for the control bar position */
//   controlBarPosition?: "top" | "bottom";
//   /** Show control bar on hover only */
//   controlsOnHover?: boolean;
//   /** Opacity of controls when not hovered */
//   controlsOpacity?: number;
// }

// const defaultControlConfig: Required<ControlConfig> = {
//   play: true,
//   mute: true,
//   volume: true,
//   timeDisplay: true,
//   timeRange: true,
//   seekBackward: true,
//   seekForward: true,
//   fullscreen: false,
//   playbackRate: false,
//   pip: false,
// };

// const sizeClasses = {
//   sm: "max-w-sm",
//   md: "max-w-md",
//   lg: "max-w-lg",
//   xl: "max-w-xl",
//   full: "w-full",
// };

// const aspectRatioClasses = {
//   "16/9": "aspect-video",
//   "4/3": "aspect-[4/3]",
//   "1/1": "aspect-square",
//   auto: "",
// };

// const roundedClasses = {
//   none: "rounded-none",
//   sm: "rounded-sm",
//   md: "rounded-md",
//   lg: "rounded-lg",
//   xl: "rounded-xl",
//   full: "rounded-full",
// };

// const shadowClasses = {
//   none: "",
//   sm: "shadow-sm",
//   md: "shadow-md",
//   lg: "shadow-lg",
//   xl: "shadow-xl",
// };

// /**
//  * A fully customizable media player component with extensive configuration options
//  */
// export function MediaPlayer({
//   // Media source
//   src,
//   poster,
//   type = "video",
//   title,
//   description,

//   // Playback
//   autoplay = false,
//   loop = false,
//   muted = false,
//   volume = 1,
//   playbackRate = 1,
//   preload = "metadata",
//   disableNativeControls = true,
//   controlsList,

//   // Styling
//   size = "full",
//   layout = "horizontal",
//   className,
//   videoClassName,
//   controlBarClassName,
//   aspectRatio = "16/9",
//   rounded = "lg",
//   shadow = "md",

//   // Controls
//   controls = {},
//   showAllControls = false,
//   hideControls = false,
//   controlOrder,

//   // Seek
//   seekBackwardAmount = 10,
//   seekForwardAmount = 10,

//   // Responsive
//   hideControlsOnMobile = false,
//   minimalControlsOnMobile = false,
//   mobileBreakpoint = "768px",

//   // Events
//   onPlay,
//   onPause,
//   onEnded,
//   onTimeUpdate,
//   onVolumeChange,
//   onError,
//   onReady,
//   onFullscreenChange,

//   // Accessibility
//   ariaLabel = "Media player",
//   ariaDescribedBy,
//   keyboardNavigation = true,

//   // Advanced
//   mediaAttributes = {},
//   controlBarAttributes = {},
//   enablePip = false,
//   controlBarPosition = "bottom",
//   controlsOnHover = false,
//   controlsOpacity = 0.8,
// }: MediaPlayerProps) {
//   // Merge control config with defaults
//   const controlConfig: Required<ControlConfig> = {
//     ...defaultControlConfig,
//     ...controls,
//   };

//   // If showAllControls is true, override all to true
//   if (showAllControls) {
//     Object.keys(controlConfig).forEach((key) => {
//       (controlConfig as any)[key] = true;
//     });
//   }

//   // If hideControls is true, override all to false
//   if (hideControls) {
//     Object.keys(controlConfig).forEach((key) => {
//       (controlConfig as any)[key] = false;
//     });
//   }

//   // Determine which controls to render
//   const controlsToRender = controlOrder
//     ? controlOrder.filter((key) => controlConfig[key])
//     : (Object.keys(controlConfig) as Array<keyof ControlConfig>).filter(
//         (key) => controlConfig[key]
//       );

//   // Build video attributes
//   const videoProps: ComponentProps<"video"> = {
//     slot: "media",
//     src,
//     poster,
//     autoPlay: autoplay,
//     loop,
//     muted,
//     volume,
//     playbackRate,
//     preload,
//     ...(disableNativeControls && { controls: false }),
//     ...(controlsList && { controlsList }),
//     ...mediaAttributes,
//     className: cn(
//       "mt-0 mb-0",
//       aspectRatio && (aspectRatioClasses[aspectRatio as keyof typeof aspectRatioClasses] || ""),
//       videoClassName
//     ),
//   };

//   // Build responsive classes
//   const responsiveClasses = cn(
//     hideControlsOnMobile && `max-md:hidden`,
//     minimalControlsOnMobile && "max-md:scale-75 max-md:origin-bottom"
//   );

//   // Build container classes
//   const containerClasses = cn(
//     "flex w-full items-center justify-center",
//     sizeClasses[size],
//     roundedClasses[rounded],
//     shadowClasses[shadow],
//     className
//   );

//   // Build control bar classes
//   const controlBarWrapperClasses = cn(
//     controlsOnHover && "opacity-0 hover:opacity-100 transition-opacity duration-300",
//     controlsOnHover && `opacity-[${controlsOpacity * 100}%]`,
//     controlBarPosition === "top" && "top-0",
//     controlBarPosition === "bottom" && "bottom-0"
//   );

//   // Render individual controls based on configuration
//   const renderControl = (controlName: keyof ControlConfig) => {
//     switch (controlName) {
//       case "play":
//         return <VideoPlayerPlayButton key="play" />;
//       case "mute":
//         return <VideoPlayerMuteButton key="mute" />;
//       case "volume":
//         return <VideoPlayerVolumeRange key="volume" />;
//       case "timeDisplay":
//         return <VideoPlayerTimeDisplay key="timeDisplay" showDuration />;
//       case "timeRange":
//         return <VideoPlayerTimeRange key="timeRange" />;
//       case "seekBackward":
//         return (
//           <VideoPlayerSeekBackwardButton
//             key="seekBackward"
//             seekOffset={seekBackwardAmount}
//           />
//         );
//       case "seekForward":
//         return (
//           <VideoPlayerSeekForwardButton
//             key="seekForward"
//             seekOffset={seekForwardAmount}
//           />
//         );
//       case "fullscreen":
//         // Fullscreen button would need to be implemented if available
//         return null;
//       case "playbackRate":
//         // Playback rate control would need custom implementation
//         return null;
//       case "pip":
//         // PiP button would need to be implemented if available
//         return null;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={containerClasses}>
//       <VideoPlayer
//         {...(keyboardNavigation && {
//           "data-keyboard-navigation": "true",
//         })}
//         {...(ariaLabel && { "aria-label": ariaLabel })}
//         {...(ariaDescribedBy && { "aria-describedby": ariaDescribedBy })}
//         {...(onFullscreenChange && {
//           onfullscreenchange: () => onFullscreenChange?.(!!document.fullscreenElement),
//         })}
//       >
//         <video
//           {...videoProps}
//           onPlay={onPlay}
//           onPause={onPause}
//           onEnded={onEnded}
//           onTimeUpdate={(e) => {
//             const video = e.target as HTMLVideoElement;
//             onTimeUpdate?.(video.currentTime, video.duration);
//           }}
//           onVolumeChange={(e) => {
//             const video = e.target as HTMLVideoElement;
//             onVolumeChange?.(video.volume, video.muted);
//           }}
//           onError={(e) => {
//             const video = e.target as HTMLVideoElement;
//             const errorEvent = e as ErrorEvent;
//             onError?.(new Error(errorEvent.message || "Video playback error"));
//           }}
//           onLoadedMetadata={onReady}
//         />

//         {!hideControls && (
//           <div className={controlBarWrapperClasses}>
//             <VideoPlayerControlBar
//               className={cn(
//                 "p-2 flex items-center gap-1",
//                 layout === "vertical" && "flex-col",
//                 controlBarClassName
//               )}
//               {...controlBarAttributes}
//             >
//               {controlsToRender.map(renderControl)}
//             </VideoPlayerControlBar>
//           </div>
//         )}
//       </VideoPlayer>
//     </div>
//   );
// }

// // ============ Preset Variants ============

// export interface MediaPlayerPresetProps extends Omit<MediaPlayerProps, "controls" | "layout" | "size"> {
//   /** Preset variant */
//   variant?: "default" | "minimal" | "compact" | "course";
// }

// /**
//  * MediaPlayer with preset configurations for common use cases
//  */
// export function MediaPlayerPreset({
//   variant = "default",
//   ...props
// }: MediaPlayerPresetProps) {
//   const presets = {
//     default: {
//       controls: defaultControlConfig,
//       layout: "horizontal" as const,
//       size: "full" as const,
//       showAllControls: false,
//     },
//     minimal: {
//       controls: {
//         play: true,
//         mute: true,
//         timeDisplay: true,
//         timeRange: true,
//       },
//       layout: "horizontal" as const,
//       size: "full" as const,
//       showAllControls: false,
//     },
//     compact: {
//       controls: {
//         play: true,
//         timeDisplay: true,
//         timeRange: true,
//       },
//       layout: "horizontal" as const,
//       size: "sm" as const,
//       showAllControls: false,
//     },
//     course: {
//       controls: {
//         play: true,
//         seekBackward: true,
//         seekForward: true,
//         timeRange: true,
//         timeDisplay: true,
//         volume: true,
//         mute: true,
//       },
//       layout: "horizontal" as const,
//       size: "full" as const,
//       rounded: "xl" as const,
//       shadow: "lg" as const,
//       showAllControls: false,
//     },
//   };

//   const preset = presets[variant];

//   return <MediaPlayer {...preset} {...props} />;
// }

// // ============ Example Usage Component ============

// /**
//  * Example usage component demonstrating various configurations
//  */
// export function MediaPlayerExamples() {
//   return (
//     <div className="space-y-8 p-4">
//       {/* Default player */}
//       <div>
//         <h3 className="text-lg font-semibold mb-2">Default Player</h3>
//         <MediaPlayer
//           src="https://res.cloudinary.com/dy0qvjkff/video/upload/v1768656497/zpz6ai4mgdzztafwdnpz.mp4"
//           poster="https://cdn.pixabay.com/photo/2023/12/16/00/06/mountain-8451604_1920__1b578b3c0b.jpg"
//           title="Sample Video"
//           onPlay={() => console.log("Playing")}
//           onPause={() => console.log("Paused")}
//         />
//       </div>

//       {/* Minimal player */}
//       <div>
//         <h3 className="text-lg font-semibold mb-2">Minimal Player</h3>
//         <MediaPlayer
//           src="https://res.cloudinary.com/dy0qvjkff/video/upload/v1768656497/zpz6ai4mgdzztafwdnpz.mp4"
//           controls={{
//             play: true,
//             timeDisplay: true,
//             timeRange: true,
//           }}
//           size="md"
//         />
//       </div>

//       {/* Custom styled player */}
//       <div>
//         <h3 className="text-lg font-semibold mb-2">Custom Styled Player</h3>
//         <MediaPlayer
//           src="https://res.cloudinary.com/dy0qvjkff/video/upload/v1768656497/zpz6ai4mgdzztafwdnpz.mp4"
//           size="lg"
//           rounded="xl"
//           shadow="xl"
//           className="border-2 border-primary/20"
//           controlBarClassName="bg-gradient-to-t from-black/80 to-transparent"
//         />
//       </div>

//       {/* Course player preset */}
//       <div>
//         <h3 className="text-lg font-semibold mb-2">Course Player Preset</h3>
//         <MediaPlayerPreset
//           variant="course"
//           src="https://res.cloudinary.com/dy0qvjkff/video/upload/v1768656497/zpz6ai4mgdzztafwdnpz.mp4"
//           poster="https://cdn.pixabay.com/photo/2023/12/16/00/06/mountain-8451604_1920__1b578b3c0b.jpg"
//         />
//       </div>
//     </div>
//   );
// }

// export default MediaPlayer;