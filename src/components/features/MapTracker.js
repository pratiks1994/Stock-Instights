"use client";
import { useEffect, useState } from "react";
import mqtt from "mqtt";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function MapTracker() {
    const [brokerUrl, setBrokerUrl] = useState("wss://mqtt-dashboard.com:8884/mqtt");
    const [position, setPosition] = useState({ lat: 0, lng: 0 });
    const [status, setStatus] = useState("Disconnected");
    const [client, setClient] = useState(null);

    const connectToBroker = () => {
        if (client) client.end(true);
        setStatus("Connecting...");

        const newClient = mqtt.connect(brokerUrl);

        newClient.on("connect", () => {
            setStatus("🟢 Connected");
            console.log("Connected:", newClient);
            newClient.subscribe("EC200_Latitude");
            newClient.subscribe("EC200_Longitude");
        });

        newClient.on("message", (topic, msg) => {
            try {
                console.log(msg);
                const data = JSON.parse(msg.toString());
                console.log(data);

                if (topic === "EC200_Latitude") {
                    setPosition((prevPosition) => ({ lat: data, lng: prevPosition.lng }));
                } else if (topic === "EC200_Longitude") {
                    setPosition((prevPosition) => ({ lat: prevPosition.lat, lng: data }));
                }
                // Example expected format: { lat: 23.0225, lng: 72.5714 }
                // if (data.lat && data.lng) {
                //     setPosition({ lat: data.lat, lng: data.lng });
                // }
            } catch (err) {
                console.error("Invalid message format", err);
            }
        });

        newClient.on("close", () => setStatus("Disconnected"));
        newClient.on("error", (err) => {
            console.error("MQTT error", err);
            setStatus("🔴 Connection Error");
        });

        setClient(newClient);
    };

    const disconnectFromBroker = () => {
        if (client) client.end(true);
        setPosition({ lat: 0, lng: 0 });
        setStatus("Disconnected");
    };

    useEffect(() => {
        return () => {
            if (client) client.end(true);
        };
    }, [client]);

    return (
        <div className="flex flex-col min-h-screen ">
            {/* Header Section */}
            <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm sticky top-0 z-10">
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    <Input
                        value={brokerUrl}
                        onChange={(e) => setBrokerUrl(e.target.value)}
                        placeholder="MQTT Broker URL"
                        className="w-full md:w-96"
                    />
                </div>

                <div className="flex items-center gap-3">
                    {status === "Disconnected" && (
                        <Button
                            onClick={connectToBroker}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium transition"
                        >
                            Connect
                        </Button>
                    )}
                    {status === "🟢 Connected" && (
                        <Button
                            onClick={disconnectFromBroker}
                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md text-sm font-medium transition"
                        >
                            Disconnect
                        </Button>
                    )}
                    <span
                        className={`text-sm font-medium ${
                            status.includes("🟢") ? "text-green-600" : status.includes("🔴") ? "text-red-600" : "text-primary-foreground"
                        }`}
                    >
                        {status}
                    </span>
                </div>
            </div>

            <div className="flex-1 relative w-full">
                <MapContainer
                    center={position.lat !== 0 ? position : [0, 0]}
                    zoom={2}
                    scrollWheelZoom
                    className="w-full h-[calc(100vh-120px)] md:h-[calc(100vh-100px)] transition-all"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {position.lat !== 0 && position.lng !== 0 && (
                        <>
                            <Marker position={position} icon={markerIcon}>
                                <Popup>
                                    📍 Lat: {position.lat.toFixed(7)}, Lng: {position.lng.toFixed(7)}
                                </Popup>
                            </Marker>
                            <RecenterMap position={position} />
                        </>
                    )}
                </MapContainer>

                {/* Coordinates Overlay */}
            </div>
        </div>
    );
}

function RecenterMap({ position }) {
    const map = useMap();

    useEffect(() => {
        if (position.lat !== 0 && position.lng !== 0) {
            map.setView(position, 15, { animate: true });
        }
    }, [position, map]);

    return null;
}

export default MapTracker;
