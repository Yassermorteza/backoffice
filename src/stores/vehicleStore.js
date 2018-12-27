import { observable, action, computed } from 'mobx';

import vehicles from '../mockData.json';

class VehicleStore {
    @observable vehicles = vehicles;

    @observable index = 1;

    @observable map = {};

    @action
    changeIndex = index => {
        this.index = index;
    };

    @action
    updateVehicle = data => {
        this.clickedVehicle = data;
    };

    @action
    setMap = map => {
        this.map = map;
    };

    @computed
    get newIndex() {
        return this.index;
    }
}

const store = new VehicleStore();

export default store;
