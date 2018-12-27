import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import L from 'leaflet';
import 'leaflet.markercluster';

import '../../../styles/leaflet.css';
import '../../../styles/MarkerCluster.Default.css';
import '../../../styles/MarkerCluster.css';
import redMarekr from '../../../styles/images/marker-red.png';
import greenMarekr from '../../../styles/images/marker-green.png';

import BerlinDistricts from '../../../berlin.districts.js';

// const mitte = BerlinDistricts.features[0].geometry.coordinates[0].map(coord => coord.reverse());

@inject('VehicleStore')
@observer
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: undefined,
            district: BerlinDistricts.features[0]
        };
    }

    componentWillMount() {
        this.setState(state => ({
            ...state,
            district: BerlinDistricts.features[0]
        }));
    }
    componentDidMount() {
        this.initMap();
    }

    shouldComponentUpdate(nextProps) {
        console.log('mapSHouldUpdate: ', nextProps);
        return true;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('mapReceiveProps: ', nextProps);
    }

    initMap() {
        const { setMap } = this.props.VehicleStore;
        const { district } = this.state;
        const map = L.map('map', {
            center: [52.53, 13.35],
            zoomControl: true,
            zoom: 12
        });
        L.tileLayer(
            'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
            { maxZoom: 19 }
        ).addTo(map);
        // const polygon = L.polygon(mitte, {fill: false}).addTo(map);
        // map.fitBounds(polygon.getBounds());
        map.zoomControl.setPosition('bottomright');
        map.scrollWheelZoom.disable();
        L.geoJSON(district).addTo(map);
        this.loadClusters(map);
        this.setState({ map });
        setMap(map);
    }

    loadClusters(map) {
        const { vehicles } = this.props.VehicleStore;
        const { district } = this.state;
        const markers = L.markerClusterGroup({
            chunkedLoading: true,
            disableClusteringAtZoom: 10,
            showCoverageOnHover: false
        });
        const icon = L.icon({
            iconUrl: redMarekr,
            iconSize: [20, 25]
        });

        const activeIcon = L.icon({
            iconUrl: greenMarekr,
            iconSize: [20, 25]
        });

        vehicles.forEach(vehicle => {
            const lng = vehicle.location.coordinates[0];
            const lat = vehicle.location.coordinates[1];
            const marker = L.marker(L.latLng(lat, lng), { icon });
            marker.vehicle = vehicle;
            marker.on('click', this.onMarkerClick);
            markers.addLayer(marker);
            L.layerGroup(marker);
        });

        map.addLayer(markers);

        map.eachLayer(layer => {
            if (
                layer instanceof L.Marker &&
                map.getBounds().contains(layer.getLatLng())
            ) {
                if (
                    this.insidePolygon(
                        layer.vehicle.location.coordinates,
                        district.geometry.coordinates[0]
                    )
                ) {
                    layer.setIcon(activeIcon);
                    layer.color = 'green';
                }
            }
        });
    }

    onMarkerClick(e) {
        console.log(e.target.vehicle);
    }

    insidePolygon(point, polygon) {
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

        const lng = point[0];
        const lat = point[1];
        let inside = false;

        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const lngi = polygon[i][0],
                lati = polygon[i][1];
            const lngj = polygon[j][0],
                latj = polygon[j][1];

            const intersect =
                lati > lat !== latj > lat &&
                lng < (lngj - lngi) * (lat - lati) / (latj - lati) + lngi;
            if (intersect) {
                inside = !inside;
            }
        }

        return inside;
    }

    render() {
        return (
            <div>
                <div id="map" />
            </div>
        );
    }
}

export default Map;
