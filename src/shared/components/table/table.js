import React, { Component } from 'react';
import * as Table from 'reactabular-table';
import { inject, observer } from 'mobx-react';
import L from 'leaflet';
import _ from 'lodash';

import { Paginator, paginate } from '../helpers';
import Selector from '../selctor';

import '../../../styles/style.css';
import '../../../styles/fontello.css';
import yellowMarekr from '../../../styles/images/marker-yellow.png';
import redMarekr from '../../../styles/images/marker-red.png';
import greenMarekr from '../../../styles/images/marker-green.png';

// import Vehicles from '../../../mockData.json';
const APIkey = 'your key';

@inject('VehicleStore')
@observer
class Vtable extends Component {
    state = {
        vehicles: {},
        address: undefined,
        layer: undefined,
        search: 'all',
        pagination: {
            page: 1,
            perPage: 10
        },
        columns: [
            {
                property: 'provider',
                header: {
                    label: 'Provider',
                    transforms: [
                        label => ({
                            onClick: () => this.sortColumns(label)
                        })
                    ]
                },
                cell: {
                    transforms: [
                        data => ({
                            onClick: () => console.log('Hi', data)
                        })
                    ]
                }
            },
            {
                property: 'details',
                header: {
                    label: 'Model',
                    transforms: [
                        label => ({
                            onClick: () => this.sortColumns(label)
                        })
                    ]
                },
                cell: {
                    transforms: [
                        data => ({
                            onClick: () => console.log('Hi', data)
                        })
                    ],
                    formatters: [details => details.model]
                }
            },
            {
                property: 'status',
                header: {
                    label: 'Status',
                    transforms: [
                        label => ({
                            onClick: () => this.sortColumns(label)
                        })
                    ]
                },
                cell: {
                    transforms: [
                        data => ({
                            onClick: () => console.log('Hi', data)
                        })
                    ]
                }
            },
            {
                property: 'details',
                header: {
                    label: 'Brand',
                    transforms: [
                        label => ({
                            onClick: () => this.sortColumns(label)
                        })
                    ]
                },
                cell: {
                    formatters: [details => details.brand]
                }
            },
            {
                property: 'details',
                header: {
                    label: 'LicensePlate',
                    transforms: [
                        label => ({
                            onClick: () => this.sortColumns(label)
                        })
                    ]
                },
                cell: {
                    transforms: [
                        data => ({
                            onClick: () => console.log('Hi', data)
                        })
                    ],
                    formatters: [details => details.licensePlate]
                }
            },
            {
                property: 'details',
                header: {
                    label: 'Color',
                    transforms: [
                        label => ({
                            onClick: () => this.sortColumns(label)
                        })
                    ]
                },
                cell: {
                    transforms: [
                        data => ({
                            onClick: () => console.log('Hi', data)
                        })
                    ],
                    formatters: [details => details.color]
                }
            },
            {
                property: 'pricing',
                header: {
                    label: 'Pricing',
                    transforms: [
                        label => ({
                            onClick: () => this.sortColumns(label)
                        })
                    ]
                },
                cell: {
                    transforms: [
                        data => ({
                            onClick: () => console.log('Pricing: ', data)
                        })
                    ],
                    formatters: [pricing => pricing[0].amount]
                }
            },
            {
                property: 'active',
                header: {
                    label: 'Active'
                },
                cell: {
                    transforms: [
                        data => ({
                            onClick: () => console.log('Pricing: ', data)
                        })
                    ],
                    formatters: [
                        (value, { rowData }) => (
                            <div className="active-icons">
                                <i
                                    className="icon-pencil-1"
                                    onClick={() => this.onEditor(rowData)}
                                />
                                <a href="#top">
                                    <i
                                        className="icon-globe"
                                        onClick={() =>
                                            this.highlightMarker(rowData)}
                                    />
                                </a>
                            </div>
                        )
                    ]
                }
            }
        ]
    };

    UNSAFE_componentWillMount() {
        this.setState({ vehicles: this.props.VehicleStore.vehicles });
    }

    sortColumns = label => {
        const { vehicles } = this.state;
        let path = label.toLowerCase();
        path !== 'provider' || path !== 'status'
            ? (path = `details.${path}`)
            : '';
        this.setState({ vehicles: _.orderBy(vehicles, [`${path}`], ['asc']) });
    };

