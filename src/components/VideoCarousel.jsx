import { useEffect, useRef, useState } from "react"
import { hightlightsSlides } from "../constants"
import gsap from "gsap"
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";

const VideoCarousel = () => {
	const videoRef = useRef([]);
	const videoSpanRef = useRef([]);
	const videoDivRef = useRef([]);

	const [video, setVideo] = useState({
		isEnd: false,
		startsPlay: false,
		videoId: 0,
		isLastVideo: false,
		isPlaying: false
	});

	const [loadedData, setLoadedData] = useState([])

	const { isEnd, isLastVideo, startsPlay, videoId, isPlaying } = video;

	const handleLoadedMetadata = (_, event) => {
		setLoadedData((prevData) => [...prevData, event])
	}

	useGSAP(() => { 
		gsap.to("#video", {
			scrollTrigger: {
				trigger: "#video",
				toggleActions: "restart none none none",
			},
			onComplete: () => {
				setVideo((prevVideo) => ({
					...prevVideo,
					startsPlay: true,
					isPlaying: true
				}))
			}
		})

		gsap.to("#slider", {
			transform: `translateX(${-100 * videoId}%)`,
			duration: 2,
			ease: "power2.inOut"
		})
	}, [videoId, isEnd])

	useEffect(() => {
		if (loadedData.length > 3) {
			if (!isPlaying) {
				videoRef.current[videoId].pause();
			} else {
				startsPlay && videoRef.current[videoId].play();
			}
		}

	}, [startsPlay, videoId, isPlaying, loadedData])

	useEffect(() => {
		let currentProgress = 0;
		let span = videoSpanRef.current;

		if (span[videoId]) {
			let animation = gsap.to(span[videoId], {
				onUpdate: () => {
					const progress = Math.ceil(animation.progress() * 100);

					if (progress != currentProgress) {
						currentProgress = progress;
					}

					gsap.to(videoDivRef.current[videoId], {
						width: window.innerWidth < 760 ? "10vw" :
							window.innerWidth < 1024 ? "10vw" : "4vw"
					})

					gsap.to(span[videoId], {
						width: `${currentProgress}%`,
						backgroundColor: "white"
					})
				},

				onComplete: () => {
					if (isPlaying) {
						gsap.to(videoDivRef.current[videoId], {
							width: "12px",
						});
						gsap.to(span[videoId], {
							backgroundColor: "#afafaf",
						});
					}
				},
			})

			if (videoId == 0) {
				animation.restart();
			}

			const animationUpdate = () => {
				animation.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration);
			}

			if (isPlaying) {
				gsap.ticker.add(animationUpdate);
			} else {
				gsap.ticker.remove(animationUpdate);
			}
		}

	}, [videoId, startsPlay, isPlaying])

	const handleProcess = (type, index) => {
		switch (type) {
			case "video-end":
				setVideo((prevVideo) => ({
					...prevVideo,
					isEnd: true,
					videoId: index + 1
				}))
				break;

			case "last-video":
				setVideo((prevVideo) => ({
					...prevVideo,
					isLastVideo: true
				}))
				break;

			case "video-reset":
				setVideo((prevVideo) => ({
					...prevVideo,
					isEnd: false,
					videoId: 0,
					isLastVideo: false
				}))
				break;
			
			case "video-play":
				setVideo((prevVideo) => ({
					...prevVideo,
					startsPlay: true,
					isPlaying: true
				}))
				break;
			
			case "video-pause":
				setVideo((prevVideo) => ({
					...prevVideo,
					isPlaying: false,
					startsPlay: false
				}))
				break;
			
			default:
				return video;
		}
				
	}

	return (
		<>
			<div className="flex items-center">
				{hightlightsSlides.map((slider, index) => (
					<div id="slider" key={index} className="sm:pr-20 pr-10 ">
						<div className="video-carousel_container">
							<div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
								<video
									ref={(el) => { videoRef.current[index] = el }}
									onPlay={() => {
										setVideo((prevVideo) => ({
											...prevVideo,
											isPlaying: true,
										}))
									}}
									className={`${
										slider.id === 2 && "translate-x-44"
									} pointer-events-none`}
									onEnded={() => {
										index !== 3 ? handleProcess("video-end", index) : handleProcess("last-video")
									}}
									onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}
									muted preload="auto" playsInline={true} id="video">
									<source src={slider.video} type="video/mp4" />
								</video>
							</div>

							<div className="absolute top-12 left-[5%] z-10">
								{slider.textLists.map((text, index) => (
									<p key={index} className="md:text-2xl text-xl font-medium">{text}</p>
								))}
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="relative flex-center mt-10">
				<div className="flex py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
					{videoRef.current.map((_, index) => (
						<span key={index} ref={(el) => { videoDivRef.current[index] = el }} className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer">
							<span className="absolute h-full w-full rounded-full" ref={(el) => { videoSpanRef.current[index] = el }}></span>
						</span>
					))}
				</div>

				<button className="control-btn" onClick={isLastVideo ? () => { handleProcess("video-reset") } : isPlaying ? () => { handleProcess("video-pause") } : () => { handleProcess("video-play") }}>
					<img src={isLastVideo ? replayImg : isPlaying ? pauseImg : playImg} alt={ isLastVideo ? "replay" : isPlaying ? "pause" : "play"} />
				</button>
			</div>
		</>
	)
}

export default VideoCarousel