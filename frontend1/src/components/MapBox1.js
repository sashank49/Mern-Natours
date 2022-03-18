import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
	"pk.eyJ1Ijoic2FzaGFuay1rb2thIiwiYSI6ImNremg1ODRpODFhZ20yd3Bkc28yMWdsY3cifQ.9UZxGEzHAo47XVbsuZdCJA";

export default function MapBox1({ locations }) {
	const [viewport, setViewport] = useState({
		latitude: 45.4211,
		longitude: -75.6903,
		width: "100vw",
		height: "100vh",
		zoom: 10,
	});
	const [selectedPark, setSelectedPark] = useState(null);

	useEffect(() => {
		const listener = (e) => {
			if (e.key === "Escape") {
				setSelectedPark(null);
			}
		};
		window.addEventListener("keydown", listener);

		return () => {
			window.removeEventListener("keydown", listener);
		};
	}, []);

	return (
		<div>
			<ReactMapGL
				className="map-container"
				{...viewport}
				mapboxApiAccessToken="pk.eyJ1Ijoic2FzaGFuay1rb2thIiwiYSI6ImNsMG03MDU5bjAzNmwzYm83bmRiOWQyaTMifQ.XrKKN098t6F2WItxNqImPg"
				mapStyle="mapbox://styles/mapbox/navigation-night-v1"
				onViewportChange={(viewport) => {
					setViewport(viewport);
				}}
			>
				{locations?.map((park) => (
					<Marker
						key={park._id}
						latitude={park.coordinates[1]}
						longitude={park.coordinates[0]}
					>
						<button
							className="marker-btn"
							onClick={(e) => {
								e.preventDefault();
								setSelectedPark(park);
							}}
						>
							<img src="../../img/pin.png" alt="Skate Park Icon" />
						</button>
					</Marker>
				))}

				{selectedPark ? (
					<Popup
						latitude={selectedPark.coordinates[1]}
						longitude={selectedPark.coordinates[0]}
						onClose={() => {
							setSelectedPark(null);
						}}
					>
						<div>
							<p>{selectedPark.description}</p>
						</div>
					</Popup>
				) : null}
			</ReactMapGL>
		</div>
	);
}