    findAddress = async(lat, lng) => {
        try {
            const res = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?key=${APIkey}=${lat},${lng}&sensor=true`
            );
            const result = await res.json();
            this.setState({ address: result.results[0].formatted_address });
        } catch (err) {
            this.setState({ address: 'Oops! Error...!' });
        }
    };

    onEditor = async data => {
        const { coordinates } = data.location;
        const { updateVehicle } = this.props.VehicleStore;
        await this.findAddress(coordinates[1], coordinates[0]);
        data.address = this.state.address;
        updateVehicle(data);
        this.props.handleOpen();
    };

    highlightMarker = async data => {
        const { layer } = this.state;
        const { map } = this.props.VehicleStore;
        const { coordinates } = data.location;

        const icon = L.icon({
            iconUrl: yellowMarekr,
            iconSize: [17, 25]
        });

        await this.findAddress(coordinates[1], coordinates[0]);

        if (layer) {
            let iconUrl;
            layer.color ? (iconUrl = greenMarekr) : (iconUrl = redMarekr);
            const icon = L.icon({
                iconSize: [20, 25],
                iconUrl
            });

            layer.setIcon(icon);
        }

        map.eachLayer(layer => {
            if (
                layer instanceof L.Marker &&
                map.getBounds().contains(layer.getLatLng())
            ) {
                if (
                    layer._latlng.lat === coordinates[1] &&
                    layer._latlng.lng === coordinates[0]
                ) {
                    this.setState({ layer });
                    layer
                        .setIcon(icon)
                        .bindPopup(this.state.address)
                        .openPopup();
                }
            }
        });
    };

    onSelect = page => {
        const pages = Math.ceil(
            this.state.vehicles.length / this.state.pagination.perPage
        );

        this.setState({
            pagination: {
                ...this.state.pagination,
                page: Math.min(Math.max(page, 1), pages)
            }
        });
    };

    searchMethod = e => {
        const search = e.target.value;
        this.setState({ search });
    };

    search = e => {
        const searchKey = e.target.value;
        const { search } = this.state;
        const { vehicles } = this.props.VehicleStore;
        let filtered = [];

        if (search === 'all') {
            filtered = vehicles.filter(
                vehicle =>
                    vehicle.provider
                        .toLowerCase()
                        .indexOf(searchKey.toLowerCase()) > -1 ||
                    vehicle.status
                        .toLowerCase()
                        .indexOf(searchKey.toLowerCase()) > -1 ||
                    vehicle.pricing[0].amount
                        .toLowerCase()
                        .indexOf(searchKey.toLowerCase()) > -1 ||
                    vehicle.details.brand
                        .toLowerCase()
                        .indexOf(searchKey.toLowerCase()) > -1 ||
                    vehicle.details.model
                        .toLowerCase()
                        .indexOf(searchKey.toLowerCase()) > -1 ||
                    vehicle.details.color
                        .toLowerCase()
                        .indexOf(searchKey.toLowerCase()) > -1 ||
                    vehicle.details.licensePlate
                        .toLowerCase()
                        .indexOf(searchKey.toLowerCase()) > -1
            );

            this.setState(state => ({ ...state, vehicles: filtered }));
        } else if (
            search === 'brand' ||
            search === 'color' ||
            search === 'model' ||
            search === 'licensePlate'
        ) {
            filtered = vehicles.filter(
                vehicle =>
                    vehicle.details[search]
                        .toLowerCase()
                        .indexOf(searchKey.toLowerCase()) > -1
            );
            this.setState(state => ({ ...state, vehicles: filtered }));
        } else if (search === 'pricing') {
            filtered = vehicles.filter(
                vehicle =>
                    vehicle.pricing[0].amount
                        .toLowerCase()
                        .indexOf(searchKey.toLowerCase()) > -1
            );
            this.setState(state => ({ ...state, vehicles: filtered }));
        } else {
            filtered = vehicles.filter(
                vehicle =>
                    vehicle[search]
                        .toLowerCase()
                        .indexOf(searchKey.toLowerCase()) > -1
            );
            this.setState(state => ({ ...state, vehicles: filtered }));
        }

        if (
            e.key === 'Delete' ||
            e.key === 'Backspace' ||
            e.keyCode === 46 ||
            (e.keyCode === 8 && searchKey === '')
        ) {
            this.setState(state => ({ ...state, vehicles }));
        }
    };

    render() {
        const { pagination, vehicles, columns, search } = this.state;
        const paginated = paginate(pagination)(vehicles);
        const headers = [
            'provider',
            'model',
            'status',
            'brand',
            'licensePlate',
            'color',
            'pricing'
        ];
        return (
            <div>
                <div className="search-bar">
                    <input
                        type="search"
                        name="search"
                        placeholder={`Search ${search} ...`}
                        onChange={this.search}
                    />
                    <Selector
                        className={'selector'}
                        defaultValue={'all'}
                        data={headers}
                        onChange={this.searchMethod}
                        disabled={false}
                    />
                </div>

                <Table.Provider
                    className="pure-table pure-table-striped"
                    columns={columns}
                >
                    <Table.Header />
                    <Table.Body rows={paginated.rows} rowKey="_id" />
                </Table.Provider>
                <div className="controls">
                    <Paginator
                        pagination={pagination}
                        pages={paginated.amount}
                        onSelect={this.onSelect}
                    />
                </div>
            </div>
        );
    }
}

export default Vtable;
