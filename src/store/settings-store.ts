import alt from "../alt"
import AbstractStoreModel from "./abstract-store"
import {settingsActions, messageActions} from "../action"
import * as _ from "lodash"

export interface SettingsState {
    settings: SettingsInfo.Settings
}

class SettingsStore extends AbstractStoreModel<SettingsState> {
    settings: SettingsInfo.Settings
    constructor() {
        super()
        this.bindListeners({
            updateSettings: [
                settingsActions.updateWebServer,
                settingsActions.updateWebServerPort,
                settingsActions.updateWebFilePath,
                settingsActions.updateVncPass,
                settingsActions.updateVncPort,
                settingsActions.updateVncProxyPort,
                settingsActions.updateTaskServerPort,
                settingsActions.updateNetworkResolve,
                settingsActions.getAllSettings
            ]
        })
    }
    updateSettings(whichever: any) {
        if (!this.settings) {
            this.settings = {} as any
        }
        if (_.has(whichever, "changedStatus")) {
            if (whichever.changedStatus) {
                let toChange = _.omit(whichever, ["changedStatus"])
                _.assign(this.settings, toChange)
            }
        }
        else {
            _.assign(this.settings, whichever)
            console.log(this.settings)
        }
        console.log("Setting updated: "+JSON.stringify(whichever))
    }
}

export let settingsStore = alt.createStore<SettingsState>(SettingsStore, "SettingsStore")